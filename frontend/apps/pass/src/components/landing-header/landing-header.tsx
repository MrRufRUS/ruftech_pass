import type { FC } from 'react'
import { useCallback, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { LanguageSwitcher } from '@ruftech/ui/language-switcher'
import { useHttpClient } from '@ruftech/http-client/react'
import { useLocale, DEFAULT_LOCALE, LOCALES } from '@/shared/i18n'
import { fetchMe } from '@/shared/auth'
import * as s from './landing-header.css'

export type SectionId = 'hero' | 'features' | 'about'

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

export const LandingHeader: FC = () => {
  const { t } = useTranslation('common')
  const locale = useLocale()
  const client = useHttpClient()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  // Check auth status on mount
  useEffect(() => {
    fetchMe(client)
      .then(() => setIsLoggedIn(true))
      .catch(() => setIsLoggedIn(false))
  }, [client])

  // Init and apply theme
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

  const scrollTo = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const dashboardTo = locale === DEFAULT_LOCALE ? '/dashboard' : '/$locale/dashboard'
  const dashboardParams = locale === DEFAULT_LOCALE ? {} : { locale }
  const authTo = locale === DEFAULT_LOCALE ? '/auth' : '/$locale/auth'
  const authParams = locale === DEFAULT_LOCALE ? {} : { locale }

  const locales = LOCALES.map((code) => ({ code, href: getLocaleHref(code) }))

  return (
    <header className={s.header}>
      <div className={s.inner}>
        <div className={s.left}>
          <a href={getLocaleHref(locale)} className={s.brandLink}>
            <span className={s.brandIcon}>🔐</span>
            <span className={s.brandName}>RufTECH Pass</span>
          </a>
          <nav className={s.nav}>
            <button type="button" className={s.navButton} onClick={() => scrollTo('features')}>
              {t('nav.features')}
            </button>
            <button type="button" className={s.navButton} onClick={() => scrollTo('about')}>
              {t('nav.about')}
            </button>
          </nav>
        </div>

        <div className={s.actions}>
          <LanguageSwitcher locales={locales} currentLocale={locale} className={s.langSwitcher} />

          <button
            type="button"
            className={s.themeButton}
            onClick={toggleTheme}
            aria-label={theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>

          {isLoggedIn
            ? (
                <Link to={dashboardTo} params={dashboardParams} className={s.loginLink}>
                  {t('nav.myPasswords')}
                </Link>
              )
            : (
                <Link to={authTo} params={authParams} search={{ redirect: undefined }} className={s.loginLink}>
                  {t('nav.login')}
                </Link>
              )}
        </div>
      </div>
    </header>
  )
}
