import { useState } from 'react';
import type { Article, ArticleSection } from '@/data/articles';
import type { Game } from '@/data/games';
import { 
  ChevronLeft, 
  Save, 
  Plus, 
  Trash2, 
  ArrowUp, 
  ArrowDown, 
  Image as ImageIcon, 
  Upload, 
  Sparkles,
  BookOpen
} from 'lucide-react';

interface ArticleEditorProps {
  article: Article;
  isNew: boolean;
  games: Game[];
  onSave: (article: Article) => void;
  onCancel: () => void;
  onUploadImage: (
    e: React.ChangeEvent<HTMLInputElement>,
    uploadKey: string,
    onComplete: (url: string) => void
  ) => Promise<void>;
  uploadingKey: string | null;
}

export function ArticleEditor({
  article: initialArticle,
  isNew,
  games,
  onSave,
  onCancel,
  onUploadImage,
  uploadingKey,
}: ArticleEditorProps) {
  const [formData, setFormData] = useState<Article>({ ...initialArticle });

  // Auto-generate URL slug from title if title changes
  const handleTitleChange = (newTitle: string) => {
    const updates: Partial<Article> = { title: newTitle };
    if (isNew || formData.slug.startsWith('new-article')) {
      updates.slug = newTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
    }
    setFormData((prev) => ({ ...prev, ...updates }));
  };

  // Section Management
  const addSection = () => {
    const newSection: ArticleSection = {
      heading: 'New Section',
      content: ['Write your section thoughts here.'],
    };
    setFormData((prev) => ({
      ...prev,
      sections: [...prev.sections, newSection],
    }));
  };

  const removeSection = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sections: prev.sections.filter((_, idx) => idx !== index),
    }));
  };

  const updateSectionField = <K extends keyof ArticleSection>(
    index: number,
    field: K,
    value: ArticleSection[K]
  ) => {
    setFormData((prev) => {
      const updated = [...prev.sections];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, sections: updated };
    });
  };

  const moveSection = (index: number, direction: 'up' | 'down') => {
    setFormData((prev) => {
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= prev.sections.length) return prev;
      const updated = [...prev.sections];
      const temp = updated[index];
      updated[index] = updated[targetIndex];
      updated[targetIndex] = temp;
      return { ...prev, sections: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-tan-500 hover:text-ink-900 font-bold transition-colors"
        >
          <ChevronLeft size={20} /> Back to Articles List
        </button>

        <button
          type="button"
          onClick={handleSubmit}
          className="site-button bg-peach-500 text-white hover:bg-peach-600 flex items-center gap-2 text-sm shadow-cozy-sm"
        >
          <Save size={16} /> {isNew ? 'Publish Article' : 'Save Changes'}
        </button>
      </div>

      <form onSubmit={handleSubmit} className="notepad-card p-6 sm:p-10 shadow-cozy-lg">
        <div className="border-b-2 border-tan-100 pb-4 mb-8">
          <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
            {isNew ? 'Write New Cozy Article' : 'Edit Cozy Article'}
          </h2>
          <p className="text-xs text-tan-500 font-medium mt-1">
            Craft beautiful reviews, curated game lists, or peaceful reflections for your readers.
          </p>
        </div>

        {/* Core Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Article Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="e.g. The 7 Most Relaxing Organizing Games on Steam"
              className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-lg"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Subtitle / Excerpt *
            </label>
            <textarea
              value={formData.subtitle}
              onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
              placeholder="A gentle one or two-sentence hook that appears on the card and article header."
              rows={2}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-medium text-ink-800 text-sm"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              placeholder="e.g. 7-relaxing-organizing-games"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-mono text-xs text-ink-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Article['category'],
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-sm"
            >
              <option value="Curated List">Curated List</option>
              <option value="Review">Game Review</option>
              <option value="Guide">Game Guide / Lore</option>
              <option value="Cozy Essay">Cozy Essay / Wellness</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Author Name
            </label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Author Role / Title
            </label>
            <input
              type="text"
              value={formData.authorRole}
              onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-medium text-ink-800 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Read Time (Minutes)
            </label>
            <input
              type="number"
              min={1}
              max={60}
              value={formData.readTimeMinutes}
              onChange={(e) =>
                setFormData({ ...formData, readTimeMinutes: Number(e.target.value) || 1 })
              }
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-sm"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Stress Level
            </label>
            <select
              value={formData.stressLevel}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  stressLevel: e.target.value as Article['stressLevel'],
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-sm"
            >
              <option value="Zero Stress">Zero Stress</option>
              <option value="Very Low">Very Low</option>
              <option value="Gentle Challenge">Gentle Challenge</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Cozy Score (1 to 5 Teacups 🍵)
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((score) => (
                <button
                  key={score}
                  type="button"
                  onClick={() => setFormData({ ...formData, cozyScore: score })}
                  className={`w-10 h-10 rounded-xl font-bold flex items-center justify-center transition-all ${
                    formData.cozyScore >= score
                      ? 'bg-peach-500 text-white shadow-cozy-sm scale-105'
                      : 'bg-cream-200 text-tan-400 hover:bg-cream-300'
                  }`}
                >
                  {score}
                </button>
              ))}
              <span className="text-xs font-bold text-peach-600 ml-2">
                {formData.cozyScore} / 5 Teacups
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Connect to Walkthrough Guide (Optional)
            </label>
            <select
              value={formData.relatedGameId || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  relatedGameId: e.target.value || undefined,
                })
              }
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900 text-sm"
            >
              <option value="">None (Standalone Article)</option>
              {games.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Steam Store Link (Optional)
            </label>
            <input
              type="url"
              value={formData.steamLink || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  steamLink: e.target.value || undefined,
                })
              }
              placeholder="https://store.steampowered.com/app/..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-medium text-ink-900 text-sm font-mono text-xs"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Google Play Store Link (Optional)
            </label>
            <input
              type="url"
              value={formData.playStoreLink || ''}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  playStoreLink: e.target.value || undefined,
                })
              }
              placeholder="https://play.google.com/store/apps/details?id=..."
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-medium text-ink-900 text-sm font-mono text-xs"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-2">
              Tags (Comma-separated)
            </label>
            <input
              type="text"
              value={formData.tags.join(', ')}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              placeholder="e.g. Steam, Organizing, Tiny Glade, Relaxing"
              className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-medium text-ink-900 text-sm"
            />
          </div>
        </div>

        {/* Cover Image Uploader & URL */}
        <div className="border-t-2 border-tan-100 pt-6 mb-10">
          <h3 className="text-lg font-display font-bold text-ink-900 mb-4 flex items-center gap-2">
            <ImageIcon size={18} className="text-peach-500" /> Cover Artwork
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            <div className="md:col-span-2 space-y-4">
              <div>
                <label className="block text-xs font-bold text-tan-600 mb-1">
                  Image URL or Uploaded Link
                </label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.coverImage}
                    onChange={(e) => setFormData({ ...formData, coverImage: e.target.value })}
                    className="flex-1 px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 text-xs font-mono text-ink-900"
                    placeholder="https://..."
                    required
                  />
                  <label
                    className={`cursor-pointer px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors whitespace-nowrap shadow-cozy-sm ${
                      uploadingKey === 'cover'
                        ? 'bg-tan-300 text-white animate-pulse'
                        : 'bg-cream-200 hover:bg-peach-100 text-ink-900 hover:text-peach-700'
                    }`}
                  >
                    <Upload size={14} />
                    <span>{uploadingKey === 'cover' ? 'Uploading...' : 'Upload Image'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) =>
                        void onUploadImage(e, 'cover', (url) =>
                          setFormData((prev) => ({ ...prev, coverImage: url }))
                        )
                      }
                    />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-tan-600 mb-1">
                  Cover Image Caption / Alt Text
                </label>
                <input
                  type="text"
                  value={formData.coverAlt}
                  onChange={(e) => setFormData({ ...formData, coverAlt: e.target.value })}
                  placeholder="e.g. A peaceful wooden bookshelf with tea cup."
                  className="w-full px-4 py-2 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 text-xs text-ink-800"
                />
              </div>
            </div>

            {/* Live Preview Thumbnail */}
            <div className="rounded-xl overflow-hidden border-2 border-tan-200 bg-cream-100 h-36 flex items-center justify-center relative shadow-inner">
              {formData.coverImage ? (
                <img
                  src={formData.coverImage}
                  alt={formData.coverAlt || 'Cover preview'}
                  className="w-full h-full object-cover"
                />
              ) : (
                <span className="text-xs font-bold text-tan-400">No cover image</span>
              )}
            </div>
          </div>
        </div>

        {/* Article Content Sections Builder */}
        <div className="border-t-2 border-tan-100 pt-8 mb-8">
          <div className="flex items-center justify-between gap-4 mb-6">
            <div>
              <h3 className="text-xl font-display font-bold text-ink-900 flex items-center gap-2">
                <BookOpen size={20} className="text-peach-500" /> Article Content Sections ({formData.sections.length})
              </h3>
              <p className="text-xs text-tan-500 mt-0.5">
                Break your article into cozy chapters, insert pictures, and add pastel callout tips.
              </p>
            </div>

            <button
              type="button"
              onClick={addSection}
              className="px-4 py-2 bg-peach-100 hover:bg-peach-200 text-peach-700 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-cozy-sm"
            >
              <Plus size={14} /> Add Section
            </button>
          </div>

          <div className="space-y-6">
            {formData.sections.map((section, idx) => (
              <div
                key={idx}
                className="p-5 sm:p-6 rounded-2xl bg-cream-50 border-2 border-tan-200 shadow-cozy-sm relative"
              >
                {/* Section Header Controls */}
                <div className="flex items-center justify-between gap-2 border-b border-tan-200 pb-3 mb-4">
                  <span className="text-xs font-bold text-peach-600 uppercase tracking-wider">
                    Section {idx + 1}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => moveSection(idx, 'up')}
                      disabled={idx === 0}
                      className="p-1 rounded-lg hover:bg-cream-200 text-tan-500 disabled:opacity-30"
                      title="Move section up"
                    >
                      <ArrowUp size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => moveSection(idx, 'down')}
                      disabled={idx === formData.sections.length - 1}
                      className="p-1 rounded-lg hover:bg-cream-200 text-tan-500 disabled:opacity-30"
                      title="Move section down"
                    >
                      <ArrowDown size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => removeSection(idx)}
                      className="p-1 rounded-lg hover:bg-red-50 text-tan-400 hover:text-red-500 ml-2"
                      title="Delete section"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                </div>

                {/* Section Heading */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Section Heading (Optional)
                  </label>
                  <input
                    type="text"
                    value={section.heading || ''}
                    onChange={(e) => updateSectionField(idx, 'heading', e.target.value)}
                    placeholder="e.g. 1. A Little to the Left or Why We Love Cozy Play"
                    className="w-full px-3.5 py-2 rounded-xl border border-tan-300 focus:border-peach-400 focus:outline-none bg-white font-bold text-sm text-ink-900"
                  />
                </div>

                {/* Section Content Paragraphs */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Content Paragraphs * (Separate paragraphs with an empty line)
                  </label>
                  <textarea
                    value={section.content.join('\n\n')}
                    onChange={(e) => {
                      const paras = e.target.value
                        .split('\n\n')
                        .map((p) => p.trim())
                        .filter(Boolean);
                      updateSectionField(idx, 'content', paras.length > 0 ? paras : ['']);
                    }}
                    rows={4}
                    placeholder="Type your story, analysis, or review here..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-tan-300 focus:border-peach-400 focus:outline-none bg-white text-sm text-ink-800 leading-relaxed font-sans"
                    required
                  />
                </div>

                {/* Optional Image */}
                <div className="mb-4 p-3 rounded-xl bg-cream-100 border border-tan-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-tan-600 flex items-center gap-1.5">
                      <ImageIcon size={13} /> Section Image (Optional)
                    </span>
                    {section.image && (
                      <button
                        type="button"
                        onClick={() => {
                          updateSectionField(idx, 'image', undefined);
                          updateSectionField(idx, 'imageAlt', undefined);
                        }}
                        className="text-[11px] font-bold text-red-500 hover:underline"
                      >
                        Remove Image
                      </button>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="url"
                      value={section.image || ''}
                      onChange={(e) => updateSectionField(idx, 'image', e.target.value)}
                      placeholder="Image URL (https://...)"
                      className="flex-1 px-3 py-1.5 rounded-lg border border-tan-300 text-xs bg-white"
                    />
                    <label className="cursor-pointer px-3 py-1.5 rounded-lg font-bold text-xs bg-cream-200 hover:bg-peach-100 text-ink-900 flex items-center gap-1">
                      <Upload size={13} />
                      <span>Upload</span>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={(e) =>
                          void onUploadImage(e, `section-${idx}`, (url) =>
                            updateSectionField(idx, 'image', url)
                          )
                        }
                      />
                    </label>
                  </div>
                </div>

                {/* Section Steam Store Link */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Steam Game Store Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={section.steamLink || ''}
                    onChange={(e) => updateSectionField(idx, 'steamLink', e.target.value || undefined)}
                    placeholder="e.g. https://store.steampowered.com/app/1629520/A_Little_to_the_Left/"
                    className="w-full px-3.5 py-2 rounded-xl border border-tan-300 focus:border-peach-400 focus:outline-none bg-white text-xs font-mono text-ink-900"
                  />
                </div>

                {/* Section Google Play Link */}
                <div className="mb-4">
                  <label className="block text-xs font-bold text-ink-900 mb-1">
                    Google Play Store Link (Optional)
                  </label>
                  <input
                    type="url"
                    value={section.playStoreLink || ''}
                    onChange={(e) => updateSectionField(idx, 'playStoreLink', e.target.value || undefined)}
                    placeholder="e.g. https://play.google.com/store/apps/details?id=cc.forestapp"
                    className="w-full px-3.5 py-2 rounded-xl border border-tan-300 focus:border-peach-400 focus:outline-none bg-white text-xs font-mono text-ink-900"
                  />
                </div>

                {/* Optional Callout Sticky Note */}
                <div className="p-3 rounded-xl bg-peach-50/60 border border-peach-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold text-peach-700 flex items-center gap-1.5">
                      <Sparkles size={13} /> Cozy Callout Box (Optional)
                    </span>
                    {section.callout ? (
                      <button
                        type="button"
                        onClick={() => updateSectionField(idx, 'callout', undefined)}
                        className="text-[11px] font-bold text-red-500 hover:underline"
                      >
                        Remove Callout
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() =>
                          updateSectionField(idx, 'callout', {
                            title: 'Cozy Tip',
                            text: 'Add your relaxing recommendation or secret here.',
                          })
                        }
                        className="text-[11px] font-bold text-peach-600 hover:underline"
                      >
                        + Add Callout Box
                      </button>
                    )}
                  </div>

                  {section.callout && (
                    <div className="space-y-2 mt-2">
                      <input
                        type="text"
                        value={section.callout.title}
                        onChange={(e) =>
                          updateSectionField(idx, 'callout', {
                            ...section.callout!,
                            title: e.target.value,
                          })
                        }
                        placeholder="Callout Title (e.g. Cozy Tip)"
                        className="w-full px-3 py-1.5 rounded-lg border border-peach-300 text-xs font-bold bg-white"
                      />
                      <textarea
                        value={section.callout.text}
                        onChange={(e) =>
                          updateSectionField(idx, 'callout', {
                            ...section.callout!,
                            text: e.target.value,
                          })
                        }
                        rows={2}
                        placeholder="Callout text..."
                        className="w-full px-3 py-1.5 rounded-lg border border-peach-300 text-xs bg-white"
                      />
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={addSection}
            className="w-full mt-6 border-2 border-dashed border-tan-300 rounded-2xl p-4 text-tan-600 font-bold hover:border-peach-400 hover:bg-peach-50 hover:text-peach-700 transition-colors flex justify-center items-center gap-2"
          >
            <Plus size={18} /> Add Another Section
          </button>
        </div>

        {/* Submit Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-tan-100 pt-6">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 rounded-xl text-xs font-bold text-tan-500 hover:text-ink-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="site-button bg-peach-500 text-white hover:bg-peach-600 shadow-cozy-sm"
          >
            <Save size={18} /> {isNew ? 'Publish Article' : 'Save Changes'}
          </button>
        </div>
      </form>
    </div>
  );
}
