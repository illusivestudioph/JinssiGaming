import { useState, useEffect, useRef } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { Game, WalkthroughSection } from '@/data/games';
import type { Article } from '@/data/articles';
import { ArticleManager } from './admin/ArticleManager';
import { ArticleEditor } from './admin/ArticleEditor';
import { StoryEditor } from './admin/StoryEditor';
import type { Story } from '@/data/stories';
import { supabase } from '@/lib/supabase';
import { 
  Trash2, 
  Plus, 
  Image as ImageIcon, 
  Edit2, 
  ChevronLeft, 
  ChevronUp,
  ChevronDown,
  Save, 
  Upload, 
  Cloud, 
  RefreshCw, 
  CheckCircle, 
  AlertCircle, 
  WifiOff, 
  AlertTriangle, 
  RotateCcw,
  BookOpen,
  BookMarked,
  ExternalLink
} from 'lucide-react';

const DRAFT_STORAGE_KEY = 'jinssi-admin-editing-game-draft';

export function AdminDashboard() {
  const { 
    games, 
    articles,
    heroImage, 
    logoImage, 
    ctaLinks, 
    syncStatus, 
    lastSyncedAt, 
    forceCloudSync, 
    setHeroImage, 
    setLogoImage, 
    setCtaLinks, 
    addGame, 
    updateGame, 
    removeGame,
    reorderGame,
    addArticle,
    updateArticle,
    removeArticle,
    stories,
    addStory,
    updateStory,
    removeStory
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<'assets' | 'games' | 'articles' | 'stories'>('assets');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [assetSaveMessage, setAssetSaveMessage] = useState('');
  
  // Auto-save & draft recovery states
  const [autoSaveStatus, setAutoSaveStatus] = useState<'saved' | 'saving'>('saved');
  const [lastAutoSavedAt, setLastAutoSavedAt] = useState<string | null>(null);
  const [savedDraft, setSavedDraft] = useState<{ game: Game; timestamp: number } | null>(null);

  // Check for auto-saved draft in localStorage on mount (e.g. after sudden PC shutdown or crash)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed?.game && parsed?.timestamp) {
          setSavedDraft(parsed);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Continuous auto-saving: 
  // 1. Immediate synchronous write to localStorage draft key (0ms latency for sudden shutdown protection)
  // 2. Debounced auto-sync to SiteContentContext.updateGame (propagates to cloud & other tabs)
  useEffect(() => {
    if (!editingGame) return;

    setAutoSaveStatus('saving');

    try {
      localStorage.setItem(
        DRAFT_STORAGE_KEY,
        JSON.stringify({ game: editingGame, timestamp: Date.now() })
      );
    } catch {
      // ignore storage quota errors
    }

    const timer = setTimeout(() => {
      updateGame(editingGame);
      setAutoSaveStatus('saved');
      setLastAutoSavedAt(new Date().toLocaleTimeString());
    }, 400);

    return () => clearTimeout(timer);
  }, [editingGame, updateGame]);

  // Unload guard: Warn user if navigating away while an image upload is actively uploading
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (uploadingKey) {
        e.preventDefault();
        e.returnValue = '';
      }
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [uploadingKey]);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, uploadKey: string, onComplete: (url: string) => void) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedKey(null);
    setUploadingKey(uploadKey);

    const filePath = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;
    try {
      const { error } = await supabase.storage.from('site-images').upload(filePath, file, {
        cacheControl: '3600',
        contentType: file.type,
        upsert: false,
      });

      if (error) {
        alert(`Image upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
      onComplete(data.publicUrl);
      setUploadedKey(uploadKey);
    } finally {
      setUploadingKey(null);
    }
  };

  const handleAddGame = () => {
    const newGame: Game = {
      id: `game-${Date.now()}`,
      title: 'New Game',
      developer: 'Your Studio',
      gameLink: '',
      category: 'Cozy Games',
      description: 'Add a description for this game.',
      editorNote: '',
      coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      coverAlt: 'Placeholder cover',
      accentColor: '#E2A88D',
      walkthrough: []
    };
    addGame(newGame);
    setEditingGame(newGame);
  };

  const handleSaveGame = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingGame) {
      updateGame(editingGame);
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
      setEditingGame(null);
    }
  };

  const handleBackToDashboard = () => {
    if (editingGame) {
      updateGame(editingGame);
      try {
        localStorage.removeItem(DRAFT_STORAGE_KEY);
      } catch {
        // ignore
      }
      setEditingGame(null);
    }
  };

  const handleResumeDraft = () => {
    if (!savedDraft) return;
    const exists = games.some((g) => g.id === savedDraft.game.id);
    if (!exists) {
      addGame(savedDraft.game);
    } else {
      updateGame(savedDraft.game);
    }
    setEditingGame(savedDraft.game);
    setSavedDraft(null);
  };

  const handleDiscardDraft = () => {
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setSavedDraft(null);
  };

  const handleSaveAssets = () => {
    void forceCloudSync();
    setAssetSaveMessage('Site assets auto-saved and synced.');
    window.setTimeout(() => setAssetSaveMessage(''), 2500);
  };

  // --- Walkthrough Editor Helpers ---
  const addWalkthroughSection = () => {
    if (!editingGame) return;
    const newSection: WalkthroughSection = {
      id: `section-${Date.now()}`,
      title: 'New Section',
      steps: []
    };
    setEditingGame({ ...editingGame, walkthrough: [...editingGame.walkthrough, newSection] });
  };

  const updateSectionTitle = (sectionIndex: number, newTitle: string) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex] = { ...newWalkthrough[sectionIndex], title: newTitle };
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const removeSection = (sectionIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = editingGame.walkthrough.filter((_, idx) => idx !== sectionIndex);
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const addStep = (sectionIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps.push({
      id: `step-${Date.now()}`,
      title: 'New step',
      description: 'New step instruction',
      image: '',
      imageAlt: 'Step illustration',
      hasSpoiler: false,
      spoilerText: '',
    });
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const updateStep = (
    sectionIndex: number, 
    stepIndex: number, 
    field: 'title' | 'description' | 'image' | 'hasSpoiler' | 'spoilerText', 
    value: string | boolean
  ) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps[stepIndex] = { 
      ...newWalkthrough[sectionIndex].steps[stepIndex], 
      [field]: value 
    };
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  const removeStep = (sectionIndex: number, stepIndex: number) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex].steps = newWalkthrough[sectionIndex].steps.filter((_, idx) => idx !== stepIndex);
    setEditingGame({ ...editingGame, walkthrough: newWalkthrough });
  };

  // --- ARTICLE EDITOR VIEW ---
  if (editingArticle) {
    return (
      <ArticleEditor
        article={editingArticle}
        isNew={isNewArticle}
        games={games}
        onSave={(saved) => {
          if (isNewArticle) {
            addArticle(saved);
          } else {
            updateArticle(saved);
          }
          setEditingArticle(null);
          setIsNewArticle(false);
        }}
        onCancel={() => {
          setEditingArticle(null);
          setIsNewArticle(false);
        }}
        onUploadImage={handleImageUpload}
        uploadingKey={uploadingKey}
      />
    );
  }

  // --- STORY EDITOR VIEW ---
  if (editingStory) {
    return (
      <StoryEditor
        story={editingStory}
        isNew={isNewStory}
        onSave={(updatedStory) => {
          if (isNewStory) {
            addStory(updatedStory);
          } else {
            updateStory(updatedStory);
          }
          setEditingStory(null);
          setIsNewStory(false);
        }}
        onCancel={() => {
          setEditingStory(null);
          setIsNewStory(false);
        }}
      />
    );
  }

  // --- GAME EDITOR VIEW ---
  if (editingGame) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-10 animate-fade-in">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <button 
            type="button"
            onClick={handleBackToDashboard} 
            className="flex items-center gap-2 text-tan-500 hover:text-ink-900 font-bold transition-colors"
          >
            <ChevronLeft size={20} /> Back to Dashboard
          </button>

          {/* Auto-save & Sync status pills */}
          <div className="flex items-center gap-2">
            {autoSaveStatus === 'saving' ? (
              <span className="flex items-center gap-1.5 text-xs font-bold text-earth-700 bg-earth-100 px-3 py-1.5 rounded-full animate-pulse">
                <RefreshCw size={13} className="animate-spin" /> Auto-saving draft...
              </span>
            ) : (
              <span className="flex items-center gap-1.5 text-xs font-bold text-sage-700 bg-sage-100 px-3 py-1.5 rounded-full">
                <CheckCircle size={13} /> Auto-saved {lastAutoSavedAt ? `(${lastAutoSavedAt})` : 'to disk'}
              </span>
            )}

            {syncStatus === 'saving' && (
              <span className="flex items-center gap-1 text-xs font-semibold text-tan-600 bg-cream-200 px-2.5 py-1 rounded-full">
                <Cloud size={12} className="animate-pulse" /> Cloud syncing...
              </span>
            )}
            {syncStatus === 'synced' && (
              <span className="flex items-center gap-1 text-xs font-semibold text-sage-600 bg-sage-50 px-2.5 py-1 rounded-full">
                <Cloud size={12} /> Synced
              </span>
            )}
          </div>
        </div>

        <form onSubmit={handleSaveGame} className="notepad-card p-8">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b-2 border-tan-100 pb-4 mb-6">
            <div>
              <h2 className="text-3xl font-display font-bold text-ink-900">Edit Game</h2>
              <p className="text-xs font-semibold text-tan-500 mt-1">
                All changes auto-save continuously to protect against sudden PC shutdown or browser close.
              </p>
            </div>
            <button 
              type="submit" 
              className="site-button bg-earth-500 text-white hover:bg-earth-600 flex items-center gap-2 text-sm"
            >
              <Save size={16} /> Save & Return
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div>
              <label className="block font-bold text-ink-900 mb-2">Game Title</label>
              <input 
                value={editingGame.title}
                onChange={(e) => setEditingGame({...editingGame, title: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-ink-900 mb-2">Developer</label>
              <input
                value={editingGame.developer}
                onChange={(e) => setEditingGame({...editingGame, developer: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold"
                required
              />
            </div>
            <div>
              <label className="block font-bold text-ink-900 mb-2">Category</label>
              <div className="flex flex-col gap-2">
                <select
                  value={['Cozy Games', 'Puzzle', 'Organization', 'Life Sim'].includes(editingGame.category) ? editingGame.category : 'Custom'}
                  onChange={(e) => {
                    const val = e.target.value;
                    if (val !== 'Custom') {
                      setEditingGame({ ...editingGame, category: val });
                    } else if (['Cozy Games', 'Puzzle', 'Organization', 'Life Sim'].includes(editingGame.category)) {
                      setEditingGame({ ...editingGame, category: 'Custom Category' });
                    }
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 font-bold text-ink-900"
                >
                  <option value="Cozy Games">Cozy Games</option>
                  <option value="Puzzle">Puzzle</option>
                  <option value="Organization">Organization</option>
                  <option value="Life Sim">Life Sim</option>
                  <option value="Custom">Custom / Other Category...</option>
                </select>
                {(!['Cozy Games', 'Puzzle', 'Organization', 'Life Sim'].includes(editingGame.category) || editingGame.category === 'Custom Category') && (
                  <input
                    value={editingGame.category}
                    onChange={(e) => setEditingGame({ ...editingGame, category: e.target.value })}
                    placeholder="Enter custom category name (e.g. Cooking Sim, Story RPG)..."
                    className="w-full px-4 py-2.5 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-white text-sm font-semibold"
                  />
                )}
              </div>
            </div>
            <div>
              <label className="block font-bold text-ink-900 mb-2">Game Link</label>
              <input
                type="url"
                value={editingGame.gameLink || ''}
                onChange={(e) => setEditingGame({...editingGame, gameLink: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50"
                placeholder="https://..."
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Game Description</label>
              <textarea
                value={editingGame.description}
                onChange={(e) => setEditingGame({...editingGame, description: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 min-h-[100px]"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Editor&apos;s Note / Review</label>
              <textarea
                value={editingGame.editorNote || ''}
                onChange={(e) => setEditingGame({...editingGame, editorNote: e.target.value})}
                className="w-full px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 min-h-[120px]"
                placeholder="Share a personal take, praise, warning, or bit of playful ranting about this game..."
              />
              <p className="mt-2 text-sm font-semibold text-tan-500">
                This appears on the walkthrough page as your personal note about the game.
              </p>
            </div>
            <div>
              <label className="block font-bold text-ink-900 mb-2">Accent Color (Hex)</label>
              <div className="flex gap-3">
                <input 
                  type="color" 
                  value={editingGame.accentColor}
                  onChange={(e) => setEditingGame({...editingGame, accentColor: e.target.value})}
                  className="h-12 w-12 rounded-lg cursor-pointer"
                />
                <input 
                  value={editingGame.accentColor}
                  onChange={(e) => setEditingGame({...editingGame, accentColor: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50 uppercase font-mono"
                />
              </div>
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold text-ink-900 mb-2">Cover Image URL</label>
              <div className="flex gap-2">
                <input 
                  value={editingGame.coverImage}
                  onChange={(e) => setEditingGame({...editingGame, coverImage: e.target.value})}
                  className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-cream-50"
                />
                <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                  {uploadingKey === 'game-cover' ? 'Uploading...' : uploadedKey === 'game-cover' ? 'Uploaded' : <><Upload size={18} className="mr-2" /> Upload</>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'game-cover', (base64) => setEditingGame({...editingGame, coverImage: base64}))} />
                </label>
                {uploadedKey === 'game-cover' && <span className="self-center text-sm font-bold text-sage-600" role="status">✓ Complete</span>}
              </div>
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-ink-900 mb-4">Walkthrough Guides</h3>
          
          <div className="flex flex-col gap-8">
            {editingGame.walkthrough.map((section, sIndex) => (
              <div key={sIndex} className="notepad-card p-6 relative">
                <button 
                  type="button" 
                  onClick={() => removeSection(sIndex)}
                  className="absolute top-4 right-4 text-red-400 hover:text-red-600 bg-white p-2 rounded-lg shadow-sm border border-tan-200"
                  title="Delete Section"
                >
                  <Trash2 size={18} />
                </button>

                <div className="mb-6 mr-12">
                  <label className="block font-bold text-tan-600 mb-2 text-sm uppercase tracking-wider">Section {sIndex + 1} Title</label>
                  <input 
                    value={section.title}
                    onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border-2 border-tan-200 focus:border-peach-400 focus:outline-none font-bold text-lg"
                  />
                </div>

                <div className="flex flex-col gap-4 pl-4 border-l-4 border-tan-200">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="notepad-step p-4 flex flex-col gap-3 relative group">
                      <button 
                        type="button"
                        onClick={() => removeStep(sIndex, stepIndex)}
                        className="absolute -right-3 -top-3 bg-red-100 text-red-500 hover:bg-red-500 hover:text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all shadow-sm"
                      >
                        <Trash2 size={14} />
                      </button>
                      
                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step {stepIndex + 1} Title</label>
                        <input
                          value={step.title}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'title', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none mb-3"
                          placeholder="Step title"
                          required
                        />
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Instructions / Description</label>
                        <textarea 
                          value={step.description}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'description', e.target.value)}
                          className="w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none min-h-[80px]"
                          required
                        />
                      </div>

                      {/* Step Spoiler Toggle & Hint */}
                      <div className="p-3 bg-cream-100 rounded-lg border border-tan-200 flex flex-col gap-2">
                        <label className="flex items-center gap-2 cursor-pointer text-xs font-bold text-ink-900">
                          <input 
                            type="checkbox"
                            checked={!!step.hasSpoiler}
                            onChange={(e) => {
                              updateStep(sIndex, stepIndex, 'hasSpoiler', e.target.checked);
                              if (e.target.checked && !step.spoilerText) {
                                updateStep(sIndex, stepIndex, 'spoilerText', 'Spoiler warning: Click to reveal solution');
                              }
                            }}
                            className="w-4 h-4 accent-peach-500 rounded cursor-pointer"
                          />
                          <span>Mark this step as a spoiler (blurs / hides solution until clicked)</span>
                        </label>
                        {step.hasSpoiler && (
                          <input
                            value={step.spoilerText || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'spoilerText', e.target.value)}
                            placeholder="Spoiler warning text (e.g. Puzzle solution ahead)..."
                            className="w-full px-3 py-1.5 text-xs rounded-lg border border-tan-200 bg-white focus:outline-none font-medium text-ink-900"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step Image (URL or Upload)</label>
                        <div className="flex gap-2">
                          <input 
                            value={step.image || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'image', e.target.value)}
                            className="flex-1 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm"
                            placeholder="https:// or upload..."
                          />
                          <label className="px-3 py-2 bg-earth-100 text-earth-700 font-bold rounded-lg cursor-pointer hover:bg-earth-200 transition-colors text-xs flex items-center gap-1 whitespace-nowrap">
                            {uploadingKey === `step-${sIndex}-${stepIndex}` ? 'Uploading...' : uploadedKey === `step-${sIndex}-${stepIndex}` ? 'Uploaded' : <><Upload size={14} /> Upload</>}
                            <input 
                              type="file" 
                              accept="image/*" 
                              className="hidden" 
                              onChange={(e) => handleImageUpload(e, `step-${sIndex}-${stepIndex}`, (base64) => updateStep(sIndex, stepIndex, 'image', base64))}
                            />
                          </label>
                          {uploadedKey === `step-${sIndex}-${stepIndex}` && <span className="self-center text-xs font-bold text-sage-600" role="status">✓ Complete</span>}
                        </div>
                        {step.image && (
                          <img src={step.image} alt="Step preview" className="mt-2 h-20 w-full object-cover rounded-lg border border-tan-200" />
                        )}
                      </div>
                    </div>
                  ))}
                  
                  <button 
                    type="button" 
                    onClick={() => addStep(sIndex)}
                    className="self-start text-sm font-bold text-peach-500 hover:text-peach-600 bg-peach-50 px-4 py-2 rounded-lg flex items-center gap-2 mt-2"
                  >
                    <Plus size={16} /> Add Step
                  </button>
                </div>
              </div>
            ))}
          </div>

          <button 
            type="button"
            onClick={addWalkthroughSection}
            className="w-full mt-8 border-2 border-dashed border-tan-300 rounded-xl p-4 text-tan-600 font-bold hover:border-earth-400 hover:bg-earth-50 hover:text-earth-600 transition-colors flex justify-center items-center gap-2"
          >
            <Plus size={20} /> Add New Walkthrough Section
          </button>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t-2 border-tan-100 pt-6">
            <span className="text-xs font-semibold text-tan-500">
              Auto-saved locally. Clicking Save confirms all sections and closes the editor.
            </span>
            <button type="submit" className="site-button bg-earth-500 text-white hover:bg-earth-600">
              <Save size={18} /> Save Changes
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="max-w-5xl mx-auto px-4 py-10 animate-fade-in">
      {/* Draft Recovery Alert (Shown if a crash or power outage occurred while editing) */}
      {savedDraft && !editingGame && (
        <div className="mb-6 p-4 rounded-2xl bg-amber-50 border-2 border-amber-300 shadow-cozy-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 text-amber-700 rounded-xl">
              <AlertTriangle size={22} />
            </div>
            <div>
              <h4 className="font-bold text-ink-900">Auto-saved draft recovered</h4>
              <p className="text-xs text-tan-600 font-medium">
                Found an in-progress draft for <span className="font-bold text-ink-900">"{savedDraft.game.title || 'Untitled Game'}"</span> saved at {new Date(savedDraft.timestamp).toLocaleTimeString()} ({new Date(savedDraft.timestamp).toLocaleDateString()}).
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <button
              type="button"
              onClick={handleResumeDraft}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5 shadow-sm"
            >
              <RotateCcw size={14} /> Resume Editing Draft
            </button>
            <button
              type="button"
              onClick={handleDiscardDraft}
              className="px-3 py-2 text-tan-500 hover:text-red-600 hover:bg-red-50 font-bold rounded-xl text-xs transition-colors"
            >
              Discard Draft
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div>
          <h2 className="text-4xl font-display font-bold text-ink-900 mb-2">Admin Dashboard</h2>
          <p className="text-tan-600 font-semibold">Manage your site's content. Changes auto-save continuously to protect against sudden PC shutdown.</p>
        </div>

        {/* Global Cloud Sync Status Badge & Manual Trigger */}
        <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-2xl border border-tan-200 shadow-cozy-xs">
          {syncStatus === 'saving' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-earth-700 animate-pulse">
              <RefreshCw size={14} className="animate-spin" /> Syncing to cloud...
            </span>
          )}
          {syncStatus === 'synced' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-sage-700">
              <CheckCircle size={14} /> Cloud synced {lastSyncedAt ? `(${lastSyncedAt})` : ''}
            </span>
          )}
          {syncStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-red-700">
              <AlertCircle size={14} /> Cloud sync error (Saved on PC)
            </span>
          )}
          {syncStatus === 'offline' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-tan-700">
              <WifiOff size={14} /> Offline mode (Saved on PC)
            </span>
          )}
          <button
            type="button"
            onClick={() => void forceCloudSync()}
            disabled={syncStatus === 'saving'}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-tan-300 bg-cream-50 hover:bg-cream-100 text-ink-900 transition-colors flex items-center gap-1.5 disabled:opacity-50"
            title="Force cloud synchronization now"
          >
            <Cloud size={14} /> Sync Now
          </button>
        </div>
      </div>

      <div className="flex gap-4 mb-6 border-b-2 border-tan-200 pb-2">
        <button onClick={() => setActiveTab('assets')} className={`font-bold pb-2 ${activeTab === 'assets' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Site Assets</button>
        <button onClick={() => setActiveTab('games')} className={`font-bold pb-2 ${activeTab === 'games' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Manage Games ({games.length})</button>
        <button onClick={() => setActiveTab('articles')} className={`font-bold pb-2 ${activeTab === 'articles' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Cozy Journal ({articles.length})</button>
        <button onClick={() => setActiveTab('stories')} className={`font-bold pb-2 ${activeTab === 'stories' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Cozy Bookshelf ({stories.length})</button>
      </div>

      {activeTab === 'assets' && (
        <div className="notepad-card p-6 flex flex-col gap-6">
          <div>
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Hero Banner</label>
            <div className="flex gap-2">
              <input 
                value={heroImage} 
                onChange={(e) => setHeroImage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none"
              />
              <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                {uploadingKey === 'hero' ? 'Uploading...' : uploadedKey === 'hero' ? 'Uploaded' : <><Upload size={18} className="mr-2" /> Upload</>}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'hero', setHeroImage)} />
              </label>
              {uploadedKey === 'hero' && <span className="self-center text-sm font-bold text-sage-600" role="status">✓ Complete</span>}
            </div>
            {heroImage && <img src={heroImage} className="mt-3 h-32 w-full max-w-xl object-cover rounded-lg border border-tan-200" alt="Hero preview" />}
          </div>
          
          <div className="pb-6 border-b-2 border-tan-100">
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Logo Image</label>
            <div className="flex gap-2">
              <input 
                value={logoImage} 
                onChange={(e) => setLogoImage(e.target.value)}
                className="flex-1 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none"
              />
              <label className="flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap">
                {uploadingKey === 'logo' ? 'Uploading...' : uploadedKey === 'logo' ? 'Uploaded' : <><Upload size={18} className="mr-2" /> Upload</>}
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logo', setLogoImage)} />
              </label>
              {uploadedKey === 'logo' && <span className="self-center text-sm font-bold text-sage-600" role="status">✓ Complete</span>}
            </div>
            {logoImage && <img src={logoImage} className="mt-3 h-16 w-16 object-cover rounded-full border border-tan-200" alt="Logo preview" />}
          </div>

          <div className="flex flex-wrap items-center justify-end gap-3 border-t-2 border-tan-100 pt-5">
            {assetSaveMessage && <span className="text-sm font-bold text-sage-600" role="status">{assetSaveMessage}</span>}
            <button type="button" onClick={handleSaveAssets} className="site-button bg-earth-500 text-white hover:bg-earth-600">
              <Save size={18} /> Save & Sync Assets
            </button>
          </div>

          {/* CTA LINKS & PERMANENT MULTI-WALLET CONFIGURATOR */}
          <div>
            <label className="block font-bold text-ink-900 mb-4 text-xl">Footer Call-to-Action Buttons & Payment Modals</label>
            <div className="flex flex-col gap-6">
              {ctaLinks?.map((link, index) => (
                <div key={link.id} className="notepad-card p-5 flex flex-col gap-4">
                  <div className="flex gap-3 items-center">
                    <input 
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...ctaLinks];
                        newLinks[index].label = e.target.value;
                        setCtaLinks(newLinks);
                      }}
                      placeholder="Button Label (e.g. Buy me coffee ($5))"
                      className="w-1/3 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none font-bold"
                    />
                    <input 
                      value={link.url}
                      onChange={(e) => {
                        const newLinks = [...ctaLinks];
                        newLinks[index].url = e.target.value;
                        setCtaLinks(newLinks);
                      }}
                      placeholder="Fallback URL..."
                      className="flex-1 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none"
                    />
                    <button 
                      onClick={() => setCtaLinks(ctaLinks.filter((_, i) => i !== index))}
                      className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      title="Delete Button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>

                  {/* Toggle Button to Turn ANY Button into a Payment Popup */}
                  <div className="notepad-step flex items-center justify-between px-4 py-3">
                    <div className="flex items-center gap-2">
                      <input 
                        type="checkbox"
                        id={`enable-payment-${link.id}`}
                        checked={!!(link.wallets && link.wallets.length > 0)}
                        onChange={(e) => {
                          const newLinks = [...ctaLinks];
                          if (e.target.checked) {
                            newLinks[index].wallets = [
                              { name: 'GCash', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
                              { name: 'Maya', accountName: 'Mary Jane C.', accountNumber: '0912-345-6789', qrCode: '' },
                              { name: 'PayPal', accountName: 'mjhanesultancruz1514@gmail.com', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' },
                              { name: 'Wise', accountName: 'Mary Jane C.', accountNumber: 'mjhanesultancruz1514@gmail.com', qrCode: '' }
                            ];
                            newLinks[index].customMessage = 'Thank you so much for supporting the site and fueling late-night gaming sessions! ☕✨';
                          } else {
                            delete newLinks[index].wallets;
                            delete newLinks[index].customMessage;
                          }
                          setCtaLinks(newLinks);
                        }}
                        className="w-4 h-4 accent-peach-500 cursor-pointer"
                      />
                      <label htmlFor={`enable-payment-${link.id}`} className="text-sm font-bold text-ink-900 cursor-pointer">
                        Open Multi-Wallet Payment Popup (GCash, Maya, PayPal, Wise) when clicked
                      </label>
                    </div>
                  </div>

                  {/* Wallet Config Sub-Editor (Shown when checkbox is ticked) */}
                  {link.wallets && link.wallets.length > 0 && (
                    <div className="flex flex-col gap-4 pt-2">
                      <div>
                        <label className="text-xs font-bold text-tan-500 uppercase tracking-wider block mb-1">Custom Popup Thank-You Message:</label>
                        <input 
                          value={link.customMessage || ''}
                          onChange={(e) => {
                            const newLinks = [...ctaLinks];
                            newLinks[index].customMessage = e.target.value;
                            setCtaLinks(newLinks);
                          }}
                          placeholder="Message shown inside the popup card..."
                          className="w-full px-3 py-2 text-sm rounded-lg border border-tan-200 bg-white focus:outline-none"
                        />
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-xs font-bold text-tan-500 uppercase tracking-wider">Configure Wallets & QR Codes:</span>
                        <button 
                          type="button"
                          onClick={() => {
                            const newLinks = [...ctaLinks];
                            if (!newLinks[index].wallets) newLinks[index].wallets = [];
                            newLinks[index].wallets!.push({ name: 'New Wallet', accountName: '', accountNumber: '', qrCode: '' });
                            setCtaLinks(newLinks);
                          }}
                          className="text-xs font-bold text-peach-600 bg-peach-50 px-3 py-1.5 rounded-lg hover:bg-peach-100"
                        >
                          + Add Wallet
                        </button>
                      </div>

                      <div className="flex flex-col gap-3">
                        {link.wallets.map((wallet, wIndex) => (
                          <div key={wIndex} className="notepad-step p-4 flex flex-col gap-3">
                            <div className="flex gap-2 items-center">
                              <input 
                                value={wallet.name}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].name = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Wallet Name"
                                className="w-1/4 px-2 py-1.5 text-sm rounded border border-tan-200 font-bold"
                              />
                              <input 
                                value={wallet.accountName}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].accountName = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Account Name"
                                className="w-1/4 px-2 py-1.5 text-sm rounded border border-tan-200"
                              />
                              <input 
                                value={wallet.accountNumber}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].accountNumber = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Number / Email ID"
                                className="flex-1 px-2 py-1.5 text-sm rounded border border-tan-200 font-mono"
                              />
                              <button 
                                type="button"
                                onClick={() => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets = newLinks[index].wallets!.filter((_, i) => i !== wIndex);
                                  setCtaLinks(newLinks);
                                }}
                                className="text-red-400 hover:text-red-600 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>

                            {/* QR Code Upload per Wallet */}
                            <div className="flex items-center gap-2 pt-2 border-t border-tan-100 text-xs">
                              <span className="text-tan-500 font-bold">QR Image:</span>
                              <input 
                                value={wallet.qrCode || ''}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].qrCode = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Paste QR image URL or upload..."
                                className="flex-1 px-2 py-1 rounded border border-tan-200 bg-cream-50"
                              />
                              <label className="px-2 py-1 bg-earth-100 text-earth-700 font-bold rounded cursor-pointer hover:bg-earth-200 whitespace-nowrap">
                                Upload QR
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  className="hidden" 
                                  onChange={(e) => handleImageUpload(e, `wallet-${index}-${wIndex}`, (base64) => {
                                    const newLinks = [...ctaLinks];
                                    newLinks[index].wallets![wIndex].qrCode = base64;
                                    setCtaLinks(newLinks);
                                  })} 
                                />
                              </label>
                              {wallet.qrCode && (
                                <img src={wallet.qrCode} alt="QR Preview" className="w-8 h-8 object-cover rounded border border-tan-300" />
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => setCtaLinks([...(ctaLinks || []), { id: `link-${Date.now()}`, label: 'New Link', url: '' }])}
                className="self-start mt-2 px-4 py-2 bg-peach-50 text-peach-600 font-bold rounded-lg flex items-center gap-2 hover:bg-peach-100 transition-colors"
              >
                <Plus size={16} /> Add Footer Button
              </button>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'games' && (
        <div className="flex flex-col gap-4">
          {games.map((game, idx) => (
            <div key={game.id} className="notepad-card p-5 flex justify-between items-center gap-3">
              {/* Reorder arrows */}
              <div className="flex flex-col gap-1 shrink-0">
                <button
                  onClick={() => reorderGame(game.id, 'up')}
                  disabled={idx === 0}
                  className="p-1.5 rounded-lg border border-tan-200 bg-cream-50 hover:bg-peach-50 hover:border-peach-300 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  title="Move up"
                  aria-label="Move game up"
                >
                  <ChevronUp size={16} className="text-ink-700" />
                </button>
                <button
                  onClick={() => reorderGame(game.id, 'down')}
                  disabled={idx === games.length - 1}
                  className="p-1.5 rounded-lg border border-tan-200 bg-cream-50 hover:bg-peach-50 hover:border-peach-300 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  title="Move down"
                  aria-label="Move game down"
                >
                  <ChevronDown size={16} className="text-ink-700" />
                </button>
              </div>

              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div 
                  className="w-16 h-16 rounded-xl object-cover shadow-sm bg-cover bg-center border border-tan-200 shrink-0"
                  style={{ backgroundImage: `url(${game.coverImage})`}} 
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="font-bold text-xl text-ink-900">{game.title}</h3>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-peach-100 text-peach-700 border border-peach-200">
                      {game.category || 'Cozy Games'}
                    </span>
                  </div>
                  <span className="text-sm font-semibold text-tan-500 bg-tan-100 px-2 py-1 rounded-md mt-1 inline-block">
                    {game.walkthrough.length} Walkthrough Sections
                  </span>
                </div>
              </div>

              <div className="flex gap-3 shrink-0">
                <button 
                  onClick={() => setEditingGame(game)} 
                  className="p-3 text-earth-600 bg-earth-50 hover:bg-earth-100 font-bold rounded-xl flex items-center gap-2 transition-colors"
                >
                  <Edit2 size={18} /> Edit
                </button>
                <button 
                  onClick={() => removeGame(game.id)} 
                  className="p-3 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
                  title="Delete Game"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          ))}
          
          <button 
            onClick={handleAddGame} 
            className="border-2 border-dashed border-tan-300 rounded-2xl p-6 flex flex-col items-center justify-center text-tan-500 hover:text-peach-500 hover:border-peach-300 hover:bg-peach-50 transition-all font-bold gap-2 mt-4"
          >
            <Plus size={24} /> Add New Game
          </button>
        </div>
      )}

      {activeTab === 'articles' && (
        <ArticleManager
          articles={articles}
          onNewArticle={() => {
            const newArticle: Article = {
              id: `article-${Date.now()}`,
              slug: `new-article-${Date.now()}`,
              title: 'New Cozy Story',
              subtitle: 'A gentle subtitle for your readers',
              category: 'Review',
              author: 'Jinssi',
              date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
              readTimeMinutes: 4,
              cozyScore: 5,
              stressLevel: 'Zero Stress',
              coverImage: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=1200&q=80',
              coverAlt: 'Cozy illustration',
              tags: ['Cozy Games', 'Relaxing'],
              sections: [
                {
                  heading: 'Introduction',
                  content: ['Write your thoughts and observations here...'],
                  callout: 'Cozy tip: Take your time and enjoy the quiet moments.',
                }
              ],
            };
            setEditingArticle(newArticle);
            setIsNewArticle(true);
          }}
          onEditArticle={(article) => {
            setEditingArticle(article);
            setIsNewArticle(false);
          }}
          onDeleteArticle={(articleId) => {
            removeArticle(articleId);
          }}
        />
      )}

      {activeTab === 'stories' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <h3 className="font-display font-bold text-xl text-ink-900">Cozy Bookshelf & Web-Novels</h3>
              <p className="text-xs text-tan-600 mt-0.5">
                {stories.length} stories published. Edit text, add chapters, or create new books.
              </p>
            </div>

            <button
              onClick={() => {
                const template: Story = {
                  id: `story-${Date.now()}`,
                  slug: `new-story-${Date.now()}`,
                  title: 'New Story',
                  synopsis: 'A cozy synopsis for your new book or web-novel...',
                  author: 'Jinssi',
                  authorRole: 'Fiction Writer',
                  coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
                  coverAlt: 'Book cover illustration',
                  status: 'Ongoing',
                  genre: 'Slice of Life',
                  tags: ['Cozy', 'Relaxing'],
                  totalChapters: 1,
                  chapters: [
                    {
                      id: `ch-1-${Date.now()}`,
                      chapterNumber: 1,
                      title: 'Chapter 1: The Beginning',
                      wordCount: 150,
                      readTimeMinutes: 1,
                      publishedDate: new Date().toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }),
                      authorNote: 'Welcome to this new story!',
                      content: ['Write or paste your first chapter paragraphs here...'],
                    },
                  ],
                  rating: 5,
                };
                setEditingStory(template);
                setIsNewStory(true);
              }}
              className="site-button bg-earth-500 hover:bg-earth-600 text-white font-bold text-xs flex items-center gap-1.5 shadow-cozy-sm"
            >
              <Plus size={16} /> Add New Story
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {stories.map((story) => {
              const totalWords = story.chapters.reduce((sum, ch) => sum + ch.wordCount, 0);
              return (
                <div key={story.id} className="notepad-card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={story.coverImage}
                      alt={story.coverAlt}
                      className="w-16 h-20 object-cover rounded-xl border border-tan-200 shadow-cozy-sm"
                    />
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-peach-100 text-peach-700">
                          {story.genre}
                        </span>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-earth-100 text-earth-700">
                          {story.status}
                        </span>
                        {story.isPublicDomain && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cream-200 text-tan-700">
                            Public Domain
                          </span>
                        )}
                      </div>
                      <h4 className="font-display font-bold text-base text-ink-900">{story.title}</h4>
                      <p className="text-xs text-tan-600 font-sans mt-0.5">
                        By {story.author} • {story.chapters.length} Chapters • ~{totalWords.toLocaleString()} words
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <button
                      onClick={() => {
                        setEditingStory(story);
                        setIsNewStory(false);
                      }}
                      className="p-2.5 text-earth-700 bg-earth-100 hover:bg-earth-200 font-bold rounded-xl flex items-center gap-1.5 text-xs transition-colors"
                      title="Edit Story & Chapters"
                    >
                      <Edit2 size={15} /> Edit
                    </button>
                    <a
                      href={`/stories/${story.slug}/1`}
                      className="p-2.5 text-peach-700 bg-peach-100 hover:bg-peach-200 font-bold rounded-xl flex items-center gap-1.5 text-xs transition-colors"
                      title="Open in E-Reader"
                    >
                      <BookOpen size={15} /> Read
                    </a>
                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete "${story.title}"?`)) {
                          removeStory(story.id);
                        }
                      }}
                      className="p-2.5 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
                      title="Delete Story"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}