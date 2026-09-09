import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { games as initialGames, type Game, type WalkthroughSection } from '@/data/games';
import { articles as initialArticles, type Article } from '@/data/articles';
import { stories as initialStories, type Story } from '@/data/stories';
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

export type CloudSyncStatus = 'synced' | 'saving' | 'error' | 'offline';

export interface SavedContent {
  games: Game[];
  articles: Article[];
  stories: Story[];
  heroImage: string;
  logoImage: string;
  ctaLinks: CtaLink[];
  updated_at: string;
}

export interface SiteContentContextValue {
  games: Game[];
  articles: Article[];
  stories: Story[];
  heroImage: string;
  logoImage: string;
  ctaLinks: CtaLink[];
  updatedAt: string;
  syncStatus: CloudSyncStatus;
  lastSyncedAt: string | null;
  forceCloudSync: () => Promise<void>;
  setHeroImage: (image: string) => void;
  setLogoImage: (image: string) => void;
  setCtaLinks: (links: CtaLink[]) => void;
  addGame: (game: Game) => void;
  updateGame: (game: Game) => void;
  removeGame: (gameId: string) => void;
  updateWalkthrough: (gameId: string, walkthrough: WalkthroughSection[]) => void;
  addArticle: (article: Article) => void;
  updateArticle: (article: Article) => void;
  removeArticle: (articleId: string) => void;
  addStory: (story: Story) => void;
  updateStory: (story: Story) => void;
  removeStory: (storyId: string) => void;
}

const SiteContentContext = createContext<SiteContentContextValue | null>(null);
const storageKey = 'jinssi-site-content';
const BROADCAST_CHANNEL_NAME = 'jinssi_site_content_channel';

const defaultContent: SavedContent = {
  games: initialGames,
  articles: initialArticles,
  stories: initialStories,
  heroImage: '/banner.jpeg',
  logoImage: '/image.png',
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
  updated_at: new Date(0).toISOString(),
};

