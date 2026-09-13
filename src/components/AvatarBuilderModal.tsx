import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { AdventurerConfig, getAdventurerAvatarUrl } from '@/types/profile';
import {
  StreamlinePalette,
  StreamlineDice,
  StreamlineClose,
  StreamlineCheck,
} from '@/components/StreamlineIcons';

const HAIRSTYLES: { id: string; label: string; category: string }[] = [
  { id: 'short01', label: 'Sleek Part', category: 'Short' },
  { id: 'short02', label: 'Messy Crop', category: 'Short' },
  { id: 'short03', label: 'Side Wave', category: 'Short' },
  { id: 'short04', label: 'Undercut', category: 'Short' },
  { id: 'short05', label: 'Spiky Shag', category: 'Short' },
  { id: 'short06', label: 'Curtains', category: 'Short' },
  { id: 'long01', label: 'Flowing Locks', category: 'Long' },
  { id: 'long02', label: 'Twin Braids', category: 'Long' },
  { id: 'long03', label: 'High Ponytail', category: 'Long' },
  { id: 'long04', label: 'Half-up Bun', category: 'Long' },
  { id: 'long05', label: 'Bob Cut', category: 'Long' },
];

const HAIR_COLORS: { id: string; label: string; hex: string }[] = [
  { id: '2c1b18', label: 'Midnight', hex: '#2C1B18' },
  { id: '4a312c', label: 'Espresso', hex: '#4A312C' },
  { id: 'e5a075', label: 'Chestnut', hex: '#E5A075' },
  { id: 'd6b370', label: 'Honey Blonde', hex: '#D6B370' },
  { id: '85c446', label: 'Matcha Green', hex: '#85C446' },
  { id: 'f59797', label: 'Sakura Pink', hex: '#F59797' },
  { id: '9287ff', label: 'Lavender Mist', hex: '#9287FF' },
  { id: 'b2bec3', label: 'Mystic Silver', hex: '#B2BEC3' },
];

const SKIN_TONES: { id: string; label: string; hex: string }[] = [
  { id: 'ecaca3', label: 'Porcelain', hex: '#ECACA3' },
  { id: 'f2d3b1', label: 'Warm Peach', hex: '#F2D3B1' },
  { id: 'd08b5b', label: 'Golden Olive', hex: '#D08B5B' },
  { id: 'ae5d29', label: 'Caramel Honey', hex: '#AE5D29' },
  { id: '614335', label: 'Deep Cocoa', hex: '#614335' },
];

const EYES: { id: string; label: string }[] = [
  { id: 'variant01', label: 'Curious' },
  { id: 'variant02', label: 'Gentle Focus' },
  { id: 'variant03', label: 'Playful Wink' },
  { id: 'variant04', label: 'Determined' },
  { id: 'variant05', label: 'Calm Scholar' },
  { id: 'variant06', label: 'Wide Wonder' },
];

const MOUTHS: { id: string; label: string }[] = [
  { id: 'variant01', label: 'Gentle Smile' },
  { id: 'variant02', label: 'Joyful Grin' },
  { id: 'variant03', label: 'Subtle Smirk' },
  { id: 'variant04', label: 'Thoughtful' },
  { id: 'variant05', label: 'Open Laugh' },
  { id: 'variant06', label: 'Cozy Rest' },
];

const GLASSES: { id: string; label: string }[] = [
  { id: 'none', label: 'No Spectacles' },
  { id: 'variant01', label: 'Classic Wire' },
  { id: 'variant02', label: 'Round Scholar' },
  { id: 'variant03', label: 'Retro Bold' },
  { id: 'variant04', label: 'Reading Half-Moons' },
  { id: 'variant05', label: 'Aviators' },
];

const FEATURES: { id: string; label: string }[] = [
  { id: 'none', label: 'Clean' },
  { id: 'blush', label: 'Rosy Cheeks' },
  { id: 'freckles', label: 'Sun Freckles' },
];

const BACKGROUND_COLORS: { id: string; label: string; hex: string }[] = [
  { id: 'ffd7b5', label: 'Vanilla Peach', hex: '#FFD7B5' },
  { id: 'b6e3f4', label: 'Rainy Sky', hex: '#B6E3F4' },
  { id: 'c0aede', label: 'Sweet Lavender', hex: '#C0AEDE' },
  { id: 'd1f2d9', label: 'Matcha Mint', hex: '#D1F2D9' },
  { id: 'ffd5dc', label: 'Sakura Rose', hex: '#FFD5DC' },
  { id: '2b231e', label: 'Midnight Cafe', hex: '#2B231E' },
];

type CustomizerTab = 'hair' | 'skin' | 'face' | 'accessories' | 'backdrop';

