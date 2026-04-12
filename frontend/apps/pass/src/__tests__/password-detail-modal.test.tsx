import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordDetailModal } from '@/pages/dashboard/password-detail-modal'
import { renderWithProviders } from '../test-utils'

const mockDetail = {
  id: 1,
  service_name: 'GitHub',
  service_url: 'https://github.com',
  login: 'myuser',
  password: 'mysecret',
}

describe('PasswordDetailModal', () => {
  describe('closed state', () => {
    it('renders nothing when open=false', () => {
      renderWithProviders(
        <PasswordDetailModal
          open={false}
          detail={null}
          loading={false}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onClose={vi.fn()}
        />,
      )
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })
  })

  describe('loading state', () => {
    it('renders dialog without footer buttons when loading', () => {
      renderWithProviders(
        <PasswordDetailModal
          open={true}
          detail={null}
          loading={true}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onClose={vi.fn()}
        />,
      )
      expect(screen.getByRole('dialog', { name: 'Детали пароля' })).toBeVisible()
      expect(screen.queryByRole('button', { name: 'Редактировать' })).not.toBeInTheDocument()
      expect(screen.queryByRole('button', { name: 'Удалить' })).not.toBeInTheDocument()
    })

    it('renders dialog without footer buttons when detail is null', () => {
      renderWithProviders(
        <PasswordDetailModal
          open={true}
          detail={null}
          loading={false}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
          onClose={vi.fn()}
        />,
      )
      expect(screen.getByRole('dialog', { name: 'Детали пароля' })).toBeVisible()
      expect(screen.queryByRole('button', { name: 'Редактировать' })).not.toBeInTheDocument()
    })
  })

  describe('open with detail', () => {
    it('shows service name', () => {
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.getByText('GitHub')).toBeVisible()
    })

    it('shows service url when present', () => {
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.getByText('https://github.com')).toBeVisible()
    })

    it('hides service url row when absent', () => {
      const detailNoUrl = { ...mockDetail, service_url: null }
      renderWithProviders(
        <PasswordDetailModal open={true} detail={detailNoUrl} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.queryByText('https://github.com')).not.toBeInTheDocument()
    })

    it('shows login', () => {
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.getByText('myuser')).toBeVisible()
    })

    it('masks password by default', () => {
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.getByText('••••••••')).toBeVisible()
      expect(screen.queryByText('mysecret')).not.toBeInTheDocument()
    })

    it('reveals password on show button click', async () => {
      const user = userEvent.setup()
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      await user.click(screen.getByRole('button', { name: 'Показать пароль' }))
      expect(screen.getByText('mysecret')).toBeVisible()
      expect(screen.queryByText('••••••••')).not.toBeInTheDocument()
    })

    it('hides password again on second toggle', async () => {
      const user = userEvent.setup()
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      await user.click(screen.getByRole('button', { name: 'Показать пароль' }))
      await user.click(screen.getByRole('button', { name: 'Скрыть пароль' }))
      expect(screen.getByText('••••••••')).toBeVisible()
    })

    it('shows edit and delete footer buttons', () => {
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      expect(screen.getByRole('button', { name: 'Редактировать' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'Удалить' })).toBeInTheDocument()
    })

    it('calls onEdit when edit button clicked', async () => {
      const user = userEvent.setup()
      const onEdit = vi.fn()
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={onEdit} onDelete={vi.fn()} onClose={vi.fn()} />,
      )
      await user.click(screen.getByRole('button', { name: 'Редактировать' }))
      expect(onEdit).toHaveBeenCalledOnce()
    })

    it('calls onDelete when delete button clicked', async () => {
      const user = userEvent.setup()
      const onDelete = vi.fn()
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={onDelete} onClose={vi.fn()} />,
      )
      await user.click(screen.getByRole('button', { name: 'Удалить' }))
      expect(onDelete).toHaveBeenCalledOnce()
    })
  })

  describe('close behavior', () => {
    it('calls onClose when modal close button clicked', async () => {
      const user = userEvent.setup()
      const onClose = vi.fn()
      renderWithProviders(
        <PasswordDetailModal open={true} detail={mockDetail} loading={false} onEdit={vi.fn()} onDelete={vi.fn()} onClose={onClose} />,
      )
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))
      expect(onClose).toHaveBeenCalledOnce()
    })
  })
})
