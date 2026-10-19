import type { CommunityRequest } from '@/types/request';

export const initialRequests: CommunityRequest[] = [
  {
    id: 'req-3',
    title: 'The Children of Mu (Original 1931 Facsimile)',
    type: 'book',
    description: 'Unabridged scan of James Churchward\'s classic on the Lost Continent of Mu with the original diagrams and maps.',
    sourceUrl: 'https://archive.org',
    authorOrDev: 'James Churchward',
    requesterName: 'ArchaeologyFan',
    requesterEmail: '',
    status: 'fulfilled',
    upvotes: 56,
    upvotedBy: ['demo-4', 'demo-5'],
    adminNote: 'Now added as the #1 Pinned eBook with complete 300-page authentic PDF and chapters! Enjoy reading!',
    createdAt: '2026-10-10T09:00:00.000Z',
  },
];
