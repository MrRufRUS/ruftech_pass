import type { ReactNode } from 'react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthPage } from '@/pages/auth/auth-page'
import { renderWithProviders, createMockClient } from '../test-utils'

const mockNavigate = vi.fn()
let mockSearchParams: Record<string, string | undefined> = {}

vi.mock('@tanstack/react-router', () => ({
  useNavigate: () => mockNavigate,
  useRouterState: ({ select }: { select: (s: unknown) => unknown }) =>
    select({ location: { pathname: '/' } }),
  useSearch: () => mockSearchParams,
  Link: ({ children, className }: { children: ReactNode, className?: string }) => (
    // eslint-disable-next-line jsx-a11y/anchor-is-valid
    <a href="#" className={className}>{children}</a>
  ),
}))

beforeEach(() => {
  mockNavigate.mockReset()
  mockSearchParams = {}
})

describe('AuthPage', () => {
  describe('default state', () => {
    it('renders login form by default', () => {
      renderWithProviders(<AuthPage />)
      expect(screen.getByRole('heading', { name: 'Вход' })).toBeVisible()
    })

    it('renders auth header', () => {
      renderWithProviders(<AuthPage />)
      expect(screen.getByText('RufTECH Pass')).toBeVisible()
    })
  })

  describe('mode switch', () => {
    it('switches to signup form when switch link clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<AuthPage />)

      await user.click(screen.getByText('Нет аккаунта? Зарегистрироваться'))

      expect(screen.getByRole('heading', { name: 'Регистрация' })).toBeVisible()
    })

    it('switches back to login from signup', async () => {
      const user = userEvent.setup()
      renderWithProviders(<AuthPage />)

      await user.click(screen.getByText('Нет аккаунта? Зарегистрироваться'))
      await user.click(screen.getByText('Уже есть аккаунт? Войти'))

      expect(screen.getByRole('heading', { name: 'Вход' })).toBeVisible()
    })
  })

  describe('navigation after auth', () => {
    it('navigates to /dashboard after successful login (default locale)', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({ access_token: 'tok', token_type: 'bearer' })

      renderWithProviders(<AuthPage />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      await vi.waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ to: '/dashboard' })
      })
    })
  })

  describe('navigation with redirect', () => {
    it('navigates to redirect path when redirect search param is present', async () => {
      mockSearchParams = { redirect: '/dashboard/settings' }

      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({ access_token: 'tok', token_type: 'bearer' })

      renderWithProviders(<AuthPage />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      await vi.waitFor(() => {
        expect(mockNavigate).toHaveBeenCalledWith({ href: '/dashboard/settings' })
      })
    })
  })
})
