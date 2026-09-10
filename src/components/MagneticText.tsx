import React, { useRef, useEffect, useCallback, useMemo } from 'react';

interface MagneticTextProps {
  text: string;
  className?: string;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'span' | 'div';
  strength?: number;
  radius?: number;
  maxDisplacement?: number;
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
  strength = 0.38,
  radius = 110,
  maxDisplacement = 18,
}: MagneticTextProps) {
  const containerRef = useRef<HTMLElement | null>(null);
  const lettersRef = useRef<LetterState[]>([]);
  const mousePosRef = useRef<{ x: number; y: number } | null>(null);
  const animFrameId = useRef<number | null>(null);
  const isHoveredRef = useRef(false);

  // Split text into words and letters while preserving spaces
  const words = useMemo(() => {
    return text.split(' ').map((word) => ({
      word,
      letters: Array.from(word),
    }));
  }, [text]);

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
          // Non-linear falloff (stronger near the cursor, soft at edges)
          const falloff = Math.pow(1 - dist / radius, 1.6);
          const pullX = dx * strength * falloff;
          const pullY = dy * strength * falloff;

          // Clamp max displacement so text stays readable and doesn't collide wildly
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

      // Smooth elastic lerp towards target
      const prevX = item.currentX;
      const prevY = item.currentY;
      item.currentX += (item.targetX - item.currentX) * 0.22;
      item.currentY += (item.targetY - item.currentY) * 0.22;

      // Check if letter is still in motion
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
    // Only apply on pointer devices that support hover (mouse / trackpad)
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

  // Register DOM element refs
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
      className={`magnetic-text-container ${className}`}
      onPointerEnter={handlePointerEnter}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      aria-label={text}
    >
      {words.map((w, wordIdx) => (
        <span
          key={`word-${wordIdx}`}
          className="inline-block whitespace-nowrap mr-[0.28em] last:mr-0"
          aria-hidden="true"
        >
          {w.letters.map((char, charIdx) => {
            const currentIdx = globalLetterIdx++;
            return (
              <span
                key={`char-${wordIdx}-${charIdx}`}
                ref={(el) => registerLetterRef(el, currentIdx)}
                className="inline-block will-change-transform select-none transition-colors duration-150"
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </Component>
  );
}
