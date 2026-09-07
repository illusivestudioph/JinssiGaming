import { useState } from 'react';
import type { Game, WalkthroughSection } from '@/data/games';
import { useProgress } from '@/hooks/useProgress';
import { CommentSection } from './CommentSection';
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  BookOpen,
  ChevronDown,
  Sparkles,
} from 'lucide-react';

interface WalkthroughViewProps {
  game: Game;
  onBack: () => void;
}

export function WalkthroughView({ game, onBack }: WalkthroughViewProps) {
  const { completedSteps, toggleStep, showSpoilers, toggleSpoilers, resetProgress } =
    useProgress(game.id);

  const totalSteps = game.walkthrough.reduce(
    (sum, ch) => sum + ch.steps.length,
    0
  );
  const completedCount = completedSteps.size;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-tan-500 hover:text-ink-900 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all games
      </button>

      {/* Game header with cover image */}
      <div className="cozy-card overflow-hidden mb-8 animate-fade-in">
        <div className="h-48 sm:h-56 relative overflow-hidden">
          <img
            src={game.coverImage}
            alt={game.coverAlt}
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(180deg, transparent 30%, ${game.accentColor}33 100%)`,
            }}
          />
          <span
            className="absolute bottom-4 left-4 pill text-cream-50 shadow-cozy-sm backdrop-blur-sm"
            style={{ backgroundColor: game.accentColor + 'cc' }}
          >
            {game.category}
          </span>
        </div>
        <div className="p-6">
          <h2 className="font-display text-2xl sm:text-3xl font-700 text-ink-900 mb-1">
            {game.title}
          </h2>
          <p className="text-sm text-tan-400 font-semibold mb-3">
            by {game.developer}
          </p>
          <p className="text-base text-ink-700 leading-relaxed">
            {game.description}
          </p>
        </div>
      </div>

      {/* Progress overview */}
      <div className="cozy-card p-5 mb-6 bg-cream-50">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" style={{ color: game.accentColor }} />
            <h3 className="font-display text-lg font-600 text-ink-900">
              Your Progress
            </h3>
          </div>
          <span className="text-sm font-bold text-tan-500">
            {completedCount} / {totalSteps} steps
          </span>
        </div>
        <div className="h-3 rounded-full bg-cream-300 overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: game.accentColor,
            }}
          >
            {progressPercent > 15 && (
              <span className="text-xs font-bold text-cream-50">
                {progressPercent}%
              </span>
            )}
          </div>
        </div>
        {progressPercent === 100 && totalSteps > 0 && (
          <div className="flex items-center gap-2 mt-3 text-sage-500 font-semibold text-sm animate-pop">
            <Sparkles className="w-4 h-4" />
            <span>You completed this walkthrough! Great job!</span>
          </div>
        )}
      </div>

      {/* Spoiler toggle + reset */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <button
          onClick={toggleSpoilers}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-cream-50 border-2 border-cream-300 shadow-cozy-sm hover:border-peach-300 transition-all duration-300"
        >
          {showSpoilers ? (
            <Eye className="w-4 h-4 text-peach-400" />
          ) : (
            <EyeOff className="w-4 h-4 text-tan-400" />
          )}
          <span className="text-sm font-semibold text-ink-900">
            Spoilers: {showSpoilers ? 'On' : 'Off'}
          </span>
          <div
            className={`w-10 h-5 rounded-full transition-all duration-300 relative ${
              showSpoilers ? 'bg-peach-400' : 'bg-cream-300'
            }`}
          >
            <div
              className={`absolute top-0.5 w-4 h-4 rounded-full bg-cream-50 shadow-cozy-sm transition-all duration-300 ${
                showSpoilers ? 'left-5' : 'left-0.5'
              }`}
            />
          </div>
        </button>

        <button
          onClick={resetProgress}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full text-tan-500 hover:text-rose-500 hover:bg-rose-100 transition-all duration-300 text-sm font-semibold"
        >
          <RotateCcw className="w-4 h-4" />
          Reset progress
        </button>
      </div>

      {/* Walkthrough sections */}
      <div className="space-y-6">
        {game.walkthrough.map((section, idx) => (
          <WalkthroughSectionCard
            key={section.id}
            section={section}
            sectionIndex={idx}
            accentColor={game.accentColor}
            completedSteps={completedSteps}
            toggleStep={toggleStep}
            showSpoilers={showSpoilers}
          />
        ))}

        {progressPercent === 100 && totalSteps > 0 && (
          <div
            className="cozy-card relative overflow-hidden border-2 border-sage-300 bg-sage-100 p-6 text-center animate-pop sm:p-8"
            role="status"
          >
            <div
              className="absolute -right-8 -top-8 h-24 w-24 rounded-full opacity-20"
              style={{ backgroundColor: game.accentColor }}
            />
            <div
              className="absolute -bottom-10 -left-6 h-24 w-24 rounded-full opacity-20"
              style={{ backgroundColor: game.accentColor }}
            />
            <Sparkles
              className="relative mx-auto mb-3 h-9 w-9"
              style={{ color: game.accentColor }}
              aria-hidden="true"
            />
            <p className="relative mb-1 font-display text-2xl font-700 text-ink-900">
              Congratulations!
            </p>
            <p className="relative mx-auto max-w-lg text-sm font-semibold leading-relaxed text-ink-700">
              You completed every step in the {game.title} walkthrough. Enjoy the
              satisfaction of a job well done!
            </p>
          </div>
        )}
      </div>

      {/* Community Comments Section */}
      <div className="mt-16 pt-8 border-t-2 border-tan-200">
        <CommentSection gameId={game.id} />
      </div>
    </div>
  );
}

interface WalkthroughSectionCardProps {
  section: WalkthroughSection;
  sectionIndex: number;
  accentColor: string;
  completedSteps: Set<string>;
  toggleStep: (id: string) => void;
  showSpoilers: boolean;
}

function WalkthroughSectionCard({
  section,
  sectionIndex,
  accentColor,
  completedSteps,
  toggleStep,
  showSpoilers,
}: WalkthroughSectionCardProps) {
  const [expanded, setExpanded] = useState(true);
  
  const hasSteps = section.steps && section.steps.length > 0;
  
  const sectionCompleted = hasSteps && section.steps.every((s) =>
    completedSteps.has(`${section.id}-${s.id}`)
  );
  
  const completedInSection = hasSteps ? section.steps.filter((s) =>
    completedSteps.has(`${section.id}-${s.id}`)
  ).length : 0;

  return (
    <div
      className="cozy-card overflow-hidden animate-slide-in"
      style={{ animationDelay: `${sectionIndex * 80}ms` }}
    >
      {/* Section header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-cream-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-700 text-sm text-cream-50 flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {sectionCompleted ? (
              <Check className="w-5 h-5" strokeWidth={3} />
            ) : (
              sectionIndex + 1
            )}
          </div>
          <div>
            <h3 className="font-display text-lg font-600 text-ink-900">
              {section.title}
            </h3>
            <p className="text-xs text-tan-400 font-semibold">
              {completedInSection} / {hasSteps ? section.steps.length : 0} steps completed
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-tan-400 transition-transform duration-300 flex-shrink-0 ${
            expanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Steps */}
      {expanded && hasSteps && (
        <div className="px-4 sm:px-5 pb-5 space-y-4 animate-fade-in">
          <div className="h-px bg-cream-200 mb-2" />
          {section.steps.map((step, idx) => {
            const stepKey = `${section.id}-${step.id}`;
            const isDone = completedSteps.has(stepKey);
            return (
              <WikiHowStep
                key={step.id}
                stepKey={stepKey}
                stepNumber={idx + 1}
                title={step.title}
                description={step.description}
                image={step.image}
                imageAlt={step.imageAlt || `Step ${idx + 1}`}
                hasSpoiler={step.hasSpoiler}
                spoilerText={step.spoilerText}
                isDone={isDone}
                toggleStep={toggleStep}
                showSpoilers={showSpoilers}
                accentColor={accentColor}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface WikiHowStepProps {
  stepKey: string;
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  hasSpoiler?: boolean;
  spoilerText?: string;
  isDone: boolean;
  toggleStep: (id: string) => void;
  showSpoilers: boolean;
  accentColor: string;
}

function WikiHowStep({
  stepKey,
  stepNumber,
  title,
  description,
  image,
  imageAlt,
  hasSpoiler,
  spoilerText,
  isDone,
  toggleStep,
  showSpoilers,
  accentColor,
}: WikiHowStepProps) {
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);

  return (
    <div
      className={`rounded-2xl overflow-hidden transition-all duration-300 ${
        isDone ? 'bg-cream-100' : 'bg-cream-50'
      }`}
    >
      {/* Step number bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-display font-700 text-xs text-cream-50 flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {stepNumber}
          </div>
          <h4
            className={`font-display text-base font-600 transition-all duration-300 ${
              isDone ? 'text-tan-400 line-through' : 'text-ink-900'
            }`}
          >
            {title}
          </h4>
        </div>

        {/* Checkbox */}
        <button
          onClick={() => toggleStep(stepKey)}
          className={`check-circle flex-shrink-0 ${
            isDone
              ? 'border-transparent text-cream-50 animate-pop'
              : 'border-cream-400 hover:border-peach-300'
          }`}
          style={isDone ? { backgroundColor: accentColor } : undefined}
          aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isDone && <Check className="w-4 h-4" strokeWidth={3} />}
        </button>
      </div>

      {/* Step image — Changed from object-cover to object-contain with a neutral background container to preserve aspect ratio */}
      {image && (
        <div className="px-4 pb-3">
          <div className="rounded-2xl overflow-hidden shadow-cozy-sm bg-cream-200/50 flex items-center justify-center max-h-[400px]">
            <img
              src={image}
              alt={imageAlt || ""}
              loading="lazy"
              className={`w-full h-auto max-h-[400px] object-contain transition-all duration-500 ${
                isDone ? 'opacity-60 grayscale' : 'opacity-100'
              }`}
            />
          </div>
        </div>
      )}

      {/* Step description */}
      <div className="px-4 pb-4">
        <p
          className={`text-sm sm:text-base text-ink-700 leading-relaxed transition-all duration-300 ${
            isDone ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {description}
        </p>

        {/* Spoiler */}
        {hasSpoiler && spoilerText && (
          <div className="mt-3">
            {!showSpoilers && !spoilerRevealed ? (
              <button
                onClick={() => setSpoilerRevealed(true)}
                className="inline-flex items-center gap-1.5 pill bg-peach-100 text-peach-500 hover:bg-peach-200 transition-colors"
              >
                <EyeOff className="w-3 h-3" />
                <span>Show spoiler</span>
              </button>
            ) : (
              <div className="rounded-xl bg-peach-50 border border-peach-100 p-3 animate-fade-in">
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye className="w-3.5 h-3.5 text-peach-400" />
                  <span className="text-xs font-bold text-peach-500 uppercase tracking-wide">
                    Spoiler
                  </span>
                </div>
                <p className="text-sm text-ink-800 leading-relaxed">
                  {spoilerText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}