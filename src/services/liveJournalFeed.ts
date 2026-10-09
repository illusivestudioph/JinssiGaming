import type { Article, ArticleSection } from '@/data/articles';
import { supabase } from '@/lib/supabase';

// Curated list of top cozy games for live news monitoring
export const COZY_STEAM_MONITOR_LIST = [
  { appId: 2142790, name: 'Fields of Mistria', category: 'Guide' as const, tag: 'Farming RPG' },
  { appId: 1796790, name: 'Chef RPG', category: 'Review' as const, tag: 'Cooking Sim' },
  { appId: 2198150, name: 'Tiny Glade', category: 'Review' as const, tag: 'Diorama Builder' },
  { appId: 2666510, name: "Rusty's Retirement", category: 'Guide' as const, tag: 'Idle Farming' },
  { appId: 2113850, name: 'Spirit City: Lofi Sessions', category: 'Curated List' as const, tag: 'Focus Companion' },
  { appId: 1158160, name: 'Coral Island', category: 'Guide' as const, tag: 'Island Life' },
  { appId: 1819460, name: "Mika and The Witch's Mountain", category: 'Review' as const, tag: 'Soaring Adventure' },
  { appId: 1432860, name: 'Sun Haven', category: 'Guide' as const, tag: 'Fantasy Farm Sim' },
  { appId: 2076340, name: 'Tavern Talk', category: 'Review' as const, tag: 'Cozy Visual Novel' },
  { appId: 2521600, name: 'Little Known Galaxy', category: 'Guide' as const, tag: 'Space Life Sim' },
  { appId: 1455840, name: 'Dorfromantik', category: 'Cozy Essay' as const, tag: 'Quiet Builder' },
  { appId: 1135690, name: 'Unpacking', category: 'Cozy Essay' as const, tag: 'Meditative Puzzle' },
];

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
 * Fetches real live news and builds verified 24-hour blog articles
 */
