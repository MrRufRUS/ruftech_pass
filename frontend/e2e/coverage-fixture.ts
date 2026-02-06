import { test as base, expect } from "@playwright/test";
import { writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { randomUUID } from "node:crypto";

const V8_COVERAGE_DIR = join(process.cwd(), ".v8-coverage");

/**
 * Расширенный test, собирающий V8 coverage с каждой страницы.
 * Данные сохраняются в .v8-coverage/ для последующей конвертации
 * в istanbul-формат скриптом scripts/e2e-coverage.js.
 */
export const test = base.extend({
  page: async ({ page }, use) => {
    await page.coverage.startJSCoverage({ resetOnNavigation: false });
    await use(page);
    const entries = await page.coverage.stopJSCoverage();

    const sourceEntries = entries.filter(
      (e) => e.url.includes("/src/") && !e.url.includes("node_modules"),
    );

    if (sourceEntries.length > 0) {
      mkdirSync(V8_COVERAGE_DIR, { recursive: true });
      writeFileSync(
        join(V8_COVERAGE_DIR, `${randomUUID()}.json`),
        JSON.stringify(sourceEntries),
      );
    }
  },
});

export { expect };
