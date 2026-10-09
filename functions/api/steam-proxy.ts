export async function onRequestGet(context: { request: Request }): Promise<Response> {
  const requestUrl = new URL(context.request.url);
  const action = requestUrl.searchParams.get('action'); // 'search' | 'details' | 'news'
  const term = requestUrl.searchParams.get('term') || '';
  const appId = requestUrl.searchParams.get('appId') || '';

  const corsHeaders = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Cache-Control': 'public, max-age=300',
  };

  try {
    if (action === 'search') {
      if (!term) {
        return new Response(JSON.stringify({ total: 0, items: [] }), { headers: corsHeaders });
      }
      const steamUrl = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(term)}&l=english&cc=US`;
      const res = await fetch(steamUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    if (action === 'details') {
      if (!appId) {
        return new Response(JSON.stringify({ error: 'appId required' }), { status: 400, headers: corsHeaders });
      }
      const steamUrl = `https://store.steampowered.com/api/appdetails?appids=${encodeURIComponent(appId)}&l=english`;
      const res = await fetch(steamUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    if (action === 'news') {
      if (!appId) {
        return new Response(JSON.stringify({ error: 'appId required' }), { status: 400, headers: corsHeaders });
      }
      const steamUrl = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${encodeURIComponent(appId)}&count=3&format=json`;
      const res = await fetch(steamUrl, {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      });
      const data = await res.json();
      return new Response(JSON.stringify(data), { headers: corsHeaders });
    }

    return new Response(JSON.stringify({ error: 'Invalid action. Supported: search, details, news' }), {
      status: 400,
      headers: corsHeaders,
    });
  } catch (err: any) {
    return new Response(JSON.stringify({ error: err?.message || 'Failed steam proxy request' }), {
      status: 500,
      headers: corsHeaders,
    });
  }
}
