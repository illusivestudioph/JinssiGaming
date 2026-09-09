import { useSiteContent } from '@/context/SiteContentContext';
import type { Story } from '@/data/stories';
import { BookOpen, Clock, ArrowRight, BookMarked, Coffee } from 'lucide-react';

interface HomeBookshelfSectionProps {
  onSelectStory: (story: Story, chapterNumber?: number) => void;
  onNavigateToBookshelf: () => void;
}

export function HomeBookshelfSection({
  onSelectStory,
  onNavigateToBookshelf,
}: HomeBookshelfSectionProps) {
  const { stories } = useSiteContent();
  const featuredStories = stories.slice(0, 3);

  if (featuredStories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-tan-200/70">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-2 shadow-cozy-sm">
            <BookMarked className="w-3.5 h-3.5 text-peach-600" />
            <span>Cozy Bookshelf & E-Books</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
            Bedtime Stories & Cozy Web-Novels
          </h2>
          <p className="text-sm text-ink-700 font-sans mt-1">
            Wattpad-style serialized fiction, gentle game lore, and slice-of-life chapters designed for relaxing reading.
          </p>
        </div>

        <button
          onClick={onNavigateToBookshelf}
          className="inline-flex items-center gap-2 text-xs font-bold text-peach-600 hover:text-peach-700 transition-colors bg-cream-100 hover:bg-cream-200 border border-tan-200 px-4 py-2 rounded-xl shadow-cozy-sm self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Browse All Stories</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured Stories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredStories.map((story) => {
          const totalWords = story.chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
          const totalMinutes = story.chapters.reduce((sum, ch) => sum + ch.readTimeMinutes, 0);

          return (
            <article
              key={story.id}
              onClick={() => onSelectStory(story, 1)}
              className="notepad-card group cursor-pointer overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md"
            >
              <div>
                <div className="h-44 relative overflow-hidden bg-cream-200">
                  <img
                    src={story.coverImage}
                    alt={story.coverAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-90 group-hover:saturate-100"
                  />
                  <div className="absolute top-3 left-3 bg-cream-100/90 backdrop-blur-xs border border-tan-300/80 px-2.5 py-0.5 rounded-full text-[11px] font-bold text-ink-800 shadow-cozy-sm">
                    {story.genre}
                  </div>
                  <div className="absolute top-3 right-3 bg-earth-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-cozy-sm">
                    {story.status}
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex items-center gap-3 text-xs text-tan-500 font-sans mb-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      {story.chapters.length} Chapters
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      ~{totalMinutes} min total
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-base sm:text-lg text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-1 mb-2">
                    {story.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-ink-700 font-sans line-clamp-3 leading-relaxed mb-4">
                    {story.synopsis}
                  </p>
                </div>
              </div>

              <div className="px-5 pb-5 pt-2 border-t border-tan-200 flex items-center justify-between text-xs font-bold text-peach-600">
                <span className="flex items-center gap-1 text-tan-500 font-normal">
                  <Coffee className="w-3.5 h-3.5 text-peach-500" />
                  By {story.author}
                </span>
                <div className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                  <span>Read Chapter 1</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
