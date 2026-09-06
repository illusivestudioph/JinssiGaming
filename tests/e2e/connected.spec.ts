import { expect, test } from '@playwright/test';
import { mockSupabase, signIn } from './supabaseFixture';

const title = 'Librarian: tidy up the arcane library';

test('a reader signs in and posts persistent, game-scoped notes without admin access', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'player@example.test');
  await expect(page.getByRole('button', { name: 'Sign out', exact: true })).toBeVisible();
  await expect(page.getByRole('button', { name: 'Admin', exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: new RegExp(title) }).click();
  await page
    .getByRole('textbox', { name: 'Leave a helpful note for other players' })
    .fill('This is a helpful note.');
  await page.getByRole('button', { name: 'Post Note' }).click();
  await expect(page.getByText('This is a helpful note.', { exact: true })).toBeVisible();
  expect(state.comments).toHaveLength(1);
  expect(state.comments[0].game_id).toBe('librarian');
  await page.reload();
  await page.getByRole('button', { name: new RegExp(title) }).click();
  await expect(page.getByText('This is a helpful note.', { exact: true })).toBeVisible();
  await page.getByRole('button', { name: 'Back to all games' }).click();
  await page.getByRole('button', { name: /Cellar keeper/ }).click();
  await expect(page.getByText('This is a helpful note.', { exact: true })).toHaveCount(0);
  expect(errors).toEqual([]);
});

test('an admin creates a complete walkthrough draft and only publishes on save', async ({
  page,
}) => {
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'admin@example.test');
  await page.getByRole('button', { name: 'Admin', exact: true }).click();
  await page.getByRole('button', { name: 'Manage Games' }).click();
  await page.getByRole('button', { name: 'Add New Game' }).click();
  expect(state.games).toHaveLength(5);
  await page.getByLabel('Game title', { exact: true }).fill('Browser Tested Game');
  await page.getByLabel('Developer', { exact: true }).fill('Test Studio');
  await page.getByLabel('Game description', { exact: true }).fill('A complete new walkthrough.');
  await page.getByRole('button', { name: 'Add Walkthrough Section' }).click();
  await page.getByRole('button', { name: 'Add Step', exact: true }).click();
  await page.getByLabel('Step 1 title', { exact: true }).fill('First instruction');
  await page
    .getByLabel('Step 1 instructions', { exact: true })
    .fill('Do the thing, then continue.');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Game published.')).toBeVisible();
  expect(state.games).toHaveLength(6);
  await page.getByRole('button', { name: 'Home', exact: true }).click();
  await page.getByRole('button', { name: /Browser Tested Game/ }).click();
  await expect(page.getByRole('heading', { name: 'First instruction' })).toBeVisible();
  await expect(page.getByText('Do the thing, then continue.')).toBeVisible();
  await page.getByRole('button', { name: 'Mark as complete', exact: true }).click();
  await expect(page.getByText('1 / 1 steps', { exact: true })).toBeVisible();
});

test('failed publishing preserves the draft; retry updates the correct revision', async ({
  page,
}) => {
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'admin@example.test');
  await page.getByRole('button', { name: 'Admin', exact: true }).click();
  await page.getByRole('button', { name: 'Manage Games' }).click();
  await page.getByRole('button', { name: `Edit ${title}`, exact: true }).click();
  await page.getByLabel('Game title', { exact: true }).fill('Changed title');
  state.failNextGameSave = true;
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByRole('alert')).toContainText('Save failed');
  await expect(page.getByLabel('Game title', { exact: true })).toHaveValue('Changed title');
  expect(state.games[0].title).toBe(title);
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Game published.')).toBeVisible();
  expect(state.games[0].title).toBe('Changed title');
  expect(state.games[0].revision).toBe(2);
});

test('Storage uploads save a public URL rather than a base64 database payload', async ({
  page,
}) => {
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'admin@example.test');
  await page.getByRole('button', { name: 'Admin', exact: true }).click();
  await page
    .getByLabel('Upload Hero banner', { exact: true })
    .setInputFiles({
      name: 'hero.png',
      mimeType: 'image/png',
      buffer: Buffer.from(
        'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAusB9Wl6B6EAAAAASUVORK5CYII=',
        'base64',
      ),
    });
  await expect(page.getByLabel('Hero banner', { exact: true })).toHaveValue(
    /https:\/\/jinssi-e2e\.supabase\.co\/storage\/v1\/object\/public\/site-assets\//,
  );
  expect(state.uploads).toHaveLength(1);
  expect(state.settings.hero_image).toBe('/banner.jpeg');
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByText('Site settings published.')).toBeVisible();
  expect(state.settings.hero_image).toContain('/storage/v1/object/public/');
});

test('configured connection errors are visible and do not silently serve sample games', async ({
  page,
}) => {
  const state = await mockSupabase(page);
  state.failContent = true;
  await page.goto('/');
  await expect(page.getByRole('heading', { name: 'Content is unavailable' })).toBeVisible();
  await expect(page.getByRole('button', { name: new RegExp(title) })).toHaveCount(0);
  state.failContent = false;
  await page.getByRole('button', { name: 'Retry', exact: true }).click();
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
});

test('a stale admin edit cannot overwrite a newer publication', async ({ page }) => {
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'admin@example.test');
  await page.getByRole('button', { name: 'Admin', exact: true }).click();
  await page.getByRole('button', { name: 'Manage Games' }).click();
  await page.getByRole('button', { name: `Edit ${title}`, exact: true }).click();
  await page.getByLabel('Game title', { exact: true }).fill('Stale local title');
  state.games[0].title = 'Newer published title';
  state.games[0].revision = 2;
  await page.getByRole('button', { name: 'Save Changes' }).click();
  await expect(page.getByRole('alert')).toContainText('changed in another session');
  await expect(page.getByLabel('Game title', { exact: true })).toHaveValue('Stale local title');
  expect(state.games[0].title).toBe('Newer published title');
});

test('signing out warns before discarding an unsaved admin draft', async ({ page }) => {
  const state = await mockSupabase(page);
  await page.goto('/');
  await signIn(page, 'admin@example.test');
  await page.getByRole('button', { name: 'Admin', exact: true }).click();
  await page.getByLabel('Hero banner', { exact: true }).fill('/draft-banner.jpeg');
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByLabel('Hero banner', { exact: true })).toHaveValue('/draft-banner.jpeg');
  expect(state.user).not.toBeNull();
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Sign out', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sign in', exact: true })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Welcome to Jinssi' })).toBeVisible();
  expect(state.settings.hero_image).toBe('/banner.jpeg');
});

test('an empty remote directory remains empty instead of restoring sample content', async ({
  page,
}) => {
  const state = await mockSupabase(page);
  state.games = [];
  await page.goto('/');
  await expect(page.getByText('No games found. Try a different search!')).toBeVisible();
  await expect(page.getByRole('button', { name: new RegExp(title) })).toHaveCount(0);
});
