import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react';

const volumeStorageKey = 'jinssi-bgm-volume';
const mutedStorageKey = 'jinssi-bgm-muted';
const musicVolumeScale = 0.5;

function readSavedVolume(): number {
  if (typeof window === 'undefined') return 0.7;
  const saved = Number(localStorage.getItem(volumeStorageKey));
  return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 0.7;
}

function readSavedMuted(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem(mutedStorageKey) === 'true';
}

export interface MusicContextValue {
  playing: boolean;
  muted: boolean;
  userVolume: number;
  audioError: boolean;
  togglePlayback: () => Promise<void>;
  toggleMute: () => void;
  setVolume: (volume: number) => void;
  playMusic: () => Promise<void>;
  pauseMusic: () => void;
}

const MusicContext = createContext<MusicContextValue | null>(null);

export function MusicProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userVolume, setUserVolume] = useState<number>(() => readSavedVolume());
  const [muted, setMuted] = useState<boolean>(() => readSavedMuted());
  const [playing, setPlaying] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<boolean>(false);

  const settingsRef = useRef({ muted, userVolume });
  settingsRef.current = { muted, userVolume };

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
    setMuted((prev) => !prev);
  };

  const setVolume = (newVol: number) => {
    const clamped = Math.max(0, Math.min(1, newVol));
    setUserVolume(clamped);
    if (muted && clamped > 0) {
      setMuted(false);
    }
  };

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
