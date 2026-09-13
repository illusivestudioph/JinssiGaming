import React, { useState, useEffect } from 'react';
import {
  X,
  User,
  Sparkles,
  Award,
  BookOpen,
  MessageSquare,
  LogOut,
  Check,
  Edit3,
  Calendar,
  LogIn,
  Compass,
  Gamepad2,
  Coffee,
  Moon,
} from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { CommunityBadge } from '@/types/profile';

const BADGE_CONFIGS: { name: CommunityBadge; icon: React.ComponentType<{ className?: string }> }[] = [
  { name: 'Cozy Explorer', icon: Compass },
  { name: 'Bookworm', icon: BookOpen },
  { name: 'Retro Gamer', icon: Gamepad2 },
  { name: 'Cafe Regular', icon: Coffee },
  { name: 'Midnight Scholar', icon: Moon },
  { name: 'Tea Brewer', icon: Sparkles },
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

  const joinedFormatted = new Date(profile.joinedAt).toLocaleDateString('en-US', {
    month: 'short',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in">
      <div className="relative w-full max-w-md bg-cream-100 dark:bg-stone-900 border-2 border-tan-300 dark:border-stone-700 rounded-3xl shadow-cozy-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header Ribbon */}
        <div className="relative px-6 py-4 bg-gradient-to-r from-[#FEE4CB] via-[#FFF2E2] to-[#E2F0D9] dark:from-stone-800 dark:to-stone-800 border-b border-tan-200 dark:border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-peach-600 dark:text-peach-400" />
            <h3 className="font-display font-bold text-lg text-ink-900 dark:text-cream-50">
              Cozy Member Profile
            </h3>
          </div>
          <button
            type="button"
            onClick={() => setShowProfileModal(false)}
            className="p-1.5 rounded-full hover:bg-black/10 dark:hover:bg-stone-700 text-tan-700 dark:text-tan-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toast Alert */}
        {toast && (
          <div className="bg-emerald-500 text-white text-xs font-bold px-4 py-2 text-center animate-fade-in flex items-center justify-center gap-1.5 shadow-sm">
            <Check className="w-3.5 h-3.5" />
            <span>{toast}</span>
          </div>
        )}

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Avatar Card Showcase */}
          <div className="flex flex-col items-center justify-center p-5 bg-cream-50 dark:bg-stone-800/60 rounded-2xl border border-tan-200 dark:border-stone-700 shadow-inner">
            <div className="relative">
              <CozyAvatar config={profile.avatarConfig} size={92} className="shadow-cozy-md" />
              <button
                type="button"
                onClick={() => setShowAvatarBuilder(true)}
                className="absolute -bottom-1 -right-1 px-2.5 py-1 bg-peach-500 hover:bg-peach-600 text-white text-[11px] font-bold rounded-full shadow-md flex items-center gap-1 transition-transform active:scale-95"
                title="Open Avatar Builder"
              >
                <Edit3 className="w-3 h-3" />
                <span>Edit</span>
              </button>
            </div>

            <div className="mt-3 text-center">
              <h4 className="font-display font-bold text-base text-ink-900 dark:text-cream-50">
                @{profile.username}
              </h4>
              <span className="inline-block mt-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 border border-amber-300/60 dark:border-amber-700/50">
                {profile.badge}
              </span>
            </div>

            {/* Member Joined Date */}
            <div className="flex items-center gap-1.5 text-[11px] text-tan-500 dark:text-tan-400 mt-2 font-mono">
              <Calendar className="w-3 h-3" />
              <span>Joined {joinedFormatted}</span>
            </div>
          </div>

          {/* Guest Sign-In Notice */}
          {!user && (
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 text-center">
              <p className="text-xs font-bold text-amber-900 dark:text-amber-200 mb-1">
                You are currently browsing as a Guest 🌱
              </p>
              <p className="text-[11px] text-amber-700 dark:text-amber-300 mb-3">
                Sign in with Gmail whenever you want to comment on games or contribute books to the shelf!
              </p>
              <button
                type="button"
                onClick={signInWithGoogle}
                className="w-full py-2.5 px-4 bg-white dark:bg-stone-800 hover:bg-cream-50 dark:hover:bg-stone-700 border-2 border-tan-300 dark:border-stone-600 rounded-xl font-bold text-xs text-ink-900 dark:text-cream-100 shadow-cozy-xs flex items-center justify-center gap-2.5 transition-all active:scale-98"
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
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-1.5">
                Username / Display Name
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2.5 text-xs text-tan-400 font-mono">@</span>
                <input
                  type="text"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  maxLength={20}
                  placeholder="Your cozy name"
                  className="w-full pl-7 pr-3 py-2 text-xs font-bold rounded-xl bg-white dark:bg-stone-800 border border-tan-200 dark:border-stone-700 text-ink-900 dark:text-cream-100 focus:outline-none focus:border-peach-400"
                />
              </div>
              <p className="text-[10px] text-tan-500 mt-1">Letters, numbers, and underscores only</p>
            </div>

            {/* Cozy Bio */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-1.5">
                Cozy Bio / Tagline
              </label>
              <textarea
                value={bioInput}
                onChange={(e) => setBioInput(e.target.value)}
                maxLength={90}
                rows={2}
                placeholder="What games or books are you enjoying?"
                className="w-full p-2.5 text-xs rounded-xl bg-white dark:bg-stone-800 border border-tan-200 dark:border-stone-700 text-ink-900 dark:text-cream-100 focus:outline-none focus:border-peach-400 resize-none"
              />
            </div>

            {/* Badge Picker */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-1.5">
                Community Badge
              </label>
              <div className="grid grid-cols-2 gap-1.5">
                {BADGE_CONFIGS.map(({ name, icon: Icon }) => {
                  const isSelected = selectedBadge === name;
                  return (
                    <button
                      key={name}
                      type="button"
                      onClick={() => setSelectedBadge(name)}
                      className={`p-2 rounded-xl text-left text-[11px] font-bold border transition-all flex items-center gap-2 truncate ${
                        isSelected
                          ? 'bg-amber-100 dark:bg-amber-950/70 border-amber-400 text-amber-900 dark:text-amber-200 shadow-xs'
                          : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                      }`}
                    >
                      <Icon className="w-3.5 h-3.5 shrink-0 text-amber-600 dark:text-amber-400" />
                      <span className="truncate">{name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-xl bg-peach-500 hover:bg-peach-600 text-white font-bold text-xs shadow-cozy-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Check className="w-4 h-4" />
              <span>Save Profile Changes</span>
            </button>
          </form>

          {/* Signed-in Account Details & Sign Out */}
          {user && (
            <div className="pt-4 border-t border-tan-200 dark:border-stone-700 flex items-center justify-between">
              <div className="min-w-0">
                <span className="text-[10px] uppercase font-bold text-tan-500 block">Signed in as</span>
                <span className="text-xs font-mono text-ink-800 dark:text-cream-200 truncate block">
                  {user.email}
                </span>
              </div>
              <button
                type="button"
                onClick={signOut}
                className="px-3 py-1.5 rounded-xl border border-rose-300 dark:border-rose-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-rose-600 dark:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
