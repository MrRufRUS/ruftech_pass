import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, '..')

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

const lines = [
  '## Покрытие тестами',
  '',
  '| Пакет | Строки | Ветви | Функции | Выражения |',
  '|-------|--------|-------|---------|-----------|',
  ...rows.map((r) =>
    `| ${r.label} | ${r.lines}% | ${r.branches}% | ${r.functions}% | ${r.statements}% |`,
  ),
]

console.log(lines.join('\n'))
