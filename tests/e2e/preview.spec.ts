import { expect, test } from '@playwright/test';

const title = 'Librarian: tidy up the arcane library';

test('read-only preview supports browsing and persistent progress without runtime errors', async ({
  page,
}) => {
  const errors: string[] = [];
  page.on('pageerror', (error) => errors.push(error.message));
  await page.goto('/');
  await expect(page.getByText(/Preview mode/)).toBeVisible();
  await expect(page.getByRole('button', { name: 'Admin', exact: true })).toHaveCount(0);
  await page.getByRole('textbox', { name: 'Search games' }).fill('  librarian  ');
  await expect(page.getByRole('heading', { name: title })).toBeVisible();
  await page.getByRole('button', { name: new RegExp(title) }).click();
  await page.getByRole('button', { name: 'Mark as complete', exact: true }).first().click();
  await expect(page.getByText('1 / 10 steps', { exact: true })).toBeVisible();
  await expect(page.getByText(/once Supabase is connected/)).toBeVisible();
  await page.getByRole('button', { name: 'Back to all games' }).click();
  await expect(page.getByRole('button', { name: new RegExp(title) })).toContainText('1/10');
  await page.reload();
  await page.getByRole('button', { name: new RegExp(title) }).click();
  await expect(page.getByRole('button', { name: 'Mark as incomplete', exact: true })).toHaveCount(
    1,
  );
  expect(errors).toEqual([]);
});

test('corrupt/blocked storage cannot crash the app', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      get() {
        throw new DOMException('Blocked', 'SecurityError');
      },
    });
  });
  await page.goto('/');
  await page.getByRole('button', { name: new RegExp(title) }).click();
  await page.getByRole('button', { name: 'Mark as complete', exact: true }).first().click();
  await expect(page.getByRole('alert')).toContainText('Browser storage is unavailable');
  await expect(page.getByText('1 / 10 steps', { exact: true })).toBeVisible();
});

test('spoilers can be hidden again and progress reset requires confirmation', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: new RegExp(title) }).click();
  const hint = page.getByText(
    'The green books with gold trim are actually potions books, not herbology. Check the symbol on the spine — a small cauldron means potions.',
  );
  await page.getByRole('button', { name: 'Show spoiler', exact: true }).first().click();
  await expect(page.getByText('Spoiler', { exact: true }).first()).toBeVisible();
  await page.getByRole('button', { name: 'Spoilers: Off' }).click();
  await page.getByRole('button', { name: 'Spoilers: On' }).click();
  await expect(hint).toHaveCount(0);
  await expect(page.getByText('Spoiler', { exact: true })).toHaveCount(0);
  await page.getByRole('button', { name: 'Mark as complete', exact: true }).first().click();
  page.once('dialog', (dialog) => dialog.dismiss());
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await expect(page.getByText('1 / 10 steps', { exact: true })).toBeVisible();
  page.once('dialog', (dialog) => dialog.accept());
  await page.getByRole('button', { name: 'Reset progress' }).click();
  await expect(page.getByText('0 / 10 steps', { exact: true })).toBeVisible();
});

test('mobile navigation reaches About and its corrected contact link', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/');
  await page.getByRole('button', { name: 'About', exact: true }).click();
  await expect(page.getByRole('heading', { name: /A cozy corner/ })).toBeVisible();
  await expect(page.getByRole('link', { name: 'Email us', exact: true }).first()).toHaveAttribute(
    'href',
    'mailto:mjhanesultancruz1514@gmail.com',
  );
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(
    true,
  );
});
