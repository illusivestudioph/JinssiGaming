import { useState, useEffect, useMemo, useRef } from 'react';
import type { Story, StoryChapter } from '@/data/stories';
import {
  ArrowLeft,
  BookOpen,
  Bookmark,
  ChevronLeft,
  ChevronRight,
  Clock,
  Calendar,
  Sliders,
  Share2,
  Check,
  Coffee,
  X,
  List,
  Type,
  Sun,
  Moon,
  CheckCircle2,
  Library,
  Download,
  RefreshCw,
  Sparkles,
} from 'lucide-react';
import { getGutenbergId, fetchGutenbergById } from '@/services/gutenberg';

interface StoryReaderViewProps {
  story: Story;
  chapterNumber?: number;
  onSelectChapter: (chapterNumber: number) => void;
  onBackToLibrary: () => void;
  onUpdateStory?: (story: Story) => void;
}

type ReadingTheme = 'paper' | 'sepia' | 'dark' | 'cream';
type FontSize = 'sm' | 'base' | 'lg' | 'xl';
type FontFamily = 'serif' | 'sans' | 'mono';

const themeStyles: Record<
  ReadingTheme,
  {
    bg: string;
    text: string;
    accent: string;
    cardBg: string;
    border: string;
    navBg: string;
    metaText: string;
  }
> = {
  paper: {
    bg: 'bg-[#FBF8F1]',
    text: 'text-[#2C2723]',
    accent: 'text-peach-600',
    cardBg: 'bg-[#F4ECE1]/80',
    border: 'border-[#E6DACB]',
    navBg: 'bg-[#FBF8F1]/95 backdrop-blur-md',
    metaText: 'text-[#7D7065]',
  },
  sepia: {
    bg: 'bg-[#F4ECD8]',
    text: 'text-[#433422]',
    accent: 'text-amber-700',
    cardBg: 'bg-[#EADFBF]/75',
    border: 'border-[#DECFA9]',
    navBg: 'bg-[#F4ECD8]/95 backdrop-blur-md',
    metaText: 'text-[#846E53]',
  },
  dark: {
    bg: 'bg-[#18181C]',
    text: 'text-[#DDD9D2]',
    accent: 'text-peach-400',
    cardBg: 'bg-[#222228]',
    border: 'border-[#32323C]',
    navBg: 'bg-[#18181C]/95 backdrop-blur-md',
    metaText: 'text-[#9A979B]',
  },
  cream: {
    bg: 'bg-[#FAF7F2]',
    text: 'text-stone-800',
    accent: 'text-peach-500',
    cardBg: 'bg-white',
    border: 'border-tan-200',
    navBg: 'bg-[#FAF7F2]/95 backdrop-blur-md',
    metaText: 'text-stone-500',
  },
};

const fontSizeStyles: Record<FontSize, { body: string; heading: string; lead: string }> = {
  sm: {
    body: 'text-sm sm:text-base leading-relaxed tracking-normal',
    heading: 'text-2xl sm:text-3xl',
    lead: 'text-base sm:text-lg',
  },
  base: {
    body: 'text-base sm:text-lg leading-relaxed tracking-normal',
    heading: 'text-3xl sm:text-4xl',
    lead: 'text-lg sm:text-xl',
  },
  lg: {
    body: 'text-lg sm:text-xl leading-loose tracking-normal',
    heading: 'text-3xl sm:text-5xl',
    lead: 'text-xl sm:text-2xl',
  },
  xl: {
    body: 'text-xl sm:text-2xl leading-loose tracking-normal',
    heading: 'text-4xl sm:text-5xl',
    lead: 'text-2xl sm:text-3xl',
  },
};

