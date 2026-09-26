import type { Game } from '@/data/games';
import { ArrowRight, StreamlineGamepad } from '@/components/StreamlineIcons';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';

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
      className="notepad-card group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-cozy-lg rounded-2xl overflow-hidden w-full text-left"
    >
      <div>
        {/* Cover Artwork Header */}
        <div className="h-52 sm:h-56 relative overflow-hidden bg-cream-200 rounded-t-xl flex items-center justify-center">
          {/* Subtle background blur for letterboxing if aspect ratio differs */}
          <img
            src={getOptimizedImageUrl(game.coverImage, { width: 400, quality: 60, format: 'webp' })}
            alt=""
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover blur-md scale-110 opacity-30 pointer-events-none"
          />
          <img
            src={getOptimizedImageUrl(game.coverImage, { width: 800, quality: 80, format: 'webp' })}
            alt={game.coverAlt || `${game.title} cover`}
            className="w-full h-full object-contain p-2 relative z-10 transition-transform duration-500 group-hover:scale-105"
            loading="lazy"
            decoding="async"
            width={600}
            height={338}
          />

          {/* Top badges */}
          <div className="absolute top-3 left-3 z-20 flex items-center gap-2">
            <span
              className="px-2.5 py-1 rounded-lg text-cream-50 text-xs font-bold shadow-cozy-xs category-accent-pill backdrop-blur-sm"
              style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
            >
              {game.category}
            </span>
          </div>

          <div className="absolute top-3 right-3 z-20 flex items-center gap-1.5">
            {allDone ? (
              <span className="px-2.5 py-1 rounded-lg bg-emerald-500 text-white text-xs font-bold shadow-cozy-sm flex items-center gap-1">
                <span>✓</span>
                <span>Complete!</span>
              </span>
            ) : game.video ? (
              <span className="px-2.5 py-1 rounded-lg bg-ink-900/80 backdrop-blur-sm text-cream-100 text-[11px] font-bold shadow-cozy-sm flex items-center gap-1 border border-white/10">
                <span>🎬</span>
                <span>{game.video === 'placeholder' ? 'Trailer Soon' : 'Video Guide'}</span>
              </span>
            ) : null}
          </div>
        </div>

        {/* Card Body */}
        <div className="p-5 sm:p-6">
          <div className="flex items-center gap-2 text-xs font-bold text-tan-500 mb-1.5">
            <StreamlineGamepad className="w-3.5 h-3.5 text-peach-500" />
            <span>by {game.developer}</span>
            <span>•</span>
            <span>{totalSteps} steps</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl font-bold text-ink-900 group-hover:text-peach-600 transition-colors leading-snug mb-2">
            {game.title}
          </h3>

          <p className="text-sm text-ink-700 leading-relaxed line-clamp-3 mb-4 font-sans">
            {game.description}
          </p>
        </div>
      </div>

      {/* Card Footer: Progress Bar & Action */}
      <div className="px-5 sm:px-6 pb-5 pt-3 border-t border-tan-200/60 flex flex-col gap-3">
        <div className="flex items-center justify-between text-xs font-bold text-tan-500">
          <span>Walkthrough Progress</span>
          <span>{completedCount}/{totalSteps} steps ({progressPercent}%)</span>
        </div>
        <div className="h-2 rounded-full bg-cream-300 overflow-hidden progress-bar-track">
          <div
            className="h-full rounded-full transition-all duration-500 progress-bar-fill"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--theme-accent, #fd9a4d)',
            }}
          />
        </div>

        <div className="flex items-center justify-between pt-1 text-xs font-bold text-peach-600 group-hover:text-peach-700 transition-colors">
          <span>Read step-by-step guide</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>
    </article>
  );
}
