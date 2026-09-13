import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';
import { CozyAvatar } from '@/components/CozyAvatar';
import { AdventurerConfig, FaceShape, getAdventurerAvatarUrl } from '@/types/profile';
import {
  StreamlinePalette,
  StreamlineDice,
  StreamlineClose,
  StreamlineCheck,
  StreamlineStars,
  StreamlineScissors,
  StreamlineFaceSmile,
  StreamlineMustache,
  StreamlineSun,
  StreamlineMale,
  StreamlineFemale,
  StreamlineUsers,
  StreamlineFaceShape,
} from '@/components/StreamlineIcons';

// Comprehensive catalog of authentic Adventurer hairstyles with visual tags
const HAIRSTYLES: { id: string; label: string; category: 'male' | 'female' | 'unisex'; tag: string }[] = [
  // Short / Male Haircuts
  { id: 'short01', label: 'Classic Side Part', category: 'male', tag: 'Short / Male' },
  { id: 'short02', label: 'Messy Textured Crop', category: 'male', tag: 'Short / Male' },
  { id: 'short03', label: 'Side Swept Wave', category: 'male', tag: 'Short / Male' },
  { id: 'short04', label: 'Clean Undercut', category: 'male', tag: 'Short / Male' },
  { id: 'short05', label: 'Spiky Anime Shag', category: 'male', tag: 'Short / Male' },
  { id: 'short06', label: 'Curtain Bangs', category: 'unisex', tag: 'Short / Unisex' },
  { id: 'short07', label: 'Tapered Quiff', category: 'male', tag: 'Short / Male' },
  { id: 'short08', label: 'High & Tight Fade', category: 'male', tag: 'Short / Male' },
  { id: 'short09', label: 'Curly Crew Cut', category: 'male', tag: 'Short / Male' },
  { id: 'short10', label: 'Slicked Pompadour', category: 'male', tag: 'Short / Male' },
  { id: 'short11', label: 'Messy Fringe', category: 'male', tag: 'Short / Male' },
  { id: 'short12', label: 'Low Fade Comb', category: 'male', tag: 'Short / Male' },
  { id: 'short13', label: 'Casual Swoop', category: 'male', tag: 'Short / Male' },
  { id: 'short14', label: 'Textured Spikes', category: 'male', tag: 'Short / Male' },
  { id: 'short15', label: 'Layered Crop', category: 'male', tag: 'Short / Male' },
  { id: 'short16', label: 'Clean Caesar Cut', category: 'male', tag: 'Short / Male' },
  { id: 'short17', label: 'Wispy Short Cut', category: 'male', tag: 'Short / Male' },
  { id: 'short18', label: 'Executive Side Fade', category: 'male', tag: 'Short / Male' },
  { id: 'short19', label: 'Rugged Shaggy Crop', category: 'male', tag: 'Short / Male' },
  { id: 'none', label: 'Shaved / Buzz Cut', category: 'male', tag: 'Buzz / Shaved' },

  // Long / Female Hairstyles
  { id: 'long01', label: 'Flowing Locks', category: 'female', tag: 'Long / Female' },
  { id: 'long02', label: 'Twin Braids', category: 'female', tag: 'Long / Female' },
  { id: 'long03', label: 'High Ponytail', category: 'female', tag: 'Long / Female' },
  { id: 'long04', label: 'Half-up Bun', category: 'female', tag: 'Long / Female' },
  { id: 'long05', label: 'Classic Bob Cut', category: 'female', tag: 'Medium / Female' },
  { id: 'long06', label: 'Mermaid Waves', category: 'female', tag: 'Long / Female' },
  { id: 'long07', label: 'Cute Pigtails', category: 'female', tag: 'Long / Female' },
  { id: 'long08', label: 'Shoulder Shag', category: 'unisex', tag: 'Medium / Unisex' },
  { id: 'long09', label: 'Braided Crown', category: 'female', tag: 'Long / Female' },
  { id: 'long10', label: 'Wavy Blowout', category: 'female', tag: 'Long / Female' },
  { id: 'long11', label: 'Cascading Curls', category: 'female', tag: 'Long / Female' },
  { id: 'long12', label: 'Side French Braid', category: 'female', tag: 'Long / Female' },
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

// Authentic character face silhouettes with refined contour lines
const FACE_SHAPES: {
  id: FaceShape;
  label: string;
  desc: string;
  tag: string;
  outlineD: string;
  accentD: string;
}[] = [
  {
    id: 'oval',
    label: 'Oval Classic',
    desc: 'Balanced & Natural',
    tag: 'Classic Oval',
    outlineD: 'M16 4 C23 4 27 11 27 21 C27 31 22 38 16 38 C10 38 5 31 5 21 C5 11 9 4 16 4 Z',
    accentD: 'M11 24 C13 30 15 33 16 33 C17 33 19 30 21 24',
  },
  {
    id: 'round',
    label: 'Round / Soft',
    desc: 'Full Cheeks & Soft Jaw',
    tag: 'Round Soft',
    outlineD: 'M16 5 C25 5 28 13 28 22 C28 32 23 38 16 38 C9 38 4 32 4 22 C4 13 7 5 16 5 Z',
    accentD: 'M10 24 C12 31 14 34 16 34 C18 34 20 31 22 24',
  },
  {
    id: 'square',
    label: 'Square / Chiseled',
    desc: 'Strong Angular Jawline',
    tag: 'Chiseled Jaw',
    outlineD: 'M8 6 C13 5 19 5 24 6 C26 14 26 23 25 30 L22 36 L10 36 L7 30 C6 23 6 14 8 6 Z',
    accentD: 'M8 25 L11 31 L21 31 L24 25',
  },
  {
    id: 'heart',
    label: 'Heart / V-Line',
    desc: 'Tapered Slender Chin',
    tag: 'V-Line Chin',
    outlineD: 'M16 5 C25 4 27 12 26 20 C25 29 19 37 16 39 C13 37 7 29 6 20 C5 12 7 4 16 5 Z',
    accentD: 'M10 23 L16 33 L22 23',
  },
];

// Eyebrow structures that shape facial expression and brow contours
const EYEBROWS: { id: string; label: string; mood: string }[] = [
  { id: 'variant01', label: 'Strong Straight Brow', mood: 'Masculine / Stoic' },
  { id: 'variant02', label: 'Soft Natural Arch', mood: 'Friendly / Cozy' },
  { id: 'variant03', label: 'Heroic Arch Brow', mood: 'Determined / Bold' },
  { id: 'variant04', label: 'Calm Level Brow', mood: 'Scholar / Focused' },
  { id: 'variant05', label: 'Inquisitive High Brow', mood: 'Curious / Playful' },
  { id: 'variant06', label: 'Sharp Winged Brow', mood: 'Sleek / Dramatic' },
  { id: 'variant07', label: 'Delicate Fine Brow', mood: 'Soft / Subtle' },
  { id: 'variant08', label: 'Chiseled Heavy Brow', mood: 'Rugged / Strong' },
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

// Facial features including facial hair and accents
const FEATURES: { id: string; label: string; tag: string }[] = [
  { id: 'none', label: 'Clean Shaven', tag: 'Smooth Jaw' },
  { id: 'mustache', label: 'Gentleman Mustache', tag: 'Facial Hair' },
  { id: 'blush', label: 'Rosy Cheeks', tag: 'Warmth' },
  { id: 'freckles', label: 'Sun Freckles', tag: 'Sun-kissed' },
  { id: 'birthmark', label: 'Beauty Mark', tag: 'Accent' },
];

const EARRINGS: { id: string; label: string }[] = [
  { id: 'none', label: 'No Piercings' },
  { id: 'variant01', label: 'Gold Studs' },
  { id: 'variant02', label: 'Silver Rings' },
  { id: 'variant03', label: 'Cozy Dangles' },
  { id: 'variant04', label: 'Minimalist Hoops' },
  { id: 'variant05', label: 'Feather Earring' },
];

const BACKGROUND_COLORS: { id: string; label: string; hex: string }[] = [
  { id: 'ffd7b5', label: 'Vanilla Peach', hex: '#FFD7B5' },
  { id: 'b6e3f4', label: 'Rainy Sky', hex: '#B6E3F4' },
  { id: 'c0aede', label: 'Sweet Lavender', hex: '#C0AEDE' },
  { id: 'd1f2d9', label: 'Matcha Mint', hex: '#D1F2D9' },
  { id: 'ffd5dc', label: 'Sakura Rose', hex: '#FFD5DC' },
  { id: '2b231e', label: 'Midnight Cafe', hex: '#2B231E' },
];

type CustomizerTab = 'hair' | 'face' | 'accessories' | 'skin' | 'backdrop';

export function AvatarBuilderModal() {
  const {
    user,
    profile,
    updateProfile,
    showAvatarBuilder,
    setShowAvatarBuilder,
    setShowProfileModal,
    avatarBuilderReturnTo,
  } = useAuth();
  const { openProfile } = useChat();
  const [activeTab, setActiveTab] = useState<CustomizerTab>('hair');
  const [hairCategoryFilter, setHairCategoryFilter] = useState<'all' | 'male' | 'female'>('all');

  const [draftConfig, setDraftConfig] = useState<AdventurerConfig>(() => ({
    ...profile.avatarConfig,
    gender: profile.avatarConfig?.gender || 'neutral',
    faceShape: profile.avatarConfig?.faceShape || 'oval',
    eyebrows: profile.avatarConfig?.eyebrows || 'variant02',
    earrings: profile.avatarConfig?.earrings || 'none',
  }));

  if (!showAvatarBuilder) return null;

  const handleClose = () => {
    setShowAvatarBuilder(false);
    openProfile({
      id: user ? user.id : profile.id,
      username: profile.username,
      bio: profile.bio,
      badge: profile.badge,
      avatarConfig: profile.avatarConfig,
      isCreator: profile.isCreator,
      role: profile.role,
      joinedAt: profile.joinedAt,
      bannerColor: profile.bannerColor,
      bannerText: profile.bannerText,
      startInEditMode: avatarBuilderReturnTo === 'edit_profile',
    });
  };

  const handleSave = async () => {
    await updateProfile({ avatarConfig: draftConfig });
    setShowAvatarBuilder(false);
    // Return to unified profile card with the newly updated avatar!
    openProfile({
      id: user ? user.id : profile.id,
      username: profile.username,
      bio: profile.bio,
      badge: profile.badge,
      avatarConfig: draftConfig,
      isCreator: profile.isCreator,
      role: profile.role,
      joinedAt: profile.joinedAt,
      bannerColor: profile.bannerColor,
      bannerText: profile.bannerText,
      startInEditMode: avatarBuilderReturnTo === 'edit_profile',
    });
  };

  // Gender preset selection switches presentation and filters hairstyles
  const handleSelectGender = (gender: 'male' | 'female' | 'neutral') => {
    setDraftConfig((prev) => {
      let nextHair = prev.hair;
      let nextEyebrows = prev.eyebrows || 'variant02';
      let nextFeatures = prev.features;
      let nextFaceShape = prev.faceShape || 'oval';

      if (gender === 'male') {
        setHairCategoryFilter('male');
        const currentIsFemale = HAIRSTYLES.find((h) => h.id === prev.hair)?.category === 'female';
        if (currentIsFemale) nextHair = 'short01';
        nextEyebrows = 'variant01';
        nextFaceShape = 'square';
      } else if (gender === 'female') {
        setHairCategoryFilter('female');
        const currentIsMale = HAIRSTYLES.find((h) => h.id === prev.hair)?.category === 'male';
        if (currentIsMale) nextHair = 'long01';
        nextEyebrows = 'variant02';
        nextFaceShape = 'heart';
        if (nextFeatures === 'mustache') nextFeatures = 'blush';
      } else {
        setHairCategoryFilter('all');
        nextFaceShape = 'oval';
      }

      return {
        ...prev,
        gender,
        hair: nextHair,
        eyebrows: nextEyebrows,
        faceShape: nextFaceShape,
        features: nextFeatures,
        useGooglePhoto: false,
      };
    });
  };

  const handleRandomize = () => {
    const currentGender = draftConfig.gender || 'neutral';
    const hairPool =
      currentGender === 'male'
        ? HAIRSTYLES.filter((h) => h.category === 'male' || h.category === 'unisex')
        : currentGender === 'female'
        ? HAIRSTYLES.filter((h) => h.category === 'female' || h.category === 'unisex')
        : HAIRSTYLES;

    const randomHair = hairPool[Math.floor(Math.random() * hairPool.length)].id;
    const randomHairColor = HAIR_COLORS[Math.floor(Math.random() * HAIR_COLORS.length)].id;
    const randomSkin = SKIN_TONES[Math.floor(Math.random() * SKIN_TONES.length)].id;
    const randomEyes = EYES[Math.floor(Math.random() * EYES.length)].id;
    const randomMouth = MOUTHS[Math.floor(Math.random() * MOUTHS.length)].id;
    const randomFaceShape = FACE_SHAPES[Math.floor(Math.random() * FACE_SHAPES.length)].id;
    const randomEyebrows =
      currentGender === 'male'
        ? ['variant01', 'variant03', 'variant04', 'variant08'][Math.floor(Math.random() * 4)]
        : EYEBROWS[Math.floor(Math.random() * EYEBROWS.length)].id;

    let randomFeature = 'none';
    if (currentGender === 'male' && Math.random() > 0.6) {
      randomFeature = Math.random() > 0.5 ? 'mustache' : 'freckles';
    } else if (currentGender === 'female' && Math.random() > 0.4) {
      randomFeature = Math.random() > 0.5 ? 'blush' : 'freckles';
    }

    const randomGlasses = Math.random() > 0.75 ? GLASSES[1 + Math.floor(Math.random() * (GLASSES.length - 1))].id : 'none';
    const randomEarrings = Math.random() > 0.8 ? EARRINGS[1 + Math.floor(Math.random() * (EARRINGS.length - 1))].id : 'none';
    const randomBg = BACKGROUND_COLORS[Math.floor(Math.random() * BACKGROUND_COLORS.length)].id;

    setDraftConfig((prev) => ({
      ...prev,
      hair: randomHair,
      hairColor: randomHairColor,
      skinColor: randomSkin,
      faceShape: randomFaceShape,
      eyebrows: randomEyebrows,
      eyes: randomEyes,
      mouth: randomMouth,
      glasses: randomGlasses,
      features: randomFeature,
      earrings: randomEarrings,
      backgroundColor: randomBg,
      useGooglePhoto: false,
    }));
  };

  const filteredHairstyles = HAIRSTYLES.filter((h) => {
    if (hairCategoryFilter === 'male') return h.category === 'male' || h.category === 'unisex';
    if (hairCategoryFilter === 'female') return h.category === 'female' || h.category === 'unisex';
    return true;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/65 backdrop-blur-xs animate-fade-in select-none">
      <div
        className="relative w-full max-w-xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[94vh] border-2"
        style={{
          backgroundColor: 'var(--card-bg, #fefcf7)',
          borderColor: 'var(--card-border, #5e5148)',
        }}
      >
        {/* Header Ribbon */}
        <div
          className="px-5 py-3.5 sm:px-6 sm:py-4 border-b flex items-center justify-between"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-center gap-3">
            <div
              className="w-9 h-9 rounded-2xl border-2 flex items-center justify-center shadow-xs shrink-0"
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
                className="font-display font-bold text-base sm:text-lg leading-tight"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                Adventurer Character Studio
              </h3>
              <p
                className="text-[11px] sm:text-xs font-medium"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                Craft your custom male, female, or cozy adventurer persona
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

        {/* Top Showcase Preview Banner & Gender Switcher */}
        <div
          className="p-4 sm:p-5 border-b flex flex-col sm:flex-row items-center gap-4 justify-between"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          <div className="flex items-center gap-4 w-full sm:w-auto">
            <div className="relative group cursor-pointer shrink-0" onClick={handleRandomize} title="Click to randomize!">
              <CozyAvatar
                config={draftConfig}
                size={92}
                className="transform transition-transform group-hover:scale-105 shadow-md border-2 border-white"
              />
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRandomize();
                }}
                className="absolute -bottom-1 -right-1 p-2 rounded-full shadow-md transition-all active:rotate-180 cursor-pointer"
                style={{
                  backgroundColor: 'var(--theme-accent, #fd9a4d)',
                  color: 'var(--theme-accent-text, #ffffff)',
                }}
                title="Roll Random Persona"
              >
                <StreamlineDice className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5 flex-wrap">
                <span
                  className="text-[10px] font-extrabold uppercase tracking-widest px-2 py-0.5 rounded-md border"
                  style={{
                    backgroundColor: 'var(--section-kicker-bg, #fcf3b9)',
                    borderColor: 'var(--section-kicker-border, #fcb274)',
                    color: 'var(--section-kicker-color, #b05a1d)',
                  }}
                >
                  Illustrated Persona
                </span>
                {draftConfig.faceShape && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-stone-100 text-stone-700 border border-stone-300">
                    {FACE_SHAPES.find((f) => f.id === draftConfig.faceShape)?.tag || 'Classic Oval'}
                  </span>
                )}
                {draftConfig.features === 'mustache' && (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 border border-amber-300">
                    Mustache
                  </span>
                )}
              </div>
              <h4
                className="font-display font-bold text-sm sm:text-base mt-0.5 truncate"
                style={{ color: 'var(--text-main, #3a2e22)' }}
              >
                @{profile.username}
              </h4>
              <p
                className="text-[11px] truncate mt-0.5"
                style={{ color: 'var(--text-muted, #8f6b48)' }}
              >
                {HAIRSTYLES.find((h) => h.id === draftConfig.hair)?.label || 'Buzzed / Shaved'} •{' '}
                {HAIR_COLORS.find((c) => c.id === draftConfig.hairColor)?.label}
              </p>
            </div>
          </div>

          {/* Gender Preset Selector with Streamline Icons */}
          <div className="flex flex-col items-end gap-1.5 w-full sm:w-auto">
            <span className="text-[10px] font-bold uppercase tracking-wider text-tan-600 hidden sm:block">
              Gender & Presentation
            </span>
            <div className="flex items-center gap-1 bg-white/80 p-1 rounded-xl border border-[#EADCCB] shadow-2xs w-full sm:w-auto justify-center">
              {[
                { id: 'male', label: 'Male', icon: StreamlineMale, hint: 'Short cuts, chiseled jaw & masculine brows' },
                { id: 'female', label: 'Female', icon: StreamlineFemale, hint: 'Long styles, soft jaw & delicate accents' },
                { id: 'neutral', label: 'All', icon: StreamlineUsers, hint: 'Complete catalog' },
              ].map((g) => {
                const isSelected = (draftConfig.gender || 'neutral') === g.id;
                const IconComponent = g.icon;
                return (
                  <button
                    key={g.id}
                    type="button"
                    onClick={() => handleSelectGender(g.id as 'male' | 'female' | 'neutral')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isSelected
                        ? 'bg-[#FD9A4D] text-white shadow-xs font-black'
                        : 'text-[#6A5747] hover:bg-[#FFF7EE]'
                    }`}
                    title={g.hint}
                  >
                    <IconComponent className="w-3.5 h-3.5" />
                    <span>{g.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Customization Navigation Tabs with Streamline Icons (Fits Panel Seamlessly) */}
        <div
          className="grid grid-cols-5 border-b w-full"
          style={{
            backgroundColor: 'var(--card-done-bg, #fcf8ee)',
            borderColor: 'var(--card-line, #ebdcc9)',
          }}
        >
          {[
            { id: 'hair', label: 'Hair', icon: StreamlineScissors },
            { id: 'face', label: 'Face', icon: StreamlineFaceSmile },
            { id: 'accessories', label: 'Accents', icon: StreamlineMustache },
            { id: 'skin', label: 'Skin', icon: StreamlinePalette },
            { id: 'backdrop', label: 'Theme', icon: StreamlineSun },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as CustomizerTab)}
                className={`py-2.5 sm:py-3 px-1 border-b-2 transition-all flex flex-col sm:flex-row items-center justify-center gap-1.5 cursor-pointer text-center ${
                  isActive ? 'font-black bg-white/40' : 'border-transparent hover:bg-black/5'
                }`}
                style={{
                  borderColor: isActive ? 'var(--theme-accent, #fd9a4d)' : 'transparent',
                  color: isActive ? 'var(--theme-accent, #fd9a4d)' : 'var(--text-muted, #8f6b48)',
                }}
              >
                <IconComp className="w-4 h-4" />
                <span className="text-[11px] sm:text-xs tracking-tight truncate">{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Scrollable Tab Panels */}
        <div
          className="p-4 sm:p-6 overflow-y-auto space-y-6 flex-1"
          style={{ backgroundColor: 'var(--card-bg, #fefcf7)' }}
        >
          {/* TAB 1: HAIRSTYLE & COLOR */}
          {activeTab === 'hair' && (
            <div className="space-y-5">
              {/* Hairstyle Filter & Visual Cards */}
              <div>
                <div className="flex items-center justify-between mb-2.5">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6A5747]">
                    Hairstyle ({filteredHairstyles.length} cuts)
                  </label>
                  <div className="flex gap-1 text-[11px] font-bold">
                    <button
                      type="button"
                      onClick={() => setHairCategoryFilter('all')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors ${
                        hairCategoryFilter === 'all'
                          ? 'bg-[#FD9A4D] text-white'
                          : 'bg-white text-tan-600 border border-tan-200'
                      }`}
                    >
                      All
                    </button>
                    <button
                      type="button"
                      onClick={() => setHairCategoryFilter('male')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors flex items-center gap-1 ${
                        hairCategoryFilter === 'male'
                          ? 'bg-[#FD9A4D] text-white'
                          : 'bg-white text-tan-600 border border-tan-200'
                      }`}
                    >
                      <StreamlineMale className="w-3 h-3" />
                      <span>Male / Short</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setHairCategoryFilter('female')}
                      className={`px-2.5 py-1 rounded-md cursor-pointer transition-colors flex items-center gap-1 ${
                        hairCategoryFilter === 'female'
                          ? 'bg-[#FD9A4D] text-white'
                          : 'bg-white text-tan-600 border border-tan-200'
                      }`}
                    >
                      <StreamlineFemale className="w-3 h-3" />
                      <span>Female / Long</span>
                    </button>
                  </div>
                </div>

                {/* Visual Hairstyle Cards with Instant Overlay / Thumbnail Icons */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 max-h-64 overflow-y-auto pr-1">
                  {filteredHairstyles.map((h) => {
                    const isSelected = (draftConfig.hair === h.id) || (h.id === 'none' && draftConfig.hair === 'bald');
                    const hairPreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-cut',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: h.id,
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: 'variant02',
                      eyes: 'variant01',
                      mouth: 'variant01',
                      glasses: 'none',
                      features: 'none',
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={h.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, hair: h.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-11 h-11 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={hairPreviewUrl}
                            alt={h.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                            decoding="async"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-[#C95A0B]' : 'text-[#3A2E22]'}`}>
                            {h.label}
                          </div>
                          <div className="text-[10px] text-[#8A7565] truncate mt-0.5">
                            {h.tag}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Hair Color */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Hair Color Tone
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {HAIR_COLORS.map((c) => {
                    const isSelected = draftConfig.hairColor === c.id;
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, hairColor: c.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="truncate font-medium">{c.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: FACE SHAPE, BROWS & EXPRESSIONS */}
          {activeTab === 'face' && (
            <div className="space-y-6">
              {/* FACE SHAPE SELECTOR */}
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <StreamlineFaceShape className="w-4 h-4 text-[#FD9A4D]" />
                  <label className="text-xs font-bold uppercase tracking-wider text-[#6A5747]">
                    Face Silhouette & Jawline
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  {FACE_SHAPES.map((fs) => {
                    const isSelected = (draftConfig.faceShape || 'oval') === fs.id;
                    return (
                      <button
                        key={fs.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, faceShape: fs.id }))}
                        className={`p-2.5 rounded-2xl border-2 flex items-center gap-2.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        {/* Distinct Face Silhouette Thumbnail */}
                        <div
                          className={`w-11 h-11 rounded-xl shrink-0 border shadow-2xs flex items-center justify-center transition-all ${
                            isSelected
                              ? 'border-[#FD9A4D] bg-[#FD9A4D]/15'
                              : 'border-[#EADCCB] bg-[#FFF8F0]'
                          }`}
                        >
                          <svg viewBox="0 0 32 42" className="w-6 h-8" fill="none">
                            {/* Head Silhouette */}
                            <path
                              d={fs.outlineD}
                              fill={`#${draftConfig.skinColor || 'F2D3B1'}`}
                              stroke={isSelected ? '#C95A0B' : '#6A5747'}
                              strokeWidth="2"
                              strokeLinejoin="round"
                            />
                            {/* Refined Jawline / Cheek Contour (No cartoon eyes or smile) */}
                            <path
                              d={fs.accentD}
                              stroke={isSelected ? '#C95A0B' : '#8A7565'}
                              strokeWidth="1.75"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              opacity="0.85"
                            />
                          </svg>
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-[#C95A0B]' : 'text-[#3A2E22]'}`}>
                            {fs.label}
                          </div>
                          <div className="text-[10px] text-[#8A7565] truncate mt-0.5">
                            {fs.desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Eyebrow & Brow Structure with Visual Thumbnails */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Brow Structure & Demeanor
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {EYEBROWS.map((b) => {
                    const isSelected = (draftConfig.eyebrows || 'variant02') === b.id;
                    const browPreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-brow',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: draftConfig.hair || 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: b.id,
                      eyes: 'variant01',
                      mouth: 'variant01',
                      glasses: 'none',
                      features: 'none',
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={b.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, eyebrows: b.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2.5 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={browPreviewUrl}
                            alt={b.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-[#C95A0B]' : 'text-[#3A2E22]'}`}>
                            {b.label}
                          </div>
                          <div className="text-[10px] text-[#8A7565] truncate mt-0.5">
                            {b.mood}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Mouth & Smile Expression with Visual Thumbnails */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Mouth Expression & Smile
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {MOUTHS.map((m) => {
                    const isSelected = draftConfig.mouth === m.id;
                    const mouthPreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-mouth',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: draftConfig.hair || 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: draftConfig.eyebrows || 'variant02',
                      eyes: 'variant01',
                      mouth: m.id,
                      glasses: 'none',
                      features: 'none',
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, mouth: m.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={mouthPreviewUrl}
                            alt={m.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate font-semibold text-xs text-[#3A2E22]">{m.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MUSTACHE, ACCENTS & SPECTACLES */}
          {activeTab === 'accessories' && (
            <div className="space-y-5">
              {/* Facial Hair & Accents with Visual Thumbnails */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Facial Hair & Accents
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {FEATURES.map((f) => {
                    const isSelected = (draftConfig.features || 'none') === f.id;
                    const featurePreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-feature',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: draftConfig.hair || 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: draftConfig.eyebrows || 'variant02',
                      eyes: 'variant01',
                      mouth: 'variant01',
                      glasses: 'none',
                      features: f.id,
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, features: f.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2.5 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={featurePreviewUrl}
                            alt={f.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className={`font-bold text-xs truncate ${isSelected ? 'text-[#C95A0B]' : 'text-[#3A2E22]'}`}>
                            {f.label}
                          </div>
                          <div className="text-[10px] text-[#8A7565] truncate mt-0.5">
                            {f.tag}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Spectacles with Visual Thumbnails */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Spectacles & Glasses
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {GLASSES.map((g) => {
                    const isSelected = draftConfig.glasses === g.id;
                    const glassesPreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-glasses',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: draftConfig.hair || 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: draftConfig.eyebrows || 'variant02',
                      eyes: 'variant01',
                      mouth: 'variant01',
                      glasses: g.id,
                      features: 'none',
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={g.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, glasses: g.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={glassesPreviewUrl}
                            alt={g.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate font-medium text-xs text-[#3A2E22]">{g.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Piercings & Earrings with Visual Thumbnails */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Earrings & Piercings
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EARRINGS.map((er) => {
                    const isSelected = (draftConfig.earrings || 'none') === er.id;
                    const earringPreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-earring',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: 'variant02',
                      eyes: 'variant01',
                      mouth: 'variant01',
                      glasses: 'none',
                      features: 'none',
                      earrings: er.id,
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={er.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, earrings: er.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={earringPreviewUrl}
                            alt={er.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate font-medium text-xs text-[#3A2E22]">{er.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: SKIN TONE & EYES */}
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
                        className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: s.hex }}
                        />
                        <span className="truncate font-medium">{s.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[#6A5747] mb-2">
                  Eye Gaze & Shape
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {EYES.map((e) => {
                    const isSelected = draftConfig.eyes === e.id;
                    const eyePreviewUrl = getAdventurerAvatarUrl({
                      seed: 'preview-eye',
                      skinColor: draftConfig.skinColor || 'f2d3b1',
                      hair: draftConfig.hair || 'short01',
                      hairColor: draftConfig.hairColor || '4a312c',
                      eyebrows: draftConfig.eyebrows || 'variant02',
                      eyes: e.id,
                      mouth: 'variant01',
                      glasses: 'none',
                      features: 'none',
                      backgroundColor: 'ffd7b5',
                    });

                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => setDraftConfig((prev) => ({ ...prev, eyes: e.id, useGooglePhoto: false }))}
                        className={`p-2 rounded-2xl border-2 flex items-center gap-2 text-left text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#FFF5EB] border-[#FD9A4D] ring-2 ring-[#FD9A4D]/35 shadow-xs'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-[#EADCCB] bg-[#FFD7B5] shadow-xs flex items-center justify-center">
                          <img
                            src={eyePreviewUrl}
                            alt={e.label}
                            className="w-full h-full object-cover select-none pointer-events-none"
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate font-medium text-xs text-[#3A2E22]">{e.label}</span>
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
                        className={`p-2.5 rounded-xl border-2 flex items-center gap-2.5 text-xs transition-all cursor-pointer ${
                          isSelected
                            ? 'border-[#FD9A4D] ring-2 ring-[#FD9A4D]/40 font-bold bg-[#FFF7EE] text-[#3A2E22]'
                            : 'bg-white border-[#EADCCB] hover:border-[#FD9A4D] text-[#3A2E22] font-semibold hover:bg-[#FFFDFB]'
                        }`}
                      >
                        <span
                          className="w-4 h-4 rounded-full border border-black/15 shrink-0 shadow-inner"
                          style={{ backgroundColor: bg.hex }}
                        />
                        <span className="truncate font-medium">{bg.label}</span>
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
                    className={`w-full p-3 rounded-xl border-2 flex items-center gap-3 transition-all cursor-pointer ${
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
          className="px-5 py-3.5 sm:px-6 border-t flex items-center justify-end gap-3"
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
