import type { Story, StoryChapter } from '@/data/stories';

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
  { label: 'Fairy Tales', query: 'fairy tales' },
  { label: 'Bedtime Mystery', query: 'detective stories' },
  { label: 'Nature & Garden', query: 'nature garden' },
  { label: 'Whimsical Fantasy', query: 'fantasy' },
  { label: 'Folklore & Myths', query: 'folklore' },
  { label: 'Victorian Comfort', query: 'Jane Austen' },
] as const;

// Fallback curated books if Gutendex API is unreachable or slow
export const FALLBACK_GUTENBERG_CATALOG: GutenbergBook[] = [
  {
    id: 113,
    title: 'The Secret Garden',
    authors: [{ name: 'Burnett, Frances Hodgson', birth_year: 1849, death_year: 1924 }],
    subjects: ['Orphans -- Fiction', 'Gardens -- Fiction', 'Yorkshire (England) -- Fiction'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/113/pg113.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/113.html.images',
    },
    download_count: 24890,
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
    download_count: 31200,
  },
  {
    id: 289,
    title: 'The Wind in the Willows',
    authors: [{ name: 'Grahame, Kenneth', birth_year: 1859, death_year: 1932 }],
    subjects: ['Animals -- Fiction', 'Friendship -- Fiction', 'Country life -- England -- Fiction'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/289/pg289.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/289.html.images',
    },
    download_count: 18740,
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
    download_count: 42100,
  },
  {
    id: 1661,
    title: 'The Adventures of Sherlock Holmes',
    authors: [{ name: 'Doyle, Arthur Conan', birth_year: 1859, death_year: 1930 }],
    subjects: ['Holmes, Sherlock (Fictitious character) -- Fiction', 'Private investigators -- England -- Fiction'],
    bookshelves: ['Detective Fiction'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1661/pg1661.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1661.html.images',
    },
    download_count: 53900,
  },
  {
    id: 2591,
    title: "Grimm's Fairy Tales",
    authors: [
      { name: 'Grimm, Jacob', birth_year: 1785, death_year: 1863 },
      { name: 'Grimm, Wilhelm', birth_year: 1786, death_year: 1859 },
    ],
    subjects: ['Fairy tales -- Germany', 'Folklore -- Germany'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/2591/pg2591.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/2591.html.images',
    },
    download_count: 22100,
  },
  {
    id: 1342,
    title: 'Pride and Prejudice',
    authors: [{ name: 'Austen, Jane', birth_year: 1775, death_year: 1817 }],
    subjects: ['Sisters -- Fiction', 'Courtship -- Fiction', 'England -- Fiction'],
    bookshelves: ['Best Books Ever Listings'],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/1342/pg1342.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/1342.html.images',
    },
    download_count: 67300,
  },
  {
    id: 16,
    title: 'Peter Pan (Peter and Wendy)',
    authors: [{ name: 'Barrie, J. M. (James Matthew)', birth_year: 1860, death_year: 1937 }],
    subjects: ['Pirates -- Fiction', 'Neverland (Imaginary place) -- Fiction', 'Peter Pan (Fictitious character)'],
    bookshelves: ["Children's Literature"],
    languages: ['en'],
    formats: {
      'image/jpeg': 'https://www.gutenberg.org/cache/epub/16/pg16.cover.medium.jpg',
      'text/html': 'https://www.gutenberg.org/ebooks/16.html.images',
    },
    download_count: 19400,
  },
];

/**
 * Fetch books from Gutendex API with timeout and fallback
 */
export async function searchGutenbergBooks(
  query: string = '',
  signal?: AbortSignal
): Promise<GutenbergBook[]> {
  const trimmed = query.trim();
  const searchParam = trimmed ? encodeURIComponent(trimmed) : 'fairy%20tales';
  const url = `https://gutendex.com/books/?search=${searchParam}&languages=en`;

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6500);

    const response = await fetch(url, {
      signal: signal || controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      throw new Error(`Gutendex responded with status ${response.status}`);
    }

    const data = (await response.json()) as GutendexResponse;
    if (data.results && data.results.length > 0) {
      return data.results;
    }
  } catch {
    // Return fallback catalog filtered by query if network fails or times out
  }

  // Fallback filter
  if (!trimmed) return FALLBACK_GUTENBERG_CATALOG;
  const qLower = trimmed.toLowerCase();
  const matched = FALLBACK_GUTENBERG_CATALOG.filter(
    (b) =>
      b.title.toLowerCase().includes(qLower) ||
      b.authors.some((a) => a.name.toLowerCase().includes(qLower)) ||
      b.subjects.some((s) => s.toLowerCase().includes(qLower))
  );

  return matched.length > 0 ? matched : FALLBACK_GUTENBERG_CATALOG;
}

/**
 * Convert a Gutenberg book into a Jinssi Story object so it can be read in StoryReaderView
 */
export function convertGutenbergToStory(book: GutenbergBook): Story {
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

  const sampleChapter: StoryChapter = {
    id: `gb-${book.id}-ch1`,
    chapterNumber: 1,
    title: 'Opening Chapter',
    wordCount: 1200,
    readTimeMinutes: 6,
    publishedDate: 'Public Domain (Project Gutenberg)',
    authorNote: `This book is digitized and preserved by Project Gutenberg under the Public Domain. Free to read and share worldwide.`,
    content: [
      `You are reading an authentic public domain edition of "${book.title}" by ${authorName}.`,
      `Preserved and transcribed by Project Gutenberg volunteers worldwide, this classic literature is completely free of copyright restrictions.`,
      `Subjects: ${book.subjects.join(' • ')}`,
      `Full archival downloads and alternative formats (EPUB, Kindle, and plain text) are accessible directly from Project Gutenberg eBook #${book.id}.`,
      `Take your time, brew a warm beverage, and enjoy this timeless story in your favorite eye-comfort palette.`,
    ],
  };

  return {
    id: `gutenberg-${book.id}`,
    slug,
    title: book.title,
    synopsis: `Public domain classic from Project Gutenberg. ${cleanSubjects.join(', ')}. Downloaded and cherished by over ${book.download_count.toLocaleString()} readers worldwide.`,
    author: authorName,
    authorRole: 'Project Gutenberg Classic',
    coverImage,
    coverAlt: `Book cover for ${book.title} by ${authorName}`,
    status: 'Completed',
    genre: 'Classic Literature',
    tags: ['Project Gutenberg', 'Public Domain', ...cleanSubjects.slice(0, 3)],
    totalChapters: 1,
    chapters: [sampleChapter],
    rating: 5,
    readsCount: book.download_count,
    isPublicDomain: true,
  };
}
