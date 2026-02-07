import { useTranslation } from 'react-i18next'
import { Logo } from '@ruftech/ui/logo'
import { useDocumentMeta } from '@/shared/i18n'

export function HomePage() {
  const { t } = useTranslation('home')
  useDocumentMeta('home')

  return (
    <section>
      <Logo />
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </section>
  )
}
