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

export interface ArticleImage {
  url: string;
  caption?: string;
  alt?: string;
  angle?: string;
}

export interface BuildPartItem {
  category: 'CPU' | 'GPU' | 'Motherboard' | 'Memory (RAM)' | 'Storage' | 'Power Supply' | 'Case' | 'Cooler' | string;
  name: string;
  price: string;
  merchant: 'Amazon' | 'eBay' | 'Newegg' | 'Best Buy' | string;
  buyUrl: string;
  imageUrl: string;
  specs?: string;
  notes?: string;
}

export interface ArticleSection {
  heading?: string;
  content: string[];
  image?: string;
  imageAlt?: string;
  gallery?: ArticleImage[];
  steamLink?: string;
  sourceLink?: string;
  playStoreLink?: string;
  callout?: {
    title: string;
    text: string;
  };
  pros?: string[];
  cons?: string[];
  specSheet?: SpecCategory[];
  comparisonTable?: ComparisonTableData;
  sourcesList?: SourceCitationItem[];
  buildParts?: BuildPartItem[];
  totalBuildCost?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  author: string;
  authorRole: string;
  date?: string;
  publishedAt?: string;
  readTimeMinutes?: number;
  readTime?: string;
  category: 'Curated List' | 'Review' | 'Guide' | 'Cozy Essay' | 'Esports News' | string;
  tags?: string[];
  cozyScore?: number;
  stressLevel?: 'Zero Stress' | 'Very Low' | 'Gentle Challenge' | string;
  coverImage: string;
  coverAlt?: string;
  summary: string;
  sections: ArticleSection[];
  gallery?: ArticleImage[];
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

export type ArticleCategory = typeof articleCategories[number];
