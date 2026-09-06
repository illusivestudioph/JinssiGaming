import { describe, expect, it } from 'vitest';
import { games } from '@/data/games';
import { defaultContent } from '@/data/siteContent';
import { commentSchema, gameSchema, settingsSchema } from './validation';
import { isSafeUrl } from './urls';
import { createGame, createSection, createStep, updateStep } from './editor';
import { readPreviewContent } from './legacyContent';

describe('content validation and immutable editing', () => {
  it('accepts all bundled games and site settings', () => {
    games.forEach((game) => expect(gameSchema.safeParse(game).success).toBe(true));
    expect(settingsSchema.safeParse(defaultContent).success).toBe(true);
  });
  it('constructs complete game/section/step shapes with stable unique IDs', () => {
    const game = createGame();
    expect(game.developer).toBe('');
    expect(game.category).toBe('Cozy Games');
    const section = createSection();
    const step = createStep();
    expect(section.id).not.toEqual(createSection().id);
    expect(step.id).not.toEqual(createStep().id);
    expect(step).toHaveProperty('title');
    expect(step).toHaveProperty('description');
    expect(step).not.toHaveProperty('text');
  });
  it('never mutates published steps while editing a draft', () => {
    const original = structuredClone(games[0]);
    const draft = updateStep(original, 'ch1', 's1', { description: 'Edited instructions' });
    expect(draft.walkthrough[0].steps[0].description).toBe('Edited instructions');
    expect(original).toEqual(games[0]);
    expect(draft.walkthrough[0].steps[0].id).toBe('s1');
  });
  it('rejects malformed legacy editor data and duplicate progress keys', () => {
    const game = structuredClone(games[0]);
    game.walkthrough[0].steps.push({ ...game.walkthrough[0].steps[0] });
    expect(gameSchema.safeParse(game).success).toBe(false);
    expect(gameSchema.safeParse({ ...games[0], developer: undefined }).success).toBe(false);
    expect(
      gameSchema.safeParse({
        ...games[0],
        walkthrough: [{ title: 'Missing id', steps: [{ text: 'Wrong model' }] }],
      }).success,
    ).toBe(false);
  });
  it('rejects ambiguous section/step composite IDs', () => {
    const section = {
      ...games[0].walkthrough[0],
      id: 'one-two',
      steps: [{ ...games[0].walkthrough[0].steps[0], id: 'three' }],
    };
    const other = { ...section, id: 'one', steps: [{ ...section.steps[0], id: 'two-three' }] };
    expect(gameSchema.safeParse({ ...games[0], walkthrough: [section, other] }).success).toBe(
      false,
    );
  });
  it('does not accept a payment wallet without real details', () => {
    expect(
      settingsSchema.safeParse({
        ...defaultContent,
        ctaLinks: [
          {
            id: 'coffee',
            label: 'Coffee',
            url: '#',
            wallets: [{ name: 'GCash', accountName: '', accountNumber: '' }],
          },
        ],
      }).success,
    ).toBe(false);
    expect(defaultContent.ctaLinks.every((link) => !link.wallets)).toBe(true);
  });
  it('handles corrupt local CMS data without writing over the backup', () => {
    const original = JSON.stringify({
      ...defaultContent,
      games: [games[0], null, { title: 'broken' }],
    });
    localStorage.setItem('jinssi-site-content', original);
    expect(readPreviewContent().games).toEqual([games[0]]);
    expect(localStorage.getItem('jinssi-site-content')).toBe(original);
  });
  it('keeps intentionally empty content empty', () => {
    localStorage.setItem('jinssi-site-content', JSON.stringify({ ...defaultContent, games: [] }));
    expect(readPreviewContent().games).toEqual([]);
  });
  it('bounds and trims comment text', () => {
    expect(commentSchema.parse('  Helpful note  ')).toBe('Helpful note');
    expect(commentSchema.safeParse('   ').success).toBe(false);
    expect(commentSchema.safeParse('x'.repeat(2001)).success).toBe(false);
  });
});

describe('editable URLs', () => {
  it.each([
    'javascript:alert(1)',
    'data:text/html,evil',
    '//evil.test',
    '/\\evil.test',
    'https://user:secret@example.com',
    'https://example.com\n',
    'java\u0000script:alert(1)',
  ])('rejects unsafe links: %s', (url) => expect(isSafeUrl(url, 'link')).toBe(false));
  it.each([
    'https://example.com/picture.jpg',
    '/banner.jpeg',
    'http://localhost:54321/storage/v1/object/public/image.png',
  ])('accepts safe image URLs: %s', (url) => expect(isSafeUrl(url, 'image')).toBe(true));
  it('permits mailto only as a link', () => {
    expect(isSafeUrl('mailto:hello@example.com', 'link')).toBe(true);
    expect(isSafeUrl('mailto:hello@example.com', 'image')).toBe(false);
  });
});
