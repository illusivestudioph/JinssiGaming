import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, DEFAULT_PROFILE, isCreatorEmail, CREATOR_EMAIL, CommunityBadge } from '@/types/profile';
import {
  setRememberMePreference,
  hasRememberMeCookie,
  REMEMBER_ME_LOCAL_KEY,
} from '@/utils/rememberMe';

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  isLoading: boolean;
  rememberMe: boolean;
  setRememberMe: (remember: boolean) => void;
  signInWithGoogle: (remember?: boolean) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updated: Partial<UserProfile>) => Promise<void>;
  // Global Auth Prompt Modal triggers
  showAuthPrompt: boolean;
  authPromptReason: string;
  triggerAuthPrompt: (reason?: string) => void;
  closeAuthPrompt: () => void;
  // Profile & Avatar builder modal controls
  showProfileModal: boolean;
  setShowProfileModal: (show: boolean) => void;
  showAvatarBuilder: boolean;
  setShowAvatarBuilder: (show: boolean) => void;
  avatarBuilderReturnTo: 'public_profile' | 'edit_profile';
  setAvatarBuilderReturnTo: (destination: 'public_profile' | 'edit_profile') => void;
}

const LOCAL_STORAGE_PROFILE_KEY = 'jinssi-user-profile';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [rememberMe, setRememberMe] = useState(true);
  const [showAuthPrompt, setShowAuthPrompt] = useState(false);
  const [authPromptReason, setAuthPromptReason] = useState('Sign in with Gmail to join the cozy community.');
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showAvatarBuilder, setShowAvatarBuilder] = useState(false);
  const [avatarBuilderReturnTo, setAvatarBuilderReturnTo] = useState<'public_profile' | 'edit_profile'>('public_profile');

  // Initialize profile with defaults or cached local profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    // Discard any residual dev session immediately
    try {
      localStorage.removeItem('jinssi-dev-session');
    } catch {
      // ignore
    }

    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (cached) {
        const parsed = JSON.parse(cached);
        // Security check: Only verified CREATOR_EMAIL can ever hold creator role or badge
        if (parsed.isCreator || parsed.role === 'developer' || parsed.badge === 'Creator & Developer') {
          if (!parsed.email || !isCreatorEmail(parsed.email)) {
            parsed.isCreator = false;
            parsed.role = 'member';
            if (parsed.badge === 'Creator & Developer') {
              parsed.badge = 'Cozy Explorer';
            }
          }
        }
        return parsed;
      }
    } catch {
      // ignore
    }
    return {
      id: 'guest',
      ...DEFAULT_PROFILE,
    };
  });

  // Sync Supabase user metadata into profile (with special developer creator profile detection)
  const syncProfileFromUser = useCallback((u: User | null) => {
    if (!u) {
      setProfile((prev) => ({
        ...prev,
        id: 'guest',
        email: undefined,
        isCreator: false,
        role: 'member',
      }));
      return;
    }

    const isCreator = Boolean(u.email && isCreatorEmail(u.email));
    const meta = u.user_metadata || {};
    const googleAvatar = meta.avatar_url || meta.picture;
    const defaultName = isCreator
      ? 'Jinssi'
      : (meta.display_name || meta.user_name || meta.full_name || u.email?.split('@')[0] || 'CozyPlayer');

    const defaultBadge: CommunityBadge = isCreator ? 'Creator & Developer' : 'Cozy Explorer';
    const defaultBio = isCreator
      ? 'Creator & Lead Developer of Jinssi Gaming 🌸'
      : 'Sipping warm tea & exploring cozy adventures 🍵';

    setProfile((prev) => {
      const merged: UserProfile = {
        id: u.id,
        email: u.email,
        username: isCreator
          ? 'Jinssi'
          : (meta.custom_username || prev.username || defaultName).split('@')[0],
        bio: meta.bio || (isCreator && prev.bio === DEFAULT_PROFILE.bio ? defaultBio : prev.bio) || defaultBio,
        badge: (meta.badge as CommunityBadge) || (isCreator && prev.badge === 'Cozy Explorer' ? defaultBadge : prev.badge) || defaultBadge,
        isCreator,
        role: isCreator ? 'developer' : 'member',
        avatarConfig: meta.avatar_config || {
          ...prev.avatarConfig,
          googleAvatarUrl: googleAvatar || prev.avatarConfig.googleAvatarUrl,
          useGooglePhoto: Boolean(googleAvatar && prev.avatarConfig.useGooglePhoto),
        },
        joinedAt: u.created_at || prev.joinedAt,
        bannerColor: meta.banner_color || prev.bannerColor,
        bannerText: meta.banner_text !== undefined ? meta.banner_text : prev.bannerText,
      };

      try {
        localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(merged));
      } catch {
        // ignore
      }

      return merged;
    });
  }, []);

  // Listen to Supabase Auth State & enforce cookie clearing detection
  useEffect(() => {
    let active = true;

    // Check if the user had previously selected Remember Me, but their cookies were cleared
    const hadRememberMe = typeof window !== 'undefined' && localStorage.getItem(REMEMBER_ME_LOCAL_KEY);
    if (hadRememberMe === 'true' && !hasRememberMeCookie()) {
      // The user cleared their cookies! Discard session and reset to Guest.
      try {
        localStorage.removeItem('jinssi-dev-session');
        localStorage.removeItem(REMEMBER_ME_LOCAL_KEY);
        localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      } catch {
        // ignore
      }
      void supabase.auth.signOut().then(() => {
        if (active) {
          setUser(null);
          syncProfileFromUser(null);
          setIsLoading(false);
        }
      });
      return;
    }

    void supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!active) return;
      if (currentUser) {
        if (hasRememberMeCookie()) {
          setRememberMePreference(true);
        }
        setUser(currentUser);
        syncProfileFromUser(currentUser);
      } else {
        setUser(null);
        syncProfileFromUser(null);
      }
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser && hasRememberMeCookie()) {
        setRememberMePreference(true);
      }
      if (currentUser) {
        setUser(currentUser);
        syncProfileFromUser(currentUser);
      }
      setIsLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [syncProfileFromUser]);

  // Sign In with Google OAuth (with Remember Me support)
  const signInWithGoogle = async (remember: boolean = rememberMe) => {
    // Persist remember me cookie preference
    setRememberMePreference(remember);

    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      });

      if (error) {
        console.error('Google sign-in error:', error.message);
        const isProviderDisabled =
          error.message.includes('Unsupported provider') ||
          error.message.includes('provider is not enabled') ||
          error.message.includes('validation_failed');

        if (isProviderDisabled) {
          alert(
            'Google Sign-In is not enabled yet in your Supabase Dashboard.\n\n' +
            'To enable it:\n' +
            '1. Go to Supabase Dashboard -> Authentication -> Providers -> Google.\n' +
            '2. Toggle "Enable Sign in with Google" ON and paste your Google Client ID & Secret.'
          );
        } else {
          alert(`Could not sign in with Google: ${error.message}`);
        }
      }
    } catch (err: unknown) {
      const errMsg = err instanceof Error ? err.message : String(err);
      console.error('Google sign-in exception:', errMsg);
      alert(`Sign in error: ${errMsg}`);
    }
  };

  // Sign Out (clears session, cached profile, and remember me cookie)
  const signOut = async () => {
    setRememberMePreference(false);
    try {
      localStorage.removeItem('jinssi-dev-session');
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      localStorage.removeItem(REMEMBER_ME_LOCAL_KEY);
    } catch {
      // ignore
    }
    await supabase.auth.signOut();
    setUser(null);
    setProfile({
      id: 'guest',
      ...DEFAULT_PROFILE,
    });
    setShowProfileModal(false);
  };

  // Update Profile & Sync to Supabase user_metadata
  const updateProfile = async (updated: Partial<UserProfile>) => {
    const isCreator = Boolean(user?.email && isCreatorEmail(user.email));
    const safeUpdated = { ...updated };
    if (!isCreator) {
      delete safeUpdated.isCreator;
      delete safeUpdated.role;
      if (safeUpdated.badge === 'Creator & Developer') {
        safeUpdated.badge = 'Cozy Explorer';
      }
      if (safeUpdated.username && safeUpdated.username.toLowerCase() === 'jinssi') {
        safeUpdated.username = profile.username && profile.username.toLowerCase() !== 'jinssi' ? profile.username : 'CozyPlayer';
      }
    }

    const nextProfile: UserProfile = {
      ...profile,
      ...safeUpdated,
      isCreator,
      role: isCreator ? 'developer' : 'member',
      avatarConfig: {
        ...profile.avatarConfig,
        ...(safeUpdated.avatarConfig || {}),
      },
    };

    setProfile(nextProfile);

    // Save to local cache
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(nextProfile));
      if (nextProfile.bannerColor || nextProfile.bannerText !== undefined) {
        localStorage.setItem(
          'jinssi_user_banner',
          JSON.stringify({ color: nextProfile.bannerColor, text: nextProfile.bannerText })
        );
      }
    } catch {
      // ignore
    }

    // Persist to Supabase user metadata if signed in
    if (user) {
      try {
        await supabase.auth.updateUser({
          data: {
            custom_username: nextProfile.username,
            bio: nextProfile.bio,
            badge: nextProfile.badge,
            avatar_config: nextProfile.avatarConfig,
            banner_color: nextProfile.bannerColor,
            banner_text: nextProfile.bannerText,
          },
        });
      } catch (err) {
        console.warn('Could not sync profile to Supabase user metadata:', err);
      }
    }
  };

  const triggerAuthPrompt = (reason?: string) => {
    // If the user is already signed in, NEVER ask them to log in again!
    if (user) return;
    if (reason) setAuthPromptReason(reason);
    setShowAuthPrompt(true);
  };

  const closeAuthPrompt = () => {
    setShowAuthPrompt(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isLoading,
        rememberMe,
        setRememberMe,
        signInWithGoogle,
        signOut,
        updateProfile,
        showAuthPrompt,
        authPromptReason,
        triggerAuthPrompt,
        closeAuthPrompt,
        showProfileModal,
        setShowProfileModal,
        showAvatarBuilder,
        setShowAvatarBuilder,
        avatarBuilderReturnTo,
        setAvatarBuilderReturnTo,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
