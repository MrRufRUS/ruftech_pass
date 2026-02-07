import { createFileRoute } from '@tanstack/react-router'
import { HomePage } from '@/pages/home-page'

export const Route = createFileRoute('/$locale/')({
  component: HomePage,
})
