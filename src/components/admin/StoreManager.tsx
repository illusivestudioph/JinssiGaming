import { useState } from 'react';
import type { StoreProduct } from '@/data/store';
import { storeCategories } from '@/data/store';
import { fetchGumroadProductDetails } from '@/utils/gumroadScraper';
import { 
  ShoppingBag, 
  Plus, 
  Edit2, 
  Trash2, 
  ExternalLink, 
  ChevronUp, 
  ChevronDown, 
  Upload, 
  Check, 
  X, 
  Search,
  Sparkles,
  Link as LinkIcon,
  Tag,
  DollarSign,
  Loader2,
  Wand2,
  CheckCircle2,
  AlertCircle,
  Coffee
} from 'lucide-react';

interface StoreManagerProps {
  products: StoreProduct[];
  onAddProduct: (product: StoreProduct) => void;
  onUpdateProduct: (product: StoreProduct) => void;
  onRemoveProduct: (productId: string) => void;
  onReorderProduct: (productId: string, direction: 'up' | 'down') => void;
  onUploadImage: (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadKey: string,
    onComplete: (url: string) => void
  ) => void;
  uploadingKey: string | null;
}

export function StoreManager({
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  onReorderProduct,
  onUploadImage,
  uploadingKey,
}: StoreManagerProps) {
  const [editingProduct, setEditingProduct] = useState<StoreProduct | null>(null);
  const [isNew, setIsNew] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // Auto-grab state
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [grabSuccess, setGrabSuccess] = useState<string | null>(null);
  const [grabError, setGrabError] = useState<string | null>(null);

  // Quick Add state in list view
  const [quickUrl, setQuickUrl] = useState('');
  const [quickGrabbing, setQuickGrabbing] = useState(false);
  const [quickError, setQuickError] = useState<string | null>(null);

  // Form state
  const [featuresText, setFeaturesText] = useState('');

  const handleQuickImport = async () => {
    const url = quickUrl.trim();
    if (!url || (!url.includes('gumroad.com') && !url.includes('gum.co'))) {
      setQuickError('Please paste a valid Gumroad product link.');
      return;
    }

    setQuickGrabbing(true);
    setQuickError(null);

    try {
      const details = await fetchGumroadProductDetails(url);
      const newProduct: StoreProduct = {
        id: `product-${Date.now()}`,
        title: details.title || 'New Cozy Product',
        description: details.description || 'Digital download',
        price: details.price || '$5',
        originalPrice: details.originalPrice || '',
        gumroadUrl: url,
        kofiUrl: '',
        payhipUrl: '',
        coverImage: details.coverImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
        coverAlt: details.title,
        category: details.category || 'Coloring Books',
        badge: details.badge || 'New',
        features: details.features?.length ? details.features : ['Instant digital download', 'Print-ready high-res PDF'],
        rating: 5,
      };

      setEditingProduct(newProduct);
      setFeaturesText(newProduct.features?.join('\n') || '');
      setIsNew(true);
      setQuickUrl('');
      setGrabSuccess(`Grabbed: "${details.title || 'Gumroad Product'}"! Review details and click Create Product.`);
    } catch (err: any) {
      setQuickError(err?.message || 'Could not fetch Gumroad link details. Please check the URL.');
    } finally {
      setQuickGrabbing(false);
    }
  };

  const handleStartNew = () => {
    const newProduct: StoreProduct = {
      id: `product-${Date.now()}`,
      title: 'New Cozy Product',
      description: 'Describe what makes this digital download special...',
      price: '$5',
      originalPrice: '',
      gumroadUrl: '',
      kofiUrl: '',
      payhipUrl: '',
      coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
      coverAlt: '',
      category: 'Coloring Books',
      badge: 'New',
      features: ['Instant digital download', 'Print-ready high-res PDF'],
      rating: 5,
    };
    setEditingProduct(newProduct);
    setFeaturesText(newProduct.features?.join('\n') || '');
    setGrabError(null);
    setGrabSuccess(null);
    setIsNew(true);
  };

  const handleAutoGrab = async (targetUrl?: string) => {
    const raw = targetUrl || editingProduct?.gumroadUrl || '';
    const url = raw.trim();
    if (!url || (!url.includes('gumroad.com') && !url.includes('gum.co'))) {
      setGrabError('Please paste a valid Gumroad link (e.g. https://yourname.gumroad.com/l/your-product).');
      return;
    }

    setIsGrabbing(true);
    setGrabError(null);
    setGrabSuccess(null);

    try {
      const details = await fetchGumroadProductDetails(url);
      setEditingProduct((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          title: details.title || prev.title,
          price: details.price || prev.price,
          coverImage: details.coverImage || prev.coverImage,
          description: details.description || prev.description,
          category: details.category || prev.category,
          badge: details.badge || prev.badge,
          features: details.features?.length ? details.features : prev.features,
        };
      });

      if (details.features?.length) {
        setFeaturesText(details.features.join('\n'));
      }

      setGrabSuccess(`Grabbed details for: "${details.title || 'Gumroad Product'}"!`);
      setTimeout(() => setGrabSuccess(null), 5000);
    } catch (err: any) {
      console.error('Failed to grab Gumroad product details:', err);
      setGrabError(err?.message || 'Could not fetch Gumroad product details. You can still enter details manually.');
    } finally {
      setIsGrabbing(false);
    }
  };

  const handleStartEdit = (product: StoreProduct) => {
    setEditingProduct({ ...product });
    setFeaturesText(product.features?.join('\n') || '');
    setGrabError(null);
    setGrabSuccess(null);
    setIsNew(false);
  };

  const handleSaveForm = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;

    const parsedFeatures = featuresText
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const saved: StoreProduct = {
      ...editingProduct,
      features: parsedFeatures,
    };

    if (isNew) {
      onAddProduct(saved);
    } else {
      onUpdateProduct(saved);
    }

    setEditingProduct(null);
    setIsNew(false);
  };

  const filteredProducts = products.filter((p) => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.gumroadUrl.toLowerCase().includes(q) ||
      (p.badge && p.badge.toLowerCase().includes(q))
    );
  });

  // --- PRODUCT EDIT MODAL / INLINE VIEW ---
  if (editingProduct) {
    return (
      <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
        <div className="flex items-center justify-between border-b-2 border-tan-200 pb-4">
          <div>
            <h3 className="text-2xl font-display font-bold text-ink-900 flex items-center gap-2">
              <ShoppingBag className="w-6 h-6 text-peach-500" />
              <span>{isNew ? 'Create New Store Product' : 'Edit Store Product'}</span>
            </h3>
            <p className="text-xs text-tan-600 mt-1 font-medium">
              Configure product details, upload artwork, and paste your Gumroad checkout link.
            </p>
          </div>
          <button
            type="button"
            onClick={() => {
              setEditingProduct(null);
              setIsNew(false);
            }}
            className="px-3.5 py-1.5 rounded-xl border border-tan-300 text-xs font-bold text-tan-600 hover:text-ink-900 bg-white hover:bg-cream-100 transition-colors"
          >
            Cancel
          </button>
        </div>

        <form onSubmit={handleSaveForm} className="notepad-card p-6 sm:p-8 space-y-6">
          {/* Gumroad URL Callout Box */}
          <div className="bg-peach-50 border-2 border-peach-200 rounded-2xl p-5 shadow-cozy-xs space-y-3">
            <div className="flex items-center justify-between gap-2">
              <label className="text-xs font-extrabold text-peach-800 uppercase tracking-wider flex items-center gap-1.5">
                <LinkIcon className="w-4 h-4 text-peach-600" />
                <span>Gumroad Link (Paste URL Here)</span>
              </label>
              {editingProduct.gumroadUrl && (
                <a
                  href={editingProduct.gumroadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-peach-700 bg-white px-2.5 py-1 rounded-lg border border-peach-300 hover:bg-peach-100 transition-colors"
                >
                  <span>Test Link</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              )}
            </div>

            <p className="text-xs text-tan-700 font-medium leading-relaxed">
              Paste your Gumroad product URL below. Click <strong>⚡ Auto-Grab Details</strong> to automatically pull in the title, price, description, cover photo, and checklist directly from your Gumroad page!
            </p>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <input
                type="url"
                required
                value={editingProduct.gumroadUrl}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, gumroadUrl: e.target.value })
                }
                onPaste={(e) => {
                  const pasted = e.clipboardData.getData('text');
                  if (pasted && (pasted.includes('gumroad.com') || pasted.includes('gum.co'))) {
                    setTimeout(() => handleAutoGrab(pasted), 50);
                  }
                }}
                onBlur={() => {
                  if (
                    editingProduct.gumroadUrl &&
                    (editingProduct.gumroadUrl.includes('gumroad.com') || editingProduct.gumroadUrl.includes('gum.co')) &&
                    (!editingProduct.title || editingProduct.title === 'New Cozy Product')
                  ) {
                    void handleAutoGrab(editingProduct.gumroadUrl);
                  }
                }}
                placeholder="https://yourname.gumroad.com/l/..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-peach-300 bg-white text-ink-900 font-medium text-sm focus:outline-none focus:border-peach-500 shadow-sm"
              />
              <button
                type="button"
                onClick={() => handleAutoGrab()}
                disabled={isGrabbing || !editingProduct.gumroadUrl.trim()}
                className="site-button bg-peach-500 hover:bg-peach-600 disabled:opacity-50 text-white font-bold text-xs px-4 py-3 rounded-xl shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap transition-all"
                title="Automatically fetch title, price, description, cover photo, and bulleted features directly from your Gumroad link"
              >
                {isGrabbing ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    <span>Grabbing Details...</span>
                  </>
                ) : (
                  <>
                    <Wand2 size={16} />
                    <span>⚡ Auto-Grab Details</span>
                  </>
                )}
              </button>
            </div>

            {/* Feedback Messages */}
            {grabSuccess && (
              <div className="flex items-center gap-2 text-xs font-bold text-sage-700 bg-sage-50 border border-sage-200 px-3.5 py-2.5 rounded-xl animate-fade-in">
                <CheckCircle2 size={16} className="text-sage-600 flex-shrink-0" />
                <span>{grabSuccess}</span>
              </div>
            )}
            {grabError && (
              <div className="flex items-center gap-2 text-xs font-bold text-red-700 bg-red-50 border border-red-200 px-3.5 py-2.5 rounded-xl animate-fade-in">
                <AlertCircle size={16} className="text-red-500 flex-shrink-0" />
                <span>{grabError}</span>
              </div>
            )}

            {/* Additional Online Store Links (Ko-fi & Payhip) */}
            <div className="pt-3 border-t border-peach-200/80 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Ko-fi Shop Link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-ink-800 flex items-center gap-1.5">
                    <Coffee className="w-3.5 h-3.5 text-[#FF5E5B]" />
                    <span>Ko-fi Shop Link (Optional)</span>
                  </label>
                  {editingProduct.kofiUrl && (
                    <a
                      href={editingProduct.kofiUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#FF5E5B] hover:underline inline-flex items-center gap-0.5"
                      title="Test Ko-fi link"
                    >
                      <span>Test</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={editingProduct.kofiUrl || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, kofiUrl: e.target.value })
                  }
                  placeholder="https://ko-fi.com/s/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-tan-300 bg-white text-ink-900 text-xs focus:outline-none focus:border-peach-400"
                />
              </div>

              {/* Payhip Link */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-ink-800 flex items-center gap-1.5">
                    <ExternalLink className="w-3.5 h-3.5 text-[#3B82F6]" />
                    <span>Payhip Link (Optional)</span>
                  </label>
                  {editingProduct.payhipUrl && (
                    <a
                      href={editingProduct.payhipUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] font-bold text-[#3B82F6] hover:underline inline-flex items-center gap-0.5"
                      title="Test Payhip link"
                    >
                      <span>Test</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                </div>
                <input
                  type="url"
                  value={editingProduct.payhipUrl || ''}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, payhipUrl: e.target.value })
                  }
                  placeholder="https://payhip.com/b/..."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-tan-300 bg-white text-ink-900 text-xs focus:outline-none focus:border-peach-400"
                />
              </div>
            </div>
          </div>

          {/* Product Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
                Product Title
              </label>
              <input
                type="text"
                required
                value={editingProduct.title}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, title: e.target.value })
                }
                placeholder="e.g. Cozy Gaming Notion Dashboard"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-bold focus:outline-none focus:border-peach-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
                Category
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  required
                  value={editingProduct.category}
                  onChange={(e) =>
                    setEditingProduct({ ...editingProduct, category: e.target.value })
                  }
                  placeholder="Category..."
                  list="category-options"
                  className="flex-1 px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-medium focus:outline-none focus:border-peach-400"
                />
                <datalist id="category-options">
                  {storeCategories
                    .filter((c) => c !== 'All')
                    .map((cat) => (
                      <option key={cat} value={cat} />
                    ))}
                </datalist>
              </div>
            </div>
          </div>

          {/* Price, Original Price & Badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <DollarSign className="w-3.5 h-3.5 text-sage-600" />
                <span>Price</span>
              </label>
              <input
                type="text"
                required
                value={editingProduct.price}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, price: e.target.value })
                }
                placeholder="e.g. $4.99 or Free or Pay what you want"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-bold focus:outline-none focus:border-peach-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
                Original Price (Optional Strikethrough)
              </label>
              <input
                type="text"
                value={editingProduct.originalPrice || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, originalPrice: e.target.value })
                }
                placeholder="e.g. $8.00"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-medium focus:outline-none focus:border-peach-400"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-peach-500" />
                <span>Badge Chip (Optional)</span>
              </label>
              <input
                type="text"
                value={editingProduct.badge || ''}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, badge: e.target.value })
                }
                placeholder="e.g. Bestseller, Free / $0+, New"
                className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-medium focus:outline-none focus:border-peach-400"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
              Description
            </label>
            <textarea
              required
              rows={3}
              value={editingProduct.description}
              onChange={(e) =>
                setEditingProduct({ ...editingProduct, description: e.target.value })
              }
              placeholder="Detailed description of what the download offers..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-sans focus:outline-none focus:border-peach-400 text-sm leading-relaxed"
            />
          </div>

          {/* Features / What's Included */}
          <div>
            <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
              What's Included (One bullet point per line)
            </label>
            <textarea
              rows={4}
              value={featuresText}
              onChange={(e) => setFeaturesText(e.target.value)}
              placeholder="e.g.&#10;Full Notion Dashboard with 5 databases&#10;Print-ready PDFs (A4 and Letter)&#10;Free lifetime updates"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-mono text-xs focus:outline-none focus:border-peach-400 leading-relaxed"
            />
          </div>

          {/* Cover Image */}
          <div>
            <label className="block text-xs font-bold text-tan-600 uppercase tracking-wider mb-1.5">
              Cover Artwork / Preview Image
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                required
                value={editingProduct.coverImage}
                onChange={(e) =>
                  setEditingProduct({ ...editingProduct, coverImage: e.target.value })
                }
                placeholder="https://... or click Upload"
                className="flex-1 px-4 py-2.5 rounded-xl border-2 border-tan-200 bg-cream-50 text-ink-900 font-medium text-sm focus:outline-none focus:border-peach-400"
              />
              <label className="flex items-center justify-center px-4 py-2.5 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap text-xs">
                {uploadingKey === 'store-cover' ? (
                  'Uploading...'
                ) : (
                  <>
                    <Upload size={14} className="mr-1.5" /> Upload Image
                  </>
                )}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) =>
                    onUploadImage(e, 'store-cover', (url) =>
                      setEditingProduct((curr) => (curr ? { ...curr, coverImage: url } : curr))
                    )
                  }
                />
              </label>
            </div>

            {editingProduct.coverImage && (
              <div className="mt-3 relative w-48 aspect-[16/10] rounded-xl overflow-hidden border border-tan-200 bg-cream-100">
                <img
                  src={editingProduct.coverImage}
                  alt="Cover preview"
                  className="w-full h-full object-cover"
                />
              </div>
            )}
          </div>

          {/* Form Actions */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t-2 border-tan-100">
            <button
              type="button"
              onClick={() => {
                setEditingProduct(null);
                setIsNew(false);
              }}
              className="px-5 py-2.5 rounded-xl border border-tan-300 font-bold text-xs text-tan-600 hover:text-ink-900 hover:bg-cream-100 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="site-button bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-cozy-sm"
            >
              {isNew ? 'Create Product' : 'Save Product Changes'}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- PRODUCT LIST VIEW ---
  return (
    <div className="space-y-6 animate-fade-in">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-cream-50 p-6 rounded-2xl border-2 border-tan-200 shadow-cozy-sm">
        <div>
          <h3 className="font-display font-bold text-xl text-ink-900 flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-peach-500" />
            <span>Store Products ({products.length})</span>
          </h3>
          <p className="text-xs text-tan-600 mt-1 font-medium">
            Manage your digital products, Notion templates, guides, and Gumroad links.
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartNew}
          className="site-button bg-peach-500 text-white hover:bg-peach-600 flex items-center gap-2 text-xs font-bold shadow-cozy-sm self-start sm:self-auto"
        >
          <Plus size={16} /> Add New Product
        </button>
      </div>

      {/* Gumroad Quick Tip */}
      <div className="bg-peach-50/70 border border-peach-200 rounded-xl p-3.5 flex items-start gap-2.5 text-xs text-tan-700">
        <Sparkles className="w-4 h-4 text-peach-500 flex-shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-ink-900">How Gumroad Links Work:</span> When you add or edit a product, paste your direct Gumroad product link. Visitors clicking "Get on Gumroad" on your Store page will either open the Gumroad checkout popup or redirect to your checkout.
        </div>
      </div>

      {/* Quick Add by Gumroad Link */}
      <div className="bg-cream-50 border-2 border-tan-200 rounded-2xl p-4 sm:p-5 shadow-cozy-sm space-y-2">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-peach-500" />
          <span className="text-xs font-extrabold text-ink-900 uppercase tracking-wider">
            ⚡ Quick Add from Gumroad Link
          </span>
        </div>
        <p className="text-xs text-tan-600 font-medium">
          Paste any Gumroad link below and we'll automatically pull in the title, price, description, cover picture, and checklist for you!
        </p>
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={quickUrl}
            onChange={(e) => setQuickUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleQuickImport();
              }
            }}
            placeholder="e.g. https://sultancruz5.gumroad.com/l/pxowg"
            className="flex-1 px-4 py-2.5 rounded-xl border border-tan-300 bg-white text-ink-900 text-xs focus:outline-none focus:border-peach-400"
          />
          <button
            type="button"
            disabled={quickGrabbing || !quickUrl.trim()}
            onClick={handleQuickImport}
            className="site-button bg-peach-500 hover:bg-peach-600 disabled:opacity-50 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-cozy-sm flex items-center justify-center gap-2 whitespace-nowrap"
          >
            {quickGrabbing ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                <span>Grabbing Details...</span>
              </>
            ) : (
              <>
                <Sparkles size={14} />
                <span>Auto-Grab & Import</span>
              </>
            )}
          </button>
        </div>
        {quickError && (
          <div className="flex items-center gap-2 text-xs font-bold text-red-600 bg-red-50 p-2.5 rounded-xl border border-red-200">
            <AlertCircle size={14} className="flex-shrink-0" />
            <span>{quickError}</span>
          </div>
        )}
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-tan-400" />
        <input
          type="text"
          placeholder="Filter products by title, category, or Gumroad URL..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-tan-300 bg-white text-xs text-ink-900 placeholder:text-tan-400 focus:outline-none focus:border-peach-400"
        />
      </div>

      {/* Products List */}
      {filteredProducts.length === 0 ? (
        <div className="notepad-card p-12 text-center">
          <ShoppingBag className="w-10 h-10 text-tan-400 mx-auto mb-3" />
          <p className="font-bold text-ink-900 text-base mb-1">No products found</p>
          <p className="text-xs text-tan-500 mb-4">
            {searchQuery ? 'Try clearing your search query.' : 'Add your first Gumroad product to display in your cozy store!'}
          </p>
          <button
            type="button"
            onClick={handleStartNew}
            className="px-4 py-2 bg-peach-500 text-white text-xs font-bold rounded-xl shadow-cozy-sm hover:bg-peach-600"
          >
            Add First Product
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="notepad-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all hover:shadow-cozy-sm"
            >
              {/* Product Info */}
              <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                <img
                  src={product.coverImage}
                  alt={product.title}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-xl object-cover border border-tan-200 flex-shrink-0"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 text-ink-800 border border-tan-200">
                      {product.category}
                    </span>
                    {product.badge && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-peach-500 text-white">
                        {product.badge}
                      </span>
                    )}
                    <span className="text-xs font-extrabold text-ink-900 bg-sage-50 text-sage-700 px-2 py-0.5 rounded-md border border-sage-200">
                      {product.price}
                    </span>
                  </div>

                  <h4 className="font-bold text-sm sm:text-base text-ink-900 truncate">
                    {product.title}
                  </h4>

                  <div className="flex flex-wrap items-center gap-2 mt-1.5">
                    {product.gumroadUrl && (
                      <a
                        href={product.gumroadUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-pink-50 text-pink-700 border border-pink-200 hover:bg-pink-100 transition-colors"
                        title="Test Gumroad URL in new tab"
                      >
                        <ShoppingBag size={11} />
                        <span>Gumroad</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {product.kofiUrl && (
                      <a
                        href={product.kofiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-rose-50 text-rose-700 border border-rose-200 hover:bg-rose-100 transition-colors"
                        title="Test Ko-fi URL in new tab"
                      >
                        <Coffee size={11} />
                        <span>Ko-fi</span>
                        <ExternalLink size={10} />
                      </a>
                    )}
                    {product.payhipUrl && (
                      <a
                        href={product.payhipUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-lg bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                        title="Test Payhip URL in new tab"
                      >
                        <ExternalLink size={11} />
                        <span>Payhip</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions & Ordering */}
              <div className="flex items-center gap-2 self-end sm:self-center flex-shrink-0">
                {/* Reordering */}
                <div className="flex flex-col gap-0.5">
                  <button
                    type="button"
                    disabled={index === 0}
                    onClick={() => onReorderProduct(product.id, 'up')}
                    className="p-1 text-tan-400 hover:text-ink-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream-100 rounded"
                    title="Move product up"
                  >
                    <ChevronUp size={14} />
                  </button>
                  <button
                    type="button"
                    disabled={index === filteredProducts.length - 1}
                    onClick={() => onReorderProduct(product.id, 'down')}
                    className="p-1 text-tan-400 hover:text-ink-900 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-cream-100 rounded"
                    title="Move product down"
                  >
                    <ChevronDown size={14} />
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => handleStartEdit(product)}
                  className="px-3 py-1.5 rounded-xl border border-tan-200 text-xs font-bold text-ink-900 hover:border-peach-300 hover:bg-peach-50 flex items-center gap-1.5 transition-colors"
                >
                  <Edit2 size={13} /> Edit
                </button>

                {deleteConfirmId === product.id ? (
                  <div className="flex items-center gap-1 bg-red-50 p-1 rounded-xl border border-red-200">
                    <button
                      type="button"
                      onClick={() => {
                        onRemoveProduct(product.id);
                        setDeleteConfirmId(null);
                      }}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 text-white text-[11px] font-bold rounded-lg"
                    >
                      Confirm
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeleteConfirmId(null)}
                      className="p-1 text-tan-500 hover:text-ink-900"
                    >
                      <X size={13} />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => setDeleteConfirmId(product.id)}
                    className="p-2 rounded-xl text-tan-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    title="Delete product"
                  >
                    <Trash2 size={15} />
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
