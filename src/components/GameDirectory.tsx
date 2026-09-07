import { useState, useMemo, useEffect } from 'react';
import { categories, type Game } from '@/data/games';
import { useSiteContent } from '@/context/SiteContentContext';
import { GameCard } from './GameCard';
import { Search, SlidersHorizontal, BookOpen, Sparkles, Quote } from 'lucide-react';

interface GameDirectoryProps {
  onSelectGame: (game: Game) => void;
  progressMap: Record<string, number>;
}

// progressMap stores raw completed step counts per game id

export function GameDirectory({ onSelectGame, progressMap }: GameDirectoryProps) {
  // Removed heroImage since it's now handled by the separate Hero component
  const { games } = useSiteContent(); 
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [quoteIndex] = useState(() => Math.floor(Math.random() * 4));
  const [gridColumns, setGridColumns] = useState(getGridColumns);

  useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns());
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="game-directory-intro">
        <div className="game-directory-kicker">
          <BookOpen className="w-4 h-4" />
          <span>The Jinssi field guide</span>
          <Sparkles className="w-4 h-4" />
        </div>
        <h2 className="game-directory-title">Pick a little world to tidy up</h2>
        <p className="game-directory-copy">
          Cozy checklists for shelves, shops, ponds, cellars, and every charming mess in between.
        </p>
      </div>
      
      {/* Search bar */}
      <div className="game-directory-tools">
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
      </div>

      {/* Category filters */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 mb-10 flex-wrap">
        <SlidersHorizontal className="w-4 h-4 text-tan-400 hidden sm:block" />
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pill transition-all duration-300 ${
              activeCategory === cat
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
        <div className="game-catalog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-fade-in">
          {filteredGames.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onClick={() => onSelectGame(game)}
              completedCount={progressMap[game.id] || 0}
            />
          ))}
          {filteredGames.length % gridColumns !== 0 && (
            <QuoteCard games={filteredGames} quoteIndex={quoteIndex} />
          )}
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

function getGridColumns() {
  if (typeof window === 'undefined') return 1;
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 640) return 2;
  return 1;
}

function QuoteCard({ games, quoteIndex }: { games: Game[]; quoteIndex: number }) {
  const featuredGame = games[quoteIndex % games.length];
  const quotes = [
    `Every ${featuredGame.category.toLowerCase()} mess has a satisfying little system hiding inside it.`,
    `A good walkthrough is like a tidy shelf: everything you need, exactly where you need it.`,
    `Take it one small task at a time. Even the ${featuredGame.title.toLowerCase()} kind of chaos can be cozy.`,
    `The best cozy games turn ordinary chores into tiny worlds worth getting lost in.`,
  ];

  return (
    <article className="game-doodle-card game-quote-card" aria-label="A cozy gaming note">
      <span className="game-doodle game-doodle-star" aria-hidden="true">✦</span>
      <span className="game-doodle game-doodle-sparkle" aria-hidden="true">✦</span>
      <div className="game-quote-content">
        <Quote className="game-quote-icon" aria-hidden="true" />
        <p className="game-quote-text">“{quotes[quoteIndex]}”</p>
        <span className="game-quote-caption">A note from the field guide</span>
      </div>
    </article>
  );
}