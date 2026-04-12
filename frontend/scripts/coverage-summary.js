import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')
const outFile = path.join(root, 'coverage-report.md')

const dirs = [
  ...findDirs('packages'),
  ...findDirs('apps'),
]

function findDirs(base) {
  const dir = path.join(root, base)
  if (!fs.existsSync(dir)) return []
  return fs.readdirSync(dir)
    .map((name) => ({
      label: name,
      file: path.join(dir, name, 'coverage', 'coverage-summary.json'),
    }))
    .filter((d) => fs.existsSync(d.file))
}

function badge(pct) {
  if (pct >= 90) return `${pct}% 🟢`
  if (pct >= 70) return `${pct}% 🟡`
  return `${pct}% 🔴`
}

if (dirs.length === 0) {
  console.log('Отчёты о покрытии не найдены.')
  process.exit(0)
}

const rows = dirs.map(({ label, file }) => {
  const summary = JSON.parse(fs.readFileSync(file, 'utf-8'))
  const t = summary.total
  return {
    label,
    statements: t.statements.pct,
    branches: t.branches.pct,
    functions: t.functions.pct,
    lines: t.lines.pct,
  }
})

const md = [
  '### 🧪 Покрытие тестами',
  '',
  '| Пакет | Строки | Ветви | Функции | Выражения |',
  '| :--- | :---: | :---: | :---: | :---: |',
  ...rows.map((r) =>
    `| **${r.label}** | ${badge(r.lines)} | ${badge(r.branches)} | ${badge(r.functions)} | ${badge(r.statements)} |`,
  ),
  '',
  '> 🟢 >= 90% &ensp; 🟡 >= 70% &ensp; 🔴 < 70%',
].join('\n')

fs.writeFileSync(outFile, md + '\n')
console.log(md)

const summaryFile = process.env.GITHUB_STEP_SUMMARY
if (summaryFile) {
  fs.appendFileSync(summaryFile, md + '\n')
}
