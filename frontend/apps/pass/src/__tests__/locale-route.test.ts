import { describe, it, expect } from 'vitest'
import { isLocale, DEFAULT_LOCALE } from '../shared/i18n/i18n'

describe('$locale route guard logic', () => {
  it('rejects unknown locale', () => {
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('de')).toBe(false)
    expect(isLocale('123')).toBe(false)
  })

  it('detects default locale should redirect', () => {
    const locale = 'ru'
    expect(isLocale(locale)).toBe(true)
    expect(locale === DEFAULT_LOCALE).toBe(true)
  })

  it('allows valid non-default locale', () => {
    const locale = 'en'
    expect(isLocale(locale)).toBe(true)
    expect(locale === DEFAULT_LOCALE).toBe(false)
  })
})
