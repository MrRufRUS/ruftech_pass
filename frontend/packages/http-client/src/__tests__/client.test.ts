import { describe, it, expect, vi } from 'vitest'
import { createHttpClient } from '../client'

describe('createHttpClient', () => {
  it('delegates request to the underlying fn', async () => {
    const fn = vi.fn().mockResolvedValue('result')
    const client = createHttpClient(fn)
    const parse = (d: unknown) => d as string

    const result = await client.request('/api', { parse })

    expect(fn).toHaveBeenCalledWith('/api', { parse })
    expect(result).toBe('result')
  })

  it('applyPlugin wraps the fn and returns a new client', async () => {
    const fn = vi.fn().mockResolvedValue('original')
    const client = createHttpClient(fn)

    const plugin = vi.fn((inner) => {
      return ((...args: Parameters<typeof inner>) => {
        return inner(...args)
      }) as typeof inner
    })

    const wrapped = client.applyPlugin(plugin)

    expect(plugin).toHaveBeenCalledWith(fn)
    expect(wrapped).not.toBe(client)

    await wrapped.request('/test', { parse: (d) => d })
    expect(fn).toHaveBeenCalled()
  })
})
