export type RequestType = 'book' | 'game' | 'guide' | 'other';
export type RequestStatus = 'pending' | 'in-progress' | 'fulfilled' | 'declined';

export interface CommunityRequest {
  id: string;
  title: string;
  type: RequestType;
  description: string;
  sourceUrl?: string;
  authorOrDev?: string;
  requesterName: string;
  requesterEmail?: string;
  status: RequestStatus;
  upvotes: number;
  upvotedBy: string[]; // IP, email, or client identifier
  adminNote?: string;
  createdAt: string;
  updatedAt?: string;
}

export const requestTypeLabels: Record<RequestType, { label: string; badgeClass: string; iconEmoji: string }> = {
  book: { label: 'Book & Novel', badgeClass: 'bg-peach-100 text-peach-700 border-peach-200', iconEmoji: '📖' },
  game: { label: 'Game Walkthrough', badgeClass: 'bg-earth-100 text-earth-700 border-earth-200', iconEmoji: '🎮' },
  guide: { label: 'Cozy Guide / Article', badgeClass: 'bg-cream-200 text-tan-800 border-tan-300', iconEmoji: '📝' },
  other: { label: 'Feature & Other', badgeClass: 'bg-tan-100 text-ink-700 border-tan-200', iconEmoji: '✨' },
};

export const requestStatusLabels: Record<RequestStatus, { label: string; badgeClass: string; iconEmoji: string }> = {
  pending: { label: 'Under Review', badgeClass: 'bg-cream-100 text-tan-700 border-tan-200', iconEmoji: '⏳' },
  'in-progress': { label: 'In Progress', badgeClass: 'bg-peach-100 text-peach-700 border-peach-200', iconEmoji: '☕' },
  fulfilled: { label: 'Added to Site', badgeClass: 'bg-green-100 text-green-800 border-green-200', iconEmoji: '✨' },
  declined: { label: 'On Hold', badgeClass: 'bg-stone-100 text-stone-600 border-stone-200', iconEmoji: '📌' },
};
