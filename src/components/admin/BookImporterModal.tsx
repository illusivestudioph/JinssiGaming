import { useState, useRef, useEffect } from 'react';
import type { Story, StoryChapter, StoryGenre } from '@/data/stories';
import { storyGenres } from '@/data/stories';
import { supabase } from '@/lib/supabase';
import {
  fetchGutenbergById,
  FALLBACK_GUTENBERG_CATALOG,
  convertGutenbergToStory,
  type GutenbergBook,
} from '@/services/gutenberg';
import * as pdfjsLib from 'pdfjs-dist';
import {
  Upload,
  Link as LinkIcon,
  BookOpen,
  FileText,
  Sparkles,
  Check,
  StreamlineClose as Close,
  Loader2,
  Trash2,
  ExternalLink,
  Edit2,
  Plus,
} from '@/components/StreamlineIcons';

interface BookImporterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSaveBook: (story: Story) => void;
  onOpenStoryEditor?: (templateStory: Story) => void;
  initialUrl?: string;
  initialRequester?: string;
  initialIsRequested?: boolean;
}

type ImportTab = 'url' | 'upload';

export function BookImporterModal({
  isOpen,
  onClose,
  onSaveBook,
  onOpenStoryEditor,
  initialUrl,
  initialRequester,
  initialIsRequested,
}: BookImporterModalProps) {
  const [activeTab, setActiveTab] = useState<ImportTab>('url');

  // URL Import State
  const [urlInput, setUrlInput] = useState('');
  const [isUrlLoading, setIsUrlLoading] = useState(false);
  const [urlStatusMsg, setUrlStatusMsg] = useState('');
  const [urlError, setUrlError] = useState('');

  // File Upload State
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatusMsg, setUploadStatusMsg] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Staged Story Preview (editable before saving)
  const [stagedStory, setStagedStory] = useState<Story | null>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialUrl) {
        setUrlInput(initialUrl);
      }
    } else {
      setUrlInput('');
      setStagedStory(null);
      setUrlError('');
      setUrlStatusMsg('');
      setUploadError('');
      setUploadStatusMsg('');
    }
  }, [isOpen, initialUrl]);

  const applyRequestedDefaults = (story: Story): Story => {
    if (initialIsRequested || initialRequester) {
      return {
        ...story,
        isRequestedBook: true,
        isMembersOnly: true,
        requestedBy: initialRequester || story.requestedBy || 'Community Member',
        tags: story.tags?.includes('Community Request')
          ? story.tags
          : ['Community Request', ...(story.tags || [])],
      };
    }
    return story;
  };

  if (!isOpen) return null;

  // ----------------------------------------------------
  // Handler 1: Parse & Inspect Book from URL
  // ----------------------------------------------------
  const handleInspectUrl = async () => {
    setUrlError('');
    setUrlStatusMsg('');
    const raw = urlInput.trim();
    if (!raw) {
      setUrlError('Please enter a URL or Gutenberg ID.');
      return;
    }

    setIsUrlLoading(true);

    try {
      // 1. Check if it's a Project Gutenberg URL or numerical ID
      let gutenbergId: number | null = null;
      const idMatch = raw.match(/(?:gutenberg\.org\/(?:ebooks|files)\/|#)?(\d+)/i);
      if (idMatch && idMatch[1]) {
        gutenbergId = parseInt(idMatch[1], 10);
      } else if (/^\d+$/.test(raw)) {
        gutenbergId = parseInt(raw, 10);
      }

      if (gutenbergId) {
        setUrlStatusMsg(`Finding Project Gutenberg eBook #${gutenbergId}...`);

        // Check fallback catalog first
        const matched = FALLBACK_GUTENBERG_CATALOG.find((b) => b.id === gutenbergId);
        if (matched) {
          const story = convertGutenbergToStory(matched);
          story.isPinned = false;
          setStagedStory(story);
          setUrlStatusMsg('Found in catalog! Ready to add.');
          setIsUrlLoading(false);
          return;
        }

        // Fetch via service
        setUrlStatusMsg(`Connecting to Project Gutenberg archive for eBook #${gutenbergId}...`);
        const fetched = await fetchGutenbergById(
          gutenbergId,
          undefined,
          undefined,
          (msg) => setUrlStatusMsg(msg)
        );
        fetched.isPinned = false;
        setStagedStory(fetched);
        setUrlStatusMsg('eBook metadata and chapters fetched successfully!');
        setIsUrlLoading(false);
        return;
      }

      // 2. Check if it is a Direct PDF URL
      const isPdfUrl = raw.toLowerCase().includes('.pdf') || raw.toLowerCase().includes('/pdf');
      if (isPdfUrl) {
        setUrlStatusMsg('Configuring as PDF eBook edition...');
        const cleanName = raw.split('/').pop()?.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ') || 'New PDF Book';
        const formattedTitle = cleanName.charAt(0).toUpperCase() + cleanName.slice(1);
        const slug = `pdf-${cleanName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`;

        const pdfStory: Story = {
          id: `story-${Date.now()}`,
          slug,
          title: formattedTitle,
          synopsis: `Complete unabridged PDF digital facsimile edition. Read online with integrated multi-tone reader and continuous zoom controls.`,
          author: 'Author Name',
          authorRole: 'Author',
          coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
          coverAlt: `Cover for ${formattedTitle}`,
          status: 'Completed',
          genre: 'Classic Literature',
          tags: ['PDF eBook', 'Facsimile Edition', 'Unabridged'],
          totalChapters: 1,
          isPdfEbook: true,
          pdfUrl: raw,
          pageCount: 100,
          rating: 5,
          readsCount: 0,
          chapters: [
            {
              id: `pdf-ch-1-${Date.now()}`,
              chapterNumber: 1,
              title: 'Full Unabridged PDF Edition',
              wordCount: 5000,
              readTimeMinutes: 25,
              publishedDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              authorNote: 'Open in the PDF Viewer to browse the authentic original pages.',
              content: [
                'This volume is presented in high-fidelity PDF facsimile format. Click "Read" or switch between View modes in the reader toolbar.',
              ],
            },
          ],
        };

        setStagedStory(pdfStory);
        setUrlStatusMsg('PDF eBook detected! Review and edit details below.');
        setIsUrlLoading(false);
        return;
      }

      // 3. Fallback generic Web Novel / Story Link
      const slug = `web-novel-${Date.now().toString(36)}`;
      const genericStory: Story = {
        id: `story-${Date.now()}`,
        slug,
        title: 'New Web Novel / Book',
        synopsis: `Imported from ${raw}. A curated literary work on Jinssi Bookshelf.`,
        author: 'Author Name',
        authorRole: 'Writer',
        coverImage: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
        coverAlt: 'Book cover illustration',
        status: 'Ongoing',
        genre: 'Cozy Fantasy',
        tags: ['Web Novel', 'Curated Read'],
        totalChapters: 1,
        rating: 5,
        chapters: [
          {
            id: `ch-1-${Date.now()}`,
            chapterNumber: 1,
            title: 'Chapter 1: The Beginning',
            wordCount: 200,
            readTimeMinutes: 2,
            publishedDate: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            content: [
              `Imported reference URL: ${raw}`,
              'You can paste chapter text in the Story Editor or read linked chapters online.',
            ],
          },
        ],
      };
      setStagedStory(genericStory);
      setUrlStatusMsg('Story initialized! Edit details and save below.');
    } catch (err: unknown) {
      console.error('URL inspection failed:', err);
      const msg = err instanceof Error ? err.message : 'Failed to inspect link.';
      setUrlError(`Could not fetch book details: ${msg}`);
    } finally {
      setIsUrlLoading(false);
    }
  };

  // ----------------------------------------------------
  // Handler 2: File Upload (PDF, EPUB, TXT, MD, JSON)
  // ----------------------------------------------------
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    setUploadStatusMsg('');
    setIsUploading(true);
    setUploadProgress(10);

    const ext = file.name.split('.').pop()?.toLowerCase();
    const cleanBaseName = file.name
      .replace(/\.[^/.]+$/, '')
      .replace(/[-_]+/g, ' ')
      .trim();
    const formattedTitle =
      cleanBaseName.charAt(0).toUpperCase() + cleanBaseName.slice(1);

    try {
      // Option A: PDF Upload
      if (ext === 'pdf') {
        setUploadStatusMsg('Reading PDF structure & page count...');
        setUploadProgress(25);

        const arrayBuffer = await file.arrayBuffer();
        let pageCount = 1;
        let coverDataUrl = '';

        try {
          const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
          const pdfDoc = await loadingTask.promise;
          pageCount = pdfDoc.numPages || 1;

          // Render Page 1 to generate authentic cover thumbnail
          setUploadStatusMsg(`Generating cover from Page 1 (Total: ${pageCount} pages)...`);
          setUploadProgress(40);
          const page1 = await pdfDoc.getPage(1);
          const viewport = page1.getViewport({ scale: 0.8 });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            await page1.render({ canvasContext: ctx, viewport }).promise;
            coverDataUrl = canvas.toDataURL('image/jpeg', 0.85);
          }
        } catch (pdfErr) {
          console.warn('PDF page extract notice:', pdfErr);
        }

        // Upload PDF to Supabase Storage
        setUploadStatusMsg('Uploading PDF to cloud storage bucket...');
        setUploadProgress(60);

        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `ebooks/${Date.now()}-${sanitizedName}`;

        const { error: uploadErr } = await supabase.storage
          .from('site-images')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        if (uploadErr) {
          console.warn('Storage upload error, using local object URL fallback:', uploadErr.message);
        }

        const { data: publicData } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);

        const finalPdfUrl = publicData?.publicUrl || URL.createObjectURL(file);

        // Upload Cover thumbnail if generated
        let finalCoverUrl = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80';
        if (coverDataUrl) {
          try {
            const blob = await (await fetch(coverDataUrl)).blob();
            const coverPath = `covers/${Date.now()}-cover.jpg`;
            const { error: cErr } = await supabase.storage
              .from('site-images')
              .upload(coverPath, blob, { contentType: 'image/jpeg', upsert: true });
            if (!cErr) {
              const { data: cData } = supabase.storage
                .from('site-images')
                .getPublicUrl(coverPath);
              if (cData?.publicUrl) finalCoverUrl = cData.publicUrl;
            }
          } catch {
            // ignore
          }
        }

        setUploadProgress(95);
        setUploadStatusMsg('PDF eBook uploaded and ready!');

        const pdfStory: Story = {
          id: `story-pdf-${Date.now()}`,
          slug: `pdf-${cleanBaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
          title: formattedTitle,
          synopsis: `Authentic ${pageCount}-page PDF unabridged edition of ${formattedTitle}. Read online in the cozy dual-mode reader.`,
          author: 'Author Name',
          authorRole: 'Author',
          coverImage: finalCoverUrl,
          coverAlt: `Original front cover for ${formattedTitle}`,
          status: 'Completed',
          genre: 'Classic Literature',
          tags: ['Unabridged PDF', 'Uploaded eBook', 'Facsimile'],
          totalChapters: 1,
          isPdfEbook: true,
          pdfUrl: finalPdfUrl,
          pageCount,
          rating: 5,
          readsCount: 0,
          chapters: [
            {
              id: `pdf-ch-1-${Date.now()}`,
              chapterNumber: 1,
              title: `Complete Edition (${pageCount} Pages)`,
              wordCount: pageCount * 250,
              readTimeMinutes: Math.ceil((pageCount * 250) / 200),
              publishedDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              authorNote: 'Uploaded directly to Jinssi Sanctuary cloud.',
              content: [
                `This edition contains ${pageCount} authentic facsimile pages. Use the page controls, zoom, and background tone filters to read peacefully.`,
              ],
            },
          ],
        };

        setStagedStory(pdfStory);
        setUploadProgress(100);
        setIsUploading(false);
        return;
      }

      // Option B: Text / Markdown Upload (.txt, .md)
      if (ext === 'txt' || ext === 'md') {
        setUploadStatusMsg('Parsing chapters and calculating word counts...');
        setUploadProgress(50);

        const text = await file.text();

        // Intelligent chapter splitting
        // Split by lines like: "Chapter 1", "CHAPTER I", "## Chapter", or major page break
        const chapterRegex = /(?:^|\n)(?=#{1,3}\s+Chapter|Chapter\s+[0-9IVXLCDM]+|CHAPTER\s+[0-9IVXLCDM]+|Part\s+[0-9IVXLCDM]+|Book\s+[0-9IVXLCDM]+)/i;
        const rawChapters = text.split(chapterRegex).filter((ch) => ch.trim().length > 50);

        const parsedChapters: StoryChapter[] = [];

        if (rawChapters.length > 0) {
          rawChapters.forEach((rawCh, idx) => {
            const lines = rawCh.trim().split(/\r?\n/).filter(Boolean);
            const titleLine = lines[0] || `Chapter ${idx + 1}`;
            const cleanTitle = titleLine.replace(/^#+\s*/, '').slice(0, 80);
            const bodyLines = lines.slice(1);

            // Group into paragraphs
            const paragraphs = bodyLines.join('\n').split(/\n\s*\n/).filter((p) => p.trim().length > 0);
            const wordCount = rawCh.trim().split(/\s+/).filter(Boolean).length;

            parsedChapters.push({
              id: `ch-${idx + 1}-${Date.now()}`,
              chapterNumber: idx + 1,
              title: cleanTitle.length > 3 ? cleanTitle : `Chapter ${idx + 1}`,
              wordCount,
              readTimeMinutes: Math.max(1, Math.ceil(wordCount / 200)),
              publishedDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              content: paragraphs.length > 0 ? paragraphs : [rawCh.trim()],
            });
          });
        } else {
          // Single chapter
          const paragraphs = text.split(/\n\s*\n/).filter((p) => p.trim().length > 0);
          const words = text.trim().split(/\s+/).filter(Boolean).length;
          parsedChapters.push({
            id: `ch-1-${Date.now()}`,
            chapterNumber: 1,
            title: formattedTitle,
            wordCount: words,
            readTimeMinutes: Math.max(1, Math.ceil(words / 200)),
            publishedDate: new Date().toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            }),
            content: paragraphs.length > 0 ? paragraphs : [text.trim()],
          });
        }

        const textStory: Story = {
          id: `story-txt-${Date.now()}`,
          slug: `story-${cleanBaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
          title: formattedTitle,
          synopsis: `Complete unabridged text edition with ${parsedChapters.length} chapters and ~${parsedChapters.reduce((acc, c) => acc + c.wordCount, 0).toLocaleString()} words.`,
          author: 'Author Name',
          authorRole: 'Author',
          coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
          coverAlt: `Book cover illustration for ${formattedTitle}`,
          status: 'Completed',
          genre: 'Classic Literature',
          tags: ['Text Edition', `${parsedChapters.length} Chapters`],
          totalChapters: parsedChapters.length,
          rating: 5,
          readsCount: 0,
          chapters: parsedChapters,
        };

        setStagedStory(textStory);
        setUploadProgress(100);
        setUploadStatusMsg(`Extracted ${parsedChapters.length} chapters successfully!`);
        setIsUploading(false);
        return;
      }

      // Option C: JSON Story Schema Import (.json)
      if (ext === 'json') {
        const text = await file.text();
        const parsed = JSON.parse(text) as Story;
        if (!parsed.title || !parsed.chapters) {
          throw new Error('Invalid Story JSON: missing title or chapters.');
        }
        parsed.id = parsed.id || `story-${Date.now()}`;
        parsed.slug = parsed.slug || `story-${Date.now().toString(36)}`;
        setStagedStory(parsed);
        setUploadStatusMsg('Story JSON parsed successfully!');
        setUploadProgress(100);
        setIsUploading(false);
        return;
      }

      // Option D: EPUB (.epub)
      if (ext === 'epub') {
        setUploadStatusMsg('Uploading EPUB file to storage...');
        const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
        const filePath = `ebooks/${Date.now()}-${sanitizedName}`;
        await supabase.storage
          .from('site-images')
          .upload(filePath, file, { cacheControl: '3600', upsert: true });

        const { data: publicData } = supabase.storage
          .from('site-images')
          .getPublicUrl(filePath);

        const epubStory: Story = {
          id: `story-epub-${Date.now()}`,
          slug: `epub-${cleanBaseName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now().toString(36)}`,
          title: formattedTitle,
          synopsis: `Digital EPUB publication for ${formattedTitle}.`,
          author: 'Author Name',
          authorRole: 'Author',
          coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
          coverAlt: `EPUB edition cover for ${formattedTitle}`,
          status: 'Completed',
          genre: 'Classic Literature',
          tags: ['EPUB eBook', 'Digital Publication'],
          totalChapters: 1,
          pdfUrl: publicData?.publicUrl,
          rating: 5,
          chapters: [
            {
              id: `epub-ch-1-${Date.now()}`,
              chapterNumber: 1,
              title: 'Chapter 1: The Beginning',
              wordCount: 1000,
              readTimeMinutes: 5,
              publishedDate: new Date().toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              }),
              content: [
                `EPUB file uploaded to: ${publicData?.publicUrl || 'local file'}`,
                'You can edit chapters and paragraphs in the Story Editor.',
              ],
            },
          ],
        };
        setStagedStory(epubStory);
        setUploadStatusMsg('EPUB imported! Review and edit details below.');
        setUploadProgress(100);
        setIsUploading(false);
        return;
      }

      throw new Error(`Unsupported file type (.${ext}). Please upload .pdf, .txt, .md, .epub, or .json`);
    } catch (err: unknown) {
      console.error('File import error:', err);
      const msg = err instanceof Error ? err.message : 'Upload failed.';
      setUploadError(msg);
      setIsUploading(false);
    }
  };

  // ----------------------------------------------------
  // Handler 3: Save & Publish Staged Story
  // ----------------------------------------------------
  const handleConfirmSave = () => {
    if (!stagedStory) return;
    onSaveBook(stagedStory);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/60 backdrop-blur-sm animate-fade-in">
      <div className="notepad-card max-w-2xl w-full p-6 sm:p-8 space-y-6 bg-cream-50 shadow-2xl border-2 border-peach-200 relative max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-tan-400 hover:text-ink-900 rounded-full hover:bg-cream-100 transition-colors"
        >
          <Close size={20} />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-1">
          <div className="w-12 h-12 rounded-2xl bg-peach-100 text-peach-600 mx-auto flex items-center justify-center shadow-inner">
            <BookOpen className="w-6 h-6" />
          </div>
          <h2 className="font-display font-bold text-2xl text-ink-900">
            Add Book to Bookshelf
          </h2>
          <p className="text-xs text-tan-600 font-sans">
            Easily add books by uploading PDF/TXT/EPUB files or pasting Project Gutenberg / PDF URLs.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex rounded-xl bg-cream-200 p-1 border border-tan-200 gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('url')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'url'
                ? 'bg-peach-500 text-white shadow-cozy-xs'
                : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            <LinkIcon size={14} />
            <span>Paste URL Link</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('upload')}
            className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'upload'
                ? 'bg-peach-500 text-white shadow-cozy-xs'
                : 'text-ink-700 hover:text-ink-900'
            }`}
          >
            <Upload size={14} />
            <span>Upload Book File</span>
          </button>
        </div>

        {/* TAB 1: PASTE URL */}
        {activeTab === 'url' && (
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-ink-900 uppercase tracking-wider mb-1.5">
                Paste Project Gutenberg Link, ID, or PDF URL
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="e.g. https://www.gutenberg.org/ebooks/1342, 1342, or https://.../book.pdf"
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleInspectUrl()}
                  className="site-input flex-1 py-2 px-3 text-xs rounded-xl"
                  disabled={isUrlLoading}
                />
                <button
                  type="button"
                  onClick={handleInspectUrl}
                  disabled={isUrlLoading || !urlInput.trim()}
                  className="site-button bg-peach-500 hover:bg-peach-600 disabled:opacity-50 text-white text-xs font-bold px-4 py-2 rounded-xl flex items-center gap-1.5 shadow-cozy-xs shrink-0"
                >
                  {isUrlLoading ? (
                    <>
                      <Loader2 size={14} className="animate-spin" />
                      <span>Fetching...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={14} />
                      <span>Fetch Book</span>
                    </>
                  )}
                </button>
              </div>
              <p className="text-[11px] text-tan-600 mt-1">
                Tip: Enter any Gutenberg eBook ID (e.g. <code>1342</code> for Pride and Prejudice, <code>1661</code> for Sherlock Holmes) or any online PDF URL.
              </p>
            </div>

            {urlStatusMsg && (
              <div className="p-3 bg-peach-50 border border-peach-200 text-xs text-peach-800 rounded-xl flex items-center gap-2">
                <Sparkles size={14} className="text-peach-600 shrink-0" />
                <span>{urlStatusMsg}</span>
              </div>
            )}

            {urlError && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl">
                {urlError}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: UPLOAD FILE */}
        {activeTab === 'upload' && (
          <div className="space-y-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-peach-300 hover:border-peach-500 bg-cream-100/60 hover:bg-cream-100 rounded-2xl p-6 text-center cursor-pointer transition-colors space-y-2"
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.txt,.md,.epub,.json"
                onChange={handleFileUpload}
                className="hidden"
              />
              <div className="w-12 h-12 rounded-2xl bg-peach-200/70 text-peach-700 mx-auto flex items-center justify-center">
                <Upload size={22} />
              </div>
              <div>
                <p className="text-xs font-bold text-ink-900">
                  Click to browse or drag & drop book file
                </p>
                <p className="text-[11px] text-tan-600 mt-0.5">
                  Supports <strong>PDF</strong> (auto-page count & thumbnail), <strong>TXT/Markdown</strong> (auto-chapters), <strong>EPUB</strong>, and <strong>Story JSON</strong>
                </p>
              </div>
            </div>

            {isUploading && (
              <div className="space-y-2 p-3 bg-peach-50 rounded-xl border border-peach-200">
                <div className="flex items-center justify-between text-xs font-bold text-peach-800">
                  <span className="flex items-center gap-1.5">
                    <Loader2 size={13} className="animate-spin text-peach-600" />
                    <span>{uploadStatusMsg || 'Uploading and processing book...'}</span>
                  </span>
                  <span>{uploadProgress}%</span>
                </div>
                <div className="w-full bg-peach-200 h-2 rounded-full overflow-hidden">
                  <div
                    className="bg-peach-500 h-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  />
                </div>
              </div>
            )}

            {uploadStatusMsg && !isUploading && (
              <div className="p-3 bg-peach-50 border border-peach-200 text-xs text-peach-800 rounded-xl flex items-center gap-2">
                <Check size={14} className="text-peach-600 shrink-0" />
                <span>{uploadStatusMsg}</span>
              </div>
            )}

            {uploadError && (
              <div className="p-3 bg-red-50 border border-red-200 text-xs text-red-700 rounded-xl">
                {uploadError}
              </div>
            )}
          </div>
        )}

        {/* STAGED BOOK PREVIEW & EDIT FORM */}
        {stagedStory && (
          <div className="p-4 sm:p-5 bg-white rounded-2xl border-2 border-tan-200 shadow-cozy-sm space-y-4 animate-scale-up">
            <div className="flex items-center justify-between border-b border-tan-100 pb-2">
              <span className="text-xs font-bold text-peach-700 uppercase tracking-wider flex items-center gap-1">
                <Sparkles size={13} />
                <span>Book Preview & Metadata</span>
              </span>
              <button
                type="button"
                onClick={() => setStagedStory(null)}
                className="text-[11px] font-bold text-tan-500 hover:text-red-500 transition-colors"
              >
                Clear Preview
              </button>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start">
              {/* Cover Image & Change Option */}
              <div className="space-y-2 shrink-0 w-28 sm:w-32">
                <img
                  src={stagedStory.coverImage}
                  alt={stagedStory.coverAlt}
                  className="w-full h-40 object-cover rounded-xl border border-tan-200 shadow-cozy-xs"
                />
                <input
                  type="text"
                  placeholder="Cover image URL"
                  value={stagedStory.coverImage}
                  onChange={(e) => setStagedStory({ ...stagedStory, coverImage: e.target.value })}
                  className="site-input w-full text-[10px] py-1 px-1.5 rounded-lg"
                  title="Cover image URL"
                />
              </div>

              {/* Editable Fields */}
              <div className="flex-1 space-y-3 w-full min-w-0">
                <div>
                  <label className="block text-[11px] font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Book Title
                  </label>
                  <input
                    type="text"
                    value={stagedStory.title}
                    onChange={(e) => setStagedStory({ ...stagedStory, title: e.target.value })}
                    className="site-input w-full py-1.5 px-2.5 text-xs rounded-xl font-bold"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  <div>
                    <label className="block text-[11px] font-bold text-ink-900 uppercase tracking-wider mb-1">
                      Author Name
                    </label>
                    <input
                      type="text"
                      value={stagedStory.author}
                      onChange={(e) => setStagedStory({ ...stagedStory, author: e.target.value })}
                      className="site-input w-full py-1 px-2 text-xs rounded-xl"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-ink-900 uppercase tracking-wider mb-1">
                      Genre
                    </label>
                    <select
                      value={stagedStory.genre}
                      onChange={(e) =>
                        setStagedStory({ ...stagedStory, genre: e.target.value as StoryGenre })
                      }
                      className="site-input w-full py-1 px-2 text-xs rounded-xl"
                    >
                      {storyGenres.filter((g) => g !== 'All').map((g) => (
                        <option key={g} value={g}>
                          {g}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold text-ink-900 uppercase tracking-wider mb-1">
                    Synopsis / Summary
                  </label>
                  <textarea
                    rows={2}
                    value={stagedStory.synopsis}
                    onChange={(e) => setStagedStory({ ...stagedStory, synopsis: e.target.value })}
                    className="site-input w-full p-2 text-xs rounded-xl resize-none"
                  />
                </div>

                {/* Community Requested Book & Members-Only Access Controls */}
                <div className="p-3 rounded-xl bg-peach-50/80 border border-peach-200 space-y-2">
                  <label className="flex items-center gap-2 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={Boolean(stagedStory.isRequestedBook)}
                      onChange={(e) =>
                        setStagedStory({
                          ...stagedStory,
                          isRequestedBook: e.target.checked,
                          isMembersOnly: e.target.checked,
                          tags: e.target.checked
                            ? stagedStory.tags?.includes('Community Request')
                              ? stagedStory.tags
                              : ['Community Request', ...(stagedStory.tags || [])]
                            : stagedStory.tags?.filter((t) => t !== 'Community Request') || [],
                        })
                      }
                      className="rounded text-peach-500 focus:ring-peach-400"
                    />
                    <span className="text-xs font-bold text-ink-900 flex items-center gap-1.5">
                      <span>🔒 Community Requested Book (Members-Only Access)</span>
                    </span>
                  </label>

                  {stagedStory.isRequestedBook && (
                    <div className="pt-1">
                      <label className="block text-[10px] font-bold text-peach-900 uppercase tracking-wider mb-1">
                        Requested by (Member Name or Community Wishlist)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. Aria M., ArchaeologyFan, Community Wishlist"
                        value={stagedStory.requestedBy || ''}
                        onChange={(e) =>
                          setStagedStory({
                            ...stagedStory,
                            requestedBy: e.target.value,
                          })
                        }
                        className="site-input w-full py-1.5 px-2.5 text-xs rounded-lg"
                      />
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2 flex-wrap text-xs text-tan-600 font-sans">
                  {stagedStory.isRequestedBook && (
                    <span className="px-2 py-0.5 rounded-full bg-peach-500 text-white font-bold text-[10px] flex items-center gap-1 shadow-cozy-xs">
                      <span>🔒</span>
                      <span>Members Only</span>
                    </span>
                  )}
                  {stagedStory.isPdfEbook ? (
                    <span className="px-2 py-0.5 rounded-full bg-peach-100 text-peach-800 font-bold text-[10px]">
                      📄 PDF E-Book ({stagedStory.pageCount || 1} Pages)
                    </span>
                  ) : (
                    <span className="px-2 py-0.5 rounded-full bg-earth-100 text-earth-800 font-bold text-[10px]">
                      📚 {stagedStory.chapters.length} Chapters
                    </span>
                  )}
                  {stagedStory.isPublicDomain && (
                    <span className="px-2 py-0.5 rounded-full bg-cream-200 text-tan-800 font-bold text-[10px]">
                      Public Domain
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Save Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 pt-2 border-t border-tan-100">
              {onOpenStoryEditor && !stagedStory.isPdfEbook && (
                <button
                  type="button"
                  onClick={() => {
                    onOpenStoryEditor(stagedStory);
                    onClose();
                  }}
                  className="py-2.5 px-4 rounded-xl bg-tan-200 hover:bg-tan-300 text-ink-800 text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Edit2 size={14} /> Open in Story Editor
                </button>
              )}
              <button
                type="button"
                onClick={handleConfirmSave}
                className="flex-1 py-2.5 px-4 rounded-xl bg-earth-500 hover:bg-earth-600 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-cozy-sm transition-transform active:scale-95"
              >
                <Check size={16} /> Publish to Bookshelf
              </button>
            </div>
          </div>
        )}

        {/* Footer Actions */}
        <div className="flex items-center justify-between pt-2 border-t border-tan-200">
          <button
            type="button"
            onClick={onClose}
            className="text-xs font-bold text-tan-600 hover:text-ink-900 transition-colors"
          >
            Cancel
          </button>
          {onOpenStoryEditor && !stagedStory && (
            <button
              type="button"
              onClick={() => {
                const template: Story = {
                  id: `story-${Date.now()}`,
                  slug: `story-${Date.now().toString(36)}`,
                  title: 'New Story',
                  synopsis: 'A cozy synopsis for your new book or web-novel...',
                  author: 'Jinssi',
                  authorRole: 'Fiction Writer',
                  coverImage:
                    'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&q=80',
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
                onOpenStoryEditor(template);
                onClose();
              }}
              className="text-xs font-bold text-peach-600 hover:text-peach-700 flex items-center gap-1"
            >
              <Plus size={14} /> Write from Scratch
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
