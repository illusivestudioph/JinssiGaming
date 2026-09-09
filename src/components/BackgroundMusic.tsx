import { Music, Pause, Volume2, VolumeX } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';

interface BackgroundMusicProps {
  compact?: boolean;
}

export function BackgroundMusic({ compact = false }: BackgroundMusicProps) {
  const {
    playing,
    muted,
    userVolume,
    audioError,
    togglePlayback,
    toggleMute,
    setVolume,
  } = useMusic();

  return (
    <div
      className={`music-control notepad-card ${compact ? 'music-control-compact' : ''}`}
      aria-label="Background music controls"
    >
      {compact ? (
        <button
          type="button"
          className={`turntable-button ${playing ? 'turntable-button-playing' : ''}`}
          onClick={() => void togglePlayback()}
          aria-label={playing ? 'Pause background music' : 'Tap to relax with background music'}
          title={playing ? 'Pause music' : 'Tap to relax'}
        >
          <span className="turntable-container" aria-hidden="true">
            <span className="turntable-plate">
              <span className="turntable-record">
                <span className="turntable-record-border">
                  <span className="turntable-record-center" />
                </span>
              </span>
            </span>
            <span className="turntable-player">
              <span className="turntable-player-circ" />
              <span className="turntable-player-rect" />
            </span>
          </span>
          <span className="turntable-label">{playing ? 'Playing' : 'Tap to relax'}</span>
        </button>
      ) : (
        <button
          type="button"
          className="vinyl-play-button"
          onClick={() => void togglePlayback()}
          aria-label={playing ? 'Pause background music' : 'Play background music'}
          title={playing ? 'Pause music' : 'Play music'}
        >
          {playing ? <Pause className="h-4 w-4" /> : <Music className="h-4 w-4" />}
          <span className="vinyl-play-text">{playing ? 'Playing' : 'Play music'}</span>
        </button>
      )}
      {!compact && (
        <>
          <Music className="h-4 w-4 text-earth-600" aria-hidden="true" />
          <label className="sr-only" htmlFor="bgm-volume">
            Music volume
          </label>
          <input
            id="bgm-volume"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={userVolume}
            onChange={(event) => setVolume(Number(event.target.value))}
            aria-label="Music volume"
          />
          <button
            type="button"
            className="music-control-button"
            onClick={toggleMute}
            aria-label={muted ? 'Unmute background music' : 'Mute background music'}
            title={muted ? 'Unmute music' : 'Mute music'}
          >
            {muted || userVolume === 0 ? (
              <VolumeX className="h-4 w-4" />
            ) : (
              <Volume2 className="h-4 w-4" />
            )}
          </button>
          {audioError && <span className="music-control-error">Click play</span>}
        </>
      )}
    </div>
  );
}

