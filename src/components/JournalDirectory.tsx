import { useState, useMemo } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { articleCategories, type Article } from '@/data/articles';
import { BookOpen, Clock, Search, Tag, Coffee, ArrowRight } from 'lucide-react';

interface JournalDirectoryProps {
  onSelectArticle: (article: Article) => void;
}

export function JournalDirectory({ onSelectArticle }: JournalDirectoryProps) {
  const { articles } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = useMemo(() => {
    const list = ['All'];
    articleCategories.forEach((c) => {
      if (!list.includes(c)) list.push(c);
    });
    articles.forEach((a) => {
      if (a.category && !list.includes(a.category)) list.push(a.category);
    });
    return list;
  }, [articles]);

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        selectedCategory === 'All' || article.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        article.title.toLowerCase().includes(q) ||
        article.subtitle.toLowerCase().includes(q) ||
        article.tags.some((tag) => tag.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [articles, selectedCategory, searchQuery]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-peach-100 text-peach-700 text-xs font-bold mb-3 shadow-cozy-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Cozy Journal</span>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Stories, Reviews & Cozy Game Guides
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Take a deep breath, grab your favorite warm drink, and discover gentle reads celebrating peaceful, stress-free gaming.
        </p>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-10 space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search cozy articles, reviews, or tags (e.g. Tiny Glade, Organizing)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-50 border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-tan-400 hover:text-ink-900 bg-cream-200 px-2 py-1 rounded-lg"
            >
              Clear
            </button>
          )}
        </div>

        {/* Category Pill Filters */}
        <div className="flex flex-wrap gap-2 justify-center items-center">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm ${
                selectedCategory === category
                  ? 'bg-peach-500 text-white shadow-cozy-md scale-105'
                  : 'bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Grid */}
      {filteredArticles.length === 0 ? (
        <div className="notepad-card p-12 text-center max-w-md mx-auto">
          <p className="text-lg font-bold text-ink-800 mb-2">No cozy reads found</p>
          <p className="text-sm text-tan-500 mb-4">Try adjusting your search terms or selecting another category.</p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSearchQuery('');
            }}
            className="px-4 py-2 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600 transition-colors"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-3">
          {filteredArticles.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article)}
              className="notepad-card group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-cozy-lg"
            >
              <div>
                {/* Article Cover Image */}
                <div className="h-52 sm:h-60 relative overflow-hidden bg-cream-200 rounded-t-xl">
                  <img
                    src={article.coverImage}
                    alt={article.coverAlt}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-90 group-hover:saturate-100"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-lg bg-ink-900/80 backdrop-blur-sm text-cream-50 text-xs font-bold">
                      {article.category}
                    </span>
                  </div>
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-cream-50/90 backdrop-blur-sm text-ink-800 text-xs font-bold shadow-cozy-sm">
                    <Clock className="w-3.5 h-3.5 text-peach-500" />
                    <span>{article.readTimeMinutes} min read</span>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 sm:p-7">
                  <div className="flex items-center gap-2 text-xs font-bold text-tan-500 mb-2.5">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="text-peach-600 font-semibold">{article.author}</span>
                  </div>

                  <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900 group-hover:text-peach-600 transition-colors leading-snug mb-3">
                    {article.title}
                  </h2>

                  <p className="text-sm text-ink-700 leading-relaxed line-clamp-3 mb-4 font-sans">
                    {article.subtitle}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {article.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 text-[11px] font-medium bg-cream-200 text-ink-800 px-2 py-0.5 rounded-md"
                      >
                        <Tag className="w-2.5 h-2.5 text-tan-400" />
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Card Footer: Cozy Score & Read Link */}
              <div className="px-6 sm:px-7 pb-6 pt-3 border-t border-tan-200/60 flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-xs text-earth-700 font-bold">
                  <Coffee className="w-3.5 h-3.5 text-peach-600" />
                  <span>Cozy Rating: {article.cozyScore}/5 🍵</span>
                </div>

                <span className="inline-flex items-center gap-1.5 text-xs font-bold text-peach-600 group-hover:translate-x-1 transition-transform">
                  Read Article
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
