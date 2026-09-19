import React, { useState } from 'react';
import { AdventurerConfig, FaceShape, getAdventurerAvatarUrl } from '@/types/profile';

interface CozyAvatarProps {
  config?: Partial<AdventurerConfig>;
  size?: number | string;
  className?: string;
  showBorder?: boolean;
}

/**
 * Authentic character face shape styling:
 * - Oval: Natural, balanced proportions (1:1)
 * - Round: Fuller, softer chubby cheeks and wider jaw
 * - Square: Stronger, broader masculine / chiseled jaw presence
 * - Heart: Slender, tapered anime V-line jaw and pointed chin
 */
const FACE_SHAPE_STYLES: Record<FaceShape, React.CSSProperties> = {
  oval: { transform: 'scale(1, 1)' },
  round: { transform: 'scale(1.10, 0.94) translateY(1.5%)' },
  square: { transform: 'scale(1.12, 1.03) translateY(1%)' },
  heart: { transform: 'scale(0.92, 1.05) translateY(-1%)' },
};

export function CozyAvatar({
  config,
  size = 48,
  className = '',
  showBorder = true,
}: CozyAvatarProps) {
  const [loadFailed, setLoadFailed] = useState(false);
  const [fallbackFailed, setFallbackFailed] = useState(false);

  const avatarUrl = getAdventurerAvatarUrl(config);
  const safeSeed = encodeURIComponent(config?.seed || 'CozyPlayer');
  // Simple, bulletproof fallback URL with only seed
  const fallbackUrl = `https://api.dicebear.com/9.x/adventurer/svg?seed=${safeSeed}&backgroundColor=ffd7b5`;
  const shape: FaceShape = config?.faceShape || 'oval';

  const initial = (config?.seed || 'C').slice(0, 1).toUpperCase();

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
      {!fallbackFailed ? (
        <img
          src={loadFailed ? fallbackUrl : avatarUrl}
          alt={config?.seed ? `${config.seed}'s Avatar` : 'Cozy Adventurer Avatar'}
          className="w-full h-full object-cover select-none transition-transform duration-200"
          style={FACE_SHAPE_STYLES[shape] || FACE_SHAPE_STYLES.oval}
          loading="lazy"
          decoding="async"
          referrerPolicy="no-referrer"
          onError={() => {
            if (!loadFailed) {
              setLoadFailed(true);
            } else {
              setFallbackFailed(true);
            }
          }}
        />
      ) : (
        <span className="font-extrabold text-[#945524] select-none text-xs">
          {initial}
        </span>
      )}
    </div>
  );
}
