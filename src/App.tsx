import { useState, useEffect } from 'react';
import type { Game } from '@/data/games';
import { Header, type View } from '@/components/Header';
import { GameDirectory } from '@/components/GameDirectory';
import { WalkthroughView } from '@/components/WalkthroughView';
import { CtaFooter } from '@/components/CtaFooter';
import { AboutPage } from '@/components/AboutPage';
import { ArrowRight } from 'lucide-react';

// 1. Context Provider
import { SiteContentProvider, useSiteContent } from '@/context/SiteContentContext'; 
// 2. Import the Admin Dashboard
import { AdminDashboard } from '@/components/AdminDashboard';
// 3. Import the new Hero Banner
import { Hero } from '@/components/Hero';

function App() {
  return (
    <SiteContentProvider>
      <AppContent />
    </SiteContentProvider>
  );
}

function AppContent() {
  const { games } = useSiteContent();
  const [view, setView] = useState<View>(() => {
    const savedView = sessionStorage.getItem('jinssi-view');
    return savedView === 'walkthroughs' || savedView === 'about' || savedView === 'admin'
      ? savedView
      : 'home';
  });
  const [selectedGameId, setSelectedGameId] = useState<string | null>(() => sessionStorage.getItem('jinssi-selected-game'));
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const selectedGame = games.find((game) => game.id === selectedGameId) || null;

  useEffect(() => {
    sessionStorage.setItem('jinssi-view', view);
    if (selectedGameId) sessionStorage.setItem('jinssi-selected-game', selectedGameId);
    else sessionStorage.removeItem('jinssi-selected-game');
  }, [view, selectedGameId]);

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectGame = (game: Game) => {
    setSelectedGameId(game.id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    setSelectedGameId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderMainContent = () => {
    if (selectedGame) {
      return <WalkthroughView game={selectedGame} onBack={handleBack} />;
    }

    if (view === 'admin') {
      return <AdminDashboard />;
    }

    // 4. Render the Hero Banner on the home page above the Game Directory
    if (view === 'home') {
      return (
        <>
          <Hero />
          <div className="py-8">
            <GameDirectory onSelectGame={handleSelectGame} progressMap={progressMap} />
          </div>
        </>
      );
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

    return null;
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header view={view} onNavigate={handleNavigate} />

      <main className="flex-1">{renderMainContent()}</main>

      <CtaFooter />
    </div>
  );
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
        <div className="inline-flex items-center gap-2 pill bg-earth-100 text-earth-500 mb-4">
          <span className="font-bold">Step-by-step guides</span>
        </div>
        <h2 className="page-title font-display text-3xl sm:text-5xl font-700 text-ink-900 mb-4 leading-tight">
          Walkthroughs
        </h2>
        <p className="text-base sm:text-lg text-tan-500 max-w-2xl mx-auto leading-relaxed">
          Pick a game and follow our visual, WikiHow-style guides. Track your
          progress with satisfying checkboxes as you go.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
              className="cozy-card cozy-card-hover text-left w-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-peach-300"
            >
              <div className="h-32 relative overflow-hidden">
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
              <div className="p-5">
                <h3 className="font-display text-base font-600 text-ink-900 mb-2 leading-snug">
                  {game.title}
                </h3>
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex-1 h-2 rounded-full bg-cream-300 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${percent}%`,
                        backgroundColor: game.accentColor,
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
    </div>
  );
}

export default App;