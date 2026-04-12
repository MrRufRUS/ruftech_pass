import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpError } from '@ruftech/http-client'
import { DashboardPage } from '@/pages/dashboard/dashboard-page'
import { renderWithProviders, createMockClient } from '../test-utils'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

const mockPasswords = [
  { id: 1, service_name: 'GitHub' },
  { id: 2, service_name: 'Google' },
]

const mockDetail = {
  id: 1,
  service_name: 'GitHub',
  service_url: 'https://github.com',
  login: 'user',
  password: 'secret',
}

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

  describe('handleSelect', () => {
    it('opens detail modal after selecting password', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockResolvedValueOnce(mockDetail)
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))

      expect(await screen.findByRole('dialog', { name: 'Детали пароля' })).toBeVisible()
    })

    it('shows detail content after loading', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockResolvedValueOnce(mockDetail)
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))

      expect(await screen.findByText('user')).toBeVisible()
    })

    it('removes password from list on 404 error', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockRejectedValueOnce(new HttpError(new Response(null, { status: 404 })))
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))

      await vi.waitFor(() => {
        expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
      })
    })

    it('shows network error when getPassword fails', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockRejectedValueOnce(new Error('network'))
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })
  })

  describe('handleCreate', () => {
    it('reloads list after creating password', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce([])
        .mockResolvedValueOnce({})
        .mockResolvedValueOnce([{ id: 99, service_name: 'NewSite' }])
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('Нет сохранённых паролей')
      const addButtons = screen.getAllByRole('button', { name: 'Добавить пароль' })
      await user.click(addButtons[0])

      await user.type(screen.getByPlaceholderText('Например: GitHub'), 'NewSite')
      await user.type(screen.getByPlaceholderText('Введите логин'), 'login')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Сохранить' }))

      expect(await screen.findByText('NewSite')).toBeVisible()
    })
  })

  describe('profile modal', () => {
    it('opens profile modal when profile button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('Нет сохранённых паролей')
      await user.click(screen.getByRole('button', { name: 'Профиль' }))

      expect(screen.getByRole('dialog', { name: 'Профиль' })).toBeVisible()
    })

    it('closes profile modal when close button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue([])
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('Нет сохранённых паролей')
      await user.click(screen.getByRole('button', { name: 'Профиль' }))
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByRole('dialog', { name: 'Профиль' })).not.toBeInTheDocument()
    })
  })

  describe('handleDelete', () => {
    it('opens delete confirm dialog from detail modal', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockResolvedValueOnce(mockDetail)
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))
      await screen.findByRole('dialog', { name: 'Детали пароля' })
      await screen.findByText('user')
      await user.click(screen.getByRole('button', { name: 'Удалить' }))

      expect(screen.getByRole('dialog', { name: 'Удаление' })).toBeVisible()
    })

    it('removes password from list after confirmed deletion', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords) // listPasswords
        .mockResolvedValueOnce(mockDetail) // getPassword
        .mockResolvedValueOnce({}) // deletePassword
        .mockResolvedValueOnce([{ id: 2, service_name: 'Google' }]) // reload
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))
      await screen.findByText('user')
      await user.click(screen.getByRole('button', { name: 'Удалить' }))
      // After detail modal closes, delete confirm dialog has the "Удалить" confirm button
      await user.click(screen.getByRole('button', { name: 'Удалить' }))

      await vi.waitFor(() => {
        expect(screen.queryByText('GitHub')).not.toBeInTheDocument()
      })
    })

    it('shows network error when deletion fails', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce(mockPasswords)
        .mockResolvedValueOnce(mockDetail)
        .mockRejectedValueOnce(new Error('network'))
      renderWithProviders(<DashboardPage />, { client })

      await screen.findByText('GitHub')
      await user.click(screen.getByText('GitHub'))
      await screen.findByText('user')
      await user.click(screen.getByRole('button', { name: 'Удалить' }))
      // After detail modal closes, delete confirm dialog has the "Удалить" confirm button
      await user.click(screen.getByRole('button', { name: 'Удалить' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })
  })
})
