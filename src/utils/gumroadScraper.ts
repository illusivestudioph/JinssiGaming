export interface ScrapedGumroadProduct {
  title: string;
  price: string;
  originalPrice?: string;
  coverImage: string;
  description: string;
  features: string[];
  category: string;
  badge?: string;
}

function decodeHtmlEntities(str: string): string {
  if (!str) return '';
  try {
    const doc = new DOMParser().parseFromString(str, 'text/html');
    return doc.body.textContent || doc.documentElement.textContent || str;
  } catch {
    return str
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>');
  }
}

function inferCategory(text: string): string {
  const lower = text.toLowerCase();
  if (lower.includes('coloring') || lower.includes('grimoire') || lower.includes('printable') || lower.includes('pdf planner') || lower.includes('stationery')) {
    return 'Printables';
  }
  if (lower.includes('notion') || lower.includes('dashboard') || lower.includes('template')) {
    return 'Notion Templates';
  }
  if (lower.includes('wallpaper') || lower.includes('pixel') || lower.includes('art') || lower.includes('icon pack')) {
    return 'Wallpapers & Art';
  }
  if (lower.includes('guide') || lower.includes('walkthrough') || lower.includes('checklist') || lower.includes('field guide')) {
    return 'Guides & Planners';
  }
  if (lower.includes('sound') || lower.includes('audio') || lower.includes('music') || lower.includes('bgm') || lower.includes('lofi')) {
    return 'Audio & Assets';
  }
  return 'Printables';
}

function formatCurrency(cents: number | null | undefined, currencyCode = 'usd', isPwyw = false): string {
  if (isPwyw && (cents === null || cents === undefined || cents === 0)) {
    return 'Free / $0+';
  }
  if (cents === null || cents === undefined) {
    return '$0';
  }

  const amount = cents / 100;
  const curr = currencyCode.toUpperCase();
  const symbol = curr === 'USD' ? '$' : curr === 'PHP' ? '₱' : `${curr} `;

  return Number.isInteger(amount) ? `${symbol}${amount}` : `${symbol}${amount.toFixed(2)}`;
}

export async function fetchGumroadProductDetails(rawUrl: string): Promise<ScrapedGumroadProduct> {
  let url = rawUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }

  let html = '';

  // Strategy 1: Try Cloudflare Pages serverless proxy endpoint
  try {
    const res = await fetch(`/api/gumroad-grab?url=${encodeURIComponent(url)}`, {
      headers: { Accept: 'text/html,application/json' },
    });
    if (res.ok) {
      const text = await res.text();
      // Ensure it's not a JSON error
      if (text && !text.startsWith('{"error"')) {
        html = text;
      }
    }
  } catch {
    // Continue to next strategy
  }

  // Strategy 2: Try AllOrigins CORS proxy
  if (!html) {
    try {
      const res = await fetch(`https://api.allorigins.win/get?url=${encodeURIComponent(url)}`);
      if (res.ok) {
        const json = await res.json();
        if (json?.contents) {
          html = json.contents;
        }
      }
    } catch {
      // Continue to next strategy
    }
  }

  // Strategy 3: Try direct fetch (in case CORS is permitted)
  if (!html) {
    try {
      const res = await fetch(url);
      if (res.ok) {
        html = await res.text();
      }
    } catch {
      // Failed all strategies
    }
  }

  if (!html) {
    throw new Error('Unable to retrieve Gumroad product page. Please verify your link.');
  }

  let title = '';
  let price = '$5.00';
  let originalPrice = '';
  let coverImage = '';
  let description = '';
  const features: string[] = [];

  // Parse Inertia.js data-page payload if present
  const dataPageMatch = html.match(/data-page="([^"]+)"/);
  if (dataPageMatch) {
    try {
      const rawJson = decodeHtmlEntities(dataPageMatch[1]);
      const data = JSON.parse(rawJson);
      const product = data?.props?.product;

      if (product) {
        title = decodeHtmlEntities(product.name || '');
        const cents = product.price_cents;
        const pwyw = !!product.pwyw;
        const curr = product.currency_code || 'usd';
        price = formatCurrency(cents, curr, pwyw);

        // Covers
        if (Array.isArray(product.covers) && product.covers.length > 0 && product.covers[0]?.url) {
          coverImage = product.covers[0].url;
        } else if (product.thumbnail_url) {
          coverImage = product.thumbnail_url;
        }

        // HTML Description & Features
        const descHtml = product.description_html || '';
        if (descHtml) {
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = descHtml;

          // Extract list items as features
          const lis = tempDiv.querySelectorAll('li');
          lis.forEach((li) => {
            const txt = li.textContent?.trim();
            if (txt && !features.includes(txt)) {
              features.push(txt);
            }
          });

          // Convert paragraphs and linebreaks
          const text = tempDiv.innerText || tempDiv.textContent || '';
          description = text.trim();
        }
      }
    } catch (e) {
      console.warn('Failed to parse Gumroad data-page JSON:', e);
    }
  }

  // Fallback to OpenGraph / Meta tags parsing if fields are missing
  if (!title || !coverImage || !description) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');

    if (!title) {
      const ogTitle = doc.querySelector('meta[property="og:title"]')?.getAttribute('content');
      const titleTag = doc.querySelector('title')?.textContent;
      title = ogTitle || titleTag || '';
    }

    if (!coverImage) {
      const ogImage = doc.querySelector('meta[property="og:image"]')?.getAttribute('content');
      const twitterImage = doc.querySelector('meta[property="twitter:image"]')?.getAttribute('content');
      coverImage = ogImage || twitterImage || '';
    }

    if (!description) {
      const ogDesc = doc.querySelector('meta[property="og:description"]')?.getAttribute('content');
      const metaDesc = doc.querySelector('meta[name="description"]')?.getAttribute('content');
      description = ogDesc || metaDesc || '';
    }

    if (!price) {
      const priceAmount = doc.querySelector('meta[property="product:price:amount"]')?.getAttribute('content');
      const priceCurrency = doc.querySelector('meta[property="product:price:currency"]')?.getAttribute('content') || 'USD';
      if (priceAmount) {
        const num = parseFloat(priceAmount);
        const symbol = priceCurrency.toUpperCase() === 'USD' ? '$' : `${priceCurrency} `;
        price = `${symbol}${num}`;
      }
    }
  }

  // If no features found from <li>, try splitting description lines with bullets (•, -, *)
  if (features.length === 0 && description) {
    const lines = description.split('\n');
    lines.forEach((line) => {
      const trimmed = line.trim();
      if (/^[•\-*]\s+/.test(trimmed)) {
        const cleaned = trimmed.replace(/^[•\-*]\s+/, '').trim();
        if (cleaned && !features.includes(cleaned)) {
          features.push(cleaned);
        }
      }
    });
  }

  const category = inferCategory(`${title} ${description}`);
  const badge = price.includes('Free') || price.includes('$0') ? 'Free / $0+' : 'New';

  return {
    title: title.trim(),
    price: price || '$4.99',
    originalPrice,
    coverImage,
    description: description.trim(),
    features: features.length > 0 ? features : ['Instant digital download', 'Free lifetime updates'],
    category,
    badge,
  };
}
