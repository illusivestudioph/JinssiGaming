import type { Game } from '@/data/games';
import type { SiteContent, SiteSettings } from '@/types/content';
import type { Database, Json } from '@/types/database';
import { requireSupabase } from './supabase';
import { gameSchema, settingsSchema } from './validation';

type GameRow = Database['public']['Tables']['games']['Row'];
export interface ContentSnapshot {
  content: SiteContent;
  gameRevisions: Record<string, number>;
  settingsRevision: number;
}

export function gameFromRow(row: GameRow): Game {
  return gameSchema.parse({
    id: row.id,
    title: row.title,
    developer: row.developer,
    category: row.category,
    description: row.description,
    accentColor: row.accent_color,
    coverImage: row.cover_image,
    coverAlt: row.cover_alt,
    walkthrough: row.walkthrough,
  });
}

export function gameToRow(value: Game): Database['public']['Tables']['games']['Insert'] {
  const game = gameSchema.parse(value);
  return {
    id: game.id,
    title: game.title,
    developer: game.developer,
    category: game.category,
    description: game.description,
    accent_color: game.accentColor,
    cover_image: game.coverImage,
    cover_alt: game.coverAlt,
    walkthrough: game.walkthrough as unknown as Json,
  };
}

export async function loadContent(signal: AbortSignal): Promise<ContentSnapshot> {
  const client = requireSupabase();
  const settingsRequest = client
    .from('site_settings')
    .select('*')
    .eq('id', true)
    .abortSignal(signal)
    .single();
  const gamesRequest = async () => {
    const rows: GameRow[] = [];
    // Page explicitly so the PostgREST row cap cannot silently truncate the directory.
    for (let from = 0; ; from += 100) {
      const { data, error } = await client
        .from('games')
        .select('*')
        .order('id')
        .range(from, from + 99)
        .abortSignal(signal);
      if (error) throw error;
      rows.push(...data);
      if (data.length < 100) return rows;
    }
  };
  const [settingsResult, rows] = await Promise.all([settingsRequest, gamesRequest()]);
  if (settingsResult.error)
    throw new Error(
      `Could not load site settings. Apply the Supabase migrations and retry. ${settingsResult.error.message}`,
    );
  const row = settingsResult.data;
  const settings = settingsSchema.parse({
    heroImage: row.hero_image,
    logoImage: row.logo_image,
    ctaLinks: row.cta_links,
  });
  return {
    content: { ...settings, games: rows.map(gameFromRow) },
    gameRevisions: Object.fromEntries(rows.map((game) => [game.id, game.revision])),
    settingsRevision: row.revision,
  };
}

const conflict = () =>
  new Error(
    'This content changed in another session or your admin access expired. Reload the published content before retrying. Your draft has not been saved.',
  );

export async function persistGame(game: Game, revision?: number) {
  const client = requireSupabase();
  const row = gameToRow(game);
  const { id, ...updates } = row;
  const { data, error } =
    revision === undefined
      ? await client.from('games').insert(row).select('*').single()
      : await client
          .from('games')
          .update(updates)
          .eq('id', id)
          .eq('revision', revision)
          .select('*')
          .maybeSingle();
  if (error) throw error;
  if (!data) throw conflict();
  return { game: gameFromRow(data), revision: data.revision };
}

export async function persistSettings(value: SiteSettings, revision: number) {
  const settings = settingsSchema.parse(value);
  const { data, error } = await requireSupabase()
    .from('site_settings')
    .update({
      hero_image: settings.heroImage,
      logo_image: settings.logoImage,
      cta_links: settings.ctaLinks as unknown as Json,
    })
    .eq('id', true)
    .eq('revision', revision)
    .select('*')
    .maybeSingle();
  if (error) throw error;
  if (!data) throw conflict();
  return { settings, revision: data.revision };
}

export async function deleteGame(id: string, revision: number) {
  const { data, error } = await requireSupabase()
    .from('games')
    .delete()
    .eq('id', id)
    .eq('revision', revision)
    .select('id')
    .maybeSingle();
  if (error) throw error;
  if (!data) throw conflict();
}