export function StoryReaderView({
  story,
  chapterNumber = 1,
  onSelectChapter,
  onBackToLibrary,
  onUpdateStory,
}: StoryReaderViewProps) {
  // Theme & Reading settings with localStorage persistence
  const [theme, setTheme] = useState<ReadingTheme>(() => {
    return (localStorage.getItem('jinssi-reader-theme') as ReadingTheme) || 'paper';
  });
  const [fontSize, setFontSize] = useState<FontSize>(() => {
    return (localStorage.getItem('jinssi-reader-fontsize') as FontSize) || 'base';
  });
  const [fontFamily, setFontFamily] = useState<FontFamily>(() => {
    return (localStorage.getItem('jinssi-reader-fontfamily') as FontFamily) || 'serif';
  });

  // Gutenberg live download state
  const gutenbergId = useMemo(() => getGutenbergId(story), [story]);
  const [isPullingGutenberg, setIsPullingGutenberg] = useState(false);
  const [pullStatus, setPullStatus] = useState('');
  const [showUpgradeSuccess, setShowUpgradeSuccess] = useState(false);

  const handlePullUnabridgedGutenberg = async () => {
    if (!gutenbergId || isPullingGutenberg) return;
    setIsPullingGutenberg(true);
    setPullStatus(`Connecting to Project Gutenberg archive (eBook #${gutenbergId})...`);
    try {
      const liveStory = await fetchGutenbergById(
        gutenbergId,
        story.title,
        story.author,
        (msg) => setPullStatus(msg)
      );
      if (liveStory && liveStory.chapters.length > 0) {
        onUpdateStory?.(liveStory);
        setShowUpgradeSuccess(true);
        setTimeout(() => setShowUpgradeSuccess(false), 4500);
      }
    } catch {
      // fallback
    } finally {
      setIsPullingGutenberg(false);
      setPullStatus('');
    }
  };

  // Automatically pull the real Gutenberg text if the book only has short placeholder stubs
  useEffect(() => {
    if (!gutenbergId || isPullingGutenberg || story.isLiveGutenberg) return;
    const hasShortContent = story.chapters.some((ch) => ch.content.join(' ').length < 350);
    if (hasShortContent) {
      handlePullUnabridgedGutenberg();
    }
  }, [story.id, gutenbergId]);

  // UI state
  const [showToc, setShowToc] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookmarkSaved, setBookmarkSaved] = useState(false);
  const [readingProgress, setReadingProgress] = useState(0);

  const topRef = useRef<HTMLDivElement>(null);

  // Active chapter
  const currentChapter = useMemo(() => {
    const found = story.chapters.find((ch) => ch.chapterNumber === chapterNumber);
    return found || story.chapters[0] || null;
  }, [story, chapterNumber]);

  const currentChapterIndex = useMemo(() => {
    if (!currentChapter) return 0;
    return story.chapters.findIndex((ch) => ch.chapterNumber === currentChapter.chapterNumber);
  }, [story, currentChapter]);

  const prevChapter = currentChapterIndex > 0 ? story.chapters[currentChapterIndex - 1] : null;
  const nextChapter =
    currentChapterIndex < story.chapters.length - 1
      ? story.chapters[currentChapterIndex + 1]
      : null;

  // Persist settings
  const handleThemeChange = (newTheme: ReadingTheme) => {
    setTheme(newTheme);
    localStorage.setItem('jinssi-reader-theme', newTheme);
  };

  const handleFontSizeChange = (newSize: FontSize) => {
    setFontSize(newSize);
    localStorage.setItem('jinssi-reader-fontsize', newSize);
  };

  const handleFontFamilyChange = (newFamily: FontFamily) => {
    setFontFamily(newFamily);
    localStorage.setItem('jinssi-reader-fontfamily', newFamily);
  };

  // Auto-save reading bookmark whenever chapter changes
  useEffect(() => {
    if (!currentChapter) return;
    try {
      const progressData = {
        storyId: story.id,
        chapterNumber: currentChapter.chapterNumber,
        chapterTitle: currentChapter.title,
        storyTitle: story.title,
        updatedAt: Date.now(),
      };
      localStorage.setItem(`jinssi-story-progress-${story.id}`, JSON.stringify(progressData));
      setBookmarkSaved(true);
      const timer = setTimeout(() => setBookmarkSaved(false), 2400);
      return () => clearTimeout(timer);
    } catch {
      // ignore
    }
  }, [story.id, story.title, currentChapter]);

  // Scroll to top upon chapter change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  }, [chapterNumber]);

  // Track reading progress through the chapter
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setReadingProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2200);
    } catch {
      // Fallback
    }
  };

  const currentThemeStyle = themeStyles[theme];
  const currentFontStyle = fontSizeStyles[fontSize];

  const fontClass =
    fontFamily === 'serif'
      ? 'font-serif'
      : fontFamily === 'sans'
      ? 'font-sans'
      : 'font-mono';

  if (!currentChapter) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <p className="text-stone-500 mb-4">Chapter not found.</p>
        <button
          onClick={onBackToLibrary}
          className="site-button bg-peach-400 text-ink-900"
        >
          Return to Bookshelf
        </button>
      </div>
    );
  }

  return (
    <div
      ref={topRef}
      className={`min-h-screen transition-colors duration-300 ${currentThemeStyle.bg} ${currentThemeStyle.text}`}
    >
      {/* Scroll Progress Bar at very top */}
      <div className="fixed top-0 left-0 right-0 h-1 z-50 bg-black/5">
        <div
          className="h-full bg-peach-400 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Floating Reader Top Bar */}
      <header
        className={`sticky top-0 z-40 border-b ${currentThemeStyle.border} ${currentThemeStyle.navBg} transition-colors duration-300`}
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-2">
          {/* Back to Bookshelf */}
          <button
            onClick={onBackToLibrary}
            className={`flex items-center gap-1.5 text-xs sm:text-sm font-semibold hover:opacity-80 transition-opacity focus:outline-none`}
            title="Return to Cozy Bookshelf"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Bookshelf</span>
          </button>

          {/* Book / Chapter Info */}
          <div className="flex-1 text-center px-2 min-w-0">
            <div className="flex items-center justify-center gap-1.5 truncate">
              <p className="text-xs font-bold truncate opacity-75">
                {story.title}
              </p>
              {gutenbergId && (
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-amber-500/15 text-amber-700 dark:text-amber-300 shrink-0">
                  Gutenberg #{gutenbergId}
                </span>
              )}
            </div>
            <h2 className="text-xs sm:text-sm font-semibold truncate">
              Ch. {currentChapter.chapterNumber}: {currentChapter.title}
            </h2>
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Table of Contents button */}
            <button
              onClick={() => {
                setShowToc(!showToc);
                setShowSettings(false);
              }}
              className={`p-2 rounded-lg border ${currentThemeStyle.border} hover:bg-black/5 transition-colors relative`}
              title="Table of Contents"
              aria-label="Table of Contents"
            >
              <List className="w-4 h-4" />
            </button>

            {/* Reading Display Settings button */}
            <button
              onClick={() => {
                setShowSettings(!showSettings);
                setShowToc(false);
              }}
              className={`p-2 rounded-lg border ${currentThemeStyle.border} hover:bg-black/5 transition-colors`}
              title="Reading Display & Themes"
              aria-label="Reading Display Settings"
            >
              <Sliders className="w-4 h-4" />
            </button>

            {/* Share / Copy button */}
            <button
              onClick={handleShare}
              className={`p-2 rounded-lg border ${currentThemeStyle.border} hover:bg-black/5 transition-colors`}
              title="Share Chapter"
              aria-label="Share Chapter"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </header>

      {/* Auto-saved bookmark toast */}
      {bookmarkSaved && (
        <div className="fixed bottom-6 right-6 z-40 bg-stone-900/90 text-white text-xs font-semibold px-3 py-2 rounded-xl shadow-lg flex items-center gap-2 animate-fade-in">
          <Bookmark className="w-3.5 h-3.5 text-peach-300 fill-peach-300" />
          <span>Bookmark saved (Ch. {currentChapter.chapterNumber})</span>
        </div>
      )}

      {/* Table of Contents Modal / Drawer */}
      {showToc && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
          <div
            className={`w-full max-w-sm h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between ${currentThemeStyle.bg} border-l ${currentThemeStyle.border}`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-peach-500" />
                  <h3 className="font-display font-bold text-lg">Table of Contents</h3>
                </div>
                <button
                  onClick={() => setShowToc(false)}
                  className="p-1 rounded-full hover:bg-black/5"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="py-4">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-xs font-bold uppercase tracking-wider opacity-60">
                    {story.chapters.length} Chapters • {story.genre}
                  </p>
                  {story.isLiveGutenberg && (
                    <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-800 dark:text-emerald-300">
                      Archive Verified
                    </span>
                  )}
                </div>

                {/* Gutenberg Upgrade option inside TOC */}
                {gutenbergId && !story.isLiveGutenberg && (
                  <div className="p-3 mb-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span className="text-xs font-bold text-amber-900 dark:text-amber-200">
                        Unabridged Gutenberg Text
                      </span>
                    </div>
                    <p className="text-[11px] opacity-75 mb-2.5">
                      Pull complete verbatim text with all original chapters from Project Gutenberg.
                    </p>
                    <button
                      type="button"
                      disabled={isPullingGutenberg}
                      onClick={handlePullUnabridgedGutenberg}
                      className="w-full py-1.5 px-3 rounded-lg bg-amber-600 hover:bg-amber-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      {isPullingGutenberg ? (
                        <>
                          <RefreshCw className="w-3 h-3 animate-spin" />
                          <span className="truncate">{pullStatus || 'Pulling...'}</span>
                        </>
                      ) : (
                        <>
                          <Download className="w-3 h-3" />
                          <span>Pull All Original Chapters</span>
                        </>
                      )}
                    </button>
                  </div>
                )}
                <div className="space-y-1.5">
                  {story.chapters.map((ch) => {
                    const isCurrent = ch.chapterNumber === currentChapter.chapterNumber;
                    return (
                      <button
                        key={ch.id}
                        onClick={() => {
                          onSelectChapter(ch.chapterNumber);
                          setShowToc(false);
                        }}
                        className={`w-full text-left p-3 rounded-xl transition-all flex items-start justify-between gap-2 border ${
                          isCurrent
                            ? `border-peach-400 bg-peach-500/10 font-bold`
                            : `border-transparent hover:border-black/10 hover:bg-black/5`
                        }`}
                      >
                        <div className="min-w-0 flex-1">
                          <p className="text-xs opacity-70">
                            Chapter {ch.chapterNumber}
                          </p>
                          <p className="text-sm font-semibold truncate">
                            {ch.title}
                          </p>
                        </div>
                        <div className="text-right text-[11px] opacity-65 shrink-0 pt-0.5">
                          {ch.readTimeMinutes} min
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 text-xs opacity-60 text-center">
              Story by {story.author}
            </div>
          </div>
        </div>
      )}

      {/* Reader Settings Drawer */}
      {showSettings && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex justify-end animate-fade-in">
          <div
            className={`w-full max-w-sm h-full shadow-2xl p-6 overflow-y-auto flex flex-col justify-between ${currentThemeStyle.bg} border-l ${currentThemeStyle.border}`}
          >
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-black/10">
                <div className="flex items-center gap-2">
                  <Sliders className="w-5 h-5 text-peach-500" />
                  <h3 className="font-display font-bold text-lg">Reading Preferences</h3>
                </div>
                <button
                  onClick={() => setShowSettings(false)}
                  className="p-1 rounded-full hover:bg-black/5"
                  aria-label="Close preferences"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Theme Selector */}
              <div className="py-5 border-b border-black/10">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-3">
                  Theme Palette
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleThemeChange('paper')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 bg-[#FBF8F1] text-[#2C2723] ${
                      theme === 'paper' ? 'border-peach-500 shadow-sm' : 'border-[#E6DACB]'
                    }`}
                  >
                    <span>Paper</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('sepia')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 bg-[#F4ECD8] text-[#433422] ${
                      theme === 'sepia' ? 'border-amber-600 shadow-sm' : 'border-[#DECFA9]'
                    }`}
                  >
                    <Sun className="w-3.5 h-3.5" />
                    <span>Sepia</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('cream')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 bg-[#FFFFFF] text-stone-800 ${
                      theme === 'cream' ? 'border-peach-400 shadow-sm' : 'border-stone-200'
                    }`}
                  >
                    <span>Cream</span>
                  </button>
                  <button
                    onClick={() => handleThemeChange('dark')}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border-2 transition-all flex items-center justify-center gap-2 bg-[#18181C] text-[#DDD9D2] ${
                      theme === 'dark' ? 'border-peach-400 shadow-sm' : 'border-[#32323C]'
                    }`}
                  >
                    <Moon className="w-3.5 h-3.5" />
                    <span>Bedtime</span>
                  </button>
                </div>
              </div>

              {/* Font Size Selector */}
              <div className="py-5 border-b border-black/10">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-3">
                  Font Size
                </label>
                <div className="grid grid-cols-4 gap-1.5">
                  {(['sm', 'base', 'lg', 'xl'] as FontSize[]).map((size) => (
                    <button
                      key={size}
                      onClick={() => handleFontSizeChange(size)}
                      className={`py-2 px-1 rounded-xl text-xs font-bold border text-center transition-all ${
                        fontSize === size
                          ? 'border-peach-500 bg-peach-500/10 font-bold'
                          : 'border-black/10 hover:border-black/20'
                      }`}
                    >
                      {size === 'sm' && 'Small'}
                      {size === 'base' && 'Medium'}
                      {size === 'lg' && 'Large'}
                      {size === 'xl' && 'XL'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Typography / Font Family */}
              <div className="py-5">
                <label className="text-xs font-bold uppercase tracking-wider opacity-60 block mb-3">
                  Typeface
                </label>
                <div className="space-y-2">
                  <button
                    onClick={() => handleFontFamilyChange('serif')}
                    className={`w-full py-2.5 px-3 rounded-xl text-sm font-serif border text-left flex items-center justify-between transition-all ${
                      fontFamily === 'serif'
                        ? 'border-peach-500 bg-peach-500/10 font-bold'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <span>Cozy Serif (Classic Novel)</span>
                    {fontFamily === 'serif' && <CheckCircle2 className="w-4 h-4 text-peach-500" />}
                  </button>
                  <button
                    onClick={() => handleFontFamilyChange('sans')}
                    className={`w-full py-2.5 px-3 rounded-xl text-sm font-sans border text-left flex items-center justify-between transition-all ${
                      fontFamily === 'sans'
                        ? 'border-peach-500 bg-peach-500/10 font-bold'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <span>Modern Sans (Crisp & Clean)</span>
                    {fontFamily === 'sans' && <CheckCircle2 className="w-4 h-4 text-peach-500" />}
                  </button>
                  <button
                    onClick={() => handleFontFamilyChange('mono')}
                    className={`w-full py-2.5 px-3 rounded-xl text-sm font-mono border text-left flex items-center justify-between transition-all ${
                      fontFamily === 'mono'
                        ? 'border-peach-500 bg-peach-500/10 font-bold'
                        : 'border-black/10 hover:border-black/20'
                    }`}
                  >
                    <span>Typewriter Mono (Indie Note)</span>
                    {fontFamily === 'mono' && <CheckCircle2 className="w-4 h-4 text-peach-500" />}
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-black/10 text-xs opacity-60 text-center">
              Preferences are automatically saved to your browser.
            </div>
          </div>
        </div>
      )}

      {/* Main Chapter Content Container */}
      <main className="max-w-2xl sm:max-w-3xl mx-auto px-5 sm:px-8 py-8 sm:py-16">
        {/* Gutenberg Status Banner / Upgrade Callout */}
        {story.isLiveGutenberg && (
          <div className="mb-8 p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-900 dark:text-emerald-200">
                  Verified Project Gutenberg Archive Edition
                </p>
                <p className="text-[11px] text-emerald-800/80 dark:text-emerald-300/80">
                  Transcribed directly from Project Gutenberg eBook #{gutenbergId || story.gutenbergId} • {story.chapters.length} complete unabridged chapters
                </p>
              </div>
            </div>
          </div>
        )}

        {gutenbergId && !story.isLiveGutenberg && (
          <div className="mb-8 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-left">
            <div className="flex items-center gap-3">
              <Library className="w-5 h-5 text-amber-600 shrink-0" />
              <div>
                <p className="text-xs font-bold text-amber-950 dark:text-amber-100">
                  Read Full Unabridged Edition from Project Gutenberg
                </p>
                <p className="text-[11px] text-amber-900/80 dark:text-amber-200/80">
                  Currently reading curated edition. Pull the full archival text (eBook #{gutenbergId}) live from Gutenberg servers on demand.
                </p>
              </div>
            </div>
            <button
              type="button"
              disabled={isPullingGutenberg}
              onClick={handlePullUnabridgedGutenberg}
              className="w-full sm:w-auto px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs shrink-0 flex items-center justify-center gap-1.5 shadow-sm transition-all"
            >
              {isPullingGutenberg ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span className="truncate max-w-[140px]">{pullStatus || 'Connecting...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" />
                  <span>Pull Unabridged Gutenberg Text</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Chapter Header */}
        <div className="mb-10 sm:mb-14 pb-8 border-b border-black/10 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold border border-black/10 mb-4 opacity-75">
            <span>{story.genre}</span>
            <span>•</span>
            <span>By {story.author}</span>
          </div>

          <p className="text-sm font-bold uppercase tracking-widest opacity-60 mb-2">
            Chapter {currentChapter.chapterNumber} of {story.chapters.length}
          </p>

          <h1
            className={`font-display font-bold ${currentFontStyle.heading} mb-4 leading-tight`}
          >
            {currentChapter.title}
          </h1>

          <div
            className={`flex flex-wrap items-center justify-center gap-4 text-xs font-semibold ${currentThemeStyle.metaText}`}
          >
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {currentChapter.readTimeMinutes} min read
            </span>
            <span>•</span>
            <span>{currentChapter.wordCount.toLocaleString()} words</span>
            <span>•</span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              {currentChapter.publishedDate}
            </span>
          </div>
        </div>

        {/* Chapter Prose Body */}
        <article className={`space-y-6 ${fontClass} ${currentFontStyle.body}`}>
          {currentChapter.content.map((paragraph, idx) => {
            // First paragraph drop-cap style or prominent feel
            const isFirst = idx === 0;
            return (
              <p
                key={idx}
                className={isFirst ? `${currentFontStyle.lead} opacity-95` : 'opacity-90'}
              >
                {paragraph}
              </p>
            );
          })}
        </article>

        {/* Author Note Box (if present) */}
        {currentChapter.authorNote && (
          <div
            className={`mt-12 p-6 rounded-2xl border ${currentThemeStyle.border} ${currentThemeStyle.cardBg} transition-colors`}
          >
            <div className="flex items-center gap-2 mb-2 font-display font-bold text-sm">
              <Coffee className="w-4 h-4 text-peach-500" />
              <span>Author's Note from {story.author}</span>
            </div>
            <p className={`text-xs sm:text-sm italic opacity-85 leading-relaxed`}>
              "{currentChapter.authorNote}"
            </p>
          </div>
        )}

        {/* Chapter Completion Stamp */}
        <div className="my-12 text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-black/15 text-stone-400 mb-3">
            <BookOpen className="w-5 h-5" />
          </div>
          <p className="text-xs uppercase tracking-widest opacity-50 font-bold">
            End of Chapter {currentChapter.chapterNumber}
          </p>
        </div>

        {/* Chapter Navigation Bar */}
        <div className="pt-6 border-t border-black/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevChapter ? (
            <button
              onClick={() => onSelectChapter(prevChapter.chapterNumber)}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl border ${currentThemeStyle.border} ${currentThemeStyle.cardBg} hover:opacity-85 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>
                Previous: Ch. {prevChapter.chapterNumber} ({prevChapter.title.slice(0, 20)}...)
              </span>
            </button>
          ) : (
            <button
              onClick={onBackToLibrary}
              className={`w-full sm:w-auto px-5 py-3 rounded-xl border ${currentThemeStyle.border} ${currentThemeStyle.cardBg} opacity-75 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Bookshelf Overview</span>
            </button>
          )}

          {nextChapter ? (
            <button
              onClick={() => onSelectChapter(nextChapter.chapterNumber)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-peach-400 hover:bg-peach-500 text-ink-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-cozy transition-all"
            >
              <span>
                Next: Ch. {nextChapter.chapterNumber} ({nextChapter.title.slice(0, 20)}...)
              </span>
              <ChevronRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onBackToLibrary}
              className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-cozy transition-all"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Story Complete! Back to Shelf</span>
            </button>
          )}
        </div>
      </main>

      {/* Unabridged Gutenberg Load Success Toast */}
      {showUpgradeSuccess && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-400/50 backdrop-blur-md animate-fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <div className="text-left">
            <p className="text-xs font-bold text-emerald-300">Unabridged Gutenberg Edition Loaded!</p>
            <p className="text-[11px] text-cream-200">
              All {story.chapters.length} authentic chapters are now available in your reader.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
