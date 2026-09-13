import React from 'react';
import { AdventurerConfig, getAdventurerAvatarUrl } from '@/types/profile';

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

  return (
    <div
      className={`rounded-full overflow-hidden shrink-0 flex items-center justify-center select-none shadow-xs transition-transform bg-[#FDE8D3] ${
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
        className="w-full h-full object-cover select-none"
        loading="lazy"
        decoding="async"
        referrerPolicy="no-referrer"
      />
    </div>
  );
}
