import { useState, useMemo } from 'react';
import { categories, type Game } from '@/data/games';
import { useSiteContent } from '@/context/siteContent';
import { GameCard } from './GameCard';
import { Search, SlidersHorizontal } from 'lucide-react';

interface GameDirectoryProps {
  onSelectGame: (game: Game) => void;
  progressMap: Record<string, number>;
}

// progressMap stores raw completed step counts per game id

export function GameDirectory({ onSelectGame, progressMap }: GameDirectoryProps) {
  const { games } = useSiteContent();
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const availableCategories = [...new Set([...categories, ...games.map((game) => game.category)])];
  const selectedCategory = availableCategories.includes(activeCategory) ? activeCategory : 'All';
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const matchesSearch =
        game.title.toLowerCase().includes(search.trim().toLowerCase()) ||
        game.developer.toLowerCase().includes(search.trim().toLowerCase()) ||
        game.description.toLowerCase().includes(search.trim().toLowerCase());
      const matchesCategory = selectedCategory === 'All' || game.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [games, search, selectedCategory]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Search bar */}
      <div className="max-w-xl mx-auto mb-6">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-tan-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Search games"
            placeholder="Search games, developers, or keywords..."
            className="w-full pl-14 pr-6 py-4 rounded-full bg-cream-50 border-2 border-cream-300 text-ink-900 placeholder-tan-400 font-medium focus:outline-none focus:border-peach-300 shadow-cozy-sm transition-all duration-300"
          />
        </div>
      </div>

      {/* Category filters */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-tan-400 hidden sm:block" />
        {availableCategories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            aria-pressed={selectedCategory === cat}
            className={`pill transition-all duration-300 ${
              selectedCategory === cat
                ? 'bg-peach-400 text-cream-50 shadow-cozy-sm scale-105'
                : 'bg-cream-200 text-tan-500 hover:bg-cream-300 hover:text-ink-900'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Game grid */}
      {filteredGames.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {filteredGames.map((game) => (
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
    </div>
  );
}
