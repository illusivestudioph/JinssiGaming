import { useEffect, useRef, useCallback } from 'react';

const CONFETTI_COLORS = [
  '#ff6b6b', // Coral flame
  '#ff9248', // Warm tangerine
  '#ffb38a', // Peach blush
  '#ffc837', // Sunflower gold
  '#ffe699', // Pale champagne gold
  '#82ad76', // Cozy sage green
  '#48cae4', // Fresh mint
  '#9d8df1', // Pastel periwinkle
  '#c0bbfe', // Lavender mist
  '#ff70a6', // Strawberry pink
  '#ffd700', // Sparkling gold
  '#70d6ff', // Sky cyan
];

type Shape = 'ribbon' | 'square' | 'circle' | 'star' | 'streamer';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  shape: Shape;
  color: string;
  backColor: string;
  width: number;
  height: number;
  angle: number;
  vAngle: number;
  wobble: number;
  vWobble: number;
  tilt: number;
  vTilt: number;
  gravity: number;
  drag: number;
  opacity: number;
  fadeStart: number; // life progress when fade begins (0.5 - 0.7)
  life: number; // 0 to 1
  lifeDecay: number;
}

interface ConfettiCanvasProps {
  burstTrigger: number;
  originRef?: React.RefObject<HTMLElement | null>;
  className?: string;
}

// Adjust color luminance for paper backside illusion
function adjustLightness(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 255) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amount));
  const b = Math.min(255, Math.max(0, (num & 255) + amount));
  return `rgb(${r}, ${g}, ${b})`;
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, spikes: number, outerR: number, innerR: number) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;

  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    let x = cx + Math.cos(rot) * outerR;
    let y = cy + Math.sin(rot) * outerR;
    ctx.lineTo(x, y);
    rot += step;

    x = cx + Math.cos(rot) * innerR;
    y = cy + Math.sin(rot) * innerR;
    ctx.lineTo(x, y);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
  ctx.fill();
}

