import { mkdirSync, writeFileSync } from 'node:fs'
import { dirname, resolve } from 'node:path'
import { parseArgs } from 'node:util'
import { generateSvg } from './text-to-paths'

const DEFAULT_FONT = resolve(import.meta.dirname, '../fonts/5muta_sans.ttf')
const DEFAULT_OUTPUT = resolve(import.meta.dirname, '../dist/output.svg')

const { values, positionals } = parseArgs({
  args: process.argv.slice(2),
  options: {
    font: { type: 'string', short: 'f' },
    output: { type: 'string', short: 'o' },
    size: { type: 'string', short: 's' },
    fill: { type: 'string' },
  },
  allowPositionals: true,
})

const text = positionals.join(' ')

if (!text) {
  console.error(
    'Usage: pnpm generate "Hello World" [--font path/to/font] [--output dist/output.svg] [--size 72] [--fill black]',
  )
  process.exit(1)
}

const svg = generateSvg(text, values.font ?? DEFAULT_FONT, {
  fontSize: values.size ? Number(values.size) : undefined,
  fill: values.fill,
})

const output = values.output ?? DEFAULT_OUTPUT
mkdirSync(dirname(output), { recursive: true })
writeFileSync(output, svg)
console.log(`Written to ${output}`)
