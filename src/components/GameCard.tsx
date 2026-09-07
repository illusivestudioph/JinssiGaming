import type { Game } from '@/data/games';
import { ArrowRight } from 'lucide-react';

function getBadgeTextColor(hexColor: string) {
  const hex = hexColor.replace('#', '');
  const red = Number.parseInt(hex.slice(0, 2), 16);
  const green = Number.parseInt(hex.slice(2, 4), 16);
  const blue = Number.parseInt(hex.slice(4, 6), 16);
  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255;

  return luminance > 0.62 ? '#3a2e22' : '#fffaf3';
}

interface GameCardProps {
  game: Game;
  onClick: () => void;
  completedCount?: number;
}

export function GameCard({ game, onClick, completedCount = 0 }: GameCardProps) {
  const totalSteps = game.walkthrough.reduce((sum, ch) => sum + ch.steps.length, 0);
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const allDone = completedCount === totalSteps && totalSteps > 0;

  return (
    <button
      onClick={onClick}
      className="game-doodle-card text-left w-full group focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-300"
      style={{ '--game-accent': game.accentColor } as React.CSSProperties}
    >
      <span className="game-doodle game-doodle-swirl" aria-hidden="true">〰</span>

      {allDone && (
        <span className="game-complete-sticker animate-pop">
          Complete!
        </span>
      )}

      {/* Image header */}
      <div className="game-card-photo">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      {/* Card body */}
      <div className="game-doodle-content">
        <span
          className="game-doodle-badge"
          style={{
            backgroundColor: game.accentColor,
            color: getBadgeTextColor(game.accentColor),
          }}
        >
          {game.category}
        </span>
        <h3 className="game-doodle-title">
          {game.title}
        </h3>
        <p className="text-xs text-tan-500 font-semibold mb-3">
          by {game.developer}
        </p>
        <p className="text-sm text-ink-700 leading-relaxed mb-4 line-clamp-3">
          {game.description}
        </p>

        {/* Progress bar */}
        <div className="game-card-progress flex items-center gap-3">
          <div className="flex-1 h-2.5 rounded-full bg-cream-300 overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: game.accentColor,
              }}
            />
          </div>
          <span className="text-xs font-bold text-tan-500 whitespace-nowrap">
            {completedCount}/{totalSteps}
          </span>
        </div>

        <div className="flex items-center gap-1 mt-4 text-sm font-semibold text-tan-600 group-hover:text-ink-900 transition-colors">
          <span>Read walkthrough</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </button>
  );
}
