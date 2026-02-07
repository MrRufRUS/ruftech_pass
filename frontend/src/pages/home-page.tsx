import { useTranslation } from 'react-i18next';

export function HomePage() {
  const { t } = useTranslation('home');

  return (
    <section>
      <h1>{t('title')}</h1>
      <p>{t('description')}</p>
    </section>
  );
}
