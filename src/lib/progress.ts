import type { Game } from '@/data/games';
import { readStoredJson, writeStoredJson } from './storage';

export interface ProgressSnapshot {
  completed: string[];
  showSpoilers: boolean;
  persisted: boolean;
}
const snapshots = new Map<string, ProgressSnapshot>();
const listeners = new Set<() => void>();

export function parseCompletedSteps(value: unknown): string[] {
  return Array.isArray(value)
    ? [
        ...new Set(
          value.filter(
            (id): id is string => typeof id === 'string' && id.length > 0 && id.length <= 201,
          ),
        ),
      ]
    : [];
}

export function stepKeys(game: Game): string[] {
  return game.walkthrough.flatMap((section) =>
    section.steps.map((step) => `${section.id}-${step.id}`),
  );
}

export function getProgress(gameId: string): ProgressSnapshot {
  let snapshot = snapshots.get(gameId);
  if (!snapshot) {
    snapshot = {
      completed: parseCompletedSteps(readStoredJson(`jinssi-progress-${gameId}`)),
      showSpoilers: readStoredJson(`jinssi-spoilers-${gameId}`) === true,
      persisted: true,
    };
    snapshots.set(gameId, snapshot);
  }
  return snapshot;
}

export function setProgress(
  gameId: string,
  progress: Pick<ProgressSnapshot, 'completed' | 'showSpoilers'>,
) {
  const savedSteps = writeStoredJson(`jinssi-progress-${gameId}`, progress.completed);
  const savedSpoilers = writeStoredJson(`jinssi-spoilers-${gameId}`, progress.showSpoilers);
  snapshots.set(gameId, { ...progress, persisted: savedSteps && savedSpoilers });
  listeners.forEach((listener) => listener());
}

function onStorage(event: StorageEvent) {
  // sessionStorage changes must not invalidate device-local progress.
  try {
    if (event.storageArea && event.storageArea !== localStorage) return;
  } catch {
    /* blocked storage */
  }
  if (event.key === null) snapshots.clear();
  else if (event.key.startsWith('jinssi-progress-'))
    snapshots.delete(event.key.slice('jinssi-progress-'.length));
  else if (event.key.startsWith('jinssi-spoilers-'))
    snapshots.delete(event.key.slice('jinssi-spoilers-'.length));
  else return;
  listeners.forEach((listener) => listener());
}

export function subscribeProgress(listener: () => void) {
  if (listeners.size === 0) window.addEventListener('storage', onStorage);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0) {
      window.removeEventListener('storage', onStorage);
      // Read fresh storage on the next subscription (e.g. after changing tabs).
      // Keep in-memory writes when storage is unavailable.
      for (const [id, snapshot] of snapshots) if (snapshot.persisted) snapshots.delete(id);
    }
  };
}

export function completedCount(game: Game): number {
  const valid = new Set(stepKeys(game));
  return getProgress(game.id).completed.filter((id) => valid.has(id)).length;
}

export function progressPercent(completed: number, total: number): number {
  if (!Number.isFinite(completed) || !Number.isFinite(total) || total <= 0) return 0;
  return Math.round(Math.min(1, Math.max(0, completed / total)) * 100);
}
