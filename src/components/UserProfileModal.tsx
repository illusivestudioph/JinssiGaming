import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useChat } from '@/context/ChatContext';

/**
 * UserProfileModal is now fully unified into the main Profile Card (RedditProfileModal).
 * Any calls to showProfileModal will seamlessly open the profile card in edit mode,
 * preventing duplicate or disjointed card styles across the website.
 */
export function UserProfileModal() {
  const { user, profile, showProfileModal, setShowProfileModal } = useAuth();
  const { openProfile } = useChat();

  useEffect(() => {
    if (showProfileModal) {
      setShowProfileModal(false);
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
        startInEditMode: true,
      });
    }
  }, [showProfileModal, user, profile, setShowProfileModal, openProfile]);

  return null;
}
