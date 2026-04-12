import { describe, it, expect, vi } from 'vitest'
import { screen, within } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ProfileModal } from '@/pages/dashboard/profile-modal'
import { renderWithProviders, createMockClient } from '../test-utils'

const mockNavigate = vi.fn()

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
}))

describe('ProfileModal', () => {
  describe('closed state', () => {
    it('renders nothing when open=false', () => {
      renderWithProviders(<ProfileModal open={false} onClose={vi.fn()} />)
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('open state', () => {
    it('renders profile dialog', () => {
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      expect(screen.getByRole('dialog', { name: 'Профиль' })).toBeVisible()
    })

    it('shows change email section', () => {
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      expect(screen.getByText('Изменить email')).toBeVisible()
    })

    it('shows change password section', () => {
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      expect(screen.getByText('Изменить пароль')).toBeVisible()
    })

    it('shows danger zone section', () => {
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      expect(screen.getByText('Опасная зона')).toBeVisible()
    })

    it('shows delete account button', () => {
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Удалить аккаунт' })).toBeInTheDocument()
    })
  })

  describe('email update', () => {
    it('submits email update', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({ id: 1, username: 'u', email: 'new@example.com' })

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый email'), 'new@example.com')
      await user.click(screen.getByRole('button', { name: 'Сохранить email' }))

      await vi.waitFor(() => {
        expect(client.request).toHaveBeenCalledWith('/v1/jwt/me/', expect.objectContaining({
          method: 'PATCH',
        }))
      })
    })

    it('shows success message after email update', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({ id: 1, username: 'u', email: 'new@example.com' })

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый email'), 'new@example.com')
      await user.click(screen.getByRole('button', { name: 'Сохранить email' }))

      expect(await screen.findByText('Email успешно обновлён')).toBeVisible()
    })
  })

  describe('close', () => {
    it('calls onClose when header close button clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      renderWithProviders(<ProfileModal open={true} onClose={onClose} />)
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))
      expect(onClose).toHaveBeenCalled()
    })
  })

  describe('delete account', () => {
    it('shows delete confirmation when delete button clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      await user.click(screen.getByRole('button', { name: 'Удалить аккаунт' }))
      expect(screen.getByText('Вы уверены? Это действие нельзя отменить. Все ваши пароли будут удалены.')).toBeVisible()
    })

    it('hides confirmation when cancel clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />)
      await user.click(screen.getByRole('button', { name: 'Удалить аккаунт' }))
      await user.click(screen.getByRole('button', { name: 'Отмена' }))
      expect(screen.queryByText('Вы уверены? Это действие нельзя отменить. Все ваши пароли будут удалены.')).not.toBeInTheDocument()
    })

    it('calls navigate after successful account deletion', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({})

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })
      await user.click(screen.getByRole('button', { name: 'Удалить аккаунт' }))
      await user.click(screen.getByRole('button', { name: 'Да, удалить аккаунт' }))

      await vi.waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({ href: '/' }))
      })
    })

    it('hides confirmation on delete API error', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })
      await user.click(screen.getByRole('button', { name: 'Удалить аккаунт' }))
      await user.click(screen.getByRole('button', { name: 'Да, удалить аккаунт' }))

      await vi.waitFor(() => {
        expect(screen.queryByText('Вы уверены? Это действие нельзя отменить. Все ваши пароли будут удалены.')).not.toBeInTheDocument()
      })
    })
  })

  describe('email update error', () => {
    it('shows error alert when email update fails', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый email'), 'fail@example.com')
      await user.click(screen.getByRole('button', { name: 'Сохранить email' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })

    it('dismisses email error alert via onDismiss', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый email'), 'fail@example.com')
      await user.click(screen.getByRole('button', { name: 'Сохранить email' }))

      const alert = await screen.findByRole('alert')
      await user.click(within(alert).getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })

  describe('password update', () => {
    it('calls navigate after successful password update', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({})

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый пароль'), 'newpass123')
      await user.click(screen.getByRole('button', { name: 'Сохранить пароль' }))

      await vi.waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith(expect.objectContaining({ href: '/auth' }))
      })
    })

    it('shows error alert when password update fails', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый пароль'), 'newpass123')
      await user.click(screen.getByRole('button', { name: 'Сохранить пароль' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })

    it('dismisses password error alert via onDismiss', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))

      renderWithProviders(<ProfileModal open={true} onClose={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите новый пароль'), 'newpass123')
      await user.click(screen.getByRole('button', { name: 'Сохранить пароль' }))

      const alert = await screen.findByRole('alert')
      await user.click(within(alert).getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByRole('alert')).not.toBeInTheDocument()
    })
  })
})
