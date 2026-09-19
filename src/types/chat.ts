import { AdventurerConfig } from '@/types/profile';

export type ChatChannel = 'world' | 'dm';

export interface ChatMessage {
  id: string;
  channel: ChatChannel;
  senderId: string;
  senderName: string;
  senderAvatar: Partial<AdventurerConfig>;
  senderIsCreator?: boolean;
  receiverId?: string;
  receiverName?: string;
  text: string;
  createdAt: string;
}

export interface Friend {
  id: string;
  username: string;
  avatarConfig: Partial<AdventurerConfig>;
  badge: string;
  isOnline: boolean;
  isCreator?: boolean;
  lastSeen?: string;
  addedAt: string;
  bio?: string;
  joinedAt?: string;
  bannerColor?: string;
  bannerText?: string;
  bannerTheme?: string;
  favoriteActivity?: string;
  readingStatus?: string;
}

export interface RedditUserProfileData {
  id: string;
  username: string;
  bio: string;
  badge: string;
  avatarConfig: Partial<AdventurerConfig>;
  isCreator?: boolean;
  role?: string;
  joinedAt: string;
  bannerColor?: string;
  bannerText?: string;
  bannerTheme?: string;
  favoriteActivity?: string;
  readingStatus?: string;
  startInEditMode?: boolean;
}
