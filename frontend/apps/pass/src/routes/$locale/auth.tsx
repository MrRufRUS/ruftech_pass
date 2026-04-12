import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '@/pages/auth/auth-page'

export const Route = createFileRoute('/$locale/auth')({
  validateSearch: (search: Record<string, unknown>) => ({
    redirect: typeof search.redirect === 'string' ? search.redirect : undefined,
  }),
  component: AuthPage,
})
