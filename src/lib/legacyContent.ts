import { defaultContent } from '@/data/siteContent';
import type { SiteContent } from '@/types/content';
import { gameSchema, settingsSchema } from './validation';
import { readStoredJson } from './storage';

// Local CMS data is never silently uploaded to a configured project. Invalid
// records are isolated, and the original storage entry is left untouched.
export function readPreviewContent(): SiteContent {
  const saved = readStoredJson('jinssi-site-content');
  if (!saved || typeof saved !== 'object') return structuredClone(defaultContent);
  const value = saved as Record<string, unknown>;
  const settings = settingsSchema.safeParse(value);
  const games = Array.isArray(value.games)
    ? value.games.flatMap((game) => {
        const parsed = gameSchema.safeParse(game);
        return parsed.success ? [parsed.data] : [];
      })
    : defaultContent.games;
  const uniqueGames = games.filter(
    (game, index) => games.findIndex((item) => item.id === game.id) === index,
  );
  return structuredClone({
    ...(settings.success ? settings.data : defaultContent),
    games: uniqueGames,
  });
}
