import { useState, useRef, useEffect } from 'react';
import type { WalkthroughSection } from '@/data/games';
import { useMusic } from '@/context/MusicContext';
import {
  BookOpen,
  ChevronDown,
  Check,
  Search,
  X,
  Compass,
  EyeOff,
} from 'lucide-react';

interface TableOfContentsProps {
  sections: WalkthroughSection[];
  accentColor: string;
  completedSteps: Set<string>;
  onSelectStep: (sectionId: string, stepId: string) => void;
  onSelectSection: (sectionId: string) => void;
  floating?: boolean;
}

export function TableOfContents({
  sections,
  accentColor,
  completedSteps,
  onSelectStep,
  onSelectSection,
  floating = false,
}: TableOfContentsProps) {
  const { playDropdownSfx } = useMusic();
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Calculate total and completed steps
  const totalSteps = sections.reduce((sum, s) => sum + (s.steps?.length || 0), 0);
  let completedCount = 0;
  sections.forEach((sec) => {
    sec.steps?.forEach((st) => {
      if (completedSteps.has(`${sec.id}-${st.id}`)) {
        completedCount++;
      }
    });
  });

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen]);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleStepClick = (sectionId: string, stepId: string) => {
    onSelectStep(sectionId, stepId);
    setIsOpen(false);
  };

  const handleSectionClick = (sectionId: string) => {
    onSelectSection(sectionId);
    setIsOpen(false);
  };

  const query = searchQuery.trim().toLowerCase();

  // Filter sections and steps based on search query
  const filteredSections = sections.map((sec) => {
    const sectionMatches = sec.title.toLowerCase().includes(query);
    const matchingSteps = sec.steps ? sec.steps.filter((st) =>
      st.title.toLowerCase().includes(query) ||
      st.description?.toLowerCase().includes(query)
    ) : [];

    return {
      ...sec,
      matches: sectionMatches,
      matchingSteps: query ? (sectionMatches ? sec.steps || [] : matchingSteps) : (sec.steps || []),
    };
  }).filter((sec) => !query || sec.matches || sec.matchingSteps.length > 0);

  return (
    <div
      ref={dropdownRef}
      className={`relative inline-block ${floating ? 'z-30' : 'w-full sm:w-auto'}`}
    >
      {/* Dropdown Toggle Button */}
      <button
        type="button"
        onClick={() => {
          playDropdownSfx();
          setIsOpen((prev) => !prev);
        }}
        className={`site-button table-of-contents-trigger flex items-center justify-between gap-3 text-sm font-semibold transition-all ${
          floating
            ? 'bg-cream-100/95 backdrop-blur-md text-ink-900 border-2 border-tan-300 shadow-cozy-lg px-4 py-2.5 rounded-full hover:border-peach-300 hover:bg-cream-50'
            : 'w-full sm:w-auto bg-cream-50 text-ink-900 border-2 border-tan-200 shadow-cozy-sm hover:border-peach-300 px-4 py-2.5 rounded-xl'
        }`}
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Table of Contents: Jump to step or section"
      >
        <div className="flex items-center gap-2.5">
          <div
            className="w-6 h-6 rounded-lg flex items-center justify-center text-white shadow-cozy-sm flex-shrink-0"
            style={{ backgroundColor: accentColor }}
          >
            {floating ? <Compass className="w-3.5 h-3.5" /> : <BookOpen className="w-3.5 h-3.5" />}
          </div>
          <span className="font-display font-bold text-ink-900">
            {floating ? 'Jump to Step' : 'Table of Contents'}
          </span>
          <span className="pill text-xs bg-cream-200/80 text-tan-600 font-sans px-2 py-0.5">
            {completedCount}/{totalSteps}
          </span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-tan-500 transition-transform duration-200 ${
            isOpen ? (floating ? 'rotate-0' : 'rotate-180') : (floating ? 'rotate-180' : 'rotate-0')
          }`}
        />
      </button>

      {/* Dropdown Menu Panel */}
      {isOpen && (
        <div
          className={`notepad-card table-of-contents-panel absolute z-50 w-[92vw] max-w-md sm:w-[420px] bg-cream-50 border-2 border-tan-300 shadow-cozy-lg overflow-hidden animate-pop ${
            floating
              ? 'bottom-full mb-3 right-0 origin-bottom-right'
              : 'top-full mt-2 left-0 sm:left-auto right-0 sm:right-auto origin-top-left'
          }`}
          style={{ maxHeight: '70vh' }}
        >
          {/* Header & Quick Search */}
          <div className="table-of-contents-header p-3.5 border-b-2 border-tan-200 bg-cream-100/90 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-peach-500" />
                <span className="font-display font-bold text-ink-900 text-sm">
                  Quick Navigation
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="p-1 text-tan-400 hover:text-ink-900 rounded-lg hover:bg-cream-200 transition-colors"
                aria-label="Close Table of Contents"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-tan-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search steps or chapters..."
                className="table-of-contents-search w-full pl-8 pr-7 py-1.5 text-xs rounded-lg border border-tan-200 bg-white text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-tan-400 hover:text-ink-900"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* List of Sections & Steps */}
          <div className="overflow-y-auto max-h-[50vh] p-2 divide-y divide-cream-200/80">
            {filteredSections.length === 0 ? (
              <div className="p-6 text-center text-xs font-semibold text-tan-500">
                No matching steps found for &ldquo;{searchQuery}&rdquo;.
              </div>
            ) : (
              filteredSections.map((section, secIdx) => {
                const sectionSteps = section.matchingSteps || [];
                const secCompleted = section.steps && section.steps.length > 0 &&
                  section.steps.every((s) => completedSteps.has(`${section.id}-${s.id}`));

                return (
                  <div key={section.id} className="py-2 first:pt-0 last:pb-0">
                    {/* Section Title Link */}
                    <button
                      type="button"
                      onClick={() => handleSectionClick(section.id)}
                      className="table-of-contents-row w-full flex items-center justify-between gap-2 px-2 py-1.5 rounded-lg text-left hover:bg-cream-200/70 group transition-colors"
                    >
                      <div className="flex items-center gap-2 min-w-0">
                        <span
                          className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-display font-bold text-cream-50 flex-shrink-0"
                          style={{ backgroundColor: accentColor }}
                        >
                          {secCompleted ? (
                            <Check className="w-3 h-3" strokeWidth={3} />
                          ) : (
                            secIdx + 1
                          )}
                        </span>
                        <span className="font-display font-bold text-xs text-ink-900 truncate group-hover:text-peach-600 transition-colors">
                          {section.title}
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-tan-400 whitespace-nowrap">
                        {section.steps?.length || 0} steps
                      </span>
                    </button>

                    {/* Step Items under this section */}
                    <div className="mt-1 pl-4 space-y-0.5">
                      {sectionSteps.map((step, stIdx) => {
                        const stepKey = `${section.id}-${step.id}`;
                        const isDone = completedSteps.has(stepKey);

                        return (
                          <button
                            key={step.id}
                            type="button"
                            onClick={() => handleStepClick(section.id, step.id)}
                            className="table-of-contents-row w-full flex items-center justify-between gap-2 px-2.5 py-1.5 rounded-md text-left text-xs transition-colors hover:bg-peach-50/80 group"
                          >
                            <div className="flex items-center gap-2 min-w-0">
                              <span
                                className={`w-4 h-4 rounded-full flex items-center justify-center text-[9px] font-bold flex-shrink-0 transition-colors ${
                                  isDone
                                    ? 'bg-sage-400 text-white'
                                    : 'bg-cream-200 text-tan-600 group-hover:bg-peach-200 group-hover:text-peach-800'
                                }`}
                              >
                                {isDone ? (
                                  <Check className="w-2.5 h-2.5" strokeWidth={3} />
                                ) : (
                                  stIdx + 1
                                )}
                              </span>
                              <span
                                className={`truncate font-medium transition-colors ${
                                  isDone
                                    ? 'text-tan-500 line-through'
                                    : 'text-ink-800 group-hover:text-peach-600'
                                }`}
                              >
                                {step.title}
                              </span>
                            </div>

                            {step.hasSpoiler && (
                              <span
                                className="flex items-center gap-0.5 text-[9px] font-bold text-amber-600 bg-amber-100/80 px-1.5 py-0.5 rounded flex-shrink-0"
                                title="Contains spoiler"
                              >
                                <EyeOff className="w-2.5 h-2.5" />
                                <span className="hidden sm:inline">Spoiler</span>
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Footer stats */}
          <div className="p-2.5 bg-cream-100/70 border-t border-tan-200 text-[11px] font-semibold text-tan-600 flex items-center justify-between">
            <span>Overall Progress</span>
            <span className="font-bold text-ink-900">
              {totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0}% Complete
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
