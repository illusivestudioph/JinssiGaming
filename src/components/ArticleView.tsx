import { useState, useEffect } from 'react';
import type { Article, ArticleImage } from '@/data/articles';
import { useSiteContent } from '@/context/SiteContentContext';
import { CommentSection } from './CommentSection';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';
import {
  ArrowLeft,
  Clock,
  Calendar,
  User,
  Tag,
  Share2,
  Copy,
  Check,
  Coffee,
  Bookmark,
  BookOpen,
  ArrowRight,
  ExternalLink,
} from '@/components/StreamlineIcons';

interface PhotoCarouselProps {
  images: ArticleImage[];
  onZoom: (img: ArticleImage) => void;
}

function PhotoCarousel({ images, onZoom }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images || images.length === 0) return null;

  const currentImg = images[currentIndex] || images[0];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="photo-carousel my-8 rounded-2xl overflow-hidden border-2 border-tan-300 bg-ink-950 shadow-cozy-md">

      {/* Main Viewport */}
      <div className="relative aspect-[16/10] sm:aspect-[16/9] bg-ink-950 flex items-center justify-center overflow-hidden group">
        <img
          src={getOptimizedImageUrl(currentImg.url, { width: 1200, quality: 85, format: 'webp' })}
          alt={currentImg.alt || currentImg.angle || 'Hardware angle'}
          className="w-full h-full object-contain cursor-zoom-in transition-all duration-300"
          onClick={() => onZoom(currentImg)}
        />

        {/* Angle Badge Overlay */}
        {currentImg.angle && (
          <div className="absolute top-3 left-3 z-10 pointer-events-none">
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-ink-900/90 text-white backdrop-blur-md shadow-cozy-sm border border-white/10">
              {currentImg.angle}
            </span>
          </div>
        )}

        {/* Zoom Hint */}
        <div
          onClick={() => onZoom(currentImg)}
          className="absolute top-3 right-3 z-10 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <span className="px-2.5 py-1 rounded-full bg-white/90 text-ink-900 text-[11px] font-bold shadow-cozy-sm">
            🔍 Click to zoom
          </span>
        </div>

        {/* Floating Slide Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 z-10 pointer-events-none">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-mono font-bold bg-ink-900/80 text-white backdrop-blur-xs shadow-cozy-sm border border-white/10">
              {currentIndex + 1} / {images.length}
            </span>
          </div>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={handlePrev}
              aria-label="Previous angle"
              className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-900/80 hover:bg-peach-500 text-white flex items-center justify-center transition-all shadow-cozy-md backdrop-blur-xs hover:scale-110 active:scale-95"
            >
              <ArrowLeft size={18} />
            </button>
            <button
              onClick={handleNext}
              aria-label="Next angle"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-ink-900/80 hover:bg-peach-500 text-white flex items-center justify-center transition-all shadow-cozy-md backdrop-blur-xs hover:scale-110 active:scale-95"
            >
              <ArrowRight size={18} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnails Strip */}
      {images.length > 1 && (
        <div className="p-3 bg-ink-900 flex items-center gap-2 overflow-x-auto scrollbar-thin border-t border-ink-800">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`relative shrink-0 w-20 sm:w-24 aspect-[16/10] rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex
                  ? 'border-peach-500 scale-105 shadow-cozy-sm ring-2 ring-peach-400'
                  : 'border-ink-700 opacity-60 hover:opacity-100 hover:border-ink-500'
              }`}
            >
              <img
                src={getOptimizedImageUrl(img.url, { width: 160, quality: 70, format: 'webp' })}
                alt={img.angle || `Thumbnail ${idx + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              {img.angle && (
                <div className="absolute inset-x-0 bottom-0 bg-ink-950/85 text-[8px] sm:text-[9px] text-cream-100 font-semibold truncate px-1 text-center py-0.5">
                  {img.angle}
                </div>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

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
  const [lightboxImage, setLightboxImage] = useState<ArticleImage | null>(null);

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

  // Google SEO Meta & Schema.org JSON-LD Injection for High Google Search Ranking
  useEffect(() => {
    const prevTitle = document.title;
    document.title = `${article.title} | Jinssi Gaming`;

    let metaDesc = document.querySelector('meta[name="description"]') as HTMLMetaElement;
    if (!metaDesc) {
      metaDesc = document.createElement('meta');
      metaDesc.name = 'description';
      document.head.appendChild(metaDesc);
    }
    const prevDesc = metaDesc.content;
    metaDesc.content = article.subtitle || article.summary;

    const jsonLdScript = document.createElement('script');
    jsonLdScript.type = 'application/ld+json';
    jsonLdScript.id = 'article-json-ld';
    jsonLdScript.text = JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'TechArticle',
      headline: article.title,
      description: article.subtitle || article.summary,
      image: article.coverImage,
      datePublished: new Date(article.createdAt || Date.now()).toISOString(),
      dateModified: new Date().toISOString(),
      author: {
        '@type': 'Person',
        name: article.author || 'Jinssi Tech Desk',
      },
      publisher: {
        '@type': 'Organization',
        name: 'Jinssi Gaming',
        url: 'https://jinssicruise.space',
      },
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': typeof window !== 'undefined' ? window.location.href : 'https://jinssicruise.space',
      },
    });
    document.head.appendChild(jsonLdScript);

    return () => {
      document.title = prevTitle;
      if (metaDesc) metaDesc.content = prevDesc;
      const existingScript = document.getElementById('article-json-ld');
      if (existingScript) existingScript.remove();
    };
  }, [article]);

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
              <span>{article.readTimeMinutes || 6} min read</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs font-semibold text-tan-500">
              <Calendar className="w-3.5 h-3.5 text-earth-500" />
              <span>{article.date || (article as any).publishedAt || 'Recent'}</span>
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
                <Coffee className="w-3.5 h-3.5 text-peach-600" />
                <span>Cozy Score: {article.cozyScore || 5}/5 🍵</span>
              </div>
              <div className="bg-cream-200/80 px-3 py-1.5 rounded-xl text-sage-600">
                <span>{article.stressLevel || 'Zero Stress'}</span>
              </div>
              {article.steamLink && (
                <a
                  href={article.steamLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink-900 hover:bg-ink-800 text-cream-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-cozy-xs"
                >
                  <ExternalLink size={13} className="text-peach-400" />
                  <span>Steam Store</span>
                </a>
              )}
              {article.sourceLink && (
                <a
                  href={article.sourceLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-earth-600 hover:bg-earth-700 text-cream-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-cozy-xs"
                >
                  <ExternalLink size={13} className="text-cream-200" />
                  <span>
                    {article.sourceLink.includes('amazon.com')
                      ? 'View on Amazon'
                      : article.sourceLink.includes('steampowered.com')
                      ? 'Steam Store'
                      : 'Source Article'}
                  </span>
                </a>
              )}
              {article.playStoreLink && (
                <a
                  href={article.playStoreLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-800 hover:bg-emerald-700 text-cream-50 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition-colors shadow-cozy-xs"
                >
                  <ExternalLink size={13} className="text-emerald-300" />
                  <span>Google Play</span>
                </a>
              )}
            </div>
          </div>

          {/* Featured Cover Image */}
          <div className="relative rounded-2xl overflow-hidden mb-10 shadow-cozy-md bg-cream-200">
            <img
              src={getOptimizedImageUrl(article.coverImage, { width: 1200, quality: 80, format: 'webp' })}
              alt={article.coverAlt}
              className="w-full h-auto max-h-[460px] object-cover"
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
            {article.coverAlt && (
              <p className="text-xs text-tan-500 p-2.5 bg-cream-50/90 text-center italic border-t border-tan-200/50">
                {article.coverAlt}
              </p>
            )}
          </div>

          {/* Body Sections - Rich GSMArena-Style Architecture */}
          <div className="space-y-12 font-sans text-ink-800 leading-relaxed text-base sm:text-lg">
            {article.sections.map((section, idx) => {
              // Helper to parse markdown links [label](url), bold **text**, and bullet items
              const renderFormattedParagraph = (text: string, isFirstPara: boolean) => {
                const isBullet = text.trim().startsWith('•') || text.trim().startsWith('-');
                const cleanText = isBullet ? text.trim().replace(/^[•-]\s*/, '') : text;

                const parts: React.ReactNode[] = [];
                const linkRegex = /\[(.*?)\]\((https?:\/\/.*?)\)/g;
                let lastIndex = 0;
                let match;

                while ((match = linkRegex.exec(cleanText)) !== null) {
                  if (match.index > lastIndex) {
                    parts.push(cleanText.substring(lastIndex, match.index));
                  }
                  const label = match[1];
                  const url = match[2];
                  parts.push(
                    <a
                      key={`link-${match.index}`}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-peach-600 hover:text-peach-700 underline font-semibold transition-colors inline-flex items-center gap-0.5"
                    >
                      <span>{label}</span>
                      <ExternalLink size={11} className="inline-block" />
                    </a>
                  );
                  lastIndex = linkRegex.lastIndex;
                }

                if (lastIndex < cleanText.length) {
                  parts.push(cleanText.substring(lastIndex));
                }

                if (isBullet) {
                  return (
                    <li className="flex items-start gap-2.5 text-ink-800 leading-relaxed font-sans text-base sm:text-lg">
                      <span className="w-1.5 h-1.5 rounded-full bg-peach-500 mt-2.5 shrink-0" />
                      <span className="flex-1">{parts}</span>
                    </li>
                  );
                }

                return (
                  <p
                    className={`leading-relaxed font-sans text-ink-800 ${
                      isFirstPara
                        ? 'text-lg sm:text-xl font-medium text-ink-900 first-letter:text-4xl first-letter:font-bold first-letter:font-display first-letter:text-peach-600 first-letter:float-left first-letter:mr-2 first-letter:leading-none'
                        : ''
                    }`}
                  >
                    {parts}
                  </p>
                );
              };

              return (
                <section key={idx} className="space-y-4">
                  {section.heading && (
                    <h2 className="font-display text-xl sm:text-2xl font-bold text-ink-900 pt-4 border-b border-tan-200/60 pb-2.5">
                      {section.heading}
                    </h2>
                  )}

                  {/* Paragraph Content & Bullet Parsing */}
                  <div className="space-y-3">
                    {section.content.map((para, pIdx) => (
                      <div key={pIdx}>
                        {renderFormattedParagraph(para, idx === 0 && pIdx === 0)}
                      </div>
                    ))}
                  </div>

                  {/* GSMArena-Style Spec Sheet Table */}
                  {section.specSheet && section.specSheet.length > 0 && (
                    <div className="gsm-spec-sheet my-8 rounded-2xl overflow-hidden border-2 border-tan-300 bg-white shadow-cozy-sm">
                      <div className="bg-ink-900 text-cream-50 px-5 py-3 flex items-center justify-between">
                        <span className="font-display font-bold text-xs sm:text-sm tracking-wide uppercase flex items-center gap-2">
                          📊 Technical Specifications Sheet (Lab Verified)
                        </span>
                        <span className="text-[11px] text-peach-300 font-mono">Jinssi Hardware DB</span>
                      </div>
                      <div className="divide-y divide-tan-200">
                        {section.specSheet.map((cat, cIdx) => (
                          <div key={cIdx} className="grid grid-cols-1 md:grid-cols-4 bg-cream-50/40">
                            <div className="p-3.5 md:border-r border-tan-200 bg-cream-100/70 font-display font-bold text-xs uppercase tracking-wider text-earth-800 flex items-center">
                              {cat.category}
                            </div>
                            <div className="col-span-3 p-0 divide-y divide-tan-100">
                              {cat.specs.map((item, sIdx) => (
                                <div
                                  key={sIdx}
                                  className="grid grid-cols-3 sm:grid-cols-4 p-2.5 text-xs sm:text-sm hover:bg-cream-100/50 transition-colors"
                                >
                                  <span className="font-semibold text-tan-600 col-span-1">{item.label}</span>
                                  <span className="font-medium text-ink-900 col-span-2 sm:col-span-3">
                                    {item.value}
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* GSMArena-Style Pros & Cons Comparison */}
                  {((section.pros && section.pros.length > 0) || (section.cons && section.cons.length > 0)) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-8">
                      {section.pros && section.pros.length > 0 && (
                        <div className="p-5 rounded-2xl bg-emerald-50/90 border-2 border-emerald-300 shadow-cozy-xs space-y-3">
                          <div className="flex items-center gap-2 text-emerald-800 font-display font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                            <span className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center text-xs font-bold">
                              ✓
                            </span>
                            <span>PROS / ADVANTAGES</span>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-emerald-950 font-medium">
                            {section.pros.map((pro, pIdx) => (
                              <li key={pIdx} className="flex items-start gap-2">
                                <span className="text-emerald-600 font-bold mt-0.5">•</span>
                                <span>{pro}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {section.cons && section.cons.length > 0 && (
                        <div className="p-5 rounded-2xl bg-rose-50/90 border-2 border-rose-300 shadow-cozy-xs space-y-3">
                          <div className="flex items-center gap-2 text-rose-800 font-display font-extrabold text-xs sm:text-sm tracking-wide uppercase">
                            <span className="w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs font-bold">
                              ✕
                            </span>
                            <span>CONS / COMPROMISES</span>
                          </div>
                          <ul className="space-y-2 text-xs sm:text-sm text-rose-950 font-medium">
                            {section.cons.map((con, cIdx) => (
                              <li key={cIdx} className="flex items-start gap-2">
                                <span className="text-rose-600 font-bold mt-0.5">•</span>
                                <span>{con}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* GSMArena-Style Side-by-Side Comparison Table Matrix */}
                  {section.comparisonTable && (
                    <div className="my-8 rounded-2xl border-2 border-tan-300 overflow-hidden bg-white shadow-cozy-sm">
                      <div className="bg-earth-900 text-white px-5 py-3 flex items-center justify-between">
                        <span className="font-display font-bold text-xs sm:text-sm tracking-wide uppercase">
                          ⚔️ Side-by-Side Lab Comparison Matrix
                        </span>
                        <span className="text-xs text-cream-200">Scroll horizontally ➔</span>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse text-xs sm:text-sm">
                          <thead>
                            <tr className="bg-cream-100 border-b border-tan-300">
                              {section.comparisonTable.headers.map((h, hIdx) => {
                                const isHighlight = hIdx === (section.comparisonTable?.highlightColIndex ?? 1);
                                return (
                                  <th
                                    key={hIdx}
                                    className={`p-3.5 font-display font-bold text-ink-900 ${
                                      isHighlight
                                        ? 'bg-peach-100 text-peach-900 border-x-2 border-peach-400'
                                        : ''
                                    }`}
                                  >
                                    {h}
                                    {isHighlight && (
                                      <span className="block text-[10px] uppercase font-sans text-peach-700 tracking-wider font-extrabold mt-0.5">
                                        ★ Top Pick
                                      </span>
                                    )}
                                  </th>
                                );
                              })}
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-tan-200">
                            {section.comparisonTable.rows.map((row, rIdx) => (
                              <tr
                                key={rIdx}
                                className={
                                  rIdx % 2 === 0
                                    ? 'bg-white'
                                    : 'bg-cream-50/60 hover:bg-cream-100/50 transition-colors'
                                }
                              >
                                {row.map((cell, cIdx) => {
                                  const isHighlight = cIdx === (section.comparisonTable?.highlightColIndex ?? 1);
                                  return (
                                    <td
                                      key={cIdx}
                                      className={`p-3.5 ${
                                        cIdx === 0
                                          ? 'font-bold text-tan-700 bg-cream-100/40'
                                          : 'text-ink-800 font-medium'
                                      } ${
                                        isHighlight
                                          ? 'bg-peach-50/50 font-semibold text-ink-950 border-x-2 border-peach-300'
                                          : ''
                                      }`}
                                    >
                                      {cell}
                                    </td>
                                  );
                                })}
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* PC Build Interactive Parts List with Direct Retailer Links */}
                  {section.buildParts && section.buildParts.length > 0 && (
                    <div className="pc-build-card my-8 rounded-2xl overflow-hidden border-2 border-tan-300 bg-white shadow-cozy-sm">
                      <div className="bg-ink-900 text-cream-50 px-5 py-3.5 flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-2.5">
                          <span className="text-xl">🖥️</span>
                          <div>
                            <h3 className="font-display font-bold text-sm sm:text-base text-cream-50 uppercase tracking-wide">
                              Component Selection & Verified Pricing
                            </h3>
                            <p className="text-[11px] text-tan-400">
                              Real part photos, live specs & direct merchant buy links
                            </p>
                          </div>
                        </div>
                        {section.totalBuildCost && (
                          <div className="px-3.5 py-1.5 rounded-xl bg-peach-500 text-white font-display font-extrabold text-sm sm:text-base shadow-cozy-xs">
                            Total Build: {section.totalBuildCost}
                          </div>
                        )}
                      </div>

                      <div className="divide-y divide-tan-200">
                        {section.buildParts.map((part, pIdx) => {
                          const isAmazon = part.merchant?.toLowerCase().includes('amazon');
                          const isEbay = part.merchant?.toLowerCase().includes('ebay');
                          const isNewegg = part.merchant?.toLowerCase().includes('newegg');

                          return (
                            <div
                              key={pIdx}
                              className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-cream-50/70 transition-colors"
                            >
                              {/* Left: Part Image + Category + Name */}
                              <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div
                                  onClick={() =>
                                    setLightboxImage({
                                      url: part.imageUrl,
                                      caption: `${part.category}: ${part.name}`,
                                      alt: part.name,
                                      angle: part.category,
                                    })
                                  }
                                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl overflow-hidden bg-cream-100 border border-tan-300 shrink-0 cursor-zoom-in relative group"
                                >
                                  <img
                                    src={part.imageUrl}
                                    alt={part.name}
                                    className="w-full h-full object-contain p-1 group-hover:scale-105 transition-transform"
                                    loading="lazy"
                                    onError={(e) => {
                                      const target = e.currentTarget as HTMLImageElement;
                                      target.src = 'https://images.unsplash.com/photo-1591799264318-7e6ef8ddb7ea?w=300&q=80';
                                    }}
                                  />
                                  <div className="absolute inset-0 bg-ink-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>

                                <div className="min-w-0 flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="px-2 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider bg-earth-100 text-earth-800 border border-earth-200">
                                      {part.category}
                                    </span>
                                    {part.specs && (
                                      <span className="text-[11px] text-tan-600 font-mono hidden sm:inline-block truncate">
                                        {part.specs}
                                      </span>
                                    )}
                                  </div>
                                  <h4 className="font-display font-bold text-sm sm:text-base text-ink-900 truncate">
                                    {part.name}
                                  </h4>
                                  {part.notes && (
                                    <p className="text-xs text-tan-600 mt-0.5 line-clamp-1">
                                      {part.notes}
                                    </p>
                                  )}
                                  {part.specs && (
                                    <span className="text-[11px] text-tan-600 font-mono sm:hidden block mt-0.5">
                                      {part.specs}
                                    </span>
                                  )}
                                </div>
                              </div>

                              {/* Right: Price + Merchant Buy Button */}
                              <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-tan-200">
                                <div className="text-left sm:text-right">
                                  <div className="font-display font-extrabold text-base sm:text-lg text-ink-950">
                                    {part.price}
                                  </div>
                                  <div className="text-[10px] uppercase font-bold tracking-wider text-tan-500">
                                    via {part.merchant || 'Retailer'}
                                  </div>
                                </div>

                                <a
                                  href={part.buyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-cozy-xs hover:scale-105 active:scale-95 ${
                                    isAmazon
                                      ? 'bg-amber-500 hover:bg-amber-600 text-ink-950'
                                      : isEbay
                                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                      : isNewegg
                                      ? 'bg-orange-600 hover:bg-orange-700 text-white'
                                      : 'bg-peach-500 hover:bg-peach-600 text-white'
                                  }`}
                                >
                                  <span>{isAmazon ? 'Amazon' : isEbay ? 'eBay' : isNewegg ? 'Newegg' : 'Buy Now'}</span>
                                  <ExternalLink size={12} />
                                </a>
                              </div>
                            </div>
                          );
                        })}
                      </div>

                      {section.totalBuildCost && (
                        <div className="bg-cream-100 p-4 border-t border-tan-300 flex flex-wrap items-center justify-between gap-3 text-xs sm:text-sm">
                          <span className="text-ink-700 font-medium">
                            💡 All links point directly to current in-stock listings with the lowest verified retail price.
                          </span>
                          <span className="font-bold text-ink-900">
                            Estimated Total: <span className="text-peach-600 text-base">{section.totalBuildCost}</span>
                          </span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Multi-Angle Hardware / Image Carousel for this Section */}
                  {section.gallery && section.gallery.length > 0 && (
                    <PhotoCarousel
                      images={section.gallery}
                      onZoom={(img) => setLightboxImage(img)}
                    />
                  )}

                  {/* Section Single Image Box */}
                  {section.image && (!section.gallery || section.gallery.length === 0) && (
                    <div
                      onClick={() => setLightboxImage({ url: section.image!, alt: section.imageAlt, caption: section.imageAlt, angle: 'Photo' })}
                      className="section-image-box my-6 rounded-2xl overflow-hidden shadow-cozy-sm border border-tan-200 bg-cream-200 group cursor-zoom-in relative"
                    >
                      <img
                        src={getOptimizedImageUrl(section.image, { width: 900, quality: 80, format: 'webp' })}
                        alt={section.imageAlt || 'Illustration'}
                        className="w-full h-auto max-h-[440px] object-cover transition-transform duration-300 group-hover:scale-[1.01]"
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                          const target = e.currentTarget as HTMLImageElement;
                          if (!target.dataset.triedFallback && article.coverImage && target.src !== article.coverImage) {
                            target.dataset.triedFallback = 'true';
                            target.src = article.coverImage;
                          } else {
                            const box = target.closest('.section-image-box') as HTMLElement;
                            if (box) box.style.display = 'none';
                          }
                        }}
                      />
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <span className="px-2.5 py-1 rounded-full bg-ink-900/85 text-cream-50 text-[10px] font-bold shadow-cozy-sm backdrop-blur-xs">
                          🔍 Click to zoom
                        </span>
                      </div>
                      {section.imageAlt && (
                        <p className="text-xs text-tan-600 p-2.5 bg-cream-50 text-center italic border-t border-tan-200/50">
                          {section.imageAlt}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Structured Multi-Source Cards */}
                  {section.sourcesList && section.sourcesList.length > 0 && (
                    <div className="my-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {section.sourcesList.map((src, sIdx) => (
                        <a
                          key={sIdx}
                          href={src.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-4 rounded-xl bg-cream-50/80 border border-tan-300 hover:border-peach-400 hover:shadow-cozy-sm transition-all group flex flex-col justify-between"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-cream-200 text-earth-800">
                                {src.publisher}
                              </span>
                              <ExternalLink size={13} className="text-tan-400 group-hover:text-peach-600 transition-colors" />
                            </div>
                            <h4 className="font-display font-bold text-xs sm:text-sm text-ink-900 group-hover:text-peach-600 transition-colors line-clamp-2">
                              {src.title}
                            </h4>
                            {src.note && (
                              <p className="text-[11px] text-tan-500 mt-1 line-clamp-1">{src.note}</p>
                            )}
                          </div>
                          <span className="text-[11px] font-bold text-peach-600 mt-2 inline-flex items-center gap-1">
                            Read original report &rarr;
                          </span>
                        </a>
                      ))}
                    </div>
                  )}

                  {/* Section Links */}
                  <div className="pt-2 pb-2 flex flex-wrap items-center gap-3">
                    {section.steamLink && (
                      <a
                        href={section.steamLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-ink-900 hover:bg-ink-800 text-cream-50 text-xs font-bold transition-all hover:scale-[1.02] shadow-cozy-xs"
                      >
                        <ExternalLink size={13} className="text-peach-400" />
                        <span>View on Steam Store</span>
                      </a>
                    )}

                    {section.sourceLink && (
                      <a
                        href={section.sourceLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-earth-500 hover:bg-earth-600 text-cream-50 text-xs font-bold transition-all hover:scale-[1.02] shadow-cozy-xs"
                      >
                        <ExternalLink size={13} className="text-cream-200" />
                        <span>
                          {section.sourceLink.includes('amazon.com')
                            ? 'Check Price on Amazon'
                            : section.sourceLink.includes('steampowered.com')
                            ? 'View on Steam'
                            : 'Read Original Article'}
                        </span>
                      </a>
                    )}

                    {section.playStoreLink && (
                      <a
                        href={section.playStoreLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-emerald-800 hover:bg-emerald-700 text-cream-50 text-xs font-bold transition-all hover:scale-[1.02] shadow-cozy-xs"
                      >
                        <ExternalLink size={13} className="text-emerald-300" />
                        <span>Get on Google Play</span>
                      </a>
                    )}
                  </div>

                  {/* Callout Box */}
                  {section.callout && (
                    <div className="my-6 p-5 rounded-2xl bg-peach-50/80 border-2 border-dashed border-peach-300 relative">
                      <div className="flex items-center gap-2 text-peach-800 font-bold text-sm mb-1.5">
                        <Bookmark className="w-4 h-4 text-peach-600" />
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="text-sm text-ink-700 font-medium leading-relaxed">
                        {section.callout.text}
                      </p>
                    </div>
                  )}
                </section>
              );
            })}
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
              {(article.tags || []).map((tag) => (
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
          {/* Article-Wide Photo & Visual Inspection Carousel */}
          {article.gallery && article.gallery.length > 0 && (
            <PhotoCarousel
              images={article.gallery}
              onZoom={(img) => setLightboxImage(img)}
            />
          )}
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

      {/* High-Resolution Full-Screen Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-ink-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fade-in"
          onClick={() => setLightboxImage(null)}
        >
          <div
            className="relative max-w-5xl w-full bg-ink-900 border border-cream-100/20 rounded-2xl overflow-hidden shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-4 flex items-center justify-between border-b border-white/10 text-cream-50 bg-ink-950">
              <div className="flex items-center gap-2">
                {lightboxImage.angle && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-peach-500 text-white">
                    {lightboxImage.angle}
                  </span>
                )}
                <span className="font-display font-bold text-sm truncate">
                  {lightboxImage.alt || 'High-Resolution Inspection'}
                </span>
              </div>
              <button
                onClick={() => setLightboxImage(null)}
                className="p-1.5 px-3 rounded-lg bg-white/10 hover:bg-white/20 text-cream-100 transition-colors text-xs font-bold"
              >
                ✕ Close (Esc)
              </button>
            </div>

            <div className="p-3 sm:p-6 flex items-center justify-center bg-black/60 max-h-[72vh] overflow-hidden">
              <img
                src={lightboxImage.url}
                alt={lightboxImage.alt || 'Detailed view'}
                className="max-w-full max-h-[68vh] object-contain rounded-lg shadow-lg"
              />
            </div>

            {lightboxImage.caption && (
              <div className="p-4 bg-ink-950 text-cream-100 text-xs sm:text-sm border-t border-white/10 leading-relaxed font-sans">
                {lightboxImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
