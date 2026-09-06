import { games } from './games';
import type { SiteContent } from '../types/content';

export const defaultContent: SiteContent = {
  games,
  heroImage: '/banner.jpeg',
  logoImage: '/logo.jpeg',
  ctaLinks: [
    { id: 'link-1', label: 'Email us', url: 'mailto:mjhanesultancruz1514@gmail.com' },
    { id: 'link-2', label: 'Threads @jinssi cruise', url: 'https://www.threads.net/@jinssicruise' },
    { id: 'link-3', label: 'TikTok @jinssi cruise', url: 'https://www.tiktok.com/@jinssicruise' },
    // Add a support button only after the owner verifies the payment details.
  ],
};
