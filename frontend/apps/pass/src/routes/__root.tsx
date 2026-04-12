import { useEffect, useMemo } from 'react'
import { createRootRoute, Outlet, useNavigate, useRouterState } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { HttpClientProvider } from '@ruftech/http-client/react'
import { LoggerProvider } from '@ruftech/logger/react'
import { DefaultI18n, I18nProvider, DEFAULT_LOCALE, detectLocale } from '@/shared/i18n'
import { httpClient, logger, setUnauthorizedHandler } from '@/shared/http-client-instance'

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const locale = detectLocale(pathname)
  const navigate = useNavigate()

  const i18n = useMemo(() => DefaultI18n.create(locale), [locale])

  useEffect(() => {
    document.documentElement.lang = locale
    if (i18n.language !== locale) {
      i18n.changeLanguage(locale)
    }
  }, [locale, i18n])

  useEffect(() => {
    setUnauthorizedHandler(() => {
      const currentPath = window.location.pathname
      // Не редиректим, если уже на странице авторизации
      if (currentPath.includes('/auth')) return

      const redirectParam = { redirect: currentPath }
      if (locale === DEFAULT_LOCALE) {
        navigate({ to: '/auth', search: redirectParam })
      } else {
        navigate({ to: '/$locale/auth', params: { locale }, search: redirectParam })
      }
    })
  }, [navigate, locale])

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