function normalizeContent(parsed: Partial<SavedContent> | null | undefined): SavedContent {
  const normalizedCtaLinks = Array.isArray(parsed?.ctaLinks)
    ? parsed.ctaLinks.map((link) => ({
        ...link,
        wallets: Array.isArray(link.wallets)
          ? link.wallets.map((wallet) => {
              const walletRecord = wallet as WalletOption & {
                qr?: string;
                qr_code?: string;
                image?: string;
              };
              return {
                ...wallet,
                qrCode: wallet.qrCode || walletRecord.qr || walletRecord.qr_code || walletRecord.image || '',
              };
            })
          : link.wallets,
      }))
    : defaultContent.ctaLinks;

  let normalizedArticles = initialArticles;

  if (Array.isArray(parsed?.articles) && parsed.articles.length > 0) {
    const existingIds = new Set(parsed.articles.map((a) => a.id));
    const upgradedExisting = parsed.articles.map((art) => {
      const fresh = initialArticles.find((init) => init.id === art.id);
      if (fresh) {
        const hasOutdatedMedia =
          art.coverImage?.includes('pexels.com') ||
          art.coverImage?.includes('unsplash.com') ||
          art.sections?.some((s) => s.image?.includes('pexels.com') || s.image?.includes('unsplash.com')) ||
          (art.id === 'organizing-games-steam' && art.sections?.some((s) => s.heading?.includes('Librarian')));
        if (hasOutdatedMedia) {
          return fresh;
        }
      }
      return art;
    });

    // Merge in any new default initial articles that are not yet in the user's saved list
    const newDefaults = initialArticles.filter((init) => !existingIds.has(init.id));
    normalizedArticles = [...upgradedExisting, ...newDefaults];
  }

  let normalizedStories = initialStories;
  const aiStoryIds = new Set(['midnight-barista', 'letters-from-pelican-town', 'alchemists-greenhouse']);
  if (Array.isArray(parsed?.stories) && parsed.stories.length > 0) {
    const cleanedExisting = parsed.stories
      .filter((s: Story) => !aiStoryIds.has(s.id) && !s.id.startsWith('gb-') && !s.id.startsWith('gutenberg-'))
      .map((s: Story) => {
        const fresh = initialStories.find((init) => init.id === s.id);
        if (fresh && (!s.chapters || fresh.chapters.length > s.chapters.length)) {
          return fresh;
        }
        return s;
      });
    const existingStoryIds = new Set(cleanedExisting.map((s: Story) => s.id));
    const newStoryDefaults = initialStories.filter((init) => !existingStoryIds.has(init.id));
    normalizedStories = [...cleanedExisting, ...newStoryDefaults];
  }

  return {
    games: Array.isArray(parsed?.games) ? parsed.games : initialGames,
    articles: normalizedArticles,
    stories: normalizedStories,
    heroImage: typeof parsed?.heroImage === 'string' ? parsed.heroImage : defaultContent.heroImage,
    logoImage: parsed?.logoImage === '/logo.png'
      ? defaultContent.logoImage
      : typeof parsed?.logoImage === 'string'
        ? parsed.logoImage
        : defaultContent.logoImage,
    ctaLinks: normalizedCtaLinks,
    updated_at: typeof parsed?.updated_at === 'string' ? parsed.updated_at : new Date().toISOString(),
  };
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [remoteLoaded, setRemoteLoaded] = useState(false);
  const [syncStatus, setSyncStatus] = useState<CloudSyncStatus>('synced');
  const [lastSyncedAt, setLastSyncedAt] = useState<string | null>(null);

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

  const broadcastChannelRef = useRef<BroadcastChannel | null>(null);
  const isBroadcastingRef = useRef(false);
  const contentRef = useRef(content);
  contentRef.current = content;

  // Initialize BroadcastChannel for instant cross-tab sync
  useEffect(() => {
    if (typeof BroadcastChannel !== 'undefined') {
      try {
        const channel = new BroadcastChannel(BROADCAST_CHANNEL_NAME);
        broadcastChannelRef.current = channel;

        channel.onmessage = (event) => {
          if (event?.data?.type === 'SITE_CONTENT_UPDATED' && event.data.payload) {
            isBroadcastingRef.current = true;
            setContent(normalizeContent(event.data.payload));
            setTimeout(() => {
              isBroadcastingRef.current = false;
            }, 50);
          }
        };

        return () => {
          channel.close();
          broadcastChannelRef.current = null;
        };
      } catch (err) {
        console.warn('BroadcastChannel not supported or restricted:', err);
      }
    }
  }, []);

  // Storage event listener fallback for cross-tab sync
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === storageKey && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          isBroadcastingRef.current = true;
          setContent(normalizeContent(parsed));
          setTimeout(() => {
            isBroadcastingRef.current = false;
          }, 50);
        } catch {
          // ignore
        }
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Remote synchronization from Supabase on mount
  useEffect(() => {
    let cancelled = false;

    async function loadRemoteContent() {
      try {
        const { data, error } = await supabase
          .from('site_content')
          .select('content, updated_at')
          .eq('id', 'default')
          .maybeSingle();

        if (cancelled) return;

        if (error) {
          console.error('Unable to load site content from Supabase:', error.message);
          setSyncStatus('offline');
          setRemoteLoaded(true);
          return;
        }

        if (data?.content) {
          const remoteNormalized = normalizeContent(data.content as Partial<SavedContent>);
          const remoteUpdatedAtStr = data.updated_at || remoteNormalized.updated_at;
          const remoteTimestamp = new Date(remoteUpdatedAtStr).getTime();
          const localTimestamp = new Date(contentRef.current.updated_at).getTime();

          // If local has newer modifications (e.g. edited right before reload/offline), preserve local and push to Supabase
          if (localTimestamp > remoteTimestamp) {
            setSyncStatus('saving');
            const { error: pushError } = await supabase.from('site_content').upsert({
              id: 'default',
              content: contentRef.current,
              updated_at: contentRef.current.updated_at,
            });
            if (pushError) {
              setSyncStatus('error');
            } else {
              setSyncStatus('synced');
              setLastSyncedAt(new Date().toLocaleTimeString());
            }
          } else {
            // Remote is newer or equal -> sync local
            setContent(remoteNormalized);
            setSyncStatus('synced');
            setLastSyncedAt(new Date().toLocaleTimeString());
          }
        } else {
          // Seed database if empty
          const seedContent = contentRef.current;
          const { error: seedError } = await supabase.from('site_content').upsert({
            id: 'default',
            content: seedContent,
            updated_at: seedContent.updated_at || new Date().toISOString(),
          });
          if (seedError) {
            console.error('Unable to seed site content in Supabase:', seedError.message);
            setSyncStatus('error');
          } else {
            setSyncStatus('synced');
            setLastSyncedAt(new Date().toLocaleTimeString());
          }
        }
      } catch (err) {
        console.error('Network error loading Supabase content:', err);
        setSyncStatus('offline');
      } finally {
        if (!cancelled) {
          setRemoteLoaded(true);
        }
      }
    }

    void loadRemoteContent();
    return () => {
      cancelled = true;
    };
  }, []);

  // Immediate local storage write & cross-tab broadcast (0ms delay for shutdown protection)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(content));
    } catch {
      // Keep usable if storage quota exceeded or disabled
    }

    if (!isBroadcastingRef.current && broadcastChannelRef.current) {
      try {
        broadcastChannelRef.current.postMessage({
          type: 'SITE_CONTENT_UPDATED',
          payload: content,
        });
      } catch {
        // ignore
      }
    }
  }, [content]);

  // Debounced cloud sync to Supabase (500ms)
  useEffect(() => {
    if (!remoteLoaded) return;

    setSyncStatus('saving');
    const timer = setTimeout(async () => {
      try {
        const { error } = await supabase.from('site_content').upsert({
          id: 'default',
          content,
          updated_at: content.updated_at || new Date().toISOString(),
        });

        if (error) {
          console.error('Unable to save site content to Supabase:', error.message);
          setSyncStatus('error');
        } else {
          setSyncStatus('synced');
          setLastSyncedAt(new Date().toLocaleTimeString());
        }
      } catch {
        setSyncStatus('offline');
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [content, remoteLoaded]);

  // Force manual cloud sync handler
  const forceCloudSync = async () => {
    setSyncStatus('saving');
    try {
      const now = new Date().toISOString();
      const contentToSync = { ...contentRef.current, updated_at: now };
      setContent(contentToSync);
      const { error } = await supabase.from('site_content').upsert({
        id: 'default',
        content: contentToSync,
        updated_at: now,
      });
      if (error) {
        console.error('Manual sync failed:', error.message);
        setSyncStatus('error');
      } else {
        setSyncStatus('synced');
        setLastSyncedAt(new Date().toLocaleTimeString());
      }
    } catch {
      setSyncStatus('offline');
    }
  };

  const value = useMemo<SiteContentContextValue>(() => ({
    games: content.games,
    articles: content.articles,
    stories: content.stories,
    heroImage: content.heroImage,
    logoImage: content.logoImage,
    ctaLinks: content.ctaLinks,
    updatedAt: content.updated_at,
    syncStatus,
    lastSyncedAt,
    forceCloudSync,
    setHeroImage: (image) => setContent((c) => ({ ...c, heroImage: image, updated_at: new Date().toISOString() })),
    setLogoImage: (image) => setContent((c) => ({ ...c, logoImage: image, updated_at: new Date().toISOString() })),
    setCtaLinks: (links) => setContent((c) => ({ ...c, ctaLinks: links, updated_at: new Date().toISOString() })),
    addGame: (game) => setContent((c) => ({ ...c, games: [...c.games, game], updated_at: new Date().toISOString() })),
    updateGame: (game) => setContent((c) => ({
      ...c,
      games: c.games.map((item) => (item.id === game.id ? game : item)),
      updated_at: new Date().toISOString(),
    })),
    removeGame: (gameId) => setContent((c) => ({
      ...c,
      games: c.games.filter((g) => g.id !== gameId),
      updated_at: new Date().toISOString(),
    })),
    updateWalkthrough: (gameId, walkthrough) => setContent((c) => ({
      ...c,
      games: c.games.map((g) => (g.id === gameId ? { ...g, walkthrough } : g)),
      updated_at: new Date().toISOString(),
    })),
    addArticle: (article) => setContent((c) => ({ ...c, articles: [article, ...c.articles], updated_at: new Date().toISOString() })),
    updateArticle: (article) => setContent((c) => ({
      ...c,
      articles: c.articles.map((item) => (item.id === article.id ? article : item)),
      updated_at: new Date().toISOString(),
    })),
    removeArticle: (articleId) => setContent((c) => ({
      ...c,
      articles: c.articles.filter((a) => a.id !== articleId),
      updated_at: new Date().toISOString(),
    })),
    addStory: (story) => setContent((c) => ({ ...c, stories: [story, ...c.stories], updated_at: new Date().toISOString() })),
    updateStory: (story) => setContent((c) => ({
      ...c,
      stories: c.stories.map((item) => (item.id === story.id ? story : item)),
      updated_at: new Date().toISOString(),
    })),
    removeStory: (storyId) => setContent((c) => ({
      ...c,
      stories: c.stories.filter((s) => s.id !== storyId),
      updated_at: new Date().toISOString(),
    })),
  }), [content, syncStatus, lastSyncedAt]);

  return <SiteContentContext.Provider value={value}>{children}</SiteContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(SiteContentContext);
  if (!context) throw new Error('useSiteContent must be used inside SiteContentProvider');
  return context;
}
