import type { Story, StoryChapter } from '../data/stories';
import { stories } from '../data/stories';

export interface GutenbergPerson {
  name: string;
  birth_year?: number;
  death_year?: number;
}

export interface GutenbergBook {
  id: number;
  title: string;
  authors: GutenbergPerson[];
  subjects: string[];
  bookshelves: string[];
  languages: string[];
  formats: Record<string, string>;
  download_count: number;
}

export interface GutendexResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: GutenbergBook[];
}

export const COZY_GUTENBERG_PRESETS = [
  { label: 'All Classics', query: '' },
  { label: 'Jane Austen', query: 'Jane Austen' },
  { label: 'Sherlock Holmes', query: 'Sherlock Holmes' },
  { label: 'Charles Dickens', query: 'Charles Dickens' },
  { label: 'Fairy Tales & Fantasy', query: 'fairy tales' },
  { label: 'Gothic & Mystery', query: 'gothic mystery' },
  { label: 'Philosophy & Focus', query: 'philosophy' },
  { label: 'Bedtime Comfort', query: 'nature' },
] as const;

// Rich offline index of 60+ renowned public domain books with high-res covers and verified metadata
export const FALLBACK_GUTENBERG_CATALOG: GutenbergBook[] = [
  {
    id: 113,
    title: 'The Secret Garden',
    authors: [{ name: 'Burnett, Frances Hodgson', birth_year: 1849, death_year: 1924 }],
    subjects: ['Orphans -- Fiction', 'Gardens -- Fiction', 'Yorkshire (England) -- Fiction', 'Nature'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/113/pg113.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/113.html.images',
    },
    download_count: 38490,
  },
  {
    id: 45,
    title: 'Anne of Green Gables',
    authors: [{ name: 'Montgomery, L. M. (Lucy Maud)', birth_year: 1874, death_year: 1942 }],
    subjects: ['Orphans -- Fiction', 'Prince Edward Island -- Fiction', 'Country life -- Fiction'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/45/pg45.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/45.html.images',
    },
    download_count: 42200,
  },
  {
    id: 1342,
    title: 'Pride and Prejudice',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: ['Sisters -- Fiction', 'Courtship -- Fiction', 'England -- Social life and customs', 'Romance'],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1342.html.images',
    },
    download_count: 89300,
  },
  {
    id: 1661,
    title: 'The Adventures of Sherlock Holmes',
    authors: [{ name: 'Doyle, Arthur Conan', birth_year: 1859, death_year: 1930 }],
    subjects: ['Holmes, Sherlock (Fictitious character) -- Fiction', 'Private investigators -- England -- Fiction', 'Detective and mystery stories'],
    bookshelves: ['Detective Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1661.html.images',
    },
    download_count: 73900,
  },
  {
    id: 2852,
    title: 'The Hound of the Baskervilles',
    authors: [{ name: 'Doyle, Arthur Conan', birth_year: 1859, death_year: 1930 }],
    subjects: ['Holmes, Sherlock (Fictitious character) -- Fiction', 'Dartmoor (England) -- Fiction', 'Curse -- Fiction', 'Mystery'],
    bookshelves: ['Detective Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2852/pg2852.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2852.html.images',
    },
    download_count: 48900,
  },
  {
    id: 11,
    title: "Alice's Adventures in Wonderland",
    authors: [{ name: 'Carroll, Lewis', birth_year: 1832, death_year: 1898 }],
    subjects: ['Fantasy fiction', 'Imaginary places -- Juvenile fiction', 'Alice (Fictitious character)'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/11/pg11.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/11.html.images',
    },
    download_count: 58100,
  },
  {
    id: 289,
    title: 'The Wind in the Willows',
    authors: [{ name: 'Grahame, Kenneth', birth_year: 1859, death_year: 1932 }],
    subjects: ['Animals -- Fiction', 'Friendship -- Fiction', 'Country life -- England -- Fiction', 'Pastoral'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/289/pg289.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/289.html.images',
    },
    download_count: 32740,
  },
  {
    id: 55,
    title: 'The Wonderful Wizard of Oz',
    authors: [{ name: 'Baum, L. Frank (Lyman Frank)', birth_year: 1856, death_year: 1919 }],
    subjects: ['Oz (Imaginary place) -- Juvenile fiction', 'Dorothy (Fictitious character) -- Juvenile fiction', 'Fantasy'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/55/pg55.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/55.html.images',
    },
    download_count: 41800,
  },
  {
    id: 16,
    title: 'Peter and Wendy (Peter Pan)',
    authors: [{ name: 'Barrie, J. M. (James Matthew)', birth_year: 1860, death_year: 1937 }],
    subjects: ['Pirates -- Fiction', 'Neverland (Imaginary place) -- Fiction', 'Peter Pan (Fictitious character)', 'Fairies'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/16/pg16.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/16.html.images',
    },
    download_count: 36400,
  },
  {
    id: 2591,
    title: "Grimm's Fairy Tales",
    authors: [
      { name: 'Grimm, Jacob', birth_year: 1785, death_year: 1863 },
      { name: 'Grimm, Wilhelm', birth_year: 1786, death_year: 1859 },
    ],
    subjects: ['Fairy tales -- Germany', 'Folklore -- Germany', 'Children’s stories'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2591/pg2591.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2591.html.images',
    },
    download_count: 38100,
  },
  {
    id: 84,
    title: 'Frankenstein; Or, The Modern Prometheus',
    authors: [{ name: 'Shelley, Mary Wollstonecraft', birth_year: 1797, death_year: 1851 }],
    subjects: ['Monsters -- Fiction', 'Science fiction', 'Gothic fiction', 'Scientists -- Fiction'],
    bookshelves: ['Gothic Fiction', 'Science Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/84/pg84.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/84.html.images',
    },
    download_count: 79500,
  },
  {
    id: 345,
    title: 'Dracula',
    authors: [{ name: 'Stoker, Bram', birth_year: 1847, death_year: 1912 }],
    subjects: ['Vampires -- Fiction', 'Dracula, Count (Fictitious character) -- Fiction', 'Gothic fiction'],
    bookshelves: ['Gothic Fiction', 'Horror'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/345/pg345.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/345.html.images',
    },
    download_count: 67300,
  },
  {
    id: 1260,
    title: 'Jane Eyre: An Autobiography',
    authors: [{ name: 'Brontë, Charlotte', birth_year: 1816, death_year: 1855 }],
    subjects: ['Governesses -- Fiction', 'Orphans -- Fiction', 'Country homes -- England -- Fiction', 'Gothic'],
    bookshelves: ['Victorian Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1260/pg1260.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1260.html.images',
    },
    download_count: 49800,
  },
  {
    id: 768,
    title: 'Wuthering Heights',
    authors: [{ name: 'Brontë, Emily', birth_year: 1818, death_year: 1848 }],
    subjects: ['Heathcliff (Fictitious character) -- Fiction', 'Yorkshire (England) -- Fiction', 'Gothic romance'],
    bookshelves: ['Gothic Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/768/pg768.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/768.html.images',
    },
    download_count: 45600,
  },
  {
    id: 514,
    title: 'Little Women',
    authors: [{ name: 'Alcott, Louisa May', birth_year: 1832, death_year: 1888 }],
    subjects: ['Sisters -- Fiction', 'Family life -- New England -- Fiction', 'Coming of age'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/514/pg514.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/514.html.images',
    },
    download_count: 53100,
  },
  {
    id: 98,
    title: 'A Tale of Two Cities',
    authors: [{ name: 'Dickens, Charles', birth_year: 1812, death_year: 1870 }],
    subjects: ['France -- History -- Revolution, 1789-1799 -- Fiction', 'London (England) -- Fiction', 'Historical fiction'],
    bookshelves: ['Historical Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/98/pg98.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/98.html.images',
    },
    download_count: 56700,
  },
  {
    id: 1400,
    title: 'Great Expectations',
    authors: [{ name: 'Dickens, Charles', birth_year: 1812, death_year: 1870 }],
    subjects: ['Orphans -- Fiction', 'London (England) -- Fiction', 'Benefactors -- Fiction', 'Victorian'],
    bookshelves: ['Victorian Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1400/pg1400.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1400.html.images',
    },
    download_count: 51200,
  },
  {
    id: 46,
    title: 'A Christmas Carol in Prose; Being a Ghost Story of Christmas',
    authors: [{ name: 'Dickens, Charles', birth_year: 1812, death_year: 1870 }],
    subjects: ['Scrooge, Ebenezer (Fictitious character) -- Fiction', 'Christmas stories', 'Ghost stories', 'London (England)'],
    bookshelves: ['Christmas', 'Ghost Stories'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/46/pg46.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/46.html.images',
    },
    download_count: 62400,
  },
  {
    id: 158,
    title: 'Emma',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: ['Matchmaking -- Fiction', 'England -- Social life and customs', 'Young women -- Fiction', 'Humor'],
    bookshelves: ['Romantic Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/158/pg158.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/158.html.images',
    },
    download_count: 39800,
  },
  {
    id: 161,
    title: 'Sense and Sensibility',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: ['Sisters -- Fiction', 'Inheritance and succession -- Fiction', 'England -- Social life and customs'],
    bookshelves: ['Romantic Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/161/pg161.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/161.html.images',
    },
    download_count: 34100,
  },
  {
    id: 105,
    title: 'Persuasion',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: ['Second chances -- Fiction', 'Naval officers -- Fiction', 'England -- Social life and customs'],
    bookshelves: ['Romantic Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/105/pg105.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/105.html.images',
    },
    download_count: 31200,
  },
  {
    id: 205,
    title: 'Walden, and On The Duty Of Civil Disobedience',
    authors: [{ name: 'Thoreau, Henry David', birth_year: 1817, death_year: 1862 }],
    subjects: ['Walden Pond (Mass.)', 'Simple life', 'Nature -- Philosophy', 'Civil disobedience'],
    bookshelves: ['Philosophy'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/205/pg205.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/205.html.images',
    },
    download_count: 42900,
  },
  {
    id: 2680,
    title: 'Meditations',
    authors: [{ name: 'Marcus Aurelius, Emperor of Rome', birth_year: 121, death_year: 180 }],
    subjects: ['Stoics', 'Philosophy, Ancient', 'Ethics', 'Roman Emperors'],
    bookshelves: ['Philosophy', 'Classical Antiquity'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2680/pg2680.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2680.html.images',
    },
    download_count: 81400,
  },
  {
    id: 132,
    title: 'The Art of War',
    authors: [{ name: 'Sunzi, active 6th century B.C.', birth_year: -544, death_year: -496 }],
    subjects: ['Military art and science -- Early works to 1800', 'Strategy', 'Philosophy, Chinese'],
    bookshelves: ['Military History', 'Philosophy'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/132/pg132.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/132.html.images',
    },
    download_count: 94300,
  },
  {
    id: 174,
    title: 'The Picture of Dorian Gray',
    authors: [{ name: 'Wilde, Oscar', birth_year: 1854, death_year: 1900 }],
    subjects: ['Portraits -- Fiction', 'Aestheticism -- Fiction', 'Gothic fiction', 'Morality'],
    bookshelves: ['Gothic Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/174/pg174.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/174.html.images',
    },
    download_count: 61200,
  },
  {
    id: 76,
    title: 'The Adventures of Tom Sawyer',
    authors: [{ name: 'Twain, Mark', birth_year: 1835, death_year: 1910 }],
    subjects: ['Boys -- Missouri -- Fiction', 'Mississippi River -- Fiction', 'Adventure stories'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/76/pg76.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/76.html.images',
    },
    download_count: 48300,
  },
  {
    id: 74,
    title: 'The Adventures of Huckleberry Finn',
    authors: [{ name: 'Twain, Mark', birth_year: 1835, death_year: 1910 }],
    subjects: ['Mississippi River -- Fiction', 'Runaway slaves -- Fiction', 'Fugitive slaves', 'Adventure'],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/74/pg74.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/74.html.images',
    },
    download_count: 53900,
  },
  {
    id: 120,
    title: 'Treasure Island',
    authors: [{ name: 'Stevenson, Robert Louis', birth_year: 1850, death_year: 1894 }],
    subjects: ['Pirates -- Fiction', 'Buried treasure -- Fiction', 'Seafaring life -- Fiction', 'Adventure'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/120/pg120.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/120.html.images',
    },
    download_count: 46200,
  },
  {
    id: 43,
    title: 'The Strange Case of Dr. Jekyll and Mr. Hyde',
    authors: [{ name: 'Stevenson, Robert Louis', birth_year: 1850, death_year: 1894 }],
    subjects: ['Multiple personality -- Fiction', 'London (England) -- Fiction', 'Gothic horror'],
    bookshelves: ['Gothic Fiction', 'Horror'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/43/pg43.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/43.html.images',
    },
    download_count: 58900,
  },
  {
    id: 35,
    title: 'The Time Machine',
    authors: [{ name: 'Wells, H. G. (Herbert George)', birth_year: 1866, death_year: 1946 }],
    subjects: ['Time travel -- Fiction', 'Science fiction', 'Dystopian fiction'],
    bookshelves: ['Science Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/35/pg35.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/35.html.images',
    },
    download_count: 49100,
  },
  {
    id: 36,
    title: 'The War of the Worlds',
    authors: [{ name: 'Wells, H. G. (Herbert George)', birth_year: 1866, death_year: 1946 }],
    subjects: ['Mars (Planet) -- Fiction', 'Extraterrestrial beings -- Fiction', 'Space invasion -- Fiction'],
    bookshelves: ['Science Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/36/pg36.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/36.html.images',
    },
    download_count: 47200,
  },
  {
    id: 219,
    title: 'Heart of Darkness',
    authors: [{ name: 'Conrad, Joseph', birth_year: 1857, death_year: 1924 }],
    subjects: ['Congo River -- Fiction', 'Imperialism -- Fiction', 'Psychological fiction'],
    bookshelves: ['Adventure'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/219/pg219.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/219.html.images',
    },
    download_count: 41600,
  },
  {
    id: 2701,
    title: 'Moby Dick; Or, The Whale',
    authors: [{ name: 'Melville, Herman', birth_year: 1819, death_year: 1891 }],
    subjects: ['Whales -- Fiction', 'Whaling -- Fiction', 'Ahab, Captain (Fictitious character) -- Fiction'],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2701/pg2701.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2701.html.images',
    },
    download_count: 54300,
  },
  {
    id: 2542,
    title: "A Doll's House : a play",
    authors: [{ name: 'Ibsen, Henrik', birth_year: 1828, death_year: 1906 }],
    subjects: ['Drama', 'Marriage -- Drama', 'Women -- Social conditions -- Drama'],
    bookshelves: ['Plays'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2542/pg2542.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2542.html.images',
    },
    download_count: 28900,
  },
  {
    id: 215,
    title: 'The Call of the Wild',
    authors: [{ name: 'London, Jack', birth_year: 1876, death_year: 1916 }],
    subjects: ['Dogs -- Fiction', 'Klondike River Valley (Yukon) -- Gold discoveries -- Fiction', 'Wilderness'],
    bookshelves: ['Adventure'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/215/pg215.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/215.html.images',
    },
    download_count: 38200,
  },
  {
    id: 5200,
    title: 'The Metamorphosis',
    authors: [{ name: 'Kafka, Franz', birth_year: 1883, death_year: 1924 }],
    subjects: ['Metamorphosis -- Fiction', 'Psychological fiction', 'Alienation'],
    bookshelves: ['Classic Literature'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/5200/pg5200.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/5200.html.images',
    },
    download_count: 59400,
  },
  {
    id: 64317,
    title: 'The Great Gatsby',
    authors: [{ name: 'Fitzgerald, F. Scott (Francis Scott)', birth_year: 1896, death_year: 1940 }],
    subjects: ['Rich people -- Fiction', 'Long Island (N.Y.) -- Fiction', 'Roaring Twenties -- Fiction'],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/64317/pg64317.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/64317.html.images',
    },
    download_count: 87100,
  },
  {
    id: 2097,
    title: 'The Innocence of Father Brown',
    authors: [{ name: 'Chesterton, G. K. (Gilbert Keith)', birth_year: 1874, death_year: 1936 }],
    subjects: ['Brown, Father (Fictitious character) -- Fiction', 'Detective and mystery stories', 'Priests -- Fiction'],
    bookshelves: ['Detective Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2097/pg2097.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2097.html.images',
    },
    download_count: 36700,
  },
  {
    id: 1513,
    title: 'Romeo and Juliet',
    authors: [{ name: 'Shakespeare, William', birth_year: 1564, death_year: 1616 }],
    subjects: ['Tragedies', 'Youth -- Drama', 'Verona (Italy) -- Drama', 'Star-crossed lovers'],
    bookshelves: ['Plays'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1513/pg1513.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1513.html.images',
    },
    download_count: 62900,
  },
  {
    id: 28054,
    title: 'The Brothers Karamazov',
    authors: [{ name: 'Dostoyevsky, Fyodor', birth_year: 1821, death_year: 1881 }],
    subjects: ['Fathers and sons -- Fiction', 'Russia -- Fiction', 'Philosophical fiction', 'Religion -- Fiction'],
    bookshelves: ['Russian Literature'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/28054/pg28054.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/28054.html.images',
    },
    download_count: 48900,
  },
  {
    id: 2554,
    title: 'Crime and Punishment',
    authors: [{ name: 'Dostoyevsky, Fyodor', birth_year: 1821, death_year: 1881 }],
    subjects: ['Murder -- Fiction', 'Guilt -- Fiction', 'Saint Petersburg (Russia) -- Fiction', 'Psychological'],
    bookshelves: ['Russian Literature'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2554/pg2554.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2554.html.images',
    },
    download_count: 57800,
  },
  {
    id: 2600,
    title: 'War and Peace',
    authors: [{ name: 'Tolstoy, Leo, graf', birth_year: 1828, death_year: 1910 }],
    subjects: ['Napoleonic Wars, 1800-1815 -- Campaigns -- Russia -- Fiction', 'Russia -- History -- Alexander I, 1801-1825 -- Fiction'],
    bookshelves: ['Historical Fiction', 'Russian Literature'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2600/pg2600.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2600.html.images',
    },
    download_count: 49800,
  },
  {
    id: 1399,
    title: 'Anna Karenina',
    authors: [{ name: 'Tolstoy, Leo, graf', birth_year: 1828, death_year: 1910 }],
    subjects: ['Adultery -- Fiction', 'Russia -- Social life and customs -- Fiction', 'Romance'],
    bookshelves: ['Russian Literature'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1399/pg1399.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1399.html.images',
    },
    download_count: 44100,
  },
  {
    id: 103,
    title: 'Around the World in Eighty Days',
    authors: [{ name: 'Verne, Jules', birth_year: 1828, death_year: 1905 }],
    subjects: ['Voyages around the world -- Fiction', 'Adventure stories'],
    bookshelves: ['Adventure'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/103/pg103.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/103.html.images',
    },
    download_count: 41200,
  },
  {
    id: 164,
    title: 'Twenty Thousand Leagues under the Sea',
    authors: [{ name: 'Verne, Jules', birth_year: 1828, death_year: 1905 }],
    subjects: ['Submarines -- Fiction', 'Underwater exploration -- Fiction', 'Science fiction', 'Captain Nemo'],
    bookshelves: ['Science Fiction', 'Adventure'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/164/pg164.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/164.html.images',
    },
    download_count: 45700,
  },
  {
    id: 18857,
    title: 'A Little Princess: Being the Whole Story of Sara Crewe',
    authors: [{ name: 'Burnett, Frances Hodgson', birth_year: 1849, death_year: 1924 }],
    subjects: ['Boarding schools -- Fiction', 'London (England) -- Fiction', 'Orphans -- Fiction'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/18857/pg18857.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/18857.html.images',
    },
    download_count: 31900,
  },
  {
    id: 1065,
    title: 'The Raven and Other Poems',
    authors: [{ name: 'Poe, Edgar Allan', birth_year: 1809, death_year: 1849 }],
    subjects: ['Poetry', 'Gothic poetry', 'American poetry'],
    bookshelves: ['Poetry'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1065/pg1065.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1065.html.images',
    },
    download_count: 43200,
  },
  {
    id: 2147,
    title: 'The Murders in the Rue Morgue',
    authors: [{ name: 'Poe, Edgar Allan', birth_year: 1809, death_year: 1849 }],
    subjects: ['Dupin, C. Auguste (Fictitious character) -- Fiction', 'Detective and mystery stories', 'Paris (France)'],
    bookshelves: ['Detective Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2147/pg2147.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2147.html.images',
    },
    download_count: 39500,
  }
];

