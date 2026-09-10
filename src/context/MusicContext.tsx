import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { ambientEngine } from '@/utils/ambientAudio';

const volumeStorageKey = 'jinssi-bgm-volume';
const mutedStorageKey = 'jinssi-bgm-muted';
const rainStorageKey = 'jinssi-ambient-rain';
const fireStorageKey = 'jinssi-ambient-fire';
const windStorageKey = 'jinssi-ambient-wind';
const themeStorageKey = 'jinssi-ambient-theme';
const sfxStorageKey = 'jinssi-sfx-enabled';
const musicVolumeScale = 0.5;

const SUPABASE_AUDIO_BASE = `${import.meta.env.VITE_SUPABASE_URL || 'https://esjwkwgjnesyvnvuonmd.supabase.co'}/storage/v1/object/public/site-images/audio`;

export type AmbientTheme = 'default' | 'rain' | 'fire' | 'wind';

export const THEME_BGM_TRACKS: Record<AmbientTheme, string> = {
  default: `${SUPABASE_AUDIO_BASE}/bgm.mp3`,
  rain: `${SUPABASE_AUDIO_BASE}/rain.mp3`,
  fire: `${SUPABASE_AUDIO_BASE}/camp.mp3`,
  wind: `${SUPABASE_AUDIO_BASE}/forest.mp3`,
};

function readSavedFloat(key: string, defaultVal: number): number {
  if (typeof window === 'undefined') return defaultVal;
  const saved = Number(localStorage.getItem(key));
  return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : defaultVal;
}

function readSavedBool(key: string, defaultVal: boolean): boolean {
  if (typeof window === 'undefined') return defaultVal;
  const val = localStorage.getItem(key);
  if (val === null) return defaultVal;
  return val === 'true';
}

export type SoundPreset = 'rainy' | 'campfire' | 'reading' | 'nature' | 'reset';

export interface MusicContextValue {
  // BGM
  playing: boolean;
  muted: boolean;
  userVolume: number;
  audioError: boolean;
  togglePlayback: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;

  // Ambient Sounds
  ambientRain: number;
  ambientFire: number;
  ambientWind: number;
  setAmbientRain: (vol: number) => void;
  setAmbientFire: (vol: number) => void;
  setAmbientWind: (vol: number) => void;
  applyPreset: (preset: SoundPreset) => void;
  activePreset: SoundPreset | null;

  // SFX
  sfxEnabled: boolean;
  toggleSfx: () => void;
  playCheckSfx: (force?: boolean) => void;
  playUncheckSfx: (force?: boolean) => void;
  playDropdownSfx: (force?: boolean) => void;

