import type { ReactNode } from 'react'
import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HomePage } from '@/pages/home/home-page'
import { renderWithProviders, createMockClient } from '../test-utils'

vi.mock('@tanstack/react-router', () => ({
  Link: ({ children, className }: { children: ReactNode, className?: string }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className={className}>{children}</a>
  ),
}))

describe('HomePage', () => {
  describe('render', () => {
    it('renders hero section heading', () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })
      expect(screen.getByRole('heading', { level: 1, name: 'RufTECH Pass' })).toBeVisible()
    })

    it('renders features section', () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })
      expect(screen.getByText('Почему RufTECH Pass')).toBeVisible()
    })

    it('renders cta section', () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })
      expect(screen.getByText('Попробуйте прямо сейчас')).toBeVisible()
    })

    it('renders about section heading', () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })
      expect(screen.getByRole('heading', { name: 'О проекте' })).toBeVisible()
    })
  })

  describe('signup modal', () => {
    it('signup modal is not shown by default', () => {
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })
      expect(screen.queryByRole('dialog', { name: 'Регистрация' })).not.toBeInTheDocument()
    })

    it('opens signup modal when cta button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })

      await user.click(screen.getByRole('button', { name: 'Создать аккаунт' }))

      expect(screen.getByRole('dialog', { name: 'Регистрация' })).toBeVisible()
    })

    it('closes signup modal when close button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValue(new Error('not logged in'))
      renderWithProviders(<HomePage />, { client })

      await user.click(screen.getByRole('button', { name: 'Создать аккаунт' }))
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByRole('dialog', { name: 'Регистрация' })).not.toBeInTheDocument()
    })
  })
})
