import { useState, useCallback } from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import type { DotLottie } from '@lottiefiles/dotlottie-react';

interface HeartBubble {
  id: number;
  x: number;
  y: number;
}

export function CuteDogEat() {
  const [dotLottie, setDotLottie] = useState<DotLottie | null>(null);
  const [hasError, setHasError] = useState(false);
  const [hearts, setHearts] = useState<HeartBubble[]>([]);
  const [isPaused, setIsPaused] = useState(false);

  const dotLottieRefCallback = useCallback((instance: DotLottie | null) => {
    setDotLottie(instance);
    if (instance) {
      instance.addEventListener('loadError', () => {
        setHasError(true);
      });
      instance.addEventListener('renderError', () => {
        setHasError(true);
      });
    }
  }, []);

  const handleInteraction = (e: React.MouseEvent<HTMLDivElement>) => {
    // Generate playful floating heart bubbles
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = Date.now() + Math.random();

    setHearts((prev) => [...prev.slice(-5), { id, x, y }]);
    setTimeout(() => {
      setHearts((prev) => prev.filter((h) => h.id !== id));
    }, 1000);

    // Optional tap to toggle pause/play if user wants to play with the animation
    if (dotLottie) {
      if (dotLottie.isPlaying) {
        dotLottie.pause();
        setIsPaused(true);
      } else {
        dotLottie.play();
        setIsPaused(false);
      }
    }
  };

  return (
    <div className="cute-dog-container relative flex flex-col items-center justify-center mt-3 sm:mt-4 mb-2 select-none group">
      {/* Interactive Mascot Wrapper */}
      <div
        onClick={handleInteraction}
        title={isPaused ? 'Click to resume snack time!' : 'Click to interact!'}
        className="relative cursor-pointer transition-transform duration-300 ease-out hover:scale-105 active:scale-95 flex flex-col items-center"
      >
        {/* Heart bubbles on click */}
        {hearts.map((heart) => (
          <span
            key={heart.id}
            className="absolute pointer-events-none text-peach-500 font-bold text-lg animate-float-up z-20"
            style={{
              left: `${heart.x}px`,
              top: `${heart.y}px`,
            }}
          >
            ♥
          </span>
        ))}

        {/* Animation Display */}
        <div className="relative w-44 h-40 sm:w-56 sm:h-48 md:w-64 md:h-52 flex items-center justify-center">
          {!hasError ? (
            <DotLottieReact
              src="/Cute%20dog%20eat.lottie"
              loop
              autoplay
              dotLottieRefCallback={dotLottieRefCallback}
              className="w-full h-full object-contain"
            />
          ) : (
            /* Graceful animated SVG fallback in case WebAssembly is blocked */
            <img
              src="/Cute%20dog%20eat.svg"
              alt="Cute dog eating"
              className="w-full h-full object-contain drop-shadow-sm"
            />
          )}
        </div>

        {/* Soft grounding shadow */}
        <div className="w-28 sm:w-36 h-2.5 bg-tan-900/10 dark:bg-black/20 rounded-[100%] blur-[2px] -mt-1 pointer-events-none" />

        {/* Snack Break Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-semibold text-ink-700 bg-cream-50/90 border border-tan-200 shadow-cozy-xs mt-2 transition-colors duration-200 group-hover:border-peach-300 group-hover:bg-cream-100">
          <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span>{isPaused ? 'Snack time paused (click to eat)' : 'Snack break'}</span>
        </div>
      </div>
    </div>
  );
}
