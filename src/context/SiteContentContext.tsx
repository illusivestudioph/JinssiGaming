import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import { defaultContent } from '@/data/siteContent';
import { useAuth } from './auth';
import { SiteContentContext, type SiteContentContextValue } from './siteContent';
import { supabase, supabaseConfigurationError } from '@/lib/supabase';
import {
  loadContent,
  persistGame,
  persistSettings,
  deleteGame,
  type ContentSnapshot,
} from '@/lib/contentApi';
import { readPreviewContent } from '@/lib/legacyContent';
import { errorMessage } from '@/lib/validation';

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const { isAdmin } = useAuth();
  const [snapshot, setSnapshot] = useState<ContentSnapshot>(() => ({
    content: supabase ? { ...defaultContent, games: [] } : readPreviewContent(),
    gameRevisions: {},
    settingsRevision: 0,
  }));
  const [loading, setLoading] = useState(Boolean(supabase));
  const [error, setError] = useState<string | null>(supabaseConfigurationError);
  const request = useRef<AbortController | null>(null);

  const reload = useCallback(async () => {
    if (!supabase) return;
    request.current?.abort();
    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setError(null);
    try {
      const result = await loadContent(controller.signal);
      if (!controller.signal.aborted) setSnapshot(result);
    } catch (cause) {
      if (!controller.signal.aborted) setError(errorMessage(cause));
    } finally {
      if (!controller.signal.aborted) setLoading(false);
    }
  }, []);

  useEffect(() => {
    void reload();
    return () => request.current?.abort();
  }, [reload]);

  const assertAdmin = () => {
    if (!supabase || !isAdmin)
      throw new Error('Only an authenticated site admin can publish changes.');
  };

  const value: SiteContentContextValue = {
    ...snapshot.content,
    loading,
    error,
    isRemote: Boolean(supabase),
    gameRevisions: snapshot.gameRevisions,
    settingsRevision: snapshot.settingsRevision,
    reload,
    saveSettings: async (settings, revision) => {
      assertAdmin();
      const saved = await persistSettings(settings, revision);
      setSnapshot((current) => ({
        ...current,
        content: { ...current.content, ...saved.settings },
        settingsRevision: saved.revision,
      }));
      return saved.revision;
    },
    saveGame: async (game, revision) => {
      assertAdmin();
      const saved = await persistGame(game, revision);
      setSnapshot((current) => ({
        ...current,
        gameRevisions: { ...current.gameRevisions, [game.id]: saved.revision },
        content: {
          ...current.content,
          games:
            revision === undefined
              ? [...current.content.games.filter((item) => item.id !== game.id), saved.game]
              : current.content.games.map((item) => (item.id === game.id ? saved.game : item)),
        },
      }));
    },
    removeGame: async (id, revision) => {
      assertAdmin();
      await deleteGame(id, revision);
      setSnapshot((current) => {
        const revisions = { ...current.gameRevisions };
        delete revisions[id];
        return {
          ...current,
          gameRevisions: revisions,
          content: {
            ...current.content,
            games: current.content.games.filter((game) => game.id !== id),
          },
        };
      });
    },
  };

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}
