import { useState, useEffect, useCallback } from 'react';

export function useProgress(gameId: string) {
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [showSpoilers, setShowSpoilers] = useState(false);

  const storageKey = `jinssi-progress-${gameId}`;
  const spoilerKey = `jinssi-spoilers-${gameId}`;

  useEffect(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) setCompletedSteps(new Set(JSON.parse(saved)));
      const spoilerSaved = localStorage.getItem(spoilerKey);
      if (spoilerSaved) setShowSpoilers(JSON.parse(spoilerSaved));
    } catch {
      // ignore parse errors
    }
  }, [storageKey, spoilerKey]);

  const toggleStep = useCallback((stepId: string) => {
    setCompletedSteps((prev) => {
      const next = new Set(prev);
      if (next.has(stepId)) next.delete(stepId);
      else next.add(stepId);
      try {
        localStorage.setItem(storageKey, JSON.stringify([...next]));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, [storageKey]);

  const toggleSpoilers = useCallback(() => {
    setShowSpoilers((prev) => {
      const next = !prev;
      try {
        localStorage.setItem(spoilerKey, JSON.stringify(next));
      } catch {
        // ignore storage errors
      }
      return next;
    });
  }, [spoilerKey]);

  const resetProgress = useCallback(() => {
    setCompletedSteps(new Set());
    try {
      localStorage.removeItem(storageKey);
    } catch {
      // ignore
    }
  }, [storageKey]);

  return { completedSteps, toggleStep, showSpoilers, toggleSpoilers, resetProgress };
}
