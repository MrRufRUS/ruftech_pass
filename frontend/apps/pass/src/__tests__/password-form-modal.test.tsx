import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordFormModal } from '@/pages/dashboard/password-form-modal'
import { renderWithProviders } from '../test-utils'

describe('PasswordFormModal', () => {
  describe('closed state', () => {
    it('renders nothing when open=false', () => {
      renderWithProviders(
        <PasswordFormModal open={false} mode="create" onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('create mode', () => {
    it('renders with create title', () => {
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.getByRole('dialog', { name: 'Новый пароль' })).toBeVisible()
    })

    it('renders all form fields', () => {
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.getByPlaceholderText('Например: GitHub')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('https://github.com')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Введите логин')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument()
    })

    it('renders save and cancel buttons', () => {
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.getByRole('button', { name: 'Сохранить' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Отмена' })).toBeInTheDocument()
    })

    it('calls onSubmit with valid data', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={onSubmit} onClose={vi.fn()} />
      )

      await user.type(screen.getByPlaceholderText('Например: GitHub'), 'GitHub')
      await user.type(screen.getByPlaceholderText('Введите логин'), 'mylogin')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'mypassword')
      await user.click(screen.getByRole('button', { name: 'Сохранить' }))

      await vi.waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          service_name: 'GitHub',
          login: 'mylogin',
          password: 'mypassword',
        }))
      })
    })

    it('calls onSubmit with empty strings when fields are blank', async () => {
      const user = userEvent.setup()
      const onSubmit = vi.fn().mockResolvedValue(undefined)
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={onSubmit} onClose={vi.fn()} />
      )

      await user.click(screen.getByRole('button', { name: 'Сохранить' }))
      await vi.waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith(expect.objectContaining({
          service_name: '',
          login: '',
          password: '',
        }))
      })
    })
  })

  describe('edit mode', () => {
    const initialData = {
      id: 1,
      service_name: 'GitHub',
      service_url: 'https://github.com',
      login: 'user',
      password: 'hash',
    }

    it('renders with edit title', () => {
      renderWithProviders(
        <PasswordFormModal open={true} mode="edit" initial={initialData} onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.getByRole('dialog', { name: 'Редактирование' })).toBeVisible()
    })

    it('pre-fills form fields with initial data', () => {
      renderWithProviders(
        <PasswordFormModal open={true} mode="edit" initial={initialData} onSubmit={vi.fn()} onClose={vi.fn()} />
      )
      expect(screen.getByDisplayValue('GitHub')).toBeInTheDocument()
      expect(screen.getByDisplayValue('user')).toBeInTheDocument()
    })
  })

  describe('close', () => {
    it('calls onClose when cancel button clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={vi.fn()} onClose={onClose} />
      )
      await user.click(screen.getByRole('button', { name: 'Отмена' }))
      expect(onClose).toHaveBeenCalledOnce()
    })

    it('calls onClose when dialog close button clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      renderWithProviders(
        <PasswordFormModal open={true} mode="create" onSubmit={vi.fn()} onClose={onClose} />
      )
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))
      expect(onClose).toHaveBeenCalledOnce()
    })
  })
})
