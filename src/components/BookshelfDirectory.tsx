import { useState, useMemo, useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { storyGenres, type Story } from '@/data/stories';
import {
  searchGutenbergBooks,
  convertGutenbergToStory,
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
  Plus,
  Check,
  RefreshCw,
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
  const { stories, addStory } = useSiteContent();
  const [activeLibraryTab, setActiveLibraryTab] = useState<'bookshelf' | 'gutenberg'>('bookshelf');

  // Bookshelf state
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<SavedProgress | null>(null);

  // Gutenberg public library state
  const [gutenbergQuery, setGutenbergQuery] = useState('');
  const [gutenbergBooks, setGutenbergBooks] = useState<GutenbergBook[]>([]);
  const [isSearchingGutenberg, setIsSearchingGutenberg] = useState(false);
  const [activePreset, setActivePreset] = useState<string>('All Classics');
  const [addedBookIds, setAddedBookIds] = useState<Set<number>>(new Set());

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

  // Pre-load initial public domain books
  useEffect(() => {
    let active = true;
    setIsSearchingGutenberg(true);
    searchGutenbergBooks('fairy tales').then((books) => {
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

  const handleAddGutenbergToShelf = (book: GutenbergBook) => {
    const converted = convertGutenbergToStory(book);
    addStory(converted);
    setAddedBookIds((prev) => new Set([...prev, book.id]));
  };

  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const matchesGenre = selectedGenre === 'All' || story.genre === selectedGenre;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        story.title.toLowerCase().includes(q) ||
        story.synopsis.toLowerCase().includes(q) ||
        story.author.toLowerCase().includes(q) ||
        story.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesGenre && matchesSearch;
    });
  }, [stories, selectedGenre, searchQuery]);

  const resumeStory = lastRead ? stories.find((s) => s.id === lastRead.storyId) : null;

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
            onClick={() => setActiveLibraryTab('bookshelf')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeLibraryTab === 'bookshelf'
                ? 'bg-peach-400 text-ink-900 shadow-cozy-sm'
                : 'text-tan-600 hover:text-ink-900'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Cozy Bookshelf ({stories.length})</span>
          </button>
          <button
            onClick={() => setActiveLibraryTab('gutenberg')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all ${
              activeLibraryTab === 'gutenberg'
                ? 'bg-peach-400 text-ink-900 shadow-cozy-sm'
                : 'text-tan-600 hover:text-ink-900'
            }`}
          >
            <Library className="w-4 h-4" />
            <span>Public Domain Explorer (70,000+ Free)</span>
          </button>
        </div>
      </div>

      {/* ========================================================= */}
      {/* TAB 1: COZY BOOKSHELF (CURATED ORIGINAL & CLASSIC BOOKS) */}
      {/* ========================================================= */}
      {activeLibraryTab === 'bookshelf' && (
        <div>
          {/* Resume Reading Bookmark Hero */}
          {resumeStory && lastRead && (
            <div className="max-w-4xl mx-auto mb-10 p-5 sm:p-6 rounded-2xl bg-cream-100 border-2 border-dashed border-peach-300 shadow-cozy-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-12 h-12 rounded-xl bg-peach-500 text-white flex items-center justify-center shrink-0 shadow-cozy-sm">
                  <BookMarked className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-peach-700 uppercase tracking-wider block">
                    Resume Reading
                  </span>
                  <h3 className="font-display font-bold text-base sm:text-lg text-ink-900">
                    {resumeStory.title}
                  </h3>
                  <p className="text-xs text-tan-600 font-medium mt-0.5">
                    Last read: Chapter {lastRead.chapterNumber} — {lastRead.chapterTitle}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onSelectStory(resumeStory, lastRead.chapterNumber)}
                className="site-button bg-peach-500 text-white hover:bg-peach-600 text-xs font-bold px-4 py-2.5 rounded-xl shadow-cozy-sm flex items-center gap-2 self-end sm:self-auto"
              >
                <span>Continue Chapter {lastRead.chapterNumber}</span>
                <ArrowRight size={14} />
              </button>
            </div>
          )}

          {/* Search & Genre Filters */}
          <div className="mb-10 space-y-4 max-w-4xl mx-auto">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
              <input
                type="text"
                placeholder="Search stories by title, author, or tag (e.g. Secret Garden, Stardew Valley, Rain)..."
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

            {/* Genre Filter Pills */}
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
            </div>
          </div>

          {/* Bookshelf Grid */}
          {filteredStories.length === 0 ? (
            <div className="notepad-card p-12 text-center max-w-md mx-auto">
              <BookOpen className="w-10 h-10 text-tan-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-ink-800 mb-1">No stories found</p>
              <p className="text-xs text-tan-500 mb-4">
                Try adjusting your search terms or clearing genre filters.
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
                const totalWords = story.chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
                const totalReadTime = story.chapters.reduce((sum, ch) => sum + ch.readTimeMinutes, 0);

                return (
                  <article
                    key={story.id}
                    className="notepad-card group overflow-hidden flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-cozy-lg relative"
                  >
                    <div>
                      {/* Book Cover */}
                      <div 
                        onClick={() => onSelectStory(story, 1)}
                        className="h-56 relative overflow-hidden bg-cream-200 cursor-pointer"
                      >
                        <img
                          src={story.coverImage}
                          alt={story.coverAlt}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-95 group-hover:saturate-100"
                          loading="lazy"
                        />
                        <div className="absolute top-3 left-3 bg-cream-100/95 backdrop-blur-xs border border-tan-300/80 px-2.5 py-1 rounded-full text-[11px] font-bold text-ink-800 shadow-cozy-sm">
                          {story.genre}
                        </div>
                        {story.isPublicDomain ? (
                          <div className="absolute top-3 right-3 bg-amber-600 text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
                            Public Domain
                          </div>
                        ) : (
                          <div className="absolute top-3 right-3 bg-earth-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
                            {story.status}
                          </div>
                        )}
                      </div>

                      {/* Content Details */}
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-xs text-tan-500 font-sans mb-2.5">
                          <span className="flex items-center gap-1">
                            <BookOpen className="w-3.5 h-3.5" />
                            {story.chapters.length} {story.chapters.length === 1 ? 'Chapter' : 'Chapters'}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            ~{totalReadTime} min read
                          </span>
                          <span>•</span>
                          <span>{totalWords.toLocaleString()} words</span>
                        </div>

                        <h3 
                          onClick={() => onSelectStory(story, 1)}
                          className="font-display font-bold text-lg sm:text-xl text-ink-900 group-hover:text-peach-600 transition-colors cursor-pointer mb-2 line-clamp-1"
                        >
                          {story.title}
                        </h3>

                        <p className="text-xs text-tan-500 font-bold mb-3">
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
                        <span>5/5 Cozy Score</span>
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
                  100% free, legal public domain literature. You can read any book directly in our E-Reader or save it permanently to your personal bookshelf.
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
                placeholder="Search 70,000 free books by title, author, or keyword (e.g. Peter Pan, Sherlock Holmes, Jane Austen)..."
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
              <p className="text-xs text-tan-500 mt-1">Fetching public domain books with high download counts.</p>
            </div>
          ) : gutenbergBooks.length === 0 ? (
            <div className="notepad-card p-12 text-center max-w-md mx-auto">
              <Library className="w-10 h-10 text-tan-400 mx-auto mb-3" />
              <p className="text-lg font-bold text-ink-800 mb-1">No matches found</p>
              <p className="text-xs text-tan-500 mb-4">
                Try searching for classic authors like "Dickens", "Carroll", "Doyle", or "Poe".
              </p>
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
                const isAdded = addedBookIds.has(book.id);

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
                          Public Domain
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
                        onClick={() => {
                          const converted = convertGutenbergToStory(book);
                          addStory(converted);
                          onSelectStory(converted, 1);
                        }}
                        className="w-full py-2 px-3 rounded-xl bg-peach-400 hover:bg-peach-500 text-ink-900 font-bold text-xs flex items-center justify-center gap-1.5 shadow-cozy-xs"
                      >
                        <BookOpen className="w-3.5 h-3.5" />
                        <span>Read in E-Reader</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => handleAddGutenbergToShelf(book)}
                        disabled={isAdded}
                        className={`w-full py-1.5 px-3 rounded-xl border text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
                          isAdded
                            ? 'border-emerald-300 bg-emerald-50 text-emerald-700 font-bold'
                            : 'border-tan-200 bg-white hover:bg-cream-100 text-tan-700'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                            <span>Saved to Shelf</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to My Bookshelf</span>
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
    </div>
  );
}
