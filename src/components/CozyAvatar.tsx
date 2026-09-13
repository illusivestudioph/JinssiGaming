import React from 'react';
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
  const avatarUrl = getAdventurerAvatarUrl(config);
  const shape: FaceShape = config?.faceShape || 'oval';

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
        src={avatarUrl}
        alt="Cozy Adventurer Avatar"
        className="w-full h-full object-cover select-none transition-transform duration-200"
        style={FACE_SHAPE_STYLES[shape] || FACE_SHAPE_STYLES.oval}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
