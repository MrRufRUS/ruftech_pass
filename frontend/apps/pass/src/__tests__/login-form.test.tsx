import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpError } from '@ruftech/http-client'
import { LoginForm } from '@/pages/auth/auth-login-form'
import { renderWithProviders, createMockClient } from '../test-utils'

function makeHttpError(status: number, body?: unknown) {
  const init = body
    ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
    : new Response(null, { status })
  return new HttpError(init)
}

describe('LoginForm', () => {
  describe('render', () => {
    it('shows login heading', () => {
      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByRole('heading', { name: 'Вход' })).toBeVisible()
    })

    it('renders username and password fields', () => {
      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByPlaceholderText('Введите имя пользователя')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument()
    })

    it('renders submit button', () => {
      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Войти' })).toBeInTheDocument()
    })

    it('renders switch-to-signup link', () => {
      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByText('Нет аккаунта? Зарегистрироваться')).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('does not call API when both fields empty', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.click(screen.getByRole('button', { name: 'Войти' }))
      expect(client.request).not.toHaveBeenCalled()
    })

    it('does not call API when username empty', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Войти' }))
      expect(client.request).not.toHaveBeenCalled()
    })

    it('does not call API when password empty', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.click(screen.getByRole('button', { name: 'Войти' }))
      expect(client.request).not.toHaveBeenCalled()
    })
  })

  describe('successful login', () => {
    it('calls onSuccess after API responds', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockResolvedValue({ access_token: 'tok', token_type: 'bearer' })
      const onSuccess = vi.fn()

      renderWithProviders(<LoginForm onSuccess={onSuccess} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      await vi.waitFor(() => {
        expect(onSuccess).toHaveBeenCalledOnce()
      })
    })

    it('sends request to login endpoint', async () => {
      const user = userEvent.setup()
      const client = createMockClient()

      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'secret')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      await vi.waitFor(() => {
        expect(client.request).toHaveBeenCalledWith('/v1/jwt/login/', expect.objectContaining({
          method: 'POST',
        }))
      })
    })
  })

  describe('error handling', () => {
    it('shows invalid credentials error on 401', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(makeHttpError(401))

      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'wrong')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      expect(await screen.findByText('Неверное имя пользователя или пароль')).toBeVisible()
    })

    it('shows server error detail on non-401 HttpError with ApiError body', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(
        makeHttpError(400, { detail: 'Account locked' }),
      )

      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      expect(await screen.findByText('Account locked')).toBeVisible()
    })

    it('shows network error on generic Error', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(new Error('fetch failed'))

      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })

    it('dismisses error when close button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(makeHttpError(401))

      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'john')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'wrong')
      await user.click(screen.getByRole('button', { name: 'Войти' }))

      await screen.findByText('Неверное имя пользователя или пароль')

      const closeBtn = screen.getByRole('button', { name: 'Закрыть' })
      await user.click(closeBtn)

      expect(screen.queryByText('Неверное имя пользователя или пароль')).not.toBeInTheDocument()
    })
  })

  describe('mode switch', () => {
    it('calls onSwitchMode when switch link clicked', async () => {
      const user = userEvent.setup()
      const onSwitchMode = vi.fn()
      renderWithProviders(<LoginForm onSuccess={vi.fn()} onSwitchMode={onSwitchMode} />)
      await user.click(screen.getByText('Нет аккаунта? Зарегистрироваться'))
      expect(onSwitchMode).toHaveBeenCalledOnce()
    })
  })
})
