import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { getProgress, setProgress, subscribeProgress } from '@/lib/progress';

export function useProgress(gameId: string, validStepKeys: string[]) {
  const getSnapshot = useCallback(() => getProgress(gameId), [gameId]);
  const snapshot = useSyncExternalStore(subscribeProgress, getSnapshot);
  const valid = useMemo(() => new Set(validStepKeys), [validStepKeys]);
  const completedSteps = useMemo(
    () => new Set(snapshot.completed.filter((id) => valid.has(id))),
    [snapshot, valid],
  );

  const toggleStep = useCallback(
    (id: string) => {
      if (!valid.has(id)) return;
      const current = getProgress(gameId);
      const next = new Set(current.completed.filter((key) => valid.has(key)));
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setProgress(gameId, { completed: [...next], showSpoilers: current.showSpoilers });
    },
    [gameId, valid],
  );
  const toggleSpoilers = useCallback(() => {
    const current = getProgress(gameId);
    setProgress(gameId, { completed: current.completed, showSpoilers: !current.showSpoilers });
  }, [gameId]);
  const resetProgress = useCallback(() => {
    setProgress(gameId, { completed: [], showSpoilers: getProgress(gameId).showSpoilers });
  }, [gameId]);

  return {
    completedSteps,
    toggleStep,
    showSpoilers: snapshot.showSpoilers,
    toggleSpoilers,
    resetProgress,
    persisted: snapshot.persisted,
  };
}
