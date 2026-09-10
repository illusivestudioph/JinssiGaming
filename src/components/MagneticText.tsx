import React, { useRef, useEffect, useCallback, useMemo } from 'react';

interface MagneticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  // Medium intensity magnetic physics
  radius?: number;
  feather?: number;
  strength?: number;
  rotation?: number; // degrees
  scatter?: number;
  spring?: number;
  damping?: number;
  maxDisplacement?: number;
}

interface LetterState {
  el: HTMLSpanElement;
  x: number;
  y: number;
  vx: number;
  vy: number;
  angle: number;
  targetAngle: number;
  seed: number;
  width: number;
}

export function MagneticText({
  text,
  className = '',
  as: Component = 'span',
  radius = 28,
  feather = 110,
  strength = 0.82, // Punchy and responsive magnetic push
  rotation = 16, // Distinct, playful tilt (16 degrees max)
  scatter = 0.42, // Organic scatter
  spring = 0.38,
  damping = 0.18, // Crisp spring return
  maxDisplacement = 24, // Noticeably more powerful displacement
}: MagneticTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Split text into lines, words, and letters
  const lines = useMemo(() => {
    let globalIdx = 0;
    return text.split('\n').map((line) => {
      const words = line.trim().split(/\s+/).filter(Boolean).map((word) => {
        const letters = Array.from(word).map((char) => {
          const idx = globalIdx++;
          const seed = ((idx * 137.5) % 100) / 100;
          return { char, idx, seed };
        });
        return { word, letters };
      });
      return words;
    });
  }, [text]);

  // Magnetic physics loop (radial push + playful tilt, zero clipping)
  const updatePhysics = useCallback(() => {
    let hasMotion = false;
    const mouse = mousePosRef.current;
    const states = lettersRef.current;
    const rotationRad = (rotation * Math.PI) / 180;

    for (let i = 0; i < states.length; i++) {
      const item = states[i];
      if (!item || !item.el) continue;

      let targetX = 0;
      let targetY = 0;
      let targetAngle = 0;

      if (mouse && isHoveredRef.current) {
        const rect = item.el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dx = letterCenterX - mouse.x; // push away from cursor
        const dy = letterCenterY - mouse.y;
        const dist = Math.hypot(dx, dy);

        // Falloff zone
        const s = 1 - Math.max(0, Math.min(1, (dist - radius) / feather));

        if (s > 0) {
          const c = dist > 0.01 ? dx / dist : 1;
          const l = dist > 0.01 ? dy / dist : 0;
          const u = radius + (item.width || 18) * 0.4;
          const d = Math.max(0, u - dist);
          const f = s * s;
          const push = d * strength * f * 2.0;
          const h = item.seed * Math.PI * 2;
          const noise = f * 18 * scatter;
          const noiseX = Math.cos(h + dist * 0.02) * noise;
          const noiseY = Math.sin(h + dist * 0.02) * noise;

          const rawX = c * push + noiseX;
          const rawY = l * push + noiseY;

          // Clamp displacement so power is felt without breaking word cohesion
          targetX = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawX));
          targetY = Math.max(-maxDisplacement, Math.min(maxDisplacement, rawY));

          // Natural tilt based on cursor angle
          targetAngle = (Math.atan2(l, c) + Math.PI / 2) * f * rotationRad;
          targetAngle = Math.max(-rotationRad, Math.min(rotationRad, targetAngle));
        }
      }

      // Spring velocity integration
      item.vx += (targetX - item.x) * spring;
      item.vy += (targetY - item.y) * spring;
      item.vx *= (1 - damping);
      item.vy *= (1 - damping);
      item.x += item.vx;
      item.y += item.vy;

      // Angle spring lerp
      item.angle += (targetAngle - item.angle) * 0.25;

      const moving =
        Math.abs(item.x) > 0.04 ||
        Math.abs(item.y) > 0.04 ||
        Math.abs(item.vx) > 0.04 ||
        Math.abs(item.vy) > 0.04 ||
        Math.abs(item.angle) > 0.003;

      if (moving) {
        hasMotion = true;
        const deg = (item.angle * 180) / Math.PI;
        item.el.style.transform = `translate3d(${item.x.toFixed(2)}px, ${item.y.toFixed(2)}px, 0) rotate(${deg.toFixed(2)}deg)`;
      } else {
        item.x = 0;
        item.y = 0;
        item.vx = 0;
        item.vy = 0;
        item.angle = 0;
        item.el.style.transform = '';
      }
    }

    if (hasMotion || isHoveredRef.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameId.current = null;
    }
  }, [radius, feather, strength, rotation, scatter, spring, damping, maxDisplacement]);

  const startAnimation = useCallback(() => {
    if (!animFrameId.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    }
  }, [updatePhysics]);

  const handlePointerMove = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    isHoveredRef.current = true;
    startAnimation();
  };

  const handlePointerEnter = (e: React.PointerEvent) => {
    if (e.pointerType === 'touch') return;
    mousePosRef.current = { x: e.clientX, y: e.clientY };
    isHoveredRef.current = true;
    startAnimation();
  };

  const handlePointerLeave = () => {
    isHoveredRef.current = false;
    mousePosRef.current = null;
    startAnimation();
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  const registerLetterRef = (el: HTMLSpanElement | null, idx: number, seed: number) => {
    if (el) {
      const rect = el.getBoundingClientRect();
      if (!lettersRef.current[idx]) {
        lettersRef.current[idx] = {
          el,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          angle: 0,
          targetAngle: 0,
          seed,
          width: rect.width || 16,
        };
      } else {
        lettersRef.current[idx].el = el;
        if (rect.width) lettersRef.current[idx].width = rect.width;
      }
    }
  };

  return (
    <Component
      ref={containerRef as any}
      className={`magnetic-text-container select-none ${className}`}
      style={{ overflow: 'visible' }}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={text.replace(/\n/g, ' ')}
    >
      {lines.map((lineWords, lineIdx) => (
        <span
          key={`line-${lineIdx}`}
          className="block w-full text-center whitespace-normal sm:whitespace-nowrap"
          style={{
            display: 'block',
            width: '100%',
            textAlign: 'center',
            overflow: 'visible',
            lineHeight: 'inherit',
          }}
        >
          {lineWords.map((w, wordIdx) => (
            <span
              key={`word-${lineIdx}-${wordIdx}`}
              className="magnetic-word inline-block whitespace-nowrap mr-[0.28em] last:mr-0 align-baseline"
              style={{
                display: 'inline-block',
                whiteSpace: 'nowrap',
                verticalAlign: 'baseline',
                overflow: 'visible',
              }}
              aria-hidden="true"
            >
              {w.letters.map((l) => (
                <span
                  key={`char-${l.idx}`}
                  ref={(el) => registerLetterRef(el, l.idx, l.seed)}
                  className="inline-block will-change-transform align-baseline select-none"
                  style={{
                    display: 'inline-block',
                    verticalAlign: 'baseline',
                    overflow: 'visible',
                  }}
                >
                  {l.char}
                </span>
              ))}
            </span>
          ))}
        </span>
      ))}
    </Component>
  );
}
