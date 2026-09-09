import { useState } from 'react';
import { Music, Pause, Volume2, VolumeX, Sliders } from 'lucide-react';
import { useMusic } from '@/context/MusicContext';
import { AmbientMixerModal } from '@/components/AmbientMixerModal';

interface BackgroundMusicProps {
  compact?: boolean;
}

export function BackgroundMusic({ compact = false }: BackgroundMusicProps) {
  const {
    playing,
    muted,
    userVolume,
    togglePlayback,
    toggleMute,
    setVolume,
    hasActiveAmbience,
  } = useMusic();
  const [showMixer, setShowMixer] = useState(false);

  return (
    <>
      <div
        className={`music-control notepad-card ${compact ? 'music-control-compact' : ''}`}
        aria-label="Background music controls"
      >
        {compact ? (
          <div className="flex flex-col items-start gap-1">
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
              <div className="flex flex-col">
                <span className="turntable-label">{playing ? 'Playing' : 'Tap to relax'}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowMixer(true);
                  }}
                  className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-peach-600 hover:text-peach-700 bg-white/80 px-2 py-0.5 rounded-full border border-tan-200 transition-colors shadow-cozy-sm"
                >
                  <Sliders className="w-2.5 h-2.5" />
                  <span>{hasActiveAmbience ? 'Ambience On' : 'Mix Ambience'}</span>
                </button>
              </div>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
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
            <button
              type="button"
              onClick={() => setShowMixer(true)}
              className="p-2 rounded-full border border-tan-200 bg-cream-50 hover:bg-peach-100 text-tan-600 hover:text-peach-600 transition-colors"
              title="Open Ambient Sound Lounge"
            >
              <Sliders className="w-4 h-4" />
            </button>
          </div>
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
        </>
      )}
    </div>
    <AmbientMixerModal isOpen={showMixer} onClose={() => setShowMixer(false)} />
  </>

  );
}


