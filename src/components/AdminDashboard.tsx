import { useState, useEffect, useRef } from 'react';
import { useSiteContent } from '@/context/SiteContentContext';
import type { Game, WalkthroughSection } from '@/data/games';
import type { Article } from '@/data/articles';
import { ArticleManager } from './admin/ArticleManager';
import { ArticleEditor } from './admin/ArticleEditor';
import { StoryEditor } from './admin/StoryEditor';
import { StoreManager } from './admin/StoreManager';
import type { Story } from '@/data/stories';
import { supabase } from '@/lib/supabase';
import { convertImageToWebp } from '@/utils/imageOptimization';
import { 
  convertVideoToWebFormat, 
  formatBytes, 
  type VideoOptimizationProgress 
} from '@/utils/videoOptimization';
import { 
  uploadWalkthroughMedia, 
  saveWalkthroughVideoRecord 
} from '@/services/videoService';
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
  ExternalLink,
  ShoppingBag,
  Lock,
  Film,
  Video,
  Play,
  Loader2,
} from '@/components/StreamlineIcons';
import { useAuth } from '@/context/AuthContext';
import { isCreatorEmail, CREATOR_EMAIL } from '@/types/profile';

const DRAFT_STORAGE_KEY = 'jinssi-admin-editing-game-draft';

