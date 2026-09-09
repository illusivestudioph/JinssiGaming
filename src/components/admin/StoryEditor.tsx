import { useState, useEffect, useRef } from 'react';
import type { Story, StoryChapter, StoryGenre } from '@/data/stories';
import { storyGenres } from '@/data/stories';
import { supabase } from '@/lib/supabase';
import {
  ChevronLeft,
  Save,
  Plus,
  Trash2,
  BookOpen,
  Coffee,
  CheckCircle,
  RefreshCw,
  Upload,
  ArrowUp,
  ArrowDown,
  Sparkles,
  FileText,
  Clock,
  BookMarked,
} from 'lucide-react';

interface StoryEditorProps {
  story: Story;
  onSave: (story: Story) => void;
  onCancel: () => void;
  isNew?: boolean;
}

const STORY_DRAFT_KEY = 'jinssi-admin-editing-story-draft';

export function StoryEditor({
  story: initialStory,
  onSave,
  onCancel,
  isNew = false,
}: StoryEditorProps) {
  const [story, setStory] = useState<Story>(() => {
    // Check if there is an existing uncommitted draft for this story
    try {
      const raw = localStorage.getItem(STORY_DRAFT_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.story && parsed.story.id === initialStory.id) {
          return parsed.story;
        }
      }
    } catch {
      // ignore
    }
    return initialStory;
  });

  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [quickPasteText, setQuickPasteText] = useState('');
  const [showQuickPaste, setShowQuickPaste] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [lastAutoSavedAt, setLastAutoSavedAt] = useState<string | null>(null);

  // Auto-save draft to localStorage
  useEffect(() => {
    setAutoSaveStatus('saving');
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(
          STORY_DRAFT_KEY,
          JSON.stringify({ story, timestamp: Date.now() })
        );
        setAutoSaveStatus('saved');
        setLastAutoSavedAt(new Date().toLocaleTimeString());
      } catch {
        // ignore
      }
    }, 1200);

    return () => clearTimeout(timer);
  }, [story]);

  const activeChapter = story.chapters[activeChapterIndex] || story.chapters[0];

  const handleUpdateActiveChapter = (updates: Partial<StoryChapter>) => {
    const updatedChapters = story.chapters.map((ch, idx) => {
      if (idx === activeChapterIndex) {
        const updated = { ...ch, ...updates };
        // Recalculate word count if content changed
        if (updates.content) {
          const totalWords = updates.content.reduce((sum, p) => {
            return sum + p.trim().split(/\s+/).filter(Boolean).length;
          }, 0);
          updated.wordCount = totalWords;
          updated.readTimeMinutes = Math.max(1, Math.ceil(totalWords / 200));
        }
        return updated;
      }
      return ch;
    });

    setStory({
      ...story,
      chapters: updatedChapters,
      totalChapters: updatedChapters.length,
    });
  };

  const handleAddChapter = () => {
    const nextNumber = story.chapters.length + 1;
    const newChapter: StoryChapter = {
      id: `ch-${Date.now()}`,
      chapterNumber: nextNumber,
      title: `Chapter ${nextNumber}: New Chapter`,
      wordCount: 0,
      readTimeMinutes: 1,
      publishedDate: new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      content: ['Write or paste your story paragraphs here...'],
    };

    const newChapters = [...story.chapters, newChapter];
    setStory({
      ...story,
      chapters: newChapters,
      totalChapters: newChapters.length,
    });
    setActiveChapterIndex(newChapters.length - 1);
  };

  const handleDeleteChapter = (indexToDelete: number) => {
    if (story.chapters.length <= 1) {
      alert('A story must have at least one chapter.');
      return;
    }
    if (!confirm('Are you sure you want to delete this chapter?')) return;

    const newChapters = story.chapters
      .filter((_, idx) => idx !== indexToDelete)
      .map((ch, idx) => ({
        ...ch,
        chapterNumber: idx + 1,
      }));

    setStory({
      ...story,
      chapters: newChapters,
      totalChapters: newChapters.length,
    });
    setActiveChapterIndex(Math.max(0, indexToDelete - 1));
  };

  const handleMoveChapter = (index: number, direction: 'up' | 'down') => {
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= story.chapters.length) return;

    const newChapters = [...story.chapters];
    const temp = newChapters[index];
    newChapters[index] = newChapters[targetIndex];
    newChapters[targetIndex] = temp;

    // Renumber chapters
    const renumbered = newChapters.map((ch, idx) => ({
      ...ch,
      chapterNumber: idx + 1,
    }));

    setStory({
      ...story,
      chapters: renumbered,
    });
    setActiveChapterIndex(targetIndex);
  };

  const handleConvertQuickPaste = () => {
    if (!quickPasteText.trim()) return;

    // Split text by double newlines into clean paragraphs
    const paragraphs = quickPasteText
      .split(/\n\s*\n/)
      .map((p) => p.trim().replace(/\r/g, ''))
      .filter((p) => p.length > 0);

    if (paragraphs.length > 0) {
      handleUpdateActiveChapter({ content: paragraphs });
      setQuickPasteText('');
      setShowQuickPaste(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const filePath = `story-${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;

    try {
      const { error } = await supabase.storage
        .from('site-images')
        .upload(filePath, file, { cacheControl: '3600', upsert: false });

      if (error) {
        alert(`Upload error: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
      setStory({ ...story, coverImage: data.publicUrl });
    } catch (err) {
      alert('Could not upload image. Please enter an image URL directly.');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      localStorage.removeItem(STORY_DRAFT_KEY);
    } catch {
      // ignore
    }
    onSave(story);
  };

  const totalWords = story.chapters.reduce((sum, ch) => sum + ch.wordCount, 0);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 animate-fade-in">
      {/* Top Bar with Return & Auto-Save status */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <button
          type="button"
          onClick={onCancel}
          className="flex items-center gap-2 text-tan-600 hover:text-ink-900 font-bold transition-colors"
        >
          <ChevronLeft size={20} /> Back to Bookshelf
        </button>

        <div className="flex items-center gap-3">
          {autoSaveStatus === 'saving' ? (
            <span className="flex items-center gap-1.5 text-xs font-bold text-earth-700 bg-earth-100 px-3 py-1.5 rounded-full animate-pulse">
              <RefreshCw size={13} className="animate-spin" /> Auto-saving draft...
            </span>
          ) : (
            <span className="flex items-center gap-1.5 text-xs font-bold text-sage-700 bg-sage-100 px-3 py-1.5 rounded-full">
              <CheckCircle size={13} /> Auto-saved {lastAutoSavedAt ? `(${lastAutoSavedAt})` : 'to disk'}
            </span>
          )}

          <button
            type="button"
            onClick={handleSubmit}
            className="site-button bg-peach-500 hover:bg-peach-600 text-ink-900 font-bold flex items-center gap-2 text-sm shadow-cozy-sm"
          >
            <Save size={16} /> Save & Return
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Story Metadata Card */}
        <div className="notepad-card p-6 sm:p-8 space-y-6">
          <div className="border-b border-tan-200 pb-4">
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">
              {isNew ? 'Create New Story' : 'Edit Story & Chapters'}
            </h2>
            <p className="text-xs text-tan-600 mt-1">
              Manage cover artwork, synopsis, and serialized chapters. Changes auto-save continuously.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Title */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                Book Title *
              </label>
              <input
                type="text"
                required
                value={story.title}
                onChange={(e) => setStory({ ...story, title: e.target.value })}
                placeholder="e.g. The Midnight Barista of Rain City"
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white font-bold"
              />
            </div>

            {/* Slug */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                URL Slug *
              </label>
              <input
                type="text"
                required
                value={story.slug}
                onChange={(e) => setStory({ ...story, slug: e.target.value })}
                placeholder="e.g. the-midnight-barista"
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white font-mono text-sm"
              />
            </div>

            {/* Author */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                Author Name *
              </label>
              <input
                type="text"
                required
                value={story.author}
                onChange={(e) => setStory({ ...story, author: e.target.value })}
                placeholder="e.g. Jinssi"
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white"
              />
            </div>

            {/* Author Role */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                Author Role / Byline
              </label>
              <input
                type="text"
                value={story.authorRole}
                onChange={(e) => setStory({ ...story, authorRole: e.target.value })}
                placeholder="e.g. Fiction Writer & Barista"
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white"
              />
            </div>

            {/* Genre */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                Genre
              </label>
              <select
                value={story.genre}
                onChange={(e) => setStory({ ...story, genre: e.target.value as StoryGenre })}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white font-semibold"
              >
                {storyGenres
                  .filter((g) => g !== 'All')
                  .map((g) => (
                    <option key={g} value={g}>
                      {g}
                    </option>
                  ))}
              </select>
            </div>

            {/* Status */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
                Publishing Status
              </label>
              <select
                value={story.status}
                onChange={(e) =>
                  setStory({ ...story, status: e.target.value as 'Ongoing' | 'Completed' })
                }
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white font-semibold"
              >
                <option value="Ongoing">Ongoing (More chapters coming)</option>
                <option value="Completed">Completed (Finished book)</option>
              </select>
            </div>
          </div>

          {/* Synopsis */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
              Book Synopsis / Blurb
            </label>
            <textarea
              rows={3}
              value={story.synopsis}
              onChange={(e) => setStory({ ...story, synopsis: e.target.value })}
              placeholder="A brief teaser to captivate readers..."
              className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white text-sm leading-relaxed"
            />
          </div>

          {/* Cover Artwork */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
              Cover Image URL
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={story.coverImage}
                onChange={(e) => setStory({ ...story, coverImage: e.target.value })}
                placeholder="https://..."
                className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white text-sm"
              />
              <label className="flex items-center justify-center px-4 py-3 bg-peach-100 text-peach-700 font-bold rounded-xl cursor-pointer hover:bg-peach-200 transition-colors whitespace-nowrap text-xs">
                {uploading ? 'Uploading...' : <><Upload size={16} className="mr-1.5" /> Upload File</>}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={uploading}
                />
              </label>
            </div>
            {story.coverImage && (
              <div className="mt-3 flex items-center gap-4">
                <img
                  src={story.coverImage}
                  alt={story.coverAlt || 'Cover preview'}
                  className="h-24 w-18 object-cover rounded-lg border border-tan-200 shadow-cozy-sm"
                />
                <span className="text-xs text-tan-500 font-medium">Cover preview</span>
              </div>
            )}
          </div>

          {/* Tags */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-2">
              Tags (comma separated)
            </label>
            <input
              type="text"
              value={story.tags.join(', ')}
              onChange={(e) =>
                setStory({
                  ...story,
                  tags: e.target.value
                    .split(',')
                    .map((t) => t.trim())
                    .filter(Boolean),
                })
              }
              placeholder="e.g. Coffee, Rain, Slice of Life, Comfort"
              className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-white text-sm"
            />
          </div>
        </div>

        {/* Chapters Section */}
        <div className="notepad-card p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tan-200 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <BookMarked className="w-5 h-5 text-peach-500" />
                <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-900">
                  Chapters ({story.chapters.length})
                </h3>
              </div>
              <p className="text-xs text-tan-600 mt-1">
                Total Story Word Count: ~{totalWords.toLocaleString()} words
              </p>
            </div>

            <button
              type="button"
              onClick={handleAddChapter}
              className="site-button bg-earth-500 hover:bg-earth-600 text-white font-bold text-xs flex items-center gap-1.5"
            >
              <Plus size={16} /> Add Chapter
            </button>
          </div>

          {/* Chapter Tabs & Selector */}
          <div className="flex flex-wrap gap-2 border-b border-tan-200 pb-3">
            {story.chapters.map((ch, idx) => (
              <button
                key={ch.id}
                type="button"
                onClick={() => setActiveChapterIndex(idx)}
                className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeChapterIndex === idx
                    ? 'bg-peach-400 text-ink-900 shadow-cozy-sm'
                    : 'bg-cream-100 hover:bg-cream-200 text-tan-600'
                }`}
              >
                <span>Ch. {ch.chapterNumber}</span>
                <span className="opacity-70 text-[11px]">({ch.wordCount}w)</span>
              </button>
            ))}
          </div>

          {/* Active Chapter Details */}
          {activeChapter && (
            <div className="space-y-6 bg-cream-50 p-6 rounded-2xl border border-tan-200">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-tan-200 pb-4">
                <h4 className="font-display font-bold text-lg text-ink-900">
                  Editing Chapter {activeChapter.chapterNumber}
                </h4>

                <div className="flex items-center gap-1">
                  {/* Move Up */}
                  <button
                    type="button"
                    onClick={() => handleMoveChapter(activeChapterIndex, 'up')}
                    disabled={activeChapterIndex === 0}
                    className="p-1.5 rounded-lg border border-tan-200 bg-white hover:bg-cream-100 disabled:opacity-40"
                    title="Move chapter earlier"
                  >
                    <ArrowUp size={14} />
                  </button>

                  {/* Move Down */}
                  <button
                    type="button"
                    onClick={() => handleMoveChapter(activeChapterIndex, 'down')}
                    disabled={activeChapterIndex === story.chapters.length - 1}
                    className="p-1.5 rounded-lg border border-tan-200 bg-white hover:bg-cream-100 disabled:opacity-40"
                    title="Move chapter later"
                  >
                    <ArrowDown size={14} />
                  </button>

                  {/* Delete Chapter */}
                  <button
                    type="button"
                    onClick={() => handleDeleteChapter(activeChapterIndex)}
                    className="p-1.5 rounded-lg border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 ml-2"
                    title="Delete chapter"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-1">
                    Chapter Title
                  </label>
                  <input
                    type="text"
                    value={activeChapter.title}
                    onChange={(e) => handleUpdateActiveChapter({ title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-tan-200 bg-white font-semibold text-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-1">
                    Published Date / Era
                  </label>
                  <input
                    type="text"
                    value={activeChapter.publishedDate}
                    onChange={(e) => handleUpdateActiveChapter({ publishedDate: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-tan-200 bg-white text-sm"
                  />
                </div>
              </div>

              {/* Author Note */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-600 mb-1 flex items-center gap-1.5">
                  <Coffee size={14} className="text-peach-500" />
                  <span>Author's Note (Optional)</span>
                </label>
                <input
                  type="text"
                  value={activeChapter.authorNote || ''}
                  onChange={(e) => handleUpdateActiveChapter({ authorNote: e.target.value })}
                  placeholder="e.g. Best read with a warm cup of Earl Grey tea..."
                  className="w-full px-4 py-2.5 rounded-xl border border-tan-200 bg-white text-xs italic"
                />
              </div>

              {/* Quick Text Paste Tool Toggle */}
              <div className="pt-2 border-t border-tan-200">
                <div className="flex items-center justify-between mb-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-tan-600">
                    Chapter Paragraphs ({activeChapter.content.length})
                  </label>
                  <button
                    type="button"
                    onClick={() => setShowQuickPaste(!showQuickPaste)}
                    className="text-xs font-bold text-peach-600 hover:text-peach-700 underline"
                  >
                    {showQuickPaste ? 'Hide Quick-Paste Helper' : '+ Quick-Paste Entire Text / Chapter'}
                  </button>
                </div>

                {showQuickPaste && (
                  <div className="mb-4 p-4 rounded-xl bg-white border-2 border-peach-200 space-y-3">
                    <p className="text-xs text-tan-600">
                      Paste full chapter text below. Paragraphs separated by blank lines will be automatically split into clean reader sections and word-counted.
                    </p>
                    <textarea
                      rows={6}
                      value={quickPasteText}
                      onChange={(e) => setQuickPasteText(e.target.value)}
                      placeholder="Paste your raw chapter text here..."
                      className="w-full p-3 rounded-lg border border-tan-200 font-sans text-xs leading-relaxed"
                    />
                    <button
                      type="button"
                      onClick={handleConvertQuickPaste}
                      className="px-4 py-2 rounded-xl bg-peach-400 hover:bg-peach-500 text-ink-900 font-bold text-xs"
                    >
                      Convert Text to Paragraphs
                    </button>
                  </div>
                )}

                {/* Paragraphs List */}
                <div className="space-y-3">
                  {activeChapter.content.map((para, pIdx) => (
                    <div key={pIdx} className="flex items-start gap-2">
                      <span className="text-[11px] font-bold text-tan-400 w-6 pt-2 text-right shrink-0">
                        {pIdx + 1}.
                      </span>
                      <textarea
                        rows={3}
                        value={para}
                        onChange={(e) => {
                          const updated = [...activeChapter.content];
                          updated[pIdx] = e.target.value;
                          handleUpdateActiveChapter({ content: updated });
                        }}
                        className="flex-1 p-3 rounded-xl border border-tan-200 bg-white text-xs leading-relaxed focus:border-peach-400 focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (activeChapter.content.length <= 1) return;
                          const updated = activeChapter.content.filter((_, idx) => idx !== pIdx);
                          handleUpdateActiveChapter({ content: updated });
                        }}
                        className="p-2 text-tan-400 hover:text-red-500 pt-3"
                        title="Remove paragraph"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => {
                      const updated = [...activeChapter.content, 'New paragraph...'];
                      handleUpdateActiveChapter({ content: updated });
                    }}
                    className="text-xs font-bold text-earth-600 hover:text-earth-700 py-2 px-3 rounded-lg bg-earth-50 hover:bg-earth-100 flex items-center gap-1 mt-2"
                  >
                    <Plus size={14} /> Add Paragraph
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Action Footer */}
        <div className="flex items-center justify-between pt-4 border-t border-tan-200">
          <button
            type="button"
            onClick={onCancel}
            className="px-5 py-2.5 rounded-xl border border-tan-200 hover:bg-cream-100 text-tan-600 font-bold text-sm transition-colors"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="site-button bg-peach-500 hover:bg-peach-600 text-ink-900 font-bold flex items-center gap-2 text-sm shadow-cozy-sm"
          >
            <Save size={16} /> Save All Changes
          </button>
        </div>
      </form>
    </div>
  );
}
