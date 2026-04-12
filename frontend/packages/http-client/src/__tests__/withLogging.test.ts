import { describe, it, expect, vi, beforeEach } from 'vitest'
import { withLogging } from '../withLogging'
import type { IHttpFn, IHttpOptions } from '../client'
import type { IHttpLogInfo } from '../withLogging'

describe('withLogging', () => {
  let log: ReturnType<typeof vi.fn<(info: IHttpLogInfo) => void>>
  let inner: IHttpFn
  const parse = (d: unknown) => d

  beforeEach(() => {
    log = vi.fn<(info: IHttpLogInfo) => void>()
  })

  describe('success path', () => {
    beforeEach(() => {
      inner = vi.fn().mockResolvedValue('data')
    })

    it('logs request info on success (shorthand form)', async () => {
      const wrapped = withLogging(log)(inner)
      await wrapped('https://api.test/items', { parse, method: 'POST' })

      expect(log).toHaveBeenCalledOnce()
      const info: IHttpLogInfo = log.mock.calls[0][0]
      expect(info.url).toBe('https://api.test/items')
      expect(info.method).toBe('POST')
      expect(info.duration).toBeGreaterThanOrEqual(0)
      expect(info.error).toBeUndefined()
    })

    it('defaults method to GET', async () => {
      const wrapped = withLogging(log)(inner)
      await wrapped('https://api.test/x', { parse } as IHttpOptions<unknown>)

      const info: IHttpLogInfo = log.mock.calls[0][0]
      expect(info.method).toBe('GET')
    })

    it('returns the result from inner fn', async () => {
      const wrapped = withLogging(log)(inner)
      const result = await wrapped('/x', { parse })
      expect(result).toBe('data')
    })
  })

  describe('error path', () => {
    const error = new Error('network failure')

    beforeEach(() => {
      inner = vi.fn().mockRejectedValue(error)
    })

    it('logs and rethrows on failure', async () => {
      const wrapped = withLogging(log)(inner)

      await expect(wrapped('/fail', { parse })).rejects.toThrow('network failure')

      expect(log).toHaveBeenCalledOnce()
      const info: IHttpLogInfo = log.mock.calls[0][0]
      expect(info.error).toBe('network failure')
    })
  })

  describe('sanitization', () => {
    beforeEach(() => {
      inner = vi.fn().mockResolvedValue('ok')
    })

    it('masks sensitive query params by default', async () => {
      const wrapped = withLogging(log)(inner)
      await wrapped('https://api.test/auth?token=secret123&page=1', { parse })

      const info: IHttpLogInfo = log.mock.calls[0][0]
      expect(info.url).toContain('token=***')
      expect(info.url).toContain('page=1')
      expect(info.url).not.toContain('secret123')
    })

    it('accepts options object form with custom sanitizer', async () => {
      const sanitize = vi.fn((info: IHttpLogInfo) => ({ ...info, url: 'REDACTED' }))
      const wrapped = withLogging({ log, sanitize })(inner)
      await wrapped('https://api.test/data', { parse })

      expect(sanitize).toHaveBeenCalled()
      const info: IHttpLogInfo = log.mock.calls[0][0]
      expect(info.url).toBe('REDACTED')
    })
  })
})
