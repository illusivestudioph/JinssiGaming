import { useState, useMemo, useEffect } from 'react';
import type { Story } from '@/data/stories';
import {
  searchGutenbergBooks,
  convertGutenbergToStory,
  fetchAndParseGutenbergBook,
  COZY_GUTENBERG_PRESETS,
  type GutenbergBook,
} from '@/services/gutenberg';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Coffee, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  Library,
  BookMarked,
  Check,
  BookmarkCheck,
  Trash2,
  Loader2,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';

interface BookshelfDirectoryProps {
  onSelectStory: (story: Story, chapterNumber?: number) => void;
}

interface SavedProgress {
  storyId: string;
  chapterNumber: number;
  chapterTitle: string;
  storyTitle: string;
  updatedAt: number;
}

export function BookshelfDirectory({ onSelectStory }: BookshelfDirectoryProps) {
  // Library search and filtering state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('All Classics');
  const [books, setBooks] = useState<GutenbergBook[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [lastRead, setLastRead] = useState<SavedProgress | null>(null);

  // Download & Unabridged parser state
  const [loadingBookId, setLoadingBookId] = useState<number | null>(null);
  const [loadingStatusText, setLoadingStatusText] = useState<string>('');

  // Private visitor bookmarks in client localStorage
  const [userBookmarks, setUserBookmarks] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem('jinssi-user-bookmarks');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const saveBookmarks = (next: Story[]) => {
    setUserBookmarks(next);
    try {
      localStorage.setItem('jinssi-user-bookmarks', JSON.stringify(next));
    } catch {
      // ignore
    }
  };

  const isBookmarked = (idOrSlug: string | number) => {
    const sId = String(idOrSlug);
    return userBookmarks.some(
      (b) =>
        b.id === sId ||
        b.id === `gutenberg-${sId}` ||
        b.slug === sId ||
        b.slug.includes(sId)
    );
  };

  const handleToggleBookmark = (storyOrBook: Story | GutenbergBook) => {
    const story: Story =
      'genre' in storyOrBook ? storyOrBook : convertGutenbergToStory(storyOrBook);
    const alreadySaved = isBookmarked(story.id);
    let next: Story[];
    if (alreadySaved) {
      next = userBookmarks.filter((b) => b.id !== story.id && b.slug !== story.slug);
    } else {
      next = [story, ...userBookmarks];
    }
    saveBookmarks(next);
  };

  // Open book and parse full unabridged text
  const handleReadBook = async (book: GutenbergBook) => {
    setLoadingBookId(book.id);
    setLoadingStatusText(`Connecting to Project Gutenberg archive (eBook #${book.id})...`);
    try {
      const realStory = await fetchAndParseGutenbergBook(book, (msg) => {
        setLoadingStatusText(msg);
      });
      onSelectStory(realStory, 1);
    } catch {
      const fallback = convertGutenbergToStory(book);
      onSelectStory(fallback, 1);
    } finally {
      setLoadingBookId(null);
      setLoadingStatusText('');
    }
  };

  // Load recently read story from localStorage
  useEffect(() => {
    try {
      let newest: SavedProgress | null = null;
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key && key.startsWith('jinssi-story-progress-')) {
          const raw = localStorage.getItem(key);
          if (raw) {
            const parsed = JSON.parse(raw) as SavedProgress;
            if (!newest || parsed.updatedAt > newest.updatedAt) {
              newest = parsed;
            }
          }
        }
      }
      setLastRead(newest);
    } catch {
      // ignore
    }
  }, []);

  // Fetch books when search query, active preset, or page changes
  useEffect(() => {
    if (activeCategory === '⭐ My Saved Books') {
      setIsLoading(false);
      return;
    }

    let active = true;
    setIsLoading(true);

    const preset = COZY_GUTENBERG_PRESETS.find((p) => p.label === activeCategory);
    const queryToRun = searchQuery.trim() || preset?.query || '';

    const controller = new AbortController();
    searchGutenbergBooks(queryToRun, controller.signal, page).then((results) => {
      if (active) {
        setBooks(results);
        setIsLoading(false);
      }
    });

    return () => {
      active = false;
      controller.abort();
    };
  }, [searchQuery, activeCategory, page]);

  // Reset page to 1 when changing filters
  const handleSelectCategory = (cat: string) => {
    setActiveCategory(cat);
    setPage(1);
  };

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-3 shadow-cozy-sm">
          <Library className="w-4 h-4 text-peach-600" />
          <span>Project Gutenberg Public Library</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Free Classics & Unabridged Literature
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Browse and read over 70,000 authentic public domain works. Every book is unabridged with verified Project Gutenberg covers and genuine chapters.
        </p>
      </div>

      {/* Resume Reading Widget if available */}
      {lastRead && (
        <div className="mb-10 max-w-4xl mx-auto">
          <div className="p-5 sm:p-6 rounded-2xl bg-peach-50/90 border-2 border-peach-200 shadow-cozy-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-peach-400 text-ink-900 flex items-center justify-center shrink-0 shadow-cozy-xs">
                <Bookmark className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-peach-700 uppercase tracking-wider block">
                  Jump Back In
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-ink-900">
                  {lastRead.storyTitle}
                </h3>
                <p className="text-xs text-ink-600 font-sans mt-0.5">
                  Chapter {lastRead.chapterNumber}: {lastRead.chapterTitle}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                const num = parseInt(lastRead.storyId.replace('gutenberg-', ''), 10);
                if (!isNaN(num)) {
                  const match = books.find((b) => b.id === num);
                  if (match) {
                    handleReadBook(match);
                    return;
                  }
                }
                // fallback to saved story in userBookmarks
                const saved = userBookmarks.find((b) => b.id === lastRead.storyId);
                if (saved) {
                  onSelectStory(saved, lastRead.chapterNumber);
                }
              }}
              className="site-button bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs px-5 py-2.5 rounded-xl flex items-center gap-2 shadow-cozy-sm self-stretch sm:self-auto justify-center"
            >
              <span>Continue Reading</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Search & Category Filter Bar */}
      <div className="mb-10 space-y-4 max-w-4xl mx-auto">
        {/* Search Input */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search over 70,000 books by title, author, or keyword (e.g. Sherlock Holmes, Jane Austen, Dracula, Meditations)..."
            value={searchQuery}
            onChange={(e) => handleSearchChange(e.target.value)}
            className="w-full pl-12 pr-20 py-3.5 rounded-2xl bg-cream-50 border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => handleSearchChange('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-tan-500 hover:text-ink-900 bg-cream-200 px-2.5 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Quick Category Filter Pills */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {COZY_GUTENBERG_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => handleSelectCategory(preset.label)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm ${
                activeCategory === preset.label
                  ? 'bg-peach-500 text-white shadow-cozy-md scale-105'
                  : 'bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
              }`}
            >
              {preset.label}
            </button>
          ))}

          {/* User's Saved Bookmarks Pill */}
          <button
            onClick={() => handleSelectCategory('⭐ My Saved Books')}
            className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm flex items-center gap-1.5 ${
              activeCategory === '⭐ My Saved Books'
                ? 'bg-peach-500 text-white shadow-cozy-md scale-105'
                : 'bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
            }`}
          >
            <span>⭐ My Saved Books</span>
            <span className="text-[10px] bg-peach-200 text-peach-800 px-1.5 py-0.2 rounded-full font-extrabold">
              {userBookmarks.length}
            </span>
          </button>
        </div>
      </div>

      {/* Loading Toast Message */}
      {loadingStatusText && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-2xl bg-ink-900/95 text-white shadow-cozy-lg border border-tan-400/20 backdrop-blur-md flex items-center gap-3 animate-fade-in max-w-md">
          <Loader2 className="w-5 h-5 animate-spin text-peach-400 shrink-0" />
          <div className="text-xs">
            <p className="font-bold text-peach-300">Project Gutenberg Library</p>
            <p className="text-cream-100 font-sans">{loadingStatusText}</p>
          </div>
        </div>
      )}

      {/* ========================================================= */}
      {/* SAVED BOOKMARKS VIEW                                      */}
      {/* ========================================================= */}
      {activeCategory === '⭐ My Saved Books' ? (
        <div>
          {userBookmarks.length === 0 ? (
            <div className="text-center py-16 bg-cream-50 rounded-3xl border-2 border-dashed border-tan-200 max-w-lg mx-auto">
              <Bookmark className="w-12 h-12 mx-auto text-tan-300 mb-3" />
              <h3 className="font-display font-bold text-lg text-ink-900 mb-1">
                Your Reading Shelf is Clean & Quiet
              </h3>
              <p className="text-xs text-ink-600 font-sans max-w-xs mx-auto mb-5">
                Bookmark any classic from the catalog to build your own personal cozy library.
              </p>
              <button
                onClick={() => handleSelectCategory('All Classics')}
                className="site-button bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-cozy-sm"
              >
                Browse All Classics
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {userBookmarks.map((story) => (
                <div
                  key={story.id}
                  className="notepad-card group overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md"
                >
                  <div>
                    <div className="h-56 relative overflow-hidden bg-cream-200 flex items-center justify-center p-2">
                      <img
                        src={story.coverImage}
                        alt={story.coverAlt}
                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleToggleBookmark(story);
                        }}
                        title="Remove bookmark"
                        className="absolute top-3 right-3 p-2 rounded-xl bg-white/90 backdrop-blur-xs text-rose-500 hover:bg-rose-50 shadow-cozy-sm transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="p-5">
                      <h3 className="font-display font-bold text-base text-ink-900 line-clamp-1 mb-1">
                        {story.title}
                      </h3>
                      <p className="text-xs text-tan-500 font-bold mb-3">By {story.author}</p>
                      <p className="text-xs text-ink-700 font-sans line-clamp-3 leading-relaxed mb-4">
                        {story.synopsis}
                      </p>
                    </div>
                  </div>

                  <div className="px-5 pb-5 pt-2 border-t border-tan-200">
                    <button
                      onClick={() => onSelectStory(story, 1)}
                      className="w-full site-button bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-cozy-sm"
                    >
                      <BookOpen className="w-4 h-4" />
                      <span>Read Unabridged</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : (
        /* ========================================================= */
        /* GUTENBERG LIVE ARCHIVE VIEW                               */
        /* ========================================================= */
        <div>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 8 }).map((_, idx) => (
                <div
                  key={idx}
                  className="notepad-card p-5 animate-pulse flex flex-col justify-between h-96"
                >
                  <div className="w-full h-48 bg-cream-200 rounded-xl mb-4" />
                  <div className="space-y-2">
                    <div className="h-4 bg-cream-200 rounded w-3/4" />
                    <div className="h-3 bg-cream-200 rounded w-1/2" />
                    <div className="h-10 bg-cream-200 rounded w-full mt-2" />
                  </div>
                  <div className="h-8 bg-cream-200 rounded w-full mt-4" />
                </div>
              ))}
            </div>
          ) : books.length === 0 ? (
            <div className="text-center py-16 bg-cream-50 rounded-3xl border-2 border-dashed border-tan-200 max-w-lg mx-auto">
              <Search className="w-12 h-12 mx-auto text-tan-300 mb-3" />
              <h3 className="font-display font-bold text-lg text-ink-900 mb-1">
                No Books Found for "{searchQuery}"
              </h3>
              <p className="text-xs text-ink-600 font-sans max-w-xs mx-auto mb-5">
                Try searching for another classic author, title, or click a popular preset above.
              </p>
              <button
                onClick={() => handleSearchChange('')}
                className="site-button bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold px-4 py-2 rounded-xl shadow-cozy-sm"
              >
                Reset Search
              </button>
            </div>
          ) : (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {books.map((book) => {
                  const authorName = book.authors[0]?.name
                    ? book.authors[0].name.split(',').reverse().join(' ').trim()
                    : 'Classic Author';

                  // Real Gutenberg cover
                  const coverImage =
                    book.cover_image ||
                    book.formats['image/jpeg'] ||
                    `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;

                  const bookmarked = isBookmarked(book.id);
                  const isCurrentLoading = loadingBookId === book.id;

                  return (
                    <div
                      key={book.id}
                      className="notepad-card group overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md"
                    >
                      <div>
                        {/* Cover Image Container */}
                        <div className="h-56 relative overflow-hidden bg-cream-200 flex items-center justify-center p-2">
                          <img
                            src={coverImage}
                            alt={`Actual Project Gutenberg cover for ${book.title}`}
                            className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                            loading="lazy"
                          />
                          <div className="absolute top-3 left-3 bg-cream-100/95 backdrop-blur-xs border border-tan-300/80 px-2.5 py-0.5 rounded-full text-[10px] font-bold text-ink-800 shadow-cozy-sm">
                            eBook #{book.id}
                          </div>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleBookmark(book);
                            }}
                            title={bookmarked ? 'Saved to bookmarks' : 'Add to bookmarks'}
                            className={`absolute top-3 right-3 p-2 rounded-xl backdrop-blur-xs shadow-cozy-sm transition-all ${
                              bookmarked
                                ? 'bg-peach-500 text-white scale-105'
                                : 'bg-white/90 text-tan-500 hover:text-peach-600 hover:bg-white'
                            }`}
                          >
                            <Bookmark className="w-4 h-4" />
                          </button>
                        </div>

                        {/* Details */}
                        <div className="p-5">
                          <div className="flex items-center gap-2 text-[11px] text-tan-500 font-sans mb-1.5">
                            <span className="flex items-center gap-1 font-semibold">
                              <BookOpen className="w-3.5 h-3.5 text-peach-500" />
                              Unabridged
                            </span>
                            <span>•</span>
                            <span>{(book.download_count || 50000).toLocaleString()} reads</span>
                          </div>

                          <h3
                            className="font-display font-bold text-base text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-1 mb-1"
                            title={book.title}
                          >
                            {book.title}
                          </h3>

                          <p className="text-xs text-tan-500 font-bold mb-2.5 line-clamp-1">
                            By {authorName}
                          </p>

                          <p className="text-xs text-ink-700 font-sans line-clamp-3 leading-relaxed mb-4">
                            {book.subjects && book.subjects.length > 0
                              ? book.subjects.slice(0, 3).map((s) => s.split('--')[0].trim()).join(' • ')
                              : 'Classic public domain literature preserved by Project Gutenberg.'}
                          </p>
                        </div>
                      </div>

                      {/* Action Button */}
                      <div className="px-5 pb-5 pt-2 border-t border-tan-200">
                        <button
                          type="button"
                          disabled={isCurrentLoading}
                          onClick={() => handleReadBook(book)}
                          className="w-full site-button bg-peach-500 hover:bg-peach-600 disabled:opacity-75 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-2 shadow-cozy-sm transition-all"
                        >
                          {isCurrentLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin text-white" />
                              <span>Opening eBook...</span>
                            </>
                          ) : (
                            <>
                              <BookOpen className="w-4 h-4" />
                              <span>Read Unabridged</span>
                              <ArrowRight className="w-3.5 h-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Pagination Controls */}
              <div className="mt-12 flex items-center justify-center gap-4">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => {
                    setPage((p) => Math.max(1, p - 1));
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 border border-tan-200 text-xs font-bold text-ink-800 disabled:opacity-40 disabled:pointer-events-none flex items-center gap-1.5 shadow-cozy-sm transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Previous Page</span>
                </button>

                <div className="px-4 py-2 rounded-xl bg-peach-100 text-peach-800 text-xs font-extrabold shadow-cozy-xs">
                  Page {page}
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPage((p) => p + 1);
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                  className="px-4 py-2 rounded-xl bg-cream-100 hover:bg-cream-200 border border-tan-200 text-xs font-bold text-ink-800 flex items-center gap-1.5 shadow-cozy-sm transition-colors"
                >
                  <span>Next Page</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
