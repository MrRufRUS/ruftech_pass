import { createContext, useContext } from 'react'
import type { ReactNode } from 'react'
import type { i18n } from 'i18next'
import { I18nextProvider } from 'react-i18next'
import type { ILocale } from './i18n'

const LocaleContext = createContext<ILocale | null>(null)

export interface I18nProviderProps {
  locale: ILocale
  i18n: i18n
  children: ReactNode
}

export function I18nProvider({ locale, i18n, children }: I18nProviderProps) {
  return (
    <LocaleContext.Provider value={locale}>
      <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
    </LocaleContext.Provider>
  )
}

export function useLocale(): ILocale {
  const locale = useContext(LocaleContext)

  if (!locale) {
    throw new Error('useLocale must be used within I18nProvider')
  }

  return locale
}
