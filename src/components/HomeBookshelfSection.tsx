import { useState } from 'react';
import type { Story } from '@/data/stories';
import {
  FALLBACK_GUTENBERG_CATALOG,
  convertGutenbergToStory,
  fetchAndParseGutenbergBook,
  type GutenbergBook,
} from '@/services/gutenberg';
import { BookOpen, Clock, ArrowRight, BookMarked, Coffee, Loader2 } from 'lucide-react';

interface HomeBookshelfSectionProps {
  onSelectStory: (story: Story, chapterNumber?: number) => void;
  onNavigateToBookshelf: () => void;
}

export function HomeBookshelfSection({
  onSelectStory,
  onNavigateToBookshelf,
}: HomeBookshelfSectionProps) {
  const [loadingBookId, setLoadingBookId] = useState<number | null>(null);
  const [statusText, setStatusText] = useState('');

  // 3 Premier public domain classics with real covers
  const spotlightIds = [1661, 1342, 113];
  const featuredBooks: GutenbergBook[] = FALLBACK_GUTENBERG_CATALOG.filter((b) =>
    spotlightIds.includes(b.id)
  );

  const handleReadBook = async (book: GutenbergBook) => {
    setLoadingBookId(book.id);
    setStatusText(`Opening unabridged eBook #${book.id}...`);
    try {
      const realStory = await fetchAndParseGutenbergBook(book, (msg) => setStatusText(msg));
      onSelectStory(realStory, 1);
    } catch {
      const fallback = convertGutenbergToStory(book);
      onSelectStory(fallback, 1);
    } finally {
      setLoadingBookId(null);
      setStatusText('');
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-tan-200/70">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-2 shadow-cozy-sm">
            <BookMarked className="w-3.5 h-3.5 text-peach-600" />
            <span>Public Domain Archive & Free Library</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
            Authentic Classics & Unabridged Literature
          </h2>
          <p className="text-sm text-ink-700 font-sans mt-1">
            Read complete, unabridged editions directly from Project Gutenberg archives with authentic book covers.
          </p>
        </div>

        <button
          onClick={onNavigateToBookshelf}
          className="inline-flex items-center gap-2 text-xs font-bold text-peach-600 hover:text-peach-700 transition-colors bg-cream-100 hover:bg-cream-200 border border-tan-200 px-4 py-2 rounded-xl shadow-cozy-sm self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse 70,000+ Free eBooks</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {statusText && (
        <div className="mb-6 p-3 rounded-xl bg-peach-50 border border-peach-200 text-xs text-peach-700 font-bold flex items-center gap-2 animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin text-peach-500" />
          <span>{statusText}</span>
        </div>
      )}

      {/* Featured Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredBooks.map((book) => {
          const authorName = book.authors[0]?.name
            ? book.authors[0].name.split(',').reverse().join(' ').trim()
            : 'Classic Author';
          const coverImage =
            book.formats['image/jpeg'] ||
            `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;
          const isLoadingThis = loadingBookId === book.id;

          return (
            <article
              key={book.id}
              onClick={() => !isLoadingThis && handleReadBook(book)}
              className="notepad-card group cursor-pointer overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md"
            >
              <div>
                <div className="h-52 relative overflow-hidden bg-cream-200 flex items-center justify-center">
                  <img
                    src={coverImage}
                    alt={`Actual Project Gutenberg cover for ${book.title}`}
                    className="w-full h-full object-contain p-2 transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 bg-cream-100/95 backdrop-blur-xs border border-tan-300/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-ink-800 shadow-cozy-sm">
                    eBook #{book.id}
                  </div>
                  <div className="absolute top-3 right-3 bg-amber-600 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
                    Public Domain
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-tan-500 font-sans mb-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      Complete Unabridged
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {book.download_count?.toLocaleString()} reads
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-1 mb-1">
                    {book.title}
                  </h3>

                  <p className="text-xs text-tan-500 font-bold mb-2">
                    By {authorName}
                  </p>

                  <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-3 leading-relaxed mb-4">
                    {book.subjects.slice(0, 3).join(' • ')}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-tan-200 flex items-center justify-between text-xs font-bold text-peach-600">
                <span className="flex items-center gap-1 text-tan-500 font-normal">
                  <Coffee className="w-3.5 h-3.5 text-peach-500" />
                  Gutenberg Archive
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  {isLoadingThis ? (
                    <span className="flex items-center gap-1 text-peach-600 font-bold">
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Opening...
                    </span>
                  ) : (
                    <>
                      <span>Read Unabridged</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
