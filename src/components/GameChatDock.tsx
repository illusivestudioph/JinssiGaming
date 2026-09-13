import React, { useState, useRef, useEffect } from 'react';
import { useChat } from '@/context/ChatContext';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import {
  StreamlineClose,
  StreamlinePencil,
  StreamlineStars,
  StreamlineUsers,
  StreamlineCheck,
  StreamlineCalendar,
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
    sendMessage,
    openProfile,
    openDmWith,
  } = useChat();

  const { user, triggerAuthPrompt } = useAuth();
  const [inputText, setInputText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll to bottom on new message
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // If user is guest, they can chat in World Chat or prompt to login
    setIsSending(true);
    try {
      await sendMessage(inputText);
      setInputText('');
    } finally {
      setIsSending(false);
    }
  };

  const currentChannelMessages = messages.filter((m) => {
    if (channel === 'world') return m.channel === 'world';
    if (activeDmPartner) {
      return (
        m.channel === 'dm' &&
        ((m.senderId === activeDmPartner.id && m.receiverId) ||
          (m.receiverId === activeDmPartner.id && m.senderId))
      );
    }
    return m.channel === 'dm';
  });

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
          {/* Top MMO-Style Header & Channel Tabs */}
          <div
            className="p-3.5 border-b flex items-center justify-between"
            style={{
              backgroundColor: 'var(--card-done-bg, #fcf8ee)',
              borderColor: 'var(--card-line, #ebdcc9)',
            }}
          >
            {/* Channel Toggles */}
            <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-tan-200 shadow-2xs">
              <button
                type="button"
                onClick={() => {
                  setChannel('world');
                  setActiveDmPartner(null);
                }}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  channel === 'world'
                    ? 'bg-[#FD9A4D] text-white shadow-xs'
                    : 'text-tan-600 hover:bg-tan-50'
                }`}
              >
                World Chat
              </button>

              <button
                type="button"
                onClick={() => setChannel('dm')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                  channel === 'dm'
                    ? 'bg-[#FD9A4D] text-white shadow-xs'
                    : 'text-tan-600 hover:bg-tan-50'
                }`}
              >
                <span>DMs</span>
                {activeDmPartner && (
                  <span className="text-[10px] opacity-90 truncate max-w-[60px]">
                    @{activeDmPartner.username}
                  </span>
                )}
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

          {/* DM Partner Header Banner if in DM Mode */}
          {channel === 'dm' && activeDmPartner && (
            <div className="px-4 py-2 border-b bg-peach-50/50 border-peach-200 flex items-center justify-between text-xs">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={() =>
                  openProfile({
                    id: activeDmPartner.id,
                    username: activeDmPartner.username,
                    avatarConfig: activeDmPartner.avatarConfig,
                    badge: activeDmPartner.badge,
                    isCreator: activeDmPartner.isCreator,
                  })
                }
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
              <span className="text-xs font-bold text-[#3A2E22] block mb-2">
                Select a Friend to Message
              </span>
              <div className="flex gap-2 overflow-x-auto pb-1">
                {friends.length === 0 ? (
                  <span className="text-xs text-tan-500">No friends added yet. Click &ldquo;Add Friend&rdquo; on any user!</span>
                ) : (
                  friends.map((f) => (
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
                const isJinssi =
                  msg.senderIsCreator || msg.senderName.toLowerCase().includes('jinssi');

                return (
                  <div key={msg.id} className="flex items-start gap-2.5 group">
                    <button
                      type="button"
                      onClick={() =>
                        openProfile({
                          id: msg.senderId,
                          username: msg.senderName,
                          avatarConfig: msg.senderAvatar,
                          isCreator: isJinssi,
                        })
                      }
                      className="cursor-pointer shrink-0 transition-transform active:scale-95"
                      title={`View u/${msg.senderName}'s Profile`}
                    >
                      <CozyAvatar config={msg.senderAvatar} size={32} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 leading-none mb-1">
                        <button
                          type="button"
                          onClick={() =>
                            openProfile({
                              id: msg.senderId,
                              username: msg.senderName,
                              avatarConfig: msg.senderAvatar,
                              isCreator: isJinssi,
                            })
                          }
                          className="font-bold text-xs text-ink-900 hover:text-peach-600 cursor-pointer truncate"
                        >
                          @{msg.senderName}
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
                      </div>

                      <div
                        className={`text-xs px-3 py-2 rounded-2xl inline-block max-w-[92%] leading-relaxed ${
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

          {/* Bottom Chat Input Form */}
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
        </div>
      )}
    </div>
  );
}
