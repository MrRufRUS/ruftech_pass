import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { LanguageSwitcher } from '@ruftech/ui/language-switcher'
import { useLocale, DEFAULT_LOCALE, LOCALES } from '@/shared/i18n'
import * as s from './auth-header.css'

function getLocaleHref(locale: string): string {
  return locale === DEFAULT_LOCALE ? '/' : `/${locale}`
}

function getStoredTheme(): 'light' | 'dark' {
  try {
    const saved = localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
  } catch {
    // ignore storage errors
  }
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export const AuthHeader: FC = () => {
  const locale = useLocale()
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    const initial = getStoredTheme()
    setTheme(initial)
    document.documentElement.setAttribute('data-theme', initial)
  }, [])

  const toggleTheme = useCallback(() => {
    setTheme((prev) => {
      const next = prev === 'dark' ? 'light' : 'dark'
      document.documentElement.setAttribute('data-theme', next)
      try {
        localStorage.setItem('theme', next)
      } catch {
        // ignore storage errors
      }
      return next
    })
  }, [])

  const locales = LOCALES.map((code) => ({ code, href: getLocaleHref(code) }))

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.brand}>
          <span className={s.brandIcon}>🔐</span>
          <span className={s.brandName}>RufTECH Pass</span>
        </div>

        <div className={s.actions}>
          <LanguageSwitcher locales={locales} currentLocale={locale} />

          <button
            type="button"
            className={s.themeButton}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </header>
  )
}
