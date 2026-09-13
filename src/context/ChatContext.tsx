import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ChatMessage, ChatChannel, Friend, RedditUserProfileData } from '@/types/chat';
import {
  getLocalMessages,
  saveMessageLocally,
  fetchSupabaseMessages,
  sendChatMessage,
  cleanOldSupabaseMessages,
  getStoredFriends,
  saveStoredFriends,
} from '@/utils/chatStorage';

interface ChatContextType {
  messages: ChatMessage[];
  channel: ChatChannel;
  setChannel: (channel: ChatChannel) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  activeDmPartner: Friend | null;
  setActiveDmPartner: (partner: Friend | null) => void;
  friends: Friend[];
  addFriend: (friend: Omit<Friend, 'addedAt'>) => void;
  removeFriend: (id: string) => void;
  isFriend: (usernameOrId: string) => boolean;
  sendMessage: (text: string) => Promise<void>;
  openDmWith: (partner: Friend) => void;
  activeProfileUser: RedditUserProfileData | null;
  openProfile: (userData: Partial<RedditUserProfileData>) => void;
  closeProfile: () => void;
  unreadCount: number;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { user, profile } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [channel, setChannel] = useState<ChatChannel>('world');
  const [activeDmPartner, setActiveDmPartner] = useState<Friend | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>(() => getLocalMessages('world'));
  const [friends, setFriends] = useState<Friend[]>(() => getStoredFriends());
  const [unreadCount, setUnreadCount] = useState(0);
  const [activeProfileUser, setActiveProfileUser] = useState<RedditUserProfileData | null>(null);

  // Initialize and run weekly cleanup on boot
  useEffect(() => {
    void cleanOldSupabaseMessages();
  }, []);

  // Poll / Refresh messages
  const refreshMessages = useCallback(async () => {
    const currentPartnerId = channel === 'dm' ? activeDmPartner?.id : undefined;
    const list = await fetchSupabaseMessages(channel, user?.id, currentPartnerId);
    setMessages(list);
  }, [channel, activeDmPartner, user]);

  useEffect(() => {
    void refreshMessages();
    const timer = setInterval(() => {
      void refreshMessages();
    }, 5000);
    return () => clearInterval(timer);
  }, [refreshMessages]);

  // Send message
  const sendMessage = async (text: string) => {
    if (!text.trim()) return;

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      channel,
      senderId: user ? user.id : 'guest-player',
      senderName: profile.username || 'CozyPlayer',
      senderAvatar: profile.avatarConfig || {},
      senderIsCreator: Boolean(profile.isCreator),
      receiverId: channel === 'dm' ? activeDmPartner?.id : undefined,
      receiverName: channel === 'dm' ? activeDmPartner?.username : undefined,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    // Optimistically add to messages
    setMessages((prev) => [...prev, newMsg]);

    // Send to Supabase and persist locally
    await sendChatMessage(newMsg);
  };

  // Add friend
  const addFriend = (newFriend: Omit<Friend, 'addedAt'>) => {
    setFriends((prev) => {
      if (prev.some((f) => f.id === newFriend.id || f.username.toLowerCase() === newFriend.username.toLowerCase())) {
        return prev;
      }
      const updated = [...prev, { ...newFriend, addedAt: new Date().toISOString() }];
      saveStoredFriends(updated);
      return updated;
    });
  };

  // Remove friend
  const removeFriend = (id: string) => {
    setFriends((prev) => {
      const updated = prev.filter((f) => f.id !== id);
      saveStoredFriends(updated);
      return updated;
    });
  };

  const isFriend = (usernameOrId: string): boolean => {
    return friends.some(
      (f) =>
        f.id === usernameOrId ||
        f.username.toLowerCase() === usernameOrId.toLowerCase().replace('@', '').replace('u/', '')
    );
  };

  const openDmWith = (partner: Friend) => {
    setActiveDmPartner(partner);
    setChannel('dm');
    setIsOpen(true);
    // Auto add to friends if not yet added
    if (!isFriend(partner.id)) {
      addFriend(partner);
    }
  };

  const openProfile = (data: Partial<RedditUserProfileData>) => {
    const isTargetCreator =
      data.isCreator ||
      data.username?.toLowerCase().includes('jinssi') ||
      data.id === 'jinssi-creator';

    setActiveProfileUser({
      id: data.id || `user-${data.username || 'player'}`,
      username: data.username || 'CozyAdventurer',
      bio: data.bio || (isTargetCreator ? 'Creator & Lead Developer of Jinssi Gaming 🌸' : 'Cozy explorer & reader 🍵'),
      badge: data.badge || (isTargetCreator ? 'Creator & Developer' : 'Cozy Explorer'),
      avatarConfig: data.avatarConfig || {
        seed: data.username || 'Adventurer',
        hair: isTargetCreator ? 'short02' : 'short01',
        hairColor: '4a312c',
        skinColor: 'f2d3b1',
        faceShape: isTargetCreator ? 'square' : 'oval',
      },
      isCreator: isTargetCreator,
      role: isTargetCreator ? 'developer' : 'member',
      joinedAt: data.joinedAt || new Date(Date.now() - 30 * 24 * 3600 * 1000).toISOString(),
      karma: isTargetCreator ? 1514 : Math.floor(Math.random() * 400 + 42),
      bannerTheme: data.bannerTheme || (isTargetCreator ? 'sakura' : 'cafe'),
    });
  };

  const closeProfile = () => {
    setActiveProfileUser(null);
  };

  return (
    <ChatContext.Provider
      value={{
        messages,
        channel,
        setChannel,
        isOpen,
        setIsOpen,
        activeDmPartner,
        setActiveDmPartner,
        friends,
        addFriend,
        removeFriend,
        isFriend,
        sendMessage,
        openDmWith,
        activeProfileUser,
        openProfile,
        closeProfile,
        unreadCount,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat must be used within a ChatProvider');
  }
  return context;
}
