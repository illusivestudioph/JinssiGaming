import { act, render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { CommentSection } from './CommentSection';
import type { Comment } from '@/lib/commentsApi';

const mocks = vi.hoisted(() => ({
  user: { id: 'player' } as { id: string } | null,
  isConfigured: true,
  openAuth: vi.fn(),
  listComments: vi.fn(),
  postComment: vi.fn(),
  deleteComment: vi.fn(),
}));
vi.mock('@/context/auth', () => ({
  useAuth: () => ({
    user: mocks.user,
    isAdmin: false,
    loading: false,
    isConfigured: mocks.isConfigured,
    openAuth: mocks.openAuth,
  }),
}));
vi.mock('@/lib/commentsApi', () => ({
  listComments: mocks.listComments,
  postComment: mocks.postComment,
  deleteComment: mocks.deleteComment,
}));
const comment = (gameId: string): Comment => ({
  id: gameId,
  game_id: gameId,
  user_id: 'player',
  user_name: 'Player',
  text: `Note for ${gameId}`,
  created_at: '2026-09-06T12:00:00Z',
});

beforeEach(() => {
  mocks.user = { id: 'player' };
  mocks.isConfigured = true;
  mocks.listComments.mockReset().mockResolvedValue({ comments: [], nextCursor: null });
  mocks.postComment.mockReset();
});

it('removes fake login controls and prompts for real authentication', async () => {
  mocks.user = null;
  const user = userEvent.setup();
  render(<CommentSection gameId="first" />);
  await user.click(screen.getByRole('button', { name: 'Sign In or Register' }));
  expect(mocks.openAuth).toHaveBeenCalled();
  expect(screen.queryByText(/Toggle Login State/)).not.toBeInTheDocument();
});

it('does not make network requests or show fake notes in preview mode', () => {
  mocks.isConfigured = false;
  render(<CommentSection gameId="preview" />);
  expect(mocks.listComments).not.toHaveBeenCalled();
  expect(screen.getByText(/once Supabase is connected/)).toBeInTheDocument();
});

it('retains the note draft when posting fails', async () => {
  const user = userEvent.setup();
  mocks.postComment.mockRejectedValue(new Error('Please wait 15 seconds between notes.'));
  render(<CommentSection gameId="first" />);
  await waitFor(() => expect(screen.queryByText('Loading notes…')).not.toBeInTheDocument());
  await user.type(screen.getByRole('textbox'), 'Keep this draft');
  await user.click(screen.getByRole('button', { name: 'Post Note' }));
  expect(screen.getByRole('alert')).toHaveTextContent('15 seconds');
  expect(screen.getByRole('textbox')).toHaveValue('Keep this draft');
});

it('does not leak late posts or draft text across games', async () => {
  const user = userEvent.setup();
  let finish!: (value: Comment) => void;
  mocks.postComment.mockReturnValue(
    new Promise<Comment>((resolve) => {
      finish = resolve;
    }),
  );
  const { rerender } = render(<CommentSection gameId="first" />);
  await waitFor(() => expect(screen.queryByText('Loading notes…')).not.toBeInTheDocument());
  await user.type(screen.getByRole('textbox'), 'First game draft');
  await user.click(screen.getByRole('button', { name: 'Post Note' }));
  rerender(<CommentSection gameId="second" />);
  await waitFor(() => expect(screen.queryByText('Loading notes…')).not.toBeInTheDocument());
  await act(async () => finish(comment('first')));
  expect(screen.getByRole('textbox')).toHaveValue('');
  expect(screen.queryByText('Note for first')).not.toBeInTheDocument();
});

it('aborts stale fetches when a different game is selected', async () => {
  const pending: {
    gameId: string;
    signal: AbortSignal;
    resolve: (value: { comments: Comment[]; nextCursor: null }) => void;
  }[] = [];
  mocks.listComments.mockImplementation(
    (gameId: string, _cursor: unknown, signal: AbortSignal) =>
      new Promise((resolve) => pending.push({ gameId, signal, resolve })),
  );
  const { rerender } = render(<CommentSection gameId="first" />);
  rerender(<CommentSection gameId="second" />);
  expect(pending[0].signal.aborted).toBe(true);
  await act(async () => pending[1].resolve({ comments: [comment('second')], nextCursor: null }));
  await act(async () => pending[0].resolve({ comments: [comment('first')], nextCursor: null }));
  expect(screen.getByText('Note for second')).toBeInTheDocument();
  expect(screen.queryByText('Note for first')).not.toBeInTheDocument();
});
