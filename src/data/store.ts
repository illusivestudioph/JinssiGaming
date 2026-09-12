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
  },
  {
    id: 'cozy-farm-planner-pdf',
    title: 'Cozy Farm & Town Daily Planner (Printable PDF)',
    description: 'Printable daily and weekly planner sheets tailored for cozy life sims like Stardew Valley, Animal Crossing, and Story of Seasons.',
    price: 'Pay what you want',
    originalPrice: '$3.00',
    gumroadUrl: 'https://gumroad.com',
    kofiUrl: '',
    payhipUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Printable stationery and planner pages',
    category: 'Planners',
    badge: 'Free / $0+',
    features: [
      'High-resolution print-ready PDFs (A4 & Letter)',
      'Crop seasonal calendar & fish schedule tracker',
      'Villager birthday & gift preference notes',
      'Minimalist pastel design easy on ink'
    ],
    rating: 5,
  },
  {
    id: 'cozy-completionist-checklist',
    title: 'Cozy Completionist Checklist & Field Guide',
    description: 'Comprehensive companion checklists covering collectibles, golden walnuts, fish seasons, recipes, and seasonal priorities.',
    price: '$3.99',
    gumroadUrl: 'https://gumroad.com',
    kofiUrl: '',
    payhipUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Cozy gamer desk with guidebook',
    category: 'Checklists',
    badge: 'Staff Pick',
    features: [
      'Interactive fillable PDF and Google Sheet',
      'Organized by season and weather',
      'Spoiler-free hint mode',
      'Free lifetime updates'
    ],
    rating: 5,
  },
  {
    id: 'cozy-notion-hub',
    title: 'Ultimate Cozy Gaming Notion Hub',
    description: 'A beautifully aesthetic Notion template to track cozy games, backlog, daily town routines, farm checklists, and reading logs all in one place.',
    price: '$4.99',
    originalPrice: '$8.00',
    gumroadUrl: 'https://gumroad.com',
    kofiUrl: '',
    payhipUrl: '',
    coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Notion template mockup for cozy gaming backlog',
    category: 'Notion Templates',
    badge: 'Bestseller',
    features: [
      'Game Backlog & Completion Tracker',
      'Daily Town & Farm Routine Planner',
      'Cozy Reading & Journaling Logs',
      'Custom pastel pixel icons & widgets'
    ],
    rating: 5,
  }
];
