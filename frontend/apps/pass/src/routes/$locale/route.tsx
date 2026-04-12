import {
  createFileRoute,
  Outlet,
  redirect,
  notFound,
} from '@tanstack/react-router'
import { isLocale, DEFAULT_LOCALE } from '@/shared/i18n'

export const Route = createFileRoute('/$locale')({
  beforeLoad({ params }) {
    if (!isLocale(params.locale)) {
      throw notFound()
    }
    if (params.locale === DEFAULT_LOCALE) {
      throw redirect({ to: '/' })
    }
  },
  component: () => <Outlet />,
})
