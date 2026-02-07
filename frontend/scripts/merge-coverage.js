import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import libCoverage from 'istanbul-lib-coverage';
import libReport from 'istanbul-lib-report';
import reports from 'istanbul-reports';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(__dirname, '..');
const OUT_DIR = path.join(root, 'coverage-all');

function findCoverageFiles() {
  const patterns = [
    'packages/*/coverage/coverage-final.json',
    'apps/*/coverage/coverage-final.json',
    'packages/e2e/e2e-coverage/coverage-final.json',
  ];

  const files = [];

  for (const pattern of patterns) {
    const parts = pattern.split('*');
    if (parts.length === 2) {
      // Glob with wildcard
      const dir = path.join(root, parts[0].replace(/\/$/, ''));
      if (!fs.existsSync(dir)) continue;

      for (const entry of fs.readdirSync(dir)) {
        const candidate = path.join(root, parts[0] + entry + parts[1]);
        if (fs.existsSync(candidate)) {
          files.push({ label: entry, path: candidate });
        }
      }
    } else {
      // Exact path
      const candidate = path.join(root, pattern);
      if (fs.existsSync(candidate)) {
        files.push({ label: 'e2e', path: candidate });
      }
    }
  }

  return files;
}

function main() {
  const coverageMap = libCoverage.createCoverageMap();
  const sources = findCoverageFiles();

  if (sources.length === 0) {
    console.log(
      '\nNo coverage data found. Run test:coverage and test:e2e:coverage first.',
    );
    return;
  }

  for (const source of sources) {
    const data = JSON.parse(fs.readFileSync(source.path, 'utf-8'));
    coverageMap.merge(data);
    console.log(`[ok]   ${source.label}: ${source.path}`);
  }

  fs.mkdirSync(OUT_DIR, { recursive: true });

  const context = libReport.createContext({
    dir: OUT_DIR,
    coverageMap,
    defaultSummarizer: 'nested',
  });

  reports.create('text').execute(context);
  reports.create('html').execute(context);
  reports.create('lcov').execute(context);

  console.log(`\nMerged coverage report: ${OUT_DIR}/index.html`);
}

main();