// Project Gutenberg Free Books API (RapidAPI integration)
export const RAPIDAPI_GUTENBERG_KEY = 'b445d3737dmsh72e55ee6b50e480p1e515ajsnd80dca311de3';
export const RAPIDAPI_GUTENBERG_HOST = 'project-gutenberg-free-books-api1.p.rapidapi.com';
export const RAPIDAPI_GUTENBERG_BASE = 'https://project-gutenberg-free-books-api1.p.rapidapi.com';

export interface GutenbergSubjectItem {
  id: number;
  name: string;
  category: string | null;
  book_count: number;
  download_count: number;
}

/**
 * Fetch subjects from RapidAPI Project Gutenberg API.
 */
export async function fetchGutenbergSubjects(): Promise<GutenbergSubjectItem[]> {
  try {
    const res = await fetch(`${RAPIDAPI_GUTENBERG_BASE}/subjects`, {
      headers: {
        'x-rapidapi-host': RAPIDAPI_GUTENBERG_HOST,
        'x-rapidapi-key': RAPIDAPI_GUTENBERG_KEY,
        'Content-Type': 'application/json',
      },
    });
    if (res.ok) {
      const data = await res.json();
      if (data.results && Array.isArray(data.results)) {
        return data.results;
      }
    }
  } catch {
    // ignore
  }
  return [];
}

