import { classicLiteratureBooks } from './stories/classicLiterature';
import { cozyFantasyBooks } from './stories/cozyFantasy';
import { mysteryBooks } from './stories/mystery';
import { studyMaterialsBooks } from './stories/studyMaterials';

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
  | 'Classic Literature'
  | 'Cozy Fantasy'
  | 'Mystery'
  | 'Study Materials';

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
}

export const storyGenres = [
  'All',
  'Classic Literature',
  'Cozy Fantasy',
  'Mystery',
  'Study Materials',
] as const;

// Combined 48 authentic, public domain books and study materials (12 per category)
export const stories: Story[] = [
  ...classicLiteratureBooks,
  ...cozyFantasyBooks,
  ...mysteryBooks,
  ...studyMaterialsBooks,
];
