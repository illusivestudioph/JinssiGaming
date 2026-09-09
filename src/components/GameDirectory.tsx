import { useState, useMemo, useEffect } from 'react';
import { categories, type Game } from '@/data/games';
import { useSiteContent } from '@/context/SiteContentContext';
import { GameCard } from './GameCard';
import { BackgroundMusic } from './BackgroundMusic';
import { Search, SlidersHorizontal, Quote } from 'lucide-react';

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
    <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      <div className="game-directory-intro">
        <h2 className="game-directory-title page-title">Pick a little world to tidy up</h2>
        <p className="game-directory-copy">
          Cozy checklists for shelves, shops, ponds, cellars, and every charming mess in between.
        </p>
      </div>
      
      {/* Search and category controls */}
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
        <div className="game-directory-filters">
          <SlidersHorizontal className="w-4 h-4 text-tan-400" />
          {categories.map((cat) => (
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

      {/* Game grid */}
      {filteredGames.length > 0 ? (
        <div className="game-catalog-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 animate-fade-in">
          <QuoteCard games={filteredGames} />
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

function QuoteCard({ games }: { games: Game[] }) {
  const quotes = [
    `A good walkthrough is like a tidy shelf: everything you need, exactly where you need it.`,
    `The best cozy games turn ordinary chores into tiny worlds worth getting lost in.`,
    'There is no rush in a cozy game. The little details will still be there when you are ready.',
    'A well-placed item can make an entire room feel like it has exhaled.',
    'Small progress is still progress, especially when it comes with a lovely view.',
    'The perfect game night includes a warm drink and absolutely no urgent objectives.',
    'Sometimes the best strategy is to wander around until something charming happens.',
    'Every inventory has a story, and every tidy corner is a tiny victory.',
    'Good guides leave room for curiosity. Follow the steps, then enjoy the detour.',
    'A peaceful little task can be exactly what a busy day needs.',
    'The coziest achievement is making a place feel like your own.',
    'Let the soundtrack play, take your time, and trust the next small step.',
    'There is magic in turning a scattered space into somewhere you want to stay.',
    'Even the messiest quest becomes manageable when you break it into gentle pieces.',
  ];
  const [quoteIndex, setQuoteIndex] = useState(() => Math.floor(Math.random() * quotes.length));

  useEffect(() => {
    const rotationTimer = window.setInterval(() => {
      setQuoteIndex((currentIndex) => (currentIndex + 1) % quotes.length);
    }, 10000);

    return () => window.clearInterval(rotationTimer);
  }, [quotes.length]);

  const featuredGame = games[quoteIndex % games.length];
  const quote = quotes[quoteIndex];
  const featuredQuote = quoteIndex === 0
    ? `Every ${featuredGame.category.toLowerCase()} mess has a satisfying little system hiding inside it.`
    : quoteIndex === 2
      ? `Take it one small task at a time. Even the ${featuredGame.title.toLowerCase()} kind of chaos can be cozy.`
      : quote;

  return (
    <article className="game-doodle-card game-quote-card" aria-label="A cozy gaming note">
      <span className="quote-float quote-float-note" aria-hidden="true">♪</span>
      <span className="quote-float quote-float-dot" aria-hidden="true" />
      <span className="quote-float quote-float-paper" aria-hidden="true" />
      <span className="quote-float quote-float-dash" aria-hidden="true">~</span>
      <div className="game-quote-content">
        <Quote className="game-quote-icon" aria-hidden="true" />
        <p className="game-quote-text">“{featuredQuote}”</p>
        <span className="game-quote-caption">A note from the field guide</span>
        <BackgroundMusic compact />
      </div>
    </article>
  );
}