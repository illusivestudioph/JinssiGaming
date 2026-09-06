import { useCallback, useMemo, useSyncExternalStore } from 'react';
import type { Game } from '@/data/games';
import { completedCount, subscribeProgress } from '@/lib/progress';

export function useProgressMap(games: Game[]): Record<string, number> {
  // A serialized primitive is a stable snapshot even when the directory receives
  // a new array, and avoids enumerating inaccessible/unrelated localStorage keys.
  const getSnapshot = useCallback(
    () => JSON.stringify(Object.fromEntries(games.map((game) => [game.id, completedCount(game)]))),
    [games],
  );
  const snapshot = useSyncExternalStore(subscribeProgress, getSnapshot);
  return useMemo(() => JSON.parse(snapshot) as Record<string, number>, [snapshot]);
}
