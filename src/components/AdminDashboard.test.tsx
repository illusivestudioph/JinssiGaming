import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, it, vi } from 'vitest';
import { AdminDashboard } from './AdminDashboard';
import { games } from '@/data/games';
import { defaultContent } from '@/data/siteContent';

const mocks = vi.hoisted(() => ({
  isAdmin: true,
  saveGame: vi.fn(),
  saveSettings: vi.fn(),
  removeGame: vi.fn(),
  reload: vi.fn(),
}));
vi.mock('@/context/auth', () => ({ useAuth: () => ({ isAdmin: mocks.isAdmin, loading: false }) }));
vi.mock('@/context/siteContent', () => ({
  useSiteContent: () => ({
    ...defaultContent,
    games: [games[0]],
    isRemote: true,
    gameRevisions: { librarian: 1 },
    settingsRevision: 1,
    ...mocks,
  }),
}));

beforeEach(() => {
  mocks.isAdmin = true;
  mocks.saveGame.mockReset().mockResolvedValue(undefined);
  mocks.saveSettings.mockReset().mockResolvedValue(2);
  mocks.removeGame.mockReset().mockResolvedValue(undefined);
});

it('guards the dashboard independently of navigation', () => {
  mocks.isAdmin = false;
  render(<AdminDashboard onDirtyChange={vi.fn()} />);
  expect(screen.getByRole('alert')).toHaveTextContent('Only a signed-in site admin');
  expect(screen.queryByRole('button', { name: 'Save Changes' })).not.toBeInTheDocument();
});

it('cancels a new game without publishing a broken placeholder', async () => {
  const user = userEvent.setup();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
  render(<AdminDashboard onDirtyChange={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Manage Games' }));
  await user.click(screen.getByRole('button', { name: 'Add New Game' }));
  await user.click(screen.getByRole('button', { name: 'Back to Dashboard' }));
  expect(mocks.saveGame).not.toHaveBeenCalled();
});

it('does not mutate live instructions when edits are discarded', async () => {
  const user = userEvent.setup();
  vi.spyOn(window, 'confirm').mockReturnValue(true);
  const original = structuredClone(games[0]);
  render(<AdminDashboard onDirtyChange={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Manage Games' }));
  await user.click(screen.getByRole('button', { name: `Edit ${games[0].title}` }));
  await user.clear(screen.getAllByLabelText('Step 1 instructions')[0]);
  await user.type(screen.getAllByLabelText('Step 1 instructions')[0], 'Changed draft');
  await user.click(screen.getByRole('button', { name: 'Back to Dashboard' }));
  expect(games[0]).toEqual(original);
  expect(mocks.saveGame).not.toHaveBeenCalled();
});

it('retains a game draft after a failed save and does not report success', async () => {
  const user = userEvent.setup();
  mocks.saveGame.mockRejectedValueOnce(new Error('Connection interrupted'));
  render(<AdminDashboard onDirtyChange={vi.fn()} />);
  await user.click(screen.getByRole('button', { name: 'Manage Games' }));
  await user.click(screen.getByRole('button', { name: `Edit ${games[0].title}` }));
  await user.clear(screen.getByLabelText('Game title'));
  await user.type(screen.getByLabelText('Game title'), 'Draft title');
  await user.click(screen.getByRole('button', { name: 'Save Changes' }));
  await waitFor(() =>
    expect(screen.getByRole('alert')).toHaveTextContent('Connection interrupted'),
  );
  expect(screen.getByLabelText('Game title')).toHaveValue('Draft title');
  expect(mocks.saveGame).toHaveBeenCalledWith(expect.objectContaining({ title: 'Draft title' }), 1);
  expect(screen.queryByText('Game published.')).not.toBeInTheDocument();
});
