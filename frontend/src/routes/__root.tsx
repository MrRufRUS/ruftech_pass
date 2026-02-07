import { useEffect, useMemo } from 'react'
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  DefaultHttpClient,
  HttpClientProvider,
  withLogging,
} from '@/shared/http'
import { DefaultLogger, LoggerProvider } from '@/shared/logger'
import { DefaultI18n, I18nProvider, detectLocale } from '@/shared/i18n'

// #можемПодменить
const logger = DefaultLogger.create()
const httpClient = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withLogging((info) => logger.log(info.error ? 'error' : 'info', info)))

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = detectLocale(pathname)

  const i18n = useMemo(() => DefaultI18n.create(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  return (
    <LoggerProvider logger={logger}>
      <HttpClientProvider client={httpClient}>
        <I18nProvider locale={locale} i18n={i18n}>
          <Outlet />
          {/* только в development режиме по умолчанию, см
            * https://tanstack.com/router/latest/docs/framework/react/devtools#import-the-devtools
            */}
          <TanStackRouterDevtools position="bottom-right" />
        </I18nProvider>
      </HttpClientProvider>
    </LoggerProvider>
  )
}
