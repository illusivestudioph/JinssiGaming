import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface MagneticRollingTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  // Magnetic physics parameters (matched to peaceful-feel demo)
  radius?: number; // 8 - 25px
  feather?: number; // 90px falloff
  strength?: number; // 100%
  rotation?: number; // 25deg
  scatter?: number; // 65%
  spring?: number; // 0.4s
  damping?: number; // 0.1s
  // Rolling parameters (per-word)
  duplicateCount?: number;
  rollDuration?: number;
  staggerDelay?: number;
  blurIntensity?: number;
  autoPlay?: boolean;
}

interface LetterState {
  el: HTMLSpanElement;
  homeX: number;
  homeY: number;
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
  radius = 18,
  feather = 95,
  strength = 1.0,
  rotation = 25, // degrees
  scatter = 0.65, // 65%
  spring = 0.38,
  damping = 0.22,
  duplicateCount = 5,
  rollDuration = 1.0,
  staggerDelay = 0.045, // per word stagger
  blurIntensity = 2.5,
  autoPlay = true,
}: MagneticRollingTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Per-word rolling state
  const [isRolling, setIsRolling] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  useEffect(() => {
    if (autoPlay) {
      const timer = setTimeout(() => {
        setIsRolling(true);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [autoPlay, replayKey]);

  const handleReplay = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsRolling(false);
    setTimeout(() => {
      setReplayKey((k) => k + 1);
      setIsRolling(true);
    }, 40);
  };

  // Structured words and letters with pseudo-random seed
  const words = useMemo(() => {
    let globalIdx = 0;
    return text.split(' ').map((word) => {
      const letters = Array.from(word).map((char) => {
        const idx = globalIdx++;
        // Pseudo-random deterministic seed for scatter dispersion
        const seed = ((idx * 137.5) % 100) / 100;
        return { char, idx, seed };
      });
      return { word, letters };
    });
  }, [text]);

  // Framer Magnetic Text physics loop (radial push + 25deg rotation + 65% scatter)
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

        const dx = letterCenterX - mouse.x; // vector AWAY from cursor
        const dy = letterCenterY - mouse.y;
        const dist = Math.hypot(dx, dy);

        // Falloff calculation matching Framer peaceful-feel
        const s = 1 - Math.max(0, Math.min(1, (dist - radius) / feather));

        if (s > 0) {
          const c = dist > 0.01 ? dx / dist : 1;
          const l = dist > 0.01 ? dy / dist : 0;
          const u = radius + (item.width || 18) * 0.35;
          const d = Math.max(0, u - dist);
          const f = s * s;
          const p = d * strength * f * 2.2;
          const h = item.seed * Math.PI * 2;
          const g = f * 32 * scatter * 1.35;
          const noiseX = Math.cos(h + dist * 0.018) * g;
          const noiseY = Math.sin(h + dist * 0.018) * g;

          targetX = c * p + noiseX;
          targetY = l * p + noiseY;

          // Rotation angle away from cursor
          targetAngle = (Math.atan2(l, c) + Math.PI / 2) * f * rotationRad;
          // Clamp angle within [-rotation, rotation]
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
      item.angle += (targetAngle - item.angle) * 0.28;

      const moving =
        Math.abs(item.x) > 0.05 ||
        Math.abs(item.y) > 0.05 ||
        Math.abs(item.vx) > 0.05 ||
        Math.abs(item.vy) > 0.05 ||
        Math.abs(item.angle) > 0.005;

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
  }, [radius, feather, strength, rotation, scatter, spring, damping]);

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
          homeX: 0,
          homeY: 0,
          x: 0,
          y: 0,
          vx: 0,
          vy: 0,
          angle: 0,
          targetAngle: 0,
          seed,
          width: rect.width || 18,
        };
      } else {
        lettersRef.current[idx].el = el;
        if (rect.width) lettersRef.current[idx].width = rect.width;
      }
    }
  };

  const scrollPercent = ((duplicateCount - 1) / duplicateCount) * 100;

  return (
    <Component
      ref={containerRef as any}
      className={`magnetic-rolling-text-container select-none ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleReplay}
      title="Click to roll words again"
      aria-label={text}
    >
      {words.map((w, wordIdx) => {
        const wordDelay = wordIdx * staggerDelay;
        const duplicates = Array(duplicateCount).fill(w.word);

        return (
          <span
            key={`word-${wordIdx}-${replayKey}`}
            className="magnetic-word-wrapper inline-block whitespace-nowrap mr-[0.28em] last:mr-0 align-baseline"
            style={{
              display: 'inline-block',
              whiteSpace: 'nowrap',
              height: '1.24em',
              overflow: 'hidden',
              verticalAlign: 'baseline',
            }}
            aria-hidden="true"
          >
            {/* Word-by-Word Rolling Strip */}
            <span
              className="flex flex-col items-center justify-start"
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-start',
                transform: isRolling
                  ? `translate3d(0, -${scrollPercent.toFixed(4)}%, 0)`
                  : 'translate3d(0, 0, 0)',
                transition: isRolling
                  ? `transform ${rollDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${wordDelay}s, filter ${rollDuration * 0.7}s ease-out ${wordDelay}s`
                  : 'none',
                filter: isRolling ? 'blur(0px)' : `blur(${blurIntensity}px)`,
                willChange: 'transform, filter',
              }}
            >
              {duplicates.map((dupWord, dIdx) => {
                const isFinalLanding = dIdx === duplicateCount - 1;

                return (
                  <span
                    key={`dup-${dIdx}`}
                    className="inline-flex items-center justify-center leading-none"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '1.24em',
                      lineHeight: '1.24em',
                    }}
                  >
                    {isFinalLanding ? (
                      /* Final landed word contains interactive magnetic letters with rotation & scatter */
                      w.letters.map((l) => (
                        <span
                          key={`char-${l.idx}`}
                          ref={(el) => registerLetterRef(el, l.idx, l.seed)}
                          className="inline-block will-change-transform align-baseline select-none"
                          style={{
                            display: 'inline-block',
                            verticalAlign: 'baseline',
                          }}
                        >
                          {l.char}
                        </span>
                      ))
                    ) : (
                      <span>{dupWord}</span>
                    )}
                  </span>
                );
              })}
            </span>
          </span>
        );
      })}
    </Component>
  );
}
