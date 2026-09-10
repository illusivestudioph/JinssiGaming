import { useState, useEffect, useMemo } from 'react';
import type { Game } from '@/data/games';
import type { Article } from '@/data/articles';
import type { Story } from '@/data/stories';
import { GUTENBERG_ID_MAP } from '@/services/gutenberg';
import { Header, type View } from '@/components/Header';
import { GameDirectory } from '@/components/GameDirectory';
import { WalkthroughView } from '@/components/WalkthroughView';
import { JournalDirectory } from '@/components/JournalDirectory';
import { ArticleView } from '@/components/ArticleView';
import { BookshelfDirectory } from '@/components/BookshelfDirectory';
import { StoryReaderView } from '@/components/StoryReaderView';
import { HomeBookshelfSection } from '@/components/HomeBookshelfSection';
import { HomeJournalSection } from '@/components/HomeJournalSection';
import { CtaFooter } from '@/components/CtaFooter';
import { AboutPage } from '@/components/AboutPage';
import { PrivacyPolicyPage } from '@/components/PrivacyPolicyPage';
import { TermsPage } from '@/components/TermsPage';
import { ContactPage } from '@/components/ContactPage';
import { CookieConsent } from '@/components/CookieConsent';
import { AdSenseUnit } from '@/components/AdSenseUnit';
import { ArrowRight } from 'lucide-react';

// 1. Context Provider
import { SiteContentProvider, useSiteContent } from '@/context/SiteContentContext'; 
import { MusicProvider } from '@/context/MusicContext';
// 2. Import the Admin Dashboard
import { AdminDashboard } from '@/components/AdminDashboard';
// 3. Import the new Hero Banner
import { Hero } from '@/components/Hero';

function App() {
  return (
    <SiteContentProvider>
      <MusicProvider>
        <AppContent />
      </MusicProvider>
    </SiteContentProvider>
  );
}

