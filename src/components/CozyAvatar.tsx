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

  // Face shape silhouette framing
  const shapeRadiusClass = {
    oval: 'rounded-full',
    round: 'rounded-full ring-2 ring-amber-700/20',
    square: 'rounded-2xl ring-2 ring-amber-800/30 shadow-md',
    heart: 'rounded-t-full rounded-b-xl ring-2 ring-rose-700/25',
    diamond: 'rounded-[32%_32%_45%_45%] ring-2 ring-indigo-900/20',
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
          shape === 'square'
            ? 'scale-110'
            : shape === 'round'
            ? 'scale-105'
            : shape === 'heart'
            ? 'scale-108 -translate-y-0.5'
            : shape === 'diamond'
            ? 'scale-106'
            : 'scale-100'
        }`}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />

      {/* Prominent Jawline & Chin Sculpting Overlays */}
      {shape === 'square' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Angular Square Jawline & Chin Shadow */}
          <path
            d="M20 56 L24 74 L40 86 H60 L76 74 L80 56"
            stroke="#4A2E18"
            strokeWidth="3.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M40 86 H60"
            stroke="#2B1A0E"
            strokeWidth="4"
            strokeOpacity="0.75"
            strokeLinecap="round"
          />
          <path
            d="M44 78 Q50 82 56 78"
            stroke="#4A2E18"
            strokeWidth="2.8"
            strokeOpacity="0.6"
            strokeLinecap="round"
          />
        </svg>
      )}

      {shape === 'round' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Smooth Rounded Cheeks & Jaw Arc */}
          <path
            d="M18 52 Q22 84 50 86 Q78 84 82 52"
            stroke="#4A2E18"
            strokeWidth="3.2"
            strokeOpacity="0.45"
            strokeLinecap="round"
          />
          <path
            d="M45 80 Q50 84 55 80"
            stroke="#2B1A0E"
            strokeWidth="3.5"
            strokeOpacity="0.5"
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
          {/* Tapered V-Line Anime Chin Accent */}
          <path
            d="M22 52 Q34 76 50 88 Q66 76 78 52"
            stroke="#4A2E18"
            strokeWidth="3.2"
            strokeOpacity="0.5"
            strokeLinecap="round"
          />
          <path
            d="M47 88 L50 90 L53 88"
            stroke="#2B1A0E"
            strokeWidth="4"
            strokeOpacity="0.7"
            strokeLinecap="round"
          />
          <circle cx="50" cy="84" r="2" fill="#2B1A0E" fillOpacity="0.6" />
        </svg>
      )}

      {shape === 'diamond' && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 100 100"
          fill="none"
        >
          {/* Sculpted High Cheekbones & Chiseled Taper */}
          <path
            d="M16 46 L24 60 L50 88 L76 60 L84 46"
            stroke="#4A2E18"
            strokeWidth="3"
            strokeOpacity="0.45"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M45 84 L50 88 L55 84"
            stroke="#2B1A0E"
            strokeWidth="3.5"
            strokeOpacity="0.65"
            strokeLinecap="round"
          />
        </svg>
      )}
    </div>
  );
}
