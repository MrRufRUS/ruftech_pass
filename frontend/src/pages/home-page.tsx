import { useTranslation } from 'react-i18next';
import { useDocumentMeta } from '@/shared/i18n';

export function HomePage() {
  const { t } = useTranslation('home');
  useDocumentMeta('home');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </section>
  );
}