function AppContent() {
  const { games, articles, stories } = useSiteContent();
  const [activeStory, setActiveStory] = useState<Story | null>(() => {
    try {
      const saved = sessionStorage.getItem('jinssi-active-story');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [view, setView] = useState<View>(() => {
    const routeView = getRouteView();
    if (routeView) return routeView;
    const savedView = sessionStorage.getItem('jinssi-view');
    return savedView === 'walkthroughs' || savedView === 'journal' || savedView === 'stories' || savedView === 'about' || savedView === 'privacy' || savedView === 'terms' || savedView === 'contact' || savedView === 'admin'
      ? savedView
      : 'home';
  });
  const [selectedGameId, setSelectedGameId] = useState<string | null>(() => getGameIdFromPath() || sessionStorage.getItem('jinssi-selected-game'));
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(() => getArticleSlugFromPath() || sessionStorage.getItem('jinssi-selected-article'));
  const [selectedStorySlug, setSelectedStorySlug] = useState<string | null>(() => {
    const route = getStoryRouteFromPath();
    return route ? route.slug : sessionStorage.getItem('jinssi-selected-story');
  });
  const [selectedStoryChapterNumber, setSelectedStoryChapterNumber] = useState<number>(() => {
    const route = getStoryRouteFromPath();
    if (route?.chapterNumber) return route.chapterNumber;
    const saved = sessionStorage.getItem('jinssi-selected-story-chapter');
    return saved ? parseInt(saved, 10) : 1;
  });
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  
  const selectedGame = games.find((game) => game.id === selectedGameId) || null;
  const selectedArticle = articles.find((article) => article.slug === selectedArticleSlug || article.id === selectedArticleSlug) || null;
  const selectedStory = useMemo(() => {
    if (
      activeStory &&
      (activeStory.slug === selectedStorySlug || activeStory.id === selectedStorySlug)
    ) {
      return activeStory;
    }
    const found = stories.find(
      (story) => story.slug === selectedStorySlug || story.id === selectedStorySlug
    );
    if (found) return found;
    if (activeStory) return activeStory;

    // Direct URL resolution for Gutenberg eBooks
    if (selectedStorySlug) {
      let gbId: number | null = null;
      if (selectedStorySlug.startsWith('gutenberg-')) {
        const parts = selectedStorySlug.split('-');
        const parsedNum = parseInt(parts[1], 10);
        if (!isNaN(parsedNum)) gbId = parsedNum;
      }
      if (!gbId && GUTENBERG_ID_MAP[selectedStorySlug]) {
        gbId = GUTENBERG_ID_MAP[selectedStorySlug];
      }

      if (gbId) {
        const cleanTitle =
          selectedStorySlug
            .replace(/^gutenberg-\d+-?/, '')
            .split('-')
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ') || `eBook #${gbId}`;

        return {
          id: `gutenberg-${gbId}`,
          slug: selectedStorySlug,
          title: cleanTitle,
          synopsis: `Public domain eBook #${gbId} from Project Gutenberg archives.`,
          author: 'Classic Author',
          authorRole: 'Project Gutenberg Author',
          coverImage: `https://www.gutenberg.org/cache/epub/${gbId}/pg${gbId}.cover.medium.jpg`,
          coverAlt: `Actual Project Gutenberg cover for eBook #${gbId}`,
          status: 'Completed',
          genre: 'Classic Literature',
          tags: ['Project Gutenberg', 'Public Domain'],
          totalChapters: 1,
          chapters: [
            {
              id: `gb-${gbId}-loading`,
              chapterNumber: 1,
              title: 'Loading Unabridged Edition...',
              wordCount: 0,
              readTimeMinutes: 5,
              publishedDate: 'Project Gutenberg Archive',
              content: [
                `Downloading authentic unabridged text directly from Project Gutenberg archives...`
              ],
            }
          ],
          rating: 5,
          isPublicDomain: true,
          gutenbergId: gbId,
          isLiveGutenberg: false,
        } as Story;
      }
    }
    return null;
  }, [activeStory, selectedStorySlug, stories]);

  useEffect(() => {
    sessionStorage.setItem('jinssi-view', view);
    if (selectedGameId) sessionStorage.setItem('jinssi-selected-game', selectedGameId);
    else sessionStorage.removeItem('jinssi-selected-game');
    if (selectedArticleSlug) sessionStorage.setItem('jinssi-selected-article', selectedArticleSlug);
    else sessionStorage.removeItem('jinssi-selected-article');
    if (selectedStorySlug) {
      sessionStorage.setItem('jinssi-selected-story', selectedStorySlug);
      sessionStorage.setItem('jinssi-selected-story-chapter', String(selectedStoryChapterNumber));
    } else {
      sessionStorage.removeItem('jinssi-selected-story');
      sessionStorage.removeItem('jinssi-selected-story-chapter');
    }
  }, [view, selectedGameId, selectedArticleSlug, selectedStorySlug, selectedStoryChapterNumber]);

  useEffect(() => {
    const handleLocationChange = () => {
      const storyRoute = getStoryRouteFromPath();
      if (storyRoute) {
        setSelectedStorySlug(storyRoute.slug);
        setSelectedStoryChapterNumber(storyRoute.chapterNumber || 1);
        setSelectedArticleSlug(null);
        setSelectedGameId(null);
        return;
      }
      const articleSlug = getArticleSlugFromPath();
      if (articleSlug) {
        setSelectedArticleSlug(articleSlug);
        setSelectedGameId(null);
        setSelectedStorySlug(null);
        return;
      }
      const gameId = getGameIdFromPath();
      if (gameId) {
        setSelectedGameId(gameId);
        setSelectedArticleSlug(null);
        setSelectedStorySlug(null);
        return;
      }
      const routeView = getRouteView();
      if (routeView) {
        setSelectedGameId(null);
        setSelectedArticleSlug(null);
        setSelectedStorySlug(null);
        setView(routeView);
      }
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    const map: Record<string, number> = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && key.startsWith('jinssi-progress-')) {
        const gameId = key.replace('jinssi-progress-', '');
        try {
          const steps = JSON.parse(localStorage.getItem(key) || '[]');
          map[gameId] = steps.length;
        } catch {
          // ignore
        }
      }
    }
    setProgressMap(map);
  }, [selectedGame, view]);

  const handleNavigate = (newView: View) => {
    setView(newView);
    setSelectedGameId(null);
    setSelectedArticleSlug(null);
    setSelectedStorySlug(null);
    setActiveStory(null);
    sessionStorage.removeItem('jinssi-active-story');
    window.history.pushState(null, '', getPathForView(newView));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGameId(game.id);
    setSelectedArticleSlug(null);
    setSelectedStorySlug(null);
    window.history.pushState(null, '', `/games/${game.id}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGameById = (gameId: string) => {
    setSelectedGameId(gameId);
    setSelectedArticleSlug(null);
    setSelectedStorySlug(null);
    window.history.pushState(null, '', `/games/${gameId}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedGameId(null);
    setSelectedArticleSlug(null);
    setSelectedStorySlug(null);
    window.history.pushState(null, '', getPathForView(view));
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectArticle = (article: Article) => {
    setSelectedArticleSlug(article.slug);
    setSelectedGameId(null);
    setSelectedStorySlug(null);
    window.history.pushState(null, '', `/journal/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromArticle = () => {
    setSelectedArticleSlug(null);
    window.history.pushState(null, '', '/journal');
    setView('journal');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStory = (story: Story, chapterNumber: number = 1) => {
    setActiveStory(story);
    setSelectedStorySlug(story.slug);
    setSelectedStoryChapterNumber(chapterNumber);
    setSelectedGameId(null);
    setSelectedArticleSlug(null);
    try {
      sessionStorage.setItem('jinssi-active-story', JSON.stringify(story));
    } catch {
      // ignore
    }
    window.history.pushState(null, '', `/stories/${story.slug}/${chapterNumber}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStoryChapter = (chapterNumber: number) => {
    if (!selectedStory) return;
    setSelectedStoryChapterNumber(chapterNumber);
    window.history.pushState(null, '', `/stories/${selectedStory.slug}/${chapterNumber}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackFromStory = () => {
    setActiveStory(null);
    setSelectedStorySlug(null);
    sessionStorage.removeItem('jinssi-active-story');
    window.history.pushState(null, '', '/stories');
    setView('stories');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateStory = (updatedStory: Story) => {
    setActiveStory(updatedStory);
    try {
      sessionStorage.setItem('jinssi-active-story', JSON.stringify(updatedStory));
    } catch {
      // ignore
    }
  };

  const renderMainContent = () => {
    if (selectedStory) {
      return (
        <StoryReaderView
          story={selectedStory}
          chapterNumber={selectedStoryChapterNumber}
          onSelectChapter={handleSelectStoryChapter}
          onBackToLibrary={handleBackFromStory}
          onUpdateStory={handleUpdateStory}
        />
      );
    }

    if (selectedArticle) {
      return (
        <ArticleView
          article={selectedArticle}
          onBack={handleBackFromArticle}
          onSelectArticle={handleSelectArticle}
          onSelectGame={handleSelectGameById}
        />
      );
    }

    if (selectedGame) {
      return <WalkthroughView game={selectedGame} onBack={handleBack} />;
    }

    if (view === 'admin') {
      return <AdminDashboard />;
    }

    // Render the Hero Banner on the home page above the Game Directory, Cozy Bookshelf & Fresh Reads
    if (view === 'home') {
      return (
        <>
          <Hero />
          <div className="py-8 space-y-4">
            <GameDirectory onSelectGame={handleSelectGame} progressMap={progressMap} />
            <HomeBookshelfSection
              onSelectStory={handleSelectStory}
              onNavigateToBookshelf={() => handleNavigate('stories')}
            />
            <HomeJournalSection
              onSelectArticle={handleSelectArticle}
              onNavigateToJournal={() => handleNavigate('journal')}
            />
            <AdSenseUnit slot={import.meta.env.VITE_ADSENSE_SLOT || ''} />
          </div>
        </>
      );
    }

    if (view === 'stories') {
      return <BookshelfDirectory onSelectStory={handleSelectStory} />;
    }

    if (view === 'journal') {
      return <JournalDirectory onSelectArticle={handleSelectArticle} />;
    }

    if (view === 'walkthroughs') {
      return (
        <WalkthroughsPage
          onSelectGame={handleSelectGame}
          progressMap={progressMap}
        />
      );
    }

    if (view === 'about') {
      return <AboutPage />;
    }

    if (view === 'privacy') return <PrivacyPolicyPage />;
    if (view === 'terms') return <TermsPage />;
    if (view === 'contact') return <ContactPage />;

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!selectedStory && <Header view={view} onNavigate={handleNavigate} />}

      <main className="flex-1 flex flex-col">{renderMainContent()}</main>

      {!selectedStory && <CtaFooter onNavigate={handleNavigate} />}
      {!selectedStory && <CookieConsent />}
    </div>
  );
}

function getPathForView(view: View) {
  if (view === 'home') return '/';
  if (view === 'journal') return '/journal';
  if (view === 'stories') return '/stories';
  if (view === 'privacy') return '/privacy-policy';
  if (view === 'terms') return '/terms-of-use';
  return `/${view}`;
}

function getRouteView(): View | null {
  if (typeof window === 'undefined') return null;
  const path = window.location.pathname.replace(/\/$/, '') || '/';
  if (path === '/') return 'home';
  if (path === '/journal' || path.startsWith('/journal/')) return 'journal';
  if (path === '/stories' || path.startsWith('/stories/')) return 'stories';
  if (path === '/privacy-policy') return 'privacy';
  if (path === '/terms-of-use') return 'terms';
  if (path === '/contact') return 'contact';
  if (path === '/about') return 'about';
  if (path === '/walkthroughs') return 'walkthroughs';
  return null;
}

function getGameIdFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/games\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getArticleSlugFromPath() {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/journal\/([^/]+)\/?$/);
  return match ? decodeURIComponent(match[1]) : null;
}

function getStoryRouteFromPath(): { slug: string; chapterNumber?: number } | null {
  if (typeof window === 'undefined') return null;
  const match = window.location.pathname.match(/^\/stories\/([^/]+)(?:\/(\d+))?\/?$/);
  if (!match) return null;
  return {
    slug: decodeURIComponent(match[1]),
    chapterNumber: match[2] ? parseInt(match[2], 10) : undefined,
  };
}

function WalkthroughsPage({
  onSelectGame,
  progressMap,
}: {
  onSelectGame: (game: Game) => void;
  progressMap: Record<string, number>;
}) {
  const { games } = useSiteContent(); 

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center mb-10 animate-fade-in">
        <div className="library-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 shadow-cozy-sm">
          <span>Step-by-step guides</span>
        </div>
        <h2 className="page-title font-display text-3xl sm:text-5xl font-700 text-ink-900 mb-4 leading-tight">
          Walkthroughs
        </h2>
        <p className="text-base sm:text-lg text-tan-500 max-w-2xl mx-auto leading-relaxed">
          Pick a game and follow our visual, WikiHow-style guides. Track your
          progress with satisfying checkboxes as you go.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
        {games.map((game) => {
          const totalSteps = game.walkthrough.reduce(
            (sum, ch) => sum + ch.steps.length,
            0
          );
          const completed = progressMap[game.id] || 0;
          const percent = totalSteps > 0 ? Math.round((completed / totalSteps) * 100) : 0;
          return (
            <button
              key={game.id}
              onClick={() => onSelectGame(game)}
              className="game-summary-card cozy-card cozy-card-hover text-left w-full group focus:outline-none focus:ring-2 focus:ring-peach-300"
            >
              <div className="h-32 relative overflow-hidden rounded-t-[1.35rem]">
                <img
                  src={game.coverImage}
                  alt={game.coverAlt}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0"
                  style={{
                    background: `linear-gradient(135deg, ${game.accentColor}22, ${game.accentColor}44)`,
                  }}
                />
              </div>
              <div className="game-summary-content p-5">
                <h3 className="font-display text-base font-600 text-ink-900 mb-2 leading-snug">
                  {game.title}
                </h3>
                <div className="game-summary-progress flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 rounded-full bg-cream-300 overflow-hidden progress-bar-track">
                    <div
                      className="h-full rounded-full transition-all duration-500 progress-bar-fill"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: 'var(--theme-accent)',
                      }}
                    />
                  </div>
                  <span className="text-xs font-bold text-tan-500 whitespace-nowrap">
                    {completed}/{totalSteps}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-sm font-semibold text-tan-600 group-hover:text-ink-900 transition-colors">
                  <span>Start reading</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </button>
          );
        })}
      </div>
      <AdSenseUnit slot={import.meta.env.VITE_ADSENSE_SLOT || ''} />
    </div>
  );
}

export default App;