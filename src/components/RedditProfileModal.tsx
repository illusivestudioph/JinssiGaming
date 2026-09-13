import React, { useState, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
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
} from '@/components/StreamlineIcons';

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
  const { activeProfileUser, closeProfile, isFriend, addFriend, removeFriend, openDmWith, openProfile } =
    useChat();
  const { user, profile, triggerAuthPrompt, signOut, setShowAvatarBuilder, updateProfile } = useAuth();
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

    // Immediately update activeProfileUser in ChatContext
    openProfile({
      ...activeProfileUser,
      bannerColor: currentBannerColor,
      bannerText: currentBannerText,
    });

    // If viewing own profile, persist into AuthContext (local storage + Supabase user metadata)
    if (isViewingSelf) {
      await updateProfile({
        bannerColor: currentBannerColor,
        bannerText: currentBannerText,
      });
    }

    setIsEditingBanner(false);
    setToast('Banner saved!');
    setTimeout(() => setToast(null), 2500);
  };

  const selectedPalette =
    BANNER_PALETTES.find((p) => p.id === currentBannerColor) || BANNER_PALETTES[0];

  // Accurate account join date or site creation date
  const joinedDateFormatted = new Date(
    activeProfileUser.isCreator && user?.created_at
      ? user.created_at
      : activeProfileUser.joinedAt
  ).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2"
        style={{
          backgroundColor: 'var(--card-bg, #fefcf7)',
          borderColor: 'var(--card-border, #5e5148)',
        }}
      >
        {/* Cover Banner Header with Dynamic Color & Absolute Centered Custom Text */}
        <div
          className="relative h-36 sm:h-40 w-full p-4 border-b overflow-hidden transition-all duration-300 flex flex-col justify-between"
          style={{
            background: selectedPalette.gradient,
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          {/* Subtle Grid / Texture Pattern */}
          <div
            className="absolute inset-0 opacity-20 bg-[radial-gradient(#fff_1.2px,transparent_1.2px)] [background-size:16px_16px]"
          />

          {/* Top Bar inside Banner: Tag + Banner Customize Button + Close Button */}
          <div className="relative z-10 flex items-center justify-between gap-2">
            <span className="text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/35 text-white shadow-xs border border-white/20">
              {activeProfileUser.isCreator ? 'Creator & Developer Profile' : 'Community Explorer'}
            </span>

            <div className="flex items-center gap-1.5">
              {/* Cover Color & Text Customizer Button (accessible if viewing own profile or creator) */}
              {isViewingSelf && (
                <button
                  type="button"
                  onClick={() => setIsEditingBanner((prev) => !prev)}
                  className="px-2.5 py-1 rounded-full bg-black/40 hover:bg-black/60 text-white text-[11px] font-bold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/20 shadow-xs"
                  title="Customize Banner Color & Headline"
                >
                  <StreamlinePalette className="w-3.5 h-3.5" />
                  <span>{isEditingBanner ? 'Close Editor' : 'Edit Banner'}</span>
                </button>
              )}

              <button
                type="button"
                onClick={closeProfile}
                className="p-1.5 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer border border-white/20"
                title="Close Profile"
              >
                <StreamlineClose className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Absolute Centered Banner Text / Headline Message */}
          <div className="absolute inset-0 z-10 flex items-center justify-center px-8 pointer-events-none">
            {currentBannerText && (
              <div className="max-w-md text-center">
                <p className="text-white font-display font-black text-base sm:text-lg drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)] tracking-wide flex items-center justify-center gap-2">
                  <StreamlineStar className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0 drop-shadow-xs" />
                  <span className="line-clamp-2">{currentBannerText}</span>
                  <StreamlineStar className="w-4 h-4 text-amber-300 fill-amber-300 shrink-0 drop-shadow-xs" />
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Banner Editor Tray (Toggles when "Edit Banner" is clicked) */}
        {isEditingBanner && (
          <div
            className="p-4 border-b space-y-3 animate-fade-in"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            <div>
              <label
                className="block text-[11px] font-black uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                Banner Text / Headline:
              </label>
              <input
                type="text"
                value={currentBannerText}
                onChange={(e) => setCurrentBannerText(e.target.value)}
                maxLength={60}
                placeholder="Write a warm cozy banner quote..."
                className="w-full px-3 py-1.5 text-xs font-semibold rounded-xl border bg-white shadow-2xs focus:outline-none focus:ring-2 focus:ring-peach-400"
                style={{
                  borderColor: 'var(--card-line, #ebdcc9)',
                  color: 'var(--text-main, #3a2e22)',
                }}
              />
            </div>

            <div>
              <label
                className="block text-[11px] font-black uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                Banner Color Palette:
              </label>
              <div className="flex items-center gap-2 flex-wrap">
                {BANNER_PALETTES.map((palette) => {
                  const isSelected = currentBannerColor === palette.id;
                  return (
                    <button
                      key={palette.id}
                      type="button"
                      onClick={() => setCurrentBannerColor(palette.id)}
                      className={`px-3 py-1 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer border-2 ${
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
                className="px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs flex items-center gap-1.5 transition-all cursor-pointer"
                style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
              >
                <StreamlineCheck className="w-3.5 h-3.5" />
                <span>Save Banner</span>
              </button>
            </div>
          </div>
        )}

        {/* Profile Card Header Info */}
        <div
          className="px-6 pt-0 pb-4 border-b flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-10 relative z-20"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-end gap-3.5">
            <div
              className={`relative shrink-0 ${isViewingSelf ? 'cursor-pointer hover:opacity-90 transition-opacity' : ''}`}
              onClick={() => {
                if (isViewingSelf) {
                  closeProfile();
                  setShowAvatarBuilder(true);
                }
              }}
              title={isViewingSelf ? 'Click to customize avatar' : undefined}
            >
              <CozyAvatar
                config={isViewingSelf ? profile.avatarConfig : activeProfileUser.avatarConfig}
                size={88}
                className="shadow-xl rounded-full border-4 border-white"
              />
              {activeProfileUser.isCreator && (
                <div
                  className="absolute -bottom-1 -right-1 p-1 rounded-full shadow-md border-2 border-white"
                  style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)', color: '#fff' }}
                  title="Official Developer"
                >
                  <StreamlineStars className="w-3.5 h-3.5" />
                </div>
              )}
            </div>

            <div className="mb-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <h3
                  className="font-display font-bold text-lg leading-tight"
                  style={{ color: 'var(--text-main, #3a2e22)' }}
                >
                  u/{activeProfileUser.username}
                </h3>
                {activeProfileUser.isCreator && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-peach-100 text-peach-700 font-extrabold border border-peach-300">
                    Developer
                  </span>
                )}
              </div>
              <p
                className="text-xs font-semibold mt-0.5"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                {activeProfileUser.badge}
              </p>
            </div>
          </div>

          {/* Action Buttons: If viewing self -> Single clean Edit Avatar button; Else -> Add Friend & DM */}
          {isViewingSelf ? (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  closeProfile();
                  setShowAvatarBuilder(true);
                }}
                className="flex-1 sm:flex-initial px-4 py-2 rounded-xl text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
                title="Open Avatar Character Studio"
              >
                <StreamlinePencil className="w-3.5 h-3.5" />
                <span>Edit Avatar</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleToggleFriend}
                className={`flex-1 sm:flex-initial px-3.5 py-1.5 rounded-xl text-xs font-bold border-2 transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs ${
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
                className="flex-1 sm:flex-initial px-4 py-1.5 rounded-xl text-xs font-bold text-white shadow-xs flex items-center justify-center gap-1.5 transition-all active:scale-95 cursor-pointer"
                style={{ backgroundColor: 'var(--theme-accent, #fd9a4d)' }}
              >
                <StreamlinePencil className="w-3.5 h-3.5" />
                <span>Direct Message</span>
              </button>
            </div>
          )}
        </div>

        {/* Stats Strip: Community Role & Member Joined Date (Replaces Reddit Karma & Cake Day) */}
        <div
          className="px-6 py-2.5 border-b flex items-center justify-between text-xs font-semibold"
          style={{
            backgroundColor: 'var(--card-bg, #fefcf7)',
            borderColor: 'var(--card-line, #ebdcc9)',
            color: 'var(--text-muted, #8f6b48)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <StreamlineStars className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-bold" style={{ color: 'var(--text-main, #3a2e22)' }}>
              {activeProfileUser.isCreator ? 'Lead Developer & Creator' : 'Community Explorer'}
            </span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <StreamlineCalendar className="w-3.5 h-3.5 text-tan-500" />
            <span>Joined: {joinedDateFormatted}</span>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="bg-[#649058] text-white text-xs font-bold px-4 py-1.5 text-center animate-fade-in flex items-center justify-center gap-1">
            <StreamlineCheck className="w-3.5 h-3.5" />
            <span>{toast}</span>
          </div>
        )}

        {/* Navigation Tabs */}
        <div
          className="grid grid-cols-3 border-b text-xs font-bold text-center"
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
                className={`py-2.5 border-b-2 transition-all cursor-pointer ${
                  isSelected
                    ? 'font-black bg-white/40'
                    : 'border-transparent text-tan-600 hover:bg-black/5'
                }`}
                style={{
                  borderColor: isSelected ? 'var(--theme-accent, #fd9a4d)' : 'transparent',
                  color: isSelected ? 'var(--theme-accent, #fd9a4d)' : 'var(--text-muted, #8f6b48)',
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div
          className="p-6 overflow-y-auto space-y-4 flex-1 text-xs"
          style={{ backgroundColor: 'var(--card-bg, #fefcf7)' }}
        >
          {activeTab === 'overview' && (
            <div className="space-y-4">
              <div className="p-4 rounded-2xl bg-white border border-[#EADCCB] shadow-2xs">
                <span className="text-[10px] font-bold uppercase tracking-wider text-tan-500 block mb-1">
                  About
                </span>
                <p className="text-xs text-[#3A2E22] leading-relaxed font-medium">
                  {activeProfileUser.bio}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="p-3.5 rounded-2xl bg-white border border-[#EADCCB]">
                  <span className="text-[10px] font-bold text-tan-500 block">Favorite Activity</span>
                  <div className="font-bold text-[#3A2E22] mt-0.5 flex items-center gap-1.5">
                    <StreamlineGamepad className="w-3.5 h-3.5 text-[#FD9A4D]" />
                    <span>Retro Gaming</span>
                  </div>
                </div>

                <div className="p-3.5 rounded-2xl bg-white border border-[#EADCCB]">
                  <span className="text-[10px] font-bold text-tan-500 block">Reading Status</span>
                  <div className="font-bold text-[#3A2E22] mt-0.5 flex items-center gap-1.5">
                    <StreamlineBook className="w-3.5 h-3.5 text-[#FD9A4D]" />
                    <span>Story Explorer</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'comments' && (
            <div className="space-y-3">
              <div className="p-3.5 rounded-2xl bg-white border border-[#EADCCB] shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-semibold text-tan-500 mb-1">
                  <span>commented on cozy collection</span>
                  <span>recent</span>
                </div>
                <p className="text-xs text-[#3A2E22] font-medium leading-relaxed">
                  &ldquo;Love this cozy vibe and the calm music player while reading!&rdquo;
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#EADCCB] shadow-2xs">
                <div className="flex items-center justify-between text-[10px] font-semibold text-tan-500 mb-1">
                  <span>commented on retro story</span>
                  <span>1w ago</span>
                </div>
                <p className="text-xs text-[#3A2E22] font-medium leading-relaxed">
                  &ldquo;The artwork and storybook layout feel so heartwarming.&rdquo;
                </p>
              </div>
            </div>
          )}

          {activeTab === 'trophies' && (
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {activeProfileUser.isCreator && (
                <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-orange-300 text-center">
                  <StreamlineStars className="w-6 h-6 text-orange-600 mx-auto mb-1" />
                  <div className="font-bold text-xs text-orange-950">Site Creator</div>
                  <div className="text-[10px] text-orange-800">Lead Developer</div>
                </div>
              )}

              <div className="p-3 rounded-2xl bg-white border border-[#EADCCB] text-center">
                <StreamlineCoffee className="w-6 h-6 text-[#FD9A4D] mx-auto mb-1" />
                <div className="font-bold text-xs text-[#3A2E22]">Cafe Regular</div>
                <div className="text-[10px] text-tan-600">Active Explorer</div>
              </div>

              <div className="p-3 rounded-2xl bg-white border border-[#EADCCB] text-center">
                <StreamlineBook className="w-6 h-6 text-[#FD9A4D] mx-auto mb-1" />
                <div className="font-bold text-xs text-[#3A2E22]">Story Scholar</div>
                <div className="text-[10px] text-tan-600">Reader Club</div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Ribbon */}
        <div
          className="px-6 py-3 border-t flex items-center justify-between text-xs"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
            color: 'var(--text-muted, #8f6b48)',
          }}
        >
          {isViewingSelf && user ? (
            <button
              type="button"
              onClick={async () => {
                await signOut();
                closeProfile();
              }}
              className="px-3.5 py-1.5 rounded-xl border border-rose-200 bg-rose-50 hover:bg-rose-100 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer shadow-xs active:scale-95"
              title="Sign out of your account"
            >
              <StreamlineLogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          ) : (
            <span className="font-mono text-[11px]">Jinssi Gaming Member</span>
          )}

          <button
            type="button"
            onClick={closeProfile}
            className="px-4 py-1.5 rounded-xl font-bold bg-white border border-tan-300 hover:border-peach-400 transition-colors cursor-pointer text-[#3A2E22] shadow-xs"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