export function AdminDashboard() {
  const { user, profile, triggerAuthPrompt } = useAuth();
  const isAuthorizedDev = Boolean(user?.email && isCreatorEmail(user.email) && profile.isCreator);

  if (!isAuthorizedDev) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center p-6">
        <div className="notepad-card max-w-lg w-full p-8 text-center space-y-5 border-2 border-red-300 shadow-xl bg-cream-50 animate-fade-in">
          <div className="w-16 h-16 rounded-3xl bg-red-100 text-red-600 mx-auto flex items-center justify-center shadow-inner">
            <AlertTriangle className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-bold font-display text-ink-900">
              Access Restricted
            </h2>
            <p className="text-sm text-ink-700 leading-relaxed font-sans">
              Site management and content editing permissions are strictly restricted to the verified developer account.
            </p>
            <div className="p-3 bg-cream-100 rounded-xl border border-tan-300/70 text-xs font-mono text-ink-800 break-all">
              Authorized Developer: <span className="font-bold text-earth-700">{CREATOR_EMAIL}</span>
            </div>
          </div>
          {!user ? (
            <button
              type="button"
              onClick={() => triggerAuthPrompt(`Sign in with ${CREATOR_EMAIL} to access the developer dashboard.`)}
              className="w-full py-3 px-4 rounded-xl bg-earth-500 hover:bg-earth-600 text-white font-bold text-sm shadow-md transition-transform active:scale-95 cursor-pointer"
            >
              Sign in with Google
            </button>
          ) : (
            <p className="text-xs text-red-600 font-semibold">
              Signed in as {user.email}. This account is not authorized to edit or delete site content.
            </p>
          )}
        </div>
      </div>
    );
  }

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
    removeStory,
    products,
    addProduct,
    updateProduct,
    removeProduct,
    reorderProduct
  } = useSiteContent();

  const [activeTab, setActiveTab] = useState<'assets' | 'games' | 'articles' | 'stories' | 'store'>('assets');
  const [editingGame, setEditingGame] = useState<Game | null>(null);
  const [editingArticle, setEditingArticle] = useState<Article | null>(null);
  const [editingStory, setEditingStory] = useState<Story | null>(null);
  const [isNewArticle, setIsNewArticle] = useState(false);
  const [isNewStory, setIsNewStory] = useState(false);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);
  const [uploadedKey, setUploadedKey] = useState<string | null>(null);
  const [assetSaveMessage, setAssetSaveMessage] = useState('');
  const [videoProgressMap, setVideoProgressMap] = useState<Record<string, VideoOptimizationProgress>>({});
  const [videoStatsMap, setVideoStatsMap] = useState<Record<string, { originalSize: number; optimizedSize: number; savedPercent: number }>>({});
  
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
    const rawFile = e.target.files?.[0];
    if (!rawFile) return;

    setUploadedKey(null);
    setUploadingKey(uploadKey);

    try {
      // Automatically convert image to optimized WebP format
      const file = await convertImageToWebp(rawFile);
      const filePath = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '-')}`;

      const { error } = await supabase.storage.from('site-images').upload(filePath, file, {
        cacheControl: '31536000',
        contentType: file.type || 'image/webp',
        upsert: false,
      });

      if (error) {
        alert(`Image upload failed: ${error.message}`);
        return;
      }

      const { data } = supabase.storage.from('site-images').getPublicUrl(filePath);
      onComplete(data.publicUrl);
      setUploadedKey(uploadKey);
    } catch (err) {
      console.error('Image upload failed:', err);
      alert('Could not process image upload.');
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
      coverImages: ['https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'],
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
      const covers = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
        ? editingGame.coverImages.filter((c) => typeof c === 'string' && c.trim().length > 0)
        : (editingGame.coverImage ? [editingGame.coverImage] : []);
      const gameToSave: Game = {
        ...editingGame,
        coverImages: covers.length > 0 ? covers : undefined,
        coverImage: covers[0] || editingGame.coverImage || '',
      };
      updateGame(gameToSave);
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
      const covers = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
        ? editingGame.coverImages.filter((c) => typeof c === 'string' && c.trim().length > 0)
        : (editingGame.coverImage ? [editingGame.coverImage] : []);
      const gameToSave: Game = {
        ...editingGame,
        coverImages: covers.length > 0 ? covers : undefined,
        coverImage: covers[0] || editingGame.coverImage || '',
      };
      updateGame(gameToSave);
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

  const handleDeleteGame = (gameId: string) => {
    if (savedDraft?.game?.id === gameId) {
      setSavedDraft(null);
    }
    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // ignore
    }
    removeGame(gameId);
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

  const updateSectionField = (
    sectionIndex: number,
    field: 'title' | 'video' | 'videoPoster' | 'videoTitle',
    value: string
  ) => {
    if (!editingGame) return;
    const newWalkthrough = [...editingGame.walkthrough];
    newWalkthrough[sectionIndex] = { ...newWalkthrough[sectionIndex], [field]: value };
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
    field: 'title' | 'description' | 'image' | 'video' | 'videoPoster' | 'videoTitle' | 'hasSpoiler' | 'spoilerText', 
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

  const handleUpdateCoverImage = (index: number, url: string) => {
    if (!editingGame) return;
    const current = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
      ? [...editingGame.coverImages]
      : [editingGame.coverImage || ''];
    current[index] = url;
    setEditingGame({
      ...editingGame,
      coverImages: current,
      coverImage: current[0] || url,
    });
  };

  const handleAddCoverImage = (url: string = '') => {
    if (!editingGame) return;
    const current = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
      ? [...editingGame.coverImages]
      : [editingGame.coverImage || ''];
    current.push(url);
    setEditingGame({
      ...editingGame,
      coverImages: current,
      coverImage: current[0] || url,
    });
  };

  const handleRemoveCoverImage = (index: number) => {
    if (!editingGame) return;
    const current = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
      ? [...editingGame.coverImages]
      : [editingGame.coverImage || ''];
    if (current.length <= 1) {
      current[0] = '';
    } else {
      current.splice(index, 1);
    }
    setEditingGame({
      ...editingGame,
      coverImages: current,
      coverImage: current[0] || '',
    });
  };

  const handleMoveCoverImage = (index: number, direction: 'up' | 'down') => {
    if (!editingGame) return;
    const current = Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0
      ? [...editingGame.coverImages]
      : [editingGame.coverImage || ''];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= current.length) return;
    const temp = current[index];
    current[index] = current[targetIndex];
    current[targetIndex] = temp;
    setEditingGame({
      ...editingGame,
      coverImages: current,
      coverImage: current[0] || '',
    });
  };

  const handleVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sIndex: number,
    stepIndex: number
  ) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !editingGame) return;

    const stepKey = `step-video-${sIndex}-${stepIndex}`;
    const step = editingGame.walkthrough[sIndex]?.steps[stepIndex];
    const stepId = step?.id || `step-${Date.now()}`;
    const sectionId = editingGame.walkthrough[sIndex]?.id;

    setUploadedKey(null);
    setUploadingKey(stepKey);

    try {
      // 1. Auto-convert and compress video to web-optimized WebM directly in browser
      const result = await convertVideoToWebFormat(rawFile, {
        maxWidth: 1280,
        maxHeight: 720,
        targetFps: 30,
        videoBitsPerSecond: 2_200_000,
        onProgress: (p) => {
          setVideoProgressMap((prev) => ({ ...prev, [stepKey]: p }));
        },
      });

      if (result.savedPercent > 0) {
        setVideoStatsMap((prev) => ({
          ...prev,
          [stepKey]: {
            originalSize: result.originalSize,
            optimizedSize: result.optimizedSize,
            savedPercent: result.savedPercent,
          },
        }));
      }

      // 2. Upload optimized video to Supabase Storage (site-videos, or fallback to site-images)
      setVideoProgressMap((prev) => ({
        ...prev,
        [stepKey]: {
          stage: 'finalizing',
          percent: 96,
          statusText: 'Uploading web-optimized video to storage...',
        },
      }));

      const { publicUrl: videoUrl } = await uploadWalkthroughMedia(result.videoFile, 'walkthrough-videos');

      // 3. Upload poster thumbnail if present
      let posterUrl = '';
      if (result.posterFile) {
        const { publicUrl: posterPublicUrl } = await uploadWalkthroughMedia(result.posterFile, 'walkthrough-posters');
        posterUrl = posterPublicUrl;
        updateStep(sIndex, stepIndex, 'videoPoster', posterUrl);
      }

      // 4. Update the step in editing game
      updateStep(sIndex, stepIndex, 'video', videoUrl);

      // 5. Store record in walkthrough_videos table
      await saveWalkthroughVideoRecord({
        id: `vid-${Date.now()}`,
        game_id: editingGame.id,
        section_id: sectionId,
        step_id: stepId,
        title: step?.title || 'Walkthrough Step Video',
        video_url: videoUrl,
        poster_url: posterUrl || undefined,
        mime_type: result.mimeType,
        original_filename: rawFile.name,
        original_size_bytes: result.originalSize,
        optimized_size_bytes: result.optimizedSize,
        compression_ratio: result.savedPercent,
        duration_seconds: result.duration ? Number(result.duration.toFixed(2)) : undefined,
        width: result.width,
        height: result.height,
        is_placeholder: false,
      });

      setUploadedKey(stepKey);
    } catch (err: any) {
      console.error('Video upload failed:', err);
      alert(`Could not process video upload: ${err?.message || 'Unknown error'}`);
    } finally {
      setUploadingKey(null);
      setTimeout(() => {
        setVideoProgressMap((prev) => {
          const next = { ...prev };
          delete next[stepKey];
          return next;
        });
      }, 5000);
    }
  };

  const handleGameVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !editingGame) return;

    const uploadKey = 'game-video';
    setUploadedKey(null);
    setUploadingKey(uploadKey);

    try {
      // 1. Auto-convert and compress video to web-optimized WebM directly in browser
      const result = await convertVideoToWebFormat(rawFile, {
        maxWidth: 1280,
        maxHeight: 720,
        targetFps: 30,
        videoBitsPerSecond: 2_200_000,
        onProgress: (p) => {
          setVideoProgressMap((prev) => ({ ...prev, [uploadKey]: p }));
        },
      });

      if (result.savedPercent > 0) {
        setVideoStatsMap((prev) => ({
          ...prev,
          [uploadKey]: {
            originalSize: result.originalSize,
            optimizedSize: result.optimizedSize,
            savedPercent: result.savedPercent,
          },
        }));
      }

      // 2. Upload optimized video to storage
      setVideoProgressMap((prev) => ({
        ...prev,
        [uploadKey]: {
          stage: 'finalizing',
          percent: 96,
          statusText: 'Uploading web-optimized video to storage...',
        },
      }));

      const { publicUrl: videoUrl } = await uploadWalkthroughMedia(result.videoFile, 'game-videos');

      // 3. Upload poster thumbnail if present
      let posterUrl = '';
      if (result.posterFile) {
        const { publicUrl: posterPublicUrl } = await uploadWalkthroughMedia(result.posterFile, 'game-posters');
        posterUrl = posterPublicUrl;
      }

      setEditingGame({
        ...editingGame,
        video: videoUrl,
        videoPoster: posterUrl || editingGame.videoPoster,
      });

      // 4. Save to walkthrough_videos table
      await saveWalkthroughVideoRecord({
        id: `vid-${Date.now()}`,
        game_id: editingGame.id,
        title: `${editingGame.title} Walkthrough Video`,
        video_url: videoUrl,
        poster_url: posterUrl || undefined,
        mime_type: result.mimeType,
        original_filename: rawFile.name,
        original_size_bytes: result.originalSize,
        optimized_size_bytes: result.optimizedSize,
        compression_ratio: result.savedPercent,
        duration_seconds: result.duration ? Number(result.duration.toFixed(2)) : undefined,
        width: result.width,
        height: result.height,
        is_placeholder: false,
      });

      setUploadedKey(uploadKey);
    } catch (err: any) {
      console.error('Game video upload failed:', err);
      alert(`Could not process video upload: ${err?.message || 'Unknown error'}`);
    } finally {
      setUploadingKey(null);
      setTimeout(() => {
        setVideoProgressMap((prev) => {
          const next = { ...prev };
          delete next[uploadKey];
          return next;
        });
      }, 5000);
    }
  };

  const handleSectionVideoUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    sIndex: number
  ) => {
    const rawFile = e.target.files?.[0];
    if (!rawFile || !editingGame) return;

    const sectionKey = `section-video-${sIndex}`;
    const section = editingGame.walkthrough[sIndex];
    const sectionId = section?.id || `section-${Date.now()}`;

    setUploadedKey(null);
    setUploadingKey(sectionKey);

    try {
      // 1. Auto-convert and compress video to web-optimized WebM directly in browser
      const result = await convertVideoToWebFormat(rawFile, {
        maxWidth: 1280,
        maxHeight: 720,
        targetFps: 30,
        videoBitsPerSecond: 2_200_000,
        onProgress: (p) => {
          setVideoProgressMap((prev) => ({ ...prev, [sectionKey]: p }));
        },
      });

      if (result.savedPercent > 0) {
        setVideoStatsMap((prev) => ({
          ...prev,
          [sectionKey]: {
            originalSize: result.originalSize,
            optimizedSize: result.optimizedSize,
            savedPercent: result.savedPercent,
          },
        }));
      }

      // 2. Upload to storage
      setVideoProgressMap((prev) => ({
        ...prev,
        [sectionKey]: {
          stage: 'finalizing',
          percent: 96,
          statusText: 'Uploading web-optimized video to storage...',
        },
      }));

      const { publicUrl: videoUrl } = await uploadWalkthroughMedia(result.videoFile, 'section-videos');

      // 3. Upload poster thumbnail if present
      let posterUrl = '';
      if (result.posterFile) {
        const { publicUrl: posterPublicUrl } = await uploadWalkthroughMedia(result.posterFile, 'section-posters');
        posterUrl = posterPublicUrl;
        updateSectionField(sIndex, 'videoPoster', posterUrl);
      }

      // 4. Update the section in editing game
      updateSectionField(sIndex, 'video', videoUrl);

      // 5. Save to walkthrough_videos table
      await saveWalkthroughVideoRecord({
        id: `vid-${Date.now()}`,
        game_id: editingGame.id,
        section_id: sectionId,
        title: section?.title ? `${section.title} Section Video` : 'Walkthrough Section Video',
        video_url: videoUrl,
        poster_url: posterUrl || undefined,
        mime_type: result.mimeType,
        original_filename: rawFile.name,
        original_size_bytes: result.originalSize,
        optimized_size_bytes: result.optimizedSize,
        compression_ratio: result.savedPercent,
        duration_seconds: result.duration ? Number(result.duration.toFixed(2)) : undefined,
        width: result.width,
        height: result.height,
        is_placeholder: false,
      });

      setUploadedKey(sectionKey);
    } catch (err: any) {
      console.error('Section video upload failed:', err);
      alert(`Could not process video upload: ${err?.message || 'Unknown error'}`);
    } finally {
      setUploadingKey(null);
      setTimeout(() => {
        setVideoProgressMap((prev) => {
          const next = { ...prev };
          delete next[sectionKey];
          return next;
        });
      }, 5000);
    }
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
      <div className="w-full max-w-4xl mx-auto px-2.5 sm:px-6 py-4 sm:py-10 pb-28 sm:pb-10 animate-fade-in min-w-0 overflow-x-clip">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6">
          <button 
            type="button"
            onClick={handleBackToDashboard} 
            className="flex items-center gap-1.5 text-tan-600 hover:text-ink-900 font-bold transition-colors text-sm self-start"
          >
            <ChevronLeft size={18} /> Back to Dashboard
          </button>

          {/* Auto-save & Sync status pills */}
          <div className="flex flex-wrap items-center gap-2">
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

        <form onSubmit={handleSaveGame} className="notepad-card p-3.5 sm:p-6 md:p-8 shadow-cozy-lg w-full max-w-full overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b-2 border-tan-100 pb-4 mb-6">
            <div>
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-ink-900">Edit Game</h2>
              <p className="text-xs font-semibold text-tan-500 mt-1">
                All changes auto-save continuously to protect against sudden PC shutdown or browser close.
              </p>
            </div>
            <button 
              type="submit" 
              className="site-button bg-earth-500 text-white hover:bg-earth-600 flex items-center justify-center gap-2 text-sm w-full sm:w-auto"
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
            {/* Multi-Cover Showcase & Carousel Manager */}
            <div className="md:col-span-2 p-4 sm:p-5 rounded-2xl bg-cream-100/70 border-2 border-tan-300">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-3">
                <div>
                  <label className="block font-bold text-ink-900 flex items-center gap-2 text-base">
                    <ImageIcon size={20} className="text-peach-500" />
                    <span>Game Cover Artworks (Auto-Loop Carousel)</span>
                  </label>
                  <p className="text-xs text-ink-600 mt-0.5">
                    Upload 1 or more cover images. When 2 or more covers are added, the walkthrough page displays an automatic, smooth looping carousel with previous/next controls.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleAddCoverImage('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-peach-500 text-white font-bold text-xs hover:bg-peach-600 transition-colors shadow-sm self-start sm:self-auto"
                >
                  <Plus size={15} />
                  <span>Add Another Cover</span>
                </button>
              </div>

              {/* List of cover slides */}
              <div className="space-y-3">
                {((Array.isArray(editingGame.coverImages) && editingGame.coverImages.length > 0)
                  ? editingGame.coverImages
                  : [editingGame.coverImage || '']
                ).map((coverUrl, cIndex, arr) => (
                  <div
                    key={cIndex}
                    className="p-3 sm:p-4 rounded-xl bg-white border border-tan-200 shadow-sm flex flex-col md:flex-row items-stretch md:items-center gap-2.5 sm:gap-3 w-full max-w-full overflow-hidden"
                  >
                    {/* Top Row on mobile: thumbnail, badge, and mobile action buttons */}
                    <div className="flex items-center justify-between gap-2 w-full md:w-auto">
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-14 h-11 sm:w-16 sm:h-12 rounded-lg bg-cream-100 border border-tan-200 overflow-hidden flex-shrink-0 flex items-center justify-center relative">
                          {coverUrl ? (
                            <img
                              src={coverUrl}
                              alt={`Cover ${cIndex + 1}`}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.currentTarget as HTMLImageElement).style.display = 'none';
                              }}
                            />
                          ) : (
                            <ImageIcon className="w-5 h-5 text-tan-400" />
                          )}
                          <span className="absolute bottom-0 right-0 bg-ink-900/80 text-cream-100 text-[10px] font-bold px-1 rounded-tl">
                            #{cIndex + 1}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-ink-800 block truncate">
                            {cIndex === 0 ? 'Primary Cover' : `Slide ${cIndex + 1}`}
                          </span>
                          {cIndex === 0 && (
                            <span className="text-[10px] font-semibold text-peach-600 bg-peach-50 px-1.5 py-0.5 rounded border border-peach-200 inline-block">
                              Main Card
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Actions: Reorder & Delete (Mobile visible) */}
                      <div className="flex items-center gap-1 shrink-0 md:hidden">
                        <button
                          type="button"
                          disabled={cIndex === 0}
                          onClick={() => handleMoveCoverImage(cIndex, 'up')}
                          title="Move Up"
                          className="p-1.5 rounded-lg border border-tan-200 text-ink-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronUp size={15} />
                        </button>
                        <button
                          type="button"
                          disabled={cIndex === arr.length - 1}
                          onClick={() => handleMoveCoverImage(cIndex, 'down')}
                          title="Move Down"
                          className="p-1.5 rounded-lg border border-tan-200 text-ink-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                        >
                          <ChevronDown size={15} />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRemoveCoverImage(cIndex)}
                          title="Delete this cover"
                          className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>
                    </div>

                    {/* URL Input and upload */}
                    <div className="flex-1 flex flex-col sm:flex-row gap-2 min-w-0 w-full">
                      <input
                        value={coverUrl}
                        onChange={(e) => handleUpdateCoverImage(cIndex, e.target.value)}
                        placeholder="Paste image URL or upload below..."
                        className="flex-1 min-w-0 w-full px-3 py-2 rounded-lg border border-tan-300 focus:border-peach-400 focus:outline-none bg-cream-50 text-xs font-medium"
                      />
                      <label className="flex items-center justify-center px-3 py-2 bg-earth-100 text-earth-800 font-bold text-xs rounded-lg cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap w-full sm:w-auto shrink-0">
                        {uploadingKey === `game-cover-${cIndex}` ? (
                          'Optimizing...'
                        ) : uploadedKey === `game-cover-${cIndex}` ? (
                          '✓ Uploaded'
                        ) : (
                          <>
                            <Upload size={14} className="mr-1.5" />
                            Upload WebP
                          </>
                        )}
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(e, `game-cover-${cIndex}`, (base64) =>
                              handleUpdateCoverImage(cIndex, base64)
                            )
                          }
                        />
                      </label>
                    </div>

                    {/* Actions: Reorder & Delete (Desktop visible) */}
                    <div className="hidden md:flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        disabled={cIndex === 0}
                        onClick={() => handleMoveCoverImage(cIndex, 'up')}
                        title="Move Up"
                        className="p-1.5 rounded-lg border border-tan-200 text-ink-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronUp size={16} />
                      </button>
                      <button
                        type="button"
                        disabled={cIndex === arr.length - 1}
                        onClick={() => handleMoveCoverImage(cIndex, 'down')}
                        title="Move Down"
                        className="p-1.5 rounded-lg border border-tan-200 text-ink-600 hover:bg-cream-100 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                      >
                        <ChevronDown size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveCoverImage(cIndex)}
                        title="Delete this cover"
                        className="p-1.5 rounded-lg border border-red-200 text-red-500 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Alt text field for accessibility */}
              <div className="mt-3 pt-3 border-t border-tan-200 flex flex-col sm:flex-row sm:items-center gap-2">
                <label className="text-xs font-bold text-ink-700 whitespace-nowrap">Cover Alt Text:</label>
                <input
                  value={editingGame.coverAlt || ''}
                  onChange={(e) => setEditingGame({ ...editingGame, coverAlt: e.target.value })}
                  placeholder="Descriptive text for accessibility / SEO..."
                  className="flex-1 px-3 py-1.5 rounded-lg border border-tan-300 focus:border-peach-400 focus:outline-none bg-white text-xs"
                />
              </div>
            </div>

            {/* Game Store Trailer & Gameplay Overview Video (WebM / MP4 or Video Placeholder) */}
            <div className="md:col-span-2 p-3.5 sm:p-5 rounded-2xl bg-peach-50/60 border-2 border-peach-200 w-full max-w-full overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
                <div>
                  <label className="block font-bold text-ink-900 flex items-center gap-2 text-base">
                    <Film size={20} className="text-peach-500 shrink-0" />
                    <span>Gameplay Overview / Store Trailer Video</span>
                  </label>
                  <p className="text-xs text-ink-600 mt-0.5">
                    Official gameplay preview showcase for this game (just like Steam &amp; Nintendo eShop store pages). Videos auto-convert to lightweight WebM VP9 in browser for seamless, fast playback.
                  </p>
                </div>
                {editingGame.video === 'placeholder' ? (
                  <span className="self-start sm:self-auto text-xs font-bold text-peach-700 bg-peach-100 px-3 py-1 rounded-full border border-peach-300 shadow-sm whitespace-nowrap shrink-0">
                    🎬 Trailer Placeholder Active
                  </span>
                ) : editingGame.video ? (
                  <span className="self-start sm:self-auto text-xs font-bold text-sage-700 bg-sage-50 px-3 py-1 rounded-full border border-sage-200 shadow-sm whitespace-nowrap shrink-0">
                    ✓ Gameplay Trailer Attached
                  </span>
                ) : null}
              </div>

              <div className="mt-3 flex flex-col sm:flex-row gap-2 w-full min-w-0">
                <input 
                  value={editingGame.video || ''}
                  onChange={(e) => setEditingGame({...editingGame, video: e.target.value})}
                  className="flex-1 min-w-0 w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 focus:outline-none bg-white font-medium text-xs sm:text-sm"
                  placeholder="Paste video URL, or click 'Upload Gameplay Video', or 'Set Trailer Placeholder'..."
                />
                
                {/* Upload Video Button with Auto WebM Conversion */}
                <label className="flex items-center justify-center px-4 py-2.5 sm:py-3 bg-peach-500 text-white font-bold rounded-xl cursor-pointer hover:bg-peach-600 transition-colors whitespace-nowrap shadow-cozy-xs w-full sm:w-auto text-xs sm:text-sm shrink-0">
                  {uploadingKey === 'game-video' ? (
                    <>
                      <Loader2 size={16} className="mr-2 animate-spin" />
                      <span>Converting to WebM...</span>
                    </>
                  ) : uploadedKey === 'game-video' ? (
                    <>
                      <CheckCircle size={16} className="mr-2" />
                      <span>Uploaded</span>
                    </>
                  ) : (
                    <>
                      <Upload size={16} className="mr-2" />
                      <span>Upload Gameplay Video</span>
                    </>
                  )}
                  <input 
                    type="file" 
                    accept="video/*" 
                    className="hidden" 
                    disabled={uploadingKey === 'game-video'}
                    onChange={handleGameVideoUpload} 
                  />
                </label>

                {/* Video Placeholder Toggle */}
                <button
                  type="button"
                  onClick={() => {
                    if (editingGame.video === 'placeholder') {
                      setEditingGame({ ...editingGame, video: '' });
                    } else {
                      setEditingGame({ 
                        ...editingGame, 
                        video: 'placeholder', 
                        videoTitle: editingGame.videoTitle || `${editingGame.title} Gameplay Overview Trailer` 
                      });
                    }
                  }}
                  className={`px-4 py-2.5 sm:py-3 rounded-xl font-bold transition-colors whitespace-nowrap border-2 text-center justify-center w-full sm:w-auto text-xs sm:text-sm shrink-0 ${
                    editingGame.video === 'placeholder'
                      ? 'bg-peach-100 text-peach-700 border-peach-300'
                      : 'bg-white text-ink-800 border-tan-200 hover:bg-peach-50 hover:text-peach-600 hover:border-peach-300'
                  }`}
                >
                  {editingGame.video === 'placeholder' ? '✕ Remove Placeholder' : '🎬 Set Trailer Placeholder'}
                </button>
              </div>

              {/* Optional Trailer Title / Badge */}
              <div className="mt-2.5">
                <input 
                  value={editingGame.videoTitle || ''}
                  onChange={(e) => setEditingGame({...editingGame, videoTitle: e.target.value})}
                  className="w-full min-w-0 px-3.5 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none bg-white text-xs text-ink-800"
                  placeholder="Trailer title / badge (e.g. Official Gameplay Overview Trailer, 4K Cozy Preview)..."
                />
              </div>

              {/* Video conversion progress bar */}
              {uploadingKey === 'game-video' && videoProgressMap['game-video'] && (
                <div className="mt-3 p-3.5 rounded-xl bg-peach-50 border border-peach-200 animate-fade-in text-xs space-y-2">
                  <div className="flex items-center justify-between text-peach-800 font-bold">
                    <span className="flex items-center gap-2">
                      <Loader2 size={14} className="animate-spin text-peach-600" />
                      {videoProgressMap['game-video'].statusText}
                    </span>
                    <span>{videoProgressMap['game-video'].percent}%</span>
                  </div>
                  <div className="w-full bg-peach-200/70 h-2.5 rounded-full overflow-hidden">
                    <div 
                      className="bg-peach-500 h-full transition-all duration-300 rounded-full"
                      style={{ width: `${videoProgressMap['game-video'].percent}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-peach-700">
                    ⚡ Automatically converting to WebM VP9 in browser to minimize file size by 70–90% while maintaining high visual quality.
                  </p>
                </div>
              )}

              {/* Compression stats banner */}
              {videoStatsMap['game-video'] && (
                <div className="mt-2.5 px-4 py-2 rounded-xl bg-sage-50 border border-sage-200 text-sage-800 text-xs flex items-center justify-between animate-fade-in font-medium">
                  <span>
                    🎉 Converted to WebM! Saved {videoStatsMap['game-video'].savedPercent}% (
                    {formatBytes(videoStatsMap['game-video'].originalSize)} ➔ {formatBytes(videoStatsMap['game-video'].optimizedSize)})
                  </span>
                  <span className="text-[10px] uppercase font-bold text-sage-600 bg-sage-100 px-1.5 py-0.5 rounded">Lossless Fidelity</span>
                </div>
              )}

              {/* Video Preview or Placeholder Notice */}
              {editingGame.video === 'placeholder' ? (
                <div className="mt-3 p-4 rounded-xl border-2 border-dashed border-peach-300 bg-peach-50/60 flex items-center gap-3 text-xs text-peach-800">
                  <div className="w-10 h-10 rounded-xl bg-peach-200/80 text-peach-600 flex items-center justify-center flex-shrink-0">
                    <Film size={22} />
                  </div>
                  <div className="flex-1">
                    <strong className="block font-bold text-sm text-peach-900 mb-0.5">Gameplay Trailer Placeholder Active:</strong>
                    Visitors to this game page will see a cozy store-style &quot;Gameplay Overview Video In Production&quot; showcase at the top of the guide until you upload the finished gameplay video!
                  </div>
                </div>
              ) : editingGame.video ? (
                <div className="mt-3 relative rounded-xl overflow-hidden border-2 border-tan-200 bg-ink-950 p-2 flex flex-col items-center">
                  <video
                    src={editingGame.video}
                    poster={editingGame.videoPoster}
                    controls
                    className="max-h-56 max-w-full rounded-lg object-contain bg-black"
                  />
                  <div className="flex items-center justify-between w-full px-3 py-2 text-cream-200 text-xs">
                    <span className="font-semibold flex items-center gap-1.5">
                      <Film size={14} className="text-peach-400" />
                      <span>{editingGame.videoTitle || 'Gameplay Overview Trailer'} Preview</span>
                    </span>
                    <button
                      type="button"
                      onClick={() => setEditingGame({ ...editingGame, video: '', videoPoster: '' })}
                      className="text-peach-400 hover:text-peach-300 font-bold hover:underline"
                    >
                      Remove Video
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>

          <h3 className="text-2xl font-display font-bold text-ink-900 mb-4">Walkthrough Guides</h3>
          
          <div className="flex flex-col gap-6 sm:gap-8 w-full min-w-0">
            {editingGame.walkthrough.map((section, sIndex) => (
              <div key={sIndex} className="notepad-card p-3 sm:p-6 relative shadow-cozy-sm w-full max-w-full overflow-hidden min-w-0">
                <div className="flex items-start justify-between gap-2 sm:gap-3 mb-4 sm:mb-6">
                  <div className="flex-1 min-w-0">
                    <label className="block font-bold text-tan-600 mb-1.5 text-xs sm:text-sm uppercase tracking-wider">
                      Section {sIndex + 1} Title
                    </label>
                    <input 
                      value={section.title}
                      onChange={(e) => updateSectionTitle(sIndex, e.target.value)}
                      className="w-full min-w-0 px-3 sm:px-4 py-2 rounded-lg border-2 border-tan-200 focus:border-peach-400 focus:outline-none font-bold text-base sm:text-lg"
                    />
                  </div>
                  <button 
                    type="button" 
                    onClick={() => removeSection(sIndex)}
                    className="mt-6 p-2 rounded-lg border border-tan-200 bg-white text-red-400 hover:text-red-600 hover:bg-red-50 transition-colors shadow-sm shrink-0"
                    title="Delete Section"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                {/* Section Walkthrough Video (WebM / MP4) */}
                <div className="mb-6 p-3 sm:p-4 bg-cream-50/80 rounded-xl border border-tan-200 w-full max-w-full overflow-hidden min-w-0">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <label className="text-xs font-bold text-tan-600 flex items-center gap-1.5 uppercase tracking-wider">
                      <Film size={14} className="text-peach-500 shrink-0" />
                      <span>Section {sIndex + 1} Video Guide (Auto-Converts to WebM)</span>
                    </label>
                    {section.video === 'placeholder' ? (
                      <span className="self-start sm:self-auto text-[11px] font-bold text-peach-600 bg-peach-100 px-2 py-0.5 rounded-full shrink-0">
                        🎬 Placeholder Active
                      </span>
                    ) : section.video ? (
                      <span className="self-start sm:self-auto text-[11px] font-bold text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full shrink-0">
                        ✓ Video Attached
                      </span>
                    ) : null}
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
                    <input 
                      value={section.video || ''}
                      onChange={(e) => updateSectionField(sIndex, 'video', e.target.value)}
                      className="flex-1 min-w-0 w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm bg-white"
                      placeholder="https://... or 'placeholder' or click Upload Video"
                    />

                    {/* Upload Video Button with Auto WebM Conversion */}
                    <label className="w-full sm:w-auto px-3.5 py-2.5 bg-peach-500 text-white font-bold rounded-lg cursor-pointer hover:bg-peach-600 transition-colors text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shadow-cozy-xs shrink-0">
                      {uploadingKey === `section-video-${sIndex}` ? (
                        <>
                          <Loader2 size={14} className="animate-spin" />
                          <span>Converting...</span>
                        </>
                      ) : uploadedKey === `section-video-${sIndex}` ? (
                        <>
                          <CheckCircle size={14} />
                          <span>Uploaded</span>
                        </>
                      ) : (
                        <>
                          <Upload size={14} />
                          <span>Upload Video</span>
                        </>
                      )}
                      <input 
                        type="file" 
                        accept="video/*" 
                        className="hidden" 
                        disabled={uploadingKey === `section-video-${sIndex}`}
                        onChange={(e) => handleSectionVideoUpload(e, sIndex)}
                      />
                    </label>

                    {/* Quick Placeholder Toggle */}
                    <button
                      type="button"
                      onClick={() => {
                        if (section.video === 'placeholder') {
                          updateSectionField(sIndex, 'video', '');
                        } else {
                          updateSectionField(sIndex, 'video', 'placeholder');
                        }
                      }}
                      className={`w-full sm:w-auto px-3 py-2.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border text-center justify-center ${
                        section.video === 'placeholder'
                          ? 'bg-peach-100 text-peach-700 border-peach-300'
                          : 'bg-white text-ink-800 border-tan-200 hover:bg-peach-50 hover:text-peach-600'
                      }`}
                    >
                      {section.video === 'placeholder' ? '✕ Remove Placeholder' : '🎬 Set Video Placeholder'}
                    </button>
                  </div>

                  {/* Section Video conversion progress bar */}
                  {uploadingKey === `section-video-${sIndex}` && videoProgressMap[`section-video-${sIndex}`] && (
                    <div className="mt-2.5 p-3 rounded-lg bg-peach-50 border border-peach-200 animate-fade-in text-xs space-y-1.5">
                      <div className="flex items-center justify-between text-peach-800 font-bold">
                        <span className="flex items-center gap-1.5">
                          <Loader2 size={13} className="animate-spin text-peach-600" />
                          {videoProgressMap[`section-video-${sIndex}`].statusText}
                        </span>
                        <span>{videoProgressMap[`section-video-${sIndex}`].percent}%</span>
                      </div>
                      <div className="w-full bg-peach-200/70 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-peach-500 h-full transition-all duration-300 rounded-full"
                          style={{ width: `${videoProgressMap[`section-video-${sIndex}`].percent}%` }}
                        />
                      </div>
                      <p className="text-[10px] text-peach-700">
                        ⚡ Converting in browser to WebM VP9 (~70–90% smaller, lossless quality).
                      </p>
                    </div>
                  )}

                  {/* Section Video Compression stats banner */}
                  {videoStatsMap[`section-video-${sIndex}`] && (
                    <div className="mt-2 px-3 py-1.5 rounded-lg bg-sage-50 border border-sage-200 text-sage-800 text-xs flex items-center justify-between animate-fade-in font-medium">
                      <span>
                        🎉 Converted to WebM! Saved {videoStatsMap[`section-video-${sIndex}`].savedPercent}% (
                        {formatBytes(videoStatsMap[`section-video-${sIndex}`].originalSize)} ➔ {formatBytes(videoStatsMap[`section-video-${sIndex}`].optimizedSize)})
                      </span>
                      <span className="text-[10px] uppercase font-bold text-sage-600 bg-sage-100 px-1 py-0.5 rounded">High Quality</span>
                    </div>
                  )}

                  {/* Section Video Preview or Placeholder Notice */}
                  {section.video === 'placeholder' ? (
                    <div className="mt-2.5 p-3 rounded-lg border border-dashed border-peach-300 bg-peach-50/60 flex items-center gap-2.5 text-xs text-peach-800">
                      <Film size={18} className="text-peach-500 flex-shrink-0" />
                      <div>
                        <span className="font-bold text-peach-900">Section Video Placeholder Active:</span> Readers will see a cozy video placeholder banner for this section until video is uploaded.
                      </div>
                    </div>
                  ) : section.video ? (
                    <div className="mt-2.5 relative rounded-lg overflow-hidden border border-tan-200 bg-ink-950 p-2 flex flex-col items-center">
                      <video
                        src={section.video}
                        poster={section.videoPoster}
                        controls
                        className="max-h-40 max-w-full rounded object-contain bg-black"
                      />
                      <div className="flex items-center justify-between w-full px-2 py-1 text-cream-200 text-xs">
                        <span>🎬 Section {sIndex + 1} Video Preview</span>
                        <button
                          type="button"
                          onClick={() => {
                            updateSectionField(sIndex, 'video', '');
                            updateSectionField(sIndex, 'videoPoster', '');
                          }}
                          className="text-peach-400 hover:text-peach-300 font-bold hover:underline"
                        >
                          Remove Video
                        </button>
                      </div>
                    </div>
                  ) : null}
                </div>

                <div className="flex flex-col gap-4 pl-1.5 sm:pl-4 border-l-2 sm:border-l-4 border-tan-200 min-w-0 w-full max-w-full">
                  {section.steps.map((step, stepIndex) => (
                    <div key={stepIndex} className="notepad-step p-3 sm:p-4 flex flex-col gap-3 relative group shadow-cozy-xs min-w-0 w-full max-w-full overflow-hidden">
                      <div className="flex items-center justify-between gap-2 border-b border-tan-100 pb-2">
                        <label className="text-xs font-bold text-tan-600 uppercase tracking-wider">
                          Step {stepIndex + 1}
                        </label>
                        <button 
                          type="button" 
                          onClick={() => removeStep(sIndex, stepIndex)}
                          className="text-red-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg border border-tan-200 bg-white transition-all shadow-sm flex items-center gap-1 text-xs shrink-0"
                          title="Delete Step"
                        >
                          <Trash2 size={13} />
                          <span className="sm:hidden font-medium">Delete</span>
                        </button>
                      </div>
                      
                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step Title</label>
                        <input
                          value={step.title}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'title', e.target.value)}
                          className="w-full min-w-0 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none mb-3 text-sm"
                          placeholder="Step title"
                          required
                        />
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Instructions / Description</label>
                        <textarea 
                          value={step.description}
                          onChange={(e) => updateStep(sIndex, stepIndex, 'description', e.target.value)}
                          className="w-full min-w-0 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none min-h-[80px] text-sm"
                          required
                        />
                      </div>

                      {/* Step Spoiler Toggle & Hint */}
                      <div className="p-3 bg-cream-100 rounded-lg border border-tan-200 flex flex-col gap-2 min-w-0 w-full">
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
                            className="w-4 h-4 accent-peach-500 rounded cursor-pointer shrink-0"
                          />
                          <span>Mark this step as a spoiler (blurs / hides solution until clicked)</span>
                        </label>
                        {step.hasSpoiler && (
                          <input
                            value={step.spoilerText || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'spoilerText', e.target.value)}
                            placeholder="Spoiler warning text (e.g. Puzzle solution ahead)..."
                            className="w-full min-w-0 px-3 py-1.5 text-xs rounded-lg border border-tan-200 bg-white focus:outline-none font-medium text-ink-900"
                          />
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-bold text-tan-500 mb-1 block">Step Image (URL or Upload)</label>
                        <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
                          <input 
                            value={step.image || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'image', e.target.value)}
                            className="flex-1 min-w-0 w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm"
                            placeholder="https:// or upload..."
                          />
                          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            <label className="flex-1 sm:flex-initial px-3 py-2 bg-earth-100 text-earth-700 font-bold rounded-lg cursor-pointer hover:bg-earth-200 transition-colors text-xs flex items-center justify-center gap-1 whitespace-nowrap">
                              {uploadingKey === `step-${sIndex}-${stepIndex}` ? 'Uploading...' : uploadedKey === `step-${sIndex}-${stepIndex}` ? 'Uploaded' : <><Upload size={14} /> Upload</>}
                              <input 
                                type="file" 
                                accept="image/*" 
                                className="hidden" 
                                onChange={(e) => handleImageUpload(e, `step-${sIndex}-${stepIndex}`, (base64) => updateStep(sIndex, stepIndex, 'image', base64))}
                              />
                            </label>
                            {uploadedKey === `step-${sIndex}-${stepIndex}` && <span className="text-xs font-bold text-sage-600 whitespace-nowrap" role="status">✓ Done</span>}
                          </div>
                        </div>
                        {step.image && (
                          <img src={step.image} alt="Step preview" className="mt-2 h-24 w-full object-cover rounded-lg border border-tan-200" />
                        )}
                      </div>

                      {/* Step Video Walkthrough (WebM / MP4) */}
                      <div className="pt-2 border-t border-tan-100 min-w-0 w-full">
                        <div className="flex items-center justify-between mb-1">
                          <label className="text-xs font-bold text-tan-500 flex items-center gap-1.5">
                            <Film size={13} className="text-peach-500 shrink-0" />
                            <span>Step Video (Auto-Converts to WebM)</span>
                          </label>
                          {step.video === 'placeholder' ? (
                            <span className="text-[11px] font-bold text-peach-600 bg-peach-100 px-2 py-0.5 rounded-full shrink-0">
                              🎬 Placeholder Active
                            </span>
                          ) : step.video ? (
                            <span className="text-[11px] font-bold text-sage-600 bg-sage-50 px-2 py-0.5 rounded-full shrink-0">
                              ✓ Video Attached
                            </span>
                          ) : null}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2 w-full min-w-0">
                          <input 
                            value={step.video || ''}
                            onChange={(e) => updateStep(sIndex, stepIndex, 'video', e.target.value)}
                            className="flex-1 min-w-0 w-full px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm"
                            placeholder="https://... or 'placeholder' or upload video"
                          />

                          <div className="flex items-center gap-2 w-full sm:w-auto shrink-0">
                            {/* Upload Video Button with Auto WebM Conversion */}
                            <label className="flex-1 sm:flex-initial px-3 py-2 bg-peach-500 text-white font-bold rounded-lg cursor-pointer hover:bg-peach-600 transition-colors text-xs flex items-center justify-center gap-1.5 whitespace-nowrap shadow-cozy-xs">
                              {uploadingKey === `step-video-${sIndex}-${stepIndex}` ? (
                                <>
                                  <Loader2 size={14} className="animate-spin" />
                                  <span>Converting...</span>
                                </>
                              ) : uploadedKey === `step-video-${sIndex}-${stepIndex}` ? (
                                <>
                                  <CheckCircle size={14} />
                                  <span>Uploaded</span>
                                </>
                              ) : (
                                <>
                                  <Upload size={14} />
                                  <span>Upload Video</span>
                                </>
                              )}
                              <input 
                                type="file" 
                                accept="video/*" 
                                className="hidden" 
                                disabled={uploadingKey === `step-video-${sIndex}-${stepIndex}`}
                                onChange={(e) => handleVideoUpload(e, sIndex, stepIndex)}
                              />
                            </label>

                            {/* Quick Placeholder Toggle */}
                            <button
                              type="button"
                              onClick={() => {
                                if (step.video === 'placeholder') {
                                  updateStep(sIndex, stepIndex, 'video', '');
                                } else {
                                  updateStep(sIndex, stepIndex, 'video', 'placeholder');
                                  if (!step.videoTitle) {
                                    updateStep(sIndex, stepIndex, 'videoTitle', 'Walkthrough Video Clip');
                                  }
                                }
                              }}
                              className={`flex-1 sm:flex-initial px-3 py-2 rounded-lg text-xs font-bold transition-colors whitespace-nowrap border text-center ${
                                step.video === 'placeholder'
                                  ? 'bg-peach-100 text-peach-700 border-peach-300'
                                  : 'bg-tan-50 text-tan-600 border-tan-200 hover:bg-peach-50 hover:text-peach-600 hover:border-peach-200'
                              }`}
                            >
                              {step.video === 'placeholder' ? '✕ Remove' : '🎬 Placeholder'}
                            </button>
                          </div>
                        </div>

                        {/* Video conversion progress bar */}
                        {uploadingKey === `step-video-${sIndex}-${stepIndex}` && videoProgressMap[`step-video-${sIndex}-${stepIndex}`] && (
                          <div className="mt-2.5 p-3 rounded-xl bg-peach-50 border border-peach-200 animate-fade-in text-xs space-y-1.5">
                            <div className="flex items-center justify-between text-peach-800 font-bold">
                              <span className="flex items-center gap-1.5">
                                <Loader2 size={13} className="animate-spin text-peach-600" />
                                {videoProgressMap[`step-video-${sIndex}-${stepIndex}`].statusText}
                              </span>
                              <span>{videoProgressMap[`step-video-${sIndex}-${stepIndex}`].percent}%</span>
                            </div>
                            <div className="w-full bg-peach-200/70 h-2 rounded-full overflow-hidden">
                              <div 
                                className="bg-peach-500 h-full transition-all duration-300 rounded-full"
                                style={{ width: `${videoProgressMap[`step-video-${sIndex}-${stepIndex}`].percent}%` }}
                              />
                            </div>
                            <p className="text-[11px] text-peach-700">
                              ⚡ Compressing to WebM VP9 in browser to minimize bandwidth without losing visual sharpness.
                            </p>
                          </div>
                        )}

                        {/* Compression stats banner */}
                        {videoStatsMap[`step-video-${sIndex}-${stepIndex}`] && (
                          <div className="mt-2 px-3 py-1.5 rounded-lg bg-sage-50 border border-sage-200 text-sage-800 text-xs flex items-center justify-between animate-fade-in font-medium">
                            <span>
                              🎉 Converted to WebM! Saved {videoStatsMap[`step-video-${sIndex}-${stepIndex}`].savedPercent}% (
                              {formatBytes(videoStatsMap[`step-video-${sIndex}-${stepIndex}`].originalSize)} ➔ {formatBytes(videoStatsMap[`step-video-${sIndex}-${stepIndex}`].optimizedSize)})
                            </span>
                            <span className="text-[10px] uppercase font-bold text-sage-600 bg-sage-100 px-1.5 py-0.5 rounded">Lossless Fidelity</span>
                          </div>
                        )}

                        {/* Video preview / placeholder notice */}
                        {step.video === 'placeholder' ? (
                          <div className="mt-2 p-3 rounded-lg border border-dashed border-peach-300 bg-peach-50/50 flex items-center gap-2.5 text-xs text-peach-800">
                            <Film size={18} className="text-peach-500 flex-shrink-0" />
                            <div>
                              <strong className="block font-bold">Placeholder Active:</strong>
                              Readers will see a cozy &quot;Video Walkthrough In Production&quot; card until a video is uploaded.
                            </div>
                          </div>
                        ) : step.video ? (
                          <div className="mt-2 relative rounded-lg overflow-hidden border border-tan-200 bg-ink-950 p-1 flex flex-col items-center">
                            <video
                              src={step.video}
                              poster={step.videoPoster}
                              controls
                              className="h-32 max-w-full rounded object-contain"
                            />
                            <div className="flex items-center justify-between w-full px-2 py-1 text-cream-200 text-[11px]">
                              <span>Web Video Preview</span>
                              <button
                                type="button"
                                onClick={() => {
                                  updateStep(sIndex, stepIndex, 'video', '');
                                  updateStep(sIndex, stepIndex, 'videoPoster', '');
                                }}
                                className="text-peach-400 hover:text-peach-300 font-bold hover:underline"
                              >
                                Remove Video
                              </button>
                            </div>
                          </div>
                        ) : null}
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

          {/* Mobile Sticky Action Bar */}
          <div className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-tan-200 p-3 px-4 flex items-center justify-between gap-3 shadow-cozy-lg">
            <button
              type="button"
              onClick={() => {
                if (window.confirm("Any unsaved edits remain in local auto-draft. Close editor?")) {
                  setEditingGame(null);
                }
              }}
              className="px-3.5 py-2 rounded-xl text-xs font-bold text-tan-700 bg-tan-100 hover:bg-tan-200 active:scale-95 transition-all"
            >
              ← Back
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-xl text-xs font-bold text-white bg-earth-500 hover:bg-earth-600 active:scale-95 shadow-cozy-sm flex items-center justify-center gap-1.5"
            >
              <Save size={15} /> Save & Return
            </button>
          </div>
        </form>
      </div>
    );
  }

  // --- MAIN DASHBOARD VIEW ---
  return (
    <div className="w-full max-w-5xl mx-auto px-2.5 sm:px-4 py-4 sm:py-10 animate-fade-in min-w-0 overflow-x-clip">
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

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h2 className="text-2xl sm:text-4xl font-display font-bold text-ink-900 mb-1 sm:mb-2">Admin Dashboard</h2>
          <p className="text-tan-600 font-semibold text-xs sm:text-base">Manage your site's content. Changes auto-save continuously to protect against sudden PC shutdown.</p>
        </div>

        {/* Global Cloud Sync Status Badge & Manual Trigger */}
        <div className="flex items-center justify-between sm:justify-start gap-3 bg-white px-3 sm:px-4 py-2 rounded-2xl border border-tan-200 shadow-cozy-xs w-full sm:w-auto">
          {syncStatus === 'saving' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-earth-700 animate-pulse">
              <RefreshCw size={14} className="animate-spin" /> Syncing...
            </span>
          )}
          {syncStatus === 'synced' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-sage-700">
              <CheckCircle size={14} /> Cloud synced {lastSyncedAt ? `(${lastSyncedAt})` : ''}
            </span>
          )}
          {syncStatus === 'error' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-red-700">
              <AlertCircle size={14} /> Sync error (Saved locally)
            </span>
          )}
          {syncStatus === 'offline' && (
            <span className="flex items-center gap-1.5 text-xs font-bold text-tan-700">
              <WifiOff size={14} /> Offline mode (Saved locally)
            </span>
          )}
          <button
            type="button"
            onClick={() => void forceCloudSync()}
            disabled={syncStatus === 'saving'}
            className="text-xs font-bold px-3 py-1.5 rounded-lg border border-tan-300 bg-cream-50 hover:bg-cream-100 text-ink-900 transition-colors flex items-center gap-1.5 disabled:opacity-50 shrink-0"
            title="Force cloud synchronization now"
          >
            <Cloud size={14} /> Sync Now
          </button>
        </div>
      </div>

      <div className="flex gap-2 sm:gap-4 mb-6 border-b-2 border-tan-200 pb-2 overflow-x-auto no-scrollbar whitespace-nowrap text-sm sm:text-base w-full max-w-full">
        <button onClick={() => setActiveTab('assets')} className={`font-bold pb-2 shrink-0 transition-colors ${activeTab === 'assets' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Site Assets</button>
        <button onClick={() => setActiveTab('games')} className={`font-bold pb-2 shrink-0 transition-colors ${activeTab === 'games' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Manage Games ({games.length})</button>
        <button onClick={() => setActiveTab('articles')} className={`font-bold pb-2 shrink-0 transition-colors ${activeTab === 'articles' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Cozy Journal ({articles.length})</button>
        <button onClick={() => setActiveTab('stories')} className={`font-bold pb-2 shrink-0 transition-colors ${activeTab === 'stories' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Cozy Bookshelf ({stories.length})</button>
        <button onClick={() => setActiveTab('store')} className={`font-bold pb-2 shrink-0 transition-colors ${activeTab === 'store' ? 'text-peach-500 border-b-2 border-peach-500' : 'text-tan-500 hover:text-ink-900'}`}>Store ({products.length})</button>
      </div>

      {activeTab === 'assets' && (
        <div className="notepad-card p-3.5 sm:p-6 flex flex-col gap-6 w-full max-w-full overflow-hidden">
          <div>
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Hero Banner</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                value={heroImage} 
                onChange={(e) => setHeroImage(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none text-sm"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-initial flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap text-xs">
                  {uploadingKey === 'hero' ? 'Uploading...' : uploadedKey === 'hero' ? 'Uploaded' : <><Upload size={16} className="mr-1.5" /> Upload</>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'hero', setHeroImage)} />
                </label>
                {uploadedKey === 'hero' && <span className="text-xs font-bold text-sage-600 whitespace-nowrap" role="status">✓ Done</span>}
              </div>
            </div>
            {heroImage && <img src={heroImage} className="mt-3 h-32 w-full max-w-xl object-cover rounded-lg border border-tan-200" alt="Hero preview" />}
          </div>
          
          <div className="pb-6 border-b-2 border-tan-100">
            <label className="block font-bold text-ink-900 mb-2 flex items-center gap-2"><ImageIcon size={18}/> Logo Image</label>
            <div className="flex flex-col sm:flex-row gap-2">
              <input 
                value={logoImage} 
                onChange={(e) => setLogoImage(e.target.value)}
                className="flex-1 min-w-0 px-4 py-3 rounded-xl border-2 border-tan-200 focus:border-peach-400 bg-cream-50 focus:outline-none text-sm"
              />
              <div className="flex items-center gap-2 w-full sm:w-auto">
                <label className="flex-1 sm:flex-initial flex items-center justify-center px-4 py-3 bg-earth-100 text-earth-700 font-bold rounded-xl cursor-pointer hover:bg-earth-200 transition-colors whitespace-nowrap text-xs">
                  {uploadingKey === 'logo' ? 'Uploading...' : uploadedKey === 'logo' ? 'Uploaded' : <><Upload size={16} className="mr-1.5" /> Upload</>}
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, 'logo', setLogoImage)} />
                </label>
                {uploadedKey === 'logo' && <span className="text-xs font-bold text-sage-600 whitespace-nowrap" role="status">✓ Done</span>}
              </div>
            </div>
            {logoImage && <img src={logoImage} className="mt-3 h-16 w-16 object-cover rounded-full border border-tan-200" alt="Logo preview" />}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 border-t-2 border-tan-100 pt-5">
            {assetSaveMessage && <span className="text-sm font-bold text-sage-600" role="status">{assetSaveMessage}</span>}
            <button type="button" onClick={handleSaveAssets} className="w-full sm:w-auto site-button bg-earth-500 text-white hover:bg-earth-600 justify-center">
              <Save size={18} /> Save & Sync Assets
            </button>
          </div>

          {/* CTA LINKS & PERMANENT MULTI-WALLET CONFIGURATOR */}
          <div>
            <label className="block font-bold text-ink-900 mb-4 text-lg sm:text-xl">Footer Call-to-Action Buttons & Payment Modals</label>
            <div className="flex flex-col gap-6">
              {ctaLinks?.map((link, index) => (
                <div key={link.id} className="notepad-card p-3.5 sm:p-5 flex flex-col gap-4 w-full max-w-full min-w-0 overflow-hidden">
                  <div className="flex flex-col sm:flex-row gap-2 sm:items-center w-full min-w-0">
                    <input 
                      value={link.label}
                      onChange={(e) => {
                        const newLinks = [...ctaLinks];
                        newLinks[index].label = e.target.value;
                        setCtaLinks(newLinks);
                      }}
                      placeholder="Button Label (e.g. Buy me coffee ($5))"
                      className="w-full sm:w-1/3 min-w-0 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none font-bold text-sm"
                    />
                    <div className="flex items-center gap-2 flex-1 min-w-0">
                      <input 
                        value={link.url}
                        onChange={(e) => {
                          const newLinks = [...ctaLinks];
                          newLinks[index].url = e.target.value;
                          setCtaLinks(newLinks);
                        }}
                        placeholder="Fallback URL..."
                        className="flex-1 min-w-0 px-3 py-2 rounded-lg border border-tan-200 focus:border-peach-400 focus:outline-none text-sm"
                      />
                      <button 
                        onClick={() => setCtaLinks(ctaLinks.filter((_, i) => i !== index))}
                        className="p-2 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors shrink-0"
                        title="Delete Button"
                        aria-label="Delete button"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>

                  {/* Toggle Button to Turn ANY Button into a Payment Popup */}
                  <div className="notepad-step flex items-center justify-between p-3 sm:px-4">
                    <div className="flex items-start sm:items-center gap-2">
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
                        className="w-4 h-4 accent-peach-500 cursor-pointer mt-0.5 sm:mt-0 shrink-0"
                      />
                      <label htmlFor={`enable-payment-${link.id}`} className="text-xs sm:text-sm font-bold text-ink-900 cursor-pointer leading-tight">
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
                          <div key={wIndex} className="notepad-step p-3 sm:p-4 flex flex-col gap-3">
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                              <input 
                                value={wallet.name}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].name = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Wallet Name (e.g. GCash)"
                                className="px-2.5 py-2 text-sm rounded-lg border border-tan-200 font-bold bg-white"
                              />
                              <input 
                                value={wallet.accountName}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].accountName = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Account Name"
                                className="px-2.5 py-2 text-sm rounded-lg border border-tan-200 bg-white"
                              />
                              <div className="flex items-center gap-1.5">
                                <input 
                                  value={wallet.accountNumber}
                                  onChange={(e) => {
                                    const newLinks = [...ctaLinks];
                                    newLinks[index].wallets![wIndex].accountNumber = e.target.value;
                                    setCtaLinks(newLinks);
                                  }}
                                  placeholder="Number / Email ID"
                                  className="flex-1 px-2.5 py-2 text-sm rounded-lg border border-tan-200 font-mono bg-white"
                                />
                                <button 
                                  type="button" 
                                  onClick={() => {
                                    const newLinks = [...ctaLinks];
                                    newLinks[index].wallets = newLinks[index].wallets!.filter((_, i) => i !== wIndex);
                                    setCtaLinks(newLinks);
                                  }}
                                  className="text-red-400 hover:text-red-600 p-2 rounded-lg hover:bg-red-50 shrink-0"
                                  title="Delete Wallet"
                                  aria-label="Delete wallet"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </div>

                            {/* QR Code Upload per Wallet */}
                            <div className="flex flex-col sm:flex-row sm:items-center gap-2 pt-2 border-t border-tan-100 text-xs">
                              <span className="text-tan-500 font-bold shrink-0">QR Image:</span>
                              <input 
                                value={wallet.qrCode || ''}
                                onChange={(e) => {
                                  const newLinks = [...ctaLinks];
                                  newLinks[index].wallets![wIndex].qrCode = e.target.value;
                                  setCtaLinks(newLinks);
                                }}
                                placeholder="Paste QR image URL or upload..."
                                className="flex-1 min-w-0 px-2 py-1.5 rounded-lg border border-tan-200 bg-cream-50"
                              />
                              <div className="flex items-center gap-2">
                                <label className="px-3 py-1.5 bg-earth-100 text-earth-700 font-bold rounded-lg cursor-pointer hover:bg-earth-200 whitespace-nowrap">
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
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <button 
                onClick={() => setCtaLinks([...(ctaLinks || []), { id: `link-${Date.now()}`, label: 'New Link', url: '' }])}
                className="self-start mt-2 px-4 py-2 bg-peach-50 text-peach-600 font-bold rounded-lg flex items-center gap-2 hover:bg-peach-100 transition-colors text-sm"
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
            <div key={game.id} className="notepad-card p-3 sm:p-5 flex flex-col sm:flex-row justify-between sm:items-center gap-3 w-full max-w-full overflow-hidden">
              <div className="flex items-center gap-3 sm:gap-4 flex-1 min-w-0">
                {/* Reorder arrows */}
                <div className="flex sm:flex-col gap-1 shrink-0">
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

                <div 
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl object-cover shadow-sm bg-cover bg-center border border-tan-200 shrink-0"
                  style={{ backgroundImage: `url(${game.coverImage})`}} 
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap">
                    <h3 className="font-bold text-base sm:text-xl text-ink-900 truncate max-w-full">{game.title}</h3>
                    <span className="text-[11px] sm:text-xs font-bold px-2 py-0.5 rounded-full bg-peach-100 text-peach-700 border border-peach-200 shrink-0">
                      {game.category || 'Cozy Games'}
                    </span>
                  </div>
                  <span className="text-xs sm:text-sm font-semibold text-tan-500 bg-tan-100 px-2 py-0.5 sm:py-1 rounded-md mt-1 inline-block">
                    {game.walkthrough.length} Walkthrough Sections
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 sm:gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-tan-100">
                <button 
                  onClick={() => setEditingGame(game)} 
                  className="flex-1 sm:flex-initial justify-center p-2.5 sm:p-3 text-earth-700 bg-earth-100 hover:bg-earth-200 font-bold rounded-xl flex items-center gap-1.5 sm:gap-2 transition-colors text-sm"
                >
                  <Edit2 size={16} /> Edit Game
                </button>
                <button 
                  onClick={() => handleDeleteGame(game.id)} 
                  className="p-2.5 sm:p-3 text-red-500 bg-red-50 hover:bg-red-100 hover:text-red-700 rounded-xl transition-colors"
                  title="Delete Game"
                  aria-label="Delete Game"
                >
                  <Trash2 size={18} />
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
              authorRole: 'Writer',
              summary: 'A short cozy summary for this article...',
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
                  callout: {
                    title: 'Cozy Tip',
                    text: 'Take your time and enjoy the quiet moments.',
                  },
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
                  genre: 'Cozy Fantasy',
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
                <div key={story.id} className="notepad-card p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-start sm:items-center gap-3 sm:gap-4 flex-1 min-w-0">
                    <img
                      src={story.coverImage}
                      alt={story.coverAlt}
                      className="w-14 h-18 sm:w-16 sm:h-20 object-cover rounded-xl border border-tan-200 shadow-cozy-sm shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 sm:gap-2 mb-1 flex-wrap">
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
                      <h4 className="font-display font-bold text-base text-ink-900 truncate">{story.title}</h4>
                      <p className="text-xs text-tan-600 font-sans mt-0.5">
                        By {story.author} • {story.chapters.length} Chapters • ~{totalWords.toLocaleString()} words
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end border-t sm:border-t-0 pt-2 sm:pt-0 border-tan-100">
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

      {activeTab === 'store' && (
        <StoreManager
          products={products}
          onAddProduct={addProduct}
          onUpdateProduct={updateProduct}
          onRemoveProduct={removeProduct}
          onReorderProduct={reorderProduct}
          onUploadImage={handleImageUpload}
          uploadingKey={uploadingKey}
        />
      )}
    </div>
  );
}