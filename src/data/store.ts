export interface StoreProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  gumroadUrl?: string;
  kofiUrl?: string;
  payhipUrl?: string;
  coverImage: string;
  coverAlt?: string;
  category: string;
  badge?: string;
  features?: string[];
  rating?: number;
}

export const storeCategories = [
  'All',
  'Coloring Books',
  'Planners',
  'Checklists',
  'Guides & Planners',
  'Notion Templates',
  'Wallpapers & Art',
  'Printables',
] as const;

export const initialProducts: StoreProduct[] = [
  {
    id: 'modern-witch-grimoire-coloring-pages',
    title: "The Modern Witch's Cozy Grimoire: 30+ Halloween Coloring Pages",
    description: 'Enjoy a relaxing coloring experience with this digital coloring book, created for easy printing at home. Featuring cozy witchy cottages, pumpkins, and magical seasonal scenes.',
    price: '$5',
    originalPrice: '$10',
    gumroadUrl: 'https://sultancruz5.gumroad.com/l/pxowg',
    kofiUrl: '',
    payhipUrl: '',
    coverImage: 'https://public-files.gumroad.com/92t5xc5z6jzk3dvd6yja2xf3p4lk',
    coverAlt: "The Modern Witch's Cozy Grimoire Coloring Book",
    category: 'Coloring Books',
    badge: 'New',
    features: [
      '30+ printable coloring pages',
      'PDF format ready for instant printing',
      'Page size: 8.5 x 8.5 inches / 1:1 ratio',
      'Instant self-download after purchase',
      'Print at home or at your preferred print shop'
    ],
    rating: 5,
  }
];
