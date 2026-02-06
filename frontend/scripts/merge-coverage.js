import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import libCoverage from "istanbul-lib-coverage";
import libReport from "istanbul-lib-report";
import reports from "istanbul-reports";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const OUT_DIR = path.join(root, "coverage-all");

const SOURCES = [
  { label: "unit (vitest)", path: path.join(root, "coverage", "coverage-final.json") },
  { label: "e2e (playwright)", path: path.join(root, "e2e-coverage", "coverage-final.json") },
];

function main() {
  const coverageMap = libCoverage.createCoverageMap();
  let loaded = 0;

  for (const source of SOURCES) {
    if (!fs.existsSync(source.path)) {
      console.warn(`[skip] ${source.label}: ${source.path} not found`);
      continue;
    }

    const data = JSON.parse(fs.readFileSync(source.path, "utf-8"));
    coverageMap.merge(data);
    loaded++;
    console.log(`[ok]   ${source.label}`);
  }

  if (loaded === 0) {
    console.log("\nNo coverage data found. Run test:coverage and test:e2e:coverage first.");
    return;
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const context = libReport.createContext({
    dir: OUT_DIR,
    coverageMap,
    defaultSummarizer: "nested",
  });

  reports.create("text").execute(context);
  reports.create("html").execute(context);
  reports.create("lcov").execute(context);

  console.log(`\nMerged coverage report: ${OUT_DIR}/index.html`);
}

main();
