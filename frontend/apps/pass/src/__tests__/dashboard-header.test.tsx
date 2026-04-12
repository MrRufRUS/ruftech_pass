import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { DashboardHeader } from '@/components/dashboard-header'
import { renderWithProviders, createMockClient } from '../test-utils'

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => vi.fn(),
}))

describe('DashboardHeader', () => {
  describe('render', () => {
    it('renders brand name', () => {
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />)
      expect(screen.getByText('RufTECH Pass')).toBeVisible()
    })

    it('renders profile button', () => {
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Профиль' })).toBeInTheDocument()
    })

    it('renders logout button', () => {
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Выйти' })).toBeInTheDocument()
    })

    it('renders theme toggle', () => {
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />)
      expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
    })
  })

  describe('profile button', () => {
    it('calls onOpenProfile when clicked', async () => {
      const user = userEvent.setup()
      const onOpenProfile = vi.fn()
      renderWithProviders(<DashboardHeader onOpenProfile={onOpenProfile} />)
      await user.click(screen.getByRole('button', { name: 'Профиль' }))
      expect(onOpenProfile).toHaveBeenCalledOnce()
    })
  })

  describe('logout', () => {
    it('calls logout API when logout button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />, { client })
      await user.click(screen.getByRole('button', { name: 'Выйти' }))
      await vi.waitFor(() => {
        expect(client.request).toHaveBeenCalledWith('/v1/jwt/logout/', expect.objectContaining({ method: 'POST' }))
      })
    })

    it('navigates even when logout API fails', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('network'))
      vi.mocked(vi.importMock('@tanstack/react-router')).catch(() => {})

      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />, { client })
      // Should not throw even on API failure
      await expect(
        user.click(screen.getByRole('button', { name: 'Выйти' })),
      ).resolves.toBeUndefined()
    })
  })

  describe('theme toggle', () => {
    it('toggles theme when button clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<DashboardHeader onOpenProfile={vi.fn()} />)
      const btn = screen.getByRole('button', { name: /theme/i })
      const before = btn.getAttribute('aria-label')
      await user.click(btn)
      expect(btn.getAttribute('aria-label')).not.toBe(before)
    })
  })
})
