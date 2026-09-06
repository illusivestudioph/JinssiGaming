import type { Game, WalkthroughSection, WalkthroughStep } from '@/data/games';

export function createGame(): Game {
  return {
    id: `game-${crypto.randomUUID()}`,
    title: 'New Game',
    developer: '',
    category: 'Cozy Games',
    description: '',
    coverImage: '/banner.jpeg',
    coverAlt: 'Game cover',
    accentColor: '#E2A88D',
    walkthrough: [],
  };
}

export function createSection(): WalkthroughSection {
  return { id: `section-${crypto.randomUUID()}`, title: 'New Section', steps: [] };
}

export function createStep(): WalkthroughStep {
  return {
    id: `step-${crypto.randomUUID()}`,
    title: 'New Step',
    description: '',
    image: '',
    imageAlt: '',
  };
}

export function updateSection(
  game: Game,
  id: string,
  update: (section: WalkthroughSection) => WalkthroughSection,
): Game {
  return {
    ...game,
    walkthrough: game.walkthrough.map((section) => (section.id === id ? update(section) : section)),
  };
}

export function updateStep(
  game: Game,
  sectionId: string,
  stepId: string,
  patch: Partial<WalkthroughStep>,
): Game {
  return updateSection(game, sectionId, (section) => ({
    ...section,
    steps: section.steps.map((step) => (step.id === stepId ? { ...step, ...patch } : step)),
  }));
}
