import { useCallback, useEffect, useState } from 'react';
import { ArrowRight, CalendarDays, Check, Trophy } from 'lucide-react';
import type { Game } from '@/data/games';

interface DailyChallengeProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

export function DailyChallenge({ games, onSelectGame }: DailyChallengeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const game = games[getDayNumber(today) % games.length];
  const challengeStep = game?.walkthrough[0]?.steps[0];
  const stepKey = challengeStep ? `${game.walkthrough[0].id}-${challengeStep.id}` : '';
  const progressKey = game ? `jinssi-progress-${game.id}` : '';
  const readCompleted = useCallback(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(progressKey) || '[]') as string[];
      return saved.includes(stepKey);
    } catch {
      return false;
    }
  }, [progressKey, stepKey]);
  const [completed, setCompleted] = useState(readCompleted);

  useEffect(() => {
    const updateChallenge = () => setCompleted(readCompleted());
    window.addEventListener('jinssi-progress-updated', updateChallenge);
    window.addEventListener('storage', updateChallenge);
    return () => {
      window.removeEventListener('jinssi-progress-updated', updateChallenge);
      window.removeEventListener('storage', updateChallenge);
    };
  }, [readCompleted]);

  if (!game || !challengeStep) return null;

  return (
    <section className="daily-challenge notepad-card mx-auto mb-10 max-w-3xl p-6 sm:p-8" aria-labelledby="daily-challenge-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="daily-challenge-mark" aria-hidden="true">
            {completed ? <Check className="h-6 w-6" strokeWidth={3} /> : <CalendarDays className="h-6 w-6" />}
          </div>
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-peach-500">Daily field task</p>
            <h2 id="daily-challenge-title" className="font-display text-2xl font-bold text-ink-900">{challengeStep.title}</h2>
            <p className="mt-2 text-sm font-semibold leading-relaxed text-tan-600">{challengeStep.description}</p>
            <p className="mt-2 text-xs font-extrabold uppercase tracking-wider text-tan-400">{game.title} · {game.walkthrough[0].title}</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <button type="button" onClick={() => onSelectGame(game)} className="site-button bg-peach-400 text-white hover:bg-peach-500">
            {completed ? 'Review task' : 'Open task'} <ArrowRight className="h-4 w-4" />
          </button>
          <div className={`daily-challenge-badge ${completed ? 'daily-challenge-badge-earned' : ''}`} role="status">
            <Trophy className="h-3.5 w-3.5" />
            {completed ? 'Badge earned' : 'Badge locked'}
          </div>
        </div>
      </div>
    </section>
  );
}

function getDayNumber(date: string) {
  return Number(date.replace(/-/g, ''));
}
