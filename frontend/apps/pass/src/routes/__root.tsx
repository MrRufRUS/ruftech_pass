import { useEffect, useMemo } from 'react'
import { createRootRoute, Outlet, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { DefaultHttpClient, withLogging } from '@ruftech/http-client'
import { HttpClientProvider } from '@ruftech/http-client/react'
import { DefaultLogger } from '@ruftech/logger'
import { LoggerProvider } from '@ruftech/logger/react'
import { DefaultI18n, I18nProvider, detectLocale } from '@/shared/i18n'

const logger = DefaultLogger.create()
const httpClient = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withLogging((info) => logger.log(info.error ? 'error' : 'info', info)))

export const Route = createRootRoute({ component: RootLayout })

// eslint-disable-next-line react-refresh/only-export-components
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
          <TanStackRouterDevtools position="bottom-right" />
        </I18nProvider>
      </HttpClientProvider>
    </LoggerProvider>
  )
}
