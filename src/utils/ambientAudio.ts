/**
 * Cozy Ambient Sound Engine & Tactile Sound Effects
 * Uses real high-fidelity field recordings for ambient soundscapes
 * (Cozy Midnight Rain, Fireplace Crackles, Forest Wind & Birds)
 * with seamless Web Audio API looping, smooth volume ramping,
 * HTML5 Audio streaming fallback, and tactile UI click SFX.
 *
 * Audio is lazy-loaded: ambient tracks are only fetched when the user
 * adjusts their volume above 0 (opts in). SFX are loaded on first use.
 */

interface AmbientTrackState {
  name: 'rain' | 'fire' | 'wind';
  url: string;
  volumeScale: number;
  buffer: AudioBuffer | null;
  gainNode: GainNode | null;
  sourceNode: AudioBufferSourceNode | null;
  audioElement: HTMLAudioElement | null;
  userVolume: number;
  stopTimer: number | null;
  isLoading: boolean;
}

const SUPABASE_AUDIO_BASE = `${import.meta.env.VITE_SUPABASE_URL || 'https://esjwkwgjnesyvnvuonmd.supabase.co'}/storage/v1/object/public/site-images/audio`;

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Real ambient tracks hosted on Supabase Storage
  private tracks: Record<'rain' | 'fire' | 'wind', AmbientTrackState> = {
    rain: {
      name: 'rain',
      url: `${SUPABASE_AUDIO_BASE}/ambient-rain.mp3`,
      volumeScale: 0.75,
      buffer: null,
      gainNode: null,
      sourceNode: null,
      audioElement: null,
      userVolume: 0,
      stopTimer: null,
      isLoading: false,
    },
    fire: {
      name: 'fire',
      url: `${SUPABASE_AUDIO_BASE}/ambient-fire.mp3`,
      volumeScale: 0.7,
      buffer: null,
      gainNode: null,
      sourceNode: null,
      audioElement: null,
      userVolume: 0,
      stopTimer: null,
      isLoading: false,
    },
    wind: {
      name: 'wind',
      url: `${SUPABASE_AUDIO_BASE}/ambient-wind.mp3`,
      volumeScale: 0.65,
      buffer: null,
      gainNode: null,
      sourceNode: null,
      audioElement: null,
      userVolume: 0,
      stopTimer: null,
      isLoading: false,
    },
  };

  // Audio file buffers for tactile SFX
  private checkBuffer: AudioBuffer | null = null;
  private dropdownBuffer: AudioBuffer | null = null;
  private sfxLoaded = false;
  private isMasterMuted = false;
  private isPaused = true;

  // No constructor preloading — all audio is lazy-loaded on demand.

  /**
   * Lazily load a single ambient track's buffer (called when user sets volume > 0).
   */
  private ensureTrackLoaded(track: AmbientTrackState) {
    if (track.buffer || track.isLoading) return;
    track.isLoading = true;

    const ctx = this.initContext();
    if (!ctx) return;

    // Create HTML Audio fallback for immediate streaming while buffer decodes
    this.initTrackAudioElement(track);

    const decode = (buffer: ArrayBuffer): Promise<AudioBuffer> => {
      return new Promise((resolve, reject) => {
        try {
          const res = ctx.decodeAudioData(buffer, resolve, reject);
          if (res && typeof (res as Promise<AudioBuffer>).then === 'function') {
            (res as Promise<AudioBuffer>).then(resolve).catch(reject);
          }
        } catch (err) {
          reject(err);
        }
      });
    };

    fetch(track.url)
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error(`${track.url} failed`))))
      .then(decode)
      .then((buffer) => {
        track.buffer = buffer;
        track.isLoading = false;
        // If user already adjusted volume while loading, start playing smoothly
        if (track.userVolume > 0 && !this.isMasterMuted) {
          this.syncTrackPlayback(track);
        }
      })
      .catch(() => {
        track.isLoading = false;
        // If Web Audio decoding fails, fallback to HTMLAudioElement
      });
  }

  /**
   * Lazily load SFX buffers on first use (check.mp3 + dropdown.mp3 are ~41KB total).
   */
  private ensureSfxLoaded() {
    if (this.sfxLoaded) return;
    this.sfxLoaded = true;

    const ctx = this.initContext();
    if (!ctx) return;

    const decode = (buffer: ArrayBuffer): Promise<AudioBuffer> => {
      return new Promise((resolve, reject) => {
        try {
          const res = ctx.decodeAudioData(buffer, resolve, reject);
          if (res && typeof (res as Promise<AudioBuffer>).then === 'function') {
            (res as Promise<AudioBuffer>).then(resolve).catch(reject);
          }
        } catch (err) {
          reject(err);
        }
      });
    };

    fetch('/check.mp3')
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error('check.mp3 failed'))))
      .then(decode)
      .then((buffer) => {
        this.checkBuffer = buffer;
      })
      .catch(() => {});

    fetch('/dropdown.mp3')
      .then((res) => (res.ok ? res.arrayBuffer() : Promise.reject(new Error('dropdown.mp3 failed'))))
      .then(decode)
      .then((buffer) => {
        this.dropdownBuffer = buffer;
      })
      .catch(() => {});
  }

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMasterMuted ? 0 : 1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  private initTrackAudioElement(track: AmbientTrackState) {
    if (typeof window === 'undefined' || track.audioElement) return;
    try {
      const audio = new Audio(track.url);
      audio.loop = true;
      audio.setAttribute('playsinline', 'true');
      audio.volume = 0;
      track.audioElement = audio;
    } catch {
      // Ignore
    }
  }

  private syncTrackPlayback(track: AmbientTrackState) {
    const effectiveVolume = (this.isMasterMuted || this.isPaused) ? 0 : track.userVolume * track.volumeScale;

    if (effectiveVolume > 0) {
      const ctx = this.initContext();
      // Lazy-load this track if not yet loaded
      this.ensureTrackLoaded(track);

      if (track.stopTimer !== null) {
        window.clearTimeout(track.stopTimer);
        track.stopTimer = null;
      }

      // Priority 1: Web Audio API gapless looping buffer
      if (ctx && track.buffer) {
        if (!track.gainNode) {
          track.gainNode = ctx.createGain();
          track.gainNode.gain.setValueAtTime(0, ctx.currentTime);
          track.gainNode.connect(this.masterGain!);
        }

        if (!track.sourceNode) {
          try {
            const source = ctx.createBufferSource();
            source.buffer = track.buffer;
            source.loop = true;
            source.connect(track.gainNode);
            source.start(0);
            track.sourceNode = source;
          } catch {
            // In case buffer source fails, use HTMLAudioElement below
          }
        }

        if (track.gainNode) {
          const now = ctx.currentTime;
          track.gainNode.gain.setTargetAtTime(effectiveVolume, now, 0.08);
        }

        // Pause HTMLAudioElement fallback if active
        if (track.audioElement && !track.audioElement.paused) {
          track.audioElement.pause();
        }
        return;
      }

      // Priority 2: HTMLAudioElement fallback while buffer decodes
      if (track.audioElement) {
        track.audioElement.volume = Math.max(0, Math.min(1, effectiveVolume));
        if (track.audioElement.paused) {
          void track.audioElement.play().catch(() => {});
        }
      }
    } else {
      const ctx = this.ctx;
      // Volume is 0 or muted: fade out and stop source to save battery and CPU
      if (ctx && track.gainNode) {
        const now = ctx.currentTime;
        track.gainNode.gain.setTargetAtTime(0, now, 0.08);

        if (track.sourceNode && track.stopTimer === null) {
          track.stopTimer = window.setTimeout(() => {
            if (track.sourceNode && (track.userVolume === 0 || this.isMasterMuted)) {
              try {
                track.sourceNode.stop();
                track.sourceNode.disconnect();
              } catch {
                // Ignore
              }
              track.sourceNode = null;
            }
            track.stopTimer = null;
          }, 250);
        }
      }

      if (track.audioElement && !track.audioElement.paused) {
        track.audioElement.pause();
      }
    }
  }

  // --- AMBIENT VOLUME CONTROLS ---

  public setRainVolume(volume: number) {
    this.tracks.rain.userVolume = Math.max(0, Math.min(1, volume));
    this.syncTrackPlayback(this.tracks.rain);
  }

  public setFireVolume(volume: number) {
    this.tracks.fire.userVolume = Math.max(0, Math.min(1, volume));
    this.syncTrackPlayback(this.tracks.fire);
  }

  public setWindVolume(volume: number) {
    this.tracks.wind.userVolume = Math.max(0, Math.min(1, volume));
    this.syncTrackPlayback(this.tracks.wind);
  }

  // --- TACTILE UI SOUND EFFECTS ---

  private playSfx(
    url: string,
    buffer: AudioBuffer | null,
    playbackRate = 1.0,
    volume = 0.75
  ) {
    if (this.isMasterMuted) return;

    // Lazy-load SFX on first use
    if (!this.sfxLoaded) {
      this.ensureSfxLoaded();
    }

    const ctx = this.initContext();
    if (ctx && buffer) {
      try {
        if (ctx.state === 'suspended') {
          void ctx.resume();
        }
        const source = ctx.createBufferSource();
        source.buffer = buffer;
        source.playbackRate.value = playbackRate;

        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(volume, ctx.currentTime);

        source.connect(gainNode);
        gainNode.connect(this.masterGain || ctx.destination);
        source.start(0);
        return;
      } catch {
        // Fall back to HTMLAudioElement below
      }
    }

    // HTML5 Audio fallback
    try {
      const audio = new Audio(url);
      audio.volume = Math.max(0, Math.min(1, volume));
      if (playbackRate !== 1.0) {
        audio.playbackRate = playbackRate;
      }
      void audio.play().catch(() => {});
    } catch {
      // Ignore
    }
  }

  /**
   * Plays the tactile checklist check click sound from /check.mp3
   */
  public playCheckSound() {
    this.playSfx('/check.mp3', this.checkBuffer, 1.0, 0.75);
  }

  /**
   * Plays a slightly lower-pitched tactile sound when unchecking a step
   */
  public playUncheckSound() {
    this.playSfx('/check.mp3', this.checkBuffer, 0.85, 0.6);
  }

  /**
   * Plays the snappy dropdown sound from /dropdown.mp3
   */
  public playDropdownSound() {
    this.playSfx('/dropdown.mp3', this.dropdownBuffer, 1.0, 0.7);
  }

  public setPaused(paused: boolean) {
    this.isPaused = paused;
    if (this.masterGain && this.ctx) {
      const isSilenced = this.isMasterMuted || this.isPaused;
      this.masterGain.gain.setTargetAtTime(isSilenced ? 0 : 1, this.ctx.currentTime, 0.08);
    }
    const hasActiveTracks = (Object.keys(this.tracks) as ('rain' | 'fire' | 'wind')[]).some(
      (key) => this.tracks[key].userVolume > 0
    );
    if (hasActiveTracks || this.ctx) {
      (Object.keys(this.tracks) as ('rain' | 'fire' | 'wind')[]).forEach((key) => {
        this.syncTrackPlayback(this.tracks[key]);
      });
    }
  }

  public setMasterMuted(muted: boolean) {
    this.isMasterMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.08);
    }
    // Only re-sync tracks if user has actively enabled any ambient track or AudioContext is already running
    const hasActiveTracks = (Object.keys(this.tracks) as ('rain' | 'fire' | 'wind')[]).some(
      (key) => this.tracks[key].userVolume > 0
    );
    if (hasActiveTracks || this.ctx) {
      (Object.keys(this.tracks) as ('rain' | 'fire' | 'wind')[]).forEach((key) => {
        this.syncTrackPlayback(this.tracks[key]);
      });
    }
  }
}

export const ambientEngine = new AmbientSoundEngine();
