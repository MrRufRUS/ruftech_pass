import { describe, it, expect } from 'vitest'
import {
  LOCALES,
  DEFAULT_LOCALE,
  isLocale,
  detectLocale,
} from '../shared/i18n/i18n'

describe('i18n constants', () => {
  it('exports supported locales', () => {
    expect(LOCALES).toContain('ru')
    expect(LOCALES).toContain('en')
  })

  it('has ru as default locale', () => {
    expect(DEFAULT_LOCALE).toBe('ru')
  })
})

describe('isLocale', () => {
  it('returns true for supported locales', () => {
    expect(isLocale('ru')).toBe(true)
    expect(isLocale('en')).toBe(true)
  })

  it('returns false for unsupported values', () => {
    expect(isLocale('fr')).toBe(false)
    expect(isLocale('')).toBe(false)
    expect(isLocale('RU')).toBe(false)
  })
})

describe('detectLocale', () => {
  it('returns default locale for root path', () => {
    expect(detectLocale('/')).toBe('ru')
  })

  it('detects en from pathname', () => {
    expect(detectLocale('/en/')).toBe('en')
    expect(detectLocale('/en/about')).toBe('en')
  })

  it('returns default for ru prefix (default locale is not in URL)', () => {
    expect(detectLocale('/ru/')).toBe('ru')
    expect(detectLocale('/ru/about')).toBe('ru')
  })

  it('returns default for unknown locale segment', () => {
    expect(detectLocale('/about')).toBe('ru')
    expect(detectLocale('/fr/page')).toBe('ru')
  })

  it('returns default for empty string', () => {
    expect(detectLocale('')).toBe('ru')
  })
})
