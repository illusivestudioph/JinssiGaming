import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, DEFAULT_PROFILE, isCreatorEmail, CommunityBadge } from '@/types/profile';
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

  // Initialize profile with defaults or cached local profile
  const [profile, setProfile] = useState<UserProfile>(() => {
    try {
      const cached = localStorage.getItem(LOCAL_STORAGE_PROFILE_KEY);
      if (cached) {
        return JSON.parse(cached);
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

    const isCreator = isCreatorEmail(u.email);
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
        username: meta.custom_username || (isCreator && prev.username === 'CozyPlayer' ? 'Jinssi' : prev.username) || defaultName,
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
      void supabase.auth.signOut().then(() => {
        try {
          localStorage.removeItem(REMEMBER_ME_LOCAL_KEY);
          localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
        } catch {
          // ignore
        }
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
      if (currentUser && hasRememberMeCookie()) {
        // Refresh 1-year remember-me cookie on active visit
        setRememberMePreference(true);
      }
      setUser(currentUser);
      syncProfileFromUser(currentUser);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      if (currentUser && hasRememberMeCookie()) {
        setRememberMePreference(true);
      }
      setUser(currentUser);
      syncProfileFromUser(currentUser);
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

    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin,
      },
    });
    if (error) {
      console.error('Google sign-in error:', error.message);
      alert(`Could not sign in with Google: ${error.message}`);
    }
  };

  // Sign Out (clears session, cached profile, and remember me cookie)
  const signOut = async () => {
    setRememberMePreference(false);
    await supabase.auth.signOut();
    setUser(null);
    setProfile({
      id: 'guest',
      ...DEFAULT_PROFILE,
    });
    try {
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
      localStorage.removeItem(REMEMBER_ME_LOCAL_KEY);
    } catch {
      // ignore
    }
    setShowProfileModal(false);
  };

  // Update Profile & Sync to Supabase user_metadata
  const updateProfile = async (updated: Partial<UserProfile>) => {
    const nextProfile: UserProfile = {
      ...profile,
      ...updated,
      avatarConfig: {
        ...profile.avatarConfig,
        ...(updated.avatarConfig || {}),
      },
    };

    setProfile(nextProfile);

    // Save to local cache
    try {
      localStorage.setItem(LOCAL_STORAGE_PROFILE_KEY, JSON.stringify(nextProfile));
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
