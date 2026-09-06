import { createContext, useContext } from 'react';
import type { Game } from '@/data/games';
import type { SiteContent, SiteSettings } from '@/types/content';

export interface SiteContentContextValue extends SiteContent {
  loading: boolean;
  error: string | null;
  isRemote: boolean;
  gameRevisions: Record<string, number>;
  settingsRevision: number;
  reload: () => Promise<void>;
  saveSettings: (settings: SiteSettings, revision: number) => Promise<number>;
  saveGame: (game: Game, revision?: number) => Promise<void>;
  removeGame: (id: string, revision: number) => Promise<void>;
}

export const SiteContentContext = createContext<SiteContentContextValue | null>(null);

export function useSiteContent() {
  const value = useContext(SiteContentContext);
  if (!value) throw new Error('useSiteContent must be used inside SiteContentProvider');
  return value;
}
