import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { HttpError } from '@ruftech/http-client'
import { SignupForm } from '@/pages/auth/auth-signup-form'
import { renderWithProviders, createMockClient } from '../test-utils'

function makeHttpError(status: number, body?: unknown) {
  const init = body
    ? new Response(JSON.stringify(body), { status, headers: { 'Content-Type': 'application/json' } })
    : new Response(null, { status })
  return new HttpError(init)
}

describe('SignupForm', () => {
  describe('render', () => {
    it('shows signup heading', () => {
      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByRole('heading', { name: 'Регистрация' })).toBeVisible()
    })

    it('renders username, email, and password fields', () => {
      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByPlaceholderText('Введите имя пользователя')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Введите email (необязательно)')).toBeInTheDocument()
      expect(screen.getByPlaceholderText('Введите пароль')).toBeInTheDocument()
    })

    it('renders submit button', () => {
      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByRole('button', { name: 'Зарегистрироваться' })).toBeInTheDocument()
    })

    it('renders switch-to-login link', () => {
      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      expect(screen.getByText('Уже есть аккаунт? Войти')).toBeInTheDocument()
    })
  })

  describe('validation', () => {
    it('does not call API when both required fields empty', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))
      expect(client.request).not.toHaveBeenCalled()
    })

    it('does not call API when username is empty', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))
      expect(client.request).not.toHaveBeenCalled()
    })
  })

  describe('successful signup', () => {
    it('calls onSuccess after signup and auto-login', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      // signup returns message, login returns token
      client.request
        .mockResolvedValueOnce({ message: 'created' })
        .mockResolvedValueOnce({ access_token: 'tok', token_type: 'bearer' })
      const onSuccess = vi.fn()

      renderWithProviders(<SignupForm onSuccess={onSuccess} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'newuser')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'password123')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      await vi.waitFor(() => {
        expect(onSuccess).toHaveBeenCalledOnce()
      })
    })

    it('sends signup and login requests in sequence', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request
        .mockResolvedValueOnce({ message: 'created' })
        .mockResolvedValueOnce({ access_token: 'tok', token_type: 'bearer' })

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'newuser')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass123')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      await vi.waitFor(() => {
        expect(client.request).toHaveBeenCalledTimes(2)
      })
      expect(client.request).toHaveBeenNthCalledWith(1, '/v1/jwt/signup/', expect.objectContaining({ method: 'POST' }))
      expect(client.request).toHaveBeenNthCalledWith(2, '/v1/jwt/login/', expect.objectContaining({ method: 'POST' }))
    })
  })

  describe('error handling', () => {
    it('shows usernameExists error when backend reports username conflict', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(
        makeHttpError(400, { detail: 'Username already exists' }),
      )

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'existing')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      expect(await screen.findByText('Пользователь с таким именем уже существует')).toBeVisible()
    })

    it('shows emailExists error when backend reports email conflict', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(
        makeHttpError(400, { detail: 'Email already in use' }),
      )

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'user')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      expect(await screen.findByText('Email уже используется')).toBeVisible()
    })

    it('shows network error on generic error', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(new Error('network'))

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })

      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'user')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })
  })

  describe('mode switch', () => {
    it('calls onSwitchMode when switch link clicked', async () => {
      const user = userEvent.setup()
      const onSwitchMode = vi.fn()
      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={onSwitchMode} />)
      await user.click(screen.getByText('Уже есть аккаунт? Войти'))
      expect(onSwitchMode).toHaveBeenCalledOnce()
    })
  })

  describe('zod validation', () => {
    it('does not call API when email is invalid format', async () => {
      const user = userEvent.setup()
      const { client } = renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />)
      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'validuser')
      await user.type(screen.getByPlaceholderText('Введите email (необязательно)'), 'not-an-email')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass123')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))
      expect(client.request).not.toHaveBeenCalled()
    })
  })

  describe('error handling edge cases', () => {
    it('shows raw detail when it is not username or email conflict', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(
        makeHttpError(400, { detail: 'Account suspended' }),
      )

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })
      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'user')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      expect(await screen.findByText('Account suspended')).toBeVisible()
    })

    it('shows network error when response body is not valid ApiError', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(
        makeHttpError(500, { unexpected: 'format' }),
      )

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })
      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'user')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      expect(await screen.findByText('Ошибка сети. Попробуйте позже.')).toBeVisible()
    })

    it('dismisses error alert when close button clicked', async () => {
      const user = userEvent.setup()
      const client = createMockClient()
      client.request.mockRejectedValueOnce(new Error('network'))

      renderWithProviders(<SignupForm onSuccess={vi.fn()} onSwitchMode={vi.fn()} />, { client })
      await user.type(screen.getByPlaceholderText('Введите имя пользователя'), 'user')
      await user.type(screen.getByPlaceholderText('Введите пароль'), 'pass')
      await user.click(screen.getByRole('button', { name: 'Зарегистрироваться' }))

      await screen.findByText('Ошибка сети. Попробуйте позже.')
      await user.click(screen.getByRole('button', { name: 'Закрыть' }))

      expect(screen.queryByText('Ошибка сети. Попробуйте позже.')).not.toBeInTheDocument()
    })
  })
})
