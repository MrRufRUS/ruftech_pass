import { describe, expect, it, vi } from 'vitest'
import type { IHttpClient } from '@ruftech/http-client'
import { login, fetchMe, logout } from '@/shared/auth'

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
