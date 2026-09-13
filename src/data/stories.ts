import { CHILDREN_OF_MU_FULL_CHAPTERS } from './childrenOfMuFullText';

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
  isPinned?: boolean;
  isPdfEbook?: boolean;
  pdfUrl?: string;
  pageCount?: number;
}

export const storyGenres = [
  'All',
  'Classic Literature',
  'Cozy Fantasy',
  'Mystery & Detective',
  'Adventure & Sci-Fi',
  'Study Materials & Philosophy',
] as const;

export const CHILDREN_OF_MU_STORY: Story = {
  id: 'the-children-of-mu',
  slug: 'the-children-of-mu',
  title: 'The Children of Mu',
  synopsis:
    'The legendary 1931 unabridged classic by British explorer James Churchward. Complete 290-page original edition investigating the lost Pacific continent of Mu, primeval human migrations, sacred Naacal stone tablets, and the forgotten prehistoric mother civilization.',
  author: 'James Churchward',
  authorRole: 'British Archaeologist & Explorer (1851–1936)',
  coverImage:
    'https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/covers/the-children-of-mu-cover.jpg',
  coverAlt: 'Antique leather-bound edition cover for The Children of Mu by James Churchward',
  status: 'Completed',
  genre: 'Adventure & Sci-Fi',
  tags: [
    'Pinned eBook',
    'Unabridged PDF',
    'Lost Continent of Mu',
    'Ancient Civilizations',
    'Sacred Tablets',
    'Public Domain',
  ],
  totalChapters: CHILDREN_OF_MU_FULL_CHAPTERS.length,
  rating: 5,
  readsCount: 148500,
  isPublicDomain: true,
  isPinned: true,
  isPdfEbook: true,
  pdfUrl:
    'https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ebooks/childrenofmu0000chur.pdf',
  pageCount: 300,
  chapters: CHILDREN_OF_MU_FULL_CHAPTERS,
};

// Initial Library with "The Children of Mu" pinned as #1
export const stories: Story[] = [CHILDREN_OF_MU_STORY];

