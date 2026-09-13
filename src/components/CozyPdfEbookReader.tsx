import { useState, useEffect, useRef, useCallback } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Minimize2,
  BookOpen,
  Bookmark,
  BookmarkCheck,
  List,
  ExternalLink,
  Loader2,
  Columns,
  Square,
  Sun,
  Moon,
  Coffee,
} from '@/components/StreamlineIcons';

// Configure PDF.js worker using matching CDN build
if (typeof window !== 'undefined' && !pdfjsLib.GlobalWorkerOptions.workerSrc) {
  pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;
}

export type PageTone = 'parchment' | 'sepia' | 'natural' | 'night';

interface ChapterBookmark {
  chapterNumber: number;
  title: string;
  page: number;
}

const CHILDREN_OF_MU_CHAPTERS: ChapterBookmark[] = [
  { chapterNumber: 1, title: 'I: The Origin of Man', page: 23 },
  { chapterNumber: 2, title: 'II: The Eastern Lines', page: 28 },
  { chapterNumber: 3, title: 'III: Ancient North America', page: 37 },
  { chapterNumber: 4, title: 'IV: Stone Tablets from the Valley of Mexico', page: 52 },
  { chapterNumber: 5, title: 'V: South America', page: 94 },
  { chapterNumber: 6, title: 'VI: Atlantis', page: 119 },
  { chapterNumber: 7, title: 'VII: Western Europe', page: 140 },
  { chapterNumber: 8, title: 'VIII: The Greeks', page: 151 },
  { chapterNumber: 9, title: 'IX: Egypt', page: 171 },
  { chapterNumber: 10, title: 'X: The Western Lines', page: 191 },
  { chapterNumber: 11, title: 'XI: India', page: 202 },
  { chapterNumber: 12, title: 'XII: Southern India', page: 234 },
  { chapterNumber: 13, title: 'XIII: The Great Uighur Empire', page: 237 },
  { chapterNumber: 14, title: 'XIV: Babylonia', page: 251 },
  { chapterNumber: 15, title: 'XV: Miscellaneous', page: 264 },
  { chapterNumber: 16, title: 'XVI: Intimate Hours with the Rishi', page: 275 },
];

interface CozyPdfEbookReaderProps {
  pdfUrl: string;
  title: string;
  author: string;
  initialPage?: number;
  onPageChange?: (page: number) => void;
}

const TONE_FILTERS: Record<PageTone, string> = {
  parchment: 'sepia(22%) brightness(98%) contrast(103%)',
  sepia: 'sepia(45%) brightness(94%) contrast(105%) hue-rotate(-8deg)',
  natural: 'contrast(106%) brightness(99%)',
  night: 'invert(92%) hue-rotate(180deg) brightness(88%) contrast(108%)',
};

const TONE_BG: Record<PageTone, string> = {
  parchment: 'bg-[#F9F5EC]',
  sepia: 'bg-[#F3EAD5]',
  natural: 'bg-[#FFFFFF]',
  night: 'bg-[#18181C]',
};

