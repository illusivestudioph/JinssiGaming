import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';
import { games as initialGames, type Game, type WalkthroughSection } from '@/data/games';
import { supabase } from '@/lib/supabase';

export interface WalletOption {
  name: string;
  accountName: string;
  accountNumber: string;
  qrCode?: string;
}

export interface CtaLink {
  id: string;
  label: string;
  url: string;
  wallets?: WalletOption[];
  customMessage?: string;
}

interface SiteContentContextValue {
  games: Game[];
  heroImage: string;
  logoImage: string;
  ctaLinks: CtaLink[];
  setHeroImage: (image: string) => void;
  setLogoImage: (image: string) => void;
  setCtaLinks: (links: CtaLink[]) => void;
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  removeGame: (gameId: string) => void;
  updateWalkthrough: (gameId: string, walkthrough: WalkthroughSection[]) => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);
const storageKey = 'jinssi-site-content';

interface SavedContent {
  games: Game[];
  heroImage: string;
  logoImage: string;
  ctaLinks: CtaLink[];
}

const defaultContent: SavedContent = {
  games: initialGames,
  heroImage: '/banner.jpeg',
  logoImage: '/logo.png',
  ctaLinks: [
    { id: 'link-1', label: 'Email us', url: 'mailto:mjhanesultancruz1514@gmail.com' },
    { id: 'link-2', label: 'Threads @jinssi cruise', url: 'https://threads.net/' },
    { id: 'link-3', label: 'TikTok @jinssi cruise', url: 'https://tiktok.com/' },
    { 
      id: 'link-4', 
      label: 'Buy me coffee ($5)', 
      url: '#', 
      customMessage: 'Thank you so much for supporting the site and fueling late-night gaming sessions! ☕✨',
      wallets: [
        { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
        { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
        { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' },
        { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' }
      ]
    }
  ],
};

function normalizeContent(parsed: Partial<SavedContent> | null | undefined): SavedContent {
  return {
    games: Array.isArray(parsed?.games) ? parsed.games : initialGames,
    heroImage: typeof parsed?.heroImage === 'string' ? parsed.heroImage : defaultContent.heroImage,
    logoImage: typeof parsed?.logoImage === 'string' ? parsed.logoImage : defaultContent.logoImage,
    ctaLinks: Array.isArray(parsed?.ctaLinks) ? parsed.ctaLinks : defaultContent.ctaLinks,
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remoteLoaded, setRemoteLoaded] = useState(false);
  const [content, setContent] = useState<SavedContent>(() => {
    try {
      const saved = localStorage.getItem(storageKey);
      if (!saved) return defaultContent;
      const parsed = JSON.parse(saved) as Partial<SavedContent>;
      return normalizeContent(parsed);
    } catch {
      return defaultContent;
    }
  });

  useEffect(() => {
    let cancelled = false;

    async function loadRemoteContent() {
      const { data, error } = await supabase
        .from('site_content')
        .select('content')
        .eq('id', 'default')
        .maybeSingle();

      if (cancelled) return;

      if (error) {
        console.error('Unable to load site content from Supabase:', error.message);
        setRemoteLoaded(true);
        return;
      }

      if (data?.content) {
        setContent(normalizeContent(data.content as Partial<SavedContent>));
      } else {
        const { error: seedError } = await supabase.from('site_content').upsert({
          id: 'default',
          content: defaultContent,
        });
        if (seedError) {
          console.error('Unable to seed site content in Supabase:', seedError.message);
        }
      }

      setRemoteLoaded(true);
    }

    void loadRemoteContent();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(content));
    } catch {
      // Keep usable if storage is blocked
    }
  }, [content]);

  useEffect(() => {
    if (!remoteLoaded) return;

    void supabase.from('site_content').upsert({
      id: 'default',
      content,
      updated_at: new Date().toISOString(),
    }).then(({ error }) => {
      if (error) console.error('Unable to save site content to Supabase:', error.message);
    });
  }, [content, remoteLoaded]);

  const value = useMemo<SiteContentContextValue>(() => ({
    games: content.games,
    heroImage: content.heroImage,
    logoImage: content.logoImage,
    ctaLinks: content.ctaLinks,
    setHeroImage: (image) => setContent((c) => ({ ...c, heroImage: image })),
    setLogoImage: (image) => setContent((c) => ({ ...c, logoImage: image })),
    setCtaLinks: (links) => setContent((c) => ({ ...c, ctaLinks: links })),
    addGame: (game) => setContent((c) => ({ ...c, games: [...c.games, game] })),
    updateGame: (game) => setContent((c) => ({
      ...c,
      games: c.games.map((item) => (item.id === game.id ? game : item)),
    })),
    removeGame: (gameId) => setContent((c) => ({
      ...c,
      games: c.games.filter((g) => g.id !== gameId),
    })),
    updateWalkthrough: (gameId, walkthrough) => setContent((c) => ({
      ...c,
      games: c.games.map((g) => (g.id === gameId ? { ...g, walkthrough } : g)),
    })),
  }), [content]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error('useSiteContent must be used inside SiteContentProvider');
  return context;
}
