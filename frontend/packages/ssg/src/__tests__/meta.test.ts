import { describe, it, expect } from 'vitest'
import { injectMeta } from '../meta'

const TEMPLATE = [
  '<!doctype html>',
  '<html lang="ru">',
  '<head>',
  '<title>Default Title</title>',
  '<meta name="description" content="default desc" />',
  '<meta property="og:title" content="default" />',
  '<meta property="og:description" content="default" />',
  '<meta property="og:url" content="/" />',
  '<meta property="twitter:title" content="default" />',
  '<meta property="twitter:description" content="default" />',
  '<meta property="twitter:url" content="/" />',
  '<link rel="canonical" href="/" />',
  '<!--hreflang-->',
  '</head>',
  '<body>',
  '<div id="root"><!--app-html--></div>',
  '</body>',
  '</html>',
].join('\n')

describe('injectMeta', () => {
  it('replaces lang, title, description, canonical, and hreflang', () => {
    const html = injectMeta(TEMPLATE, {
      lang: 'en',
      title: 'My App',
      description: 'App description',
      canonical: 'https://example.com/en/',
      hreflang:
        '<link rel="alternate" hreflang="ru" href="https://example.com/" />',
    })

    expect(html).toContain('<html lang="en">')
    expect(html).toContain('<title>My App</title>')
    expect(html).toContain('name="description" content="App description"')
    expect(html).toContain('property="og:title" content="My App"')
    expect(html).toContain(
      'property="og:description" content="App description"',
    )
    expect(html).toContain('rel="canonical" href="https://example.com/en/"')
    expect(html).toContain(
      'property="og:url" content="https://example.com/en/"',
    )
    expect(html).toContain(
      'property="twitter:url" content="https://example.com/en/"',
    )
    expect(html).toContain('hreflang="ru"')
  })

  it('injects app HTML and adds data-server-rendered', () => {
    const html = injectMeta(TEMPLATE, {
      lang: 'ru',
      title: 'T',
      description: 'D',
      canonical: '/',
      hreflang: '',
      appHtml: '<h1>Hello</h1>',
    })

    expect(html).toContain('<div id="root" data-server-rendered><h1>Hello</h1></div>')
    expect(html).not.toContain('<!--app-html-->')
  })

  it('does not add data-server-rendered when appHtml is absent', () => {
    const html = injectMeta(TEMPLATE, {
      lang: 'ru',
      title: 'T',
      description: 'D',
      canonical: '/',
      hreflang: '',
    })

    expect(html).not.toContain('data-server-rendered')
    expect(html).toContain('<!--app-html-->')
  })
})
