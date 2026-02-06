import { test, expect } from "./coverage-fixture";

test("app loads", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveTitle(/менеджер паролей/i);
});
