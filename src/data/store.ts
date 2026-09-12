export interface StoreProduct {
  id: string;
  title: string;
  description: string;
  price: string;
  originalPrice?: string;
  gumroadUrl: string;
  coverImage: string;
  coverAlt?: string;
  category: string;
  badge?: string;
  features?: string[];
  rating?: number;
}

export const storeCategories = [
  'All',
  'Guides & Planners',
  'Notion Templates',
  'Wallpapers & Art',
  'Printables',
  'Audio & Assets'
] as const;

export const initialProducts: StoreProduct[] = [
  {
    id: 'cozy-notion-hub',
    title: 'Ultimate Cozy Gaming Notion Hub',
    description: 'A beautifully aesthetic Notion template to track cozy games, backlog, daily town routines, farm checklists, and reading logs all in one place.',
    price: '$4.99',
    originalPrice: '$8.00',
    gumroadUrl: 'https://gumroad.com',
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
  },
  {
    id: 'cozy-farm-planner-pdf',
    title: 'Cozy Farm & Town Daily Planner (Printable PDF)',
    description: 'Printable daily and weekly planner sheets tailored for cozy life sims like Stardew Valley, Animal Crossing, and Story of Seasons.',
    price: 'Pay what you want',
    originalPrice: '$3.00',
    gumroadUrl: 'https://gumroad.com',
    coverImage: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Printable stationery and planner pages',
    category: 'Printables',
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
    id: 'pastel-pixel-wallpapers',
    title: 'Cozy Cottage & Rainy Cafe Pixel Wallpaper Pack',
    description: 'Collection of 12 ultra high-resolution aesthetic pixel art wallpapers for 4K desktop monitors, ultrawide displays, and mobile phones.',
    price: '$2.99',
    gumroadUrl: 'https://gumroad.com',
    coverImage: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Pastel aesthetic wallpaper art',
    category: 'Wallpapers & Art',
    badge: 'New',
    features: [
      '12 exclusive 4K (3840x2160) wallpapers',
      'Matching phone wallpapers for iOS & Android',
      'Day & Night cozy room color palettes',
      'Clean unbranded aesthetic'
    ],
    rating: 5,
  },
  {
    id: 'stardew-mastery-checklist',
    title: 'Cozy Completionist Checklist & Field Guide',
    description: 'Comprehensive interactive companion checklist covering collectibles, golden walnuts, fish seasons, recipes, and seasonal priorities.',
    price: '$3.99',
    gumroadUrl: 'https://gumroad.com',
    coverImage: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&auto=format&fit=crop&q=80',
    coverAlt: 'Cozy gamer desk with guidebook',
    category: 'Guides & Planners',
    badge: 'Staff Pick',
    features: [
      'Interactive fillable PDF and Google Sheet',
      'Organized by season and weather',
      'Spoiler-free hint mode',
      'Free lifetime updates'
    ],
    rating: 5,
  },
];
