import { useState, useMemo, useEffect } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { articleCategories, type Article } from '@/data/articles';
import { BookOpen, Clock, Search, Tag, Coffee, ArrowRight, ExternalLink, Sparkles, RefreshCw } from '@/components/StreamlineIcons';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';
import { LiveGameSearchModal } from '@/components/LiveGameSearchModal';
import { syncLiveJournalFeed } from '@/services/liveJournalFeed';

interface JournalDirectoryProps {
  onSelectArticle: (article: Article) => void;
}

export function JournalDirectory({ onSelectArticle }: JournalDirectoryProps) {
  const { articles, setArticles } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [timeLeft, setTimeLeft] = useState<string>('');

  // Calculate 24-hr lifespan countdown
  useEffect(() => {
    const updateCountdown = () => {
      const activeArticle = articles.find((a) => typeof a.expiresAt === 'number');
      if (!activeArticle || !activeArticle.expiresAt) {
        setTimeLeft('24h cycle active');
        return;
      }
      const diff = activeArticle.expiresAt - Date.now();
      if (diff <= 0) {
        setTimeLeft('Auto-refreshing...');
      } else {
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setTimeLeft(`Next refresh in ${hours}h ${minutes}m`);
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 60000);
    return () => clearInterval(interval);
  }, [articles]);

  const handleManualSync = async () => {
    setIsRefreshing(true);
    try {
      await syncLiveJournalFeed(articles, (fresh) => {
        setArticles(fresh);
      }, true);
    } finally {
      setIsRefreshing(false);
    }
  };

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
      {/* Live Game Search Modal */}
      <LiveGameSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />

      {/* Header Banner */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <div className="library-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-cozy-sm">
          <BookOpen className="w-3.5 h-3.5" />
          <span>The Cozy Journal</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Stories, Reviews & Cozy Game Guides
        </h1>

        <p className="text-base text-ink-700 leading-relaxed font-sans mb-4">
          Take a deep breath, grab your favorite warm drink, and discover gentle reads celebrating peaceful, stress-free gaming.
        </p>

        {/* 24-Hour Rotating Lifespan Badge & Live Tools */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 pt-1">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cream-100 border border-tan-300 text-xs font-bold text-earth-800 shadow-cozy-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>24h Live Feed • {timeLeft}</span>
          </div>

          <button
            onClick={() => setIsSearchModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold transition-all shadow-cozy-xs hover:scale-105"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Search Any Game Live</span>
          </button>

          <button
            onClick={handleManualSync}
            disabled={isRefreshing}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-full bg-cream-200 hover:bg-cream-300 text-tan-600 text-xs font-semibold transition-colors disabled:opacity-50"
            title="Refresh latest Steam announcements"
          >
            <RefreshCw className={`w-3 h-3 ${isRefreshing ? 'animate-spin' : ''}`} />
            <span>{isRefreshing ? 'Syncing...' : 'Sync Now'}</span>
          </button>
        </div>
      </div>

      {/* Search & Filter Controls */}
      <div className="mb-10 space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search cozy articles, reviews, or tags (e.g. Tiny Glade, Fields of Mistria)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bookshelf-search-input w-full pl-12 pr-4 py-3 rounded-2xl bg-cream-50 border-2 border-tan-200 text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400 transition-colors shadow-cozy-sm"
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
              className={`category-filter-pill px-4 py-1.5 rounded-xl text-xs font-bold transition-all shadow-cozy-sm ${
                selectedCategory === category
                  ? 'category-filter-active bg-peach-500 text-white shadow-cozy-md scale-105'
                  : 'category-filter-inactive bg-cream-100 text-tan-600 hover:bg-cream-200 hover:text-ink-900 border border-tan-200'
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
              className="notepad-card group cursor-pointer flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-cozy-lg rounded-2xl overflow-hidden"
            >
              <div>
                {/* Article Cover Image with 16:9 aspect and robust fallback */}
                <div className="w-full h-52 sm:h-60 relative overflow-hidden bg-cream-200">
                  <img
                    src={getOptimizedImageUrl(article.coverImage, { width: 800, quality: 80, format: 'webp' })}
                    alt={article.coverAlt || article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 filter saturate-95 group-hover:saturate-100"
                    loading="lazy"
                    decoding="async"
                    onError={(e) => {
                      const target = e.currentTarget as HTMLImageElement;
                      if (!target.dataset.triedFallback) {
                        target.dataset.triedFallback = 'true';
                        target.src = 'https://shared.fastly.steamstatic.com/store_item_assets/steam/apps/2142790/header.jpg';
                      }
                    }}
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

                  {/* Quick Action Game Link & Source Link Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {article.steamLink && (
                      <a
                        href={article.steamLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-ink-900 hover:bg-ink-800 text-cream-50 text-[11px] font-bold shadow-cozy-xs transition-colors"
                      >
                        <ExternalLink size={11} className="text-peach-400" />
                        <span>Steam Page</span>
                      </a>
                    )}
                    {article.sourceLink && (
                      <a
                        href={article.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-earth-500 hover:bg-earth-600 text-cream-50 text-[11px] font-bold shadow-cozy-xs transition-colors"
                      >
                        <ExternalLink size={11} className="text-cream-200" />
                        <span>Source Link</span>
                      </a>
                    )}
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
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
                  Read Full Story
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
