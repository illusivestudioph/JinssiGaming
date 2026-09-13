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

  // Physical Facial Proportions & Morph Transformation
  // (Directly morphs face width, jawline taper, and cheek fullness without drawing artificial lines)
  const faceTransformStyle = {
    oval: {
      transform: 'scale(1)',
      transformOrigin: 'center 45%',
    },
    round: {
      // Widens cheeks & softens jaw for an authentic rounded face
      transform: 'scaleX(1.18) scaleY(0.92)',
      transformOrigin: 'center 45%',
    },
    square: {
      // 3D perspective tilt expands the jawline and squares off lower face
      transform: 'perspective(280px) rotateX(-18deg) scaleX(1.12) scaleY(1.06)',
      transformOrigin: 'center 38%',
    },
    heart: {
      // Tapers lower jaw into a pointed anime V-line chin while keeping eyes/forehead open
      transform: 'perspective(280px) rotateX(16deg) scaleX(0.96) scaleY(1.06) translateY(-2%)',
      transformOrigin: 'center 50%',
    },
    diamond: {
      // High sculpted cheekbones with tapered chin
      transform: 'perspective(320px) rotateX(8deg) scaleX(1.12) scaleY(1.04)',
      transformOrigin: 'center 45%',
    },
  }[shape];

  // Silhouette framing border radius for container
  const shapeRadiusClass = {
    oval: 'rounded-full',
    round: 'rounded-full ring-2 ring-amber-700/15',
    square: 'rounded-[26px] ring-2 ring-amber-800/25',
    heart: 'rounded-t-full rounded-b-[38%] ring-2 ring-rose-700/20',
    diamond: 'rounded-[36%_36%_46%_46%] ring-2 ring-indigo-900/15',
  }[shape];

  // Remove any conflicting hardcoded rounded-* from caller's className so shapeRadiusClass takes effect
  const cleanedClassName = className.replace(/rounded-(full|2xl|xl|lg|md|sm)/g, '').trim();

  return (
    <div
      className={`relative overflow-hidden shrink-0 flex items-center justify-center select-none shadow-xs transition-all bg-[#FDE8D3] ${shapeRadiusClass} ${
        showBorder ? 'border-2 border-[#F5C6A0] dark:border-stone-700' : ''
      } ${cleanedClassName}`}
      style={{
        width: size,
        height: size,
      }}
    >
      <img
        src={avatarUrl}
        alt="Cozy Adventurer Avatar"
        className="w-full h-full object-cover select-none transition-transform duration-200"
        style={faceTransformStyle}
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
