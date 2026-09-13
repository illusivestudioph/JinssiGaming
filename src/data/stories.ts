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
  totalChapters: 15,
  rating: 5,
  readsCount: 148500,
  isPublicDomain: true,
  isPinned: true,
  isPdfEbook: true,
  pdfUrl:
    'https://esjwkwgjnesyvnvuonmd.supabase.co/storage/v1/object/public/site-images/ebooks/2015.77375.The-Children-Of-Mu.pdf',
  pageCount: 290,
  chapters: [
    {
      id: 'mu-ch-1',
      chapterNumber: 1,
      title: 'Chapter I: Geographic Location of Mu and Her People',
      wordCount: 1850,
      readTimeMinutes: 8,
      publishedDate: '1931 Original Edition',
      authorNote: 'Churchward introduces the geographical boundaries of the sunken Pacific continent.',
      content: [
        'Mu, the Motherland of Man, was not an imaginary land. She was an immense continent situated in the Pacific Ocean, extending from north of Hawaii down south as far as the Fijis and Easter Island.',
        'According to the ancient Naacal tablets translated in the temples of India and verified by the Niven stone tablets discovered in Mexico, this great landmass measured more than 5,000 miles from east to west, and over 3,000 miles from north to south.',
        'Here on this vast continent of rolling hills, luxuriant tropical vegetation, and broad navigable rivers, man first appeared upon Earth. Sixty-four millions of people lived here at the zenith of its splendor.',
        'You can read the entire unabridged 290-page original edition with Churchward’s hand-drawn maps and glyphs in the embedded interactive PDF reader above.',
      ],
    },
    {
      id: 'mu-ch-2',
      chapterNumber: 2,
      title: 'Chapter II: The First Colonies of the Motherland',
      wordCount: 1720,
      readTimeMinutes: 7,
      publishedDate: '1931 Original Edition',
      authorNote: 'Tracing the earliest maritime expeditions that ventured eastward and westward from Mu.',
      content: [
        'When the population of Mu grew dense, bold navigators and colonists sailed out in sturdy ships across the oceans to establish colonies in all parts of the globe.',
        'The two main pioneer lines of departure were the Eastern route across the Pacific to Central and North America, and the Western route through Asia, Burma, and India.',
        'Every ancient civilization known to historical antiquity was originally an offshoot colony of this primeval Pacific empire, carrying with them the sacred symbols and architecture of the Motherland.',
      ],
    },
    {
      id: 'mu-ch-3',
      chapterNumber: 3,
      title: 'Chapter III: The Eastern Settlement — North America',
      wordCount: 1940,
      readTimeMinutes: 8,
      publishedDate: '1931 Original Edition',
      authorNote: 'Evidence of Mu settlements along the Pacific coastline of North America.',
      content: [
        'The eastern migrations first reached the western shores of North America. Vast agricultural settlements were founded in the valleys of California, Oregon, and Washington.',
        'Ancient stone ruins, pictographs, and burial mounds throughout the American continent preserve the distinctive sacred symbols of Mu—the radiating sun disc, the tau cross, and the serpent.',
      ],
    },
    {
      id: 'mu-ch-4',
      chapterNumber: 4,
      title: 'Chapter IV: The Cliff Dwellers and Ancient Pueblos',
      wordCount: 1680,
      readTimeMinutes: 7,
      publishedDate: '1931 Original Edition',
      content: [
        'In the canyons of Arizona, New Mexico, and Colorado, the descendants of the colonists sought refuge in cliffs and high mesas after cataclysmic geological upheavals altered the climate.',
        'Their pottery, geometric symbols, and ceremonial kivas directly mirror the Naacal sacred emblems documented across the Pacific.',
      ],
    },
    {
      id: 'mu-ch-5',
      chapterNumber: 5,
      title: 'Chapter V: The Western Settlement — The Great Uighur Empire',
      wordCount: 2100,
      readTimeMinutes: 9,
      publishedDate: '1931 Original Edition',
      content: [
        'The western colonial wave founded the great Uighur Empire, stretching across Central Asia from the Pacific coast of China to the Caspian Sea and eastern Europe.',
        'Churchward details the immense cities of the Uighurs buried beneath the sands of the Gobi Desert, which was once a fertile, temperate garden prior to biblical deluges.',
      ],
    },
    {
      id: 'mu-ch-6',
      chapterNumber: 6,
      title: 'Chapter VI: The Central Empire of India and the Nagas',
      wordCount: 2250,
      readTimeMinutes: 10,
      publishedDate: '1931 Original Edition',
      content: [
        'The colonists who sailed westward across the Bay of Bengal established the Naga Empire in southern Asia. They brought with them the sacred Naacal teachings.',
        'It was in an ancient temple in northern India that Churchward was shown the weathered clay tablets containing the story of creation and the destruction of Mu.',
      ],
    },
    {
      id: 'mu-ch-7',
      chapterNumber: 7,
      title: 'Chapter VII: Egypt and the Ancient Mayas of the Nile',
      wordCount: 2050,
      readTimeMinutes: 9,
      publishedDate: '1931 Original Edition',
      content: [
        'Churchward traces the voyage of Thoth and the Maya-Nile settlements that eventually became dynastic Egypt.',
        'He illustrates how the sacred names of Egyptian deities, the pyramids, and the sphinx derive from the primeval architectural philosophy of Mu.',
      ],
    },
    {
      id: 'mu-ch-8',
      chapterNumber: 8,
      title: 'Chapter VIII: The Phoenicians and Maritime Explorers',
      wordCount: 1800,
      readTimeMinutes: 7,
      publishedDate: '1931 Original Edition',
      content: [
        'The Phoenicians were master mariners whose navigational mastery and cosmic symbols originated from the great maritime traditions of the Motherland.',
      ],
    },
    {
      id: 'mu-ch-9',
      chapterNumber: 9,
      title: 'Chapter IX: The 2,500 Sacred Tablets of Mexico',
      wordCount: 2400,
      readTimeMinutes: 10,
      publishedDate: '1931 Original Edition',
      content: [
        'William Niven’s discovery of 2,500 carved stone tablets near Mexico City provided Churchward with decisive corroborating evidence for the Indian Naacal texts.',
        'These stone tablets record the seven sacred commands of creation, the four primary cosmic forces, and the cataclysmic sinking of the Motherland.',
      ],
    },
    {
      id: 'mu-ch-10',
      chapterNumber: 10,
      title: 'Chapter X: The Cannibals and Survivors of the Southern Seas',
      wordCount: 1750,
      readTimeMinutes: 7,
      publishedDate: '1931 Original Edition',
      content: [
        'When the continent sank into the fiery volcanic abyss, small mountain peaks remained above the waves as solitary islands.',
        'Starving survivors trapped on barren rocks gradually degenerated into savagery, preserving only fragments of their ancestors’ advanced knowledge in songs and stone carvings.',
      ],
    },
    {
      id: 'mu-ch-11',
      chapterNumber: 11,
      title: 'Chapter XI: The Origin of Savagery and Lost Wisdom',
      wordCount: 1600,
      readTimeMinutes: 6,
      publishedDate: '1931 Original Edition',
      content: [
        'Churchward argues that savagery is not the starting point of human evolution, but rather the tragic consequence of civilizational collapse after natural cataclysms.',
      ],
    },
    {
      id: 'mu-ch-12',
      chapterNumber: 12,
      title: 'Chapter XII: The Religion of Mu and The Sacred Symbols',
      wordCount: 2300,
      readTimeMinutes: 9,
      publishedDate: '1931 Original Edition',
      content: [
        'The religion of Mu was monotheistic, revering the Creator through the symbol of the Sun (Ra). The ancient teachings emphasized harmony, purity, and universal brotherhood.',
      ],
    },
    {
      id: 'mu-ch-13',
      chapterNumber: 13,
      title: 'Chapter XIII: Geological Evidence of the Great Submersion',
      wordCount: 2150,
      readTimeMinutes: 9,
      publishedDate: '1931 Original Edition',
      content: [
        'A comprehensive analysis of gas belts, volcanic chambers, and ocean floor soundings across the Pacific basin explaining the collapse of the continent’s granite foundation.',
      ],
    },
    {
      id: 'mu-ch-14',
      chapterNumber: 14,
      title: 'Chapter XIV: Ancient Inscriptions and Megalithic Relics',
      wordCount: 1950,
      readTimeMinutes: 8,
      publishedDate: '1931 Original Edition',
      content: [
        'From Easter Island’s moai and ahu platforms to Ponape’s Nan Madol and Tonga’s trilithon, Churchward documents cyclopean stone architecture left behind across the Pacific.',
      ],
    },
    {
      id: 'mu-ch-15',
      chapterNumber: 15,
      title: 'Chapter XV: The Legacy of the Motherland of Man',
      wordCount: 1700,
      readTimeMinutes: 7,
      publishedDate: '1931 Original Edition',
      content: [
        'A closing synthesis on how the forgotten heritage of Mu connects all human families across continents and millennia.',
      ],
    },
  ],
};

// Initial Library with "The Children of Mu" pinned as #1
export const stories: Story[] = [CHILDREN_OF_MU_STORY];

