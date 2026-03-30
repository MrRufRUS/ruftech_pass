import { describe, expect, it, vi } from 'vitest'
import type { IHttpFn } from '../client'
import { withCredentials } from '../withCredentials'

describe('withCredentials', () => {
  it('adds credentials: include to requests', async () => {
    const inner = vi.fn<IHttpFn>().mockResolvedValue('ok')
    const wrapped = withCredentials()(inner)

    await wrapped('/test', { parse: (d) => d })

    expect(inner).toHaveBeenCalledWith('/test', expect.objectContaining({
      credentials: 'include',
    }))
  })

  it('preserves existing options', async () => {
    const inner = vi.fn<IHttpFn>().mockResolvedValue('ok')
    const wrapped = withCredentials()(inner)

    const parse = (d: unknown) => d
    await wrapped('/test', { method: 'POST', parse })

    expect(inner).toHaveBeenCalledWith('/test', expect.objectContaining({
      method: 'POST',
      credentials: 'include',
      parse,
    }))
  })
})
