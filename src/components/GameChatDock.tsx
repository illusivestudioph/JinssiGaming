import React, { useState, useRef, useEffect, useMemo } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { isDmForPartner } from '@/utils/chatStorage';
import { Friend } from '@/types/chat';
import {
  StreamlineClose,
  StreamlinePencil,
  StreamlineStars,
  StreamlineUsers,
  StreamlineCheck,
  StreamlineCalendar,
  StreamlineMessageSquare,
  StreamlineUserPlus,
  StreamlineUserCheck,
  StreamlineSearch,
  StreamlineUser,
} from '@/components/StreamlineIcons';

export function GameChatDock() {
  const {
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
    openProfile,
    openDmWith,
  } = useChat();

  const { user, profile, triggerAuthPrompt } = useAuth();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [viewMode, setViewMode] = useState<'chat' | 'users'>('chat');
  const [userSearch, setUserSearch] = useState('');
  const [userFilter, setUserFilter] = useState<'all' | 'friends'>('all');
  const [actionFeedback, setActionFeedback] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-dismiss quick action feedback toast
  useEffect(() => {
    if (actionFeedback) {
      const timer = setTimeout(() => setActionFeedback(null), 2400);
      return () => clearTimeout(timer);
    }
  }, [actionFeedback]);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to join the chat and message travelers.');
      return;
    }
    if (!inputText.trim()) return;

    setIsSending(true);
    try {
      await sendMessage(inputText);
      setInputText('');
    } finally {
      setIsSending(false);
    }
  };

  // Filter messages reliably using isDmForPartner (works across aliases and creator auth IDs)
  const currentChannelMessages = messages.filter((m) => {
    if (channel === 'world') return m.channel === 'world';
    if (activeDmPartner) {
      return isDmForPartner(m, activeDmPartner);
    }
    return m.channel === 'dm';
  });

  // Dynamically compute all travelers with active conversation history (no friend-adding required)
  const recentDmPartners = useMemo(() => {
    const map = new Map<string, Friend>();

    // Add friends first
    friends.forEach((f) => {
      const key = f.username.toLowerCase().replace(/^[@u/]+/, '');
      map.set(key, f);
    });

    // Extract all travelers who have exchanged DMs with the user
    messages.forEach((m) => {
      if (m.channel === 'dm') {
        const isSenderMe =
          m.senderId === user?.id ||
          (profile.isCreator && (m.senderIsCreator || m.senderName.toLowerCase() === 'jinssi'));

        const otherId = isSenderMe ? (m.receiverId || 'traveler') : m.senderId;
        const otherRaw = isSenderMe ? (m.receiverName || 'Traveler') : m.senderName;
        const otherKey = otherRaw.toLowerCase().replace(/^[@u/]+/, '');
        const isOtherDev =
          otherKey === 'jinssi' ||
          otherKey.includes('mjhane') ||
          otherId === 'jinssi-creator' ||
          otherId === 'creator-jinssi-dev-id';

        const cleanOtherName = isOtherDev ? 'Jinssi' : otherRaw.split('@')[0];

        if (otherKey && !map.has(otherKey) && cleanOtherName.toLowerCase() !== profile.username.toLowerCase()) {
          map.set(otherKey, {
            id: otherId,
            username: cleanOtherName,
            avatarConfig: isSenderMe ? {} : m.senderAvatar,
            badge: isOtherDev ? 'Creator & Developer' : 'Cozy Explorer',
            isOnline: true,
            isCreator: isOtherDev,
            addedAt: m.createdAt,
          });
        }
      }
    });

    return Array.from(map.values());
  }, [messages, friends, user?.id, profile.isCreator, profile.username]);

  // Comprehensive active online travelers roster
  const onlineTravelers = useMemo(() => {
    const map = new Map<string, Friend>();

    // 1. Creator Jinssi (Always online at the top of the adventurer guild)
    map.set('jinssi', {
      id: 'jinssi-creator',
      username: 'Jinssi',
      avatarConfig: { seed: 'Jinssi', ears: 'cat' },
      badge: 'Creator & Developer',
      isOnline: true,
      isCreator: true,
      addedAt: new Date().toISOString(),
    });

    // 2. Current User (if logged in)
    if (user && profile.username) {
      const myKey = profile.username.toLowerCase().replace(/^[@u/]+/, '');
      if (myKey && !map.has(myKey)) {
        map.set(myKey, {
          id: user.id,
          username: profile.username,
          avatarConfig: profile.avatarConfig,
          badge: profile.badge,
          isOnline: true,
          isCreator: profile.isCreator,
          addedAt: new Date().toISOString(),
        });
      }
    }

    // 3. Friends
    friends.forEach((f) => {
      const key = f.username.toLowerCase().replace(/^[@u/]+/, '');
      if (!map.has(key)) {
        map.set(key, { ...f, isOnline: true });
      }
    });

    // 4. Users from chat messages
    messages.forEach((m) => {
      const isSenderCreator = Boolean(
        m.senderIsCreator ||
        m.senderName.toLowerCase().includes('jinssi') ||
        m.senderName.toLowerCase().includes('mjhane')
      );
      const cleanName = isSenderCreator ? 'Jinssi' : m.senderName.split('@')[0];
      const key = cleanName.toLowerCase().replace(/^[@u/]+/, '');

      if (key && !map.has(key)) {
        map.set(key, {
          id: m.senderId,
          username: cleanName,
          avatarConfig: m.senderAvatar || { seed: cleanName },
          badge: isSenderCreator ? 'Creator & Developer' : 'Cozy Explorer',
          isOnline: true,
          isCreator: isSenderCreator,
          addedAt: m.createdAt,
        });
      }
    });

    // 5. Cozy community default regulars (20 believable community travelers)
    const cozyDefaults: Friend[] = [
      {
        id: 'npc-mochicat',
        username: 'MochiCat',
        avatarConfig: { seed: 'MochiCat', faceShape: 'round', hair: 'long04', hairColor: '4a312c' },
        badge: 'Cafe Regular',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
        bio: 'Cat mom, pastry lover, and visual novel enthusiast. Say hi! 🐾',
        bannerColor: 'sakura',
        bannerText: 'Baking strawberry treats & cat cafe management 🍰🐾',
        favoriteActivity: 'Baking Sims & VNs',
        readingStatus: 'Chapter 14 in Sweet Cafe',
        joinedAt: '2024-11-12T14:20:00.000Z',
      },
      {
        id: 'npc-matchaknight',
        username: 'MatchaKnight',
        avatarConfig: { seed: 'MatchaKnight', faceShape: 'square', hair: 'short02', hairColor: '2c1b18' },
        badge: 'Tea Brewer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
        bio: 'Passionate about tea ceremonies, zelda-like puzzles, and cozy rain.',
        bannerColor: 'matcha',
        bannerText: 'Brewing ceremonial matcha & exploring peaceful realms 🍵✨',
        favoriteActivity: 'Puzzle Adventures',
        readingStatus: 'The Way of Tea',
        joinedAt: '2025-02-18T09:15:00.000Z',
      },
      {
        id: 'npc-pixelbard',
        username: 'PixelBard',
        avatarConfig: { seed: 'PixelBard', faceShape: 'oval', hair: 'long01', hairColor: '9287ff' },
        badge: 'Retro Gamer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 36).toISOString(),
        bio: 'Sound designer & 90s JRPG archivist. Chrono Trigger forever.',
        bannerColor: 'lavender',
        bannerText: 'Composing 16-bit chiptunes & hunting retro secrets 🎵👾',
        favoriteActivity: 'SNES Classics',
        readingStatus: 'Lore of Guardia',
        joinedAt: '2024-08-04T18:40:00.000Z',
      },
      {
        id: 'npc-stardewsam',
        username: 'StardewSam',
        avatarConfig: { seed: 'StardewSam', faceShape: 'oval', hair: 'short04', hairColor: 'd6b370' },
        badge: 'Cozy Explorer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
        bio: 'Min-maxing ancient fruit crops by day, listening to lofi by night.',
        bannerColor: 'honey',
        bannerText: 'Year 5 on the farm • Blueberry wine master 🍓🚜',
        favoriteActivity: 'Farming Sims',
        readingStatus: 'Pelican Town Almanac',
        joinedAt: '2025-01-20T11:05:00.000Z',
      },
      {
        id: 'npc-lunafable',
        username: 'LunaFable',
        avatarConfig: { seed: 'LunaFable', faceShape: 'heart', hair: 'long02', hairColor: '2c1b18' },
        badge: 'Midnight Scholar',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
        bio: 'Mythology buff, astrology nerd, and collector of indie fantasy tales.',
        bannerColor: 'lavender',
        bannerText: 'Reading ancient folklore under starlit skies 🌙📖',
        favoriteActivity: 'Mythology RPGs',
        readingStatus: 'Celestial Chronicles Vol. 3',
        joinedAt: '2025-03-09T22:30:00.000Z',
      },
      {
        id: 'npc-cinnamonbun',
        username: 'CinnamonBun',
        avatarConfig: { seed: 'CinnamonBun', faceShape: 'round', hair: 'long07', hairColor: 'e5a075' },
        badge: 'Cafe Regular',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
        bio: 'Cozy lifestyle creator. Collecting animal crossing villagers.',
        bannerColor: 'peach',
        bannerText: 'Fresh cinnamon rolls & warm cozy blankets 🥐☕',
        favoriteActivity: 'Island Decorating',
        readingStatus: 'Cozy Home Baking',
        joinedAt: '2025-04-14T16:12:00.000Z',
      },
      {
        id: 'npc-fernwhisperer',
        username: 'FernWhisperer',
        avatarConfig: { seed: 'FernWhisperer', faceShape: 'oval', hair: 'long09', hairColor: '85c446' },
        badge: 'Cozy Explorer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 15).toISOString(),
        bio: 'Botany enthusiast enjoying nature sim games and forest foraging.',
        bannerColor: 'matcha',
        bannerText: 'Plant whisperer • Greenhouse & terrarium curator 🌿🪴',
        favoriteActivity: 'Forest Foraging',
        readingStatus: 'Encyclopedia of Herbs',
        joinedAt: '2024-09-28T07:45:00.000Z',
      },
      {
        id: 'npc-chronotrigger99',
        username: 'ChronoTrigger99',
        avatarConfig: { seed: 'ChronoTrigger99', faceShape: 'square', hair: 'short05', hairColor: '4a312c' },
        badge: 'Retro Gamer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 30).toISOString(),
        bio: 'Pixel art fanatic and veteran turn-based combat tactician.',
        bannerColor: 'espresso',
        bannerText: 'Lavos defeated 13 times • Time travel speedruns ⏳⚔️',
        favoriteActivity: 'JRPG Speedruns',
        readingStatus: 'Epoch Flight Manual',
        joinedAt: '2024-06-19T13:00:00.000Z',
      },
      {
        id: 'npc-bobbabarista',
        username: 'BobbaBarista',
        avatarConfig: { seed: 'BobbaBarista', faceShape: 'round', hair: 'short06', hairColor: '4a312c' },
        badge: 'Tea Brewer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
        bio: 'Part-time barista, full-time cafe management game speedrunner.',
        bannerColor: 'honey',
        bannerText: 'Taro milk tea with extra brown sugar boba 🧋✨',
        favoriteActivity: 'Coffee Talk',
        readingStatus: 'Tea Master Guides',
        joinedAt: '2025-05-02T15:20:00.000Z',
      },
      {
        id: 'npc-willowgrove',
        username: 'WillowGrove',
        avatarConfig: { seed: 'WillowGrove', faceShape: 'oval', hair: 'long03', hairColor: '85c446' },
        badge: 'Bookworm',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 22).toISOString(),
        bio: 'Librarian at heart. Loves rich worldbuilding and emotional narratives.',
        bannerColor: 'matcha',
        bannerText: 'Lost in the mossy pages of fantasy epics 🍃📚',
        favoriteActivity: 'Narrative Adventures',
        readingStatus: 'The Forgotten Forest',
        joinedAt: '2024-12-01T10:10:00.000Z',
      },
      {
        id: 'npc-kitsunesip',
        username: 'KitsuneSip',
        avatarConfig: { seed: 'KitsuneSip', faceShape: 'heart', hair: 'long10', hairColor: 'f59797' },
        badge: 'Cafe Regular',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
        bio: 'Japanese folklore enthusiast and cozy indie game streamer.',
        bannerColor: 'sakura',
        bannerText: 'Fox shrine guardian sipping iced hojicha 🦊🌸',
        favoriteActivity: 'Okami & Spiritfarer',
        readingStatus: 'Shrine Spirit Legends',
        joinedAt: '2025-02-27T19:50:00.000Z',
      },
      {
        id: 'npc-astraea',
        username: 'Astraea',
        avatarConfig: { seed: 'Astraea', faceShape: 'heart', hair: 'long11', hairColor: '9287ff' },
        badge: 'Midnight Scholar',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
        bio: 'Night owl studying astrophysics and playing astronomy sims.',
        bannerColor: 'lavender',
        bannerText: 'Stargazing, constellation mapping & space chill vibes 🔭🌌',
        favoriteActivity: 'Space Exploration',
        readingStatus: 'Star Atlas 2026',
        joinedAt: '2024-10-15T02:15:00.000Z',
      },
      {
        id: 'npc-honeymead',
        username: 'HoneyMead',
        avatarConfig: { seed: 'HoneyMead', faceShape: 'round', hair: 'short09', hairColor: 'd6b370' },
        badge: 'Tea Brewer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
        bio: 'Beekeeper and cozy gaming streamer. Always sweet vibes.',
        bannerColor: 'honey',
        bannerText: 'Artisanal honey brewing & cozy cottagecore life 🍯🐝',
        favoriteActivity: 'Beekeeping Sims',
        readingStatus: 'The Hive Almanac',
        joinedAt: '2025-03-22T12:00:00.000Z',
      },
      {
        id: 'npc-cozygamersteph',
        username: 'CozyGamerSteph',
        avatarConfig: { seed: 'CozyGamerSteph', faceShape: 'oval', hair: 'long06', hairColor: 'e5a075' },
        badge: 'Cozy Explorer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 11).toISOString(),
        bio: 'Reviewing relaxing games that soothe the mind. Spread kindness!',
        bannerColor: 'peach',
        bannerText: 'Cozy Nintendo Switch gaming & candlelit evenings 🕯️🎮',
        favoriteActivity: 'Cozy Reviews',
        readingStatus: 'Indie Game Digest',
        joinedAt: '2025-01-08T17:35:00.000Z',
      },
      {
        id: 'npc-bookishbramble',
        username: 'BookishBramble',
        avatarConfig: { seed: 'BookishBramble', faceShape: 'square', hair: 'short01', hairColor: '2c1b18' },
        badge: 'Bookworm',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
        bio: 'Gothic mystery novel fan and point-and-click detective gamer.',
        bannerColor: 'espresso',
        bannerText: 'Annotating paperbacks with cup of dark roast ☕📖',
        favoriteActivity: 'Mystery Solving',
        readingStatus: 'The Manor Riddle',
        joinedAt: '2024-07-29T14:40:00.000Z',
      },
      {
        id: 'npc-nekonook',
        username: 'NekoNook',
        avatarConfig: { seed: 'NekoNook', faceShape: 'round', hair: 'long12', hairColor: 'f59797' },
        badge: 'Cafe Regular',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 7).toISOString(),
        bio: 'Cozy cat rescuer. Finding all hidden cats in cozy games.',
        bannerColor: 'sakura',
        bannerText: 'Paws, purrs, and warm vanilla lattes 🐾🧁',
        favoriteActivity: 'Cat Cafe Manager',
        readingStatus: 'Cats of Kyoto',
        joinedAt: '2025-04-03T11:25:00.000Z',
      },
      {
        id: 'npc-dungeonbaker',
        username: 'DungeonBaker',
        avatarConfig: { seed: 'DungeonBaker', faceShape: 'oval', hair: 'short11', hairColor: '4a312c' },
        badge: 'Retro Gamer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 33).toISOString(),
        bio: 'Dungeon crawler by night, sourdough baker by morning.',
        bannerColor: 'honey',
        bannerText: 'Baking sourdough bread in ancient dungeon ruins 🥖🏰',
        favoriteActivity: 'Roguelite Cooking',
        readingStatus: 'Dungeon Recipes',
        joinedAt: '2024-09-14T08:15:00.000Z',
      },
      {
        id: 'npc-chailover',
        username: 'ChaiLover',
        avatarConfig: { seed: 'ChaiLover', faceShape: 'round', hair: 'long05', hairColor: '4a312c' },
        badge: 'Tea Brewer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 9).toISOString(),
        bio: 'Warm drinks and slow-paced puzzle games are my therapy.',
        bannerColor: 'espresso',
        bannerText: 'Spiced masala chai with cardamom & cinnamon ☕🍂',
        favoriteActivity: 'Slow Puzzlers',
        readingStatus: 'Spice Roads & Tea',
        joinedAt: '2025-02-11T13:45:00.000Z',
      },
      {
        id: 'npc-quietquill',
        username: 'QuietQuill',
        avatarConfig: { seed: 'QuietQuill', faceShape: 'oval', hair: 'short13', hairColor: '2c1b18' },
        badge: 'Bookworm',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 50).toISOString(),
        bio: 'Calligrapher, poet, and lover of atmospheric storybook games.',
        bannerColor: 'matcha',
        bannerText: 'Writing cozy poetry on vintage parchment 📜✒️',
        favoriteActivity: 'Storybook RPGs',
        readingStatus: 'Poems of the Valley',
        joinedAt: '2024-11-30T16:00:00.000Z',
      },
      {
        id: 'npc-mapleleaves',
        username: 'MapleLeaves',
        avatarConfig: { seed: 'MapleLeaves', faceShape: 'round', hair: 'long08', hairColor: 'e5a075' },
        badge: 'Cozy Explorer',
        isOnline: true,
        addedAt: new Date(Date.now() - 1000 * 60 * 60 * 16).toISOString(),
        bio: 'Collecting colorful autumn leaves and relaxing with campfire sims.',
        bannerColor: 'peach',
        bannerText: 'Autumn walks through golden maple canopies 🍁🍂',
        favoriteActivity: 'Nature Walks',
        readingStatus: 'Autumn Memories',
        joinedAt: '2025-03-17T10:30:00.000Z',
      },
    ];

    cozyDefaults.forEach((npc) => {
      const key = npc.username.toLowerCase();
      if (!map.has(key)) {
        map.set(key, npc);
      }
    });

    return Array.from(map.values());
  }, [messages, friends, user, profile]);

  const filteredTravelers = useMemo(() => {
    return onlineTravelers.filter((t) => {
      const matchesSearch =
        t.username.toLowerCase().includes(userSearch.toLowerCase()) ||
        t.badge.toLowerCase().includes(userSearch.toLowerCase());

      if (!matchesSearch) return false;
      if (userFilter === 'friends') {
        return isFriend(t.username) || isFriend(t.id);
      }
      return true;
    });
  }, [onlineTravelers, userSearch, userFilter, isFriend]);

  const handleQuickAddFriend = (traveler: Omit<Friend, 'addedAt'> | Friend) => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to add friends and sync your buddy list.');
      return;
    }
    const alreadyFriend = isFriend(traveler.username) || isFriend(traveler.id);
    if (alreadyFriend) {
      removeFriend(traveler.id);
      setActionFeedback(`Removed @${traveler.username} from friends`);
    } else {
      addFriend(traveler);
      setActionFeedback(`Added @${traveler.username} to your friends! 🌸`);
    }
  };

  const handleQuickChat = (traveler: Omit<Friend, 'addedAt'> | Friend) => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to direct message travelers.');
      return;
    }
    openDmWith(traveler);
    setViewMode('chat');
  };

  return (
    <div className="fixed bottom-4 right-4 z-40 select-none font-sans">
      {/* MINIMIZED COZY FLOATING BUTTON */}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="px-4 py-2.5 rounded-2xl shadow-xl flex items-center gap-3 border-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--card-bg, #fefcf7)',
            borderColor: 'var(--theme-accent, #fd9a4d)',
            color: 'var(--text-main, #3a2e22)',
          }}
        >
          <div className="relative flex items-center">
            <div
              className="w-8 h-8 rounded-xl flex items-center justify-center text-white shadow-xs"
              style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
            >
              <StreamlinePencil className="w-4 h-4" />
            </div>
            {/* Online Ping Indicator */}
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 border border-white" />
            </span>
          </div>

          <div className="text-left">
            <div className="text-xs font-bold font-display leading-tight">Cozy Game Chat</div>
            <div className="text-[10px] text-tan-500 font-semibold">World & DMs Active</div>
          </div>
        </button>
      )}

      {/* EXPANDED GAME CHAT WINDOW */}
      {isOpen && (
        <div
          className="w-[92vw] sm:w-96 rounded-3xl shadow-2xl border-2 flex flex-col h-[480px] sm:h-[520px] overflow-hidden animate-fade-in"
          style={{
            backgroundColor: 'var(--card-bg, #fefcf7)',
            borderColor: 'var(--card-border, #5e5148)',
          }}
        >
          {/* Action Feedback Toast */}
          {actionFeedback && (
            <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 px-3.5 py-1.5 rounded-full bg-ink-900/90 text-white text-[11px] font-bold shadow-lg backdrop-blur-xs animate-fade-in flex items-center gap-1.5 pointer-events-none">
              <StreamlineStars className="w-3.5 h-3.5 text-amber-300" />
              <span>{actionFeedback}</span>
            </div>
          )}

          {/* Top MMO-Style Header & Channel / User Tabs */}
          <div
            className="p-3 border-b flex items-center justify-between gap-2"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            {/* Channel / View Toggles */}
            <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-tan-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setViewMode('chat');
                  setChannel('world');
                  setActiveDmPartner(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  viewMode === 'chat' && channel === 'world'
                    ? 'bg-[#FD9A4D] text-white shadow-xs'
                    : 'text-tan-600 hover:bg-tan-50'
                }`}
              >
                World
              </button>

              <button
                type="button"
                onClick={() => {
                  setViewMode('chat');
                  setChannel('dm');
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'chat' && channel === 'dm'
                    ? 'bg-[#FD9A4D] text-white shadow-xs'
                    : 'text-tan-600 hover:bg-tan-50'
                }`}
              >
                <span>DMs</span>
                {activeDmPartner && (
                  <span className="text-[10px] opacity-90 truncate max-w-[50px]">
                    @{activeDmPartner.username}
                  </span>
                )}
              </button>

              <button
                type="button"
                onClick={() => setViewMode('users')}
                className={`px-2 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  viewMode === 'users'
                    ? 'bg-[#FD9A4D] text-white shadow-xs'
                    : 'text-tan-600 hover:bg-tan-50'
                }`}
                title="Online Travelers List"
              >
                <StreamlineUsers className="w-3.5 h-3.5" />
                <span>Users</span>
                <span
                  className={`text-[9px] px-1 py-0.2 rounded-full font-extrabold ${
                    viewMode === 'users'
                      ? 'bg-white/30 text-white'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {onlineTravelers.length}
                </span>
              </button>
            </div>

            {/* Minimize / Close */}
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="p-1.5 rounded-full hover:bg-tan-200/50 transition-colors text-tan-600 cursor-pointer"
              title="Minimize chat"
            >
              <StreamlineClose className="w-4 h-4" />
            </button>
          </div>

          {/* VIEW 1: ONLINE USERS LIST */}
          {viewMode === 'users' ? (
            <div className="flex-1 flex flex-col overflow-hidden bg-[#FEFCF7]">
              {/* Search & Filter Bar */}
              <div className="p-3 border-b border-tan-200/80 bg-[#FCF8EE] flex flex-col gap-2">
                <div className="relative">
                  <StreamlineSearch className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-tan-400" />
                  <input
                    type="text"
                    value={userSearch}
                    onChange={(e) => setUserSearch(e.target.value)}
                    placeholder="Search online travelers..."
                    className="w-full pl-8 pr-7 py-1.5 rounded-xl text-xs bg-white border border-tan-300 focus:border-peach-400 focus:outline-none"
                  />
                  {userSearch && (
                    <button
                      type="button"
                      onClick={() => setUserSearch('')}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-tan-400 hover:text-tan-700 text-xs cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex gap-1">
                    <button
                      type="button"
                      onClick={() => setUserFilter('all')}
                      className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                        userFilter === 'all'
                          ? 'bg-[#FD9A4D] text-white shadow-2xs'
                          : 'text-tan-600 hover:bg-tan-100'
                      }`}
                    >
                      All ({onlineTravelers.length})
                    </button>
                    <button
                      type="button"
                      onClick={() => setUserFilter('friends')}
                      className={`px-2 py-0.5 rounded-lg font-bold text-[11px] transition-colors cursor-pointer ${
                        userFilter === 'friends'
                          ? 'bg-[#FD9A4D] text-white shadow-2xs'
                          : 'text-tan-600 hover:bg-tan-100'
                      }`}
                    >
                      Friends ({friends.length})
                    </button>
                  </div>

                  <span className="text-[10px] text-emerald-600 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Online Roster
                  </span>
                </div>
              </div>

              {/* Travelers List */}
              <div className="flex-1 overflow-y-auto p-2.5 space-y-1.5">
                {filteredTravelers.length === 0 ? (
                  <div className="text-center py-10 text-tan-500 text-xs">
                    <StreamlineUsers className="w-8 h-8 mx-auto mb-2 text-tan-300" />
                    <p className="font-bold text-ink-800">No travelers found</p>
                    <p className="text-[11px] mt-1">Try another search or switch filters.</p>
                  </div>
                ) : (
                  filteredTravelers.map((t) => {
                    const isJinssi = Boolean(
                      t.isCreator ||
                      t.username.toLowerCase() === 'jinssi' ||
                      t.badge === 'Creator & Developer'
                    );
                    const isMe = Boolean(
                      (user && t.id === user.id) ||
                      (profile.username && t.username.toLowerCase() === profile.username.toLowerCase())
                    );
                    const alreadyFriend = isFriend(t.username) || isFriend(t.id);

                    return (
                      <div
                        key={t.id}
                        className="flex items-center justify-between p-2 rounded-2xl hover:bg-cream-100 transition-colors group border border-transparent hover:border-tan-200"
                      >
                        {/* Left: Avatar + Info */}
                        <div
                          className="flex items-center gap-2.5 min-w-0 cursor-pointer flex-1 mr-2"
                          onClick={() =>
                            openProfile({
                              id: t.id,
                              username: t.username,
                              avatarConfig: t.avatarConfig,
                              badge: t.badge,
                              isCreator: isJinssi,
                              bio: t.bio,
                              bannerColor: t.bannerColor,
                              bannerText: t.bannerText,
                              favoriteActivity: t.favoriteActivity,
                              readingStatus: t.readingStatus,
                              joinedAt: t.joinedAt,
                            })
                          }
                          title={`View @${t.username}'s Profile`}
                        >
                          <div className="relative shrink-0">
                            <CozyAvatar config={t.avatarConfig} size={34} />
                            <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white" />
                          </div>

                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-1.5 leading-tight">
                              <span className="font-bold text-xs text-ink-900 group-hover:text-peach-600 truncate">
                                @{t.username}
                              </span>
                              {isJinssi && (
                                <span className="text-[8px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-peach-500 text-white shadow-2xs shrink-0">
                                  DEV
                                </span>
                              )}
                              {isMe && (
                                <span className="text-[8px] font-bold text-tan-500 shrink-0">
                                  (You)
                                </span>
                              )}
                            </div>
                            <div className="text-[10px] text-tan-500 truncate mt-0.5">
                              {t.badge || 'Cozy Explorer'}
                            </div>
                          </div>
                        </div>

                        {/* Right: Quick Action Buttons */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          {!isMe ? (
                            <>
                              {/* Quick Chat / DM */}
                              <button
                                type="button"
                                onClick={() => handleQuickChat(t)}
                                className="p-1.5 rounded-xl bg-white hover:bg-peach-100 text-tan-600 hover:text-peach-600 border border-tan-200 transition-all cursor-pointer shadow-2xs active:scale-95"
                                title={`Send Direct Message to @${t.username}`}
                                aria-label={`Send Direct Message to @${t.username}`}
                              >
                                <StreamlineMessageSquare className="w-3.5 h-3.5" />
                              </button>

                              {/* Quick Add / Friend Toggle */}
                              <button
                                type="button"
                                onClick={() => handleQuickAddFriend(t)}
                                className={`p-1.5 rounded-xl border transition-all cursor-pointer shadow-2xs active:scale-95 ${
                                  alreadyFriend
                                    ? 'bg-emerald-50 border-emerald-300 text-emerald-600 hover:bg-emerald-100'
                                    : 'bg-white border-tan-200 text-tan-600 hover:bg-peach-100 hover:text-peach-600'
                                }`}
                                title={alreadyFriend ? `Friends with @${t.username} (Click to remove)` : `Add @${t.username} to friends`}
                                aria-label={alreadyFriend ? `Friends with @${t.username}` : `Add @${t.username} to friends`}
                              >
                                {alreadyFriend ? (
                                  <StreamlineUserCheck className="w-3.5 h-3.5 text-emerald-600" />
                                ) : (
                                  <StreamlineUserPlus className="w-3.5 h-3.5" />
                                )}
                              </button>
                            </>
                          ) : (
                            <span className="text-[10px] px-2 py-0.5 rounded-lg bg-tan-100 text-tan-600 font-bold">
                              Active
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              {/* Bottom Bar in Users Mode */}
              <div className="p-3 border-t border-tan-200/80 bg-[#FCF8EE] flex items-center justify-between text-[11px] text-tan-600">
                <span>Click 💬 to DM • ➕ to Add Friend</span>
                <button
                  type="button"
                  onClick={() => {
                    setViewMode('chat');
                    setChannel('world');
                  }}
                  className="font-bold text-peach-600 hover:text-peach-700 underline cursor-pointer"
                >
                  Open World Chat
                </button>
              </div>
            </div>
          ) : (
            /* VIEW 2: CHAT MESSAGES & INPUT */
            <>
              {/* DM Partner Header Banner if in DM Mode */}
              {channel === 'dm' && activeDmPartner && (
                <div className="px-4 py-2 border-b bg-peach-50/50 border-peach-200 flex items-center justify-between text-xs">
                  <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => {
                      const matchingTraveler = onlineTravelers.find(
                        (t) =>
                          t.id === activeDmPartner.id ||
                          t.username.toLowerCase() === activeDmPartner.username.toLowerCase()
                      );
                      openProfile({
                        id: activeDmPartner.id,
                        username: activeDmPartner.username,
                        avatarConfig: activeDmPartner.avatarConfig,
                        badge: activeDmPartner.badge,
                        isCreator: activeDmPartner.isCreator,
                        bio: matchingTraveler?.bio,
                        bannerColor: matchingTraveler?.bannerColor,
                        bannerText: matchingTraveler?.bannerText,
                        favoriteActivity: matchingTraveler?.favoriteActivity,
                        readingStatus: matchingTraveler?.readingStatus,
                        joinedAt: matchingTraveler?.joinedAt,
                      });
                    }}
                  >
                    <CozyAvatar config={activeDmPartner.avatarConfig} size={24} />
                    <span className="font-bold text-[#3A2E22]">@{activeDmPartner.username}</span>
                    {activeDmPartner.isCreator && (
                      <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-peach-200 text-peach-800 font-bold">
                        Dev
                      </span>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveDmPartner(null)}
                    className="text-[10px] text-tan-500 hover:text-peach-600 underline font-semibold cursor-pointer"
                  >
                    Switch Partner
                  </button>
                </div>
              )}

              {/* DM Partner Selector if in DM Mode without Active Partner */}
              {channel === 'dm' && !activeDmPartner && (
                <div className="p-4 border-b bg-[#FCF8EE] border-[#EBDCC9]">
                  {!user ? (
                    <div className="text-center py-2">
                      <span className="text-xs font-bold text-[#3A2E22] block mb-1">
                        Direct Messaging is Members Only
                      </span>
                      <p className="text-[11px] text-tan-500 mb-2">
                        Sign in with Google to send private messages and build your buddy list.
                      </p>
                      <button
                        type="button"
                        onClick={() =>
                          triggerAuthPrompt('Sign in with Gmail to direct message friends.')
                        }
                        className="px-3.5 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs cursor-pointer inline-flex items-center gap-1.5 transition-transform hover:scale-102 active:scale-98"
                        style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
                      >
                        <StreamlineUsers className="w-3.5 h-3.5" />
                        <span>Sign In to DM</span>
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="text-xs font-bold text-[#3A2E22] block mb-2">
                        {profile.isCreator ? 'Traveler Messages & Conversations' : 'Select a Friend or Recent Chat'}
                      </span>
                      <div className="flex gap-2 overflow-x-auto pb-1">
                        {recentDmPartners.length === 0 ? (
                          <span className="text-xs text-tan-500">
                            {profile.isCreator
                              ? 'No traveler messages yet. Incoming messages will appear here for 1-click replies!'
                              : 'No recent chats yet. Click the chat icon on any user to message them!'}
                          </span>
                        ) : (
                          recentDmPartners.map((f) => (
                            <button
                              key={f.id}
                              type="button"
                              onClick={() => setActiveDmPartner(f)}
                              className="p-2 rounded-xl bg-white border border-tan-200 hover:border-peach-400 flex flex-col items-center gap-1 shrink-0 cursor-pointer text-xs"
                            >
                              <CozyAvatar config={f.avatarConfig} size={36} />
                              <span className="font-bold truncate max-w-[70px]">@{f.username}</span>
                            </button>
                          ))
                        )}
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Messages Scroll Area */}
              <div className="flex-1 p-3.5 overflow-y-auto space-y-3 bg-[#FEFCF7]">
                {currentChannelMessages.length === 0 ? (
                  <div className="text-center py-12 text-tan-500 text-xs">
                    <div className="w-10 h-10 rounded-2xl bg-tan-100/70 border border-tan-200 flex items-center justify-center mx-auto mb-2 text-tan-500">
                      <StreamlinePencil className="w-5 h-5" />
                    </div>
                    <p className="font-bold text-ink-800">
                      {channel === 'world' ? 'Welcome to World Chat!' : 'Direct Message Thread'}
                    </p>
                    <p className="text-[11px] mt-1">
                      Say hello to travelers, discuss games, and make friends.
                    </p>
                  </div>
                ) : (
                  currentChannelMessages.map((msg) => {
                    const isJinssi = Boolean(
                      msg.senderIsCreator ||
                      msg.senderName.toLowerCase().includes('jinssi') ||
                      msg.senderName.toLowerCase().includes('mjhane')
                    );
                    const cleanSenderName = isJinssi ? 'Jinssi' : msg.senderName.split('@')[0];
                    const isMe =
                      Boolean(user?.id && msg.senderId === user.id) ||
                      (profile.isCreator && isJinssi) ||
                      (user?.email && msg.senderName.toLowerCase() === user.email.toLowerCase()) ||
                      (profile.username && cleanSenderName.toLowerCase() === profile.username.toLowerCase());
                    const isAlreadyFriend = isFriend(cleanSenderName) || isFriend(msg.senderId);

                    // Messenger Style: User (Me) on the RIGHT
                    if (isMe) {
                      return (
                        <div key={msg.id} className="flex justify-end w-full group">
                          <div className="flex flex-col items-end max-w-[80%] min-w-0">
                            <div className="flex items-center gap-1.5 leading-none mb-1 justify-end">
                              <span className="text-[9px] text-tan-400 font-mono">
                                {new Date(msg.createdAt).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              <span className="text-[10px] font-bold text-peach-600">
                                You
                              </span>
                              {isJinssi && (
                                <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-peach-500 text-white shadow-2xs">
                                  DEV
                                </span>
                              )}
                            </div>

                            <div className="bg-[#FD9A4D] text-white text-xs px-3.5 py-2 rounded-2xl rounded-br-xs shadow-xs font-medium leading-relaxed break-words max-w-full">
                              {msg.text}
                            </div>
                          </div>
                        </div>
                      );
                    }

                    // Messenger Style: Other Users on the LEFT with avatar & quick game chat action buttons
                    const matchingTraveler = onlineTravelers.find(
                      (t) => t.id === msg.senderId || t.username.toLowerCase() === cleanSenderName.toLowerCase()
                    );

                    const handleOpenMsgProfile = () => {
                      openProfile({
                        id: msg.senderId,
                        username: cleanSenderName,
                        avatarConfig: matchingTraveler?.avatarConfig || msg.senderAvatar,
                        badge: matchingTraveler?.badge || (isJinssi ? 'Creator & Developer' : 'Cozy Explorer'),
                        isCreator: isJinssi,
                        bio: matchingTraveler?.bio,
                        bannerColor: matchingTraveler?.bannerColor,
                        bannerText: matchingTraveler?.bannerText,
                        favoriteActivity: matchingTraveler?.favoriteActivity,
                        readingStatus: matchingTraveler?.readingStatus,
                        joinedAt: matchingTraveler?.joinedAt,
                      });
                    };

                    return (
                      <div key={msg.id} className="flex items-start gap-2.5 w-full group">
                        <button
                          type="button"
                          onClick={handleOpenMsgProfile}
                          className="cursor-pointer shrink-0 transition-transform active:scale-95 self-start mt-0.5"
                          title={`View u/${cleanSenderName}'s Profile`}
                        >
                          <CozyAvatar config={matchingTraveler?.avatarConfig || msg.senderAvatar} size={30} />
                        </button>

                        <div className="flex flex-col items-start max-w-[80%] min-w-0">
                          <div className="flex items-center gap-1.5 leading-none mb-1 flex-wrap">
                            <button
                              type="button"
                              onClick={handleOpenMsgProfile}
                              className="font-bold text-xs text-ink-900 hover:text-peach-600 cursor-pointer truncate"
                            >
                              @{cleanSenderName}
                            </button>
                            {isJinssi && (
                              <span className="text-[9px] font-black px-1.5 py-0.2 rounded-full bg-gradient-to-r from-amber-500 to-peach-500 text-white shadow-2xs">
                                DEV
                              </span>
                            )}
                            <span className="text-[9px] text-tan-400 font-mono">
                              {new Date(msg.createdAt).toLocaleTimeString([], {
                                hour: '2-digit',
                                minute: '2-digit',
                              })}
                            </span>

                            {/* Quick Game Chat Action Icons Beside Username */}
                            <div className="inline-flex items-center gap-1 ml-1">
                              {/* Quick Chat / DM Icon */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuickChat({
                                    id: msg.senderId,
                                    username: cleanSenderName,
                                    avatarConfig: msg.senderAvatar,
                                    badge: isJinssi ? 'Creator & Developer' : 'Cozy Explorer',
                                    isOnline: true,
                                    isCreator: isJinssi,
                                  })
                                }
                                className="p-1 rounded-md bg-cream-100 hover:bg-peach-100 text-tan-600 hover:text-peach-600 transition-all cursor-pointer shadow-2xs active:scale-90"
                                title={`Direct Message @${cleanSenderName}`}
                                aria-label={`Direct Message @${cleanSenderName}`}
                              >
                                <StreamlineMessageSquare className="w-3 h-3" />
                              </button>

                              {/* Quick Add Friend Icon */}
                              <button
                                type="button"
                                onClick={() =>
                                  handleQuickAddFriend({
                                    id: msg.senderId,
                                    username: cleanSenderName,
                                    avatarConfig: msg.senderAvatar,
                                    badge: isJinssi ? 'Creator & Developer' : 'Cozy Explorer',
                                    isOnline: true,
                                    isCreator: isJinssi,
                                  })
                                }
                                className={`p-1 rounded-md transition-all cursor-pointer shadow-2xs active:scale-90 ${
                                  isAlreadyFriend
                                    ? 'bg-emerald-50 text-emerald-600 hover:bg-emerald-100'
                                    : 'bg-cream-100 hover:bg-peach-100 text-tan-600 hover:text-peach-600'
                                }`}
                                title={
                                  isAlreadyFriend
                                    ? `Friends with @${cleanSenderName} (Click to remove)`
                                    : `Add @${cleanSenderName} to friends`
                                }
                                aria-label={
                                  isAlreadyFriend
                                    ? `Friends with @${cleanSenderName}`
                                    : `Add @${cleanSenderName} to friends`
                                }
                              >
                                {isAlreadyFriend ? (
                                  <StreamlineUserCheck className="w-3 h-3 text-emerald-600" />
                                ) : (
                                  <StreamlineUserPlus className="w-3 h-3" />
                                )}
                              </button>
                            </div>
                          </div>

                          <div
                            className={`text-xs px-3.5 py-2 rounded-2xl rounded-bl-xs shadow-xs leading-relaxed break-words max-w-full ${
                              isJinssi
                                ? 'bg-peach-50 border border-peach-200 text-ink-900 font-medium'
                                : 'bg-white border border-tan-200 text-ink-900'
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Bottom Chat Input Form / Guest Sign-In Notice */}
              {!user ? (
                <div className="p-3.5 border-t bg-[#FCF8EE] border-[#EBDCC9] flex flex-col items-center justify-center text-center gap-2">
                  <div className="text-xs text-[#3A2E22] font-semibold">
                    Only registered members can chat and message.
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      triggerAuthPrompt('Sign in with Gmail to join the chat and message travelers.')
                    }
                    className="px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-transform hover:scale-102 active:scale-98 cursor-pointer flex items-center gap-2"
                    style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
                  >
                    <StreamlineUsers className="w-3.5 h-3.5" />
                    <span>Sign In to Chat</span>
                  </button>
                  <div className="text-[10px] text-tan-500 font-medium">
                    World Chat is currently in read-only mode for visitors.
                  </div>
                </div>
              ) : (
                <form
                  onSubmit={handleSend}
                  className="p-3 border-t bg-[#FCF8EE] border-[#EBDCC9] flex flex-col gap-1.5"
                >
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={inputText}
                      onChange={(e) => setInputText(e.target.value)}
                      placeholder={
                        channel === 'world'
                          ? 'Message World Chat...'
                          : activeDmPartner
                          ? `Message @${activeDmPartner.username}...`
                          : 'Select a friend to message...'
                      }
                      disabled={channel === 'dm' && !activeDmPartner}
                      className="flex-1 px-3 py-2 rounded-xl text-xs bg-white border border-tan-300 focus:border-peach-500 focus:outline-none disabled:opacity-50"
                    />
                    <button
                      type="submit"
                      disabled={!inputText.trim() || isSending || (channel === 'dm' && !activeDmPartner)}
                      className="px-3.5 py-2 rounded-xl text-xs font-bold text-white shadow-xs transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
                      style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
                    >
                      Send
                    </button>
                  </div>

                  {/* Retention & Privacy Notice */}
                  <div className="text-[9px] text-tan-500 text-center">
                    Synced with Supabase & pruned every 7 days. Your chat history is preserved locally.
                  </div>
                </form>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}
