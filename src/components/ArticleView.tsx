import { useState, useEffect } from 'react';
import type { Article } from '@/data/articles';
import { useSiteContent } from '@/context/SiteContentContext';
import { CommentSection } from './CommentSection';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Copy,
  Check,
  Sparkles,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

interface ArticleViewProps {
  article: Article;
  onBack: () => void;
  onSelectArticle: (article: Article) => void;
  onSelectGame?: (gameId: string) => void;
}

export function ArticleView({
  article,
  onBack,
  onSelectArticle,
  onSelectGame,
}: ArticleViewProps) {
  const { articles } = useSiteContent();
  const [copied, setCopied] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Track reading progress
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const current = (window.scrollY / totalHeight) * 100;
        setScrollProgress(Math.min(100, Math.max(0, current)));
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareTitle = `${article.title} - Jinssi Cozy Journal`;

  const copyShareLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const relatedArticles = articles
    .filter((a) => a.id !== article.id)
    .slice(0, 2);

  return (
    <div className="min-h-screen">
      {/* Top Reading Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-tan-200/50">
        <div
          className="h-full bg-peach-500 transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Back Button */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-sm font-bold text-tan-500 hover:text-ink-900 transition-colors mb-8 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Cozy Journal
        </button>

        {/* Main Article Container */}
        <article className="notepad-card p-6 sm:p-10 lg:p-12 mb-12 animate-fade-in shadow-cozy-lg">
          {/* Category & Read Time Badges */}
          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="px-3 py-1 rounded-full bg-peach-100 text-peach-700 text-xs font-bold tracking-wide">
              {article.category}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-tan-500">
              <Clock className="w-3.5 h-3.5 text-peach-500" />
              <span>{article.readTimeMinutes} min read</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-tan-500">
              <Calendar className="w-3.5 h-3.5 text-earth-500" />
              <span>{article.date}</span>
            </div>
          </div>

          {/* Title & Subtitle */}
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-ink-900 tracking-tight leading-tight sm:leading-snug mb-4">
            {article.title}
          </h1>
          <p className="text-base sm:text-lg text-ink-700 leading-relaxed font-sans mb-8">
            {article.subtitle}
          </p>

          {/* Author & Score Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-cream-50 border border-tan-200 mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-peach-200 flex items-center justify-center text-peach-700 font-bold">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-ink-900">{article.author}</p>
                <p className="text-xs text-tan-500 font-medium">{article.authorRole}</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-bold">
              <div className="bg-cream-200/80 px-3 py-1.5 rounded-xl text-earth-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-peach-500" />
                <span>Cozy Score: {article.cozyScore}/5 🍵</span>
              </div>
              <div className="bg-cream-200/80 px-3 py-1.5 rounded-xl text-sage-600">
                <span>{article.stressLevel}</span>
              </div>
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-cozy-md">
            <img
              src={article.coverImage}
              alt={article.coverAlt}
              className="w-full h-auto max-h-[440px] object-cover"
            />
            {article.coverAlt && (
              <p className="text-xs text-tan-500 p-2.5 bg-cream-50/90 text-center italic border-t border-tan-200/50">
                {article.coverAlt}
              </p>
            )}
          </div>

          {/* Body Sections */}
          <div className="space-y-8 font-sans text-ink-800 leading-relaxed text-base sm:text-lg">
            {article.sections.map((section, idx) => (
              <section key={idx} className="space-y-4">
                {section.heading && (
                  <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900 pt-3 border-b border-tan-200/60 pb-2">
                    {section.heading}
                  </h2>
                )}

                {section.content.map((para, pIdx) => (
                  <p key={pIdx} className="leading-relaxed font-sans text-ink-700">
                    {para}
                  </p>
                ))}

                {section.image && (
                  <div className="my-6 rounded-xl overflow-hidden shadow-cozy-sm border border-tan-200">
                    <img
                      src={section.image}
                      alt={section.imageAlt || 'Illustration'}
                      className="w-full h-auto max-h-96 object-cover"
                      loading="lazy"
                    />
                    {section.imageAlt && (
                      <p className="text-xs text-tan-500 p-2 bg-cream-50 text-center italic">
                        {section.imageAlt}
                      </p>
                    )}
                  </div>
                )}

                {section.callout && (
                  <div className="my-6 p-5 rounded-2xl bg-peach-50/80 border-2 border-dashed border-peach-300 relative">
                    <div className="flex items-center gap-2 text-peach-800 font-bold text-sm mb-1.5">
                      <Sparkles className="w-4 h-4 text-peach-500" />
                      <span>{section.callout.title}</span>
                    </div>
                    <p className="text-sm text-ink-700 font-medium leading-relaxed">
                      {section.callout.text}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Related Walkthrough Link if applicable */}
          {article.relatedGameId && onSelectGame && (
            <div className="mt-12 p-6 rounded-2xl bg-cream-100 border-2 border-tan-200 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-peach-500 text-white rounded-xl shadow-cozy-sm">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-base text-ink-900">
                    Looking for the full walkthrough checklist?
                  </h4>
                  <p className="text-xs text-ink-700">
                    Track your step-by-step progress and unlock every secret.
                  </p>
                </div>
              </div>
              <button
                onClick={() => onSelectGame(article.relatedGameId!)}
                className="px-5 py-2.5 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600 transition-colors whitespace-nowrap"
              >
                Open Walkthrough Guide
              </button>
            </div>
          )}

          {/* Tags & Social Share Section */}
          <div className="mt-12 pt-6 border-t-2 border-tan-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-1.5">
              <Tag className="w-4 h-4 text-tan-400 mr-1" />
              {article.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg bg-cream-200 text-ink-800 text-xs font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-tan-500">Share:</span>
              <button
                onClick={copyShareLink}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cream-200 text-ink-800 text-xs font-bold hover:bg-peach-100 hover:text-peach-700 transition-colors"
                title="Copy link to clipboard"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-sage-600" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Link</span>
                  </>
                )}
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareTitle)}&url=${encodeURIComponent(shareUrl)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded-lg bg-cream-200 text-ink-800 hover:bg-peach-100 hover:text-peach-700 transition-colors"
                title="Share on X / Twitter"
              >
                <Share2 className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </article>

        {/* More Cozy Reads Section */}
        <div className="mb-12">
          <h3 className="font-display text-xl font-bold text-ink-900 mb-6 flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-peach-500" />
            <span>More From The Cozy Journal</span>
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {relatedArticles.map((rel) => (
              <div
                key={rel.id}
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  onSelectArticle(rel);
                }}
                className="notepad-card p-5 cursor-pointer hover:-translate-y-1 transition-all duration-300 group"
              >
                <div className="flex items-center justify-between text-xs text-tan-500 font-semibold mb-2">
                  <span>{rel.category}</span>
                  <span>{rel.readTimeMinutes} min</span>
                </div>
                <h4 className="font-display font-bold text-base text-ink-900 group-hover:text-peach-600 transition-colors mb-2 line-clamp-2">
                  {rel.title}
                </h4>
                <p className="text-xs text-ink-700 line-clamp-2 font-sans mb-3">
                  {rel.subtitle}
                </p>
                <span className="text-xs font-bold text-peach-600 inline-flex items-center gap-1">
                  Read article <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Community Discussion for this Article */}
        <div className="mt-12 pt-8 border-t-2 border-tan-200">
          <CommentSection gameId={`article-${article.id}`} />
        </div>
      </div>
    </div>
  );
}
