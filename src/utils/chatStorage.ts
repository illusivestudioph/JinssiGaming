import { supabase } from '@/lib/supabase';
import { ChatMessage, ChatChannel, Friend } from '@/types/chat';

const LOCAL_STORAGE_KEY_WORLD = 'jinssi_chat_archive_world_v1';
const LOCAL_STORAGE_KEY_DMS = 'jinssi_chat_archive_dms_v1';
const LOCAL_STORAGE_KEY_FRIENDS = 'jinssi_friends_list_v1';
const CLEANUP_TIMESTAMP_KEY = 'jinssi_last_supabase_cleanup';

/**
 * Reliably checks if a DM message belongs to the conversation with a given partner.
 * Handles creator identity aliases (jinssi-creator, auth UUIDs, developer emails) seamlessly.
 */
export function isDmForPartner(
  m: ChatMessage,
  partner: { id?: string; username?: string; isCreator?: boolean } | string | null | undefined
): boolean {
  if (m.channel !== 'dm' || !partner) return false;

  const partnerId = typeof partner === 'string' ? partner : partner.id;
  const partnerRawName = typeof partner === 'string' ? partner : partner.username;
  const partnerName = partnerRawName?.toLowerCase().trim().replace(/^[@u/]+/, '');

  const isPartnerDev = Boolean(
    (typeof partner === 'object' && partner?.isCreator) ||
    partnerId === 'jinssi-creator' ||
    partnerId === 'creator-jinssi-dev-id' ||
    partnerName === 'jinssi' ||
    partnerName?.includes('mjhane')
  );

  const senderId = m.senderId;
  const receiverId = m.receiverId;
  const senderName = m.senderName?.toLowerCase().trim().replace(/^[@u/]+/, '');
  const receiverName = m.receiverName?.toLowerCase().trim().replace(/^[@u/]+/, '');

  const isSenderDev = Boolean(
    m.senderIsCreator ||
    senderId === 'jinssi-creator' ||
    senderId === 'creator-jinssi-dev-id' ||
    senderName === 'jinssi' ||
    senderName?.includes('mjhane')
  );

  const isReceiverDev = Boolean(
    receiverId === 'jinssi-creator' ||
    receiverId === 'creator-jinssi-dev-id' ||
    receiverName === 'jinssi' ||
    receiverName?.includes('mjhane')
  );

  // If chatting with the developer / Jinssi:
  if (isPartnerDev) {
    return isSenderDev || isReceiverDev;
  }

  // Matching by user ID
  if (partnerId && (senderId === partnerId || receiverId === partnerId)) {
    return true;
  }

  // Matching by clean username
  if (partnerName && (senderName === partnerName || receiverName === partnerName)) {
    return true;
  }

  return false;
}

