export interface AdventurerConfig {
  seed: string;
  skinColor: string;
  hair: string;
  hairColor: string;
  eyes: string;
  mouth: string;
  glasses: string;
  features: string;
  backgroundColor: string;
  useGooglePhoto?: boolean;
  googleAvatarUrl?: string;
}

export type CommunityBadge =
  | 'Cozy Explorer'
  | 'Bookworm'
  | 'Retro Gamer'
  | 'Cafe Regular'
  | 'Midnight Scholar'
  | 'Tea Brewer';

export interface UserProfile {
  id: string;
  email?: string;
  username: string;
  bio: string;
  badge: CommunityBadge;
  avatarConfig: AdventurerConfig;
  joinedAt: string;
}

export const DEFAULT_AVATAR_CONFIG: AdventurerConfig = {
  seed: 'CozyPlayer',
  skinColor: 'f2d3b1',
  hair: 'short01',
  hairColor: '4a312c',
  eyes: 'variant01',
  mouth: 'variant01',
  glasses: 'none',
  features: 'blush',
  backgroundColor: 'ffd7b5',
  useGooglePhoto: false,
};

export const DEFAULT_PROFILE: Omit<UserProfile, 'id'> = {
  username: 'CozyPlayer',
  bio: 'Sipping warm tea & exploring cozy adventures 🍵',
  badge: 'Cozy Explorer',
  avatarConfig: DEFAULT_AVATAR_CONFIG,
  joinedAt: new Date().toISOString(),
};

export function getAdventurerAvatarUrl(config?: Partial<AdventurerConfig>): string {
  if (!config) return `https://api.dicebear.com/9.x/adventurer/svg?seed=CozyPlayer&backgroundColor=ffd7b5`;

  if (config.useGooglePhoto && config.googleAvatarUrl) {
    return config.googleAvatarUrl;
  }

  const params = new URLSearchParams();
  params.set('seed', config.seed || 'CozyPlayer');
  params.set('skinColor', config.skinColor || 'f2d3b1');
  params.set('hair', config.hair || 'short01');
  params.set('hairColor', config.hairColor || '4a312c');
  params.set('eyes', config.eyes || 'variant01');
  params.set('mouth', config.mouth || 'variant01');
  params.set('backgroundColor', config.backgroundColor || 'ffd7b5');

  if (config.glasses && config.glasses !== 'none') {
    params.set('glasses', config.glasses);
    params.set('glassesProbability', '100');
  } else {
    params.set('glassesProbability', '0');
  }

  if (config.features && config.features !== 'none') {
    params.set('features', config.features);
    params.set('featuresProbability', '100');
  } else {
    params.set('featuresProbability', '0');
  }

  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}
