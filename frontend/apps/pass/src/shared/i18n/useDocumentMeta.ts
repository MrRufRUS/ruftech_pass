import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import type { resources } from './resources'

type MetaPageKey = keyof (typeof resources)['ru']['meta']

/**
 * Устанавливает document.title и meta description из переводов (неймспейс `meta`).
 * Вызывается в каждой странице с ключом, соответствующим записи в meta.json.
 *
 * @example
 * ```tsx
 * useDocumentMeta('home') // → meta.json → { home: { title, description } }
 * ```
 */
export function useDocumentMeta(pageKey: MetaPageKey) {
  const { t } = useTranslation('meta')

  const title = t(`${pageKey}.title` as `${MetaPageKey}.title`)
  const description = t(`${pageKey}.description` as `${MetaPageKey}.description`)

  useEffect(() => {
    document.title = title

    const metaDescription = document.querySelector('meta[name="description"]')
    if (metaDescription) metaDescription.setAttribute('content', description)

    const ogTitle = document.querySelector('meta[property="og:title"]')
    if (ogTitle) ogTitle.setAttribute('content', title)

    const ogDescription = document.querySelector('meta[property="og:description"]')
    if (ogDescription) ogDescription.setAttribute('content', description)

    const twitterTitle = document.querySelector('meta[property="twitter:title"]')
    if (twitterTitle) twitterTitle.setAttribute('content', title)

    const twitterDescription = document.querySelector('meta[property="twitter:description"]')
    if (twitterDescription) twitterDescription.setAttribute('content', description)
  }, [title, description])
}
