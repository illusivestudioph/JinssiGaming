import { useState, useMemo, useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { storyGenres, type Story } from '@/data/stories';
import { 
  BookOpen, 
  Search, 
  Clock, 
  Coffee, 
  ArrowRight, 
  Bookmark, 
  CheckCircle2, 
  Library,
  BookMarked
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
  const [selectedGenre, setSelectedGenre] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastRead, setLastRead] = useState<SavedProgress | null>(null);

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
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-3 shadow-cozy-sm">
          <Library className="w-4 h-4" />
          <span>The Cozy Bookshelf</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Serialized Web Fiction & E-Books
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Escape into gentle stories, gaming-inspired chronicles, and calming slice-of-life chapters designed for warm evenings.
        </p>
      </div>

      {/* Resume Reading Bookmark Hero (If user has read before) */}
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
            placeholder="Search stories by title, author, or tag (e.g. Coffee Talk, Stardew Valley)..."
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
                    
                    {/* Genre & Status Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-lg bg-ink-900/80 backdrop-blur-sm text-cream-50 text-[11px] font-bold">
                        {story.genre}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-sage-500/90 text-white text-[10px] font-bold flex items-center gap-1">
                        <CheckCircle2 size={10} />
                        {story.status}
                      </span>
                    </div>

                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-cream-50/90 backdrop-blur-sm text-ink-900 text-xs font-bold shadow-cozy-sm flex items-center gap-1">
                      <BookOpen size={12} className="text-peach-500" />
                      <span>{story.chapters.length} Chapters</span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-xs text-tan-500 font-semibold mb-2">
                      <span className="flex items-center gap-1">
                        <Clock size={12} className="text-peach-500" />
                        {totalReadTime} min read
                      </span>
                      <span>•</span>
                      <span>~{totalWords.toLocaleString()} words</span>
                    </div>

                    <h2 
                      onClick={() => onSelectStory(story, 1)}
                      className="font-display font-bold text-xl text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-2 leading-snug mb-2 cursor-pointer"
                    >
                      {story.title}
                    </h2>

                    <p className="text-xs text-tan-500 font-medium mb-3">
                      By {story.author} ({story.authorRole})
                    </p>

                    <p className="text-xs text-ink-700 line-clamp-3 leading-relaxed font-sans mb-4">
                      {story.synopsis}
                    </p>

                    {/* Chapter Teaser Pill List */}
                    <div className="space-y-1.5 pt-2 border-t border-tan-100 mb-4">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-tan-400 block mb-1">
                        Chapters:
                      </span>
                      {story.chapters.slice(0, 3).map((ch) => (
                        <div
                          key={ch.id}
                          onClick={() => onSelectStory(story, ch.chapterNumber)}
                          className="text-xs text-ink-800 hover:text-peach-600 font-medium flex items-center justify-between cursor-pointer py-0.5"
                        >
                          <span className="line-clamp-1">
                            {ch.chapterNumber}. {ch.title}
                          </span>
                          <span className="text-[11px] text-tan-400 shrink-0">
                            {ch.readTimeMinutes}m
                          </span>
                        </div>
                      ))}
                      {story.chapters.length > 3 && (
                        <div className="text-[11px] font-bold text-peach-600">
                          + {story.chapters.length - 3} more chapters...
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Footer Read Action */}
                <div className="px-6 pb-6 pt-2 border-t border-tan-200/60 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-xs text-earth-700 font-bold">
                    <Coffee size={13} className="text-peach-600" />
                    <span>{story.rating}/5 🍵</span>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectStory(story, 1)}
                    className="site-button bg-peach-500 text-white hover:bg-peach-600 text-xs font-bold px-4 py-2 rounded-xl shadow-cozy-sm flex items-center gap-1.5 transition-all group-hover:scale-105"
                  >
                    <span>Read Book</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
