import * as fontkit from 'fontkit'

interface GenerateSvgOptions {
  /** Font size in px. Default: 72 */
  fontSize?: number
  /** SVG fill attribute. Default: 'currentColor' */
  fill?: string
  /** Decimal precision for path coordinates. Default: 2 */
  precision?: number
}

function roundTo(value: number, precision: number): number {
  const factor = 10 ** precision
  return Math.round(value * factor) / factor
}

function generateSvg(
  text: string,
  fontPath: string,
  options: GenerateSvgOptions = {},
): string {
  const { fontSize = 72, fill = 'currentColor', precision = 2 } = options

  const loaded = fontkit.openSync(fontPath)
  const font = 'fonts' in loaded ? loaded.fonts[0] : loaded
  const run = font.layout(text)
  const scale = fontSize / font.unitsPerEm
  const ascenderPx = fontSize * (font.ascent / font.unitsPerEm)

  const pathSegments: string[] = []
  let x = 0

  for (let i = 0; i < run.glyphs.length; i++) {
    const glyph = run.glyphs[i]
    const position = run.positions[i]

    const dx = x + position.xOffset * scale
    const dy = position.yOffset * scale

    const d = glyph.path
      .scale(scale, -scale)
      .translate(dx, ascenderPx + dy)
      .toSVG()

    if (d) {
      pathSegments.push(d)
    }

    x += position.xAdvance * scale
  }

  const width = roundTo(x, precision)
  const height = roundTo(
    fontSize * ((font.ascent - font.descent) / font.unitsPerEm),
    precision,
  )

  const combinedD = pathSegments.join(' ')

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" width="${width}" height="${height}">`,
    `  <path d="${combinedD}" fill="${fill}"/>`,
    '</svg>',
  ].join('\n')
}

export { generateSvg }
export type { GenerateSvgOptions }
