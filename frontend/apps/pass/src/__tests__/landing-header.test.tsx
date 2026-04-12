import type { ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { LandingHeader } from '@/components/landing-header'
import { renderWithProviders, createMockClient } from '../test-utils'

// Link renders as a plain anchor in tests — no router context needed
vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, className }: { children: ReactNode, className?: string }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className={className}>{children}</a>
  ),
}))

describe('LandingHeader', () => {
  describe('render', () => {
    it('renders brand name', async () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<LandingHeader />, { client })
      expect(screen.getByText('RufTECH Pass')).toBeVisible()
    })

    it('renders navigation buttons', async () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<LandingHeader />, { client })
      expect(screen.getByRole('button', { name: 'Преимущества' })).toBeInTheDocument()
      expect(screen.getByRole('button', { name: 'О проекте' })).toBeInTheDocument()
    })

    it('renders theme toggle button', async () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<LandingHeader />, { client })
      expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
    })
  })

  describe('auth state', () => {
    it('shows login link when not authenticated', async () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('unauthorized'))
      renderWithProviders(<LandingHeader />, { client })
      expect(await screen.findByText('Войти')).toBeVisible()
    })

    it('shows my-passwords link when authenticated', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue({ id: 1, username: 'user', email: null })
      renderWithProviders(<LandingHeader />, { client })
      expect(await screen.findByText('Мои пароли')).toBeVisible()
    })
  })

  describe('theme toggle', () => {
    it('toggles theme aria-label on click', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<LandingHeader />, { client })

      const btn = screen.getByRole('button', { name: /theme/i })
      const before = btn.getAttribute('aria-label')
      await user.click(btn)
      expect(btn.getAttribute('aria-label')).not.toBe(before)
    })

    it('stores theme preference in localStorage after toggle', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<LandingHeader />, { client })

      await user.click(screen.getByRole('button', { name: /theme/i }))
      expect(localStorage.getItem('theme')).toMatch(/^(light|dark)$/)
    })
  })

  describe('nav scroll buttons', () => {
    it('calls scrollIntoView when features button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))

      const scrollIntoView = vi.fn()
      const fakeEl = { scrollIntoView }
      vi.spyOn(document, 'getElementById').mockReturnValue(fakeEl as unknown as HTMLElement)

      renderWithProviders(<LandingHeader />, { client })
      await user.click(screen.getByRole('button', { name: 'Преимущества' }))

      expect(scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' })

      vi.restoreAllMocks()
    })

    it('calls scrollIntoView when about button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))

      const scrollIntoView = vi.fn()
      vi.spyOn(document, 'getElementById').mockReturnValue(
        { scrollIntoView } as unknown as HTMLElement,
      )

      renderWithProviders(<LandingHeader />, { client })
      await user.click(screen.getByRole('button', { name: 'О проекте' }))

      expect(scrollIntoView).toHaveBeenCalled()

      vi.restoreAllMocks()
    })
  })
})
