import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, '..', p)

/**
 * добавить сюда роуты для SSG
 */
const SSG_ROUTES = ['/']

async function prerender() {
  const template = fs.readFileSync(resolve('dist/index.html'), 'utf-8')
  const { render } = await import(resolve('dist/server/entry-server.js'))

  // Для СПА роутов
  fs.writeFileSync(resolve('dist/200.html'), template)
  console.log('Created SPA fallback: dist/200.html')

  for (const url of SSG_ROUTES) {
    const appHtml = await render(url)
    const html = template
      .replace('<!--app-html-->', appHtml)
      .replace('<div id="root">', '<div id="root" data-server-rendered>')

    const filePath =
      url === '/'
        ? resolve('dist/index.html')
        : resolve(`dist${url}/index.html`)

    const dir = path.dirname(filePath)
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

    fs.writeFileSync(filePath, html)
    console.log(`Pre-rendered: ${url}`)
  }

  fs.rmSync(resolve('dist/server'), { recursive: true, force: true })
  console.log('Cleaned up: dist/server/')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
