import { useState } from 'react';
import { ArrowRight, CalendarDays, Check, Trophy } from 'lucide-react';
import type { Game } from '@/data/games';

interface DailyChallengeProps {
  games: Game[];
  onSelectGame: (game: Game) => void;
}

const challengePrompts = [
  'Complete one small step and keep the cozy momentum going.',
  'Visit a new game world and tidy its first task.',
  'Return to a favorite walkthrough and finish one unchecked step.',
  'Find one helpful detail you did not notice last time.',
  'Make five minutes for a peaceful little game task.',
];

export function DailyChallenge({ games, onSelectGame }: DailyChallengeProps) {
  const today = new Date().toISOString().slice(0, 10);
  const challengeIndex = getDayNumber(today) % challengePrompts.length;
  const game = games[getDayNumber(today) % games.length];
  const storageKey = `jinssi-daily-challenge-${today}`;
  const [completed, setCompleted] = useState(() => localStorage.getItem(storageKey) === 'done');

  const markComplete = () => {
    localStorage.setItem(storageKey, 'done');
    setCompleted(true);
  };

  if (!game) return null;

  return (
    <section className="daily-challenge notepad-card mx-auto mb-10 max-w-3xl p-6 sm:p-8" aria-labelledby="daily-challenge-title">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-start gap-4">
          <div className="daily-challenge-mark" aria-hidden="true">
            {completed ? <Check className="h-6 w-6" strokeWidth={3} /> : <CalendarDays className="h-6 w-6" />}
          </div>
          <div>
            <p className="mb-1 text-xs font-extrabold uppercase tracking-wider text-peach-500">Today&apos;s cozy challenge</p>
            <h2 id="daily-challenge-title" className="font-display text-2xl font-bold text-ink-900">{challengePrompts[challengeIndex]}</h2>
            <p className="mt-2 text-sm font-semibold text-tan-600">Try it in <span className="text-ink-900">{game.title}</span>.</p>
          </div>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:items-end">
          <button type="button" onClick={() => onSelectGame(game)} className="site-button bg-peach-400 text-white hover:bg-peach-500">
            Open challenge <ArrowRight className="h-4 w-4" />
          </button>
          <button type="button" onClick={markComplete} disabled={completed} className="inline-flex items-center justify-center gap-1.5 text-xs font-extrabold text-sage-500 transition-colors hover:text-sage-500 disabled:cursor-default">
            <Trophy className="h-3.5 w-3.5" />
            {completed ? 'Challenge complete' : 'Mark complete'}
          </button>
        </div>
      </div>
    </section>
  );
}

function getDayNumber(date: string) {
  return Number(date.replace(/-/g, ''));
}
