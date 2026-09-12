import { useState, useMemo } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import { storeCategories, type StoreProduct } from '@/data/store';
import { 
  ShoppingBag, 
  Search, 
  Sparkles, 
  Check, 
  Copy, 
  ExternalLink, 
  Download, 
  ShieldCheck, 
  HelpCircle,
  ChevronDown,
  Tag
} from 'lucide-react';
import { AdSenseUnit } from '@/components/AdSenseUnit';

export function StorePage() {
  const { products } = useSiteContent();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

  const availableCategories = useMemo(() => {
    const set = new Set<string>(['All']);
    storeCategories.forEach((c) => set.add(c));
    products.forEach((p) => {
      if (p.category) set.add(p.category.trim());
    });
    return Array.from(set);
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((item) => {
      const matchesCategory =
        selectedCategory === 'All' || item.category === selectedCategory;

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.title.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        (item.badge && item.badge.toLowerCase().includes(q)) ||
        (item.features && item.features.some((f) => f.toLowerCase().includes(q)));

      return matchesCategory && matchesSearch;
    });
  }, [products, selectedCategory, searchQuery]);

  const handleCopyLink = (product: StoreProduct) => {
    const url = product.gumroadUrl || window.location.href;
    navigator.clipboard.writeText(url);
    setCopiedId(product.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const faqs = [
    {
      question: 'How do digital downloads work on Gumroad?',
      answer:
        'Once you complete checkout on Gumroad (even for $0 free items), Gumroad instantly displays your download link on-screen and sends a confirmation email with lifetime access to your files and future updates.',
    },
    {
      question: 'What payment methods are supported?',
      answer:
        'Gumroad supports major credit cards, debit cards, PayPal, Apple Pay, and Google Pay with bank-grade encryption.',
    },
    {
      question: 'How do Notion templates work?',
      answer:
        'You will receive a duplicate link in your Gumroad receipt. Simply click "Duplicate" in the top-right corner of Notion to copy the workspace directly into your own free Notion account.',
    },
    {
      question: 'Can I suggest a game guide, planner, or wallpaper theme?',
      answer:
        'Yes! We love suggestions from the cozy gaming community. Feel free to contact us via the Contact page or send an email to mjhanesultancruz1514@gmail.com.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 animate-fade-in">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-8">
        <div>
          <div className="library-badge inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 shadow-cozy-sm">
            <ShoppingBag className="w-3.5 h-3.5 text-peach-500" />
            <span>Digital Goodies & Planners</span>
          </div>
        </div>
        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-ink-900 tracking-tight mb-3">
          Cozy Store
        </h1>
        <p className="text-base text-ink-700 leading-relaxed font-sans">
          Handcrafted Notion workspaces, printable cozy checklists, digital art wallpapers, and game guides created to bring a little extra comfort to your gaming time.
        </p>
      </div>

      {/* Trust & Delivery Banner */}
      <div className="max-w-4xl mx-auto mb-10 bg-cream-50 border-2 border-tan-200 rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-cozy-xs">
        <div className="p-3 bg-peach-100 rounded-xl text-peach-600 flex-shrink-0">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h4 className="font-bold text-ink-900 text-sm flex items-center justify-center sm:justify-start gap-1.5">
            <Sparkles className="w-4 h-4 text-peach-500" /> Instant Digital Delivery via Gumroad
          </h4>
          <p className="text-xs text-tan-600 mt-0.5 font-medium leading-relaxed">
            Secure, encrypted checkout. Files are delivered immediately to your email with free lifetime updates. Pay with Card, PayPal, Apple Pay, or Google Pay.
          </p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0 text-xs font-bold text-tan-500 bg-white px-3 py-1.5 rounded-xl border border-tan-200">
          <Download className="w-3.5 h-3.5 text-sage-600" />
          <span>Direct Downloads</span>
        </div>
      </div>

      {/* Search & Category Filter Controls */}
      <div className="mb-10 space-y-4 max-w-4xl mx-auto">
        {/* Search Bar */}
        <div className="relative">
          <Search className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-tan-400 pointer-events-none" />
          <input
            type="text"
            placeholder="Search cozy templates, planners, wallpapers, or guides..."
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
          {availableCategories.map((category) => (
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

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="notepad-card p-12 text-center max-w-md mx-auto">
          <ShoppingBag className="w-10 h-10 text-tan-400 mx-auto mb-3" />
          <p className="text-lg font-bold text-ink-800 mb-2">No products found</p>
          <p className="text-sm text-tan-500 mb-4">
            Try adjusting your search terms or selecting another category.
          </p>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 pt-2">
          {filteredProducts.map((product) => (
            <article
              key={product.id}
              className="notepad-card p-6 sm:p-7 flex flex-col justify-between group transition-all duration-300 hover:shadow-cozy-md relative overflow-hidden"
            >
              {/* Top Row: Category Chip & Badges */}
              <div>
                <div className="relative mb-5 overflow-hidden rounded-2xl border-2 border-tan-200 bg-cream-200 aspect-[16/10]">
                  <img
                    src={product.coverImage}
                    alt={product.coverAlt || product.title}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink-900/40 via-transparent to-transparent opacity-60" />

                  <div className="absolute top-3 left-3 flex flex-wrap gap-2">
                    <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-white/95 text-ink-900 shadow-cozy-sm backdrop-blur-sm border border-tan-200">
                      <Tag className="w-3 h-3 text-peach-500" />
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-extrabold bg-peach-500 text-white shadow-cozy-sm">
                        {product.badge}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-start justify-between gap-4 mb-2">
                  <h2 className="font-display font-bold text-xl sm:text-2xl text-ink-900 group-hover:text-peach-600 transition-colors">
                    {product.title}
                  </h2>
                </div>

                <p className="text-sm text-ink-700 font-sans leading-relaxed mb-4">
                  {product.description}
                </p>

                {/* Features list */}
                {product.features && product.features.length > 0 && (
                  <div className="bg-cream-50 border border-tan-200 rounded-xl p-3.5 mb-6 space-y-2">
                    <span className="text-[11px] font-bold text-tan-500 uppercase tracking-wider block mb-1">
                      What's Included:
                    </span>
                    {product.features.map((feature, fIndex) => (
                      <div key={fIndex} className="flex items-start gap-2 text-xs text-ink-800 font-medium">
                        <Check className="w-3.5 h-3.5 text-sage-600 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Card Bar: Price + Buy on Gumroad button */}
              <div className="pt-4 border-t-2 border-tan-100 flex flex-wrap items-center justify-between gap-3 mt-auto">
                <div className="flex items-baseline gap-2">
                  <span className="font-display font-extrabold text-2xl text-ink-900">
                    {product.price}
                  </span>
                  {product.originalPrice && (
                    <span className="text-xs text-tan-400 line-through font-semibold">
                      {product.originalPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleCopyLink(product)}
                    className="p-2.5 rounded-xl border border-tan-200 bg-white hover:bg-cream-100 text-tan-600 hover:text-ink-900 transition-colors shadow-cozy-xs"
                    title="Copy Gumroad link to clipboard"
                    aria-label={`Copy link for ${product.title}`}
                  >
                    {copiedId === product.id ? (
                      <Check className="w-4 h-4 text-sage-600" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>

                  <a
                    href={product.gumroadUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="gumroad-button site-button bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs sm:text-sm px-4 sm:px-5 py-2.5 rounded-xl shadow-cozy-sm inline-flex items-center gap-2 transition-transform hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Get on Gumroad</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Frequently Asked Questions */}
      <section className="mt-16 max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-cream-100 text-tan-600 border border-tan-200 mb-2">
            <HelpCircle className="w-3.5 h-3.5 text-peach-500" />
            <span>Got Questions?</span>
          </div>
          <h3 className="font-display font-bold text-2xl text-ink-900">
            Frequently Asked Questions
          </h3>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, index) => {
            const isOpen = openFaqIndex === index;
            return (
              <div
                key={index}
                className="notepad-card p-4 rounded-xl transition-colors cursor-pointer"
                onClick={() => setOpenFaqIndex(isOpen ? null : index)}
              >
                <button
                  type="button"
                  className="w-full flex items-center justify-between text-left font-bold text-ink-900 text-sm sm:text-base gap-4"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-tan-500 transition-transform duration-200 flex-shrink-0 ${
                      isOpen ? 'rotate-180 text-peach-500' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="mt-3 text-xs sm:text-sm text-ink-700 leading-relaxed font-sans border-t border-tan-100 pt-3">
                    {faq.answer}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="mt-12">
        <AdSenseUnit slot={import.meta.env.VITE_ADSENSE_SLOT || ''} />
      </div>
    </div>
  );
}
