import { useState, useEffect, useMemo } from 'react';
import { categories, type Game } from '@/data/games';
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
import { GameCard } from '@/components/GameCard';
import { ArrowRight, Search, Gamepad2 } from 'lucide-react';

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
            <GameDirectory
              onSelectGame={handleSelectGame}
              progressMap={progressMap}
              onNavigateToWalkthroughs={() => handleNavigate('walkthroughs')}
              limit={3}
            />
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
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const availableCategories = useMemo(() => {
    const list = ['All'];
    categories.forEach((c) => {
      if (c !== 'All' && !list.includes(c)) list.push(c);
    });
    games.forEach((g) => {
      if (g.category && !list.includes(g.category.trim())) {
        list.push(g.category.trim());
      }
    });
    return list;
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesCategory =
        selectedCategory === 'All' || game.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        game.title.toLowerCase().includes(q) ||
        game.developer.toLowerCase().includes(q) ||
        game.description.toLowerCase().includes(q) ||
        (game.category && game.category.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [games, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div>
          <div className="library-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-cozy-sm">
            <Gamepad2 className="w-3.5 h-3.5" />
            <span>Step-by-step guides</span>
          </div>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Walkthroughs
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Pick a game and follow our visual, WikiHow-style guides. Track your progress with satisfying checkboxes as you go.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-10 space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search cozy games, guides, or genres (e.g. Tiny Glade, Unpacking)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bookshelf-search-input w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-50 border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-tan-400 hover:text-ink-900 bg-cream-200 px-2 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {availableCategories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`category-filter-pill px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm ${
                selectedCategory === category
                  ? 'category-filter-active bg-peach-500 text-white shadow-cozy-md scale-105'
                  : 'category-filter-inactive bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Games Grid */}
      {filteredGames.length === 0 ? (
        <div className="notepad-card p-12 text-center max-w-md mx-auto">
          <p className="text-lg font-bold text-ink-800 mb-2">No walkthroughs found</p>
          <p className="text-sm text-tan-500 mb-4">Try adjusting your search terms or selecting another category.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-3">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onSelectGame(game)}
              completedCount={progressMap[game.id] || 0}
            />
          ))}
        </div>
      )}
      <AdSenseUnit slot={import.meta.env.VITE_ADSENSE_SLOT || ''} />
    </div>
  );
}

export default App;