import { describe, it, expect } from 'vitest'
import { createElement } from 'react'
import { renderToString } from 'react-dom/server'
import { I18nProvider, useLocale } from '../shared/i18n/provider'
import { DefaultI18n } from '../shared/i18n/default'

describe('useLocale', () => {
  it('returns the locale from provider', () => {
    const i18n = DefaultI18n.create('en')
    let captured: string | null = null

    function Consumer() {
      captured = useLocale()
      return null
    }

    renderToString(
      createElement(
        I18nProvider,
        { locale: 'en', i18n, children: createElement(Consumer) },
      ),
    )

    expect(captured).toBe('en')
  })

  it('throws when used outside provider', () => {
    function Consumer() {
      useLocale()
      return null
    }

    expect(() => renderToString(createElement(Consumer))).toThrow(
      'useLocale must be used within I18nProvider',
    )
  })
})

describe('I18nProvider', () => {
  it('renders children', () => {
    const i18n = DefaultI18n.create('ru')

    const html = renderToString(
      createElement(
        I18nProvider,
        { locale: 'ru', i18n, children: createElement('span', null, 'hello') },
      ),
    )

    expect(html).toContain('hello')
  })
})
