import { useEffect, useRef, useState } from 'react';
import { Music, Pause, Play, Volume2, VolumeX } from 'lucide-react';

const volumeStorageKey = 'jinssi-bgm-volume';
const mutedStorageKey = 'jinssi-bgm-muted';
const musicVolumeScale = 0.5;

export function BackgroundMusic() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [userVolume, setUserVolume] = useState(() => readVolume());
  const [muted, setMuted] = useState(() => localStorage.getItem(mutedStorageKey) === 'true');
  const [playing, setPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const playMusic = async () => {
    const audio = audioRef.current;
    if (!audio || muted || userVolume === 0) return;
    await audio.play().catch(() => setAudioError(true));
  };

  useEffect(() => {
    const audio = new Audio('/bgm.mp3');
    audio.loop = true;
    audio.preload = 'auto';
    audio.volume = muted ? 0 : userVolume * musicVolumeScale;
    audio.addEventListener('play', () => setPlaying(true));
    audio.addEventListener('pause', () => setPlaying(false));
    audio.addEventListener('error', () => setAudioError(true));
    audioRef.current = audio;

    const startAfterInteraction = () => {
      if (!muted && userVolume > 0) void audio.play().catch(() => undefined);
      window.removeEventListener('pointerdown', startAfterInteraction);
      window.removeEventListener('keydown', startAfterInteraction);
    };
    window.addEventListener('pointerdown', startAfterInteraction, { once: true });
    window.addEventListener('keydown', startAfterInteraction, { once: true });

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
    <div className="music-control notepad-card" aria-label="Background music controls">
      <button type="button" className="music-control-button" onClick={() => void togglePlayback()} aria-label={playing ? 'Pause background music' : 'Play background music'} title={playing ? 'Pause music' : 'Play music'}>
        {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
      </button>
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
      {audioError && <span className="music-control-error">Unavailable</span>}
    </div>
  );
}

function readVolume() {
  const saved = Number(localStorage.getItem(volumeStorageKey));
  return Number.isFinite(saved) && saved >= 0 && saved <= 1 ? saved : 0.7;
}
