import { useRef, useEffect } from 'react';
import { useMusic, type SoundPreset } from '@/context/MusicContext';
import {
  CloudRain,
  Flame,
  Wind,
  Music,
  Pause,
  Volume2,
  VolumeX,
  X,
  CheckCircle2,
  Sliders,
} from 'lucide-react';

interface AmbientMixerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function AmbientMixerModal({ isOpen, onClose }: AmbientMixerModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const {
    playing,
    muted,
    userVolume,
    togglePlayback,
    toggleMute,
    setVolume,
    ambientRain,
    ambientFire,
    ambientWind,
    setAmbientRain,
    setAmbientFire,
    setAmbientWind,
    applyPreset,
    activePreset,
    ambientTheme,
    sfxEnabled,
    toggleSfx,
    playCheckSfx,
    playDropdownSfx,
  } = useMusic();

  // Close when clicking outside or pressing Escape
  useEffect(() => {
    if (!isOpen) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
        onClose();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    document.addEventListener('mousedown', handleOutsideClick);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const presets: { id: SoundPreset; label: string; icon: string; theme: string }[] = [
    { id: 'rainy', label: 'Rainy Cafe', icon: '🌧️', theme: 'rain' },
    { id: 'campfire', label: 'Campfire', icon: '🪵', theme: 'fire' },
    { id: 'reading', label: 'Cozy Study', icon: '📖', theme: 'default' },
    { id: 'nature', label: 'Forest Wind', icon: '🍃', theme: 'wind' },
  ];

  const themeTrackLabels: Record<string, string> = {
    default: 'Cozy Study',
    rain: 'Rainy Cafe',
    fire: 'Campfire',
    wind: 'Forest Wind',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="ambient-sound-lounge notepad-card w-full max-w-md shadow-cozy-lg p-5 sm:p-6 relative animate-pop"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ambient-mixer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-tan-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div
              className="p-2 rounded-xl"
              style={{
                backgroundColor: 'var(--section-kicker-bg)',
                color: 'var(--theme-accent)',
                border: '1px solid var(--theme-accent-border)',
              }}
            >
              <Sliders className="w-5 h-5" />
            </div>
            <div>
              <h3 id="ambient-mixer-title" className="font-display text-lg font-bold text-ink-900">
                Cozy Sound Lounge
              </h3>
              <p className="text-xs text-tan-500 font-semibold">
                Mix ambient layers and customize your reading atmosphere
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 text-tan-400 hover:text-ink-900 hover:bg-cream-200 rounded-lg transition-colors"
            aria-label="Close sound lounge"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Presets */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-tan-500 flex items-center gap-1">
              <Sliders className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent)' }} />
              Quick Atmosphere Presets
            </span>
            {(ambientRain > 0 || ambientFire > 0 || ambientWind > 0) && (
              <button
                type="button"
                onClick={() => applyPreset('reset')}
                className="text-[11px] text-tan-400 hover:text-rose-500 font-semibold transition-colors"
              >
                Clear Ambience
              </button>
            )}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {presets.map((preset) => {
              const isSelected =
                activePreset === preset.id || (activePreset === null && ambientTheme === preset.theme);
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => applyPreset(preset.id)}
                  className={`flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border text-xs font-bold shadow-cozy-sm transition-all active:scale-95 ${
                    isSelected
                      ? 'border-transparent ring-2'
                      : 'border-tan-200 bg-white hover:bg-cream-100 text-ink-800'
                  }`}
                  style={
                    isSelected
                      ? {
                          backgroundColor: 'var(--section-kicker-bg)',
                          borderColor: 'var(--theme-accent)',
                          color: 'var(--section-kicker-color)',
                          boxShadow: '0 0 0 2px var(--theme-accent-border)',
                        }
                      : undefined
                  }
                >
                  <span>{preset.icon}</span>
                  <span>{preset.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Sound Sliders */}
        <div className="space-y-4 bg-cream-100/70 p-3.5 rounded-2xl border border-tan-200 mb-5">
          {/* Lo-Fi Background Music */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-32 flex-shrink-0">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className={`p-1.5 rounded-lg transition-colors ${
                  playing ? 'text-white' : 'bg-cream-200 text-tan-600'
                }`}
                style={
                  playing
                    ? {
                        backgroundColor: 'var(--theme-accent)',
                        color: 'var(--theme-accent-text, #ffffff)',
                      }
                    : undefined
                }
                title={playing ? 'Pause music' : 'Play music'}
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
              </button>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-ink-800 leading-tight">Lo-Fi Music</span>
                <span className="text-[10px] text-tan-500 font-medium leading-tight truncate max-w-[85px]">
                  {themeTrackLabels[ambientTheme] || 'BGM'}
                </span>
              </div>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={userVolume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 cursor-pointer"
              style={{ accentColor: 'var(--theme-accent)' }}
              aria-label="Lo-Fi Music volume"
            />
            <span className="text-[11px] font-bold text-tan-500 w-8 text-right">
              {Math.round(userVolume * 100)}%
            </span>
          </div>

          {/* Gentle Rain (Pastel Summer Beach Blue #83BAFF) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-28 flex-shrink-0">
              <button
                type="button"
                onClick={() => setAmbientRain(ambientRain > 0 ? 0 : 0.6)}
                className={`p-1.5 rounded-lg transition-colors ${
                  ambientRain > 0 ? 'bg-[#83BAFF] text-white' : 'bg-cream-200 text-tan-600'
                }`}
                title="Toggle rain sound"
              >
                <CloudRain className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-ink-800">Gentle Rain</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientRain}
              onChange={(e) => setAmbientRain(Number(e.target.value))}
              className="flex-1 accent-[#83BAFF] cursor-pointer"
              aria-label="Rain volume"
            />
            <span className="text-[11px] font-bold text-tan-500 w-8 text-right">
              {Math.round(ambientRain * 100)}%
            </span>
          </div>

          {/* Campfire (Pastel Sandy Brown #FD9A4D) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-28 flex-shrink-0">
              <button
                type="button"
                onClick={() => setAmbientFire(ambientFire > 0 ? 0 : 0.65)}
                className={`p-1.5 rounded-lg transition-colors ${
                  ambientFire > 0 ? 'bg-[#FD9A4D] text-white' : 'bg-cream-200 text-tan-600'
                }`}
                title="Toggle campfire crackle"
              >
                <Flame className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-ink-800">Campfire</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientFire}
              onChange={(e) => setAmbientFire(Number(e.target.value))}
              className="flex-1 accent-[#FD9A4D] cursor-pointer"
              aria-label="Campfire volume"
            />
            <span className="text-[11px] font-bold text-tan-500 w-8 text-right">
              {Math.round(ambientFire * 100)}%
            </span>
          </div>

          {/* Forest Wind (Pastel Sage Green #649058) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-28 flex-shrink-0">
              <button
                type="button"
                onClick={() => setAmbientWind(ambientWind > 0 ? 0 : 0.5)}
                className={`p-1.5 rounded-lg transition-colors ${
                  ambientWind > 0 ? 'bg-[#649058] text-white' : 'bg-cream-200 text-tan-600'
                }`}
                title="Toggle forest wind"
              >
                <Wind className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-ink-800">Forest Wind</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientWind}
              onChange={(e) => setAmbientWind(Number(e.target.value))}
              className="flex-1 accent-[#649058] cursor-pointer"
              aria-label="Forest wind volume"
            />
            <span className="text-[11px] font-bold text-tan-500 w-8 text-right">
              {Math.round(ambientWind * 100)}%
            </span>
          </div>
        </div>

        {/* Tactile Sound Effects Section */}
        <div className="flex items-center justify-between p-3 rounded-xl border border-tan-200 bg-white mb-5">
          <div className="flex items-center gap-2">
            <CheckCircle2
              className="w-4 h-4 transition-colors"
              style={{ color: sfxEnabled ? 'var(--theme-accent)' : 'var(--text-muted)' }}
            />
            <div>
              <p className="text-xs font-bold text-ink-900">Tactile Sound Effects</p>
              <p className="text-[11px] text-tan-500 font-medium">Checklist clicks & dropdown navigation</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => playCheckSfx(true)}
              className="px-2 py-1 text-[11px] font-bold rounded-md bg-cream-100 hover:bg-cream-200 text-ink-800 transition-colors border border-tan-200/50"
              title="Preview checklist check sound"
            >
              Test Check
            </button>
            <button
              type="button"
              onClick={() => playDropdownSfx(true)}
              className="px-2 py-1 text-[11px] font-bold rounded-md bg-cream-100 hover:bg-cream-200 text-ink-800 transition-colors border border-tan-200/50"
              title="Preview dropdown menu sound"
            >
              Test Dropdown
            </button>
            <button
              type="button"
              onClick={toggleSfx}
              className="w-9 h-5 rounded-full transition-colors relative"
              style={{
                backgroundColor: sfxEnabled ? 'var(--theme-accent)' : 'var(--card-line, #dce8fc)',
              }}
              aria-label="Toggle step sound effects"
            >
              <span
                className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-cozy-sm transition-all duration-200 ${
                  sfxEnabled ? 'left-4.5' : 'left-0.5'
                }`}
              />
            </button>
          </div>
        </div>

        {/* Footer controls */}
        <div className="flex items-center justify-between pt-3 border-t border-tan-200 text-xs">
          <button
            type="button"
            onClick={toggleMute}
            className="flex items-center gap-1.5 font-bold text-tan-600 hover:text-ink-900 transition-colors"
          >
            {muted ? (
              <VolumeX className="w-4 h-4 text-rose-500" />
            ) : (
              <Volume2 className="w-4 h-4" style={{ color: 'var(--theme-accent)' }} />
            )}
            <span>{muted ? 'Unmute All Audio' : 'Mute Master Audio'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="site-button px-5 py-1.5 text-xs font-bold rounded-xl shadow-cozy-sm transition-all active:scale-95"
            style={{
              backgroundColor: 'var(--theme-accent)',
              color: 'var(--theme-accent-text, #ffffff)',
            }}
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
