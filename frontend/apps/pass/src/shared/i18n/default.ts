import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import type { ILocale } from './i18n'
import { resources } from './resources'

/**
 * Фабрика i18n-инстанса.
 * Создаёт отдельный инстанс i18next для заданной локали.
 */
export const DefaultI18n: {
  create(locale: ILocale): import('i18next').i18n
} = {
  create(locale: ILocale) {
    const instance = i18next.createInstance()

    instance.use(initReactI18next).init({
      lng: locale,
      defaultNS: 'common',
      ns: ['common', 'home', 'meta', 'auth', 'dashboard'],
      resources,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    })

    return instance
  },
}
