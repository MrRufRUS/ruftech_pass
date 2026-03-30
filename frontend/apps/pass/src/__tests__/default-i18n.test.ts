import { describe, it, expect } from 'vitest'
import { DefaultI18n } from '../shared/i18n/default'

describe('DefaultI18n', () => {
  it('creates an i18next instance with the given locale', () => {
    const i18n = DefaultI18n.create('ru')

    expect(i18n.language).toBe('ru')
  })

  it('creates an instance for en locale', () => {
    const i18n = DefaultI18n.create('en')

    expect(i18n.language).toBe('en')
  })

  it('loads common namespace by default', () => {
    const i18n = DefaultI18n.create('ru')

    expect(i18n.options.defaultNS).toBe('common')
  })

  it('has resources for all configured namespaces', () => {
    const i18n = DefaultI18n.create('ru')
    const ns = i18n.options.ns as string[]

    expect(ns).toContain('common')
    expect(ns).toContain('home')
    expect(ns).toContain('meta')
  })

  it('translates a key from the home namespace', () => {
    const i18n = DefaultI18n.create('ru')
    const title = i18n.t('hero.title', { ns: 'home' })

    expect(title).toBeTruthy()
    expect(title).not.toBe('title')
  })

  it('creates independent instances per call', () => {
    const a = DefaultI18n.create('ru')
    const b = DefaultI18n.create('en')

    expect(a).not.toBe(b)
    expect(a.language).toBe('ru')
    expect(b.language).toBe('en')
  })
})
