import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { CommunityBadge } from '@/types/profile';
import {
  StreamlineUser,
  StreamlineCompassDuo,
  StreamlineBookDuo,
  StreamlineGameboyDuo,
  StreamlineCoffeeDuo,
  StreamlineMoonDuo,
  StreamlineLeafDuo,
  StreamlinePencil,
  StreamlineCalendar,
  StreamlineClose,
  StreamlineCheck,
  StreamlineLogOut,
  StreamlineStars,
} from '@/components/StreamlineIcons';

const BADGE_CONFIGS: { name: CommunityBadge; icon: React.ComponentType<{ className?: string }>; creatorOnly?: boolean }[] = [
  { name: 'Creator & Developer', icon: StreamlineStars, creatorOnly: true },
  { name: 'Cozy Explorer', icon: StreamlineCompassDuo },
  { name: 'Bookworm', icon: StreamlineBookDuo },
  { name: 'Retro Gamer', icon: StreamlineGameboyDuo },
  { name: 'Cafe Regular', icon: StreamlineCoffeeDuo },
  { name: 'Midnight Scholar', icon: StreamlineMoonDuo },
  { name: 'Tea Brewer', icon: StreamlineLeafDuo },
];

export function UserProfileModal() {
  const {
    user,
    profile,
    updateProfile,
    signInWithGoogle,
    signOut,
    rememberMe,
    setRememberMe,
    showProfileModal,
    setShowProfileModal,
    setShowAvatarBuilder,
  } = useAuth();

  const [usernameInput, setUsernameInput] = useState(profile.username);
  const [bioInput, setBioInput] = useState(profile.bio);
  const [selectedBadge, setSelectedBadge] = useState<CommunityBadge>(profile.badge);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    setUsernameInput(profile.username);
    setBioInput(profile.bio);
    setSelectedBadge(profile.badge);
  }, [profile]);

  if (!showProfileModal) return null;

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanName = usernameInput.trim().replace(/[^a-zA-Z0-9_-]/g, '') || 'CozyPlayer';
    await updateProfile({
      username: cleanName,
      bio: bioInput.trim() || 'Cozy player & reader 🍵',
      badge: selectedBadge,
    });
    setToast('Profile saved successfully!');
    setTimeout(() => setToast(null), 2500);
  };

  const handleOpenAvatarStudio = () => {
    setShowProfileModal(false);
    setShowAvatarBuilder(true);
  };

  const joinedFormatted = new Date(profile.joinedAt).toLocaleDateString('en-US', {
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
        {/* Header Ribbon */}
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
              Cozy Member Profile
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowProfileModal(false)}
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
            className="text-xs font-bold px-4 py-2 text-center animate-fade-in flex items-center justify-center gap-1.5 shadow-sm"
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
          className="p-6 overflow-y-auto space-y-6 flex-1"
          style={{ backgroundColor: 'var(--card-bg, #fefcf7)' }}
        >
          {/* Avatar Card Showcase */}
          <div
            className="flex flex-col items-center justify-center p-5 rounded-2xl border-2 shadow-inner"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            <div className="relative">
              <CozyAvatar config={profile.avatarConfig} size={96} className="shadow-md rounded-full border-2 border-white" />
              <button
                type="button"
                onClick={handleOpenAvatarStudio}
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
            </div>

            <div className="mt-3 text-center">
              <h4
                className="font-display font-bold text-base flex items-center justify-center gap-1.5"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                <span>@{profile.username}</span>
                {profile.isCreator && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-peach-100 border border-peach-300 text-peach-700 font-extrabold shadow-xs">
                    🌸 Developer
                  </span>
                )}
              </h4>
              <span
                className="inline-block mt-1 text-[11px] font-bold px-3 py-0.5 rounded-full border"
                style={{
                  backgroundColor: profile.isCreator ? '#fff5eb' : 'var(--section-kicker-bg, #fcf3b9)',
                  borderColor: profile.isCreator ? '#f97316' : 'var(--section-kicker-border, #fcb274)',
                  color: profile.isCreator ? '#ea580c' : 'var(--section-kicker-color, #b05a1d)',
                }}
              >
                {profile.badge}
              </span>

              {profile.isCreator && (
                <div className="mt-2.5 flex justify-center">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-peach-500 text-white text-[11px] font-extrabold shadow-cozy-sm">
                    <StreamlineStars className="w-3.5 h-3.5 fill-white text-white" />
                    <span>Site Creator & Lead Developer</span>
                  </div>
                </div>
              )}
            </div>

            {/* Member Joined Date */}
            <div
              className="flex items-center gap-1.5 text-[11px] mt-2 font-mono font-medium"
              style={{ color: 'var(--text-muted, #8f6b48)' }}
            >
              <StreamlineCalendar className="w-3.5 h-3.5" style={{ color: 'var(--theme-accent, #fd9a4d)' }} />
              <span>Joined {joinedFormatted}</span>
            </div>
          </div>

          {/* Guest Sign-In Notice */}
          {!user && (
            <div
              className="p-4 rounded-2xl border-2 text-center"
              style={{
                backgroundColor: 'var(--card-done-bg, #fcf8ee)',
                borderColor: 'var(--card-line, #ebdcc9)',
              }}
            >
              <p
                className="text-xs font-bold mb-1"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                You are currently browsing as a Guest 🌱
              </p>
              <p
                className="text-[11px] mb-3 leading-relaxed font-medium"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Sign in with Gmail whenever you want to comment on games or contribute books to the shelf!
              </p>

              {/* Remember Me Toggle */}
              <label
                className="flex items-center justify-center gap-2 mb-3 text-xs font-semibold cursor-pointer select-none"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded cursor-pointer accent-peach-500"
                />
                <span>Remember me on this device</span>
              </label>

              <button
                type="button"
                onClick={() => signInWithGoogle(rememberMe)}
                className="w-full py-2.5 px-4 rounded-xl font-bold text-xs shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer border-2"
                style={{
                  backgroundColor: 'var(--card-bg, #ffffff)',
                  borderColor: 'var(--card-line, #ebdcc9)',
                  color: 'var(--text-main, #3a2e22)',
                }}
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Continue with Google</span>
              </button>
            </div>
          )}

          {/* Edit Profile Form */}
          <form onSubmit={handleSaveProfile} className="space-y-4">
            {/* Username Input */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Username / Display Name
              </label>
              <div className="relative">
                <span
                  className="absolute left-3 top-2.5 text-xs font-mono"
                  style={{ color: 'var(--text-muted, #8f6b48)' }}
                >
                  @
                </span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  maxLength={20}
                  placeholder="Your cozy name"
                  className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl border-2 shadow-xs transition-all outline-none"
                  style={{
                    backgroundColor: 'var(--input-bg, #ffffff)',
                    borderColor: 'var(--card-border, #5e5148)',
                    color: 'var(--text-main, #3a2e22)',
                  }}
                />
              </div>
              <p
                className="text-[10px] mt-1 font-medium"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Letters, numbers, and underscores only
              </p>
            </div>

            {/* Cozy Bio */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Cozy Bio / Tagline
              </label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                maxLength={90}
                rows={2}
                placeholder="What games or books are you enjoying?"
                className="w-full p-2.5 text-xs rounded-xl border-2 resize-none shadow-xs font-medium transition-all outline-none"
                style={{
                  backgroundColor: 'var(--input-bg, #ffffff)',
                  borderColor: 'var(--card-border, #5e5148)',
                  color: 'var(--text-main, #3a2e22)',
                }}
              />
            </div>

            {/* Badge Picker */}
            <div>
              <label
                className="block text-xs font-bold uppercase tracking-wider mb-1.5"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Community Badge
              </label>
              <div className="grid grid-cols-2 gap-2.5">
                {BADGE_CONFIGS.filter((b) => !b.creatorOnly || profile.isCreator).map(({ name, icon: Icon }) => {
                  const isSelected = selectedBadge === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedBadge(name)}
                      className={`p-2.5 rounded-2xl text-left text-xs font-bold border-2 transition-all flex items-center gap-3 cursor-pointer group select-none ${
                        isSelected
                          ? 'shadow-md scale-[1.02]'
                          : 'hover:scale-[1.01] hover:shadow-xs'
                      }`}
                      style={{
                        backgroundColor: isSelected ? 'var(--theme-accent, #fd9a4d)' : 'var(--card-bg, #ffffff)',
                        borderColor: isSelected ? 'var(--theme-accent, #fd9a4d)' : 'var(--card-line, #e2d4bf)',
                        color: isSelected ? 'var(--theme-accent-text, #ffffff)' : 'var(--text-main, #3a2e22)',
                      }}
                    >
                      <div
                        className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105"
                        style={{
                          backgroundColor: isSelected
                            ? 'rgba(255, 255, 255, 0.22)'
                            : 'var(--theme-accent-soft, #fcdfaa)',
                          color: isSelected
                            ? '#ffffff'
                            : 'var(--theme-accent, #fd9a4d)',
                        }}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="truncate font-display font-semibold text-xs tracking-wide">
                        {name}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl font-bold text-xs shadow-md transition-all active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{
                backgroundColor: 'var(--theme-accent, #fd9a4d)',
                color: 'var(--theme-accent-text, #ffffff)',
              }}
            >
              <StreamlineCheck className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>

          {/* Signed-in Account Details & Sign Out */}
          {user && (
            <div
              className="pt-4 border-t-2 flex items-center justify-between"
              style={{ borderColor: 'var(--card-line, #ebdcc9)' }}
            >
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
              <button
                type="button"
                onClick={signOut}
                className="px-3 py-1.5 rounded-xl border-2 border-rose-200 hover:bg-rose-50 text-rose-600 text-xs font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
              >
                <StreamlineLogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

