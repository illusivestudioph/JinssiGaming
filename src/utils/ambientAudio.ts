/**
 * Cozy Ambient Sound Engine & Procedural Sound Effects
 * Uses the Web Audio API to procedurally synthesize realistic, seamless ambient soundscapes
 * (Rain, Fireplace, Forest Wind) and satisfying tactile sound effects (pencil/wood check clicks)
 * without requiring large audio downloads.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;

  // Rain nodes
  private rainGain: GainNode | null = null;
  private rainNoiseNode: AudioNode | null = null;
  private rainDropletTimer: number | null = null;

  // Fireplace nodes
  private fireGain: GainNode | null = null;
  private fireRumbleNode: AudioNode | null = null;
  private fireCrackleTimer: number | null = null;

  // Forest Wind nodes
  private windGain: GainNode | null = null;
  private windNoiseNode: AudioNode | null = null;
  private windLfo: OscillatorNode | null = null;

  private isInitialized = false;

  private initContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(1, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }
    return this.ctx;
  }

  // Create a 5-second buffer of pink noise for natural texture
  private createPinkNoiseBuffer(ctx: AudioContext): AudioBuffer {
    const bufferSize = ctx.sampleRate * 5;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  // --- RAIN SYNTHESIZER ---
  public setRainVolume(volume: number) {
    const ctx = this.initContext();
    if (!ctx) return;

    if (!this.rainGain) {
      this.rainGain = ctx.createGain();
      this.rainGain.gain.setValueAtTime(0, ctx.currentTime);
      this.rainGain.connect(this.masterGain!);

      // Pink noise source through low-pass + band-pass for soothing rain shower
      const pinkBuffer = this.createPinkNoiseBuffer(ctx);
      const noiseSource = ctx.createBufferSource();
      noiseSource.buffer = pinkBuffer;
      noiseSource.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(1100, ctx.currentTime);

      const highpass = ctx.createBiquadFilter();
      highpass.type = 'highpass';
      highpass.frequency.setValueAtTime(320, ctx.currentTime);

      noiseSource.connect(lowpass);
      lowpass.connect(highpass);
      highpass.connect(this.rainGain);
      noiseSource.start(0);
      this.rainNoiseNode = noiseSource;

      // Occasional gentle raindrop impacts
      this.startRainDroplets(ctx);
    }

    const now = ctx.currentTime;
    this.rainGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume * 0.6)), now, 0.15);
  }

  private startRainDroplets(ctx: AudioContext) {
    if (this.rainDropletTimer) return;
    const scheduleNext = () => {
      const delay = 80 + Math.random() * 220;
      this.rainDropletTimer = window.setTimeout(() => {
        if (this.rainGain && this.rainGain.gain.value > 0.01) {
          this.triggerRaindrop(ctx);
        }
        scheduleNext();
      }, delay);
    };
    scheduleNext();
  }

  private triggerRaindrop(ctx: AudioContext) {
    try {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const freq = 1200 + Math.random() * 800;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.4, ctx.currentTime + 0.04);

      const dropVol = (Math.random() * 0.04 + 0.01) * (this.rainGain?.gain.value || 0.5);
      gain.gain.setValueAtTime(dropVol, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain!);
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // Ignore
    }
  }

  // --- FIREPLACE CRACKLE SYNTHESIZER ---
  public setFireVolume(volume: number) {
    const ctx = this.initContext();
    if (!ctx) return;

    if (!this.fireGain) {
      this.fireGain = ctx.createGain();
      this.fireGain.gain.setValueAtTime(0, ctx.currentTime);
      this.fireGain.connect(this.masterGain!);

      // Low rumble for warm burning coals
      const pinkBuffer = this.createPinkNoiseBuffer(ctx);
      const rumbleSource = ctx.createBufferSource();
      rumbleSource.buffer = pinkBuffer;
      rumbleSource.loop = true;

      const lowpass = ctx.createBiquadFilter();
      lowpass.type = 'lowpass';
      lowpass.frequency.setValueAtTime(280, ctx.currentTime);

      rumbleSource.connect(lowpass);
      lowpass.connect(this.fireGain);
      rumbleSource.start(0);
      this.fireRumbleNode = rumbleSource;

      // Realistic random wood crackles and pops
      this.startFireCrackles(ctx);
    }

    const now = ctx.currentTime;
    this.fireGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume * 0.5)), now, 0.15);
  }

  private startFireCrackles(ctx: AudioContext) {
    if (this.fireCrackleTimer) return;
    const scheduleNext = () => {
      // Irregular Poisson-like distribution for natural wood snaps
      const delay = 40 + Math.random() * (Math.random() > 0.8 ? 80 : 350);
      this.fireCrackleTimer = window.setTimeout(() => {
        if (this.fireGain && this.fireGain.gain.value > 0.01) {
          this.triggerFireCrackle(ctx);
        }
        scheduleNext();
      }, delay);
    };
    scheduleNext();
  }

  private triggerFireCrackle(ctx: AudioContext) {
    try {
      const now = ctx.currentTime;
      const buffer = ctx.createBuffer(1, Math.floor(ctx.sampleRate * 0.025), ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < data.length; i++) {
        data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (data.length * 0.3));
      }

      const source = ctx.createBufferSource();
      source.buffer = buffer;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(2000 + Math.random() * 2000, now);
      filter.Q.setValueAtTime(3 + Math.random() * 3, now);

      const gain = ctx.createGain();
      const popVol = (0.15 + Math.random() * 0.25) * (this.fireGain?.gain.value || 0.5);
      gain.gain.setValueAtTime(popVol, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.03);

      source.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain!);

      source.start(now);
      source.stop(now + 0.03);
    } catch {
      // Ignore
    }
  }

  // --- FOREST WIND SYNTHESIZER ---
  public setWindVolume(volume: number) {
    const ctx = this.initContext();
    if (!ctx) return;

    if (!this.windGain) {
      this.windGain = ctx.createGain();
      this.windGain.gain.setValueAtTime(0, ctx.currentTime);
      this.windGain.connect(this.masterGain!);

      const pinkBuffer = this.createPinkNoiseBuffer(ctx);
      const windSource = ctx.createBufferSource();
      windSource.buffer = pinkBuffer;
      windSource.loop = true;

      // Resonant bandpass modulated by slow LFO for breezy gusts
      const bandpass = ctx.createBiquadFilter();
      bandpass.type = 'bandpass';
      bandpass.frequency.setValueAtTime(380, ctx.currentTime);
      bandpass.Q.setValueAtTime(2.2, ctx.currentTime);

      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.18, ctx.currentTime); // slow breathing gust cycle
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(140, ctx.currentTime);

      lfo.connect(lfoGain);
      lfoGain.connect(bandpass.frequency);
      lfo.start(0);
      this.windLfo = lfo;

      windSource.connect(bandpass);
      bandpass.connect(this.windGain);
      windSource.start(0);
      this.windNoiseNode = windSource;
    }

    const now = ctx.currentTime;
    this.windGain.gain.setTargetAtTime(Math.max(0, Math.min(1, volume * 0.45)), now, 0.2);
  }

  // --- SATISFYING COZY SOUND EFFECTS ---
  /**
   * Plays a warm, satisfying wooden block / pencil scribble click when checking a step
   */
  public playCheckSound() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      // High, warm tactile "tock"
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(680, now);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.045);

      gain.gain.setValueAtTime(0.25, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.05);

      // Add tiny paper texture click
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'triangle';
      clickOsc.frequency.setValueAtTime(1200, now);
      clickGain.gain.setValueAtTime(0.08, now);
      clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.02);

      clickOsc.connect(clickGain);
      clickGain.connect(this.masterGain!);
      clickOsc.start(now);
      clickOsc.stop(now + 0.02);
    } catch {
      // Ignore
    }
  }

  /**
   * Plays a gentle, lower-pitched pop when unchecking a step
   */
  public playUncheckSound() {
    const ctx = this.initContext();
    if (!ctx) return;

    try {
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(360, now);
      osc.frequency.exponentialRampToValueAtTime(240, now + 0.04);

      gain.gain.setValueAtTime(0.18, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      osc.connect(gain);
      gain.connect(this.masterGain!);

      osc.start(now);
      osc.stop(now + 0.045);
    } catch {
      // Ignore
    }
  }

  public setMasterMuted(muted: boolean) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(muted ? 0 : 1, this.ctx.currentTime, 0.08);
    }
  }
}

export const ambientEngine = new AmbientSoundEngine();
