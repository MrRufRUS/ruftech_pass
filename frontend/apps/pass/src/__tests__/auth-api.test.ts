import { describe, expect, it, vi } from 'vitest'
import type { IHttpClient } from '@ruftech/http-client'
import { login, fetchMe, logout, signup, updateMe, deleteAccount } from '@/shared/auth'

function createMockClient() {
  return {
    request: vi.fn().mockResolvedValue({}),
    applyPlugin: vi.fn(),
  } satisfies IHttpClient
}

describe('auth API', () => {
  describe('login', () => {
    it('sends form-encoded POST to /v1/jwt/login/', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue({ access_token: 'tok', token_type: 'bearer' })

      await login(client, { username: 'john', password: 'qwerty' })

      expect(client.request).toHaveBeenCalledWith('/v1/jwt/login/', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      }))

      const call = client.request.mock.calls[0]!
      const body = call[1].body as URLSearchParams
      expect(body.get('username')).toBe('john')
      expect(body.get('password')).toBe('qwerty')
    })

    it('passes TokenInfo.parse as parse function', async () => {
      const client = createMockClient()

      await login(client, { username: 'a', password: 'b' })

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({ access_token: 'x', token_type: 'bearer' })).toEqual({
        access_token: 'x',
        token_type: 'bearer',
      })
    })
  })

  describe('fetchMe', () => {
    it('sends GET to /v1/jwt/me/', async () => {
      const client = createMockClient()

      await fetchMe(client)

      expect(client.request).toHaveBeenCalledWith('/v1/jwt/me/', expect.objectContaining({
        method: 'GET',
      }))
    })

    it('passes UserMe.parse as parse function', async () => {
      const client = createMockClient()

      await fetchMe(client)

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({ id: 1, username: 'john', email: null })).toEqual({
        id: 1,
        username: 'john',
        email: null,
      })
    })
  })

  describe('logout', () => {
    it('sends POST to /v1/jwt/logout/', async () => {
      const client = createMockClient()

      await logout(client)

      expect(client.request).toHaveBeenCalledWith('/v1/jwt/logout/', expect.objectContaining({
        method: 'POST',
      }))
    })

    it('passes MessageResponse.parse as parse function', async () => {
      const client = createMockClient()

      await logout(client)

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({ message: 'ok' })).toEqual({ message: 'ok' })
    })
  })
})

describe('signup', () => {
  it('sends form-encoded POST to /v1/jwt/signup/', async () => {
    const client = createMockClient()
    client.request.mockResolvedValue({ message: 'created' })

    await signup(client, { username: 'john', password: 'qwerty' })

    expect(client.request).toHaveBeenCalledWith('/v1/jwt/signup/', expect.objectContaining({
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    }))

    const call = client.request.mock.calls[0]!
    const body = call[1].body as URLSearchParams
    expect(body.get('username')).toBe('john')
    expect(body.get('password')).toBe('qwerty')
  })

  it('does not include email when not provided', async () => {
    const client = createMockClient()

    await signup(client, { username: 'john', password: 'qwerty' })

    const call = client.request.mock.calls[0]!
    const body = call[1].body as URLSearchParams
    expect(body.get('email')).toBeNull()
  })

  it('includes email when provided', async () => {
    const client = createMockClient()

    await signup(client, { username: 'john', password: 'qwerty', email: 'john@example.com' })

    const call = client.request.mock.calls[0]!
    const body = call[1].body as URLSearchParams
    expect(body.get('email')).toBe('john@example.com')
  })

  it('passes MessageResponse.parse as parse function', async () => {
    const client = createMockClient()

    await signup(client, { username: 'a', password: 'b' })

    const call = client.request.mock.calls[0]!
    const { parse } = call[1]
    expect(parse({ message: 'created' })).toEqual({ message: 'created' })
  })
})

describe('updateMe', () => {
  it('sends PATCH with JSON body to /v1/jwt/me/', async () => {
    const client = createMockClient()
    client.request.mockResolvedValue({ id: 1, username: 'john', email: 'new@example.com' })

    await updateMe(client, { email: 'new@example.com' })

    expect(client.request).toHaveBeenCalledWith('/v1/jwt/me/', expect.objectContaining({
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
    }))

    const call = client.request.mock.calls[0]!
    const body = JSON.parse(call[1].body as string)
    expect(body).toEqual({ email: 'new@example.com' })
  })

  it('passes UserMe.parse as parse function', async () => {
    const client = createMockClient()

    await updateMe(client, { email: 'x@x.com' })

    const call = client.request.mock.calls[0]!
    const { parse } = call[1]
    expect(parse({ id: 1, username: 'john', email: 'x@x.com' })).toEqual({
      id: 1,
      username: 'john',
      email: 'x@x.com',
    })
  })
})

describe('deleteAccount', () => {
  it('sends DELETE to /v1/jwt/delete/', async () => {
    const client = createMockClient()

    await deleteAccount(client)

    expect(client.request).toHaveBeenCalledWith('/v1/jwt/delete/', expect.objectContaining({
      method: 'DELETE',
    }))
  })

  it('passes MessageResponse.parse as parse function', async () => {
    const client = createMockClient()

    await deleteAccount(client)

    const call = client.request.mock.calls[0]!
    const { parse } = call[1]
    expect(parse({ message: 'deleted' })).toEqual({ message: 'deleted' })
  })
})
