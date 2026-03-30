import { createFileRoute } from '@tanstack/react-router'
import { AuthPage } from '@/pages/auth/auth-page'

export const Route = createFileRoute('/$locale/auth')({
  component: AuthPage,
})