export function AvatarBuilderModal() {
  const { profile, updateProfile, showAvatarBuilder, setShowAvatarBuilder, setShowProfileModal } = useAuth();
  const [activeTab, setActiveTab] = useState<CustomizerTab>('hair');

  const [draftConfig, setDraftConfig] = useState<AdventurerConfig>(() => ({
    ...profile.avatarConfig,
  }));

  if (!showAvatarBuilder) return null;

  const handleClose = () => {
    setShowAvatarBuilder(false);
    setShowProfileModal(true);
  };

  const handleSave = () => {
    updateProfile({ avatarConfig: draftConfig });
    setShowAvatarBuilder(false);
    setShowProfileModal(true);
  };

  const handleRandomize = () => {
    const randomHair = HAIRSTYLES[Math.floor(Math.random() * HAIRSTYLES.length)].id;
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id;
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id;
    const randomEyes = EYES[Math.floor(Math.random() * EYES.length)].id;
    const randomMouth = MOUTHS[Math.floor(Math.random() * MOUTHS.length)].id;
    const randomGlasses = Math.random() > 0.6 ? GLASSES[1 + Math.floor(Math.random() * (GLASSES.length - 1))].id : 'none';
    const randomFeature = Math.random() > 0.4 ? (Math.random() > 0.5 ? 'blush' : 'freckles') : 'none';
    const randomBg = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)].id;

    setDraftConfig((prev) => ({
      ...prev,
      hair: randomHair,
      hairColor: randomHairColor,
      skinColor: randomSkin,
      eyes: randomEyes,
      mouth: randomMouth,
      glasses: randomGlasses,
      features: randomFeature,
      backgroundColor: randomBg,
      useGooglePhoto: false,
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[92vh] border-2"
        style={{
          backgroundColor: 'var(--card-bg, #fefcf7)',
          borderColor: 'var(--card-border, #5e5148)',
        }}
      >
        {/* Header Ribbon */}
        <div
          className="px-6 py-4 border-b flex items-center justify-between"
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
              <StreamlinePalette className="w-5 h-5" />
            </div>
            <div>
              <h3
                className="font-display font-bold text-lg"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                Adventurer Character Studio
              </h3>
              <p
                className="text-xs font-medium"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Customize your illustrated persona with authentic hand-drawn vector artwork
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="p-2 rounded-full hover:opacity-80 transition-colors cursor-pointer"
            style={{ color: 'var(--text-muted, #8f6b48)' }}
          >
            <StreamlineClose className="w-5 h-5" />
          </button>
        </div>

        {/* Top Showcase Preview Banner */}
        <div
          className="p-6 border-b flex flex-col sm:flex-row items-center gap-5 justify-between"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={handleRandomize} title="Click to randomize!">
              <CozyAvatar
                config={draftConfig}
                size={104}
                className="transform transition-transform group-hover:scale-105 shadow-md rounded-full border-2 border-white"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRandomize();
                }}
                className="absolute -bottom-1 -right-1 p-2 rounded-full shadow-md transition-all active:rotate-180"
                style={{
                  backgroundColor: 'var(--theme-accent, #fd9a4d)',
                  color: 'var(--theme-accent-text, #ffffff)',
                }}
                title="Roll Random Character"
              >
                <StreamlineDice className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <span
                className="text-[10px] font-extrabold uppercase tracking-widest px-2.5 py-0.5 rounded-md border"
                style={{
                  backgroundColor: 'var(--section-kicker-bg, #fcf3b9)',
                  borderColor: 'var(--section-kicker-border, #fcb274)',
                  color: 'var(--section-kicker-color, #b05a1d)',
                }}
              >
                Illustrated Adventurer
              </span>
              <h4
                className="font-display font-bold text-base mt-1"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                @{profile.username}
              </h4>
              <p
                className="text-xs"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                {HAIRSTYLES.find((h) => h.id === draftConfig.hair)?.label} • {HAIR_COLORS.find((c) => c.id === draftConfig.hairColor)?.label}
              </p>
            </div>
          </div>

          {/* Quick Randomize & Reset */}
          <button
            type="button"
            onClick={handleRandomize}
            className="px-4 py-2 rounded-xl border-2 text-xs font-bold shadow-xs flex items-center gap-2 transition-all active:scale-95 cursor-pointer"
            style={{
              backgroundColor: 'var(--card-bg, #ffffff)',
              borderColor: 'var(--card-line, #ebdcc9)',
              color: 'var(--text-main, #3a2e22)',
            }}
          >
            <StreamlineDice className="w-4 h-4" style={{ color: 'var(--theme-accent, #fd9a4d)' }} />
            <span>Roll Random Persona</span>
          </button>
        </div>

        {/* Customization Navigation Tabs */}
        <div
          className="flex border-b px-6 gap-2 overflow-x-auto text-xs font-bold"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          {[
            { id: 'hair', label: 'Hairstyle' },
            { id: 'skin', label: 'Skin & Eyes' },
            { id: 'face', label: 'Expression' },
            { id: 'accessories', label: 'Spectacles & Accents' },
            { id: 'backdrop', label: 'Backdrop' },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CustomizerTab)}
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap cursor-pointer ${
                  isActive ? 'font-extrabold' : 'border-transparent'
                }`}
                style={{
                  borderColor: isActive ? 'var(--theme-accent, #fd9a4d)' : 'transparent',
                  color: isActive ? 'var(--theme-accent, #fd9a4d)' : 'var(--text-muted, #8f6b48)',
                }}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div
          className="p-6 overflow-y-auto space-y-6 flex-1"
          style={{ backgroundColor: 'var(--card-bg, #fefcf7)' }}
        >
          {/* TAB 1: HAIRSTYLE & COLOR */}
          {activeTab === 'hair' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Hair Style
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {HAIRSTYLES.map((h) => {
                    const isSelected = draftConfig.hair === h.id;
                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, hair: h.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-[#FD9A4D] text-white font-bold border-[#E07A2B] shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span className="truncate">{h.label}</span>
                        <span className={`text-[10px] ml-1 ${isSelected ? 'text-white/80' : 'text-[#8A7565]'}`}>
                          {h.category}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Hair Color
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {HAIR_COLORS.map((c) => {
                    const isSelected = draftConfig.hairColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, hairColor: c.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: SKIN & EYES */}
          {activeTab === 'skin' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Skin Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {SKIN_TONES.map((s) => {
                    const isSelected = draftConfig.skinColor === s.id;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, skinColor: s.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: s.hex }}
                        />
                        <span className="truncate">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Eye Focus & Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EYES.map((e) => {
                    const isSelected = draftConfig.eyes === e.id;
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, eyes: e.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-[#FD9A4D] text-white font-bold border-[#E07A2B] shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span className="truncate block">{e.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: EXPRESSION */}
          {activeTab === 'face' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Mouth & Smile Expression
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOUTHS.map((m) => {
                    const isSelected = draftConfig.mouth === m.id;
                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, mouth: m.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-[#FD9A4D] text-white font-bold border-[#E07A2B] shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span className="truncate block">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SPECTACLES & ACCENTS */}
          {activeTab === 'accessories' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Spectacles & Glasses
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GLASSES.map((g) => {
                    const isSelected = draftConfig.glasses === g.id;
                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, glasses: g.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-[#FD9A4D] text-white font-bold border-[#E07A2B] shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span className="truncate block">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Facial Accents
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {FEATURES.map((f) => {
                    const isSelected = draftConfig.features === f.id;
                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, features: f.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-[#FD9A4D] text-white font-bold border-[#E07A2B] shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span className="truncate block">{f.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: BACKDROP & GOOGLE SYNC */}
          {activeTab === 'backdrop' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Mood Background Color
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {BACKGROUND_COLORS.map((bg) => {
                    const isSelected = draftConfig.backgroundColor === bg.id;
                    return (
                      <button
                        key={bg.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, backgroundColor: bg.id, useGooglePhoto: false }))}
                        className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: bg.hex }}
                        />
                        <span className="truncate">{bg.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Profile Photo Option */}
              {draftConfig.googleAvatarUrl && (
                <div className="pt-3 border-t border-[#E8D9C8]">
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                    Google Photo Alternative
                  </label>
                  <button
                    type="button"
                    onClick={() => setDraftConfig((prev) => ({ ...prev, useGooglePhoto: true }))}
                    className={`w-full p-3 rounded-xl border-2 flex items-center gap-3 transition-all ${
                      draftConfig.useGooglePhoto
                        ? 'bg-[#FFF0E2] border-[#FD9A4D] text-[#3A2E22] font-bold shadow-xs'
                        : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                    }`}
                  >
                    <img
                      src={draftConfig.googleAvatarUrl}
                      alt="Google Avatar"
                      className="w-7 h-7 rounded-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <span className="text-xs">Use my Google Account Photo instead of an illustration</span>
                    {draftConfig.useGooglePhoto && (
                      <StreamlineCheck className="w-4 h-4 text-[#FD9A4D] ml-auto font-bold" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div
          className="px-6 py-3.5 border-t flex items-center justify-end gap-3"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <button
            type="button"
            onClick={handleClose}
            className="px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer hover:opacity-80"
            style={{ color: 'var(--text-muted, #8f6b48)' }}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl text-xs font-bold shadow-md flex items-center gap-1.5 transition-colors active:scale-95 cursor-pointer"
            style={{
              backgroundColor: 'var(--theme-accent, #fd9a4d)',
              color: 'var(--theme-accent-text, #ffffff)',
            }}
          >
            <StreamlineCheck className="w-4 h-4" />
            <span>Save Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
