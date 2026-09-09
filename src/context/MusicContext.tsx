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
const sfxStorageKey = 'jinssi-sfx-enabled';
const musicVolumeScale = 0.5;

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

  // Ambient Soundscapes
  ambientRain: number;
  ambientFire: number;
  ambientWind: number;
  setAmbientRain: (vol: number) => void;
  setAmbientFire: (vol: number) => void;
  setAmbientWind: (vol: number) => void;
  applyPreset: (preset: SoundPreset) => void;

  // SFX
  sfxEnabled: boolean;
  toggleSfx: () => void;
  playCheckSfx: () => void;
  playUncheckSfx: () => void;

  // Active Ambience Summary
  hasActiveAmbience: boolean;
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

  const settingsRef = useRef({ muted, userVolume, ambientRain, ambientFire, ambientWind });
  settingsRef.current = { muted, userVolume, ambientRain, ambientFire, ambientWind };

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio) return;
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
    await audio.play().catch(() => setAudioError(true));
  };

  const pauseMusic = () => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
    }
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
    if (!muted) {
      ambientEngine.setRainVolume(clamped);
    }
  };

  const setAmbientFire = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientFireState(clamped);
    localStorage.setItem(fireStorageKey, String(clamped));
    if (!muted) {
      ambientEngine.setFireVolume(clamped);
    }
  };

  const setAmbientWind = (vol: number) => {
    const clamped = Math.max(0, Math.min(1, vol));
    setAmbientWindState(clamped);
    localStorage.setItem(windStorageKey, String(clamped));
    if (!muted) {
      ambientEngine.setWindVolume(clamped);
    }
  };

  const toggleSfx = () => {
    setSfxEnabled((prev) => {
      const next = !prev;
      localStorage.setItem(sfxStorageKey, String(next));
      return next;
    });
  };

  const playCheckSfx = () => {
    if (sfxEnabled && !muted) {
      ambientEngine.playCheckSound();
    }
  };

  const playUncheckSfx = () => {
    if (sfxEnabled && !muted) {
      ambientEngine.playUncheckSound();
    }
  };

  const applyPreset = (preset: SoundPreset) => {
    if (preset === 'rainy') {
      setAmbientRain(0.65);
      setAmbientFire(0.2);
      setAmbientWind(0);
      void playMusic();
    } else if (preset === 'campfire') {
      setAmbientRain(0);
      setAmbientFire(0.7);
      setAmbientWind(0.25);
      void playMusic();
    } else if (preset === 'reading') {
      setAmbientRain(0.45);
      setAmbientFire(0.35);
      setAmbientWind(0.15);
      void playMusic();
    } else if (preset === 'nature') {
      setAmbientRain(0.3);
      setAmbientFire(0);
      setAmbientWind(0.6);
      void playMusic();
    } else if (preset === 'reset') {
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

  // Initialize single persistent Audio element on mount
  useEffect(() => {
    const audio = new Audio('/bgm.mp3');
    audio.autoplay = true;
    audio.loop = true;
    audio.setAttribute('playsinline', 'true');
    audio.volume = settingsRef.current.muted ? 0 : settingsRef.current.userVolume * musicVolumeScale;

    const handlePlay = () => setPlaying(true);
    const handlePause = () => setPlaying(false);
    const handleError = () => setAudioError(true);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('error', handleError);
    audioRef.current = audio;

    const startAfterInteraction = () => {
      const settings = settingsRef.current;
      if (!settings.muted && settings.userVolume > 0 && audio.paused) {
        void audio
          .play()
          .then(() => {
            window.removeEventListener('pointerdown', startAfterInteraction);
            window.removeEventListener('keydown', startAfterInteraction);
          })
          .catch(() => setAudioError(true));
      }
      // Also prime ambient engine
      if (!settings.muted) {
        if (settings.ambientRain > 0) ambientEngine.setRainVolume(settings.ambientRain);
        if (settings.ambientFire > 0) ambientEngine.setFireVolume(settings.ambientFire);
        if (settings.ambientWind > 0) ambientEngine.setWindVolume(settings.ambientWind);
      }
    };

    window.addEventListener('pointerdown', startAfterInteraction, { passive: true });
    window.addEventListener('keydown', startAfterInteraction, { passive: true });

    audio.load();
    if (!settingsRef.current.muted && settingsRef.current.userVolume > 0) {
      void audio.play().catch(() => setAudioError(true));
    }

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('error', handleError);
      window.removeEventListener('pointerdown', startAfterInteraction);
      window.removeEventListener('keydown', startAfterInteraction);
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

        sfxEnabled,
        toggleSfx,
        playCheckSfx,
        playUncheckSfx,

        hasActiveAmbience,
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
