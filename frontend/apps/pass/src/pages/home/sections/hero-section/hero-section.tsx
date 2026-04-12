import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Logo } from '@ruftech/ui/logo'
import * as s from './hero-section.css'

export const HeroSection: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section id="hero" className={s.section}>
      <div className={s.inner}>
        <Logo width={80} />
        <span className={s.eyebrow}>🔐 Менеджер паролей</span>
        <h1 className={s.title}>{t('hero.title')}</h1>
        <h2 className={s.subtitle}>{t('hero.subtitle')}</h2>
        <p className={s.description}>{t('hero.description')}</p>
      </div>
    </section>
  )
}
