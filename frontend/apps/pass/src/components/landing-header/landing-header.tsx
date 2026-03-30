import type { FC } from 'react'
import { useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'
import { useLocale, DEFAULT_LOCALE } from '@/shared/i18n'
import * as s from './landing-header.css'

export type SectionId = 'hero' | 'features' | 'about'

export const LandingHeader: FC = () => {
  const { t } = useTranslation('common')
  const locale = useLocale()

  const scrollTo = useCallback((id: SectionId) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }, [])

  const authTo = locale === DEFAULT_LOCALE ? '/auth' : '/$locale/auth'
  const authParams = locale === DEFAULT_LOCALE ? {} : { locale }

  return (
    <header className={s.header}>
      <nav className={s.nav}>
        <button type="button" className={s.navButton} onClick={() => scrollTo('hero')}>
          {t('nav.home')}
        </button>
        <button type="button" className={s.navButton} onClick={() => scrollTo('features')}>
          {t('nav.features')}
        </button>
        <button type="button" className={s.navButton} onClick={() => scrollTo('about')}>
          {t('nav.about')}
        </button>
      </nav>
      <Link to={authTo} params={authParams} className={s.loginLink}>
        {t('nav.login')}
      </Link>
    </header>
  )
}