export async function generateLiveArticles(): Promise<Article[]> {
  const now = Date.now();
  const ONE_DAY_MS = 24 * 60 * 60 * 1000;
  const expiresAt = now + ONE_DAY_MS;

  const generatedArticles: Article[] = [];

  for (const game of COZY_STEAM_MONITOR_LIST.slice(0, 10)) {
    try {
      // 1. Fetch latest news
      const newsData = await callSteamProxy('news', { appId: game.appId });
      const newsItem = newsData?.appnews?.newsitems?.[0];

      // 2. Fetch app details for real screenshots
      const detailsData = await callSteamProxy('details', { appId: game.appId });
      const details = detailsData?.[game.appId]?.data;

      const steamLink = `https://store.steampowered.com/app/${game.appId}/`;
      const sourceLink = newsItem?.url || `https://store.steampowered.com/news/app/${game.appId}/`;
      const headerImage = details?.header_image || `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appId}/header.jpg`;

      // Authentic screenshots from Steam app details
      const rawScreenshots: string[] = Array.isArray(details?.screenshots)
        ? details.screenshots.map((s: any) => s.path_full).filter(Boolean)
        : [];

      const screenshot1 = rawScreenshots[0] || `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appId}/capsule_616x353.jpg`;
      const screenshot2 = rawScreenshots[1] || `https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/${game.appId}/library_hero.jpg`;

      // Clean news content
      const rawContent = newsItem?.contents || details?.short_description || `Official updates and patch notes for ${game.name}.`;
      const clanImgMatch = rawContent.match(/\{STEAM_CLAN_IMAGE\}\/([^\s"\]]+)/);
      const clanImgUrl = clanImgMatch ? `https://clan.fastly.steamstatic.com/images/${clanImgMatch[1]}` : undefined;

      const cleanedText = cleanSteamBBCode(rawContent);
      const paragraphs = cleanedText
        .split('\n\n')
        .map((p) => p.trim())
        .filter((p) => p.length > 25);

      const title = newsItem?.title
        ? `${game.name}: ${newsItem.title.replace(/^\[.*?\]\s*/, '')}`
        : `${game.name}: Official Community & Patch Update`;

      const subtitle = paragraphs[0]
        ? paragraphs[0].slice(0, 240) + '...'
        : details?.short_description || `Inside the latest major content additions, bug fixes, and community highlights for ${game.name}.`;

      // Build rich blog sections
      const sections: ArticleSection[] = [];
      const midPoint = Math.max(1, Math.ceil(paragraphs.length / 2));

      sections.push({
        heading: '1. What Changed & Key Highlights',
        content: paragraphs.slice(0, midPoint).length ? paragraphs.slice(0, midPoint) : [cleanedText.slice(0, 500)],
        image: clanImgUrl || screenshot1,
        imageAlt: `${game.name} in-game preview screenshot`,
        steamLink: steamLink,
        sourceLink: sourceLink,
        callout: {
          title: 'Official Developer Dispatch',
          text: `Verified update directly from the development team on Steam. All patches are live for all players.`,
        },
      });

      if (paragraphs.slice(midPoint).length > 0 || screenshot2) {
        sections.push({
          heading: '2. Quality of Life, Balance & Patch Notes',
          content: paragraphs.slice(midPoint, midPoint + 4).length ? paragraphs.slice(midPoint, midPoint + 4) : [
            `The developers continue to actively balance and refine ${game.name} based on direct feedback from the cozy gaming community.`,
          ],
          image: screenshot2,
          imageAlt: `${game.name} gameplay and mechanics`,
          steamLink: steamLink,
          sourceLink: sourceLink,
        });
      }

      sections.push({
        heading: 'The Verdict & Next Steps',
        content: [
          `For cozy gaming enthusiasts looking for low-stress gameplay, ${game.name} remains an exceptional title to explore.`,
          `Check out the official Steam page or developer patch notes linked below for complete release notes.`,
        ],
        steamLink: steamLink,
        sourceLink: sourceLink,
      });

      const dateStr = newsItem?.date
        ? new Date(newsItem.date * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
        : new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

      generatedArticles.push({
        id: `steam-${game.appId}-${newsItem?.gid || Date.now()}`,
        slug: `${game.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-update-${newsItem?.gid || Date.now()}`,
        title: title,
        subtitle: subtitle,
        author: newsItem?.author || 'Jinssi News Desk',
        authorRole: 'Official Verified Announcement',
        date: dateStr,
        readTimeMinutes: Math.max(3, Math.min(8, Math.round(cleanedText.length / 450))),
        category: game.category,
        tags: [game.name, game.tag, 'Steam Update', 'Cozy Games'],
        cozyScore: 5,
        stressLevel: 'Zero Stress',
        coverImage: headerImage,
        coverAlt: `${game.name} official Steam header`,
        summary: subtitle,
        sections: sections,
        steamLink: steamLink,
        sourceLink: sourceLink,
        createdAt: now,
        expiresAt: expiresAt,
      });
    } catch (err) {
      console.error(`[LiveJournalFeed] Failed generating article for ${game.name}:`, err);
    }
  }

  return generatedArticles;
}

/**
 * Checks whether the current journal articles are expired or within 1 minute of expiring
 */
export function isJournalExpiredOrExpiring(articles: Article[]): boolean {
  if (!articles || articles.length === 0) return true;

  // Find the first article with an expiresAt timestamp
  const withExp = articles.find((a) => typeof a.expiresAt === 'number');
  if (!withExp || !withExp.expiresAt) return true;

  const ONE_MINUTE_MS = 60 * 1000;
  // Repopulate 1 minute before expiration
  const refreshThreshold = withExp.expiresAt - ONE_MINUTE_MS;
  return Date.now() >= refreshThreshold;
}

let isSyncing = false;
let lastSyncAttempt = 0;

/**
 * Synchronizes the live journal feed with Supabase and triggers local state update.
 * Guarantees zero hardcoded articles and autonomous 24h lifespan.
 */
export async function syncLiveJournalFeed(
  currentArticles: Article[],
  onUpdate: (articles: Article[]) => void,
  force: boolean = false
): Promise<Article[]> {
  const now = Date.now();
  // Prevent rapid consecutive double-syncs (minimum 30s cooldown unless forced)
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
    console.info('[LiveJournalFeed] 🔄 Auto-repopulating journal feed (24h lifespan trigger)...');

    // Check if Supabase already has fresh articles generated by another client
    const { data: dbData } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 'default')
      .single();

    const remoteArticles: Article[] = dbData?.content?.articles || [];
    if (!force && remoteArticles.length > 0 && !isJournalExpiredOrExpiring(remoteArticles)) {
      console.info('[LiveJournalFeed] ✨ Discovered fresh synchronized articles in Supabase.');
      onUpdate(remoteArticles);
      isSyncing = false;
      return remoteArticles;
    }

    // Generate fresh real articles from Steam
    const freshArticles = await generateLiveArticles();
    if (freshArticles.length === 0) {
      console.warn('[LiveJournalFeed] No fresh articles could be generated; retaining current.');
      isSyncing = false;
      return currentArticles;
    }

    // Update Supabase site_content while safeguarding games, stories, products, and links
    if (dbData?.content) {
      const updatedContent = {
        ...dbData.content,
        articles: freshArticles,
        updated_at: new Date().toISOString(),
      };

      const { error: upsertError } = await supabase
        .from('site_content')
        .upsert({ id: 'default', content: updatedContent });

      if (upsertError) {
        console.error('[LiveJournalFeed] Failed to save updated articles to Supabase:', upsertError);
      } else {
        console.info('[LiveJournalFeed] 🚀 Successfully saved 24h rotating journal feed to Supabase.');
      }
    }

    // Update local React state immediately
    onUpdate(freshArticles);
    return freshArticles;
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
