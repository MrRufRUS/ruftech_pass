import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { renderWithProviders, createMockClient } from '../test-utils'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

const mockPasswords = [
  { id: 1, service_name: 'GitHub' },
  { id: 2, service_name: 'Google' },
]

describe('DashboardPage', () => {
  describe('loading state', () => {
    it('starts in loading state', () => {
      const client = createMockClient()
      // Never resolve to keep loading
      client.request.mockReturnValue(new Promise(() => {}))
      renderWithProviders(<DashboardPage />, { client })
      // PasswordList with loading=true renders spinner, not the grid
      expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    })
  })

  describe('loaded state', () => {
    it('shows password list after loading', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue(mockPasswords)
      renderWithProviders(<DashboardPage />, { client })
      expect(await screen.findByText('GitHub')).toBeVisible()
      expect(screen.getByText('Google')).toBeVisible()
    })

    it('shows empty state when no passwords', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })
      expect(await screen.findByText('Нет сохранённых паролей')).toBeVisible()
    })

    it('shows page heading', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })
      expect(await screen.findByRole('heading', { name: 'Менеджер паролей' })).toBeVisible()
    })

    it('shows add-password button', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })
      // Wait for load to complete (button text "Добавить пароль" appears in header and empty state)
      await screen.findByText('Нет сохранённых паролей')
      // The page header "Добавить пароль" button
      const buttons = screen.getAllByRole('button', { name: 'Добавить пароль' })
      expect(buttons.length).toBeGreaterThanOrEqual(1)
    })
  })

  describe('error state', () => {
    it('shows error alert when load fails', async () => {
      const client = createMockClient()
      client.request.mockRejectedValueOnce(new Error('network'))
      renderWithProviders(<DashboardPage />, { client })
      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })

    it('dismisses error when close button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(new Error('network'))
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('Ошибка сети. Попробуйте позже.')
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByText('Ошибка сети. Попробуйте позже.')).not.toBeInTheDocument()
    })
  })

  describe('create password modal', () => {
    it('opens create modal when add button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('Нет сохранённых паролей')
      // Click the header "Добавить пароль" button (first one in the header)
      const addButtons = screen.getAllByRole('button', { name: 'Добавить пароль' })
      await user.click(addButtons[0])

      expect(screen.getByRole('dialog', { name: 'Новый пароль' })).toBeVisible()
    })
  })
})
