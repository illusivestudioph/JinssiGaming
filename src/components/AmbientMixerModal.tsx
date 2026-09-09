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
  Sparkles,
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

  const presets: { id: SoundPreset; label: string; icon: string }[] = [
    { id: 'rainy', label: 'Rainy Cafe', icon: '🌧️' },
    { id: 'campfire', label: 'Campfire', icon: '🪵' },
    { id: 'reading', label: 'Cozy Study', icon: '📖' },
    { id: 'nature', label: 'Forest Wind', icon: '🍃' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink-900/40 backdrop-blur-sm animate-fade-in">
      <div
        ref={modalRef}
        className="ambient-sound-lounge notepad-card w-full max-w-md bg-cream-50 border-2 border-tan-300 shadow-cozy-lg p-5 sm:p-6 relative animate-pop overflow-hidden"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ambient-mixer-title"
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b-2 border-tan-200 mb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-peach-100 text-peach-600">
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
              <Sparkles className="w-3.5 h-3.5 text-peach-500" />
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
            {presets.map((preset) => (
              <button
                key={preset.id}
                type="button"
                onClick={() => applyPreset(preset.id)}
                className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl border border-tan-200 bg-white hover:bg-peach-50/80 hover:border-peach-300 text-xs font-bold text-ink-800 shadow-cozy-sm transition-all active:scale-95"
              >
                <span>{preset.icon}</span>
                <span>{preset.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sound Sliders */}
        <div className="space-y-4 bg-cream-100/70 p-3.5 rounded-2xl border border-tan-200 mb-5">
          {/* Lo-Fi Background Music */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-28 flex-shrink-0">
              <button
                type="button"
                onClick={() => void togglePlayback()}
                className={`p-1.5 rounded-lg transition-colors ${
                  playing ? 'bg-[#FD9A4D] text-white' : 'bg-cream-200 text-tan-600'
                }`}
                title={playing ? 'Pause music' : 'Play music'}
              >
                {playing ? <Pause className="w-3.5 h-3.5" /> : <Music className="w-3.5 h-3.5" />}
              </button>
              <span className="text-xs font-bold text-ink-800">Lo-Fi Music</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={userVolume}
              onChange={(e) => setVolume(Number(e.target.value))}
              className="flex-1 accent-[#FD9A4D] cursor-pointer"
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

          {/* Fireplace Hearth (Pastel Sandy Brown #FD9A4D) */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 w-28 flex-shrink-0">
              <button
                type="button"
                onClick={() => setAmbientFire(ambientFire > 0 ? 0 : 0.65)}
                className={`p-1.5 rounded-lg transition-colors ${
                  ambientFire > 0 ? 'bg-[#FD9A4D] text-white' : 'bg-cream-200 text-tan-600'
                }`}
                title="Toggle fireplace crackle"
              >
                <Flame className="w-3.5 h-3.5" />
              </button>
              <span className="text-xs font-bold text-ink-800">Fireplace</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={ambientFire}
              onChange={(e) => setAmbientFire(Number(e.target.value))}
              className="flex-1 accent-[#FD9A4D] cursor-pointer"
              aria-label="Fireplace volume"
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
            <CheckCircle2 className={`w-4 h-4 ${sfxEnabled ? 'text-sage-500' : 'text-tan-400'}`} />
            <div>
              <p className="text-xs font-bold text-ink-900">Tactile Sound Effects</p>
              <p className="text-[11px] text-tan-500 font-medium">Checklist clicks & dropdown navigation</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              type="button"
              onClick={() => playCheckSfx(true)}
              className="px-2 py-1 text-[11px] font-bold rounded-md bg-cream-100 hover:bg-cream-200 text-ink-800 transition-colors"
              title="Preview checklist check sound"
            >
              Test Check
            </button>
            <button
              type="button"
              onClick={() => playDropdownSfx(true)}
              className="px-2 py-1 text-[11px] font-bold rounded-md bg-cream-100 hover:bg-cream-200 text-ink-800 transition-colors"
              title="Preview dropdown menu sound"
            >
              Test Dropdown
            </button>
            <button
              type="button"
              onClick={toggleSfx}
              className={`w-9 h-5 rounded-full transition-colors relative ${
                sfxEnabled ? 'bg-sage-400' : 'bg-cream-300'
              }`}
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
            {muted ? <VolumeX className="w-4 h-4 text-rose-500" /> : <Volume2 className="w-4 h-4 text-earth-600" />}
            <span>{muted ? 'Unmute All Audio' : 'Mute Master Audio'}</span>
          </button>
          <button
            type="button"
            onClick={onClose}
            className="site-button bg-earth-500 text-white hover:bg-earth-600 px-4 py-1.5 text-xs"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
