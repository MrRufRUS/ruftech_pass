import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ruftech/ui/button'
import * as s from './cta-section.css'

type CtaSectionProps = {
  onSignupClick: () => void
}

export const CtaSection: FC<CtaSectionProps> = ({ onSignupClick }) => {
  const { t } = useTranslation('home')

  return (
    <section className={s.section}>
      <div className={s.inner}>
        <h2 className={s.heading}>{t('cta.heading')}</h2>
        <p className={s.description}>{t('cta.description')}</p>
        <Button variant="surfaceInverted" rounded="full" onClick={onSignupClick}>
          {t('cta.button')}
        </Button>
      </div>
    </section>
  )
}
