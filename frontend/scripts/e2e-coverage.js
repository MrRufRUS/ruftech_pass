import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import v8toIstanbul from "v8-to-istanbul";
import libCoverage from "istanbul-lib-coverage";
import libReport from "istanbul-lib-report";
import reports from "istanbul-reports";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, "..");
const V8_DIR = path.join(root, ".v8-coverage");
const OUT_DIR = path.join(root, "e2e-coverage");

async function main() {
  if (!fs.existsSync(V8_DIR)) {
    console.log("No V8 coverage data found. Run e2e tests first.");
    return;
  }

  const files = fs.readdirSync(V8_DIR).filter((f) => f.endsWith(".json"));

  if (files.length === 0) {
    console.log("No coverage files found.");
    return;
  }

  const coverageMap = libCoverage.createCoverageMap();

  for (const file of files) {
    const entries = JSON.parse(
      fs.readFileSync(path.join(V8_DIR, file), "utf-8"),
    );

    for (const entry of entries) {
      try {
        const url = new URL(entry.url);
        const filePath = path.join(root, url.pathname);

        if (!fs.existsSync(filePath)) continue;
        if (!entry.source) continue;

        const converter = v8toIstanbul(filePath, 0, {
          source: entry.source,
        });
        await converter.load();
        converter.applyCoverage(entry.functions);
        coverageMap.merge(converter.toIstanbul());
      } catch (err) {
        console.warn(`Skipping ${entry.url}: ${err.message}`);
      }
    }
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
  reports.create("json").execute(context);

  fs.rmSync(V8_DIR, { recursive: true, force: true });
  console.log(`\nE2E coverage report: ${OUT_DIR}/index.html`);
}

main().catch((err) => {
  console.error("E2E coverage processing failed:", err);
  process.exit(1);
});
