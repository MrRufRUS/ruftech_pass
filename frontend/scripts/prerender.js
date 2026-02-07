import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, '..', p)

const LOCALES = ['ru', 'en']
const DEFAULT_LOCALE = 'ru'
const SITE_URL = '' // задать при деплое, например https://example.com

/**
 * Маршруты для SSG. Ключ — pageKey (для getMeta), значение — путь (без префикса локали).
 */
const SSG_ROUTES = [
  { pageKey: 'home', path: '/' },
]

function buildUrl(locale, routePath) {
  if (locale === DEFAULT_LOCALE) {
    return routePath
  }
  return routePath === '/' ? `/${locale}/` : `/${locale}${routePath}`
}

function buildHreflangLinks(routePath) {
  return LOCALES.map((loc) => {
    const href = `${SITE_URL}${buildUrl(loc, routePath)}`
    return `<link rel="alternate" hreflang="${loc}" href="${href}" />`
  }).join('\n  ')
}

function injectMeta(template, { lang, title, description, canonical, hreflang, appHtml }) {
  let html = template
  if (appHtml) {
    html = html
      .replace('<!--app-html-->', appHtml)
      .replace('<div id="root">', '<div id="root" data-server-rendered>')
  }
  return html
    .replaceAll('<!--lang-->', lang)
    .replaceAll('<!--title-->', title)
    .replaceAll('<!--description-->', description)
    .replaceAll('<!--canonical-->', canonical)
    .replace('<!--hreflang-->', hreflang)
}

async function prerender() {
  const template = fs.readFileSync(resolve('dist/index.html'), 'utf-8')
  const { render, getMeta } = await import(resolve('dist/server/entry-server.js'))

  // SPA fallback с дефолтной локалью
  const { title: defaultTitle, description: defaultDescription } = getMeta(DEFAULT_LOCALE, 'home')
  const spaFallback = injectMeta(template, {
    lang: DEFAULT_LOCALE,
    title: defaultTitle,
    description: defaultDescription,
    canonical: SITE_URL || '/',
    hreflang: '',
  })
  fs.writeFileSync(resolve('dist/200.html'), spaFallback)
  console.log('Created SPA fallback: dist/200.html')

  for (const route of SSG_ROUTES) {
    for (const locale of LOCALES) {
      const url = buildUrl(locale, route.path)
      const appHtml = await render(url)
      const { title, description } = getMeta(locale, route.pageKey)
      const canonical = `${SITE_URL}${url}`
      const hreflang = buildHreflangLinks(route.path)

      const html = injectMeta(template, {
        lang: locale,
        title,
        description,
        canonical,
        hreflang,
        appHtml,
      })

      const filePath =
        url === '/'
          ? resolve('dist/index.html')
          : resolve(`dist${url.endsWith('/') ? url : url + '/'}index.html`)

      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

      fs.writeFileSync(filePath, html)
      console.log(`Pre-rendered: ${url} (${locale})`)
    }
  }

  fs.rmSync(resolve('dist/server'), { recursive: true, force: true })
  console.log('Cleaned up: dist/server/')
}

prerender().catch((err) => {
  console.error('Prerender failed:', err)
  process.exit(1)
})
