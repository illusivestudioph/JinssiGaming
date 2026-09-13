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
 * Directly morphs the character's head outline, jawline, and framing hair
 * inside the SVG according to the selected face shape (Round, Square, Heart/V-Line, Diamond, Oval).
 * Handles both short (male) and long/medium (female) hairstyles so face shapes are unmistakably visible.
 */
function morphAvatarHeadSvg(svgText: string, shape: FaceShape): string {
  if (shape === 'oval') return svgText;

  const parts = svgText.split('<g transform="translate(-161 -83)">');
  if (parts.length < 2) return svgText;

  // 1. Morph Head and Skin Silhouette (Part 0)
  const headPart = parts[0];
  const pathIndex = headPart.indexOf('<path');
  if (pathIndex === -1) return svgText;

  const beforeHead = headPart.slice(0, pathIndex);
  const headPaths = headPart.slice(pathIndex);

  const headTransforms: Record<FaceShape, string> = {
    oval: headPaths,
    // Round: Cute fuller chubby cheeks, wider jawline arc
    round: `<g transform="translate(380, 420) scale(1.24, 0.94) translate(-380, -420)">${headPaths}</g>`,
    // Heart: Delicate tapered anime V-line jaw with pointed chin
    heart: `<g transform="translate(380, 360) scale(0.85, 1.12) translate(-380, -360)">${headPaths}</g>`,
    // Square: Strong chiseled masculine/defined jaw presence
    square: `<g transform="translate(380, 450) scale(1.26, 1.05) translate(-380, -450)">${headPaths}</g>`,
    // Diamond: High cheekbones with sculpted angular taper
    diamond: `<g transform="translate(380, 400) scale(1.16, 1.08) translate(-380, -400)">${headPaths}</g>`,
  };

  parts[0] = beforeHead + (headTransforms[shape] || headPaths);

  // 2. Harmonize Framing Hair (Part 6) so female and long hairstyles complement the shaped jawline
  if (parts.length >= 7 && parts[6]) {
    const hairPart = parts[6];
    const hairTransforms: Record<FaceShape, string> = {
      oval: hairPart,
      round: `<g transform="translate(380, 420) scale(1.15, 0.96) translate(-380, -420)">${hairPart}</g>`,
      heart: `<g transform="translate(380, 380) scale(0.90, 1.06) translate(-380, -380)">${hairPart}</g>`,
      square: `<g transform="translate(380, 430) scale(1.16, 1.03) translate(-380, -430)">${hairPart}</g>`,
      diamond: `<g transform="translate(380, 400) scale(1.09, 1.05) translate(-380, -400)">${hairPart}</g>`,
    };
    parts[6] = hairTransforms[shape] || hairPart;
  }

  return parts.join('<g transform="translate(-161 -83)">');
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
