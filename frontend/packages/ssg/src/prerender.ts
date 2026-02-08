import fs from 'node:fs'
import path from 'node:path'
import { injectMeta } from './meta'

export interface PrerenderOptions {
  /**
   * Route paths to prerender (without locale prefix), e.g. `['/']`, `['/', '/about']`.
   */
  routes: string[]

  /** Absolute path to `dist/` directory. */
  distDir: string

  /** Absolute path to SSR server entry (e.g. `dist/server/entry-server.js`).
   *  Must export `render(url: string): Promise<string>` and
   *  `getMeta(locale: string, pageKey: string): { title: string; description: string }`.
   */
  serverEntry: string

  /** List of supported locales, e.g. `['ru', 'en']`. Defaults to `['ru']`. */
  locales?: string[]

  /** Default locale (served without URL prefix). Defaults to `'ru'`. */
  defaultLocale?: string

  /** Production site URL for canonical/hreflang (no trailing slash). Defaults to `''`. */
  siteUrl?: string
}

interface ServerEntry {
  render(url: string): Promise<string>
  getMeta(
    locale: string,
    pageKey: string,
  ): { title: string, description: string }
}

function routeToPageKey(routePath: string): string {
  const trimmed = routePath.replace(/^\/|\/$/g, '')
  return trimmed || 'home'
}

function buildUrl(
  locale: string,
  routePath: string,
  defaultLocale: string,
): string {
  if (locale === defaultLocale) return routePath
  return routePath === '/' ? `/${locale}/` : `/${locale}${routePath}`
}

function buildHreflangLinks(
  routePath: string,
  locales: string[],
  defaultLocale: string,
  siteUrl: string,
): string {
  return locales
    .map((loc) => {
      const href = `${siteUrl}${buildUrl(loc, routePath, defaultLocale)}`
      return `<link rel="alternate" hreflang="${loc}" href="${href}" />`
    })
    .join('\n  ')
}

export async function prerender(options: PrerenderOptions): Promise<void> {
  const {
    routes,
    distDir,
    serverEntry,
    locales = ['ru'],
    defaultLocale = 'ru',
    siteUrl = '',
  } = options

  const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8')
  const server: ServerEntry = await import(serverEntry)

  // SPA fallback
  const { title: defaultTitle, description: defaultDescription }
    = server.getMeta(defaultLocale, 'home')

  const spaFallback = injectMeta(template, {
    lang: defaultLocale,
    title: defaultTitle,
    description: defaultDescription,
    canonical: siteUrl || '/',
    hreflang: '',
  })
  fs.writeFileSync(path.join(distDir, '200.html'), spaFallback)
  console.log('Created SPA fallback: dist/200.html')

  for (const routePath of routes) {
    const pageKey = routeToPageKey(routePath)
    const hreflang = buildHreflangLinks(
      routePath,
      locales,
      defaultLocale,
      siteUrl,
    )

    for (const locale of locales) {
      const url = buildUrl(locale, routePath, defaultLocale)
      const appHtml = await server.render(url)
      const { title, description } = server.getMeta(locale, pageKey)
      const canonical = `${siteUrl}${url}`

      const html = injectMeta(template, {
        lang: locale,
        title,
        description,
        canonical,
        hreflang,
        appHtml,
      })

      const filePath
        = url === '/'
          ? path.join(distDir, 'index.html')
          : path.join(
              distDir,
              `${url.endsWith('/') ? url : url + '/'}index.html`,
            )

      const dir = path.dirname(filePath)
      if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true })

      fs.writeFileSync(filePath, html)
      console.log(`Pre-rendered: ${url} (${locale})`)
    }
  }

  const serverDir = path.join(distDir, 'server')
  if (fs.existsSync(serverDir)) {
    fs.rmSync(serverDir, { recursive: true, force: true })
    console.log('Cleaned up: dist/server/')
  }
}
