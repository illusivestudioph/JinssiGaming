export type FaceShape = 'oval' | 'round' | 'square' | 'heart';

export interface AdventurerConfig {
  seed: string;
  gender?: 'male' | 'female' | 'neutral';
  faceShape?: FaceShape;
  skinColor: string;
  hair: string;
  hairColor: string;
  eyebrows?: string;
  eyes: string;
  mouth: string;
  glasses: string;
  features: string;
  earrings?: string;
  backgroundColor: string;
  useGooglePhoto?: boolean;
  googleAvatarUrl?: string;
}

export const CREATOR_EMAIL = 'mjhanesultancruz1514@gmail.com';

export function isCreatorEmail(email?: string | null): boolean {
  if (!email) return false;
  return email.trim().toLowerCase() === CREATOR_EMAIL.toLowerCase();
}

export type CommunityBadge =
  | 'Creator & Developer'
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
  isCreator?: boolean;
  role?: 'developer' | 'member';
  bannerColor?: string;
  bannerText?: string;
}

export const DEFAULT_AVATAR_CONFIG: AdventurerConfig = {
  seed: 'CozyPlayer',
  gender: 'neutral',
  faceShape: 'oval',
  skinColor: 'f2d3b1',
  hair: 'short01',
  hairColor: '4a312c',
  eyebrows: 'variant02',
  eyes: 'variant01',
  mouth: 'variant01',
  glasses: 'none',
  features: 'none',
  earrings: 'none',
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

const VALID_ADVENTURER_HAIRSTYLES = new Set([
  'short01', 'short02', 'short03', 'short04', 'short05', 'short06', 'short07', 'short08', 'short09',
  'short10', 'short11', 'short12', 'short13', 'short14', 'short15', 'short16', 'short17', 'short18', 'short19',
  'long01', 'long02', 'long03', 'long04', 'long05', 'long06', 'long07', 'long08', 'long09', 'long10', 'long11', 'long12',
]);

export function getAdventurerAvatarUrl(config?: Partial<AdventurerConfig>): string {
  if (!config) return `https://api.dicebear.com/9.x/adventurer/svg?seed=CozyPlayer&backgroundColor=ffd7b5`;

  if (config.useGooglePhoto && config.googleAvatarUrl) {
    return config.googleAvatarUrl;
  }

  const params = new URLSearchParams();
  params.set('seed', config.seed || 'CozyPlayer');
  params.set('skinColor', (config.skinColor || 'f2d3b1').replace('#', ''));

  if (config.hair === 'none' || config.hair === 'bald') {
    params.set('hairProbability', '0');
  } else if (config.hair && VALID_ADVENTURER_HAIRSTYLES.has(config.hair)) {
    params.set('hair', config.hair);
    params.set('hairProbability', '100');
  } else {
    // If not specified or unrecognized, let the seed determine a valid hairstyle naturally
    params.set('hairProbability', '100');
  }

  if (config.hairColor) {
    params.set('hairColor', config.hairColor.replace('#', ''));
  }

  if (config.eyebrows && config.eyebrows !== 'none') {
    params.set('eyebrows', config.eyebrows);
  } else {
    params.set('eyebrows', 'variant02');
  }

  if (config.eyes) {
    params.set('eyes', config.eyes);
  }
  if (config.mouth) {
    params.set('mouth', config.mouth);
  }
  if (config.backgroundColor) {
    params.set('backgroundColor', config.backgroundColor.replace('#', ''));
  }

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

  if (config.earrings && config.earrings !== 'none') {
    params.set('earrings', config.earrings);
    params.set('earringsProbability', '100');
  } else {
    params.set('earringsProbability', '0');
  }

  return `https://api.dicebear.com/9.x/adventurer/svg?${params.toString()}`;
}
