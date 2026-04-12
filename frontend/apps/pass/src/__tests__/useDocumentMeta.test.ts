// @vitest-environment happy-dom

import { act, createElement, type ReactNode } from 'react'
import { describe, it, expect, beforeEach } from 'vitest'
import { renderToString } from 'react-dom/server'
import { createRoot } from 'react-dom/client'
import { I18nProvider } from '../shared/i18n/provider'
import { DefaultI18n } from '../shared/i18n/default'
import { useDocumentMeta } from '../shared/i18n/useDocumentMeta'

function createWrapper(locale: 'ru' | 'en') {
  const i18n = DefaultI18n.create(locale)
  return ({ children }: { children: ReactNode }) =>
    createElement(I18nProvider, { locale, i18n, children })
}

describe('useDocumentMeta', () => {
  beforeEach(() => {
    document.title = ''
    document.head.innerHTML = [
      '<meta name="description" content="" />',
      '<meta property="og:title" content="" />',
      '<meta property="og:description" content="" />',
      '<meta property="twitter:title" content="" />',
      '<meta property="twitter:description" content="" />',
    ].join('')
  })

  it('sets document.title from meta translations', async () => {
    function TestComponent() {
      useDocumentMeta('home')
      return createElement('div', null, 'ok')
    }

    const container = document.createElement('div')
    document.body.appendChild(container)

    await act(() => {
      createRoot(container).render(
        createElement(createWrapper('ru'), null, createElement(TestComponent)),
      )
    })

    expect(document.title).toBeTruthy()
    expect(document.title).not.toBe('')
  })

  it('sets meta description', async () => {
    function TestComponent() {
      useDocumentMeta('home')
      return null
    }

    const container = document.createElement('div')
    document.body.appendChild(container)

    act(() => {
      createRoot(container).render(
        createElement(createWrapper('ru'), null, createElement(TestComponent)),
      )
    })

    const meta = document.querySelector('meta[name="description"]')
    expect(meta?.getAttribute('content')).toBeTruthy()
  })

  it('sets og:title and og:description', async () => {
    function TestComponent() {
      useDocumentMeta('home')
      return null
    }

    const container = document.createElement('div')
    document.body.appendChild(container)

    act(() => {
      createRoot(container).render(
        createElement(createWrapper('ru'), null, createElement(TestComponent)),
      )
    })

    const ogTitle = document.querySelector('meta[property="og:title"]')
    const ogDesc = document.querySelector('meta[property="og:description"]')
    expect(ogTitle?.getAttribute('content')).toBeTruthy()
    expect(ogDesc?.getAttribute('content')).toBeTruthy()
  })

  it('sets twitter meta tags', async () => {
    function TestComponent() {
      useDocumentMeta('home')
      return null
    }

    const container = document.createElement('div')
    document.body.appendChild(container)

    act(() => {
      createRoot(container).render(
        createElement(createWrapper('en'), null, createElement(TestComponent)),
      )
    })

    const twTitle = document.querySelector('meta[property="twitter:title"]')
    const twDesc = document.querySelector('meta[property="twitter:description"]')
    expect(twTitle?.getAttribute('content')).toBeTruthy()
    expect(twDesc?.getAttribute('content')).toBeTruthy()
  })

  it('resolves without throwing in SSR context', () => {
    function TestComponent() {
      useDocumentMeta('home')
      return createElement('div', null, 'ssr')
    }

    const html = renderToString(
      createElement(createWrapper('ru'), null, createElement(TestComponent)),
    )
    expect(html).toContain('ssr')
  })
})
