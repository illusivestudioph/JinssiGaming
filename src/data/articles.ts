export interface SpecItem {
  label: string;
  value: string;
}

export interface SpecCategory {
  category: string;
  specs: SpecItem[];
}

export interface ComparisonTableData {
  headers: string[];
  rows: string[][];
  highlightColIndex?: number;
}

export interface SourceCitationItem {
  title: string;
  publisher: string;
  url: string;
  note?: string;
}

export interface ArticleSection {
  heading?: string;
  content: string[]; // array of paragraphs
  image?: string;
  imageAlt?: string;
  steamLink?: string;
  sourceLink?: string;
  playStoreLink?: string;
  callout?: {
    title: string;
    text: string;
  };
  // GSMArena-style Hardware Review Components
  pros?: string[];
  cons?: string[];
  specSheet?: SpecCategory[];
  comparisonTable?: ComparisonTableData;
  sourcesList?: SourceCitationItem[];
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date: string;
  readTimeMinutes: number;
  category: 'Curated List' | 'Review' | 'Guide' | 'Cozy Essay' | 'Esports News';
  tags: string[];
  cozyScore: number; // 1 to 5
  stressLevel: 'Zero Stress' | 'Very Low' | 'Gentle Challenge';
  coverImage: string;
  coverAlt: string;
  summary: string;
  sections: ArticleSection[];
  relatedGameId?: string;
  steamLink?: string;
  sourceLink?: string;
  playStoreLink?: string;
  createdAt?: number;
  expiresAt?: number;
}

export const articleCategories = [
  'All',
  'Esports News',
  'Review',
  'Guide',
  'Curated List',
  'Cozy Essay',
] as const;

/**
 * Zero hardcoded articles.
 * All journal articles are dynamically loaded from the live Python scraper daemon
 * via Supabase (scripts/grab_journal_feed.py).
 */
export const articles: Article[] = [];
