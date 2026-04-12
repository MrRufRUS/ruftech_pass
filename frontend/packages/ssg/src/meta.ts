export interface PageMeta {
  lang: string
  title: string
  description: string
  canonical: string
  hreflang: string
  appHtml?: string
}

/**
 * Injects meta tags into an HTML template string using regex replacements.
 * The template must contain real default values (not placeholders) for all fields.
 */
export function injectMeta(template: string, meta: PageMeta): string {
  let html = template

  if (meta.appHtml) {
    html = html
      .replace('<!--app-html-->', meta.appHtml)
      .replace('<div id="root">', '<div id="root" data-server-rendered>')
  }

  return html
    .replace(/<html lang="[^"]*">/, `<html lang="${meta.lang}">`)
    .replace(/<title>[^<]*<\/title>/, `<title>${meta.title}</title>`)
    .replace(
      /(property="og:title" content=")[^"]*"/,
      `$1${meta.title}"`,
    )
    .replace(
      /(property="twitter:title" content=")[^"]*"/,
      `$1${meta.title}"`,
    )
    .replace(
      /(name="description" content=")[^"]*"/,
      `$1${meta.description}"`,
    )
    .replace(
      /(property="og:description" content=")[^"]*"/,
      `$1${meta.description}"`,
    )
    .replace(
      /(property="twitter:description" content=")[^"]*"/,
      `$1${meta.description}"`,
    )
    .replace(/(rel="canonical" href=")[^"]*"/, `$1${meta.canonical}"`)
    .replace(/(property="og:url" content=")[^"]*"/, `$1${meta.canonical}"`)
    .replace(
      /(property="twitter:url" content=")[^"]*"/,
      `$1${meta.canonical}"`,
    )
    .replace('<!--hreflang-->', meta.hreflang)
}
