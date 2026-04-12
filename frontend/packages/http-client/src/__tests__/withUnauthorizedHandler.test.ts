import { describe, it, expect, vi } from 'vitest'
import { HttpError } from '../default'
import { withUnauthorizedHandler } from '../withUnauthorizedHandler'
import type { IHttpOptions } from '../client'

function makeResponse(status: number) {
  return new Response(null, { status, statusText: status === 401 ? 'Unauthorized' : 'Server Error' })
}

const noop: IHttpOptions<unknown> = { parse: (d) => d }

describe('withUnauthorizedHandler', () => {
  it('calls onUnauthorized when inner throws HttpError 401', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockRejectedValue(new HttpError(makeResponse(401)))
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    await expect(wrapped('/url', noop)).rejects.toBeInstanceOf(HttpError)
    expect(onUnauthorized).toHaveBeenCalledOnce()
  })

  it('still rethrows HttpError 401 after calling onUnauthorized', async () => {
    const onUnauthorized = vi.fn()
    const error = new HttpError(makeResponse(401))
    const inner = vi.fn().mockRejectedValue(error)
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    await expect(wrapped('/url', noop)).rejects.toBe(error)
  })

  it('does not call onUnauthorized for 403 HttpError', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockRejectedValue(new HttpError(makeResponse(403)))
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    await expect(wrapped('/url', noop)).rejects.toBeInstanceOf(HttpError)
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('does not call onUnauthorized for 500 HttpError', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockRejectedValue(new HttpError(makeResponse(500)))
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    await expect(wrapped('/url', noop)).rejects.toBeInstanceOf(HttpError)
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('does not call onUnauthorized for generic Error', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockRejectedValue(new Error('network'))
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    await expect(wrapped('/url', noop)).rejects.toThrow('network')
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('passes through successful response unchanged', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockResolvedValue({ data: 'ok' })
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    const result = await wrapped('/url', noop)
    expect(result).toEqual({ data: 'ok' })
    expect(onUnauthorized).not.toHaveBeenCalled()
  })

  it('passes url and options to inner fn', async () => {
    const onUnauthorized = vi.fn()
    const inner = vi.fn().mockResolvedValue({})
    const wrapped = withUnauthorizedHandler(onUnauthorized)(inner)

    const opts: IHttpOptions<unknown> = { parse: (d) => d, method: 'POST' }
    await wrapped('/test', opts)

    expect(inner).toHaveBeenCalledWith('/test', opts)
  })
})
