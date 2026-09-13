import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Play,
  Pause,
  SkipBack,
  SkipForward,
  RotateCcw,
  RotateCw,
  Volume2,
  VolumeX,
  Headphones,
  Moon,
  Clock,
  Sparkles,
  ChevronUp,
  ChevronDown,
  X,
  CloudRain,
  Flame,
  Wind,
  Sliders,
  Check,
  Music,
} from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

export interface AudiobookPlayerProps {
  paragraphs: string[];
  activeParagraphIndex: number;
  onParagraphChange: (index: number) => void;
  bookTitle: string;
  bookAuthor?: string;
  chapterTitle?: string;
  coverImage?: string;
  isOpen: boolean;
  onClose: () => void;
  onNextChapter?: () => void;
  onPrevChapter?: () => void;
  hasNextChapter?: boolean;
  hasPrevChapter?: boolean;
}

const SPEED_OPTIONS = [0.75, 1.0, 1.25, 1.5, 1.75, 2.0];
const SLEEP_TIMER_OPTIONS = [
  { label: 'Off', minutes: 0 },
  { label: '5 min', minutes: 5 },
  { label: '15 min', minutes: 15 },
  { label: '30 min', minutes: 30 },
  { label: '45 min', minutes: 45 },
  { label: 'End of Chapter', minutes: -1 },
];

