import { useState, useMemo, useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { storyGenres, type Story } from '@/data/stories';
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
  Download,
  Check,
  RefreshCw,
  BookmarkCheck,
  Trash2
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
  const { stories } = useSiteContent();
  const [activeLibraryTab, setActiveLibraryTab] = useState<'bookshelf' | 'gutenberg'>('bookshelf');

  // Bookshelf state
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<SavedProgress | null>(null);

  // Private visitor bookmarks in client localStorage (protects Admin Bookshelf from pollution)
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
    return userBookmarks.some((b) => b.id === sId || b.id === `gutenberg-${sId}` || b.slug === sId || b.slug.includes(sId));
  };

  const handleToggleBookmark = (storyOrBook: Story | GutenbergBook) => {
    const story: Story = 'genre' in storyOrBook ? storyOrBook : convertGutenbergToStory(storyOrBook);
    const alreadySaved = isBookmarked(story.id);
    let next: Story[];
    if (alreadySaved) {
      next = userBookmarks.filter((b) => b.id !== story.id && b.slug !== story.slug);
    } else {
      next = [story, ...userBookmarks];
    }
    saveBookmarks(next);
  };

  // Gutenberg public library state
  const [gutenbergQuery, setGutenbergQuery] = useState('');
  const [gutenbergBooks, setGutenbergBooks] = useState<GutenbergBook[]>([]);
  const [isSearchingGutenberg, setIsSearchingGutenberg] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('All Classics');
  const [loadingGutenbergId, setLoadingGutenbergId] = useState<number | null>(null);
  const [loadingStatusText, setLoadingStatusText] = useState<string>('');

  const handleReadGutenbergBook = async (book: GutenbergBook) => {
    setLoadingGutenbergId(book.id);
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
      setLoadingGutenbergId(null);
      setLoadingStatusText('');
    }
  };

  // Check for the most recently read story from localStorage
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

  // Pre-load initial public domain books with instant 60+ book catalog
  useEffect(() => {
    let active = true;
    setIsSearchingGutenberg(true);
    searchGutenbergBooks('').then((books) => {
      if (active) {
        setGutenbergBooks(books);
        setIsSearchingGutenberg(false);
      }
    });
    return () => {
      active = false;
    };
  }, []);

  const handleSearchGutenberg = async (queryText: string) => {
    setIsSearchingGutenberg(true);
    const results = await searchGutenbergBooks(queryText);
    setGutenbergBooks(results);
    setIsSearchingGutenberg(false);
  };

  const filteredStories = useMemo(() => {
    const sourceList = selectedGenre === '⭐ My Saved Books' ? userBookmarks : stories;

    return sourceList.filter((story) => {
      const matchesGenre =
        selectedGenre === 'All' ||
        selectedGenre === '⭐ My Saved Books' ||
        story.genre === selectedGenre;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        story.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesGenre && matchesSearch;
    });
  }, [stories, userBookmarks, selectedGenre, searchQuery]);

  const resumeStory = lastRead
    ? stories.find((s) => s.id === lastRead.storyId) ||
      userBookmarks.find((s) => s.id === lastRead.storyId)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Top Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-3 shadow-cozy-sm">
          <Library className="w-4 h-4" />
          <span>The Cozy Bookshelf & Public Library</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Stories, Web-Novels & Free Classics
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Read curated cozy fiction, bedtime slice-of-life, and search over 70,000 free public domain classics preserved by Project Gutenberg.
        </p>
      </div>

      {/* Dual Tab Navigator */}
      <div className="flex justify-center mb-10">
        <div className="inline-flex p-1.5 rounded-2xl bg-cream-100 border border-tan-200 shadow-cozy-xs">
          <button
            type="button"
            onClick={() => setActiveLibraryTab('bookshelf')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold transition-all ${
              activeLibraryTab === 'bookshelf'
                ? 'bg-peach-500 text-white shadow-cozy-sm'
                : 'text-tan-600 hover:text-ink-900 hover:bg-cream-200/60'
            }`}
          >
            <BookMarked className="w-4 h-4" />
            <span>Curated Bookshelf ({stories.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveLibraryTab('gutenberg')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-display text-xs sm:text-sm font-bold transition-all ${
              activeLibraryTab === 'gutenberg'
                ? 'bg-amber-600 text-white shadow-cozy-sm'
                : 'text-tan-600 hover:text-ink-900 hover:bg-cream-200/60'
            }`}
          >
            <Library className="w-4 h-4" />
            <span>Project Gutenberg Archive (70,000+)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: CURATED COZY BOOKSHELF                             */}
      {/* ========================================================= */}
      {activeLibraryTab === 'bookshelf' && (
        <div>
          {/* Resume Reading Widget if available */}
          {lastRead && (
            <div className="mb-10 max-w-4xl mx-auto">
              <div className="p-5 sm:p-6 rounded-2xl bg-peach-50/80 border-2 border-peach-200 shadow-cozy-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                    if (resumeStory) {
                      onSelectStory(resumeStory, lastRead.chapterNumber);
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

          {/* Search & Genre Filters */}
          <div className="mb-10 space-y-4 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search stories by title, author, or tag (e.g. Secret Garden, Sherlock, Stoicism, War)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-50 border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-tan-400 hover:text-ink-900 bg-cream-200 px-2.5 py-1 rounded-lg"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Genre Filter Pills + Visitor's Personal Bookmarks Pill */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {storyGenres.map((genre) => (
                <button
                  key={genre}
                  onClick={() => setSelectedGenre(genre)}
                  className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm ${
                    selectedGenre === genre
                      ? 'bg-peach-500 text-white shadow-cozy-md scale-105'
                      : 'bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
                  }`}
                >
                  {genre}
                </button>
              ))}

              <button
                type="button"
                onClick={() => setSelectedGenre('⭐ My Saved Books')}
                className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm flex items-center gap-1.5 ${
                  selectedGenre === '⭐ My Saved Books'
                    ? 'bg-amber-600 text-white shadow-cozy-md scale-105'
                    : 'bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
                }`}
              >
                <span>⭐ My Saved Books</span>
                {userBookmarks.length > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-extrabold ${
                    selectedGenre === '⭐ My Saved Books' ? 'bg-white text-amber-700' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {userBookmarks.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Bookshelf Grid */}
          {filteredStories.length === 0 ? (
            <div className="notepad-card p-12 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-tan-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-ink-800 mb-1">
                {selectedGenre === '⭐ My Saved Books' ? 'No saved books yet' : 'No stories found'}
              </p>
              <p className="text-xs text-tan-500 mb-4">
                {selectedGenre === '⭐ My Saved Books'
                  ? 'Bookmark any classic or search result to keep it here in your private reading shelf!'
                  : 'Try adjusting your search terms or clearing genre filters.'}
              </p>
              <button
                onClick={() => {
                  setSelectedGenre('All');
                  setSearchQuery('');
                }}
                className="px-4 py-2 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600 transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredStories.map((story) => {
                const bookmarked = isBookmarked(story.id);

                return (
                  <article
                    key={story.id}
                    className="notepad-card overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-sm hover:shadow-cozy-md"
                  >
                    <div>
                      {/* Cover Photo */}
                      <div className="relative h-56 overflow-hidden bg-cream-200">
                        <img
                          src={story.coverImage}
                          alt={story.coverAlt || story.title}
                          className="w-full h-full object-cover filter saturate-95 hover:saturate-105 transition-all duration-500"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                          <span className="px-2.5 py-1 rounded-full bg-cream-50/90 text-tan-800 text-xs font-bold shadow-cozy-xs backdrop-blur-sm">
                            {story.genre}
                          </span>
                          <span className="px-2.5 py-1 rounded-full bg-peach-500 text-white text-xs font-bold shadow-cozy-xs">
                            {story.totalChapters || story.chapters.length} Chapters
                          </span>
                        </div>

                        {/* Bookmark Button */}
                        <button
                          type="button"
                          onClick={() => handleToggleBookmark(story)}
                          title={bookmarked ? 'Remove bookmark' : 'Bookmark this book'}
                          className={`absolute top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-cozy-xs ${
                            bookmarked
                              ? 'bg-amber-500 text-white'
                              : 'bg-white/80 hover:bg-white text-tan-600 hover:text-ink-900'
                          }`}
                        >
                          <Bookmark className="w-4 h-4 fill-current" />
                        </button>
                      </div>

                      {/* Content Info */}
                      <div className="p-6">
                        <h3 className="font-display text-xl font-bold text-ink-900 mb-1 leading-snug">
                          {story.title}
                        </h3>

                        <p className="text-xs font-bold text-tan-600 mb-3 font-sans">
                          By {story.author} • <span className="opacity-75">{story.authorRole}</span>
                        </p>

                        <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-3 leading-relaxed mb-4">
                          {story.synopsis}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-2">
                          {story.tags.slice(0, 3).map((tag) => (
                            <span
                              key={tag}
                              className="px-2 py-0.5 rounded-md bg-cream-200/80 text-tan-700 text-[11px] font-medium"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Card Footer Button */}
                    <div className="px-6 pb-6 pt-2 border-t border-tan-200 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-xs font-bold text-tan-500">
                        <Coffee className="w-3.5 h-3.5 text-peach-500" />
                        <span>{story.totalChapters || story.chapters.length} Chs Available</span>
                      </div>

                      <button
                        type="button"
                        onClick={() => onSelectStory(story, 1)}
                        className="site-button bg-peach-400 hover:bg-peach-500 text-ink-900 text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-cozy-sm"
                      >
                        <span>Start Reading</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* ========================================================= */}
      {/* TAB 2: PROJECT GUTENBERG FREE PUBLIC DOMAIN EXPLORER      */}
      {/* ========================================================= */}
      {activeLibraryTab === 'gutenberg' && (
        <div className="space-y-8 animate-fade-in">
          {/* Gutenberg Info Box */}
          <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-amber-50/80 border-2 border-amber-200 shadow-cozy-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white flex items-center justify-center shrink-0 shadow-cozy-sm">
                <Library className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-amber-800 uppercase tracking-wider block">
                  Public Domain Archives
                </span>
                <h3 className="font-display font-bold text-base sm:text-lg text-ink-900">
                  Project Gutenberg 70,000+ Free E-Book Library
                </h3>
                <p className="text-xs text-tan-700 font-medium mt-0.5">
                  100% free, legal public domain literature with 10+ readable chapters. Read directly in our E-Reader or save to your personal device.
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar & Preset Tags */}
          <div className="max-w-4xl mx-auto space-y-4">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search 70,000 free books by title, author, or keyword (e.g. Austen, Dickens, Dracula, Sherlock, War, Oz)..."
                value={gutenbergQuery}
                onChange={(e) => {
                  setGutenbergQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSearchGutenberg(gutenbergQuery);
                  }
                }}
                className="w-full pl-12 pr-28 py-3 rounded-2xl bg-white border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm text-sm"
              />
              <button
                type="button"
                onClick={() => handleSearchGutenberg(gutenbergQuery)}
                className="absolute right-2 top-1/2 -translate-y-1/2 site-button bg-peach-400 hover:bg-peach-500 text-ink-900 text-xs font-bold px-4 py-1.5 rounded-xl shadow-cozy-xs"
              >
                {isSearchingGutenberg ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : 'Search'}
              </button>
            </div>

            {/* Presets */}
            <div className="flex flex-wrap gap-2 justify-center items-center">
              {COZY_GUTENBERG_PRESETS.map((preset) => (
                <button
                  key={preset.label}
                  type="button"
                  onClick={() => {
                    setActivePreset(preset.label);
                    setGutenbergQuery(preset.query);
                    handleSearchGutenberg(preset.query);
                  }}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    activePreset === preset.label
                      ? 'bg-amber-600 text-white shadow-cozy-sm'
                      : 'bg-cream-100 text-tan-600 hover:bg-cream-200 border border-tan-200'
                  }`}
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>

          {/* Results Grid */}
          {isSearchingGutenberg ? (
            <div className="py-16 text-center">
              <RefreshCw className="w-8 h-8 animate-spin text-peach-500 mx-auto mb-3" />
              <p className="font-display font-bold text-ink-900">Scanning Project Gutenberg archives...</p>
              <p className="text-xs text-tan-500 mt-1">Fetching verified public domain classics.</p>
            </div>
          ) : gutenbergBooks.length === 0 ? (
            <div className="notepad-card p-12 text-center max-w-md mx-auto">
              <Library className="w-10 h-10 text-tan-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-ink-800 mb-1">No matches found for "{gutenbergQuery}"</p>
              <p className="text-xs text-tan-500 mb-4">
                Try searching for classic authors or titles:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {['Jane Austen', 'Sherlock Holmes', 'Charles Dickens', 'Frankenstein', 'Dracula', 'Sun Tzu', 'Meditations', 'Fairy Tales'].map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => {
                      setGutenbergQuery(tag);
                      handleSearchGutenberg(tag);
                    }}
                    className="px-2.5 py-1 rounded-lg bg-cream-200 hover:bg-peach-200 text-tan-800 text-xs font-medium transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gutenbergBooks.map((book) => {
                const authorName = book.authors[0]?.name
                  ? book.authors[0].name.split(',').reverse().join(' ').trim()
                  : 'Classic Author';
                const cover =
                  book.formats['image/jpeg'] ||
                  `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;
                const isSaved = isBookmarked(book.id);

                return (
                  <div
                    key={book.id}
                    className="notepad-card overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-sm hover:shadow-cozy-md"
                  >
                    <div>
                      <div className="h-48 relative overflow-hidden bg-cream-200">
                        <img
                          src={cover}
                          alt={book.title}
                          className="w-full h-full object-cover filter saturate-90 hover:saturate-100 transition-all"
                          loading="lazy"
                        />
                        <div className="absolute top-2 right-2 bg-black/70 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Download className="w-2.5 h-2.5" />
                          <span>{book.download_count.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="p-4">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 bg-amber-50 px-2 py-0.5 rounded-full inline-block mb-1.5">
                          Public Domain (10+ Chs)
                        </span>

                        <h4 className="font-display font-bold text-sm text-ink-900 line-clamp-2 mb-1" title={book.title}>
                          {book.title}
                        </h4>

                        <p className="text-xs text-tan-600 mb-3">
                          By {authorName}
                        </p>

                        <div className="flex flex-wrap gap-1">
                          {book.subjects.slice(0, 2).map((subj, sIdx) => (
                            <span
                              key={sIdx}
                              className="text-[10px] text-tan-600 bg-cream-100 border border-tan-200 px-1.5 py-0.5 rounded"
                            >
                              {subj.split('--')[0].trim()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="p-4 pt-2 border-t border-tan-200 flex flex-col gap-2">
                      <button
                        type="button"
                        disabled={loadingGutenbergId === book.id}
                        onClick={() => handleReadGutenbergBook(book)}
                        className={`w-full py-2 px-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 shadow-cozy-xs transition-all ${
                          loadingGutenbergId === book.id
                            ? 'bg-peach-200 text-ink-700 cursor-wait'
                            : 'bg-peach-400 hover:bg-peach-500 text-ink-900'
                        }`}
                      >
                        {loadingGutenbergId === book.id ? (
                          <>
                            <RefreshCw className="w-3.5 h-3.5 animate-spin text-peach-600" />
                            <span className="truncate max-w-[170px]">{loadingStatusText || 'Downloading...'}</span>
                          </>
                        ) : (
                          <>
                            <BookOpen className="w-3.5 h-3.5" />
                            <span>Read in E-Reader</span>
                          </>
                        )}
                      </button>

                      <button
                        type="button"
                        onClick={() => handleToggleBookmark(book)}
                        className={`w-full py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isSaved
                            ? 'border-amber-400 bg-amber-50 text-amber-800 font-bold'
                            : 'border-tan-200 bg-white hover:bg-cream-100 text-tan-700'
                        }`}
                      >
                        {isSaved ? (
                          <>
                            <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                            <span>Saved to My Books</span>
                          </>
                        ) : (
                          <>
                            <Bookmark className="w-3.5 h-3.5" />
                            <span>Bookmark to Device</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Real-time Project Gutenberg Download Toast */}
      {loadingGutenbergId && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-ink-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-peach-400/50 backdrop-blur-md animate-fade-in">
          <RefreshCw className="w-4 h-4 animate-spin text-peach-400 shrink-0" />
          <div className="text-left">
            <p className="text-xs font-bold text-peach-300">Project Gutenberg Archive Download</p>
            <p className="text-[11px] text-cream-200">{loadingStatusText || 'Downloading authentic text...'}</p>
          </div>
        </div>
      )}
    </div>
  );
}
