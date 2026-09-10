import React, { useRef, useEffect, useState, useCallback, useMemo } from 'react';

interface MagneticRollingTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  strength?: number;
  radius?: number;
  maxDisplacement?: number;
  duplicateCount?: number;
  rollDuration?: number;
  staggerDelay?: number;
  blurIntensity?: number;
  autoPlay?: boolean;
}

interface LetterState {
  el: HTMLSpanElement;
  currentX: number;
  currentY: number;
  targetX: number;
  targetY: number;
}

export function MagneticText({
  text,
  className = '',
  as: Component = 'span',
  strength = 0.4,
  radius = 120,
  maxDisplacement = 20,
  duplicateCount = 6,
  rollDuration = 1.1,
  staggerDelay = 0.025,
  blurIntensity = 3.5,
  autoPlay = true,
}: MagneticRollingTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Rolling animation state
  const [isRolling, setIsRolling] = useState(false);
  const [replayKey, setReplayKey] = useState(0);

  // Start roll on mount
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

  // Split text into words and letters while preserving spaces
  const words = useMemo(() => {
    return text.split(' ').map((word) => ({
      word,
      letters: Array.from(word),
    }));
  }, [text]);

  // Magnetic cursor physics loop (60-120fps direct DOM manipulation)
  const updatePhysics = useCallback(() => {
    let hasMotion = false;
    const mouse = mousePosRef.current;
    const states = lettersRef.current;

    for (let i = 0; i < states.length; i++) {
      const item = states[i];
      if (!item || !item.el) continue;

      if (mouse && isHoveredRef.current) {
        const rect = item.el.getBoundingClientRect();
        const letterCenterX = rect.left + rect.width / 2;
        const letterCenterY = rect.top + rect.height / 2;

        const dx = mouse.x - letterCenterX;
        const dy = mouse.y - letterCenterY;
        const dist = Math.hypot(dx, dy);

        if (dist < radius) {
          const falloff = Math.pow(1 - dist / radius, 1.5);
          const pullX = dx * strength * falloff;
          const pullY = dy * strength * falloff;

          item.targetX = Math.max(-maxDisplacement, Math.min(maxDisplacement, pullX));
          item.targetY = Math.max(-maxDisplacement, Math.min(maxDisplacement, pullY));
        } else {
          item.targetX = 0;
          item.targetY = 0;
        }
      } else {
        item.targetX = 0;
        item.targetY = 0;
      }

      // Smooth elastic lerp toward target
      const prevX = item.currentX;
      const prevY = item.currentY;
      item.currentX += (item.targetX - item.currentX) * 0.22;
      item.currentY += (item.targetY - item.currentY) * 0.22;

      if (
        Math.abs(item.currentX - item.targetX) > 0.02 ||
        Math.abs(item.currentY - item.targetY) > 0.02 ||
        Math.abs(item.currentX) > 0.02 ||
        Math.abs(item.currentY) > 0.02
      ) {
        hasMotion = true;
        item.el.style.transform = `translate3d(${item.currentX.toFixed(2)}px, ${item.currentY.toFixed(2)}px, 0)`;
      } else if (prevX !== 0 || prevY !== 0) {
        item.currentX = 0;
        item.currentY = 0;
        item.el.style.transform = '';
      }
    }

    if (hasMotion || isHoveredRef.current) {
      animFrameId.current = requestAnimationFrame(updatePhysics);
    } else {
      animFrameId.current = null;
    }
  }, [radius, strength, maxDisplacement]);

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

  const registerLetterRef = (el: HTMLSpanElement | null, idx: number) => {
    if (el) {
      if (!lettersRef.current[idx]) {
        lettersRef.current[idx] = {
          el,
          currentX: 0,
          currentY: 0,
          targetX: 0,
          targetY: 0,
        };
      } else {
        lettersRef.current[idx].el = el;
      }
    }
  };

  let globalLetterIdx = 0;

  return (
    <Component
      ref={containerRef as any}
      className={`magnetic-rolling-text-container select-none ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleReplay}
      title="Click to roll text again"
      aria-label={text}
    >
      {words.map((w, wordIdx) => (
        <span
          key={`word-${wordIdx}-${replayKey}`}
          className="magnetic-word inline-block whitespace-nowrap mr-[0.28em] last:mr-0 align-baseline"
          style={{ display: 'inline-block', whiteSpace: 'nowrap', verticalAlign: 'baseline' }}
          aria-hidden="true"
        >
          {w.letters.map((char) => {
            const currentIdx = globalLetterIdx++;
            const charDelay = currentIdx * staggerDelay;
            const duplicates = Array(duplicateCount).fill(char);

            const scrollPercent = ((duplicateCount - 1) / duplicateCount) * 100;

            return (
              <span
                key={`char-${currentIdx}`}
                ref={(el) => registerLetterRef(el, currentIdx)}
                className="magnetic-char-box inline-block will-change-transform align-baseline"
                style={{
                  display: 'inline-block',
                  height: '1.2em',
                  overflow: 'hidden',
                  verticalAlign: 'baseline',
                }}
              >
                {/* Rolling Strip Column */}
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
                      ? `transform ${rollDuration}s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${charDelay}s, filter ${rollDuration * 0.8}s ease-out ${charDelay}s`
                      : 'none',
                    filter: isRolling ? 'blur(0px)' : `blur(${blurIntensity}px)`,
                    willChange: 'transform, filter',
                  }}
                >
                  {duplicates.map((dupChar, dIdx) => (
                    <span
                      key={`dup-${dIdx}`}
                      className="inline-flex items-center justify-center leading-none"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        height: '1.2em',
                        lineHeight: '1.2em',
                      }}
                    >
                      {dupChar}
                    </span>
                  ))}
                </span>
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