export function ConfettiCanvas({ burstTrigger, originRef, className }: ConfettiCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animFrameRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(0);
  const runAnimationLoopRef = useRef<() => void>(() => {});

  // Spawn confetti particles centered on the popper origin
  const spawnBurst = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let originX = window.innerWidth / 2;
    let originY = window.innerHeight * 0.38;

    if (originRef?.current) {
      const rect = originRef.current.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        originX = rect.left + rect.width / 2;
        originY = rect.top + rect.height * 0.45;
      }
    }

    const shapes: Shape[] = ['ribbon', 'square', 'circle', 'star', 'streamer'];
    const count = 110;
    const newParticles: Particle[] = [];

    for (let i = 0; i < count; i++) {
      // Angular distribution:
      // 60% shoot upwards & diagonally (-175deg to -5deg)
      // 25% shoot wide horizontal left and right
      // 15% burst downward behind the card
      let angleRad: number;
      const band = i % 10;
      if (band < 6) {
        const deg = -175 + ((i * 31) % 170);
        angleRad = (deg * Math.PI) / 180;
      } else if (band < 8.5) {
        const isLeft = i % 2 === 0;
        const deg = isLeft ? -195 + ((i * 17) % 30) : -15 + ((i * 17) % 30);
        angleRad = (deg * Math.PI) / 180;
      } else {
        const deg = 25 + ((i * 29) % 130);
        angleRad = (deg * Math.PI) / 180;
      }

      // 3 Velocity tiers for depth & reach:
      // Tier 0 (fast outrunners reaching off-screen)
      // Tier 1 (mid-screen flurry)
      // Tier 2 (cozy lingering floaters)
      const tier = i % 3;
      let speed: number;
      if (tier === 0) {
        speed = 22 + ((i * 13) % 16); // 22 - 37 px/frame
      } else if (tier === 1) {
        speed = 14 + ((i * 11) % 10); // 14 - 23 px/frame
      } else {
        speed = 8 + ((i * 7) % 8);   // 8 - 15 px/frame
      }

      // Add a slight upward boost to counteract initial gravity
      const vx = Math.cos(angleRad) * speed;
      const vy = Math.sin(angleRad) * speed - 2.5;

      const shape = shapes[i % shapes.length];
      const baseColor = CONFETTI_COLORS[i % CONFETTI_COLORS.length];
      const backColor = adjustLightness(baseColor, 35);

      let width = 10;
      let height = 18;
      if (shape === 'ribbon') {
        width = 9 + (i % 4);
        height = 18 + (i % 5) * 2;
      } else if (shape === 'square') {
        const s = 10 + (i % 5);
        width = s;
        height = s;
      } else if (shape === 'circle') {
        const s = 8 + (i % 4);
        width = s;
        height = s;
      } else if (shape === 'star') {
        const s = 12 + (i % 5);
        width = s;
        height = s;
      } else if (shape === 'streamer') {
        width = 5;
        height = 28 + (i % 4) * 4;
      }

      newParticles.push({
        x: originX + (Math.random() - 0.5) * 16,
        y: originY + (Math.random() - 0.5) * 16,
        vx,
        vy,
        shape,
        color: baseColor,
        backColor,
        width,
        height,
        angle: Math.random() * Math.PI * 2,
        vAngle: (Math.random() - 0.5) * 0.12,
        wobble: Math.random() * Math.PI * 2,
        vWobble: 0.08 + Math.random() * 0.08,
        tilt: Math.random() * Math.PI * 2,
        vTilt: 0.06 + Math.random() * 0.08,
        gravity: 0.22 + ((i % 5) * 0.035), // gentle realistic gravity
        drag: 0.958 + ((i % 4) * 0.005),   // smooth air resistance
        opacity: 1,
        fadeStart: 0.55 + Math.random() * 0.2,
        life: 0,
        lifeDecay: 0.0038 + Math.random() * 0.0022, // ~3.5 to 4.5 seconds
      });
    }

    // Add to existing particles for seamless layering on repeated clicks
    particlesRef.current.push(...newParticles);

    // Start animation loop if not already running
    if (!animFrameRef.current) {
      lastTimeRef.current = performance.now();
      runAnimationLoopRef.current();
    }
  }, [originRef]);

  // Main high-performance animation frame loop
  const runAnimationLoop = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const particles = particlesRef.current;
    if (particles.length === 0) {
      // Clear canvas and stop loop when no particles remain
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
        animFrameRef.current = null;
      }
      return;
    }

    // Delta timing for consistent frame-rate independent smoothness
    const now = performance.now();
    const dt = Math.min(2.5, Math.max(0.5, (now - (lastTimeRef.current || now)) / 16.67));
    lastTimeRef.current = now;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const surviving: Particle[] = [];

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Update physics
      p.vx *= Math.pow(p.drag, dt);
      p.vy *= Math.pow(p.drag, dt);
      p.vy += p.gravity * dt;

      p.x += p.vx * dt;
      p.y += p.vy * dt;

      // 3D rotations and paper wobble
      p.angle += p.vAngle * dt;
      p.wobble += p.vWobble * dt;
      p.tilt += p.vTilt * dt;

      // Lifecycle and fade-out
      p.life += p.lifeDecay * dt;
      if (p.life >= p.fadeStart) {
        const fadeProgress = (p.life - p.fadeStart) / (1 - p.fadeStart);
        p.opacity = Math.max(0, 1 - fadeProgress);
      }

      // Check boundary and life
      const isOffBottom = p.y > window.innerHeight + 100;
      const isDead = p.life >= 1 || p.opacity <= 0.01;

      if (!isDead && !isOffBottom) {
        surviving.push(p);

        // Render particle
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);

        // Realistic 3D paper flutter:
        // cos(wobble) represents horizontal flip, sin(tilt) represents vertical tilt
        const cosWobble = Math.cos(p.wobble);
        const sinTilt = Math.sin(p.tilt);
        ctx.scale(cosWobble, sinTilt);

        // Switch color when flipped over (creates foil/double-sided paper depth)
        const isFlipped = cosWobble * sinTilt < 0;
        ctx.fillStyle = isFlipped ? p.backColor : p.color;
        ctx.globalAlpha = p.opacity;

        const hw = p.width / 2;
        const hh = p.height / 2;

        if (p.shape === 'star') {
          drawStar(ctx, 0, 0, 5, p.width * 0.7, p.width * 0.35);
        } else if (p.shape === 'circle') {
          ctx.beginPath();
          ctx.arc(0, 0, hw, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.shape === 'square') {
          // Rounded square
          ctx.beginPath();
          const r = 2;
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-hw, -hh, p.width, p.height, r);
          } else {
            ctx.rect(-hw, -hh, p.width, p.height);
          }
          ctx.fill();
        } else {
          // Ribbon or streamer
          ctx.beginPath();
          const r = 1.5;
          if (typeof ctx.roundRect === 'function') {
            ctx.roundRect(-hw, -hh, p.width, p.height, r);
          } else {
            ctx.rect(-hw, -hh, p.width, p.height);
          }
          ctx.fill();
        }

        ctx.restore();
      }
    }

    particlesRef.current = surviving;
    animFrameRef.current = requestAnimationFrame(() => runAnimationLoopRef.current());
  }, []);

  useEffect(() => {
    runAnimationLoopRef.current = runAnimationLoop;
  }, [runAnimationLoop]);

  // Update canvas resolution on resize & device pixel ratio
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleResize = () => {
      const dpr = window.devicePixelRatio || 1;
      const width = window.innerWidth;
      const height = window.innerHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.scale(dpr, dpr);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, []);

  // Trigger burst when burstTrigger counter increments
  useEffect(() => {
    if (burstTrigger > 0) {
      const raf = requestAnimationFrame(() => {
        spawnBurst();
      });
      return () => cancelAnimationFrame(raf);
    }
  }, [burstTrigger, spawnBurst]);

  return (
    <canvas
      ref={canvasRef}
      className={className || 'fixed inset-0 pointer-events-none z-[10]'}
      aria-hidden="true"
    />
  );
}
