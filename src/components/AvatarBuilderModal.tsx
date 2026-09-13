import React, { useState } from 'react';
import { X, Sparkles, Check, RefreshCw, User, Wand2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { AdventurerConfig, getAdventurerAvatarUrl } from '@/types/profile';

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
  const { profile, updateProfile, showAvatarBuilder, setShowAvatarBuilder } = useAuth();
  const [activeTab, setActiveTab] = useState<CustomizerTab>('hair');

  const [draftConfig, setDraftConfig] = useState<AdventurerConfig>(() => ({
    ...profile.avatarConfig,
  }));

  if (!showAvatarBuilder) return null;

  const handleSave = () => {
    updateProfile({ avatarConfig: draftConfig });
    setShowAvatarBuilder(false);
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
      <div className="relative w-full max-w-xl bg-cream-100 dark:bg-stone-900 border-2 border-tan-300 dark:border-stone-700 rounded-3xl shadow-cozy-lg overflow-hidden flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-cream-50 via-cream-100 to-cream-50 dark:from-stone-800 dark:to-stone-800 border-b border-tan-200 dark:border-stone-700 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-peach-100 dark:bg-peach-900/40 flex items-center justify-center text-peach-600 dark:text-peach-400">
              <Wand2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-ink-900 dark:text-cream-50">
                Adventurer Character Studio
              </h3>
              <p className="text-[11px] text-tan-600 dark:text-tan-400 font-medium">
                Customize your illustrated persona with authentic hand-drawn vector artwork
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowAvatarBuilder(false)}
            className="p-1.5 rounded-full hover:bg-tan-200/60 dark:hover:bg-stone-700 text-tan-600 dark:text-tan-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Top Showcase Preview Banner */}
        <div className="p-6 bg-gradient-to-b from-cream-50 to-cream-100/60 dark:from-stone-800/80 dark:to-stone-900 border-b border-tan-200 dark:border-stone-700 flex flex-col sm:flex-row items-center gap-5 justify-between">
          <div className="flex items-center gap-4">
            <div className="relative group cursor-pointer" onClick={handleRandomize} title="Click to randomize!">
              <CozyAvatar
                config={draftConfig}
                size={104}
                className="transform transition-transform group-hover:scale-105 shadow-cozy-md"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRandomize();
                }}
                className="absolute -bottom-1 -right-1 p-2 bg-peach-500 hover:bg-peach-600 text-white rounded-full shadow-md transition-all active:rotate-180"
                title="Roll Random Character"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-widest text-peach-600 dark:text-peach-400 bg-peach-50 dark:bg-peach-950/60 px-2 py-0.5 rounded-md border border-peach-200 dark:border-peach-800">
                Illustrated Adventurer
              </span>
              <h4 className="font-display font-bold text-base text-ink-900 dark:text-cream-100 mt-1">
                @{profile.username}
              </h4>
              <p className="text-xs text-tan-600 dark:text-tan-400">
                {HAIRSTYLES.find((h) => h.id === draftConfig.hair)?.label} • {HAIR_COLORS.find((c) => c.id === draftConfig.hairColor)?.label}
              </p>
            </div>
          </div>

          {/* Quick Randomize & Reset */}
          <button
            type="button"
            onClick={handleRandomize}
            className="px-3.5 py-1.5 rounded-xl border border-tan-300 dark:border-stone-700 bg-white dark:bg-stone-800 hover:border-peach-400 text-xs font-bold text-ink-800 dark:text-cream-200 shadow-cozy-xs flex items-center gap-2 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-peach-500" />
            <span>Roll Random Persona</span>
          </button>
        </div>

        {/* Customization Navigation Tabs */}
        <div className="flex border-b border-tan-200 dark:border-stone-700 px-6 bg-cream-100 dark:bg-stone-900 gap-2 overflow-x-auto text-xs font-bold text-tan-600 dark:text-tan-400">
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
                className={`py-2.5 px-3 border-b-2 transition-all whitespace-nowrap ${
                  isActive
                    ? 'border-peach-500 text-peach-600 dark:text-peach-400 font-extrabold'
                    : 'border-transparent hover:text-ink-900 dark:hover:text-cream-100'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Tab Panels */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* TAB 1: HAIRSTYLE & COLOR */}
          {activeTab === 'hair' && (
            <div className="space-y-5">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'bg-peach-500 text-white font-bold border-peach-600 shadow-xs'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                        }`}
                      >
                        <span className="truncate">{h.label}</span>
                        <span className="text-[10px] opacity-60 ml-1">{h.category}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2 rounded-xl border flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-peach-500 ring-2 ring-peach-400 font-bold bg-cream-50 dark:bg-stone-800'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-inner"
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
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-peach-500 ring-2 ring-peach-400 font-bold bg-cream-50 dark:bg-stone-800'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-inner"
                          style={{ backgroundColor: s.hex }}
                        />
                        <span className="truncate">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-peach-500 text-white font-bold border-peach-600 shadow-xs'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
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
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-peach-500 text-white font-bold border-peach-600 shadow-xs'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
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
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-peach-500 text-white font-bold border-peach-600 shadow-xs'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                        }`}
                      >
                        <span className="truncate block">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border text-left text-xs transition-all ${
                          isSelected
                            ? 'bg-peach-500 text-white font-bold border-peach-600 shadow-xs'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
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
                <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
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
                        className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-xs transition-all ${
                          isSelected
                            ? 'border-peach-500 ring-2 ring-peach-400 font-bold bg-cream-50 dark:bg-stone-800'
                            : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/10 shrink-0 shadow-inner"
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
                <div className="pt-2 border-t border-tan-200 dark:border-stone-700">
                  <label className="block text-xs font-bold uppercase tracking-wider text-tan-700 dark:text-tan-300 mb-2">
                    Google Photo Alternative
                  </label>
                  <button
                    type="button"
                    onClick={() => setDraftConfig((prev) => ({ ...prev, useGooglePhoto: true }))}
                    className={`w-full p-2.5 rounded-xl border flex items-center gap-3 transition-all ${
                      draftConfig.useGooglePhoto
                        ? 'bg-peach-100 border-peach-400 text-peach-900 font-bold shadow-xs'
                        : 'bg-white dark:bg-stone-800 border-tan-200 dark:border-stone-700 hover:border-peach-300 text-ink-800 dark:text-cream-100'
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
                      <Check className="w-4 h-4 text-peach-600 ml-auto" />
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3.5 bg-cream-50 dark:bg-stone-800 border-t border-tan-200 dark:border-stone-700 flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowAvatarBuilder(false)}
            className="px-4 py-2 rounded-xl text-xs font-bold text-tan-700 dark:text-tan-300 hover:bg-tan-200/50 dark:hover:bg-stone-700 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2 rounded-xl bg-peach-500 hover:bg-peach-600 text-white text-xs font-bold shadow-cozy-xs flex items-center gap-1.5 transition-colors"
          >
            <Check className="w-4 h-4" />
            <span>Save Avatar</span>
          </button>
        </div>
      </div>
    </div>
  );
}
