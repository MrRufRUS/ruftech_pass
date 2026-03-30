import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { httpClient } from '@/shared/http-client-instance'
import { checkAuth } from '@/shared/auth'

export const Route = createFileRoute('/$locale/dashboard')({
  async beforeLoad({ params }) {
    const user = await checkAuth(httpClient)
    if (!import.meta.env.DEV && !user) {
      throw redirect({ to: '/$locale/auth', params: { locale: params.locale } })
    }
    return { user }
  },
  component: () => <Outlet />,
})
