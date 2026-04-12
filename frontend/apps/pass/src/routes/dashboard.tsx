import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { httpClient } from '@/shared/http-client-instance'
import { checkAuth } from '@/shared/auth'

export const Route = createFileRoute('/dashboard')({
  async beforeLoad() {
    const user = await checkAuth(httpClient)
    if (!import.meta.env.DEV && !user) {
      throw redirect({ to: '/auth', search: { redirect: undefined } })
    }
    return { user }
  },
  component: () => <Outlet />,
})
