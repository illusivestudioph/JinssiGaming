import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env.local
const envPath = path.resolve(__dirname, '../.env.local');
let YDC_API_KEY = process.env.YDC_API_KEY;
let SUPABASE_URL = process.env.VITE_SUPABASE_URL || 'https://esjwkwgjnesyvnvuonmd.supabase.co';
let SUPABASE_KEY = process.env.VITE_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_AlvHUSVaBIQMqj6vRuNsww_Uokx0SsJ';

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (trimmed.startsWith('YDC_API_KEY=')) {
      YDC_API_KEY = trimmed.split('=')[1]?.trim();
    }
  }
}

if (!YDC_API_KEY) {
  console.error('Missing YDC_API_KEY in .env.local');
  process.exit(1);
}

async function searchYouCom(query) {
  const url = `https://api.you.com/v1/search?query=${encodeURIComponent(query)}`;
  const res = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${YDC_API_KEY}`
    }
  });
  if (!res.ok) {
    throw new Error(`You.com API error: ${res.status} ${res.statusText}`);
  }
  return await res.json();
}

async function main() {
  console.log('🔍 Querying You.com for top recent cozy gaming news & releases...');
  const searchResults = await searchYouCom('top new cozy games 2026 steam upcoming releases news');
  const webResults = searchResults?.results?.web || [];

  if (webResults.length === 0) {
    console.log('No web results found.');
    return;
  }

  console.log(`Found ${webResults.length} web sources from You.com.`);

  const today = new Date();
  const dateStr = today.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const dateSlug = today.toISOString().split('T')[0];

  // Pick top 3-4 news items
  const topItems = webResults.slice(0, 4);

  const sections = topItems.map((item, idx) => ({
    heading: item.title.replace(/\|.*$/, '').trim(),
    content: [
      item.description || 'Latest spotlight and community updates from the cozy indie scene.',
      `Source highlight: Readers can explore the full coverage and announcements directly at ${item.url}`
    ],
    image: idx === 0 
      ? 'https://shared.akamai.steamstatic.com/store_item_assets/steam/apps/1629520/ss_dfd3c87efd52db3ea48b4de22de569bd9eb42ca2.1920x1080.jpg'
      : undefined,
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

  // Upsert to Supabase site_content
  console.log('📡 Updating Supabase site_content table...');
  const getRes = await fetch(`${SUPABASE_URL}/rest/v1/site_content?id=eq.default&select=*`, {
    headers: { 'apikey': SUPABASE_KEY, 'Authorization': `Bearer ${SUPABASE_KEY}` }
  });
  const rows = await getRes.json();
  const currentContent = rows[0]?.content || {};
  const currentArticles = Array.isArray(currentContent.articles) ? currentContent.articles : [];

  // Filter out any previous article with same id and prepend new one
  const filteredArticles = currentArticles.filter(a => a.id !== newArticle.id && a.slug !== newArticle.slug);
  const updatedArticles = [newArticle, ...filteredArticles];

  const updatedContent = {
    ...currentContent,
    articles: updatedArticles,
    updated_at: new Date().toISOString()
  };

  const pushRes = await fetch(`${SUPABASE_URL}/rest/v1/site_content`, {
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

  if (!pushRes.ok) {
    console.error('Failed to update Supabase:', pushRes.status, await pushRes.text());
  } else {
    console.log('✅ Daily Journal successfully published to Supabase live site!');
    console.log(`Title: "${newArticle.title}"`);
  }
}

main().catch(console.error);
