import { describe, it, expect, vi, beforeEach } from 'vitest'
import fs from 'node:fs'
import { prerender } from '../prerender'

vi.mock('node:fs')

const TEMPLATE = [
  '<!doctype html>',
  '<html lang="ru">',
  '<head>',
  '<title>Default</title>',
  '<meta name="description" content="default" />',
  '<link rel="canonical" href="/" />',
  '<!--hreflang-->',
  '</head>',
  '<body><div id="root"><!--app-html--></div></body>',
  '</html>',
].join('\n')

const mockRender = vi.fn().mockResolvedValue('<h1>Rendered</h1>')
const mockGetMeta = vi.fn().mockReturnValue({
  title: 'Page Title',
  description: 'Page Description',
})

vi.doMock('/fake/dist/server/entry-server.js', () => ({
  render: mockRender,
  getMeta: mockGetMeta,
}))

describe('prerender', () => {
  beforeEach(() => {
    vi.mocked(fs.readFileSync).mockReturnValue(TEMPLATE)
    vi.mocked(fs.existsSync).mockReturnValue(false)
    vi.mocked(fs.writeFileSync).mockImplementation(() => {})
    vi.mocked(fs.mkdirSync).mockImplementation(() => '' as never)
    mockRender.mockClear()
    mockGetMeta.mockClear()
  })

  it('creates SPA fallback at 200.html', async () => {
    await prerender({
      routes: ['/'],
      distDir: '/fake/dist',
      serverEntry: '/fake/dist/server/entry-server.js',
    })

    const calls = vi.mocked(fs.writeFileSync).mock.calls
    const spaCall = calls.find(
      (c) => typeof c[0] === 'string' && c[0].endsWith('200.html'),
    )
    expect(spaCall).toBeDefined()
    expect(spaCall![1]).toContain('<html lang="ru">')
  })

  it('renders each route for each locale', async () => {
    await prerender({
      routes: ['/'],
      distDir: '/fake/dist',
      serverEntry: '/fake/dist/server/entry-server.js',
      locales: ['ru', 'en'],
      defaultLocale: 'ru',
    })

    expect(mockRender).toHaveBeenCalledWith('/')
    expect(mockRender).toHaveBeenCalledWith('/en/')
    expect(mockGetMeta).toHaveBeenCalledWith('ru', 'home')
    expect(mockGetMeta).toHaveBeenCalledWith('en', 'home')
  })

  it('maps route paths to page keys', async () => {
    await prerender({
      routes: ['/', '/about'],
      distDir: '/fake/dist',
      serverEntry: '/fake/dist/server/entry-server.js',
    })

    expect(mockGetMeta).toHaveBeenCalledWith('ru', 'home')
    expect(mockGetMeta).toHaveBeenCalledWith('ru', 'about')
  })

  it('injects rendered HTML with data-server-rendered', async () => {
    await prerender({
      routes: ['/'],
      distDir: '/fake/dist',
      serverEntry: '/fake/dist/server/entry-server.js',
    })

    const calls = vi.mocked(fs.writeFileSync).mock.calls
    const indexCall = calls.find(
      (c) =>
        typeof c[0] === 'string'
        && c[0].endsWith('index.html')
        && !c[0].endsWith('200.html'),
    )
    expect(indexCall).toBeDefined()
    expect(indexCall![1]).toContain('data-server-rendered')
    expect(indexCall![1]).toContain('<h1>Rendered</h1>')
  })
})
