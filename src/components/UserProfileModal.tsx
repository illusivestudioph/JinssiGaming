import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { CommunityBadge } from '@/types/profile';
import {
  StreamlineUser,
  StreamlineStars,
  StreamlineCompass,
  StreamlineBook,
  StreamlineGamepad,
  StreamlineCoffee,
  StreamlineMoon,
  StreamlinePencil,
  StreamlineCalendar,
  StreamlineClose,
  StreamlineCheck,
  StreamlineLogOut,
} from '@/components/StreamlineIcons';

const BADGE_CONFIGS: { name: CommunityBadge; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Cozy Explorer', icon: StreamlineCompass },
  { name: 'Bookworm', icon: StreamlineBook },
  { name: 'Retro Gamer', icon: StreamlineGamepad },
  { name: 'Cafe Regular', icon: StreamlineCoffee },
  { name: 'Midnight Scholar', icon: StreamlineMoon },
  { name: 'Tea Brewer', icon: StreamlineStars },
];

export function UserProfileModal() {
  const {
    user,
    profile,
    updateProfile,
    signInWithGoogle,
    signOut,
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
      <div className="relative w-full max-w-md bg-[#FFFDF9] border-2 border-[#5E5148] rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="px-6 py-4 bg-gradient-to-r from-[#FFF5EC] via-[#FFFBF5] to-[#F3F9F0] border-b-2 border-[#E8D9C8] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-2xl bg-[#FFE4CE] border-2 border-[#FD9A4D]/40 flex items-center justify-center text-[#E07A2B] shadow-xs">
              <StreamlineUser className="w-5 h-5 text-[#E07A2B]" />
            </div>
            <h3 className="font-display font-bold text-lg text-[#3A2E22]">
              Cozy Member Profile
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowProfileModal(false)}
            className="p-2 rounded-full hover:bg-[#F2E4D4] text-[#7A6858] hover:text-[#3A2E22] transition-colors cursor-pointer"
            title="Close modal"
          >
            <StreamlineClose className="w-4 h-4 text-[#7A6858]" />
          </button>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div className="bg-emerald-600 text-white text-xs font-bold px-4 py-2 text-center animate-fade-in flex items-center justify-center gap-1.5 shadow-sm">
            <StreamlineCheck className="w-4 h-4" />
            <span>{toast}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 bg-[#FFFDF9]">
          {/* Avatar Card Showcase */}
          <div className="flex flex-col items-center justify-center p-5 bg-[#FAF4ED] rounded-2xl border-2 border-[#EADCCB] shadow-inner">
            <div className="relative">
              <CozyAvatar config={profile.avatarConfig} size={96} className="shadow-md rounded-full border-2 border-white" />
              <button
                type="button"
                onClick={handleOpenAvatarStudio}
                className="absolute -bottom-1 -right-1 px-3 py-1 bg-[#FD9A4D] hover:bg-[#E88735] text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer border border-white"
                title="Open Avatar Character Studio"
              >
                <StreamlinePencil className="w-3.5 h-3.5" />
                <span>Edit</span>
              </button>
            </div>

            <div className="mt-3 text-center">
              <h4 className="font-display font-bold text-base text-[#3A2E22]">
                @{profile.username}
              </h4>
              <span className="inline-block mt-1 text-[11px] font-bold px-3 py-0.5 rounded-full bg-[#FFF0E2] text-[#E07A2B] border border-[#FD9A4D]/40">
                {profile.badge}
              </span>
            </div>

            {/* Member Joined Date */}
            <div className="flex items-center gap-1.5 text-[11px] text-[#7A6858] mt-2 font-mono font-medium">
              <StreamlineCalendar className="w-3.5 h-3.5 text-[#FD9A4D]" />
              <span>Joined {joinedFormatted}</span>
            </div>
          </div>

          {/* Guest Sign-In Notice */}
          {!user && (
            <div className="p-4 rounded-2xl bg-[#FFF9F2] border-2 border-[#FBD9BC] text-center">
              <p className="text-xs font-bold text-[#3A2E22] mb-1">
                You are currently browsing as a Guest 🌱
              </p>
              <p className="text-[11px] text-[#7A6858] mb-3 leading-relaxed font-medium">
                Sign in with Gmail whenever you want to comment on games or contribute books to the shelf!
              </p>
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full py-2.5 px-4 bg-white hover:bg-[#FFFDFB] border-2 border-[#EADCCB] hover:border-[#FD9A4D] rounded-xl font-bold text-xs text-[#3A2E22] shadow-xs flex items-center justify-center gap-2.5 transition-all active:scale-98 cursor-pointer"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-1.5">
                Username / Display Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-[#8A7565] font-mono">@</span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  maxLength={20}
                  placeholder="Your cozy name"
                  className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl bg-white border-2 border-[#EADCCB] text-[#3A2E22] focus:border-[#FD9A4D] focus:ring-2 focus:ring-[#FD9A4D]/20 focus:outline-none shadow-xs transition-all"
                />
              </div>
              <p className="text-[10px] text-[#7A6858] mt-1 font-medium">Letters, numbers, and underscores only</p>
            </div>

            {/* Cozy Bio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-1.5">
                Cozy Bio / Tagline
              </label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                maxLength={90}
                rows={2}
                placeholder="What games or books are you enjoying?"
                className="w-full p-2.5 text-xs rounded-xl bg-white border-2 border-[#EADCCB] text-[#3A2E22] focus:border-[#FD9A4D] focus:ring-2 focus:ring-[#FD9A4D]/20 focus:outline-none resize-none shadow-xs font-medium transition-all"
              />
            </div>

            {/* Badge Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-1.5">
                Community Badge
              </label>
              <div className="grid grid-cols-2 gap-2">
                {BADGE_CONFIGS.map(({ name, icon: Icon }) => {
                  const isSelected = selectedBadge === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedBadge(name)}
                      className={`p-2.5 rounded-xl text-left text-[11px] font-bold border-2 transition-all flex items-center gap-2.5 truncate cursor-pointer ${
                        isSelected
                          ? 'bg-[#FD9A4D] text-white border-[#E07A2B] shadow-xs'
                          : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] hover:bg-[#FFFDFB]'
                      }`}
                    >
                      <Icon className={`w-4 h-4 shrink-0 ${isSelected ? 'text-white' : 'text-[#FD9A4D]'}`} />
                      <span className="truncate">{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-[#FD9A4D] hover:bg-[#E88735] text-white font-bold text-xs shadow-xs transition-all active:scale-98 flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <StreamlineCheck className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>

          {/* Signed-in Account Details & Sign Out */}
          {user && (
            <div className="pt-4 border-t-2 border-[#E8D9C8] flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-[#7A6858] block">Signed in as</span>
                <span className="text-xs font-mono text-[#3A2E22] truncate block font-medium">
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
