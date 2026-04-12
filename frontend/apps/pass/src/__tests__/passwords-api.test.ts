import { describe, expect, it, vi } from 'vitest'
import type { IHttpClient } from '@ruftech/http-client'
import {
  listPasswords,
  createPassword,
  getPassword,
  updatePassword,
  deletePassword,
} from '@/shared/passwords'

function createMockClient() {
  return {
    request: vi.fn().mockResolvedValue({}),
    applyPlugin: vi.fn(),
  } satisfies IHttpClient
}

describe('passwords API', () => {
  describe('listPasswords', () => {
    it('sends GET to /v1/passwords/', async () => {
      const client = createMockClient()
      client.request.mockResolvedValue([])

      await listPasswords(client)

      expect(client.request).toHaveBeenCalledWith('/v1/passwords/', expect.objectContaining({
        method: 'GET',
      }))
    })

    it('parses array of PasswordPublic via parse fn', async () => {
      const client = createMockClient()

      await listPasswords(client)

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse([{ id: 1, service_name: 'GitHub' }])).toEqual([
        { id: 1, service_name: 'GitHub' },
      ])
    })
  })

  describe('createPassword', () => {
    it('sends POST with JSON body to /v1/passwords/', async () => {
      const client = createMockClient()

      await createPassword(client, {
        service_name: 'GitHub',
        login: 'user',
        password: 'pass123',
      })

      expect(client.request).toHaveBeenCalledWith('/v1/passwords/', expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      }))

      const call = client.request.mock.calls[0]!
      const body = JSON.parse(call[1].body as string)
      expect(body).toEqual({
        service_name: 'GitHub',
        login: 'user',
        password: 'pass123',
      })
    })

    it('parses PasswordDetail via parse fn', async () => {
      const client = createMockClient()

      await createPassword(client, {
        service_name: 'X',
        login: 'u',
        password: 'p',
      })

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({
        id: 1,
        service_name: 'X',
        login: 'u',
        password: '$2b$hash',
      })).toEqual({
        id: 1,
        service_name: 'X',
        login: 'u',
        password: '$2b$hash',
      })
    })
  })

  describe('getPassword', () => {
    it('sends GET to /v1/passwords/{id}', async () => {
      const client = createMockClient()

      await getPassword(client, 42)

      expect(client.request).toHaveBeenCalledWith('/v1/passwords/42', expect.objectContaining({
        method: 'GET',
      }))
    })

    it('parses PasswordDetail via parse fn', async () => {
      const client = createMockClient()

      await getPassword(client, 1)

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({
        id: 1,
        service_name: 'Test',
        login: 'admin',
        password: 'hash',
      })).toEqual({
        id: 1,
        service_name: 'Test',
        login: 'admin',
        password: 'hash',
      })
    })
  })

  describe('updatePassword', () => {
    it('sends PATCH with JSON body to /v1/passwords/{id}', async () => {
      const client = createMockClient()

      await updatePassword(client, 5, { service_name: 'Updated' })

      expect(client.request).toHaveBeenCalledWith('/v1/passwords/5', expect.objectContaining({
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
      }))

      const call = client.request.mock.calls[0]!
      const body = JSON.parse(call[1].body as string)
      expect(body).toEqual({ service_name: 'Updated' })
    })

    it('parses PasswordDetail via parse fn', async () => {
      const client = createMockClient()

      await updatePassword(client, 5, { service_name: 'Updated' })

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({
        id: 5,
        service_name: 'Updated',
        login: 'admin',
        password: 'hash',
      })).toEqual({
        id: 5,
        service_name: 'Updated',
        login: 'admin',
        password: 'hash',
      })
    })
  })

  describe('deletePassword', () => {
    it('sends DELETE to /v1/passwords/{id}', async () => {
      const client = createMockClient()

      await deletePassword(client, 7)

      expect(client.request).toHaveBeenCalledWith('/v1/passwords/7', expect.objectContaining({
        method: 'DELETE',
      }))
    })

    it('parses message response via parse fn', async () => {
      const client = createMockClient()

      await deletePassword(client, 1)

      const call = client.request.mock.calls[0]!
      const { parse } = call[1]
      expect(parse({ message: 'deleted' })).toEqual({ message: 'deleted' })
    })
  })
})
