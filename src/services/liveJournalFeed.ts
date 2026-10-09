import type { Article } from '@/types/article';
import { supabase } from '@/lib/supabase';

/**
 * Strips Steam BBCode into clean, readable blog text
 */
export function cleanSteamBBCode(text: string): string {
  if (!text) return '';
  return text
    .replace(/\[img src="\{STEAM_CLAN_IMAGE\}\/([^"]+)"\]\[\/img\]/gi, 'https://clan.fastly.steamstatic.com/images/$1')
    .replace(/\[img[^\]]*\]/gi, '')
    .replace(/\[\/img\]/gi, '')
    .replace(/\{STEAM_CLAN_IMAGE\}\/([^\s"\]]+)/gi, 'https://clan.fastly.steamstatic.com/images/$1')
    .replace(/\[url="([^"]+)"\](.*?)\[\/url\]/gi, '$2 ($1)')
    .replace(/\[url=([^\]]+)\](.*?)\[\/url\]/gi, '$2 ($1)')
    .replace(/\[\/?b\]/gi, '')
    .replace(/\[\/?i\]/gi, '')
    .replace(/\[\/?u\]/gi, '')
    .replace(/\[\/?h1\]/gi, '\n### ')
    .replace(/\[\/?h2\]/gi, '\n### ')
    .replace(/\[\/?h3\]/gi, '\n### ')
    .replace(/\[\/?list\]/gi, '\n')
    .replace(/\[\*\]/gi, '\n• ')
    .replace(/\[\/?p\]/gi, '\n')
    .replace(/\[\/?table\]/gi, '\n')
    .replace(/\[\/?tr\]/gi, '\n')
    .replace(/\[\/?td\]/gi, ' ')
    .replace(/\[\/?th\]/gi, ' ')
    .replace(/\[\/?quote\]/gi, '\n> ')
    .replace(/\\\[/g, '[')
    .replace(/\\\]/g, ']')
    .replace(/\n{3,}/g, '\n\n')
    .trim();
}

/**
 * Calls Steam proxy for store search, appdetails, or news
 */
async function callSteamProxy(action: 'search' | 'details' | 'news', params: { term?: string; appId?: number | string }) {
  const query = new URLSearchParams({ action });
  if (params.term) query.set('term', params.term);
  if (params.appId) query.set('appId', String(params.appId));

  const proxyUrl = `/api/steam-proxy?${query.toString()}`;
  try {
    const res = await fetch(proxyUrl);
    if (res.ok) {
      return await res.json();
    }
  } catch (err) {
    console.warn(`[LiveJournalFeed] Proxy failed for ${action}:`, err);
  }

  // Fallback: direct fetch if in an environment that allows it
  try {
    if (action === 'news' && params.appId) {
      const directUrl = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${params.appId}&count=3&format=json`;
      const res = await fetch(directUrl);
      if (res.ok) return await res.json();
    }
    if (action === 'details' && params.appId) {
      const directUrl = `https://store.steampowered.com/api/appdetails?appids=${params.appId}&l=english`;
      const res = await fetch(directUrl);
      if (res.ok) return await res.json();
    }
    if (action === 'search' && params.term) {
      const directUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(params.term)}&l=english&cc=US`;
      const res = await fetch(directUrl);
      if (res.ok) return await res.json();
    }
  } catch (err) {
    console.error(`[LiveJournalFeed] Direct fallback failed for ${action}:`, err);
  }

  return null;
}

/**
 * Checks whether the current journal articles are expired or within 1 minute of expiring
 */
export function isJournalExpiredOrExpiring(articles: Article[]): boolean {
  if (!articles || articles.length === 0) return true;

  const withExp = articles.find((a) => typeof a.expiresAt === 'number');
  if (!withExp || !withExp.expiresAt) return true;

  const ONE_MINUTE_MS = 60 * 1000;
  const refreshThreshold = withExp.expiresAt - ONE_MINUTE_MS;
  return Date.now() >= refreshThreshold;
}

let isSyncing = false;
let lastSyncAttempt = 0;

/**
 * Synchronizes the live journal feed with Supabase and triggers local state update.
 * Strictly fetches articles generated live by the Python grabber daemon (scripts/grab_journal_feed.py).
 * Contains ZERO hardcoded articles.
 */
export async function syncLiveJournalFeed(
  currentArticles: Article[],
  onUpdate: (articles: Article[]) => void,
  force: boolean = false
): Promise<Article[]> {
  const now = Date.now();
  if (!force && (isSyncing || now - lastSyncAttempt < 30000)) {
    return currentArticles;
  }

  const needsRepopulate = force || isJournalExpiredOrExpiring(currentArticles);
  if (!needsRepopulate) {
    return currentArticles;
  }

  isSyncing = true;
  lastSyncAttempt = now;

  try {
    console.info('[LiveJournalFeed] 🔄 Fetching live journal feed from Supabase (Python grabber output)...');

    const { data: dbData, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 'default')
      .single();

    if (error) {
      console.error('[LiveJournalFeed] Error fetching from Supabase:', error);
      return currentArticles;
    }

    const remoteArticles: Article[] = dbData?.content?.articles || [];
    if (remoteArticles.length > 0) {
      console.info(`[LiveJournalFeed] ✨ Loaded ${remoteArticles.length} live articles from Supabase.`);
      onUpdate(remoteArticles);
      return remoteArticles;
    }

    return currentArticles;
  } catch (err) {
    console.error('[LiveJournalFeed] Error during live journal synchronization:', err);
    return currentArticles;
  } finally {
    isSyncing = false;
  }
}

/**
 * Searches Steam games live for the search tool
 */
export async function searchSteamGamesLive(term: string) {
  if (!term || term.trim().length === 0) return [];
  const data = await callSteamProxy('search', { term: term.trim() });
  return data?.items || [];
}

/**
 * Extracts comprehensive game data live from Steam
 */
export async function extractSteamGameLive(appId: number | string) {
  const data = await callSteamProxy('details', { appId });
  return data?.[appId]?.data || null;
}
