import { useSiteContent } from '@/context/SiteContentContext';
import type { Article } from '@/data/articles';
import { BookOpen, Clock, ArrowRight, Sparkles } from 'lucide-react';

interface HomeJournalSectionProps {
  onSelectArticle: (article: Article) => void;
  onNavigateToJournal: () => void;
}

export function HomeJournalSection({
  onSelectArticle,
  onNavigateToJournal,
}: HomeJournalSectionProps) {
  const { articles } = useSiteContent();
  // Show top 3 featured articles on the homepage
  const featuredArticles = articles.slice(0, 3);

  if (featuredArticles.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t-2 border-tan-200/70">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-2 shadow-cozy-sm">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Cozy Tea Time Reads</span>
          </div>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-ink-900 tracking-tight">
            Fresh From The Cozy Journal
          </h2>
          <p className="text-sm text-ink-700 font-sans mt-1">
            Gentle essays, indie reviews, and secret game guides to enjoy while relaxing.
          </p>
        </div>

        <button
          onClick={onNavigateToJournal}
          className="inline-flex items-center gap-2 text-xs font-bold text-peach-600 hover:text-peach-700 transition-colors bg-cream-100 hover:bg-cream-200 border border-tan-200 px-4 py-2 rounded-xl shadow-cozy-sm self-start sm:self-auto"
        >
          <BookOpen className="w-4 h-4" />
          <span>Explore All Articles</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>

      {/* Featured 3 Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {featuredArticles.map((article) => (
          <article
            key={article.id}
            onClick={() => onSelectArticle(article)}
            className="notepad-card group cursor-pointer overflow-hidden flex flex-col justify-between hover:-translate-y-1 transition-all duration-300 shadow-cozy-md"
          >
            <div>
              <div className="h-44 relative overflow-hidden bg-cream-200">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-90 group-hover:saturate-100"
                  loading="lazy"
                />
                <span className="absolute top-2.5 left-2.5 px-2 py-0.5 rounded-md bg-ink-900/80 backdrop-blur-sm text-cream-50 text-[11px] font-bold">
                  {article.category}
                </span>
                <span className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-cream-50/90 backdrop-blur-sm text-ink-800 text-[11px] font-bold shadow-cozy-sm">
                  <Clock className="w-3 h-3 text-peach-500" />
                  {article.readTimeMinutes} min
                </span>
              </div>

              <div className="p-5">
                <h3 className="font-display font-bold text-lg text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-2 leading-snug mb-2">
                  {article.title}
                </h3>
                <p className="text-xs text-ink-700 line-clamp-2 font-sans leading-relaxed">
                  {article.subtitle}
                </p>
              </div>
            </div>

            <div className="px-5 pb-4 pt-2 border-t border-tan-200/50 flex items-center justify-between text-xs font-bold text-peach-600">
              <span className="text-tan-500 text-[11px] font-semibold">{article.date}</span>
              <span className="inline-flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                Read More
                <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
