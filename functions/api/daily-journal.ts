// Cloudflare Pages Serverless Function: /api/daily-journal
// Runs on Cloudflare Edge to provide on-demand automated journal generation

export async function onRequest(context: { env: Record<string, string> }): Promise<Response> {
  const YDC_API_KEY = context.env.YDC_API_KEY || context.env.VITE_YDC_API_KEY || 'ydc-sk-38b879a9076b26a9-0S9IUejsmjmyAbnbGJZMb8bnyXksPQEg-7ae94ca6';
  const SUPABASE_URL = context.env.VITE_SUPABASE_URL || 'https://esjwkwgjnesyvnvuonmd.supabase.co';
  const SUPABASE_KEY = context.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ';

  try {
    const today = new Date();
    const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    const dateSlug = today.toISOString().split('T')[0];

    // 1. Fetch current content from Supabase
    const getRes = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.default&select=*`, {
      headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
    });
    const rows = await getRes.json();
    const currentContent = rows[0]?.content || {};
    const currentArticles = Array.isArray(currentContent.articles) ? currentContent.articles : [];

    // Check if already created for today
    const existing = currentArticles.find((a: any) => a.date === dateStr && a.id.startsWith('journal-'));
    if (existing) {
      return new Response(JSON.stringify({ status: 'already_exists', article: existing }), {
        headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
      });
    }

    // 2. Query You.com
    const searchUrl = `https://api.you.com/v1/search?query=${encodeURIComponent(
      'top new cozy games 2026 steam upcoming releases news'
    )}`;
    const youRes = await fetch(searchUrl, {
      headers: { 'Authorization': `Bearer ${YDC_API_KEY}` }
    });
    const youData = await youRes.json();
    const webResults = youData?.results?.web || [];

    const topItems = webResults.slice(0, 4);
    const sections = topItems.map((item: any, idx: number) => ({
      heading: item.title.replace(/\|.*$/, '').trim(),
      content: [
        item.description || 'Latest spotlight and community updates from the cozy indie scene.',
        `Source highlight: Readers can explore the full coverage directly at ${item.url}`
      ],
      image: idx === 0 ? 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1629520/ss_dfd3c87efd52db3ea48b4de22de569bd9eb42ca2.1920x1080.jpg' : undefined,
      imageAlt: `${item.title} preview screenshot`,
      callout: idx === 0 ? {
        title: 'Cozy Radar Tip',
        text: 'Keep a warm cup of tea ready as these upcoming titles bring gentle mechanics, pastel palettes, and soothing soundscapes.'
      } : undefined
    }));

    const newArticle = {
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
      sections
    };

    // 3. Upsert to Supabase
    const updatedArticles = [newArticle, ...currentArticles.filter((a: any) => a.id !== newArticle.id)];
    const updatedContent = {
      ...currentContent,
      articles: updatedArticles,
      updated_at: new Date().toISOString()
    };

    await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_KEY,
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'resolution=merge-duplicates'
      },
      body: JSON.stringify({
        id: 'default',
        content: updatedContent,
        updated_at: updatedContent.updated_at
      })
    });

    return new Response(JSON.stringify({ status: 'created', article: newArticle }), {
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' }
    });
  }
}