  // Active Ambience Summary
  hasActiveAmbience: boolean;
  ambientTheme: AmbientTheme;
  setAmbientTheme: (theme: AmbientTheme) => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userVolume, setUserVolume] = useState<number>(() => readSavedFloat(volumeStorageKey, 0.7));
  const [muted, setMuted] = useState<boolean>(() => readSavedBool(mutedStorageKey, false));
  const [playing, setPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);

  // Ambient Sound levels
  const [ambientRain, setAmbientRainState] = useState<number>(() => readSavedFloat(rainStorageKey, 0));
  const [ambientFire, setAmbientFireState] = useState<number>(() => readSavedFloat(fireStorageKey, 0));
  const [ambientWind, setAmbientWindState] = useState<number>(() => readSavedFloat(windStorageKey, 0));

  // Sound Effects
  const [sfxEnabled, setSfxEnabled] = useState<boolean>(() => readSavedBool(sfxStorageKey, true));

  // Theme & Atmosphere selection
  const [ambientTheme, setAmbientThemeState] = useState<AmbientTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(themeStorageKey) as AmbientTheme | null;
      if (saved && (saved === 'default' || saved === 'rain' || saved === 'fire' || saved === 'wind')) {
        return saved;
      }
    }
    return 'default';
  });
  const [activePreset, setActivePreset] = useState<SoundPreset | null>('reading');

  const setAmbientTheme = (theme: AmbientTheme) => {
    setAmbientThemeState(theme);
    localStorage.setItem(themeStorageKey, theme);
  };

  // Synchronize HTML data-ambient-theme and <meta name="theme-color">
  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (ambientTheme === 'default') {
      document.documentElement.removeAttribute('data-ambient-theme');
    } else {
      document.documentElement.setAttribute('data-ambient-theme', ambientTheme);
    }

    let metaTag = document.querySelector<HTMLMetaElement>('meta[name="theme-color"]');
    if (!metaTag) {
      metaTag = document.createElement('meta');
      metaTag.name = 'theme-color';
      document.head.appendChild(metaTag);
    }

    const themeColors: Record<AmbientTheme, string> = {
      rain: '#ebf2fd',
      fire: '#fef4eb',
      wind: '#f1f7f0',
      default: '#fefcf7',
    };

    metaTag.content = themeColors[ambientTheme] || '#fefcf7';
  }, [ambientTheme]);

  const settingsRef = useRef({ muted, userVolume, ambientRain, ambientFire, ambientWind });
  settingsRef.current = { muted, userVolume, ambientRain, ambientFire, ambientWind };

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    const targetTrack = THEME_BGM_TRACKS[ambientTheme] || THEME_BGM_TRACKS.default;
    if (!audio.src || !audio.src.includes(targetTrack)) {
      audio.src = targetTrack;
    }
    let volume = userVolume;
    if (muted) {
      setMuted(false);
      volume = userVolume || 0.7;
    } else if (userVolume === 0) {
      volume = 0.7;
      setUserVolume(volume);
    }
    audio.volume = volume * musicVolumeScale;
    setAudioError(false);
    ambientEngine.setPaused(false);
    await audio.play().catch(() => setAudioError(true));
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
    ambientEngine.setPaused(true);
  };

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await playMusic();
    } else {
      pauseMusic();
    }
  };

  const toggleMute = () => {
    setMuted((prev) => {
      const next = !prev;
      ambientEngine.setMasterMuted(next);
      return next;
    });
  };

  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setUserVolume(clamped);
    if (muted && clamped > 0) {
      setMuted(false);
    }
  };

  const setAmbientRain = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientRainState(clamped);
    localStorage.setItem(rainStorageKey, String(clamped));
    if (clamped > 0) {
      ambientEngine.setPaused(false);
    }
    if (!muted) {
      ambientEngine.setRainVolume(clamped);
    }
    if (clamped >= 0.5 && clamped > ambientFire && clamped > ambientWind) {
      setAmbientTheme('rain');
      setActivePreset(null);
    }
  };

  const setAmbientFire = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientFireState(clamped);
    localStorage.setItem(fireStorageKey, String(clamped));
    if (clamped > 0) {
      ambientEngine.setPaused(false);
    }
    if (!muted) {
      ambientEngine.setFireVolume(clamped);
    }
    if (clamped >= 0.5 && clamped > ambientRain && clamped > ambientWind) {
      setAmbientTheme('fire');
      setActivePreset(null);
    }
  };

  const setAmbientWind = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientWindState(clamped);
    localStorage.setItem(windStorageKey, String(clamped));
    if (clamped > 0) {
      ambientEngine.setPaused(false);
    }
    if (!muted) {
      ambientEngine.setWindVolume(clamped);
    }
    if (clamped >= 0.5 && clamped > ambientRain && clamped > ambientFire) {
      setAmbientTheme('wind');
      setActivePreset(null);
    }
  };

  const toggleSfx = () => {
    setSfxEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(sfxStorageKey, String(next));
      return next;
    });
  };

  const playCheckSfx = (force = false) => {
    if ((sfxEnabled || force) && !muted) {
      ambientEngine.playCheckSound();
    }
  };

  const playUncheckSfx = (force = false) => {
    if ((sfxEnabled || force) && !muted) {
      ambientEngine.playUncheckSound();
    }
  };

  const playDropdownSfx = (force = false) => {
    if ((sfxEnabled || force) && !muted) {
      ambientEngine.playDropdownSound();
    }
  };

  const applyPreset = (preset: SoundPreset) => {
    setActivePreset(preset);
    if (muted && preset !== 'reset') {
      setMuted(false);
      ambientEngine.setMasterMuted(false);
    }
    if (preset === 'rainy') {
      setAmbientTheme('rain');
      setAmbientRain(0.65);
      setAmbientFire(0.15);
      setAmbientWind(0);
      void playMusic();
    } else if (preset === 'campfire') {
      setAmbientTheme('fire');
      setAmbientRain(0);
      setAmbientFire(0.7);
      setAmbientWind(0.2);
      void playMusic();
    } else if (preset === 'reading') {
      setAmbientTheme('default');
      setAmbientRain(0.25);
      setAmbientFire(0.2);
      setAmbientWind(0.1);
      void playMusic();
    } else if (preset === 'nature') {
      setAmbientTheme('wind');
      setAmbientRain(0.2);
      setAmbientFire(0);
      setAmbientWind(0.65);
      void playMusic();
    } else if (preset === 'reset') {
      setAmbientTheme('default');
      setAmbientRain(0);
      setAmbientFire(0);
      setAmbientWind(0);
    }
  };

  // Sync ambient volumes when mute state or individual levels change
  useEffect(() => {
    ambientEngine.setMasterMuted(muted);
    if (!muted) {
      ambientEngine.setRainVolume(ambientRain);
      ambientEngine.setFireVolume(ambientFire);
      ambientEngine.setWindVolume(ambientWind);
    } else {
      ambientEngine.setRainVolume(0);
      ambientEngine.setFireVolume(0);
      ambientEngine.setWindVolume(0);
    }
  }, [muted, ambientRain, ambientFire, ambientWind]);

  // Switch BGM audio track when ambientTheme changes
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const targetTrack = THEME_BGM_TRACKS[ambientTheme] || THEME_BGM_TRACKS.default;
    if (audio.src && !audio.src.includes(targetTrack)) {
      const wasPlaying = !audio.paused && !audio.ended;
      audio.src = targetTrack;
      if (wasPlaying && !muted && userVolume > 0) {
        void audio.play().catch(() => setAudioError(true));
      }
    }
  }, [ambientTheme, muted, userVolume]);

  // Initialize single persistent Audio element on mount (idle until user explicitly plays)
  useEffect(() => {
    const audio = new Audio();
    audio.autoplay = false;
    audio.preload = 'none';
    audio.loop = true;
    audio.setAttribute('playsinline', 'true');
    audio.volume = settingsRef.current.muted ? 0 : settingsRef.current.userVolume * musicVolumeScale;

    const handlePlay = () => {
      setPlaying(true);
      ambientEngine.setPaused(false);
    };
    const handlePause = () => {
      setPlaying(false);
      ambientEngine.setPaused(true);
    };
    const handleError = () => setAudioError(true);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.src = '';
      audioRef.current = null;
    };
  }, []);

  // Update volume and localStorage whenever muted or userVolume changes
  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.volume = muted ? 0 : userVolume * musicVolumeScale;
    }
    localStorage.setItem(volumeStorageKey, String(userVolume));
    localStorage.setItem(mutedStorageKey, String(muted));
  }, [muted, userVolume]);

  const hasActiveAmbience = ambientRain > 0 || ambientFire > 0 || ambientWind > 0;

  return (
    <MusicContext.Provider
      value={{
        playing,
        muted,
        userVolume,
        audioError,
        togglePlayback,
        toggleMute,
        setVolume,
        playMusic,
        pauseMusic,

        ambientRain,
        ambientFire,
        ambientWind,
        setAmbientRain,
        setAmbientFire,
        setAmbientWind,
        applyPreset,
        activePreset,

        sfxEnabled,
        toggleSfx,
        playCheckSfx,
        playUncheckSfx,
        playDropdownSfx,

        hasActiveAmbience,
        ambientTheme,
        setAmbientTheme,
      }}
    >
      {children}
    </MusicContext.Provider>
  );
}

export function useMusic() {
  const context = useContext(MusicContext);
  if (!context) {
    throw new Error('useMusic must be used within a MusicProvider');
  }
  return context;
}
