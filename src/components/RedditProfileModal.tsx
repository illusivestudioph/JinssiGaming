import React, { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { CozyAvatar } from '@/components/CozyAvatar';
import {
  StreamlineClose,
  StreamlineCheck,
  StreamlineStars,
  StreamlineCalendar,
  StreamlineBook,
  StreamlineGamepad,
  StreamlineCoffee,
  StreamlinePencil,
  StreamlineUsers,
  StreamlinePalette,
  StreamlineStar,
  StreamlineLogOut,
  StreamlineUser,
} from '@/components/StreamlineIcons';

interface ProfileComment {
  id: string;
  game_id?: string;
  user_name: string;
  text: string;
  created_at: string;
}

interface BannerColorOption {
  id: string;
  name: string;
  gradient: string;
  dotColor: string;
  borderColor: string;
}

const BANNER_PALETTES: BannerColorOption[] = [
  {
    id: 'peach',
    name: 'Cozy Peach',
    gradient: 'linear-gradient(135deg, #FD9A4D 0%, #FCB274 50%, #E07A2B 100%)',
    dotColor: '#ffffff',
    borderColor: '#FCB274',
  },
  {
    id: 'matcha',
    name: 'Matcha Herb',
    gradient: 'linear-gradient(135deg, #649058 0%, #87A96B 50%, #4D7043 100%)',
    dotColor: '#ffffff',
    borderColor: '#87A96B',
  },
  {
    id: 'lavender',
    name: 'Twilight Berry',
    gradient: 'linear-gradient(135deg, #8E7DBE 0%, #B3A4D6 50%, #6E5C9E 100%)',
    dotColor: '#ffffff',
    borderColor: '#B3A4D6',
  },
  {
    id: 'espresso',
    name: 'Warm Mocha',
    gradient: 'linear-gradient(135deg, #5E4134 0%, #7E5846 50%, #432E24 100%)',
    dotColor: '#ffffff',
    borderColor: '#7E5846',
  },
  {
    id: 'honey',
    name: 'Golden Honey',
    gradient: 'linear-gradient(135deg, #E6A23C 0%, #F5C06A 50%, #C48220 100%)',
    dotColor: '#ffffff',
    borderColor: '#F5C06A',
  },
  {
    id: 'sakura',
    name: 'Sakura Petal',
    gradient: 'linear-gradient(135deg, #E87A90 0%, #F4A7B9 50%, #C2566E 100%)',
    dotColor: '#ffffff',
    borderColor: '#F4A7B9',
  },
];

export function RedditProfileModal() {
  const {
    activeProfileUser,
    closeProfile,
    isFriend,
    addFriend,
    removeFriend,
    openDmWith,
    openProfile,
    broadcastBannerUpdate,
  } = useChat();
  const {
    user,
    profile,
    triggerAuthPrompt,
    signOut,
    setShowAvatarBuilder,
    updateProfile,
    setShowProfileModal,
    setAvatarBuilderReturnTo,
  } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'trophies'>('overview');
  const [toast, setToast] = useState<string | null>(null);

  // Check whether the user is viewing their own profile (or creator viewing creator)
  const isViewingSelf = Boolean(
    (user && activeProfileUser && (activeProfileUser.id === user.id || activeProfileUser.id === profile.id)) ||
    (activeProfileUser?.isCreator && profile.isCreator) ||
    (activeProfileUser && profile.username && activeProfileUser.username.toLowerCase() === profile.username.toLowerCase())
  );

  const [isEditingBanner, setIsEditingBanner] = useState(false);
  const [currentBannerColor, setCurrentBannerColor] = useState<string>('peach');
  const [currentBannerText, setCurrentBannerText] = useState<string>('');

  // Sync banner state whenever active profile changes
  useEffect(() => {
    if (!activeProfileUser) return;
    let savedColor: string | undefined;
    let savedText: string | undefined;

    // 1. Check local storage FIRST (it holds the user's explicit saved custom banner)
    try {
      const lowerKey = `jinssi_profile_banner_${activeProfileUser.username.toLowerCase()}`;
      const rawKey = `jinssi_profile_banner_${activeProfileUser.username}`;
      const stored =
        localStorage.getItem(lowerKey) ||
        localStorage.getItem(rawKey) ||
        (isViewingSelf ? localStorage.getItem('jinssi_user_banner') : null);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed.color) savedColor = parsed.color;
        if (parsed.text !== undefined && parsed.text !== null) savedText = parsed.text;
      }
    } catch {
      // ignore
    }

    // 2. If not in localStorage, check profile or activeProfileUser
    if (!savedColor) {
      savedColor = (isViewingSelf && profile.bannerColor) || activeProfileUser.bannerColor;
    }
    if (savedText === undefined || savedText === null) {
      savedText = (isViewingSelf && profile.bannerText !== undefined && profile.bannerText !== null)
        ? profile.bannerText
        : activeProfileUser.bannerText;
    }

    // 3. Fallback defaults only if user never configured a banner
    setCurrentBannerColor(savedColor || (activeProfileUser.isCreator ? 'peach' : 'peach'));
    setCurrentBannerText(
      savedText !== undefined && savedText !== null
        ? savedText
        : activeProfileUser.isCreator
        ? 'Welcome to Jinssi Gaming! 🌸'
        : 'Enjoying cozy stories & games 🍵'
    );
    setIsEditingBanner(false);
  }, [activeProfileUser?.username, isViewingSelf]);

  // Live real comments query for active profile user
  const [userComments, setUserComments] = useState<ProfileComment[]>([]);
  const [isLoadingComments, setIsLoadingComments] = useState(false);

  useEffect(() => {
    if (activeTab !== 'comments' || !activeProfileUser?.username) return;

    let active = true;
    setIsLoadingComments(true);

    const fetchUserComments = async () => {
      try {
        const { data, error } = await supabase
          .from('comments')
          .select('id, game_id, user_name, text, created_at')
          .eq('user_name', activeProfileUser.username)
          .order('created_at', { ascending: false })
          .limit(15);

        if (!error && data && active) {
          setUserComments(data as ProfileComment[]);
        } else if (active) {
          setUserComments([]);
        }
      } catch {
        if (active) setUserComments([]);
      } finally {
        if (active) setIsLoadingComments(false);
      }
    };

    void fetchUserComments();

    return () => {
      active = false;
    };
  }, [activeTab, activeProfileUser?.username]);

  if (!activeProfileUser) return null;

  const isAlreadyFriend = isFriend(activeProfileUser.id) || isFriend(activeProfileUser.username);

  const handleToggleFriend = () => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to add friends and view your social buddy list.');
      return;
    }

    if (isViewingSelf) return;

    if (isAlreadyFriend) {
      removeFriend(activeProfileUser.id);
      setToast('Removed from Friends');
    } else {
      addFriend({
        id: activeProfileUser.id,
        username: activeProfileUser.username,
        avatarConfig: activeProfileUser.avatarConfig,
        badge: activeProfileUser.badge,
        isOnline: true,
        isCreator: activeProfileUser.isCreator,
      });
      setToast('Added to Friends!');
    }
    setTimeout(() => setToast(null), 2500);
  };

  const handleStartDm = () => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to send direct messages to travelers.');
      return;
    }

    if (isViewingSelf) return;

    openDmWith({
      id: activeProfileUser.id,
      username: activeProfileUser.username,
      avatarConfig: activeProfileUser.avatarConfig,
      badge: activeProfileUser.badge,
      isOnline: true,
      isCreator: activeProfileUser.isCreator,
      addedAt: new Date().toISOString(),
    });
    closeProfile();
  };

  const handleSaveBanner = async () => {
    if (!activeProfileUser) return;
    const bannerData = { color: currentBannerColor, text: currentBannerText };
    const lowerKey = `jinssi_profile_banner_${activeProfileUser.username.toLowerCase()}`;
    const rawKey = `jinssi_profile_banner_${activeProfileUser.username}`;

    try {
      localStorage.setItem(lowerKey, JSON.stringify(bannerData));
      localStorage.setItem(rawKey, JSON.stringify(bannerData));
      if (isViewingSelf) {
        localStorage.setItem('jinssi_user_banner', JSON.stringify(bannerData));
      }
    } catch {
      // ignore
    }

    // 1. Immediately update activeProfileUser in ChatContext
    openProfile({
      ...activeProfileUser,
      bannerColor: currentBannerColor,
      bannerText: currentBannerText,
    });

    // 2. Broadcast via Supabase Realtime WebSocket to all users (World Sync!)
    broadcastBannerUpdate(
      activeProfileUser.username,
      currentBannerColor,
      currentBannerText
    );

    // 3. If viewing own profile, persist into AuthContext (local storage + Supabase user metadata)
    if (isViewingSelf) {
      await updateProfile({
        bannerColor: currentBannerColor,
        bannerText: currentBannerText,
      });
    }

    setIsEditingBanner(false);
    setToast('Banner saved & synced with world! ✨');
    setTimeout(() => setToast(null), 2500);
  };

  const selectedPalette =
    BANNER_PALETTES.find((p) => p.id === currentBannerColor) || BANNER_PALETTES[0];

  // Format join date as "Month Year" (e.g. Sep 2026), matching UserProfileModal
  const rawJoinDate = isViewingSelf
    ? (profile.joinedAt || user?.created_at || new Date().toISOString())
    : (activeProfileUser.joinedAt || new Date().toISOString());

  const parsedDate = new Date(rawJoinDate);
  const validDate = isNaN(parsedDate.getTime()) ? new Date() : parsedDate;

  const joinedFormatted = validDate.toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="relative w-full max-w-md rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2"
        style={{
          backgroundColor: 'var(--card-bg, #fefcf7)',
          borderColor: 'var(--card-border, #5e5148)',
        }}
      >
        {/* Header Ribbon (Matches UserProfileModal exactly) */}
        <div
          className="px-6 py-4 border-b-2 flex items-center justify-between"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-2xl border-2 flex items-center justify-center shadow-xs"
              style={{
                backgroundColor: 'var(--theme-accent-soft, #fcdfaa)',
                borderColor: 'var(--theme-accent, #fd9a4d)',
                color: 'var(--theme-accent, #fd9a4d)',
              }}
            >
              <StreamlineUser className="w-5 h-5" />
            </div>
            <h3
              className="font-display font-bold text-lg"
              style={{ color: 'var(--text-main, #3a2e22)' }}
            >
              {isViewingSelf ? 'Cozy Member Profile' : `@${activeProfileUser.username}'s Profile`}
            </h3>
          </div>
          <button
            type="button"
            onClick={closeProfile}
            className="p-2 rounded-full hover:opacity-80 transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted, #8f6b48)' }}
            title="Close modal"
          >
            <StreamlineClose className="w-4 h-4" />
          </button>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div
            className="text-xs font-bold px-4 py-2 text-center animate-fade-in flex items-center justify-center gap-1.5 shadow-xs"
            style={{
              backgroundColor: 'var(--theme-accent, #649058)',
              color: 'var(--theme-accent-text, #ffffff)',
            }}
          >
            <StreamlineCheck className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div
          className="p-6 overflow-y-auto space-y-5 flex-1"
          style={{ backgroundColor: 'var(--card-bg, #fefcf7)' }}
        >
          {/* Avatar Card Showcase with Integrated Cozy Banner */}
          <div
            className="rounded-2xl border-2 overflow-hidden shadow-inner flex flex-col items-center"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            {/* Cover Banner */}
            <div
              className="relative h-28 sm:h-32 w-full p-3 overflow-hidden flex flex-col justify-between transition-all duration-300"
              style={{
                background: selectedPalette.gradient,
              }}
            >
              {/* Subtle Grid / Texture Pattern */}
              <div
                className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:16px_16px]"
              />

              {/* Banner Top Controls */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/35 text-white shadow-xs border border-white/20">
                  {activeProfileUser.isCreator ? 'Creator & Dev' : 'Community Explorer'}
                </span>

                {isViewingSelf && (
                  <div className="flex items-center gap-1.5">
                    {isEditingBanner && (
                      <button
                        type="button"
                        onClick={handleSaveBanner}
                        className="px-2.5 py-1 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold flex items-center gap-1 transition-all shadow-md cursor-pointer border border-white/40 active:scale-95"
                        title="Save Banner & Sync with World"
                      >
                        <StreamlineCheck className="w-3 h-3" />
                        <span>Save</span>
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={() => setIsEditingBanner((prev) => !prev)}
                      className="px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 text-white text-[10px] font-bold flex items-center gap-1 transition-colors cursor-pointer border border-white/20 shadow-xs"
                      title="Customize Banner Color & Headline"
                    >
                      <StreamlinePalette className="w-3 h-3" />
                      <span>{isEditingBanner ? 'Close' : 'Edit Banner'}</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Absolute Centered Custom Banner Text */}
              <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none">
                {currentBannerText && (
                  <p className="text-white font-display font-black text-sm sm:text-base drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide flex items-center justify-center gap-1.5 text-center">
                    <StreamlineStar className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0 drop-shadow-xs" />
                    <span className="line-clamp-2">{currentBannerText}</span>
                    <StreamlineStar className="w-3.5 h-3.5 text-amber-300 fill-amber-300 shrink-0 drop-shadow-xs" />
                  </p>
                )}
              </div>
            </div>

            {/* Banner Editor Tray (Toggles when "Edit Banner" is clicked) */}
            {isEditingBanner && (
              <div
                className="w-full p-4 border-b space-y-3 animate-fade-in text-xs"
                style={{
                  backgroundColor: '#ffffff',
                  borderColor: 'var(--card-line, #ebdcc9)',
                }}
              >
                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-muted, #8f6b48)' }}
                  >
                    Banner Tagline
                  </label>
                  <input
                    type="text"
                    value={currentBannerText}
                    onChange={(e) => setCurrentBannerText(e.target.value)}
                    maxLength={60}
                    placeholder="Write a warm cozy banner quote..."
                    className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border bg-cream-50/60 shadow-2xs focus:outline-none focus:ring-2 focus:ring-peach-400"
                    style={{
                      borderColor: 'var(--card-line, #ebdcc9)',
                      color: 'var(--text-main, #3a2e22)',
                    }}
                  />
                </div>

                <div>
                  <label
                    className="block text-[10px] font-bold uppercase tracking-wider mb-1"
                    style={{ color: 'var(--text-muted, #8f6b48)' }}
                  >
                    Color Palette
                  </label>
                  <div className="flex items-center gap-1.5 flex-wrap">
                    {BANNER_PALETTES.map((palette) => {
                      const isSelected = currentBannerColor === palette.id;
                      return (
                        <button
                          key={palette.id}
                          type="button"
                          onClick={() => setCurrentBannerColor(palette.id)}
                          className={`px-2.5 py-1 rounded-xl text-[11px] font-bold text-white shadow-xs flex items-center gap-1 transition-transform active:scale-95 cursor-pointer border ${
                            isSelected ? 'ring-2 ring-[#3A2E22] scale-105' : 'opacity-90'
                          }`}
                          style={{
                            background: palette.gradient,
                            borderColor: isSelected ? '#ffffff' : 'transparent',
                          }}
                        >
                          {isSelected && <StreamlineCheck className="w-3 h-3 text-white" />}
                          <span>{palette.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="button"
                    onClick={handleSaveBanner}
                    className="px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 transition-all active:scale-95 cursor-pointer bg-emerald-600 hover:bg-emerald-700"
                  >
                    <StreamlineCheck className="w-3.5 h-3.5" />
                    <span>Save Banner</span>
                  </button>
                </div>
              </div>
            )}

            {/* Avatar & Persona Info (Overlapping banner) */}
            <div className="w-full px-5 pb-5 pt-0 flex flex-col items-center text-center -mt-12 relative z-10">
              <div className="relative">
                <CozyAvatar
                  config={isViewingSelf ? profile.avatarConfig : activeProfileUser.avatarConfig}
                  size={96}
                  className="shadow-md rounded-full border-4 border-white"
                />
                {isViewingSelf && (
                  <button
                    type="button"
                    onClick={() => {
                      closeProfile();
                      setAvatarBuilderReturnTo('public_profile');
                      setShowAvatarBuilder(true);
                    }}
                    className="absolute -bottom-1 -right-1 px-3 py-1 text-[11px] font-bold rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer border border-white"
                    style={{
                      backgroundColor: 'var(--theme-accent, #fd9a4d)',
                      color: 'var(--theme-accent-text, #ffffff)',
                    }}
                    title="Open Avatar Character Studio"
                  >
                    <StreamlinePencil className="w-3.5 h-3.5" />
                    <span>Edit</span>
                  </button>
                )}
              </div>

              <div className="mt-3">
                <h4
                  className="font-display font-bold text-lg flex items-center justify-center gap-1.5"
                  style={{ color: 'var(--text-main, #3a2e22)' }}
                >
                  <span>@{activeProfileUser.username}</span>
                  {activeProfileUser.isCreator && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-peach-100 border border-peach-300 text-peach-700 font-extrabold shadow-xs">
                      🌸 Developer
                    </span>
                  )}
                </h4>

                <span
                  className="inline-block mt-1 text-[11px] font-bold px-3 py-0.5 rounded-full border"
                  style={{
                    backgroundColor: activeProfileUser.isCreator ? '#fff5eb' : 'var(--section-kicker-bg, #fcf3b9)',
                    borderColor: activeProfileUser.isCreator ? '#f97316' : 'var(--section-kicker-border, #fcb274)',
                    color: activeProfileUser.isCreator ? '#ea580c' : 'var(--section-kicker-color, #b05a1d)',
                  }}
                >
                  {activeProfileUser.badge}
                </span>

                {/* Primary Action Button: Edit Profile (Self) OR Add Friend & Message (Other) */}
                {isViewingSelf ? (
                  <div className="mt-3 flex justify-center">
                    <button
                      type="button"
                      onClick={() => {
                        closeProfile();
                        setShowProfileModal(true);
                      }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xs transition-transform active:scale-95 cursor-pointer"
                      style={{
                        backgroundColor: 'var(--theme-accent, #649058)',
                      }}
                      title="Edit Username, Bio Tagline & Community Badge"
                    >
                      <StreamlinePencil className="w-3.5 h-3.5" />
                      <span>Edit Profile</span>
                    </button>
                  </div>
                ) : (
                  <div className="mt-3 flex items-center justify-center gap-2">
                    <button
                      type="button"
                      onClick={handleToggleFriend}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
                        isAlreadyFriend
                          ? 'bg-emerald-50 border-emerald-400 text-emerald-800'
                          : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22]'
                      }`}
                    >
                      {isAlreadyFriend ? (
                        <>
                          <StreamlineCheck className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Friends</span>
                        </>
                      ) : (
                        <>
                          <StreamlineUsers className="w-3.5 h-3.5 text-[#FD9A4D]" />
                          <span>Add Friend</span>
                        </>
                      )}
                    </button>

                    <button
                      type="button"
                      onClick={handleStartDm}
                      className="px-4 py-1.5 rounded-full text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                      style={{ backgroundColor: 'var(--theme-accent, #649058)' }}
                    >
                      <StreamlinePencil className="w-3.5 h-3.5" />
                      <span>Message</span>
                    </button>
                  </div>
                )}

                {/* Join Date - Formatted identical to UserProfileModal */}
                <div
                  className="mt-2.5 flex items-center justify-center gap-1.5 text-[11px] font-medium"
                  style={{ color: 'var(--text-muted, #8f6b48)' }}
                >
                  <StreamlineCalendar className="w-3.5 h-3.5 text-tan-500" />
                  <span>Joined {joinedFormatted}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Pill Tabs */}
          <div
            className="grid grid-cols-3 p-1 rounded-2xl border text-xs font-bold text-center"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            {[
              { id: 'overview', label: 'Overview' },
              { id: 'comments', label: 'Comments' },
              { id: 'trophies', label: 'Trophy Case' },
            ].map((t) => {
              const isSelected = activeTab === t.id;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setActiveTab(t.id as 'overview' | 'comments' | 'trophies')}
                  className={`py-1.5 rounded-xl transition-all cursor-pointer ${
                    isSelected
                      ? 'font-bold bg-white text-[#3A2E22] shadow-xs'
                      : 'text-tan-600 hover:text-[#3A2E22]'
                  }`}
                >
                  {t.label}
                </button>
              );
            })}
          </div>

          {/* Tab Body */}
          {activeTab === 'overview' && (
            <div className="space-y-3.5">
              <div className="p-4 rounded-2xl bg-white border border-[#EADCCB] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-tan-500 block mb-1">
                  Cozy Bio / Tagline
                </span>
                <p className="text-xs text-[#3A2E22] leading-relaxed font-medium">
                  {activeProfileUser.bio || 'Sipping warm tea & exploring cozy adventures 🍵'}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 rounded-2xl bg-white border border-[#EADCCB]">
                  <span className="text-[10px] font-bold text-tan-500 block">Favorite Activity</span>
                  <div className="font-bold text-[#3A2E22] mt-0.5 flex items-center gap-1.5">
                    <StreamlineGamepad className="w-3.5 h-3.5 text-[#649058]" />
                    <span>Retro Gaming</span>
                  </div>
                </div>

                <div className="p-3 rounded-2xl bg-white border border-[#EADCCB]">
                  <span className="text-[10px] font-bold text-tan-500 block">Reading Status</span>
                  <div className="font-bold text-[#3A2E22] mt-0.5 flex items-center gap-1.5">
                    <StreamlineBook className="w-3.5 h-3.5 text-[#649058]" />
                    <span>Story Explorer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-3">
              {isLoadingComments ? (
                <div className="p-8 text-center text-xs text-tan-500 font-medium">
                  Loading comments...
                </div>
              ) : userComments.length > 0 ? (
                userComments.map((c) => {
                  const targetTitle = c.game_id
                    ? c.game_id.replace(/^article-/, '').replace(/-/g, ' ')
                    : 'community discussion';
                  return (
                    <div key={c.id} className="p-3.5 rounded-2xl bg-white border border-[#EADCCB] shadow-2xs">
                      <div className="flex items-center justify-between text-[10px] font-semibold text-tan-500 mb-1">
                        <span className="capitalize text-peach-700 font-bold">
                          on {targetTitle}
                        </span>
                        <span>
                          {new Date(c.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </span>
                      </div>
                      <p className="text-xs text-[#3A2E22] font-medium leading-relaxed">
                        &ldquo;{c.text}&rdquo;
                      </p>
                    </div>
                  );
                })
              ) : (
                <div className="p-8 text-center rounded-2xl bg-white/70 border border-dashed border-[#EADCCB]">
                  <StreamlinePencil className="w-7 h-7 text-tan-400 mx-auto mb-2 opacity-60" />
                  <div className="font-bold text-xs text-[#3A2E22] mb-1">
                    {isViewingSelf ? "You haven't posted any comments yet" : 'No comments yet'}
                  </div>
                  <p className="text-[11px] text-tan-500 max-w-xs mx-auto leading-relaxed">
                    {isViewingSelf
                      ? 'When you comment on game walkthroughs or cozy articles, your comments will appear here!'
                      : `@${activeProfileUser.username} hasn't posted any comments on games or articles yet.`}
                  </p>
                </div>
              )}
            </div>
          )}

          {activeTab === 'trophies' && (
            <div className="grid grid-cols-2 gap-2.5">
              {activeProfileUser.isCreator && (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-300 text-center col-span-2">
                  <StreamlineStars className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-orange-950">Site Creator</div>
                  <div className="text-[10px] text-orange-800">Lead Developer</div>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-white border border-[#EADCCB] text-center">
                <StreamlineCoffee className="w-6 h-6 text-[#649058] mx-auto mb-1" />
                <div className="font-bold text-xs text-[#3A2E22]">Cafe Regular</div>
                <div className="text-[10px] text-tan-600">Active Explorer</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#EADCCB] text-center">
                <StreamlineBook className="w-6 h-6 text-[#649058] mx-auto mb-1" />
                <div className="font-bold text-xs text-[#3A2E22]">Story Scholar</div>
                <div className="text-[10px] text-tan-600">Reader Club</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Ribbon (Matches UserProfileModal exactly) */}
        <div
          className="px-6 py-4 border-t-2 flex items-center justify-between"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          {user && isViewingSelf ? (
            <>
              <div className="min-w-0">
                <span
                  className="text-[10px] uppercase font-bold block"
                  style={{ color: 'var(--text-muted, #8f6b48)' }}
                >
                  Signed in as
                </span>
                <span
                  className="text-xs font-mono truncate block font-medium"
                  style={{ color: 'var(--text-main, #3a2e22)' }}
                >
                  {user.email}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={async () => {
                    await signOut();
                    closeProfile();
                  }}
                  className="px-3 py-1.5 rounded-xl border-2 border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <StreamlineLogOut className="w-3.5 h-3.5" />
                  <span>Sign Out</span>
                </button>
                <button
                  type="button"
                  onClick={closeProfile}
                  className="px-3 py-1.5 rounded-xl border border-tan-300 hover:bg-white text-xs font-bold text-[#3A2E22] transition-colors cursor-pointer"
                >
                  Close
                </button>
              </div>
            </>
          ) : (
            <>
              <span className="text-[11px] font-medium" style={{ color: 'var(--text-muted, #8f6b48)' }}>
                Cozy community traveler
              </span>
              <button
                type="button"
                onClick={closeProfile}
                className="px-4 py-1.5 rounded-xl border border-tan-300 bg-white hover:bg-[#FFFDFB] text-xs font-bold text-[#3A2E22] transition-colors cursor-pointer shadow-xs"
              >
                Close
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

