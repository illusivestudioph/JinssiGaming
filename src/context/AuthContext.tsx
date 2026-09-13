import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { UserProfile, DEFAULT_PROFILE, DEFAULT_AVATAR_CONFIG } from '@/types/profile';

interface AuthContextType {
  user: User | null;
  profile: UserProfile;
  isLoading: boolean;
  signInWithGoogle: () => Promise<void>;
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

  // Sync Supabase user metadata into profile
  const syncProfileFromUser = useCallback((u: User | null) => {
    if (!u) {
      setProfile((prev) => ({
        ...prev,
        id: 'guest',
        email: undefined,
      }));
      return;
    }

    const meta = u.user_metadata || {};
    const googleAvatar = meta.avatar_url || meta.picture;
    const defaultName = meta.display_name || meta.user_name || meta.full_name || u.email?.split('@')[0] || 'CozyPlayer';

    setProfile((prev) => {
      const merged: UserProfile = {
        id: u.id,
        email: u.email,
        username: meta.custom_username || prev.username || defaultName,
        bio: meta.bio || prev.bio || DEFAULT_PROFILE.bio,
        badge: meta.badge || prev.badge || DEFAULT_PROFILE.badge,
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

  // Listen to Supabase Auth State
  useEffect(() => {
    let active = true;

    void supabase.auth.getUser().then(({ data: { user: currentUser } }) => {
      if (!active) return;
      setUser(currentUser);
      syncProfileFromUser(currentUser);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      syncProfileFromUser(currentUser);
      setIsLoading(false);
    });

    return () => {
      active = false;
      listener.subscription.unsubscribe();
    };
  }, [syncProfileFromUser]);

  // Sign In with Google OAuth
  const signInWithGoogle = async () => {
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

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile({
      id: 'guest',
      ...DEFAULT_PROFILE,
    });
    try {
      localStorage.removeItem(LOCAL_STORAGE_PROFILE_KEY);
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
