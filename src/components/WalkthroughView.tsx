import { useEffect, useRef, useState, useCallback, useMemo } from 'react';
import type { Game, WalkthroughSection } from '@/data/games';
import { useProgress } from '@/hooks/useProgress';
import { useMusic } from '@/context/MusicContext';
import { CommentSection } from './CommentSection';
import { TableOfContents } from './TableOfContents';
import { ConfettiCanvas } from './ConfettiCanvas';
import { getOptimizedImageUrl } from '@/utils/imageOptimization';
import { useChat } from '@/context/ChatContext';
import {
  ArrowLeft,
  Check,
  Eye,
  EyeOff,
  RotateCcw,
  BookOpen,
  ExternalLink,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  X,
  Share2,
  Copy,
  Mail,
  Play,
  Film,
  Image as ImageIcon,
} from '@/components/StreamlineIcons';

interface WalkthroughViewProps {
  game: Game;
  onBack: () => void;
}

export function WalkthroughView({ game, onBack }: WalkthroughViewProps) {
  const { isOpen: isChatOpen } = useChat();
  const { completedSteps, toggleStep, showSpoilers, toggleSpoilers, resetProgress } =
    useProgress(game.id);
  const { playCheckSfx, playUncheckSfx, playDropdownSfx } = useMusic();

  const handleStepToggleWithSfx = (stepKey: string) => {
    if (!completedSteps.has(stepKey)) {
      playCheckSfx();
    } else {
      playUncheckSfx();
    }
    toggleStep(stepKey);
  };

  const totalSteps = game.walkthrough.reduce(
    (sum, ch) => sum + ch.steps.length,
    0
  );
  const completedCount = completedSteps.size;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  const isComplete = progressPercent === 100 && totalSteps > 0;
  const [showCongratulations, setShowCongratulations] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const tuturoRef = useRef<HTMLDivElement | null>(null);
  const [mediaTab, setMediaTab] = useState<'trailer' | 'cover'>(() => game.video ? 'trailer' : 'cover');

  // Multi-cover carousel state
  const allCovers = useMemo(() => {
    const list = Array.isArray(game.coverImages) && game.coverImages.length > 0
      ? game.coverImages.filter((c): c is string => typeof c === 'string' && c.trim().length > 0)
      : [];
    if (list.length === 0 && game.coverImage) {
      list.push(game.coverImage);
    }
    return list;
  }, [game.coverImages, game.coverImage]);

  const [activeCoverIndex, setActiveCoverIndex] = useState(0);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  // Auto-next loop: cycles every 4.5 seconds when multiple covers are available
  useEffect(() => {
    if (allCovers.length <= 1 || isCarouselHovered) return;
    const interval = setInterval(() => {
      setActiveCoverIndex((prev) => (prev + 1) % allCovers.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [allCovers.length, isCarouselHovered]);

  const handlePrevCover = useCallback(() => {
    setActiveCoverIndex((prev) => (prev === 0 ? allCovers.length - 1 : prev - 1));
  }, [allCovers.length]);

  const handleNextCover = useCallback(() => {
    setActiveCoverIndex((prev) => (prev + 1) % allCovers.length);
  }, [allCovers.length]);

  // Table of Contents navigation state
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(game.walkthrough.map((sec) => [sec.id, true]))
  );
  const [highlightedStepKey, setHighlightedStepKey] = useState<string | null>(null);
  const [showFloatingTOC, setShowFloatingTOC] = useState(false);

  // Detect scroll to show floating quick-jump button
  useEffect(() => {
    const handleScroll = () => {
      setShowFloatingTOC(window.scrollY > 380);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSelectSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => ({ ...prev, [sectionId]: true }));
    setTimeout(() => {
      const element = document.getElementById(`section-${sectionId}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  }, []);

  const handleSelectStep = useCallback((sectionId: string, stepId: string) => {
    const stepKey = `${sectionId}-${stepId}`;
    setExpandedSections((prev) => ({ ...prev, [sectionId]: true }));
    setTimeout(() => {
      const element = document.getElementById(`step-${stepKey}`);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setHighlightedStepKey(stepKey);
        setTimeout(() => {
          setHighlightedStepKey((current) => (current === stepKey ? null : current));
        }, 2500);
      }
    }, 50);
  }, []);

  const toggleSectionExpand = useCallback((sectionId: string) => {
    playDropdownSfx();
    setExpandedSections((prev) => ({
      ...prev,
      [sectionId]: !prev[sectionId],
    }));
  }, [playDropdownSfx]);

  const shareUrl = typeof window === 'undefined'
    ? ''
    : `${window.location.origin}/games/${encodeURIComponent(game.id)}`;
  const shareTitle = `${game.title} walkthrough | Jinssi Gaming`;
  const shareText = `Follow the ${game.title} walkthrough on Jinssi Gaming.`;

  useEffect(() => {
    document.title = shareTitle;

    const updateMeta = (selector: string, content: string) => {
      const element = document.querySelector<HTMLMetaElement>(selector);
      if (element) element.setAttribute('content', content);
    };

    updateMeta('meta[name="description"]', game.description);
    updateMeta('meta[property="og:title"]', shareTitle);
    updateMeta('meta[property="og:description"]', game.description);
    updateMeta('meta[property="og:image"]', game.coverImage);
    updateMeta('meta[property="og:url"]', shareUrl);
    updateMeta('meta[name="twitter:title"]', shareTitle);
    updateMeta('meta[name="twitter:description"]', game.description);
    updateMeta('meta[name="twitter:image"]', game.coverImage);

    const canonical = document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (canonical) canonical.href = shareUrl;

    return () => {
      document.title = 'Jinssi Gaming | Cozy Game Walkthroughs';
      updateMeta('meta[name="description"]', 'Jinssi Gaming offers clear, visual walkthroughs and cozy guides for relaxing games.');
      updateMeta('meta[property="og:title"]', 'Jinssi Gaming | Cozy Game Walkthroughs');
      updateMeta('meta[property="og:description"]', 'Clear, visual walkthroughs and cozy guides for relaxing games.');
      updateMeta('meta[property="og:image"]', '/banner.webp');
      updateMeta('meta[property="og:url"]', 'https://jinssigaming.pages.dev/');
      updateMeta('meta[name="twitter:title"]', 'Jinssi Gaming | Cozy Game Walkthroughs');
      updateMeta('meta[name="twitter:description"]', 'Clear, visual walkthroughs and cozy guides for relaxing games.');
      updateMeta('meta[name="twitter:image"]', '/banner.webp');
      if (canonical) canonical.href = 'https://jinssigaming.pages.dev/';
    };
  }, [game.coverImage, game.description, game.id, shareTitle, shareUrl]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      const textArea = document.createElement('textarea');
      textArea.value = shareUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 2200);
  };

  const shareWithDevice = async () => {
    if (!navigator.share) return;
    await navigator.share({ title: shareTitle, text: shareText, url: shareUrl });
  };

  const socialLinks = [
    { label: 'Facebook', href: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}` },
    { label: 'X', href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}` },
    { label: 'WhatsApp', href: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}` },
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}` },
    { label: 'Reddit', href: `https://www.reddit.com/submit?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent(shareTitle)}` },
    { label: 'Pinterest', href: `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(shareUrl)}&media=${encodeURIComponent(game.coverImage)}&description=${encodeURIComponent(shareText)}` },
    { label: 'Telegram', href: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(shareText)}` },
  ];

  // Preload celebration audio tracks for instantaneous, zero-latency playback
  useEffect(() => {
    const prePop = new Audio('/confetti-pop.mp3');
    prePop.preload = 'auto';
    prePop.load();

    const preVoice = new Audio('/tuturu_1.mp3');
    preVoice.preload = 'auto';
    preVoice.load();
  }, []);

  const [burstKey, setBurstKey] = useState(0);

  // Polyphonic audio layering: plays both confetti pop and Tuturo voice simultaneously
  const playLayeredCelebrationAudio = useCallback(() => {
    try {
      // Layer 1: Party popper pop & sparkles sound effect
      const popAudio = new Audio('/confetti-pop.mp3');
      popAudio.volume = 0.65;
      void popAudio.play().catch(() => undefined);

      // Layer 2: Tuturo character cheerful voice line ("Tu-tu-ru~")
      const voiceAudio = new Audio('/tuturu_1.mp3');
      voiceAudio.volume = 0.9;
      void voiceAudio.play().catch(() => undefined);
    } catch {
      // Ignore if autoplay policy suppresses background audio
    }
  }, []);

  const triggerConfettiBurst = useCallback(() => {
    setBurstKey((prev) => prev + 1);
    playLayeredCelebrationAudio();
  }, [playLayeredCelebrationAudio]);

  useEffect(() => {
    if (isComplete) setShowCongratulations(true);
  }, [isComplete]);

  useEffect(() => {
    if (!showCongratulations) return;
    triggerConfettiBurst();
  }, [showCongratulations, triggerConfettiBurst]);

  const currentCover = allCovers[activeCoverIndex] || game.coverImage;

  const renderCoverCarousel = () => (
    <div
      className="relative w-full aspect-[16/9] sm:aspect-[21/9] min-h-[260px] sm:min-h-[380px] md:min-h-[440px] max-h-[520px] overflow-hidden bg-ink-950 flex items-center justify-center select-none group"
      onMouseEnter={() => setIsCarouselHovered(true)}
      onMouseLeave={() => setIsCarouselHovered(false)}
    >
      {/* Ambient blurred backdrop to eliminate empty black bars without cropping the main artwork */}
      {currentCover && (
        <img
          src={getOptimizedImageUrl(currentCover, { width: 400, quality: 50, format: 'webp' })}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-3xl scale-125 brightness-50 opacity-60 pointer-events-none transition-all duration-700"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-t from-ink-950/80 via-transparent to-ink-950/40 pointer-events-none" />

      {/* Main Crisp Artwork - Full uncropped view */}
      {currentCover ? (
        <img
          key={currentCover}
          src={getOptimizedImageUrl(currentCover, { width: 1400, quality: 85, format: 'webp' })}
          alt={game.coverAlt || `${game.title} cover slide ${activeCoverIndex + 1}`}
          loading="eager"
          decoding="async"
          className="relative z-10 max-h-full max-w-full w-auto h-auto object-contain mx-auto transition-opacity duration-500 ease-in-out drop-shadow-2xl"
        />
      ) : (
        <div className="relative z-10 text-cream-200 text-sm font-medium">No cover image available</div>
      )}

      {/* Carousel navigation controls (when 2 or more covers exist) */}
      {allCovers.length > 1 && (
        <>
          {/* Previous Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePrevCover();
            }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ink-900/80 hover:bg-peach-500 text-cream-100 flex items-center justify-center shadow-lg backdrop-blur-md border border-white/10 transition-all opacity-85 group-hover:opacity-100 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Previous cover artwork"
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Next Button */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handleNextCover();
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-ink-900/80 hover:bg-peach-500 text-cream-100 flex items-center justify-center shadow-lg backdrop-blur-md border border-white/10 transition-all opacity-85 group-hover:opacity-100 hover:scale-110 active:scale-95 focus:outline-none"
            aria-label="Next cover artwork"
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-ink-950/70 backdrop-blur-md border border-white/10 shadow-sm">
            {allCovers.map((_, idx) => (
              <button
                key={idx}
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCoverIndex(idx);
                }}
                className={`transition-all duration-300 rounded-full ${
                  idx === activeCoverIndex
                    ? 'w-6 h-2 bg-peach-500 shadow-sm'
                    : 'w-2 h-2 bg-white/40 hover:bg-white/90'
                }`}
                aria-label={`Go to cover slide ${idx + 1}`}
              />
            ))}
          </div>

          {/* Counter Badge */}
          <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-md bg-ink-950/75 backdrop-blur-md text-[11px] font-bold text-cream-200 border border-white/10 shadow-sm flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-peach-400 animate-pulse" />
            {activeCoverIndex + 1} / {allCovers.length}
          </span>
        </>
      )}

      {/* Category Pill */}
      <span
        className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 pill text-cream-50 text-xs shadow-cozy-sm backdrop-blur-md category-accent-pill border border-white/10"
        style={{ backgroundColor: 'var(--theme-accent)' }}
      >
        {game.category}
      </span>
    </div>
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-semibold text-tan-500 hover:text-ink-900 transition-colors mb-6 group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to all games
      </button>

      {/* Game store style media hero showcase */}
      <div className="cozy-card notepad-card mb-8 animate-fade-in overflow-hidden">
        {game.video ? (
          <div>
            {/* Store-style media tabs */}
            <div className="flex items-center justify-between px-4 sm:px-6 pt-4 pb-2 bg-cream-100/70 border-b border-tan-200">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMediaTab('trailer')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mediaTab === 'trailer'
                      ? 'bg-peach-500 text-white shadow-cozy-xs scale-[1.02]'
                      : 'bg-white text-ink-700 border border-tan-200 hover:bg-peach-50'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>Gameplay Trailer</span>
                  {game.video === 'placeholder' && (
                    <span className="text-[10px] bg-peach-200/90 text-peach-900 px-1.5 py-0.2 rounded font-bold">
                      Soon
                    </span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setMediaTab('cover')}
                  className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    mediaTab === 'cover'
                      ? 'bg-peach-500 text-white shadow-cozy-xs scale-[1.02]'
                      : 'bg-white text-ink-700 border border-tan-200 hover:bg-peach-50'
                  }`}
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>Cover Artwork {allCovers.length > 1 ? `(${allCovers.length})` : ''}</span>
                </button>
              </div>

              <span
                className="pill text-cream-50 text-[11px] shadow-cozy-xs category-accent-pill hidden sm:inline-block"
                style={{ backgroundColor: 'var(--theme-accent)' }}
              >
                {game.category}
              </span>
            </div>

            {/* Active Media Display */}
            {mediaTab === 'trailer' ? (
              game.video === 'placeholder' ? (
                <div className="p-8 sm:p-12 bg-gradient-to-b from-peach-50 to-cream-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
                  <div className="w-16 h-16 rounded-2xl bg-peach-500 text-white flex items-center justify-center mb-4 shadow-cozy-sm">
                    <Film className="w-8 h-8" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-peach-200 text-peach-800 text-xs font-bold uppercase tracking-wider mb-2">
                    <span className="w-2 h-2 rounded-full bg-peach-500 animate-pulse" />
                    Official Gameplay Trailer In Production
                  </span>
                  <h3 className="font-display font-bold text-xl sm:text-2xl text-ink-900 mb-2">
                    {game.videoTitle || `${game.title} Gameplay Overview`}
                  </h3>
                  <p className="text-xs sm:text-sm text-ink-600 max-w-lg leading-relaxed mb-4">
                    The official gameplay overview video and walkthrough trailer is currently being recorded and edited. Explore the comprehensive step-by-step guide below in the meantime!
                  </p>
                  <div className="flex items-center gap-2 text-xs font-semibold text-tan-500">
                    <span>⚡ Crystal Clear 60FPS</span>
                    <span>•</span>
                    <span>Lossless WebM VP9</span>
                    <span>•</span>
                    <span>Full Guide Below</span>
                  </div>
                </div>
              ) : (
                <div className="relative bg-ink-950 flex flex-col items-center justify-center w-full aspect-video max-h-[520px]">
                  <div className="absolute top-3 left-3 z-10 pointer-events-none">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-ink-900/85 backdrop-blur-md text-xs font-bold text-cream-100 shadow-sm border border-white/10">
                      <Film className="w-3.5 h-3.5 text-peach-400" />
                      <span>{game.videoTitle || `${game.title} Gameplay Overview Trailer`}</span>
                    </span>
                  </div>
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={game.videoPoster || getOptimizedImageUrl(game.coverImage, { width: 1200, quality: 80, format: 'webp' })}
                    className="w-full h-full object-contain bg-black"
                  >
                    <source src={game.video} type={game.video.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                    Your browser does not support the video tag.
                  </video>
                </div>
              )
            ) : (
              renderCoverCarousel()
            )}
          </div>
        ) : (
          renderCoverCarousel()
        )}
        <div className="p-6">
          <h2 className="page-title font-display text-2xl sm:text-3xl font-700 text-ink-900 mb-1">
            {game.title}
          </h2>
          <p className="text-sm text-tan-400 font-semibold mb-3">
            by {game.developer}
          </p>
          <p className="text-base text-ink-700 leading-relaxed">
            {game.description}
          </p>

          <div className="mt-5 border-t border-tan-200 pt-4">
            <div className="flex flex-wrap items-center gap-2">
              <span className="mr-1 inline-flex items-center gap-2 text-sm font-bold text-ink-900">
                <Share2 className="h-4 w-4 text-peach-500" aria-hidden="true" />
                Share this walkthrough
              </span>
              <button
                type="button"
                onClick={copyLink}
                className="site-button bg-cream-100 px-3 py-2 text-xs text-ink-900 hover:bg-cream-200"
              >
                {linkCopied ? <Check className="h-4 w-4 text-sage-600" /> : <Copy className="h-4 w-4" />}
                {linkCopied ? 'Copied' : 'Copy link'}
              </button>
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={shareWithDevice}
                  className="site-button bg-peach-400 px-3 py-2 text-xs text-white hover:bg-peach-500"
                >
                  <Share2 className="h-4 w-4" />
                  More...
                </button>
              )}
              <a
                href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`}
                className="site-button bg-cream-100 px-3 py-2 text-xs text-ink-900 hover:bg-cream-200"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
            </div>
            <div className="mt-3 flex flex-wrap gap-2" aria-label="Social sharing options">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="social-share-pill rounded-lg border border-tan-200 bg-cream-50 px-2.5 py-1.5 text-xs font-bold text-tan-600 transition-colors hover:border-peach-300 hover:text-peach-600"
                >
                  {social.label}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-tan-200 pt-4 text-sm">
            <div>
              <span className="font-bold text-tan-500">Developer</span>
              <p className="font-semibold text-ink-900">{game.developer}</p>
            </div>
            {game.gameLink?.trim() && (
              <a
                href={game.gameLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 font-bold theme-accent-color hover:opacity-80 transition-opacity"
              >
                Visit game <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Progress overview */}
      <div className="cozy-card notepad-card p-5 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <BookOpen className="w-5 h-5 theme-accent-color progress-accent-icon" style={{ color: 'var(--theme-accent)' }} />
            <h3 className="font-display text-lg font-600 text-ink-900">
              Your Progress
            </h3>
          </div>
          <span className="text-sm font-bold text-tan-500">
            {completedCount} / {totalSteps} steps
          </span>
        </div>
        <div className="h-3 rounded-full bg-cream-300 overflow-hidden progress-bar-track">
          <div
            className="h-full rounded-full transition-all duration-700 ease-out flex items-center justify-end pr-2 progress-bar-fill"
            style={{
              width: `${progressPercent}%`,
              backgroundColor: 'var(--theme-accent)',
            }}
          >
            {progressPercent > 15 && (
              <span className="text-xs font-bold text-cream-50">
                {progressPercent}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Controls bar: Table of Contents + Spoiler toggle + Reset */}
      <div className="flex items-center justify-between mb-8 gap-4 flex-wrap">
        <TableOfContents
          sections={game.walkthrough}
          accentColor={game.accentColor}
          completedSteps={completedSteps}
          onSelectStep={handleSelectStep}
          onSelectSection={handleSelectSection}
        />

        <div className="flex items-center gap-3 flex-wrap">
          <button
            onClick={toggleSpoilers}
            className="site-button spoilers-toggle-button bg-cream-50 text-ink-900 border-cream-300 hover:border-peach-300"
          >
            {showSpoilers ? (
              <Eye className="w-4 h-4 text-peach-400" />
            ) : (
              <EyeOff className="w-4 h-4 text-tan-400" />
            )}
            <span className="text-sm font-semibold text-ink-900">
              Spoilers: {showSpoilers ? 'On' : 'Off'}
            </span>
            <div
              className={`w-10 h-5 rounded-full transition-all duration-300 relative spoilers-toggle-track ${
                showSpoilers ? 'bg-peach-400' : 'bg-cream-300'
              }`}
            >
              <div
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-cream-50 shadow-cozy-sm transition-all duration-300 spoilers-toggle-dot ${
                  showSpoilers ? 'left-5' : 'left-0.5'
                }`}
              />
            </div>
          </button>

          <button
            onClick={resetProgress}
            className="site-button reset-progress-button border-transparent text-tan-500 hover:text-rose-500 hover:bg-rose-100 text-sm"
          >
            <RotateCcw className="w-4 h-4" />
            Reset progress
          </button>
        </div>
      </div>

      {/* Walkthrough sections */}
      <div className="space-y-6">
        {game.walkthrough.map((section, idx) => (
          <WalkthroughSectionCard
            key={section.id}
            section={section}
            sectionIndex={idx}
            accentColor={game.accentColor}
            completedSteps={completedSteps}
            toggleStep={handleStepToggleWithSfx}
            showSpoilers={showSpoilers}
            isExpanded={expandedSections[section.id] ?? true}
            onToggleExpand={() => toggleSectionExpand(section.id)}
            highlightedStepKey={highlightedStepKey}
          />
        ))}

        {game.editorNote?.trim() && (
          <div className="rounded-2xl border-2 border-peach-200 bg-peach-50/70 p-4">
            <p className="mb-1 text-xs font-bold uppercase tracking-wider text-peach-500">
              Editor&apos;s note
            </p>
            <p className="text-sm leading-relaxed text-ink-800 whitespace-pre-line">
              {game.editorNote}
            </p>
          </div>
        )}
      </div>

      {/* Floating Quick Navigation Trigger: neatly stacked above Cozy Game Chat at bottom-20 right-4 with zero overlap */}
      {showFloatingTOC && !isChatOpen && (
        <div className="fixed bottom-20 right-4 z-30 animate-fade-in">
          <TableOfContents
            sections={game.walkthrough}
            accentColor={game.accentColor}
            completedSteps={completedSteps}
            onSelectStep={handleSelectStep}
            onSelectSection={handleSelectSection}
            floating
          />
        </div>
      )}

      {/* Community Comments Section */}
      <div className="mt-16 pt-8 border-t-2 border-tan-200">
        <CommentSection gameId={game.id} />
      </div>

      {showCongratulations && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden p-4 sm:p-6">
          <div
            className="fixed inset-0 bg-ink-900/75 backdrop-blur-md transition-opacity"
            aria-hidden="true"
            onClick={() => setShowCongratulations(false)}
          />

          {/* Hardware-accelerated 60-120fps Canvas Confetti Layer behind Tuturo and the card */}
          <ConfettiCanvas burstTrigger={burstKey} originRef={tuturoRef} />

          <div className="relative z-10 w-full max-w-md my-auto pt-[160px] sm:pt-[200px]">
            {/* Confetti Popper Shockwave Behind Chibi Character */}
            <div
              key={burstKey}
              className="confetti-burst-container"
              aria-hidden="true"
            >
              {/* Radial shockwave flash expanding from behind Tuturo */}
              <div className="confetti-burst-shockwave" />
            </div>

            {/* Tuturo Chibi Character standing in front of the confetti burst, behind the card */}
            <div
              ref={tuturoRef}
              className="absolute left-1/2 -translate-x-1/2 -top-12 sm:-top-16 z-10 w-56 sm:w-72 select-none cursor-pointer group"
              onClick={triggerConfettiBurst}
              title="Click Tuturo to pop confetti again!"
            >
              <div key={burstKey} className="animate-tuturo-celebrate w-full">
                <img
                  src="/tuturo.png"
                  alt="Tuturo greeting you"
                  className="w-full h-auto object-contain mx-auto filter drop-shadow-2xl transition-transform duration-200 group-hover:scale-105 active:scale-95"
                  draggable={false}
                />
              </div>
            </div>

            {/* Notepad Card */}
            <div
              className="notepad-card completion-notepad-card relative z-20 w-full text-center animate-pop shadow-cozy-lg"
              role="dialog"
              aria-modal="true"
              aria-labelledby="congratulations-title"
            >
              <button
                type="button"
                onClick={() => setShowCongratulations(false)}
                className="absolute right-4 top-4 rounded-full p-2 text-tan-500 transition-colors hover:bg-cream-200 hover:text-ink-900"
                aria-label="Close congratulations"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full shadow-inner celebration-check-circle"
                style={{
                  backgroundColor: 'var(--section-kicker-bg)',
                  color: 'var(--theme-accent)',
                  border: '2px solid var(--theme-accent-border)',
                }}
              >
                <Check className="h-9 w-9" strokeWidth={3} aria-hidden="true" />
              </div>
              <p className="mb-2 font-display text-3xl font-700 text-ink-900" id="congratulations-title">
                Congratulations!
              </p>
              <p className="text-base font-semibold leading-relaxed text-ink-700 mb-5">
                You completed every step in the {game.title} walkthrough. Great job!
              </p>

              {/* Pop again button for extra celebratory interaction */}
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={triggerConfettiBurst}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider active:scale-95 rounded-full transition-all duration-150 shadow-cozy-sm celebration-pop-btn"
                  style={{
                    backgroundColor: 'var(--theme-accent)',
                    color: 'var(--theme-accent-text, #ffffff)',
                  }}
                >
                  🎉 Pop Confetti Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface WalkthroughSectionCardProps {
  section: WalkthroughSection;
  sectionIndex: number;
  accentColor: string;
  completedSteps: Set<string>;
  toggleStep: (id: string) => void;
  showSpoilers: boolean;
  isExpanded: boolean;
  onToggleExpand: () => void;
  highlightedStepKey: string | null;
}

function WalkthroughSectionCard({
  section,
  sectionIndex,
  accentColor,
  completedSteps,
  toggleStep,
  showSpoilers,
  isExpanded,
  onToggleExpand,
  highlightedStepKey,
}: WalkthroughSectionCardProps) {
  const hasSteps = section.steps && section.steps.length > 0;
  
  const sectionCompleted = hasSteps && section.steps.every((s) =>
    completedSteps.has(`${section.id}-${s.id}`)
  );
  
  const completedInSection = hasSteps ? section.steps.filter((s) =>
    completedSteps.has(`${section.id}-${s.id}`)
  ).length : 0;

  return (
    <div
      id={`section-${section.id}`}
      className="cozy-card notepad-card animate-slide-in scroll-mt-24"
      style={{ animationDelay: `${sectionIndex * 80}ms` }}
    >
      {/* Section header */}
      <button
        onClick={onToggleExpand}
        className="w-full flex items-center justify-between p-5 text-left hover:bg-cream-100 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center font-display font-700 text-sm text-cream-50 flex-shrink-0 chapter-accent-badge"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            {sectionCompleted ? (
              <Check className="w-5 h-5" strokeWidth={3} />
            ) : (
              sectionIndex + 1
            )}
          </div>
          <div>
            <h3 className="font-display text-lg font-600 text-ink-900">
              {section.title}
            </h3>
            <p className="text-xs text-tan-400 font-semibold">
              {completedInSection} / {hasSteps ? section.steps.length : 0} steps completed
            </p>
          </div>
        </div>
        <ChevronDown
          className={`w-5 h-5 text-tan-400 transition-transform duration-300 flex-shrink-0 ${
            isExpanded ? 'rotate-180' : ''
          }`}
        />
      </button>

      {/* Section Video or Placeholder */}
      {isExpanded && section.video && (
        <div className="px-4 sm:px-5 pb-4 animate-fade-in">
          <div className="h-px bg-cream-200 mb-3" />
          {section.video === 'placeholder' ? (
            <div className="rounded-2xl border-2 border-dashed border-peach-300 bg-peach-50/70 p-4 sm:p-5 flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
              <div className="w-12 h-12 rounded-2xl bg-peach-500 text-white flex items-center justify-center flex-shrink-0 shadow-cozy-sm">
                <Film className="w-6 h-6" />
              </div>
              <div className="flex-1">
                <span className="inline-block text-[11px] font-bold uppercase tracking-wider text-peach-700 bg-peach-200/80 px-2 py-0.5 rounded-full mb-1">
                  Section Video Guide Coming Soon
                </span>
                <h4 className="font-display font-bold text-ink-900 text-base">
                  {section.title} Walkthrough Video
                </h4>
                <p className="text-xs text-ink-600 mt-0.5">
                  A high-definition, cozy walkthrough video for this section is currently being recorded and edited.
                </p>
              </div>
            </div>
          ) : (
            <div className="rounded-2xl overflow-hidden border-2 border-peach-200 bg-ink-950 shadow-cozy-sm">
              <div className="p-3 bg-peach-500/10 border-b border-peach-200/30 flex items-center justify-between">
                <span className="text-xs font-bold text-peach-300 flex items-center gap-1.5">
                  <Film className="w-3.5 h-3.5 text-peach-400" />
                  <span>{section.title} — Section Walkthrough</span>
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider text-cream-200 bg-ink-900/60 px-2 py-0.5 rounded-full">
                  WebM VP9
                </span>
              </div>
              <video
                src={section.video}
                poster={section.videoPoster}
                controls
                playsInline
                preload="metadata"
                className="w-full max-h-[420px] object-contain bg-black"
              >
                Your browser does not support the video tag.
              </video>
            </div>
          )}
        </div>
      )}

      {/* Steps */}
      {isExpanded && hasSteps && (
        <div className="px-4 sm:px-5 pb-5 space-y-4 animate-fade-in">
          <div className="h-px bg-cream-200 mb-2" />
          {section.steps.map((step, idx) => {
            const stepKey = `${section.id}-${step.id}`;
            const isDone = completedSteps.has(stepKey);
            return (
              <WikiHowStep
                key={step.id}
                stepKey={stepKey}
                stepNumber={idx + 1}
                title={step.title}
                description={step.description}
                image={step.image}
                imageAlt={step.imageAlt || `Step ${idx + 1}`}
                video={step.video}
                videoPoster={step.videoPoster}
                videoTitle={step.videoTitle}
                hasSpoiler={step.hasSpoiler}
                spoilerText={step.spoilerText}
                isDone={isDone}
                toggleStep={toggleStep}
                showSpoilers={showSpoilers}
                accentColor={accentColor}
                isHighlighted={highlightedStepKey === stepKey}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

interface WikiHowStepProps {
  stepKey: string;
  stepNumber: number;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  video?: string;
  videoPoster?: string;
  videoTitle?: string;
  hasSpoiler?: boolean;
  spoilerText?: string;
  isDone: boolean;
  toggleStep: (id: string) => void;
  showSpoilers: boolean;
  accentColor: string;
  isHighlighted?: boolean;
}

function WikiHowStep({
  stepKey,
  stepNumber,
  title,
  description,
  image,
  imageAlt,
  video,
  videoPoster,
  videoTitle,
  hasSpoiler,
  spoilerText,
  isDone,
  toggleStep,
  showSpoilers,
  isHighlighted = false,
}: WikiHowStepProps) {
  const [spoilerRevealed, setSpoilerRevealed] = useState(false);
  
  const isVideoPlaceholder = video === 'placeholder';
  const hasRealVideo = Boolean(video && video !== 'placeholder');
  const hasImage = Boolean(image && image.trim().length > 0);
  
  // If both real video and image exist, default to video tab
  const [activeMediaTab, setActiveMediaTab] = useState<'video' | 'image'>(() => {
    if (hasRealVideo) return 'video';
    return 'image';
  });

  return (
    <div
      id={`step-${stepKey}`}
      className={`notepad-card notepad-step transition-all duration-300 scroll-mt-24 ${
        isDone ? 'notepad-step-done' : ''
      } ${isHighlighted ? 'step-target-highlight' : ''}`}
    >

      {/* Step number bar */}
      <div className="flex items-center justify-between px-4 pt-4 pb-2">
        <div className="flex items-center gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center font-display font-700 text-xs text-cream-50 flex-shrink-0 step-accent-badge"
            style={{ backgroundColor: 'var(--theme-accent)' }}
          >
            {stepNumber}
          </div>
          <h4
            className={`font-display text-base font-600 transition-all duration-300 ${
              isDone ? 'text-tan-400 line-through' : 'text-ink-900'
            }`}
          >
            {title}
          </h4>
        </div>

        {/* Checkbox */}
        <button
          onClick={() => toggleStep(stepKey)}
          className={`check-circle flex-shrink-0 ${
            isDone
              ? 'is-done border-transparent text-cream-50 animate-pop'
              : 'border-cream-400 hover:border-peach-300'
          }`}
          style={isDone ? { backgroundColor: 'var(--theme-accent)' } : undefined}
          aria-label={isDone ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {isDone && <Check className="w-4 h-4" strokeWidth={3} />}
        </button>
      </div>

      {/* Media Container: Video, Placeholder, or Image */}
      {(hasRealVideo || isVideoPlaceholder || hasImage) && (
        <div className="px-4 pb-3">
          {/* Tab selector if both video and image are available */}
          {hasRealVideo && hasImage && (
            <div className="flex items-center gap-2 mb-2">
              <button
                type="button"
                onClick={() => setActiveMediaTab('video')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  activeMediaTab === 'video'
                    ? 'bg-peach-500 text-cream-50 shadow-cozy-xs'
                    : 'bg-cream-200/80 text-ink-700 hover:bg-cream-300/80'
                }`}
              >
                <Play className="w-3 h-3 fill-current" />
                <span>Video Guide</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveMediaTab('image')}
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold transition-all ${
                  activeMediaTab === 'image'
                    ? 'bg-peach-500 text-cream-50 shadow-cozy-xs'
                    : 'bg-cream-200/80 text-ink-700 hover:bg-cream-300/80'
                }`}
              >
                <ImageIcon className="w-3 h-3" />
                <span>Screenshot</span>
              </button>
            </div>
          )}

          {/* 1. Video Placeholder */}
          {isVideoPlaceholder && (
            <div className="rounded-2xl border-2 border-dashed border-peach-300/80 bg-peach-50/70 p-5 sm:p-6 text-center flex flex-col items-center justify-center relative overflow-hidden transition-all hover:border-peach-400 group mb-3 shadow-cozy-xs">
              <div className="w-12 h-12 rounded-2xl bg-peach-200/80 text-peach-600 flex items-center justify-center mb-3 shadow-cozy-xs group-hover:scale-105 transition-transform">
                <Film className="w-6 h-6" />
              </div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-peach-200/60 text-peach-700 text-[11px] font-bold uppercase tracking-wider mb-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-peach-500 animate-pulse" />
                Video Walkthrough In Production
              </div>
              <h5 className="font-display font-bold text-sm sm:text-base text-ink-900 mb-1">
                {videoTitle || 'Gameplay Video Clip Placeholder'}
              </h5>
              <p className="text-xs sm:text-sm text-ink-600 max-w-md leading-relaxed">
                A lightweight, web-optimized video walkthrough is being prepared for this step. Follow the screenshot and guide notes below!
              </p>
              <div className="mt-3 flex items-center gap-2 text-[11px] font-semibold text-tan-500">
                <span>⚡ WebM VP9 High Fidelity</span>
                <span>•</span>
                <span>Ultra-fast 60FPS</span>
              </div>
            </div>
          )}

          {/* 2. Real Video Player */}
          {hasRealVideo && activeMediaTab === 'video' && (
            <div className="relative rounded-2xl overflow-hidden shadow-cozy-sm bg-ink-950 flex flex-col items-center justify-center min-h-[220px] sm:min-h-[280px] max-h-[460px] w-full border border-tan-300/40">
              <div className="absolute top-3 left-3 z-10 pointer-events-none">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-ink-900/85 backdrop-blur-md text-[11px] font-bold text-cream-100 shadow-sm border border-white/10">
                  <Film className="w-3.5 h-3.5 text-peach-400" />
                  {videoTitle || 'Walkthrough Video Clip'}
                </span>
              </div>
              <video
                controls
                playsInline
                preload="metadata"
                poster={videoPoster || (image ? getOptimizedImageUrl(image, { width: 800, quality: 80, format: 'webp' }) : undefined)}
                className={`w-full h-auto max-h-[460px] object-contain transition-all duration-500 ${
                  isDone ? 'opacity-70' : 'opacity-100'
                }`}
              >
                <source src={video} type={video?.endsWith('.webm') ? 'video/webm' : 'video/mp4'} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}

          {/* 3. Step image */}
          {hasImage && (!hasRealVideo || activeMediaTab === 'image' || isVideoPlaceholder) && (
            <div className="rounded-2xl overflow-hidden shadow-cozy-sm bg-cream-200/50 flex items-center justify-center min-h-[220px] sm:min-h-[280px] max-h-[400px] w-full">
              <img
                src={getOptimizedImageUrl(image, { width: 800, quality: 80, format: 'webp' })}
                alt={imageAlt || ""}
                loading="lazy"
                decoding="async"
                width={640}
                height={360}
                className={`w-full h-auto max-h-[400px] object-contain transition-all duration-500 ${
                  isDone ? 'opacity-60 grayscale' : 'opacity-100'
                }`}
              />
            </div>
          )}
        </div>
      )}

      {/* Step description */}
      <div className="px-4 pb-4">
        <p
          className={`text-sm sm:text-base text-ink-700 leading-relaxed whitespace-pre-line transition-all duration-300 ${
            isDone ? 'opacity-60' : 'opacity-100'
          }`}
        >
          {description}
        </p>

        {/* Spoiler */}
        {hasSpoiler && spoilerText && (
          <div className="mt-3">
            {!showSpoilers && !spoilerRevealed ? (
              <button
                onClick={() => setSpoilerRevealed(true)}
                className="inline-flex items-center gap-1.5 pill bg-peach-100 text-peach-500 hover:bg-peach-200 transition-colors"
              >
                <EyeOff className="w-3 h-3" />
                <span>Show spoiler</span>
              </button>
            ) : (
              <div className="rounded-xl bg-peach-50 border border-peach-100 p-3 animate-fade-in">
                <div className="flex items-center gap-1.5 mb-1">
                  <Eye className="w-3.5 h-3.5 text-peach-400" />
                  <span className="text-xs font-bold text-peach-500 uppercase tracking-wide">
                    Spoiler
                  </span>
                </div>
                <p className="text-sm text-ink-800 leading-relaxed">
                  {spoilerText}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}