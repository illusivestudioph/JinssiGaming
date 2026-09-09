export interface StoryChapter {
  id: string;
  chapterNumber: number;
  title: string;
  wordCount: number;
  readTimeMinutes: number;
  content: string[]; // array of paragraphs
  authorNote?: string;
  publishedDate: string;
}

export type StoryGenre =
  | 'All Classics'
  | 'Classic Literature'
  | 'Cozy Fantasy'
  | 'Mystery & Detective'
  | 'Adventure & Sci-Fi'
  | 'Study Materials & Philosophy';

export interface Story {
  id: string;
  slug: string;
  title: string;
  synopsis: string;
  author: string;
  authorRole: string;
  coverImage: string;
  coverAlt: string;
  status: 'Ongoing' | 'Completed';
  genre: StoryGenre;
  tags: string[];
  totalChapters: number;
  chapters: StoryChapter[];
  rating: number; // 1 to 5 teacups
  readsCount?: number;
  isPublicDomain?: boolean;
  gutenbergId?: number;
  isLiveGutenberg?: boolean;
}

export const storyGenres = [
  'All',
  'Classic Literature',
  'Cozy Fantasy',
  'Mystery & Detective',
  'Adventure & Sci-Fi',
  'Study Materials & Philosophy',
] as const;

// Dynamic Gutenberg Library - no hardcoded books stored in repository
export const stories: Story[] = [];
