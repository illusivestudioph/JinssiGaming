import React, { useState, useEffect } from 'react';
import { AdventurerConfig, FaceShape, getAdventurerAvatarUrl } from '@/types/profile';

interface CozyAvatarProps {
  config?: Partial<AdventurerConfig>;
  size?: number | string;
  className?: string;
  showBorder?: boolean;
}

// In-memory cache for fetched raw SVGs and transformed morphed SVGs
const rawSvgCache = new Map<string, string>();
const transformedSvgCache = new Map<string, string>();

/**
 * Directly morphs the character's head outline and skin contour inside the SVG
 * according to the selected face shape (Round, Square, Heart/V-Line, Diamond, Oval)
 */
function morphAvatarHeadSvg(svgText: string, shape: FaceShape): string {
  if (shape === 'oval') return svgText;

  const firstGIndex = svgText.indexOf('<g transform="translate(-161 -83)">');
  if (firstGIndex === -1) return svgText;

  const pathIndex = svgText.indexOf('<path');
  if (pathIndex === -1 || pathIndex >= firstGIndex) return svgText;

  const beforeHead = svgText.slice(0, pathIndex);
  const headPaths = svgText.slice(pathIndex, firstGIndex);
  const afterHead = svgText.slice(firstGIndex);

  const transforms: Record<FaceShape, string> = {
    oval: headPaths,
    // Round: Cute chubby cheeks, wider jaw arc
    round: `<g transform="translate(380, 410) scale(1.12, 0.94) translate(-380, -410)">${headPaths}</g>`,
    // Heart: Delicate, tapered anime V-line jaw and pointed chin
    heart: `<g transform="translate(380, 360) scale(0.91, 1.06) translate(-380, -360)">${headPaths}</g>`,
    // Square: Strong, broader masculine/chiseled jaw presence
    square: `<g transform="translate(380, 440) scale(1.14, 1.04) translate(-380, -440)">${headPaths}</g>`,
    // Diamond: High cheekbones with sculpted chin definition
    diamond: `<g transform="translate(380, 400) scale(1.08, 1.05) translate(-380, -400)">${headPaths}</g>`,
  };

  const transformedHead = transforms[shape] || headPaths;
  return beforeHead + transformedHead + afterHead;
}

export function CozyAvatar({
  config,
  size = 48,
  className = '',
  showBorder = true,
}: CozyAvatarProps) {
  const avatarUrl = getAdventurerAvatarUrl(config);
  const shape: FaceShape = config?.faceShape || 'oval';
  const isGooglePhoto = Boolean(config?.useGooglePhoto && config?.googleAvatarUrl);

  const cacheKey = `${avatarUrl}_${shape}`;
  const [displaySrc, setDisplaySrc] = useState<string>(() => {
    if (isGooglePhoto || shape === 'oval') return avatarUrl;
    return transformedSvgCache.get(cacheKey) || avatarUrl;
  });

  useEffect(() => {
    if (isGooglePhoto || shape === 'oval') {
      setDisplaySrc(avatarUrl);
      return;
    }

    const cached = transformedSvgCache.get(cacheKey);
    if (cached) {
      setDisplaySrc(cached);
      return;
    }

    let active = true;

    // Fetch and morph SVG
    const processSvg = (rawSvg: string) => {
      const morphedSvg = morphAvatarHeadSvg(rawSvg, shape);
      const dataUri = `data:image/svg+xml;utf8,${encodeURIComponent(morphedSvg)}`;
      transformedSvgCache.set(cacheKey, dataUri);
      if (active) {
        setDisplaySrc(dataUri);
      }
    };

    const cachedRaw = rawSvgCache.get(avatarUrl);
    if (cachedRaw) {
      processSvg(cachedRaw);
    } else {
      fetch(avatarUrl)
        .then((res) => res.text())
        .then((text) => {
          rawSvgCache.set(avatarUrl, text);
          processSvg(text);
        })
        .catch(() => {
          if (active) {
            setDisplaySrc(avatarUrl);
          }
        });
    }

    return () => {
      active = false;
    };
  }, [avatarUrl, shape, cacheKey, isGooglePhoto]);

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center select-none shadow-xs transition-all bg-[#FDE8D3] rounded-full ${
        showBorder ? 'border-2 border-[#F5C6A0] dark:border-stone-700' : ''
      } ${className}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={displaySrc}
        alt="Cozy Adventurer Avatar"
        className="w-full h-full object-cover select-none transition-transform duration-200"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
