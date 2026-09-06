import { act, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, expect, it, vi } from 'vitest';
import type { AuthChangeEvent, Session } from '@supabase/supabase-js';
import { AuthProvider } from './AuthProvider';
import { useAuth } from './auth';

const mocks = vi.hoisted(() => ({
  getSession: vi.fn(),
  onAuthStateChange: vi.fn(),
  rpc: vi.fn(),
  unsubscribe: vi.fn(),
  signOut: vi.fn(),
}));
vi.mock('@/lib/supabase', () => ({
  supabase: { auth: mocks, rpc: mocks.rpc },
  supabaseConfigurationError: null,
  requireSupabase: () => ({ auth: mocks }),
}));
let authEvent: (event: AuthChangeEvent, session: Session | null) => void;
const makeSession = (id: string): Session => ({
  access_token: `token-${id}`,
  refresh_token: 'refresh',
  token_type: 'bearer',
  expires_in: 3600,
  user: {
    id,
    app_metadata: {},
    user_metadata: {},
    aud: 'authenticated',
    created_at: '2026-09-06T00:00:00Z',
  },
});
function Status() {
  const auth = useAuth();
  return (
    <>
      <p>{auth.user?.id ?? 'signed-out'}</p>
      <p>{auth.isAdmin ? 'is-admin' : 'not-admin'}</p>
      <p>{auth.loading ? 'loading' : 'ready'}</p>
      {auth.error && <p role="alert">{auth.error}</p>}
    </>
  );
}
beforeEach(() => {
  mocks.getSession.mockReset().mockResolvedValue({ data: { session: null }, error: null });
  mocks.rpc.mockReset().mockResolvedValue({ data: false, error: null });
  mocks.onAuthStateChange.mockImplementation((callback) => {
    authEvent = callback;
    return { data: { subscription: { unsubscribe: mocks.unsubscribe } } };
  });
});

it('ignores a stale initial session after a newer sign-out event', async () => {
  let resolve!: (value: unknown) => void;
  mocks.getSession.mockReturnValue(
    new Promise((finish) => {
      resolve = finish;
    }),
  );
  render(
    <AuthProvider>
      <Status />
    </AuthProvider>,
  );
  act(() => authEvent('SIGNED_OUT', null));
  await act(async () => resolve({ data: { session: makeSession('old-admin') }, error: null }));
  expect(screen.getByText('signed-out')).toBeInTheDocument();
  expect(screen.getByText('not-admin')).toBeInTheDocument();
});

it('does not reuse a late admin lookup after sign-out', async () => {
  let resolve!: (value: unknown) => void;
  mocks.rpc.mockReturnValue(
    new Promise((finish) => {
      resolve = finish;
    }),
  );
  render(
    <AuthProvider>
      <Status />
    </AuthProvider>,
  );
  act(() => authEvent('SIGNED_IN', makeSession('admin')));
  await waitFor(() => expect(mocks.rpc).toHaveBeenCalledWith('is_admin'));
  act(() => authEvent('SIGNED_OUT', null));
  await act(async () => resolve({ data: true, error: null }));
  expect(screen.getByText('not-admin')).toBeInTheDocument();
  expect(screen.getByText('ready')).toBeInTheDocument();
});

it('fails closed when the role lookup fails', async () => {
  mocks.rpc.mockResolvedValue({ data: null, error: { message: 'Database unavailable' } });
  render(
    <AuthProvider>
      <Status />
    </AuthProvider>,
  );
  act(() => authEvent('SIGNED_IN', makeSession('member')));
  await waitFor(() => expect(screen.getByRole('alert')).toHaveTextContent('Database unavailable'));
  expect(screen.getByText('not-admin')).toBeInTheDocument();
  expect(screen.getByText('ready')).toBeInTheDocument();
});

it('opens the password recovery dialog and cleans up its auth subscription', async () => {
  const { unmount } = render(
    <AuthProvider>
      <Status />
    </AuthProvider>,
  );
  act(() => authEvent('PASSWORD_RECOVERY', makeSession('member')));
  await waitFor(() =>
    expect(screen.getByRole('dialog', { name: 'Choose a new password' })).toBeInTheDocument(),
  );
  unmount();
  expect(mocks.unsubscribe).toHaveBeenCalled();
});
