import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const volumeStorageKey = 'jinssi-bgm-volume';
const mutedStorageKey = 'jinssi-bgm-muted';
const musicVolumeScale = 0.5;

interface BackgroundMusicProps {
  compact?: boolean;
}

export function BackgroundMusic({ compact = false }: BackgroundMusicProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userVolume, setUserVolume] = useState(() => readVolume());
  const [muted, setMuted] = useState(() => localStorage.getItem(mutedStorageKey) === 'true');
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
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

  useEffect(() => {
    const audio = new Audio('/bgm.mp3');
    audio.autoplay = true;
    audio.loop = true;
    audio.preload = 'auto';
    audio.setAttribute('playsinline', 'true');
    audio.volume = muted ? 0 : userVolume * musicVolumeScale;
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('error', () => setAudioError(true));
    audioRef.current = audio;

    const startAfterInteraction = () => {
      const settings = settingsRef.current;
      if (!settings.muted && settings.userVolume > 0) {
        void audio.play()
          .then(() => {
            window.removeEventListener('pointerdown', startAfterInteraction);
            window.removeEventListener('keydown', startAfterInteraction);
          })
          .catch(() => setAudioError(true));
      }
    };
    window.addEventListener('pointerdown', startAfterInteraction);
    window.addEventListener('keydown', startAfterInteraction);
    audio.load();
    if (!muted && userVolume > 0) {
      void audio.play().catch(() => setAudioError(true));
    }

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('pointerdown', startAfterInteraction);
      window.removeEventListener('keydown', startAfterInteraction);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = muted ? 0 : userVolume * musicVolumeScale;
    localStorage.setItem(volumeStorageKey, String(userVolume));
    localStorage.setItem(mutedStorageKey, String(muted));
  }, [muted, userVolume]);

  const togglePlayback = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      await playMusic();
    } else {
      audio.pause();
    }
  };

  const toggleMute = () => setMuted((value) => !value);

  return (
    <div className={`music-control notepad-card ${compact ? 'music-control-hero' : ''}`} aria-label="Background music controls">
      <button type="button" className={`vinyl-play-button ${playing ? 'vinyl-play-button-playing' : ''}`} onClick={() => void togglePlayback()} aria-label={playing ? 'Pause background music' : 'Tap to play background music'} title={playing ? 'Pause music' : 'Tap to play music'}>
        <span className="vinyl-record" aria-hidden="true">
          <span className="vinyl-record-label" />
        </span>
        <span className="vinyl-play-icon">{playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}</span>
        <span className="vinyl-play-text">{playing ? 'Playing' : 'Tap to play'}</span>
      </button>
      {!compact && (
        <>
          <Music className="h-4 w-4 text-earth-600" aria-hidden="true" />
          <label className="sr-only" htmlFor="bgm-volume">Music volume</label>
          <input
            id="bgm-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={userVolume}
            onChange={(event) => setUserVolume(Number(event.target.value))}
            aria-label="Music volume"
          />
          <button type="button" className="music-control-button" onClick={toggleMute} aria-label={muted ? 'Unmute background music' : 'Mute background music'} title={muted ? 'Unmute music' : 'Mute music'}>
            {muted || userVolume === 0 ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
          </button>
          {audioError && <span className="music-control-error">Click play</span>}
        </>
      )}
    </div>
  );
}

function readVolume() {
  const saved = Number(localStorage.getItem(volumeStorageKey));
  return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 0.7;
}
