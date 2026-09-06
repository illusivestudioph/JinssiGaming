import { useState } from 'react';
import type { Game } from '@/data/games';
import { Header, type View } from '@/components/Header';
import { GameDirectory } from '@/components/GameDirectory';
import { WalkthroughView } from '@/components/WalkthroughView';
import { CtaFooter } from '@/components/CtaFooter';
import { AboutPage } from '@/components/AboutPage';
import { ArrowRight } from 'lucide-react';
import { SiteContentProvider } from '@/context/SiteContentContext';
import { useSiteContent } from '@/context/siteContent';
import { AuthProvider } from '@/context/AuthProvider';
import { useAuth } from '@/context/auth';
import { AdminDashboard } from '@/components/AdminDashboard';
import { Hero } from '@/components/Hero';
import { useProgressMap } from '@/hooks/useProgressMap';
import { progressPercent as calculatePercent } from '@/lib/progress';

function AppContent() {
  const [view, setView] = useState<View>('home');
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const { games, loading, error, isRemote, reload } = useSiteContent();
  const { isAdmin, loading: authLoading, signOut } = useAuth();
  const progressMap = useProgressMap(games);
  // Resolve from current content, never a stale copy of a selected game.
  const selectedGame = games.find((game) => game.id === selectedGameId);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });
  const canLeave = () =>
    !hasUnsavedChanges ||
    window.confirm(
      'Leave the dashboard and discard unsaved changes? Uploads may still finish in Storage.',
    );
  const handleNavigate = (nextView: View) => {
    if (nextView === view && selectedGameId === null) return;
    if (!canLeave()) return;
    setView(nextView);
    setSelectedGameId(null);
    scrollTop();
  };
  const handleSignOut = async () => {
    if (!canLeave()) return;
    await signOut();
    setView('home');
    setSelectedGameId(null);
    scrollTop();
  };
  const handleSelectGame = (game: Game) => {
    setSelectedGameId(game.id);
    scrollTop();
  };
  const handleBack = () => {
    setSelectedGameId(null);
    scrollTop();
  };

  const renderMainContent = () => {
    if (loading)
      return (
        <p role="status" className="py-16 text-center text-tan-600">
          Loading walkthroughs…
        </p>
      );
    if (error)
      return (
        <div role="alert" className="max-w-3xl mx-auto p-8">
          <h1 className="font-display text-2xl mb-3">Content is unavailable</h1>
          <p className="text-red-700 mb-4">{error}</p>
          {isRemote && (
            <button onClick={() => void reload()} className="btn-cozy bg-earth-500 text-white">
              Retry
            </button>
          )}
        </div>
      );
    if (view === 'admin') {
      if (authLoading)
        return (
          <p role="status" className="p-8 text-center">
            Checking access…
          </p>
        );
      return isAdmin ? (
        <AdminDashboard onDirtyChange={setHasUnsavedChanges} />
      ) : (
        <p role="alert" className="p-8 text-center">
          Sign in with an admin account to manage the site.
        </p>
      );
    }
    if (selectedGame)
      return <WalkthroughView key={selectedGame.id} game={selectedGame} onBack={handleBack} />;
    if (view === 'home')
      return (
        <>
          <Hero />
          <div className="py-8">
            <GameDirectory onSelectGame={handleSelectGame} progressMap={progressMap} />
          </div>
        </>
      );
    if (view === 'walkthroughs')
      return <WalkthroughsPage onSelectGame={handleSelectGame} progressMap={progressMap} />;
    if (view === 'about') return <AboutPage />;
    return null;
  };

  return (
    <div className="min-h-screen bg-cream-100 flex flex-col">
      <Header view={view} onNavigate={handleNavigate} onSignOut={handleSignOut} />
      {!isRemote && !error && (
        <p role="status" className="bg-cream-200 px-4 py-2 text-center text-sm text-tan-600">
          Preview mode · Supabase is not connected. Content is read-only; progress stays on this
          device.
        </p>
      )}
      <main className="flex-1">{renderMainContent()}</main>
      <CtaFooter />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <SiteContentProvider>
        <AppContent />
      </SiteContentProvider>
    </AuthProvider>
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
        <h2 className="font-display text-3xl sm:text-5xl font-bold text-ink-900 mb-4 leading-tight">
          Walkthroughs
        </h2>
        <p className="text-base sm:text-lg text-tan-500 max-w-2xl mx-auto leading-relaxed">
          Pick a game and follow our visual, WikiHow-style guides. Track your progress with
          satisfying checkboxes as you go.
        </p>
      </div>

      {games.length === 0 && (
        <p className="text-center text-tan-600">No walkthroughs have been published yet.</p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => {
          const totalSteps = game.walkthrough.reduce((sum, ch) => sum + ch.steps.length, 0);
          const completed = progressMap[game.id] || 0;
          const percent = totalSteps > 0 ? calculatePercent(completed, totalSteps) : 0;
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
                <h3 className="font-display text-base font-semibold text-ink-900 mb-2 leading-snug">
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
