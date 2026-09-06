import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { expect, it, vi } from 'vitest';
import { GameDirectory } from './GameDirectory';
import { games } from '@/data/games';

const content = vi.hoisted(() => ({ games: [] as typeof import('@/data/games').games }));
vi.mock('@/context/siteContent', () => ({ useSiteContent: () => content }));

it('recomputes search results and categories when remote content changes', async () => {
  const user = userEvent.setup();
  content.games = [games[0]];
  const props = { onSelectGame: vi.fn(), progressMap: {} };
  const { rerender } = render(<GameDirectory {...props} />);
  await user.type(screen.getByRole('textbox', { name: 'Search games' }), ' new ');
  expect(screen.getByText(/No games found/)).toBeInTheDocument();
  content.games = [{ ...games[1], title: 'New Adventure', category: 'Adventure' }];
  rerender(<GameDirectory {...props} />);
  expect(screen.getByText('New Adventure')).toBeInTheDocument();
  expect(screen.getByRole('button', { name: 'Adventure' })).toBeInTheDocument();
});
