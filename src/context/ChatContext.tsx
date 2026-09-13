import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { RealtimeChannel } from '@supabase/supabase-js';
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
  broadcastBannerUpdate: (username: string, bannerColor: string, bannerText: string) => void;
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
  const realtimeChannelRef = useRef<RealtimeChannel | null>(null);

  // Initialize and run weekly cleanup on boot
  useEffect(() => {
    void cleanOldSupabaseMessages();
  }, []);

  // Supabase Realtime Broadcast WebSocket Subscription (Pushes messages to other users instantly)
  useEffect(() => {
    const ch = supabase.channel('jinssi_chat_room', {
      config: { broadcast: { self: false } },
    });

    ch.on('broadcast', { event: 'chat_message' }, ({ payload }: { payload: ChatMessage }) => {
      if (!payload || !payload.id) return;

      // 1. Save incoming message to local archive
      saveMessageLocally(payload);

      // 2. Append to active message feed if not already present
      setMessages((prev) => {
        if (prev.some((m) => m.id === payload.id)) return prev;
        return [...prev, payload];
      });

      // 3. Increment unread indicator if chat is closed
      setIsOpen((open) => {
        if (!open) {
          setUnreadCount((c) => c + 1);
        }
        return open;
      });
    });

    // Realtime World Sync for profile banners
    ch.on(
      'broadcast',
      { event: 'user_profile_banner_update' },
      ({
        payload,
      }: {
        payload: { username: string; bannerColor?: string; bannerText?: string };
      }) => {
        if (!payload || !payload.username) return;

        const lowerKey = `jinssi_profile_banner_${payload.username.toLowerCase()}`;
        const rawKey = `jinssi_profile_banner_${payload.username}`;
        const bannerData = { color: payload.bannerColor, text: payload.bannerText };
        try {
          localStorage.setItem(lowerKey, JSON.stringify(bannerData));
          localStorage.setItem(rawKey, JSON.stringify(bannerData));
        } catch {
          // ignore
        }

        // Live Realtime World Sync: if viewing this user's profile card, update live
        setActiveProfileUser((prev) => {
          if (!prev) return null;
          if (prev.username.toLowerCase() === payload.username.toLowerCase()) {
            return {
              ...prev,
              bannerColor: payload.bannerColor || prev.bannerColor,
              bannerText:
                payload.bannerText !== undefined ? payload.bannerText : prev.bannerText,
            };
          }
          return prev;
        });
      }
    );

    ch.subscribe((status) => {
      if (status === 'SUBSCRIBED') {
        console.log('Connected to Cozy Realtime Chat WebSocket.');
      }
    });

    realtimeChannelRef.current = ch;

    return () => {
      void supabase.removeChannel(ch);
      realtimeChannelRef.current = null;
    };
  }, []);

  // Poll / Refresh messages
  const refreshMessages = useCallback(async () => {
    const list = await fetchSupabaseMessages(channel, user?.id, activeDmPartner);
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

    const isSenderCreator = Boolean(
      profile.isCreator ||
      profile.email === 'mjhanesultancruz1514@gmail.com' ||
      user?.email === 'mjhanesultancruz1514@gmail.com'
    );

    const cleanSenderName = isSenderCreator
      ? 'Jinssi'
      : (profile.username || 'CozyPlayer').split('@')[0];

    const newMsg: ChatMessage = {
      id: `msg-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`,
      channel,
      senderId: user ? user.id : 'guest-player',
      senderName: cleanSenderName,
      senderAvatar: profile.avatarConfig || {},
      senderIsCreator: isSenderCreator,
      receiverId: channel === 'dm' ? activeDmPartner?.id : undefined,
      receiverName: channel === 'dm' ? activeDmPartner?.username : undefined,
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    // 1. Optimistically add to current user's local message feed
    setMessages((prev) => [...prev, newMsg]);

    // 2. Broadcast via Supabase Realtime WebSocket to all other connected users instantly
    if (realtimeChannelRef.current) {
      void realtimeChannelRef.current.send({
        type: 'broadcast',
        event: 'chat_message',
        payload: newMsg,
      });
    }

    // 3. Send to Supabase database table and persist in local browser archive
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
    // Note: Developer and users do NOT need to be friends to send or reply to DMs!
  };

  const openProfile = (data: Partial<RedditUserProfileData>) => {
    const isTargetCreator = Boolean(
      data.isCreator ||
      data.username?.toLowerCase().includes('jinssi') ||
      data.username?.toLowerCase().includes('mjhane') ||
      data.id === 'jinssi-creator' ||
      data.id === 'creator-jinssi-dev-id'
    );

    const cleanUsername = isTargetCreator
      ? 'Jinssi'
      : (data.username || 'CozyAdventurer').split('@')[0];

    // Load saved banner settings: check localStorage first for the user's custom saved banner
    const lowerKey = `jinssi_profile_banner_${cleanUsername.toLowerCase()}`;
    const rawKey = `jinssi_profile_banner_${cleanUsername}`;
    let savedBannerColor: string | undefined;
    let savedBannerText: string | undefined;

    try {
      const stored = localStorage.getItem(lowerKey) || localStorage.getItem(rawKey);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.color) savedBannerColor = parsed.color;
        if (parsed.text !== undefined) savedBannerText = parsed.text;
      }
    } catch {
      // ignore
    }

    if (!savedBannerColor) savedBannerColor = data.bannerColor;
    if (savedBannerText === undefined) savedBannerText = data.bannerText;

    setActiveProfileUser({
      id: data.id || `user-${cleanUsername}`,
      username: cleanUsername,
      bio: data.bio || (isTargetCreator ? 'Creator & Lead Developer of Jinssi Gaming 🌸' : 'Cozy explorer & reader 🍵'),
      badge: data.badge || (isTargetCreator ? 'Creator & Developer' : 'Cozy Explorer'),
      avatarConfig: data.avatarConfig || {
        seed: cleanUsername,
        hair: isTargetCreator ? 'short02' : 'short01',
        hairColor: '4a312c',
        skinColor: 'f2d3b1',
        faceShape: isTargetCreator ? 'square' : 'oval',
      },
      isCreator: isTargetCreator,
      role: isTargetCreator ? 'developer' : 'member',
      joinedAt: data.joinedAt || new Date().toISOString(),
      bannerColor: savedBannerColor || (isTargetCreator ? 'peach' : 'peach'),
      bannerText: savedBannerText !== undefined && savedBannerText !== null ? savedBannerText : (isTargetCreator ? 'Welcome to Jinssi Gaming! 🌸' : 'Enjoying cozy stories & games 🍵'),
      bannerTheme: data.bannerTheme || (isTargetCreator ? 'sakura' : 'cafe'),
    });
  };

  const closeProfile = () => {
    setActiveProfileUser(null);
  };

  const broadcastBannerUpdate = (username: string, bannerColor: string, bannerText: string) => {
    if (realtimeChannelRef.current) {
      void realtimeChannelRef.current.send({
        type: 'broadcast',
        event: 'user_profile_banner_update',
        payload: {
          username,
          bannerColor,
          bannerText,
        },
      });
    }
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
        broadcastBannerUpdate,
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