export const DEFAULT_WORLD_MESSAGES: ChatMessage[] = [
  {
    id: 'seed-world-1',
    channel: 'world',
    senderId: 'creator-jinssi-dev-id',
    senderName: 'Jinssi',
    senderAvatar: { seed: 'Jinssi', faceShape: 'oval', hair: 'long01', hairColor: '4a312c' },
    senderIsCreator: true,
    text: 'Welcome to our cozy gaming sanctuary! ✨ Feel free to chat, discuss game secrets, or say hello.',
    createdAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'seed-world-2',
    channel: 'world',
    senderId: 'npc-mochicat',
    senderName: 'MochiCat',
    senderAvatar: { seed: 'MochiCat', faceShape: 'round', hair: 'long04', hairColor: '4a312c' },
    senderIsCreator: false,
    text: 'Loving the walkthroughs and guides here! Anyone playing cozy farm sims tonight? ☕',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
  {
    id: 'seed-world-3',
    channel: 'world',
    senderId: 'npc-matchaknight',
    senderName: 'MatchaKnight',
    senderAvatar: { seed: 'MatchaKnight', faceShape: 'square', hair: 'short02', hairColor: '2c1b18' },
    senderIsCreator: false,
    text: 'Brewed some hot matcha and checking out the game reviews. Cozy vibes all around 🍵',
    createdAt: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
  },
];

/**
 * Reads local messages archive from browser storage
 */
export function getLocalMessages(
  channel: ChatChannel,
  dmPartner?: { id?: string; username?: string; isCreator?: boolean } | string | null
): ChatMessage[] {
  try {
    const key = channel === 'world' ? LOCAL_STORAGE_KEY_WORLD : LOCAL_STORAGE_KEY_DMS;
    const raw = localStorage.getItem(key);
    if (!raw) {
      if (channel === 'world') {
        return DEFAULT_WORLD_MESSAGES;
      }
      return [];
    }
    const parsed: ChatMessage[] = JSON.parse(raw);
    if (channel === 'world') {
      const filtered = parsed.filter((m) => m.channel === 'world');
      return filtered.length > 0 ? filtered : DEFAULT_WORLD_MESSAGES;
    }
    if (dmPartner) {
      return parsed.filter((m) => isDmForPartner(m, dmPartner));
    }
    return parsed.filter((m) => m.channel === 'dm');
  } catch (err) {
    console.warn('Failed to load local chat archive:', err);
    return channel === 'world' ? DEFAULT_WORLD_MESSAGES : [];
  }
}

/**
 * Saves message to local storage archive so personal history is preserved permanently
 */
export function saveMessageLocally(message: ChatMessage): void {
  try {
    const key = message.channel === 'world' ? LOCAL_STORAGE_KEY_WORLD : LOCAL_STORAGE_KEY_DMS;
    const raw = localStorage.getItem(key);
    const list: ChatMessage[] = raw ? JSON.parse(raw) : [];

    // Deduplicate by ID
    const exists = list.some((m) => m.id === message.id);
    if (!exists) {
      list.push(message);
      // Keep up to 2000 messages locally per channel
      const trimmed = list.slice(-2000);
      localStorage.setItem(key, JSON.stringify(trimmed));
    }
  } catch (err) {
    console.warn('Failed to save message locally:', err);
  }
}

/**
 * Prunes messages older than 7 days from Supabase so the database is never flooded
 */
export async function cleanOldSupabaseMessages(): Promise<void> {
  try {
    const lastCleanup = localStorage.getItem(CLEANUP_TIMESTAMP_KEY);
    const now = Date.now();
    // Run cleanup at most once every 12 hours
    if (lastCleanup && now - Number(lastCleanup) < 12 * 60 * 60 * 1000) {
      return;
    }

    const sevenDaysAgo = new Date(now - 7 * 24 * 60 * 60 * 1000).toISOString();
    const { error } = await supabase
      .from('chat_messages')
      .delete()
      .lt('created_at', sevenDaysAgo);

    if (error) {
      // Table might not exist yet; fail silently
      console.debug('Weekly chat cleanup notice:', error.message);
    } else {
      localStorage.setItem(CLEANUP_TIMESTAMP_KEY, String(now));
      console.log('Weekly Supabase chat message pruning executed successfully.');
    }
  } catch (err) {
    console.debug('Supabase cleanup skipped:', err);
  }
}

/**
 * Fetches recent messages from Supabase and merges with local archive
 */
/**
 * Fetches recent messages from Supabase and merges with local archive
 */
export async function fetchSupabaseMessages(
  channel: ChatChannel,
  currentUserId?: string,
  dmPartner?: { id?: string; username?: string; isCreator?: boolean } | string | null
): Promise<ChatMessage[]> {
  // Always start with locally saved messages
  const localList = getLocalMessages(channel, dmPartner);

  try {
    const query = supabase
      .from('chat_messages')
      .select('id, channel, sender_id, sender_name, sender_avatar, receiver_id, receiver_name, text, created_at')
      .eq('channel', channel)
      .order('created_at', { ascending: true })
      .limit(100);

    const { data, error } = await query;

    if (!error && data) {
      const remoteMessages: ChatMessage[] = data.map((row) => {
        const rawName = String(row.sender_name || '');
        const isCreator =
          rawName.toLowerCase().includes('jinssi') ||
          rawName.toLowerCase().includes('mjhane');

        const cleanSenderName = isCreator ? 'Jinssi' : rawName.split('@')[0];

        return {
          id: String(row.id),
          channel: row.channel as ChatChannel,
          senderId: String(row.sender_id),
          senderName: cleanSenderName,
          senderAvatar: typeof row.sender_avatar === 'object' ? row.sender_avatar : {},
          senderIsCreator: isCreator,
          receiverId: row.receiver_id ? String(row.receiver_id) : undefined,
          receiverName: row.receiver_name ? String(row.receiver_name) : undefined,
          text: String(row.text),
          createdAt: String(row.created_at),
        };
      });

      // Merge and save to local storage
      remoteMessages.forEach(saveMessageLocally);

      // Return combined, deduplicated messages
      const idMap = new Map<string, ChatMessage>();
      localList.forEach((m) => idMap.set(m.id, m));
      remoteMessages.forEach((m) => {
        if (channel === 'world' || isDmForPartner(m, dmPartner)) {
          idMap.set(m.id, m);
        }
      });

      return Array.from(idMap.values()).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    }
  } catch (err) {
    console.debug('Supabase fetch notice (fallback to local):', err);
  }

  return localList;
}

/**
 * Sends message to Supabase and saves in local archive
 */
export async function sendChatMessage(message: ChatMessage): Promise<void> {
  // Always save locally immediately
  saveMessageLocally(message);

  try {
    const { error } = await supabase.from('chat_messages').insert([
      {
        id: message.id,
        channel: message.channel,
        sender_id: message.senderId,
        sender_name: message.senderName,
        sender_avatar: message.senderAvatar,
        receiver_id: message.receiverId || null,
        receiver_name: message.receiverName || null,
        text: message.text,
        created_at: message.createdAt,
      },
    ]);

    if (error) {
      console.debug('Message stored locally (Supabase table pending):', error.message);
    }
  } catch (err) {
    console.debug('Supabase insert skipped, message preserved locally:', err);
  }
}

/**
 * Friends Management (Local Storage + Supabase sync)
 */
export function getStoredFriends(): Friend[] {
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY_FRIENDS);
    if (!raw) {
      // Default initial cozy bot / creator friend
      return [
        {
          id: 'jinssi-creator',
          username: 'Jinssi',
          avatarConfig: {
            seed: 'Jinssi',
            hair: 'short02',
            hairColor: '4a312c',
            eyebrows: 'variant02',
            eyes: 'variant01',
            mouth: 'variant01',
            glasses: 'none',
            features: 'none',
            backgroundColor: 'ffd7b5',
          },
          badge: 'Creator & Developer',
          isOnline: true,
          isCreator: true,
          lastSeen: 'Active now',
          addedAt: new Date().toISOString(),
        },
      ];
    }
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function saveStoredFriends(friends: Friend[]): void {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY_FRIENDS, JSON.stringify(friends));
  } catch (err) {
    console.warn('Failed to save friends list:', err);
  }
}
