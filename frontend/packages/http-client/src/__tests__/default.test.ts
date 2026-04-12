import { describe, it, expect, vi } from 'vitest'
import { DefaultHttpClient, HttpError } from '../default'

function mockFetch(body: unknown, ok = true, status = 200, statusText = 'OK') {
  return vi.fn().mockResolvedValue({
    ok,
    status,
    statusText,
    json: () => Promise.resolve(body),
  } as unknown as Response)
}

describe('HttpError', () => {
  it('stores status and response', () => {
    const res = { status: 404, statusText: 'Not Found' } as Response
    const err = new HttpError(res)

    expect(err.message).toBe('HTTP 404 Not Found')
    expect(err.name).toBe('HttpError')
    expect(err.status).toBe(404)
    expect(err.response).toBe(res)
    expect(err).toBeInstanceOf(Error)
  })
})

describe('DefaultHttpClient', () => {
  it('parses successful response through the parse function', async () => {
    const fetch = mockFetch({ id: 1, name: 'alice' })
    const client = DefaultHttpClient.create(fetch)

    const result = await client.request('/users/1', {
      parse: (d) => (d as { name: string }).name,
    })

    expect(fetch).toHaveBeenCalledWith('/users/1', {})
    expect(result).toBe('alice')
  })

  it('throws HttpError on non-ok response', async () => {
    const fetch = mockFetch(null, false, 500, 'Internal Server Error')
    const client = DefaultHttpClient.create(fetch)

    await expect(
      client.request('/fail', { parse: (d) => d }),
    ).rejects.toThrow(HttpError)
  })

  it('forwards request init options to fetch', async () => {
    const fetch = mockFetch('ok')
    const client = DefaultHttpClient.create(fetch)

    await client.request('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: 1 }),
      parse: (d) => d,
    })

    expect(fetch).toHaveBeenCalledWith('/api', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ x: 1 }),
    })
  })

  it('supports plugin chaining', async () => {
    const fetch = mockFetch({ v: 42 })
    const client = DefaultHttpClient
      .create(fetch)
      .applyPlugin((fn) => (url, opts) => fn(`/prefixed${url}`, opts))

    await client.request('/data', { parse: (d) => d })

    expect(fetch).toHaveBeenCalledWith('/prefixed/data', {})
  })

  it('throws if response.json fails', async () => {
    const fetch = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: () => Promise.reject(new Error('bad json')),
    } as Response)

    const client = DefaultHttpClient.create(fetch)

    await expect(
      client.request('/bad-json', { parse: (d) => d }),
    ).rejects.toThrow()
  })
})