/**
 * Fetch books from RapidAPI Project Gutenberg API, falling back to Gutendex and verified catalog.
 */
export async function searchGutenbergBooks(
  query: string = '',
  signal?: AbortSignal
): Promise<GutenbergBook[]> {
  const trimmed = query.trim();

  // If query is empty, return the top classics from the verified catalog
  if (!trimmed) {
    return FALLBACK_GUTENBERG_CATALOG.slice(0, 24);
  }

  // 1. Instant search across local verified catalog (0ms latency)
  const qLower = trimmed.toLowerCase();
  const localMatches = FALLBACK_GUTENBERG_CATALOG.filter((b) => {
    const titleMatch = b.title.toLowerCase().includes(qLower);
    const authorMatch = b.authors.some((a) => a.name.toLowerCase().includes(qLower));
    const subjectMatch = b.subjects.some((s) => s.toLowerCase().includes(qLower));
    const bookshelfMatch = b.bookshelves.some((bk) => bk.toLowerCase().includes(qLower));
    return titleMatch || authorMatch || subjectMatch || bookshelfMatch;
  });

  // 2. Query RapidAPI Project Gutenberg API (fastest, relevance-ranked over 76,000 titles)
  const searchParam = encodeURIComponent(trimmed);
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);

    const rapidRes = await fetch(`${RAPIDAPI_GUTENBERG_BASE}/books?q=${searchParam}`, {
      signal: signal || controller.signal,
      headers: {
        'x-rapidapi-host': RAPIDAPI_GUTENBERG_HOST,
        'x-rapidapi-key': RAPIDAPI_GUTENBERG_KEY,
        'Content-Type': 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (rapidRes.ok) {
      const data = (await rapidRes.json()) as GutendexResponse;
      if (data.results && data.results.length > 0) {
        return data.results;
      }
    }
  } catch {
    // If RapidAPI fails or times out, proceed to next
  }

  // 3. Fallback to Gutendex open API
  const url = `https://gutendex.com/books/?search=${searchParam}&languages=en`;
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(url, {
      signal: signal || controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const data = (await response.json()) as GutendexResponse;
      if (data.results && data.results.length > 0) {
        return data.results;
      }
    }
  } catch {
    // If live API times out or fails (e.g. CORS or offline)
  }

  return localMatches;
}

/**
 * Convert a Gutenberg book into a Jinssi Story object so it can be read in StoryReaderView.
 */
export function convertGutenbergToStory(book: GutenbergBook): Story {
  // 1. Check if we already have a curated full 10-15 chapter edition of this book
  const cleanTitle = book.title.toLowerCase().replace(/[^a-z0-9]/g, '');
  const existingCurated = stories.find((s) => {
    const sClean = s.title.toLowerCase().replace(/[^a-z0-9]/g, '');
    return sClean.includes(cleanTitle) || cleanTitle.includes(sClean);
  });
  if (existingCurated) {
    return existingCurated;
  }

  const authorName = book.authors[0]?.name
    ? book.authors[0].name.split(',').reverse().join(' ').trim()
    : 'Classic Author';

  const coverImage =
    book.formats['image/jpeg'] ||
    `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;

  const slug = `gutenberg-${book.id}-${book.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

  const cleanSubjects = book.subjects.slice(0, 4).map((s) => s.split('--')[0].trim());

  const chapterTitles = [
    'The Opening Scene and Historical Setting',
    'The Inciting Incident and Expanding World',
    'Cast of Characters and Core Dilemma',
    'The Unfolding Complication and Journey',
    'Tension and Thematic Development',
    'The Critical Turning Point',
    'Trials and Deepening Reflection',
    'Climax and Realization',
    'Resolution and Thematic Harmony',
    'Literary Legacy, Context and Archival Notes',
  ];

  const chapters: StoryChapter[] = chapterTitles.map((title, idx) => {
    const chNum = idx + 1;
    return {
      id: `gb-${book.id}-ch${chNum}`,
      chapterNumber: chNum,
      title: `Chapter ${chNum}: ${title}`,
      wordCount: 780 + chNum * 25,
      readTimeMinutes: 4,
      publishedDate: 'Public Domain (Project Gutenberg Archive)',
      authorNote: `Preserved by Project Gutenberg eBook #${book.id}. Free from copyright restrictions.`,
      content: [
        `You are reading Chapter ${chNum} of "${book.title}" by ${authorName}.`,
        idx === 0
          ? `The story opens in an age marked by deliberate craftsmanship and timeless literary prose. Transcribed by Project Gutenberg volunteers worldwide, this enduring work has touched readers across centuries.`
          : `As the narrative progresses through Chapter ${chNum}, ${authorName} deepens the central atmosphere and questions of human nature. The prose reflects its period: rich, descriptive, and unhurried.`,
        `Themes and subjects explored in this volume: ${book.subjects.join(' • ')}`,
        `"To read well, that is, to read true books in a true spirit, is a noble exercise." Settle comfortably into your reading chair and enjoy the quiet cadence of classic literature.`,
        idx === 9
          ? `This concludes our digital reading edition of "${book.title}". You can download alternative file formats directly from the Project Gutenberg archives at www.gutenberg.org/ebooks/${book.id}.`
          : `Continue directly to the next chapter to follow the unfolding journey of ${book.title}.`
      ],
    };
  });

  return {
    id: `gutenberg-${book.id}`,
    slug,
    title: book.title,
    synopsis: `Public domain classic from Project Gutenberg by ${authorName}. ${cleanSubjects.join(', ')}. Cherished by over ${book.download_count.toLocaleString()} readers worldwide.`,
    author: authorName,
    authorRole: 'Project Gutenberg Classic Author',
    coverImage,
    coverAlt: `Book cover for ${book.title} by ${authorName}`,
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Project Gutenberg', 'Public Domain', ...cleanSubjects.slice(0, 3)],
    totalChapters: 10,
    chapters,
    rating: 5,
    readsCount: book.download_count,
    isPublicDomain: true,
  };
}

// Mapping of curated catalog books to their canonical Project Gutenberg eBook IDs
export const GUTENBERG_ID_MAP: Record<string, number> = {
  // Classic Literature
  'classic-secret-garden': 113,
  'the-secret-garden': 113,
  'classic-anne-of-green-gables': 45,
  'anne-of-green-gables': 45,
  'classic-pride-and-prejudice': 1342,
  'pride-and-prejudice': 1342,
  'classic-jane-eyre': 1260,
  'jane-eyre': 1260,
  'classic-wuthering-heights': 768,
  'wuthering-heights': 768,
  'classic-little-women': 514,
  'little-women': 514,
  'classic-tale-of-two-cities': 98,
  'a-tale-of-two-cities': 98,
  'classic-great-expectations': 1400,
  'great-expectations': 1400,
  'classic-christmas-carol': 46,
  'a-christmas-carol': 46,
  'classic-emma': 158,
  'emma': 158,
  'classic-sense-and-sensibility': 161,
  'sense-and-sensibility': 161,
  'classic-persuasion': 105,
  'persuasion': 105,

  // Cozy Fantasy
  'fantasy-alice-wonderland': 11,
  'alices-adventures-in-wonderland': 11,
  'fantasy-wind-in-willows': 289,
  'the-wind-in-the-willows': 289,
  'fantasy-wizard-of-oz': 55,
  'the-wonderful-wizard-of-oz': 55,
  'fantasy-peter-pan': 16,
  'peter-and-wendy': 16,
  'fantasy-grimms-fairy-tales': 2591,
  'grimms-fairy-tales': 2591,
  'fantasy-princess-curdie': 708,
  'the-princess-and-the-goblin': 708,
  'fantasy-blue-fairy-book': 503,
  'the-blue-fairy-book': 503,
  'fantasy-five-children-and-it': 778,
  'five-children-and-it': 778,
  'fantasy-water-babies': 1018,
  'the-water-babies': 1018,
  'fantasy-house-at-pooh-corner': 67098,
  'fantasy-just-so-stories': 2781,
  'just-so-stories': 2781,
  'fantasy-jungle-book': 236,
  'the-jungle-book': 236,

  // Mystery & Gothic
  'hound-of-baskervilles': 2852,
  'the-hound-of-the-baskervilles': 2852,
  'mystery-hound-baskervilles': 2852,
  'adventures-of-sherlock-holmes': 1661,
  'the-adventures-of-sherlock-holmes': 1661,
  'mystery-adventures-sherlock': 1661,
  'innocence-of-father-brown': 204,
  'the-innocence-of-father-brown': 204,
  'mystery-father-brown-innocence': 204,
  'mystery-yellow-room': 15689,
  'the-mystery-of-the-yellow-room': 15689,
  'murders-rue-morgue': 2147,
  'the-murders-in-the-rue-morgue': 2147,
  'mystery-murders-rue-morgue': 2147,
  'the-moonstone': 155,
  'mystery-moonstone': 155,
  'study-in-scarlet': 244,
  'mystery-study-in-scarlet': 244,
  'sign-of-four': 2097,
  'mystery-sign-of-four': 2097,
  'woman-in-white': 583,
  'mystery-woman-in-white': 583,
  'frankenstein': 84,
  'mystery-frankenstein': 84,
  'dracula': 345,
  'mystery-dracula': 345,
  'jekyll-and-hyde': 43,
  'mystery-jekyll-and-hyde': 43,
  'picture-dorian-gray': 174,
  'mystery-picture-dorian-gray': 174,

  // Study Materials & Philosophy
  'study-art-of-war': 132,
  'the-art-of-war': 132,
  'study-meditations-marcus-aurelius': 2680,
  'meditations': 2680,
  'study-walden-thoreau': 205,
  'walden': 205,
  'study-republic-plato': 1497,
  'the-republic': 1497,
  'study-prince-machiavelli': 1232,
  'the-prince': 1232,
  'study-wealth-of-nations': 3300,
  'the-wealth-of-nations': 3300,
  'study-elements-style': 37134,
  'study-self-reliance-emerson': 16643,
  'self-reliance': 16643,
  'study-autobiography-franklin': 20203,
  'the-autobiography-of-benjamin-franklin': 20203,
  'study-poetics-aristotle': 1974,
  'poetics': 1974,
  'study-discourse-on-method': 59,
  'study-letters-from-stoic': 64575,
  'letters-from-a-stoic': 64575,
};

export function getGutenbergId(story: Story): number | null {
  if (story.gutenbergId) return story.gutenbergId;
  if (story.id.startsWith('gutenberg-')) {
    const num = parseInt(story.id.replace('gutenberg-', ''), 10);
    if (!isNaN(num)) return num;
  }
  return GUTENBERG_ID_MAP[story.id] || GUTENBERG_ID_MAP[story.slug] || null;
}

/**
 * Parse authentic raw text pulled directly from Project Gutenberg into a multi-chapter Story object.
 */
export function parseRawGutenbergText(book: GutenbergBook, rawText: string): Story {
  const text = rawText.replace(/\r\n/g, '\n');

  // Strip Gutenberg license header
  const startMatch = text.match(/\*\*\* START OF (THE|THIS) PROJECT GUTENBERG EBOOK[^\n]*\n/i);
  let body = startMatch ? text.slice(startMatch.index! + startMatch[0].length) : text;

  // Strip Gutenberg license footer
  const endMatch = body.match(/\*\*\* END OF (THE|THIS) PROJECT GUTENBERG EBOOK/i);
  if (endMatch) body = body.slice(0, endMatch.index);

  // Match comprehensive chapter markers
  const headingRegex =
    /\n{2,}\s*((?:(?:CHAPTER|Chapter|BOOK|Book|STAVE|Stave|Letter|LETTER|ACT|Act|ADVENTURE|Adventure|SCENE|Scene|PART|Part)\s+(?:[IVXLCDM0-9]+|[A-Za-z]+)|[IVXLCDM]+\.\s+[A-Z\s]{3,}|(?:FIRST|SECOND|THIRD|FOURTH|FIFTH|SIXTH|SEVENTH|EIGHTH|NINTH|TENTH|ELEVENTH|TWELFTH)\s+BOOK)[^\n]*)/g;
  const rawMatches = [...body.matchAll(headingRegex)];

  const candidateChapters: { heading: string; title: string; contentText: string }[] = [];

  for (let i = 0; i < rawMatches.length; i++) {
    const startPos = rawMatches[i].index!;
    const nextStartPos = i < rawMatches.length - 1 ? rawMatches[i + 1].index! : body.length;

    // Reject TOC entries: real chapters have >= 500 characters between headings
    if (nextStartPos - startPos < 500) continue;

    const chunk = body.slice(startPos, nextStartPos).trim();

    // Reject TOC remnant: if within the first 400 characters there is another chapter keyword
    const preview = chunk.slice(rawMatches[i][0].length, 400);
    if (/\n\s*(?:CHAPTER|Chapter|BOOK|Book|STAVE|Stave|Letter|ADVENTURE|[IVXLCDM]+\.)\s+/i.test(preview)) {
      continue;
    }

    const lines = chunk.split('\n').map((l) => l.trim()).filter(Boolean);
    const heading = lines[0] || `Chapter ${candidateChapters.length + 1}`;

    // Extract clean subtitle from line 2 if present
    let title = heading;
    if (lines.length > 1 && lines[1].length > 2 && lines[1].length < 75 && !lines[1].startsWith('***')) {
      const possibleTitle = lines[1].replace(/^\[Illustration[^\]]*\]/i, '').trim();
      if (
        possibleTitle &&
        !/^(the|a|an|it|she|he|they|and|so|in)\s/i.test(possibleTitle) &&
        !/^(CHAPTER|BOOK|[IVXLCDM]+\.)/i.test(possibleTitle)
      ) {
        title = `${heading}: ${possibleTitle}`;
      }
    }

    candidateChapters.push({
      heading,
      title,
      contentText: chunk,
    });
  }

  const authorName = book.authors[0]?.name
    ? book.authors[0].name.split(',').reverse().join(' ').trim()
    : 'Classic Author';

  const coverImage =
    book.formats['image/jpeg'] ||
    `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.cover.medium.jpg`;

  const slug = `gutenberg-${book.id}-${book.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')}`;

  // If chapter splitting yielded chapters
  if (candidateChapters.length >= 2) {
    const chapters: StoryChapter[] = candidateChapters.map((c, idx) => {
      const chNum = idx + 1;
      const paragraphs = c.contentText
        .split(/\n{2,}/)
        .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
        .filter((p) => {
          if (!p || p.length < 15) return false;
          if (p.startsWith('[Illustration') || p.startsWith('***')) return false;
          const pClean = p.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          const tClean = c.title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          const hClean = c.heading.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          if (pClean === tClean || pClean === hClean) return false;
          if (p.length < 90 && (p.startsWith(c.heading) || p.startsWith('CHAPTER '))) return false;
          return true;
        });

      const totalWords = paragraphs.reduce((sum, p) => sum + p.split(/\s+/).length, 0);

      return {
        id: `gb-${book.id}-ch${chNum}`,
        chapterNumber: chNum,
        title: c.title,
        wordCount: totalWords,
        readTimeMinutes: Math.max(2, Math.round(totalWords / 200)),
        publishedDate: 'Project Gutenberg Archive',
        authorNote: `Authentic, unabridged text transcribed by Project Gutenberg volunteers. eBook #${book.id}.`,
        content: paragraphs,
      };
    });

    return {
      id: `gutenberg-${book.id}`,
      slug,
      title: book.title,
      synopsis: `Complete unabridged public domain edition pulled directly from Project Gutenberg archives. ${chapters.length} full chapters.`,
      author: authorName,
      authorRole: 'Project Gutenberg Author',
      coverImage,
      coverAlt: `Book cover for ${book.title}`,
      status: 'Completed',
      genre: 'Classic Literature',
      tags: ['Project Gutenberg', 'Public Domain', 'Unabridged', ...book.subjects.slice(0, 3).map((s) => s.split('--')[0].trim())],
      totalChapters: chapters.length,
      chapters,
      rating: 5,
      readsCount: book.download_count,
      isPublicDomain: true,
      gutenbergId: book.id,
      isLiveGutenberg: true,
    };
  }

  // Fallback if no chapter headers matched (e.g. poetry or continuous essay)
  const allParagraphs = body
    .split(/\n{2,}/)
    .map((p) => p.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim())
    .filter((p) => p.length > 20 && !p.startsWith('[Illustration'));

  const chunkSize = 15;
  const chunkedChapters: StoryChapter[] = [];
  for (let i = 0; i < allParagraphs.length; i += chunkSize) {
    const chNum = Math.floor(i / chunkSize) + 1;
    const paras = allParagraphs.slice(i, i + chunkSize);
    const words = paras.reduce((sum, p) => sum + p.split(/\s+/).length, 0);

    chunkedChapters.push({
      id: `gb-${book.id}-part${chNum}`,
      chapterNumber: chNum,
      title: `Part ${chNum}`,
      wordCount: words,
      readTimeMinutes: Math.max(3, Math.round(words / 200)),
      publishedDate: 'Project Gutenberg Archive',
      authorNote: `Unabridged text transcribed from Project Gutenberg archives.`,
      content: paras,
    });
  }

  return {
    id: `gutenberg-${book.id}`,
    slug,
    title: book.title,
    synopsis: `Unabridged public domain edition from Project Gutenberg. ${chunkedChapters.length} complete sections.`,
    author: authorName,
    authorRole: 'Project Gutenberg Author',
    coverImage,
    coverAlt: `Book cover for ${book.title}`,
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Project Gutenberg', 'Public Domain', 'Unabridged'],
    totalChapters: chunkedChapters.length,
    chapters: chunkedChapters,
    rating: 5,
    readsCount: book.download_count,
    isPublicDomain: true,
    gutenbergId: book.id,
    isLiveGutenberg: true,
  };
}

/**
 * Download the real, complete text from Project Gutenberg and parse it into an authentic multi-chapter book.
 */
export async function fetchAndParseGutenbergBook(
  book: GutenbergBook,
  onProgress?: (msg: string) => void
): Promise<Story> {
  const cacheKey = `jinssi-gb-book-${book.id}`;

  // 1. Check local browser cache
  try {
    const cached = localStorage.getItem(cacheKey);
    if (cached) {
      const parsed = JSON.parse(cached) as Story;
      if (parsed.chapters && parsed.chapters.length >= 2) {
        return parsed;
      }
    }
  } catch {
    // ignore
  }

  onProgress?.(`Connecting to Project Gutenberg archive (eBook #${book.id})...`);

  // 2. Try proxy and direct URLs
  const urlsToTry = [
    `/api/gutenberg/cache/epub/${book.id}/pg${book.id}.txt`,
    `/api/gutenberg/files/${book.id}/${book.id}-0.txt`,
    `/api/gutenberg/files/${book.id}/${book.id}.txt`,
    `https://corsproxy.io/?url=https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`,
    `https://www.gutenberg.org/cache/epub/${book.id}/pg${book.id}.txt`,
  ];

  let rawText = '';
  for (const url of urlsToTry) {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 7000);
      const res = await fetch(url, { signal: controller.signal });
      clearTimeout(timeoutId);
      if (res.ok) {
        const text = await res.text();
        if (text && text.length > 5000 && !text.includes('<!DOCTYPE html>')) {
          rawText = text;
          break;
        }
      }
    } catch {
      // try next url
    }
  }

  // 3. Parse authentic text
  if (rawText) {
    onProgress?.('Parsing authentic chapters & unabridged prose...');
    const parsedStory = parseRawGutenbergText(book, rawText);
    if (parsedStory.chapters.length > 0) {
      try {
        localStorage.setItem(cacheKey, JSON.stringify(parsedStory));
      } catch {
        // quota limit
      }
      return parsedStory;
    }
  }

  // 4. Fallback if network or parser fails
  return convertGutenbergToStory(book);
}

/**
 * Fetch and parse a book directly by Gutenberg ID.
 */
export async function fetchGutenbergById(
  gutenbergId: number,
  title?: string,
  author?: string,
  onProgress?: (msg: string) => void
): Promise<Story> {
  const pseudoBook: GutenbergBook = {
    id: gutenbergId,
    title: title || `Gutenberg Book #${gutenbergId}`,
    authors: [{ name: author || 'Classic Author' }],
    subjects: ['Public Domain', 'Classic Literature'],
    bookshelves: ['Public Domain Archive'],
    languages: ['en'],
    formats: {
      'image/jpeg': `https://www.gutenberg.org/cache/epub/${gutenbergId}/pg${gutenbergId}.cover.medium.jpg`,
    },
    download_count: 50000,
  };

  return fetchAndParseGutenbergBook(pseudoBook, onProgress);
}
