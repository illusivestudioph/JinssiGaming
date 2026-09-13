import React, { useState } from 'react';
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
} from '@/components/StreamlineIcons';

export function RedditProfileModal() {
  const { activeProfileUser, closeProfile, isFriend, addFriend, removeFriend, openDmWith } =
    useChat();
  const { user, triggerAuthPrompt } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'comments' | 'trophies'>('overview');
  const [toast, setToast] = useState<string | null>(null);

  if (!activeProfileUser) return null;

  const isAlreadyFriend = isFriend(activeProfileUser.id) || isFriend(activeProfileUser.username);

  const handleToggleFriend = () => {
    if (!user) {
      triggerAuthPrompt('Sign in with Gmail to add friends and view your social buddy list.');
      return;
    }

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

  const cakeDayFormatted = new Date(activeProfileUser.joinedAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="relative w-full max-w-lg rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2"
        style={{
          backgroundColor: 'var(--card-bg, #fefcf7)',
          borderColor: 'var(--card-border, #5e5148)',
        }}
      >
        {/* Cover Banner Header (Reddit Style) */}
        <div
          className="relative h-32 sm:h-36 w-full flex items-end p-4 border-b overflow-hidden"
          style={{
            background: activeProfileUser.isCreator
              ? 'linear-gradient(135deg, #FD9A4D 0%, #E07A2B 50%, #B05A1D 100%)'
              : 'linear-gradient(135deg, #4A312C 0%, #6A5747 50%, #8F6B48 100%)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          {/* Subtle Grid / Texture */}
          <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]" />

          {/* Close Button */}
          <button
            type="button"
            onClick={closeProfile}
            className="absolute top-3 right-3 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors cursor-pointer"
            title="Close Profile"
          >
            <StreamlineClose className="w-4 h-4" />
          </button>

          {/* Banner Tag */}
          <span className="relative z-10 text-[10px] font-black uppercase tracking-widest px-2.5 py-0.5 rounded-full bg-black/40 text-white/90 border border-white/20">
            {activeProfileUser.isCreator ? 'Creator & Developer Profile' : 'Community Explorer'}
          </span>
        </div>

        {/* Profile Card Header Info */}
        <div
          className="px-6 pt-0 pb-4 border-b flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4 -mt-10 relative z-20"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-end gap-3.5">
            <div className="relative shrink-0">
              <CozyAvatar
                config={activeProfileUser.avatarConfig}
                size={88}
                className="shadow-xl rounded-full border-4 border-white"
              />
              {activeProfileUser.isCreator && (
                <div
                  className="absolute -bottom-1 -right-1 p-1 rounded-full shadow-md border-2 border-white"
                  style={{ backgroundColor: '#FD9A4D', color: '#fff' }}
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

          {/* Action Buttons: Add Friend / DM */}
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
        </div>

        {/* Stats Strip (Karma & Cake Day) */}
        <div
          className="px-6 py-2.5 border-b flex items-center justify-between text-xs font-semibold"
          style={{
            backgroundColor: 'var(--card-bg, #fefcf7)',
            borderColor: 'var(--card-line, #ebdcc9)',
            color: 'var(--text-muted, #8f6b48)',
          }}
        >
          <div className="flex items-center gap-1.5">
            <span className="font-extrabold text-[#FD9A4D]">
              {activeProfileUser.karma.toLocaleString()}
            </span>
            <span>Cozy Karma</span>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-[11px]">
            <StreamlineCalendar className="w-3.5 h-3.5 text-tan-500" />
            <span>Cake Day: {cakeDayFormatted}</span>
          </div>
        </div>

        {/* Toast Notification */}
        {toast && (
          <div className="bg-[#649058] text-white text-xs font-bold px-4 py-1.5 text-center animate-fade-in flex items-center justify-center gap-1">
            <StreamlineCheck className="w-3.5 h-3.5" />
            <span>{toast}</span>
          </div>
        )}

        {/* Reddit-Style Navigation Tabs */}
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
          <span className="font-mono text-[11px]">Jinssi Gaming Member</span>
          <button
            type="button"
            onClick={closeProfile}
            className="px-4 py-1.5 rounded-xl font-bold bg-white border border-tan-300 hover:border-peach-400 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
