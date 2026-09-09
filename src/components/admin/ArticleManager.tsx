import { useState } from 'react';
import type { Article } from '@/data/articles';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Clock, 
  Coffee, 
  BookOpen, 
  Search, 
  ExternalLink 
} from 'lucide-react';

interface ArticleManagerProps {
  articles: Article[];
  onNewArticle: () => void;
  onEditArticle: (article: Article) => void;
  onDeleteArticle: (articleId: string) => void;
}

export function ArticleManager({
  articles,
  onNewArticle,
  onEditArticle,
  onDeleteArticle,
}: ArticleManagerProps) {
  const [search, setSearch] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const filtered = articles.filter((a) => {
    const q = search.toLowerCase().trim();
    if (!q) return true;
    return (
      a.title.toLowerCase().includes(q) ||
      a.category.toLowerCase().includes(q) ||
      a.tags.some((t) => t.toLowerCase().includes(q))
    );
  });

  const handleDelete = (id: string) => {
    onDeleteArticle(id);
    setDeleteConfirmId(null);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream-50 p-6 rounded-2xl border-2 border-tan-200 shadow-cozy-sm">
        <div>
          <h3 className="font-display font-bold text-xl text-ink-900 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-peach-500" />
            <span>Cozy Journal Articles ({articles.length})</span>
          </h3>
          <p className="text-xs text-tan-600 mt-1 font-medium">
            Publish reviews, curated lists, and cozy guides. All changes automatically sync to readers.
          </p>
        </div>

        <button
          type="button"
          onClick={onNewArticle}
          className="site-button bg-peach-500 text-white hover:bg-peach-600 flex items-center gap-2 text-xs font-bold shadow-cozy-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Write New Article
        </button>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-tan-400" />
        <input
          type="text"
          placeholder="Filter articles by title, category, or tag..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-tan-300 bg-white text-xs text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400"
        />
      </div>

      {/* Articles List */}
      {filtered.length === 0 ? (
        <div className="notepad-card p-12 text-center">
          <BookOpen className="w-10 h-10 text-tan-400 mx-auto mb-3" />
          <p className="font-bold text-ink-900 text-base mb-1">No articles found</p>
          <p className="text-xs text-tan-500 mb-4">
            {search ? 'Try clearing your search query.' : 'Write your first cozy article to share with your community!'}
          </p>
          <button
            type="button"
            onClick={onNewArticle}
            className="px-4 py-2 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600"
          >
            Write First Article
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((article) => (
            <div
              key={article.id}
              className="notepad-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-cozy-sm hover:shadow-cozy-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <img
                  src={article.coverImage}
                  alt={article.coverAlt}
                  className="w-20 h-20 rounded-xl object-cover border border-tan-200 shrink-0 bg-cream-200"
                />
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-peach-100 text-peach-700 text-[11px] font-bold">
                      {article.category}
                    </span>
                    <span className="text-[11px] font-semibold text-tan-500 flex items-center gap-1">
                      <Clock size={11} className="text-peach-500" />
                      {article.readTimeMinutes} min
                    </span>
                    <span className="text-[11px] font-semibold text-earth-600 flex items-center gap-1">
                      <Coffee size={11} className="text-peach-600" />
                      {article.cozyScore}/5 🍵
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-base text-ink-900 leading-snug">
                    {article.title}
                  </h4>

                  <p className="text-xs text-ink-600 line-clamp-1 font-sans">
                    {article.subtitle}
                  </p>

                  <div className="text-[11px] text-tan-400 font-medium">
                    Published: {article.date} • by {article.author}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2 shrink-0 self-end sm:self-center border-t sm:border-t-0 pt-3 sm:pt-0 w-full sm:w-auto justify-end">
                <a
                  href={`/journal/${article.slug}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-xl bg-cream-100 hover:bg-cream-200 text-tan-600 hover:text-ink-900 transition-colors"
                  title="View live article in new tab"
                >
                  <ExternalLink size={16} />
                </a>

                <button
                  type="button"
                  onClick={() => onEditArticle(article)}
                  className="px-3.5 py-2 rounded-xl bg-cream-200 hover:bg-peach-100 text-ink-900 hover:text-peach-700 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-cozy-xs"
                >
                  <Edit2 size={14} /> Edit
                </button>

                {deleteConfirmId === article.id ? (
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleDelete(article.id)}
                      className="px-3 py-1.5 bg-red-600 text-white font-bold text-xs rounded-xl hover:bg-red-700 transition-colors"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(null)}
                      className="px-2 py-1.5 text-xs font-bold text-tan-500 hover:text-ink-900"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(article.id)}
                    className="p-2 rounded-xl text-tan-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                    title="Delete article"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
