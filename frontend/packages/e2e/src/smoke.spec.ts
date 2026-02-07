import { test, expect } from './coverage-fixture';

test('/ loads with Russian title', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/менеджер паролей/i);
});

test('/en/ loads with English title', async ({ page }) => {
  await page.goto('/en/');
  await expect(page.locator('h1')).toContainText('Home');
});

test('/ru/ redirects to /', async ({ page }) => {
  await page.goto('/ru/');
  await page.waitForURL('/');
  expect(page.url()).not.toContain('/ru');
});