export function CozyPdfEbookReader({
  pdfUrl,
  title,
  author,
  initialPage = 1,
  onPageChange,
}: CozyPdfEbookReaderProps) {
  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [totalPages, setTotalPages] = useState<number>(290);
  const [currentPage, setCurrentPage] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('jinssi-mu-current-page');
      if (saved) {
        const p = parseInt(saved, 10);
        if (p >= 1 && p <= 290) return p;
      }
    } catch {
      // ignore
    }
    return initialPage;
  });

  const [scale, setScale] = useState<number>(1.15);
  // Default to 2-page spread for The Children of Mu
  const [twoPageMode, setTwoPageMode] = useState<boolean>(true);
  const [pageTone, setPageTone] = useState<PageTone>(() => {
    try {
      return (localStorage.getItem('jinssi-ebook-tone') as PageTone) || 'parchment';
    } catch {
      return 'parchment';
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renderError, setRenderError] = useState<string | null>(null);
  const [showToc, setShowToc] = useState<boolean>(false);
  const [jumpInput, setJumpInput] = useState<string>(String(currentPage));
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [bookmarkToast, setBookmarkToast] = useState<string | null>(null);

  // Natural book page flipping state
  const [flipDirection, setFlipDirection] = useState<'next' | 'prev' | null>(null);
  const [isFlipping, setIsFlipping] = useState<boolean>(false);
  const flipTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const canvasLeftRef = useRef<HTMLCanvasElement>(null);
  const canvasRightRef = useRef<HTMLCanvasElement>(null);
  const renderTaskLeftRef = useRef<any>(null);
  const renderTaskRightRef = useRef<any>(null);

  // 1. Load PDF Document
  useEffect(() => {
    let active = true;
    setIsLoading(true);
    setRenderError(null);

    const loadingTask = pdfjsLib.getDocument({
      url: pdfUrl,
      cMapUrl: `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/cmaps/`,
      cMapPacked: true,
    });

    loadingTask.promise
      .then((doc) => {
        if (!active) return;
        setPdfDoc(doc);
        setTotalPages(doc.numPages);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!active) return;
        console.error('Failed to load PDF in Cozy reader:', err);
        setRenderError(err?.message || 'Could not load PDF document.');
        setIsLoading(false);
      });

    return () => {
      active = false;
      loadingTask.destroy();
    };
  }, [pdfUrl]);

  // 2. Persist current page & tone
  useEffect(() => {
    try {
      localStorage.setItem('jinssi-mu-current-page', String(currentPage));
      onPageChange?.(currentPage);
    } catch {
      // ignore
    }
    setJumpInput(String(currentPage));
  }, [currentPage, onPageChange]);

  useEffect(() => {
    try {
      localStorage.setItem('jinssi-ebook-tone', pageTone);
    } catch {
      // ignore
    }
  }, [pageTone]);

  // Clean up flip timer on unmount
  useEffect(() => {
    return () => {
      if (flipTimeoutRef.current) {
        clearTimeout(flipTimeoutRef.current);
      }
    };
  }, []);

  // 3. Double-buffered Canvas Rendering: Eliminates black-and-white strobe/flashing
  const renderPageToCanvas = useCallback(
    async (
      pageNumber: number,
      canvas: HTMLCanvasElement | null,
      taskRef: React.MutableRefObject<any>
    ) => {
      if (!pdfDoc || !canvas || pageNumber < 1 || pageNumber > pdfDoc.numPages) return;

      try {
        if (taskRef.current) {
          taskRef.current.cancel();
          taskRef.current = null;
        }

        const page = await pdfDoc.getPage(pageNumber);
        const pixelRatio = window.devicePixelRatio || 1.5;
        const viewport = page.getViewport({ scale: scale * (twoPageMode ? 0.85 : 1) });

        // Double-buffering: render silently to an offscreen canvas
        // The visible canvas maintains its current image and never blanks out or flashes
        const offscreen = document.createElement('canvas');
        const targetW = Math.floor(viewport.width * pixelRatio);
        const targetH = Math.floor(viewport.height * pixelRatio);
        offscreen.width = targetW;
        offscreen.height = targetH;

        const offCtx = offscreen.getContext('2d', { alpha: false });
        if (!offCtx) return;

        // Fill background with warm page tone so no stark white glare can occur
        offCtx.fillStyle = pageTone === 'night' ? '#18181C' : '#F9F5EC';
        offCtx.fillRect(0, 0, targetW, targetH);
        offCtx.imageSmoothingEnabled = true;
        offCtx.imageSmoothingQuality = 'high';

        const renderContext = {
          canvasContext: offCtx,
          viewport,
          transform: [pixelRatio, 0, 0, pixelRatio, 0, 0],
        };

        const renderTask = page.render(renderContext);
        taskRef.current = renderTask;
        await renderTask.promise;

        // When offscreen rendering finishes, blit directly onto visible canvas in 0ms
        if (canvas.width !== targetW || canvas.height !== targetH) {
          canvas.width = targetW;
          canvas.height = targetH;
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;
        }

        const ctx = canvas.getContext('2d', { alpha: false });
        if (ctx) {
          ctx.drawImage(offscreen, 0, 0);
        }
      } catch (err: any) {
        if (err?.name !== 'RenderingCancelledException') {
          console.warn('Canvas render notice:', err);
        }
      }
    },
    [pdfDoc, scale, twoPageMode, pageTone]
  );

  useEffect(() => {
    if (!pdfDoc) return;
    renderPageToCanvas(currentPage, canvasLeftRef.current, renderTaskLeftRef);

    if (twoPageMode && currentPage < totalPages) {
      renderPageToCanvas(currentPage + 1, canvasRightRef.current, renderTaskRightRef);
    }
  }, [pdfDoc, currentPage, scale, twoPageMode, renderPageToCanvas, totalPages]);

  // Tactile Book Page Flip trigger
  const triggerFlip = (direction: 'next' | 'prev') => {
    if (flipTimeoutRef.current) {
      clearTimeout(flipTimeoutRef.current);
    }
    setFlipDirection(direction);
    setIsFlipping(true);
    flipTimeoutRef.current = setTimeout(() => {
      setIsFlipping(false);
      setFlipDirection(null);
    }, 420);
  };

  // Navigation handlers
  const goToPage = (num: number, direction?: 'next' | 'prev') => {
    const target = Math.max(1, Math.min(totalPages, num));
    if (target === currentPage) return;
    if (direction) {
      triggerFlip(direction);
    }
    setCurrentPage(target);
  };

  const handlePrevPage = () => {
    if (currentPage <= 1) return;
    const step = twoPageMode ? 2 : 1;
    goToPage(currentPage - step, 'prev');
  };

  const handleNextPage = () => {
    if (currentPage >= totalPages) return;
    const step = twoPageMode ? 2 : 1;
    goToPage(currentPage + step, 'next');
  };

  const handleZoom = (delta: number) => {
    setScale((prev) => {
      const next = Math.round((prev + delta) * 100) / 100;
      return Math.max(0.7, Math.min(2.2, next));
    });
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Do not capture if typing in jump input
      if (document.activeElement?.tagName === 'INPUT') return;

      if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        handlePrevPage();
      } else if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
        e.preventDefault();
        handleNextPage();
      } else if (e.key === 'Home') {
        e.preventDefault();
        goToPage(1);
      } else if (e.key === 'End') {
        e.preventDefault();
        goToPage(totalPages);
      } else if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        handleZoom(0.15);
      } else if (e.key === '-') {
        e.preventDefault();
        handleZoom(-0.15);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentPage, totalPages, twoPageMode]);

  // Fullscreen toggle
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.().catch(() => {});
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.().catch(() => {});
      setIsFullscreen(false);
    }
  };

  useEffect(() => {
    const onFsChange = () => {
      setIsFullscreen(Boolean(document.fullscreenElement));
    };
    document.addEventListener('fullscreenchange', onFsChange);
    return () => document.removeEventListener('fullscreenchange', onFsChange);
  }, []);

  // Save spot bookmark toast
  const handleSaveBookmark = () => {
    try {
      localStorage.setItem('jinssi-mu-current-page', String(currentPage));
      setBookmarkToast(`Bookmark saved at Page ${currentPage}`);
      setTimeout(() => setBookmarkToast(null), 3000);
    } catch {
      // ignore
    }
  };

  // Find active chapter by current page
  const currentChapter = [...CHILDREN_OF_MU_CHAPTERS]
    .reverse()
    .find((ch) => currentPage >= ch.page) || CHILDREN_OF_MU_CHAPTERS[0];

  return (
    <div
      ref={containerRef}
      className={`cozy-ebook-reader select-none relative flex flex-col rounded-3xl overflow-hidden border-2 border-tan-300 shadow-cozy-lg transition-colors ${
        TONE_BG[pageTone]
      } ${isFullscreen ? 'fixed inset-0 z-50 rounded-none border-0' : ''}`}
    >
      {/* ========================================================= */}
      {/* VINTAGE HARDCOVER LEATHER TOP BAR                         */}
      {/* ========================================================= */}
      <header className="bg-gradient-to-r from-[#2F241E] via-[#3D2F27] to-[#2F241E] text-[#EFE7DC] px-4 sm:px-6 py-3 border-b border-[#524135] flex items-center justify-between gap-4 shadow-md z-20">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-amber-500/20 border border-amber-400/30 flex items-center justify-center shrink-0 shadow-xs">
            <BookOpen className="w-4 h-4 text-amber-400" />
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-amber-400 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-500/30">
                Pinned eBook #1
              </span>
              <span className="hidden md:inline text-xs opacity-60">•</span>
              <span className="hidden md:inline text-xs opacity-75 truncate">
                {currentChapter.title}
              </span>
            </div>
            <h1 className="font-display font-bold text-sm sm:text-base text-cream-50 truncate tracking-wide">
              {title} <span className="font-normal opacity-75">— {author}</span>
            </h1>
          </div>
        </div>

        {/* Top Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 shrink-0 text-xs">
          {/* Tone Selector */}
          <div className="hidden sm:flex items-center gap-1 p-1 rounded-xl bg-black/30 border border-[#5A473B]">
            <button
              type="button"
              onClick={() => setPageTone('parchment')}
              title="Warm Parchment Paper"
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 text-[11px] transition-all ${
                pageTone === 'parchment'
                  ? 'bg-amber-500 text-ink-950 font-bold shadow-xs'
                  : 'text-cream-200 hover:text-white'
              }`}
            >
              <Coffee className="w-3 h-3" />
              <span className="hidden lg:inline">Parchment</span>
            </button>
            <button
              type="button"
              onClick={() => setPageTone('sepia')}
              title="Aged Antique Sepia"
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 text-[11px] transition-all ${
                pageTone === 'sepia'
                  ? 'bg-amber-600 text-white font-bold shadow-xs'
                  : 'text-cream-200 hover:text-white'
              }`}
            >
              <Sun className="w-3 h-3" />
              <span className="hidden lg:inline">Sepia</span>
            </button>
            <button
              type="button"
              onClick={() => setPageTone('night')}
              title="Bedtime Night Reading"
              className={`px-2 py-1 rounded-lg font-semibold flex items-center gap-1 text-[11px] transition-all ${
                pageTone === 'night'
                  ? 'bg-peach-500 text-white font-bold shadow-xs'
                  : 'text-cream-200 hover:text-white'
              }`}
            >
              <Moon className="w-3 h-3" />
              <span className="hidden lg:inline">Night</span>
            </button>
          </div>

          {/* Table of Contents Trigger */}
          <button
            type="button"
            onClick={() => setShowToc(!showToc)}
            className={`p-2 rounded-xl border border-[#5A473B] transition-colors flex items-center gap-1.5 ${
              showToc ? 'bg-amber-500 text-ink-950 font-bold' : 'bg-black/30 text-cream-100 hover:bg-black/50'
            }`}
            title="Table of Contents (15 Chapters)"
          >
            <List className="w-4 h-4" />
            <span className="hidden md:inline font-bold">Chapters</span>
          </button>

          {/* Bookmark Button */}
          <button
            type="button"
            onClick={handleSaveBookmark}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/50 border border-[#5A473B] text-amber-300 transition-colors"
            title="Bookmark this page"
          >
            <Bookmark className="w-4 h-4 fill-current" />
          </button>

          {/* Fullscreen Button */}
          <button
            type="button"
            onClick={toggleFullscreen}
            className="p-2 rounded-xl bg-black/30 hover:bg-black/50 border border-[#5A473B] text-cream-100 transition-colors"
            title={isFullscreen ? 'Exit Fullscreen' : 'Fullscreen Reading Mode'}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </header>

      {/* Bookmark Toast */}
      {bookmarkToast && (
        <div className="absolute top-16 right-6 z-40 bg-[#2F241E]/95 text-amber-300 text-xs font-bold px-3.5 py-2 rounded-xl shadow-lg border border-amber-400/40 flex items-center gap-2 animate-fade-in">
          <BookmarkCheck className="w-4 h-4 text-amber-400" />
          <span>{bookmarkToast}</span>
        </div>
      )}

      {/* ========================================================= */}
      {/* CHAPTER INDEX / TABLE OF CONTENTS DRAWER                   */}
      {/* ========================================================= */}
      {showToc && (
        <div className="absolute top-14 left-0 right-0 z-30 bg-[#2C211B]/95 backdrop-blur-md text-cream-100 p-5 border-b border-[#524135] shadow-2xl animate-fade-in max-h-[70vh] overflow-y-auto">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/10">
              <div>
                <h3 className="font-display font-bold text-base text-cream-50 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>The Children of Mu — Table of Contents</span>
                </h3>
                <p className="text-xs text-cream-300 font-sans mt-0.5">
                  Click any chapter to jump directly to its unabridged original scanned page.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowToc(false)}
                className="text-xs px-3 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 font-bold"
              >
                Close
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {CHILDREN_OF_MU_CHAPTERS.map((ch) => {
                const isCurrent = currentChapter.chapterNumber === ch.chapterNumber;
                return (
                  <button
                    key={ch.chapterNumber}
                    type="button"
                    onClick={() => {
                      goToPage(ch.page);
                      setShowToc(false);
                    }}
                    className={`p-2.5 rounded-xl text-left text-xs transition-all flex items-center justify-between gap-3 ${
                      isCurrent
                        ? 'bg-amber-500 text-ink-950 font-bold shadow-sm'
                        : 'bg-white/5 hover:bg-white/10 text-cream-100 border border-white/5'
                    }`}
                  >
                    <span className="truncate">{ch.title}</span>
                    <span
                      className={`text-[11px] shrink-0 font-mono px-2 py-0.5 rounded ${
                        isCurrent ? 'bg-amber-700 text-white' : 'bg-black/30 text-amber-300'
                      }`}
                    >
                      Page {ch.page}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* MAIN BOOK PAGE CANVAS VIEWPORT (AUTHENTIC BOOK AESTHETIC) */}
      {/* ========================================================= */}
      <div className="flex-1 overflow-auto relative p-4 sm:p-8 flex items-center justify-center min-h-[550px]">
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-cream-100/80 backdrop-blur-xs z-10">
            <Loader2 className="w-8 h-8 animate-spin text-amber-600" />
            <p className="text-xs font-bold text-ink-800">
              Opening Unabridged 290-Page Facsimile Edition...
            </p>
          </div>
        )}

        {/* Error Fallback */}
        {renderError && !isLoading && (
          <div className="p-6 max-w-md text-center bg-rose-50 border border-rose-200 rounded-2xl">
            <p className="text-sm font-bold text-rose-800 mb-2">Could not render PDF pages</p>
            <p className="text-xs text-rose-600 mb-4">{renderError}</p>
            <a
              href={pdfUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="site-button bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold px-4 py-2 rounded-xl inline-flex items-center gap-2"
            >
              <span>Open PDF in new window</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Physical Book Spine & Double Page Container */}
        {!renderError && (
          <div className="relative inline-flex items-center justify-center max-w-full">
            {/* Clickable Left Turning Zone */}
            <button
              type="button"
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-20 flex items-center justify-start pl-2 text-ink-900/30 hover:text-amber-600 hover:bg-black/[0.02] transition-colors cursor-pointer group disabled:pointer-events-none"
              title="Previous Page (Left Arrow)"
              aria-label="Previous Page"
            >
              <div className="w-9 h-9 rounded-full bg-white/80 dark:bg-stone-800/80 shadow-cozy-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronLeft className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
            </button>

            {/* Clickable Right Turning Zone */}
            <button
              type="button"
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-20 flex items-center justify-end pr-2 text-ink-900/30 hover:text-amber-600 hover:bg-black/[0.02] transition-colors cursor-pointer group disabled:pointer-events-none"
              title="Next Page (Right Arrow)"
              aria-label="Next Page"
            >
              <div className="w-9 h-9 rounded-full bg-white/80 dark:bg-stone-800/80 shadow-cozy-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <ChevronRight className="w-5 h-5 text-amber-700 dark:text-amber-300" />
              </div>
            </button>

            {/* Book Pages Frame with Authentic Paper Shadow & Center Spine */}
            <div
              className={`book-pages-wrapper book-spread-perspective relative flex items-center justify-center rounded-2xl p-2 sm:p-3.5 transition-all shadow-[0_16px_48px_rgba(25,15,8,0.28)] ${
                pageTone === 'night'
                  ? 'bg-[#1D1B1A] border-2 border-[#38322D]'
                  : 'bg-gradient-to-b from-[#3E2F25] via-[#33251D] to-[#2B1F17] border-2 border-[#524135]'
              }`}
            >
              {/* Left Page Canvas Leaf */}
              <div
                className={`relative rounded-l-lg overflow-hidden bg-[#FBF7EE] dark:bg-[#1C1A19] shadow-md flex flex-col items-center justify-center transition-all ${
                  isFlipping && flipDirection === 'prev' ? 'animate-book-flip-prev z-20' : 'z-10'
                }`}
                style={{
                  filter: TONE_FILTERS[pageTone],
                  boxShadow: twoPageMode
                    ? 'inset -14px 0 18px -8px rgba(0,0,0,0.2), -2px 2px 8px rgba(0,0,0,0.08)'
                    : '0 4px 14px rgba(0,0,0,0.12)',
                }}
              >
                <canvas ref={canvasLeftRef} className="block max-w-full h-auto select-none" />

                {/* Left Page Inner Gutter Spine Crease (binding shadow) */}
                {twoPageMode && (
                  <div className="absolute top-0 right-0 bottom-0 w-8 sm:w-12 pointer-events-none bg-gradient-to-l from-black/20 via-black/5 to-transparent z-10" />
                )}

                <div className="w-full text-center py-1 text-[10px] font-mono opacity-50 bg-black/5 select-none">
                  Page {currentPage} of {totalPages}
                </div>
              </div>

              {/* Central Spine Binding Gutter (only in 2-page spread) */}
              {twoPageMode && currentPage < totalPages && (
                <div className="relative w-2 sm:w-3 self-stretch bg-gradient-to-r from-[#221711] via-[#48372A] to-[#221711] shadow-inner flex items-center justify-center z-15">
                  <div className="w-[1px] h-full bg-black/50" />
                </div>
              )}

              {/* Right Page Canvas Leaf (when 2-page mode is enabled) */}
              {twoPageMode && currentPage < totalPages && (
                <div
                  className={`relative rounded-r-lg overflow-hidden bg-[#FBF7EE] dark:bg-[#1C1A19] shadow-md flex flex-col items-center justify-center transition-all ${
                    isFlipping && flipDirection === 'next' ? 'animate-book-flip-next z-20' : 'z-10'
                  }`}
                  style={{
                    filter: TONE_FILTERS[pageTone],
                    boxShadow:
                      'inset 14px 0 18px -8px rgba(0,0,0,0.2), 2px 2px 8px rgba(0,0,0,0.08)',
                  }}
                >
                  {/* Right Page Inner Gutter Spine Crease (binding shadow) */}
                  <div className="absolute top-0 left-0 bottom-0 w-8 sm:w-12 pointer-events-none bg-gradient-to-r from-black/20 via-black/5 to-transparent z-10" />

                  <canvas ref={canvasRightRef} className="block max-w-full h-auto select-none" />
                  <div className="w-full text-center py-1 text-[10px] font-mono opacity-50 bg-black/5 select-none">
                    Page {currentPage + 1} of {totalPages}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* ========================================================= */}
      {/* COZY FLOATING BOTTOM READING BAR                         */}
      {/* ========================================================= */}
      <footer className="bg-gradient-to-r from-[#2F241E] via-[#382C24] to-[#2F241E] text-cream-100 px-4 sm:px-6 py-2.5 border-t border-[#524135] flex flex-wrap items-center justify-between gap-3 z-20 shadow-lg text-xs">
        {/* Page Turning Buttons & Quick Input */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handlePrevPage}
            disabled={currentPage <= 1}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-ink-950 font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
            <span className="hidden sm:inline">Previous</span>
          </button>

          {/* Jump to Page Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              const num = parseInt(jumpInput, 10);
              if (!isNaN(num)) goToPage(num);
            }}
            className="flex items-center gap-1.5 font-bold"
          >
            <span className="text-[11px] opacity-70">Page</span>
            <input
              type="text"
              value={jumpInput}
              onChange={(e) => setJumpInput(e.target.value)}
              onBlur={() => {
                const num = parseInt(jumpInput, 10);
                if (!isNaN(num)) goToPage(num);
                else setJumpInput(String(currentPage));
              }}
              className="w-12 py-1 px-1 text-center font-mono text-xs rounded-lg bg-black/40 border border-[#6A5445] text-amber-300 focus:outline-none focus:border-amber-400 font-bold"
            />
            <span className="text-[11px] opacity-70">of {totalPages}</span>
          </form>

          <button
            type="button"
            onClick={handleNextPage}
            disabled={currentPage >= totalPages}
            className="px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 disabled:opacity-40 text-ink-950 font-bold flex items-center gap-1 shadow-xs transition-colors"
          >
            <span className="hidden sm:inline">Next</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Page Slider for Fast Scrubbing */}
        <div className="hidden md:flex items-center gap-2 flex-1 max-w-xs mx-3">
          <span className="text-[10px] opacity-60">1</span>
          <input
            type="range"
            min={1}
            max={totalPages}
            value={currentPage}
            onChange={(e) => goToPage(parseInt(e.target.value, 10))}
            className="w-full h-1.5 bg-black/40 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <span className="text-[10px] opacity-60">{totalPages}</span>
        </div>

        {/* Zoom & Spread Controls */}
        <div className="flex items-center gap-2">
          {/* Zoom In / Out */}
          <div className="flex items-center gap-1 bg-black/30 p-1 rounded-xl border border-[#5A473B]">
            <button
              type="button"
              onClick={() => handleZoom(-0.15)}
              disabled={scale <= 0.75}
              className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-40 text-cream-200"
              title="Zoom Out (-)"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <span className="text-[11px] font-mono px-1 font-bold text-amber-300">
              {Math.round(scale * 100)}%
            </span>
            <button
              type="button"
              onClick={() => handleZoom(0.15)}
              disabled={scale >= 2.1}
              className="p-1 rounded-lg hover:bg-white/10 disabled:opacity-40 text-cream-200"
              title="Zoom In (+)"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Single / Two-Page Spread Toggle */}
          <button
            type="button"
            onClick={() => setTwoPageMode(!twoPageMode)}
            className={`p-1.5 rounded-xl border border-[#5A473B] transition-colors hidden sm:flex items-center gap-1 text-[11px] font-bold ${
              twoPageMode ? 'bg-amber-500 text-ink-950' : 'bg-black/30 text-cream-200 hover:bg-black/50'
            }`}
            title={twoPageMode ? 'Switch to Single Page' : 'Switch to 2-Page Book Spread'}
          >
            {twoPageMode ? <Columns className="w-3.5 h-3.5" /> : <Square className="w-3.5 h-3.5" />}
            <span className="hidden lg:inline">{twoPageMode ? '2-Page Spread' : 'Single Page'}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}
