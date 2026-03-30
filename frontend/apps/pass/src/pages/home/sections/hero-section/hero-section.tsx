import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@ruftech/ui/logo'
import * as s from './hero-section.css'

export const HeroSection: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section id="hero" className={s.section}>
      <Logo width={80} />
      <h1 className={s.title}>{t('hero.title')}</h1>
      <h2 className={s.subtitle}>{t('hero.subtitle')}</h2>
      <p className={s.description}>{t('hero.description')}</p>
    </section>
  )
}
