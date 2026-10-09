import { supabase } from '@/lib/supabase';
import type { Article } from '@/data/articles';
import type { SavedContent } from '@/context/SiteContentContext';

const YDC_API_KEY = import.meta.env.VITE_YDC_API_KEY || 'ydc-sk-38b879a9076b26a9-0S9IUejsmjmyAbnbGJZMb8bnyXksPQEg-7ae94ca6';

interface YouWebResult {
  url: string;
  title: string;
  description?: string;
}

/**
 * Automatically checks if today's daily cozy gaming journal exists.
 * If not, automatically runs live search on You.com, generates today's article,
 * publishes it to Supabase site_content, and updates the site live for all visitors!
 */
export async function ensureTodayJournalEntry(
  currentArticles: Article[],
  onNewArticle: (article: Article) => void
): Promise<void> {
  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dateSlug = today.toISOString().split('T')[0];

  // 1. Check if today's entry already exists
  const alreadyExists = currentArticles.some(
    (a) => a.date === dateStr && a.id.startsWith('journal-')
  );
  if (alreadyExists) return;

  // Prevent multiple concurrent runs in same browser session
  const sessionCheckKey = `jinssi_journal_checked_${dateSlug}`;
  if (sessionStorage.getItem(sessionCheckKey)) return;
  sessionStorage.setItem(sessionCheckKey, 'true');

  try {
    // 2. Query You.com search API
    const searchUrl = `https://api.you.com/v1/search?query=${encodeURIComponent(
      'top new cozy games 2026 steam upcoming releases news'
    )}`;
    const res = await fetch(searchUrl, {
      headers: {
        Authorization: `Bearer ${YDC_API_KEY}`,
      },
    });

    if (!res.ok) {
      console.warn('You.com automated journal query status:', res.status);
      return;
    }

    const data = await res.json();
    const webResults: YouWebResult[] = data?.results?.web || [];
    if (webResults.length === 0) return;

    // Pick top 4 news items
    const topItems = webResults.slice(0, 4);
    const sections = topItems.map((item, idx) => ({
      heading: item.title.replace(/\|.*$/, '').trim(),
      content: [
        item.description || 'Latest spotlight and community updates from the cozy indie scene.',
        `Source highlight: Readers can explore the full coverage and announcements directly at ${item.url}`,
      ],
      image:
        idx === 0
          ? 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1629520/ss_dfd3c87efd52db3ea48b4de22de569bd9eb42ca2.1920x1080.jpg'
          : undefined,
      imageAlt: `${item.title} preview screenshot`,
      callout:
        idx === 0
          ? {
              title: 'Cozy Radar Tip',
              text: 'Keep a warm cup of tea ready as these upcoming titles bring gentle mechanics, pastel palettes, and soothing soundscapes.',
            }
          : undefined,
    }));

    const newArticle: Article = {
      id: `journal-${dateSlug}-cozy-roundup`,
      slug: `daily-cozy-gaming-radar-${dateSlug}`,
      title: `Daily Cozy Gaming Radar: Top Releases & News (${dateStr})`,
      subtitle: `Fresh from the community: the newest relaxing simulation, farming, and organizing games trending on Steam and consoles today.`,
      author: 'Jinssi Editorial',
      authorRole: 'Cozy Gaming Curator',
      date: dateStr,
      readTimeMinutes: 5,
      category: 'Curated List',
      tags: ['Daily Radar', 'Cozy Games', 'Steam', 'Indie News', 'Releases'],
      cozyScore: 5,
      stressLevel: 'Zero Stress',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80',
      coverAlt: 'Cozy retro gaming and relaxing setup',
      summary: `Your daily curated briefing powered by live web search on You.com, covering the sweetest new organizing, exploration, and low-stress indie games released and announced today.`,
      sections,
    };

    // 3. Update Supabase site_content table so all visitors see it permanently
    const { data: dbData } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 'default')
      .maybeSingle();

    if (dbData?.content) {
      const existingSaved = dbData.content as SavedContent;
      const filtered = (existingSaved.articles || []).filter(
        (a) => a.id !== newArticle.id && a.slug !== newArticle.slug
      );
      const updatedArticles = [newArticle, ...filtered];
      await supabase.from('site_content').upsert({
        id: 'default',
        content: {
          ...existingSaved,
          articles: updatedArticles,
          updated_at: new Date().toISOString(),
        },
        updated_at: new Date().toISOString(),
      });
    }

    // 4. Update local state
    onNewArticle(newArticle);
  } catch (err) {
    console.warn('Background auto-journal generation skipped:', err);
  }
}
