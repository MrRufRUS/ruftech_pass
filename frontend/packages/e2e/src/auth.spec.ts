import { test, expect } from './coverage-fixture';

test('auth page renders login form', async ({ page }) => {
  await page.goto('/auth');
  await expect(page.locator('input[name="username"]')).toBeVisible();
  await expect(page.locator('input[name="password"]')).toBeVisible();
  await expect(page.locator('button[type="submit"]')).toBeVisible();
});

test('auth page has correct document title', async ({ page }) => {
  await page.goto('/auth');
  await expect(page).toHaveTitle(/Вход/);
});

test('empty form shows validation errors', async ({ page }) => {
  await page.goto('/auth');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('input[aria-invalid="true"]')).toHaveCount(2);
});

test('/en/auth renders English heading', async ({ page }) => {
  await page.goto('/en/auth');
  await expect(page.locator('h1')).toContainText('Log In');
});

test('error alert is dismissible', async ({ page }) => {
  await page.goto('/auth');
  await page.locator('input[name="username"]').fill('test');
  await page.locator('input[name="password"]').fill('test');
  await page.locator('button[type="submit"]').click();
  await expect(page.locator('[role="alert"]')).toBeVisible();
  await page.locator('[role="alert"] button').click();
  await expect(page.locator('[role="alert"]')).not.toBeVisible();
});
