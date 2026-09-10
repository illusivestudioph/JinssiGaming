import type { Game } from '@/data/games';
import { ArrowRight } from 'lucide-react';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

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
    <article
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      }}
      tabIndex={0}
      role="button"
      className="notepad-card group cursor-pointer flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md h-full rounded-2xl text-left select-none focus:outline-none focus-visible:ring-2 focus-visible:ring-peach-400"
    >
      <div>
        {/* Cover Photo Header: exactly matching h-52 of Bookshelf and Journal cards */}
        <div className="h-52 relative overflow-hidden bg-cream-200 rounded-t-[1.1rem]">
          <img
            src={getOptimizedImageUrl(game.coverImage, { width: 600, quality: 80, format: 'webp' })}
            alt={game.coverAlt}
            loading="lazy"
            decoding="async"
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <span className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-ink-900/80 backdrop-blur-sm text-cream-50 shadow-cozy-sm">
            {game.category}
          </span>
          {allDone && (
            <span className="absolute top-2.5 right-2.5 text-[10px] font-bold px-2 py-0.5 rounded-md bg-sage-300 text-ink-900 shadow-cozy-sm">
              Complete!
            </span>
          )}
        </div>

        {/* Card Body: padding p-5 and font-size matching Bookshelf and Journal cards */}
        <div className="p-5">
          <h3 className="font-display font-bold text-lg sm:text-xl text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-1 mb-1.5 leading-snug">
            {game.title}
          </h3>
          <p className="text-xs text-tan-500 font-bold mb-2">
            by {game.developer}
          </p>
          <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-2 leading-relaxed mb-4">
            {game.description}
          </p>
        </div>
      </div>

      {/* Card Footer: matching border-t border-tan-200/60 */}
      <div className="px-5 pb-5 pt-2 border-t border-tan-200/60 flex items-center justify-between text-xs font-bold text-peach-600">
        {/* Progress bar */}
        <div className="flex items-center gap-2">
          <div className="w-16 h-2 rounded-full bg-cream-300 overflow-hidden progress-bar-track">
            <div
              className="h-full rounded-full transition-all duration-500 progress-bar-fill"
              style={{
                width: `${progressPercent}%`,
                backgroundColor: 'var(--theme-accent, #fd9a4d)',
              }}
            />
          </div>
          <span className="text-[11px] font-bold text-tan-500 whitespace-nowrap">
            {completedCount}/{totalSteps}
          </span>
        </div>

        <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform text-xs font-bold text-peach-600">
          <span>Read walkthrough</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </article>
  );
}
