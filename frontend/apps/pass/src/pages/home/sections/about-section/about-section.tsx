import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Heading } from '@ruftech/ui/heading'
import * as s from './about-section.css'

export const AboutSection: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section id="about" className={s.section}>
      <Heading level={2}>{t('about.heading')}</Heading>
      <p className={s.description}>{t('about.description')}</p>
    </section>
  )
}