export function AudiobookPlayer({
  paragraphs,
  activeParagraphIndex,
  onParagraphChange,
  bookTitle,
  bookAuthor,
  chapterTitle,
  coverImage,
  isOpen,
  onClose,
  onNextChapter,
  onPrevChapter,
  hasNextChapter,
  hasPrevChapter,
}: AudiobookPlayerProps) {
  const {
    ambientRain,
    ambientFire,
    ambientWind,
    setAmbientRain,
    setAmbientFire,
    setAmbientWind,
    applyPreset,
  } = useMusic();

  // Playback states
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [speechRate, setSpeechRate] = useState<number>(1.0);
  const [availableVoices, setAvailableVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoiceURI, setSelectedVoiceURI] = useState<string>('');
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  // Popover menus
  const [showVoiceMenu, setShowVoiceMenu] = useState<boolean>(false);
  const [showSpeedMenu, setShowSpeedMenu] = useState<boolean>(false);
  const [showSleepMenu, setShowSleepMenu] = useState<boolean>(false);
  const [showAmbientMenu, setShowAmbientMenu] = useState<boolean>(false);

  // Sleep timer state
  const [sleepTimerMinutes, setSleepTimerMinutes] = useState<number>(0);
  const [sleepSecondsLeft, setSleepSecondsLeft] = useState<number | null>(null);

  // Speech utterance ref
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const isSpeakingRef = useRef<boolean>(false);

  // Load available system voices
  useEffect(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();
      if (voices && voices.length > 0) {
        // Filter to prioritize English and pleasant narration voices
        const englishVoices = voices.filter(
          (v) => v.lang.startsWith('en') || v.lang.startsWith('en-')
        );
        const listToUse = englishVoices.length > 0 ? englishVoices : voices;
        setAvailableVoices(listToUse);

        // Pick a default preferred voice (e.g. Google US English, Samantha, Daniel, Natural)
        if (!selectedVoiceURI) {
          const preferred = listToUse.find(
            (v) =>
              v.name.includes('Natural') ||
              v.name.includes('Google US English') ||
              v.name.includes('Samantha') ||
              v.name.includes('Daniel') ||
              v.name.includes('Karen') ||
              v.default
          ) || listToUse[0];

          if (preferred) {
            setSelectedVoiceURI(preferred.voiceURI);
          }
        }
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = null;
      }
    };
  }, [selectedVoiceURI]);

  // Total word count & estimated time remaining
  const wordsRemaining = useMemo(() => {
    if (!paragraphs || paragraphs.length === 0) return 0;
    let words = 0;
    for (let i = activeParagraphIndex; i < paragraphs.length; i++) {
      words += (paragraphs[i] || '').split(/\s+/).filter(Boolean).length;
    }
    return words;
  }, [paragraphs, activeParagraphIndex]);

  const estimatedMinutesRemaining = useMemo(() => {
    const wpm = 135 * speechRate;
    return Math.max(1, Math.ceil(wordsRemaining / wpm));
  }, [wordsRemaining, speechRate]);

  // Clean text for TTS (strip markdown artifacts, excessive underscores, URLs)
  const cleanTextForSpeech = useCallback((raw: string): string => {
    return raw
      .replace(/\[\d+\]/g, '') // remove footnote citations like [1]
      .replace(/[*_#~`]/g, '') // remove markdown symbols
      .replace(/https?:\/\/\S+/g, '') // remove links
      .replace(/\s+/g, ' ')
      .trim();
  }, []);

  // Speak a specific paragraph by index
  const speakParagraph = useCallback(
    (index: number) => {
      if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
      if (!paragraphs || paragraphs.length === 0 || index < 0 || index >= paragraphs.length) {
        setIsPlaying(false);
        setIsPaused(false);
        isSpeakingRef.current = false;
        return;
      }

      window.speechSynthesis.cancel();

      const rawText = paragraphs[index] || '';
      const textToSpeak = cleanTextForSpeech(rawText);

      // If paragraph is empty or only whitespace, advance immediately
      if (!textToSpeak || textToSpeak.length === 0) {
        if (index + 1 < paragraphs.length) {
          onParagraphChange(index + 1);
          speakParagraph(index + 1);
        } else {
          setIsPlaying(false);
          setIsPaused(false);
        }
        return;
      }

      const utterance = new SpeechSynthesisUtterance(textToSpeak);
      currentUtteranceRef.current = utterance;

      // Configure rate and pitch
      utterance.rate = speechRate;
      utterance.pitch = 1.0;

      // Assign voice
      if (selectedVoiceURI) {
        const found = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
        if (found) {
          utterance.voice = found;
        }
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setIsPaused(false);
        isSpeakingRef.current = true;
      };

      utterance.onend = () => {
        isSpeakingRef.current = false;
        // Check if sleep timer ended at chapter
        if (sleepTimerMinutes === -1 && index + 1 >= paragraphs.length) {
          setIsPlaying(false);
          setIsPaused(false);
          setSleepTimerMinutes(0);
          setSleepSecondsLeft(null);
          return;
        }

        // Advance to next paragraph
        if (index + 1 < paragraphs.length) {
          onParagraphChange(index + 1);
          speakParagraph(index + 1);
        } else {
          // Chapter finished
          setIsPlaying(false);
          setIsPaused(false);
          if (hasNextChapter && onNextChapter) {
            // Optional: can notify or wait for user to continue
          }
        }
      };

      utterance.onerror = (e) => {
        // 'interrupted' or 'canceled' happens normally on pause/stop
        if (e.error !== 'interrupted' && e.error !== 'canceled') {
          console.warn('Audiobook SpeechSynthesis error:', e);
        }
        isSpeakingRef.current = false;
      };

      window.speechSynthesis.speak(utterance);
    },
    [
      paragraphs,
      cleanTextForSpeech,
      speechRate,
      selectedVoiceURI,
      availableVoices,
      sleepTimerMinutes,
      onParagraphChange,
      hasNextChapter,
      onNextChapter,
    ]
  );

  // Play / Resume
  const handlePlay = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isPaused && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      setIsPlaying(true);
    } else {
      speakParagraph(activeParagraphIndex);
    }
  }, [isPaused, activeParagraphIndex, speakParagraph]);

  // Pause
  const handlePause = useCallback(() => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    window.speechSynthesis.pause();
    setIsPaused(true);
    setIsPlaying(false);
  }, []);

  // Toggle Play / Pause
  const handleTogglePlay = useCallback(() => {
    if (isPlaying) {
      handlePause();
    } else {
      handlePlay();
    }
  }, [isPlaying, handlePause, handlePlay]);

  // Seek previous paragraph
  const handlePrevParagraph = useCallback(() => {
    const prevIdx = Math.max(0, activeParagraphIndex - 1);
    onParagraphChange(prevIdx);
    if (isPlaying) {
      speakParagraph(prevIdx);
    }
  }, [activeParagraphIndex, onParagraphChange, isPlaying, speakParagraph]);

  // Seek next paragraph
  const handleNextParagraph = useCallback(() => {
    const nextIdx = Math.min(paragraphs.length - 1, activeParagraphIndex + 1);
    onParagraphChange(nextIdx);
    if (isPlaying) {
      speakParagraph(nextIdx);
    }
  }, [paragraphs.length, activeParagraphIndex, onParagraphChange, isPlaying, speakParagraph]);

  // Jump to specific paragraph (scrubber)
  const handleScrubParagraph = (newIndex: number) => {
    const clamped = Math.max(0, Math.min(paragraphs.length - 1, newIndex));
    onParagraphChange(clamped);
    if (isPlaying) {
      speakParagraph(clamped);
    }
  };

  // Change playback speed
  const handleSpeedChange = (rate: number) => {
    setSpeechRate(rate);
    setShowSpeedMenu(false);
    if (isPlaying) {
      // Restart current paragraph with new speed
      speakParagraph(activeParagraphIndex);
    }
  };

  // Change voice
  const handleVoiceChange = (uri: string) => {
    setSelectedVoiceURI(uri);
    setShowVoiceMenu(false);
    if (isPlaying) {
      speakParagraph(activeParagraphIndex);
    }
  };

  // Sleep timer ticker
  useEffect(() => {
    if (!sleepSecondsLeft || sleepSecondsLeft <= 0) return;

    const timer = setInterval(() => {
      setSleepSecondsLeft((prev) => {
        if (prev === null || prev <= 1) {
          // Timer expired!
          if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
            window.speechSynthesis.pause();
          }
          setIsPlaying(false);
          setIsPaused(true);
          setSleepTimerMinutes(0);
          return null;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [sleepSecondsLeft]);

  // Set Sleep Timer
  const handleSetSleepTimer = (minutes: number) => {
    setSleepTimerMinutes(minutes);
    setShowSleepMenu(false);
    if (minutes > 0) {
      setSleepSecondsLeft(minutes * 60);
    } else {
      setSleepSecondsLeft(null);
    }
  };

  // Stop and clean up on unmount or close
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Format seconds into mm:ss
  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  if (!isOpen) return null;

  // Find voice display name
  const currentVoice = availableVoices.find((v) => v.voiceURI === selectedVoiceURI);
  const voiceDisplayName = currentVoice
    ? currentVoice.name.replace(/(Google|Microsoft|Apple|Natural)\s*/gi, '').trim() || currentVoice.name
    : 'System Voice';

  // Progress percentage
  const progressPercent =
    paragraphs.length > 0
      ? Math.round(((activeParagraphIndex + 1) / paragraphs.length) * 100)
      : 0;

  return (
    <div
      className={`fixed z-50 transition-all duration-300 ${
        isMinimized
          ? 'bottom-4 right-4 sm:right-6 max-w-sm w-full'
          : 'bottom-0 left-0 right-0 w-full'
      }`}
    >
      {/* Minimized Pill View */}
      {isMinimized ? (
        <div className="bg-ink-950/95 backdrop-blur-xl border border-tan-600/30 text-cream-100 rounded-2xl shadow-2xl p-3 flex items-center justify-between gap-3 animate-fade-in ring-1 ring-white/10">
          <div className="flex items-center gap-3 overflow-hidden">
            {coverImage ? (
              <img
                src={coverImage}
                alt={bookTitle}
                className="w-10 h-10 object-cover rounded-lg shadow-sm shrink-0 border border-amber-500/30"
              />
            ) : (
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-600 to-peach-600 flex items-center justify-center shrink-0">
                <Headphones className="w-5 h-5 text-cream-100" />
              </div>
            )}
            <div className="min-w-0">
              <p className="text-xs font-bold text-cream-100 truncate">{bookTitle}</p>
              <div className="flex items-center gap-1.5 text-[10px] text-amber-300/80 font-medium">
                <span>P. {activeParagraphIndex + 1}/{paragraphs.length}</span>
                <span>•</span>
                <span>{speechRate}x</span>
                {sleepSecondsLeft && (
                  <>
                    <span>•</span>
                    <span className="text-peach-400 flex items-center gap-0.5">
                      <Moon className="w-2.5 h-2.5" />
                      {formatTime(sleepSecondsLeft)}
                    </span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={handleTogglePlay}
              className="w-9 h-9 rounded-full bg-gradient-to-r from-amber-500 to-peach-500 hover:from-amber-600 hover:to-peach-600 text-white flex items-center justify-center shadow-cozy-sm transition-transform active:scale-95 cursor-pointer"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white ml-0.5" />}
            </button>
            <button
              type="button"
              onClick={() => setIsMinimized(false)}
              className="p-1.5 rounded-lg hover:bg-white/10 text-cream-300 hover:text-white transition-colors cursor-pointer"
              title="Expand Audiobook Player"
            >
              <ChevronUp className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() => {
                if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                  window.speechSynthesis.cancel();
                }
                setIsPlaying(false);
                onClose();
              }}
              className="p-1.5 rounded-lg hover:bg-white/10 text-cream-300 hover:text-white transition-colors cursor-pointer"
              title="Close Player"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      ) : (
        /* Full Docked Audiobook Player */
        <div className="bg-ink-950/95 backdrop-blur-2xl border-t border-tan-600/30 text-cream-100 shadow-[0_-12px_40px_rgba(0,0,0,0.5)] transition-all">
          {/* Top Scrubber / Progress Bar */}
          <div className="relative group/scrubber w-full h-1.5 bg-tan-900/60 hover:h-2 transition-all cursor-pointer">
            <div
              className="h-full bg-gradient-to-r from-amber-500 via-peach-500 to-amber-400 transition-all duration-200"
              style={{ width: `${progressPercent}%` }}
            />
            <input
              type="range"
              min={0}
              max={Math.max(0, paragraphs.length - 1)}
              value={activeParagraphIndex}
              onChange={(e) => handleScrubParagraph(Number(e.target.value))}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              title={`Jump to paragraph (${activeParagraphIndex + 1}/${paragraphs.length})`}
            />
          </div>

          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 sm:py-3.5">
            <div className="flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
              
              {/* Left Column: Book & Chapter Info */}
              <div className="flex items-center gap-3 w-full md:w-auto min-w-0">
                <div className="relative shrink-0">
                  {coverImage ? (
                    <img
                      src={coverImage}
                      alt={bookTitle}
                      className="w-12 h-12 sm:w-14 sm:h-14 object-cover rounded-xl shadow-md border border-amber-500/40"
                    />
                  ) : (
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-gradient-to-br from-amber-600 via-peach-600 to-amber-700 flex items-center justify-center shadow-md">
                      <Headphones className="w-6 h-6 text-cream-100" />
                    </div>
                  )}

                  {/* Equalizer Sound Waves overlay when playing */}
                  {isPlaying && (
                    <div className="absolute -bottom-1 -right-1 bg-amber-500 text-ink-950 px-1 py-0.5 rounded-md flex items-end gap-0.5 shadow-sm">
                      <span className="w-0.5 h-2 bg-ink-950 animate-pulse rounded-full" style={{ animationDuration: '0.6s' }} />
                      <span className="w-0.5 h-3.5 bg-ink-950 animate-pulse rounded-full" style={{ animationDuration: '0.4s' }} />
                      <span className="w-0.5 h-2.5 bg-ink-950 animate-pulse rounded-full" style={{ animationDuration: '0.8s' }} />
                    </div>
                  )}
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                      <Headphones className="w-2.5 h-2.5" />
                      Audiobook Mode
                    </span>
                    <span className="text-[11px] text-cream-400/80 truncate">
                      {chapterTitle || 'Unabridged Reading'}
                    </span>
                  </div>

                  <h4 className="text-sm font-bold text-cream-100 truncate mt-0.5 leading-snug">
                    {bookTitle}
                  </h4>

                  <div className="flex items-center gap-2 text-xs text-cream-400 mt-0.5">
                    <span>{bookAuthor || 'Classic Literature'}</span>
                    <span>•</span>
                    <span className="text-amber-300/90 font-medium">
                      Paragraph {activeParagraphIndex + 1} of {paragraphs.length} ({progressPercent}%)
                    </span>
                    <span>•</span>
                    <span className="text-cream-400/70 hidden sm:inline">
                      ~{estimatedMinutesRemaining}m left
                    </span>
                  </div>
                </div>
              </div>

              {/* Center Column: Primary Transport Controls */}
              <div className="flex items-center gap-3 sm:gap-4 shrink-0">
                {/* Previous Paragraph */}
                <button
                  type="button"
                  onClick={handlePrevParagraph}
                  disabled={activeParagraphIndex <= 0}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-cream-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer active:scale-95"
                  title="Previous Paragraph"
                >
                  <SkipBack className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Rewind Current Paragraph */}
                <button
                  type="button"
                  onClick={() => speakParagraph(activeParagraphIndex)}
                  className="p-2 rounded-full hover:bg-white/10 text-cream-300 hover:text-white transition-all cursor-pointer hidden sm:flex items-center justify-center"
                  title="Replay Current Paragraph"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Big Play / Pause Button */}
                <button
                  type="button"
                  onClick={handleTogglePlay}
                  className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-gradient-to-tr from-amber-500 via-peach-500 to-amber-400 hover:from-amber-400 hover:to-peach-400 text-white flex items-center justify-center shadow-lg shadow-amber-500/25 transition-all transform active:scale-95 hover:scale-105 cursor-pointer ring-2 ring-white/20"
                  title={isPlaying ? 'Pause Narration' : 'Start Narration'}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5 sm:w-6 sm:h-6 fill-white" />
                  ) : (
                    <Play className="w-5 h-5 sm:w-6 sm:h-6 fill-white ml-0.5" />
                  )}
                </button>

                {/* Skip Forward Current Paragraph */}
                <button
                  type="button"
                  onClick={handleNextParagraph}
                  disabled={activeParagraphIndex >= paragraphs.length - 1}
                  className="p-2 sm:p-2.5 rounded-full hover:bg-white/10 text-cream-300 hover:text-white disabled:opacity-30 disabled:hover:bg-transparent transition-all cursor-pointer active:scale-95"
                  title="Next Paragraph"
                >
                  <SkipForward className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                {/* Next Chapter if available */}
                {hasNextChapter && onNextChapter && (
                  <button
                    type="button"
                    onClick={onNextChapter}
                    className="px-2 py-1 rounded-lg bg-white/10 hover:bg-white/20 text-cream-200 text-xs font-semibold transition-colors cursor-pointer hidden sm:inline-flex items-center gap-1"
                    title="Advance to Next Chapter"
                  >
                    <span>Next Ch.</span>
                    <SkipForward className="w-3 h-3" />
                  </button>
                )}
              </div>

              {/* Right Column: Audio Options & Aux Tools */}
              <div className="flex items-center gap-1.5 sm:gap-2 w-full md:w-auto justify-end">
                {/* Playback Speed Selector */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSpeedMenu(!showSpeedMenu)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-cream-200 text-xs font-bold transition-colors cursor-pointer flex items-center gap-1"
                    title="Playback Speed"
                  >
                    <span>{speechRate}x</span>
                  </button>

                  {showSpeedMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-ink-900 border border-tan-600/40 rounded-xl p-1.5 shadow-2xl z-20 min-w-[100px] space-y-0.5">
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-tan-400">Speed</div>
                      {SPEED_OPTIONS.map((rate) => (
                        <button
                          key={rate}
                          type="button"
                          onClick={() => handleSpeedChange(rate)}
                          className={`w-full text-left px-2 py-1 rounded-lg text-xs font-medium flex items-center justify-between transition-colors ${
                            speechRate === rate
                              ? 'bg-amber-500 text-ink-950 font-bold'
                              : 'text-cream-200 hover:bg-white/10'
                          }`}
                        >
                          <span>{rate}x</span>
                          {speechRate === rate && <Check className="w-3 h-3" />}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Narrator Voice Picker */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowVoiceMenu(!showVoiceMenu)}
                    className="px-2.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/15 text-cream-200 text-xs font-medium transition-colors cursor-pointer flex items-center gap-1 max-w-[130px]"
                    title="Narrator Voice"
                  >
                    <Sliders className="w-3 h-3 text-amber-400 shrink-0" />
                    <span className="truncate">{voiceDisplayName}</span>
                  </button>

                  {showVoiceMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-ink-900 border border-tan-600/40 rounded-xl p-2 shadow-2xl z-20 w-64 max-h-60 overflow-y-auto space-y-1">
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-tan-400">
                        Choose Narrator Voice
                      </div>
                      {availableVoices.length === 0 ? (
                        <p className="px-2 py-1 text-xs text-tan-400">Default browser voice active</p>
                      ) : (
                        availableVoices.map((v) => {
                          const isSelected = v.voiceURI === selectedVoiceURI;
                          const cleanName = v.name.replace(/(Google|Microsoft|Apple)\s*/gi, '');
                          return (
                            <button
                              key={v.voiceURI}
                              type="button"
                              onClick={() => handleVoiceChange(v.voiceURI)}
                              className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                                isSelected
                                  ? 'bg-amber-500 text-ink-950 font-bold'
                                  : 'text-cream-200 hover:bg-white/10'
                              }`}
                            >
                              <div className="truncate pr-2">
                                <div className="truncate">{cleanName}</div>
                                <div className="text-[10px] opacity-70 truncate">{v.lang}</div>
                              </div>
                              {isSelected && <Check className="w-3.5 h-3.5 shrink-0" />}
                            </button>
                          );
                        })
                      )}
                    </div>
                  )}
                </div>

                {/* Sleep Timer */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowSleepMenu(!showSleepMenu)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                      sleepSecondsLeft
                        ? 'bg-amber-500 text-ink-950 font-bold'
                        : 'bg-white/10 hover:bg-white/15 text-cream-200'
                    }`}
                    title="Audiobook Sleep Timer"
                  >
                    <Moon className="w-3.5 h-3.5" />
                    {sleepSecondsLeft && (
                      <span className="text-[10px] font-mono">{formatTime(sleepSecondsLeft)}</span>
                    )}
                  </button>

                  {showSleepMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-ink-900 border border-tan-600/40 rounded-xl p-1.5 shadow-2xl z-20 min-w-[140px] space-y-0.5">
                      <div className="px-2 py-1 text-[10px] uppercase font-bold text-tan-400 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        <span>Sleep Timer</span>
                      </div>
                      {SLEEP_TIMER_OPTIONS.map((opt) => {
                        const isSelected = sleepTimerMinutes === opt.minutes;
                        return (
                          <button
                            key={opt.minutes}
                            type="button"
                            onClick={() => handleSetSleepTimer(opt.minutes)}
                            className={`w-full text-left px-2 py-1.5 rounded-lg text-xs flex items-center justify-between transition-colors ${
                              isSelected
                                ? 'bg-amber-500 text-ink-950 font-bold'
                                : 'text-cream-200 hover:bg-white/10'
                            }`}
                          >
                            <span>{opt.label}</span>
                            {isSelected && <Check className="w-3 h-3" />}
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Cozy Ambient Pairing (Rain, Campfire, Wind) */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setShowAmbientMenu(!showAmbientMenu)}
                    className={`p-2 rounded-xl transition-colors cursor-pointer flex items-center gap-1 ${
                      ambientRain > 0 || ambientFire > 0 || ambientWind > 0
                        ? 'bg-peach-500 text-white font-bold'
                        : 'bg-white/10 hover:bg-white/15 text-cream-200'
                    }`}
                    title="Cozy Ambient Audio Backdrop"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                  </button>

                  {showAmbientMenu && (
                    <div className="absolute bottom-full mb-2 right-0 bg-ink-900 border border-tan-600/40 rounded-2xl p-3 shadow-2xl z-20 w-60 space-y-3">
                      <div className="flex items-center justify-between pb-1.5 border-b border-white/10">
                        <span className="text-xs font-bold text-cream-100 flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                          Cozy Backdrop
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setAmbientRain(0);
                            setAmbientFire(0);
                            setAmbientWind(0);
                          }}
                          className="text-[10px] text-peach-300 hover:underline cursor-pointer"
                        >
                          Mute All
                        </button>
                      </div>

                      {/* Gentle Rain */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-cream-200 mb-1">
                          <span className="flex items-center gap-1.5">
                            <CloudRain className="w-3.5 h-3.5 text-sky-400" />
                            Gentle Rain
                          </span>
                          <span className="text-[10px] font-mono opacity-70">
                            {Math.round(ambientRain * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={ambientRain}
                          onChange={(e) => setAmbientRain(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>

                      {/* Campfire Crackle */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-cream-200 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Flame className="w-3.5 h-3.5 text-amber-500" />
                            Warm Fireplace
                          </span>
                          <span className="text-[10px] font-mono opacity-70">
                            {Math.round(ambientFire * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={ambientFire}
                          onChange={(e) => setAmbientFire(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>

                      {/* Forest Wind */}
                      <div>
                        <div className="flex items-center justify-between text-xs text-cream-200 mb-1">
                          <span className="flex items-center gap-1.5">
                            <Wind className="w-3.5 h-3.5 text-teal-400" />
                            Forest Breeze
                          </span>
                          <span className="text-[10px] font-mono opacity-70">
                            {Math.round(ambientWind * 100)}%
                          </span>
                        </div>
                        <input
                          type="range"
                          min={0}
                          max={1}
                          step={0.05}
                          value={ambientWind}
                          onChange={(e) => setAmbientWind(parseFloat(e.target.value))}
                          className="w-full h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-amber-400"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Minimize Button */}
                <button
                  type="button"
                  onClick={() => setIsMinimized(true)}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-cream-300 hover:text-white transition-colors cursor-pointer"
                  title="Minimize Player"
                >
                  <ChevronDown className="w-4 h-4" />
                </button>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
                      window.speechSynthesis.cancel();
                    }
                    setIsPlaying(false);
                    onClose();
                  }}
                  className="p-1.5 rounded-xl hover:bg-white/10 text-cream-300 hover:text-white transition-colors cursor-pointer"
                  title="Close Audiobook Player"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
