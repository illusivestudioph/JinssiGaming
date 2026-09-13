import React from 'react';
import { AdventurerConfig, FaceShape, getAdventurerAvatarUrl } from '@/types/profile';

interface CozyAvatarProps {
  config?: Partial<AdventurerConfig>;
  size?: number | string;
  className?: string;
  showBorder?: boolean;
}

export function CozyAvatar({
  config,
  size = 48,
  className = '',
  showBorder = true,
}: CozyAvatarProps) {
  const avatarUrl = getAdventurerAvatarUrl(config);
  const shape: FaceShape = config?.faceShape || 'oval';

  // Face shape silhouette curve styling
  const shapeRadiusClass = {
    oval: 'rounded-full',
    round: 'rounded-[47%]',
    square: 'rounded-[38%]',
    heart: 'rounded-[44%_44%_50%_50%]',
    diamond: 'rounded-[40%_40%_48%_48%]',
  }[shape];

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center select-none shadow-xs transition-all bg-[#FDE8D3] ${shapeRadiusClass} ${
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
        className={`w-full h-full object-cover select-none transition-transform duration-200 ${
          shape === 'square' ? 'scale-105' : shape === 'round' ? 'scale-102' : ''
        }`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />

      {/* Subtle Face Shape Chin & Jawline Contour Overlay */}
      {shape === 'square' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M26 62 Q36 78 50 82 Q64 78 74 62"
            stroke="#8B5A2B"
            strokeWidth="2"
            strokeOpacity="0.35"
            strokeLinecap="round"
          />
          <path
            d="M42 81 H58"
            stroke="#6B4226"
            strokeWidth="2.5"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
        </svg>
      )}

      {shape === 'heart' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M30 60 Q40 82 50 84 Q60 82 70 60"
            stroke="#8B5A2B"
            strokeWidth="1.8"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      )}

      {shape === 'diamond' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          <path
            d="M20 48 Q28 54 32 58 M80 48 Q72 54 68 58"
            stroke="#8B5A2B"
            strokeWidth="1.6"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
          <path
            d="M34 68 Q50 84 66 68"
            stroke="#8B5A2B"
            strokeWidth="1.8"
            strokeOpacity="0.3"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
