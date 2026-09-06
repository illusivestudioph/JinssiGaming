import type { Game } from '@/data/games';
import { ArrowRight } from 'lucide-react';
import { progressPercent as calculatePercent } from '@/lib/progress';

interface GameCardProps {
  game: Game;
  onClick: () => void;
  completedCount?: number;
}

export function GameCard({ game, onClick, completedCount = 0 }: GameCardProps) {
  const totalSteps = game.walkthrough.reduce((sum, ch) => sum + ch.steps.length, 0);
  const progressPercent = calculatePercent(completedCount, totalSteps);
  const allDone = completedCount >= totalSteps && totalSteps > 0;

  return (
    <button
      onClick={onClick}
      className="cozy-card cozy-card-hover text-left w-full overflow-hidden group focus:outline-none focus:ring-2 focus:ring-peach-300"
    >
      {/* Image header */}
      <div className="h-44 relative overflow-hidden">
        <img
          src={game.coverImage}
          alt={game.coverAlt}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Warm overlay for cohesion */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${game.accentColor}22, ${game.accentColor}44)`,
          }}
        />
        {allDone && (
          <span className="absolute top-3 right-3 pill bg-sage-300 text-sage-500 font-bold shadow-cozy-sm animate-pop">
            Complete!
          </span>
        )}
        <span
          className="absolute bottom-3 left-3 pill text-cream-50 shadow-cozy-sm backdrop-blur-sm"
          style={{ backgroundColor: game.accentColor + 'cc' }}
        >
          {game.category}
        </span>
      </div>

      {/* Card body */}
      <div className="p-5">
        <h3 className="font-display text-lg font-semibold text-ink-900 mb-1 leading-snug">
          {game.title}
        </h3>
        <p className="text-xs text-tan-400 font-semibold mb-3">by {game.developer}</p>
        <p className="text-sm text-ink-700 leading-relaxed mb-4 line-clamp-2">{game.description}</p>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
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
