import type { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Heading } from '@ruftech/ui/heading'
import { FeatureCard } from '@ruftech/ui/feature-card'
import { Lock, Code, Server, ShieldCheck } from '@ruftech/icons'
import * as s from './features-section.css'

const features = [
  { key: 'local', icon: <Lock width={24} height={24} /> },
  { key: 'opensource', icon: <Code width={24} height={24} /> },
  { key: 'selfhost', icon: <Server width={24} height={24} /> },
  { key: 'independent', icon: <ShieldCheck width={24} height={24} /> },
] as const

export const FeaturesSection: FC = () => {
  const { t } = useTranslation('home')

  return (
    <section id="features" className={s.section}>
      <Heading level={2}>{t('features.heading')}</Heading>
      <div className={s.grid}>
        {features.map(({ key, icon }) => (
          <FeatureCard
            key={key}
            icon={icon}
            title={t(`features.${key}.title`)}
            description={t(`features.${key}.description`)}
          />
        ))}
      </div>
    </section>
  )
}
