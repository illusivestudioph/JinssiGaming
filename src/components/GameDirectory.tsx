import { useState, useMemo } from 'react';
import { categories, type Game } from '@/data/games';
import { useSiteContent } from '@/context/SiteContentContext';
import { GameCard } from './GameCard';
import { Search, SlidersHorizontal, ArrowRight, Gamepad2 } from 'lucide-react';

interface GameDirectoryProps {
  onSelectGame: (game: Game) => void;
  progressMap: Record<string, number>;
  onNavigateToWalkthroughs?: () => void;
  limit?: number;
}

export function GameDirectory({
  onSelectGame,
  progressMap,
  onNavigateToWalkthroughs,
  limit,
}: GameDirectoryProps) {
  const { games } = useSiteContent(); 
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const availableCategories = useMemo(() => {
    const set = new Set<string>();
    categories.filter((c) => c !== 'All').forEach((c) => set.add(c));
    games.forEach((g) => {
      if (g.category && g.category.trim()) {
        set.add(g.category.trim());
      }
    });
    return ['All', ...Array.from(set)];
  }, [games]);

  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(search.toLowerCase()) ||
        game.developer.toLowerCase().includes(search.toLowerCase()) ||
        game.description.toLowerCase().includes(search.toLowerCase());
      const matchesCategory =
        activeCategory === 'All' || game.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, search, activeCategory]);

  const displayedGames = limit ? filteredGames.slice(0, limit) : filteredGames;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Section Header: Matching HomeBookshelfSection & HomeJournalSection */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="library-badge inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-2 shadow-cozy-sm">
            <Gamepad2 className="w-3.5 h-3.5 text-peach-600" />
            <span>Step-by-step Guides & Tidying Games</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
            Pick a little world to tidy up
          </h2>
          <p className="text-sm text-ink-700 font-sans mt-1">
            Cozy checklists for shelves, shops, ponds, cellars, and every charming mess in between.
          </p>
        </div>

        {onNavigateToWalkthroughs && (
          <button
            onClick={onNavigateToWalkthroughs}
            className="bookshelf-browse-btn inline-flex items-center gap-2 text-xs font-bold transition-all px-4 py-2 rounded-xl shadow-cozy-sm self-start sm:self-auto"
          >
            <Gamepad2 className="w-4 h-4 text-peach-500" />
            <span>Explore All Walkthroughs</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>

      {/* Search and category controls (shown when browsing full directory) */}
      {!limit && (
        <div className="game-directory-tools mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-tan-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search games, developers, or keywords..."
              className="w-full pl-14 pr-6 py-4 rounded-full bg-cream-50 border-2 border-cream-300 text-ink-900 placeholder-tan-400 font-medium focus:outline-none focus:border-peach-300 shadow-cozy-sm transition-all duration-300"
            />
          </div>
          <div className="game-directory-filters">
            <SlidersHorizontal className="w-4 h-4 text-tan-400" />
            {availableCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`pill transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-peach-400 text-cream-50 shadow-cozy-sm scale-105 is-active'
                    : 'bg-cream-200 text-tan-500 hover:bg-cream-300 hover:text-ink-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Game grid: Exactly matching 3-column grid of Bookshelf and Journal */}
      {displayedGames.length > 0 ? (
        <div className="game-catalog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {displayedGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onSelectGame(game)}
              completedCount={progressMap[game.id] || 0}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 animate-fade-in">
          <div className="text-5xl mb-4">🔍</div>
          <p className="text-lg font-semibold text-tan-500">
            No games found. Try a different search!
          </p>
        </div>
      )}

      {/* "See More" bottom button on Home */}
      {limit && onNavigateToWalkthroughs && games.length > limit && (
        <div className="mt-8 text-center">
          <button
            onClick={onNavigateToWalkthroughs}
            className="bookshelf-browse-btn inline-flex items-center gap-2 text-xs font-bold transition-all px-6 py-3 rounded-xl shadow-cozy-sm hover:scale-105"
          >
            <span>See All {games.length} Walkthroughs</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      )}
    </section>
  );
}
