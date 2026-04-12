import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { copyCurrentUrl } from '../dom/copy-current-url'

describe('copyCurrentUrl', () => {
  beforeEach(() => {
    // Set a known location href
    Object.defineProperty(window, 'location', {
      value: { href: 'https://example.com/page?q=1' },
      writable: true,
      configurable: true,
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('when navigator.clipboard is available', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: { writeText: vi.fn().mockResolvedValue(undefined) },
        writable: true,
        configurable: true,
      })
    })

    it('copies current URL via clipboard.writeText', async () => {
      const result = await copyCurrentUrl()

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith('https://example.com/page?q=1')
      expect(result).toBe(true)
    })

    it('calls onSuccess callback on successful copy', async () => {
      const onSuccess = vi.fn()
      await copyCurrentUrl({ onSuccess })

      expect(onSuccess).toHaveBeenCalledOnce()
    })

    it('does not call onError on success', async () => {
      const onError = vi.fn()
      await copyCurrentUrl({ onError })

      expect(onError).not.toHaveBeenCalled()
    })

    it('calls onError and returns false when clipboard.writeText rejects', async () => {
      const error = new Error('clipboard denied')
      vi.mocked(navigator.clipboard.writeText).mockRejectedValue(error)
      const onError = vi.fn()

      const result = await copyCurrentUrl({ onError })

      expect(result).toBe(false)
      expect(onError).toHaveBeenCalledWith(error)
    })

    it('does not call onSuccess on failure', async () => {
      vi.mocked(navigator.clipboard.writeText).mockRejectedValue(new Error('denied'))
      const onSuccess = vi.fn()

      await copyCurrentUrl({ onSuccess })

      expect(onSuccess).not.toHaveBeenCalled()
    })
  })

  describe('fallback via execCommand when clipboard is unavailable', () => {
    beforeEach(() => {
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        writable: true,
        configurable: true,
      })
      // execCommand is not available in happy-dom, so we stub it
      document.execCommand = vi.fn().mockReturnValue(true)
    })

    it('creates a textarea, selects it, and calls execCommand copy', async () => {
      const appendSpy = vi.spyOn(document.body, 'appendChild')
      const removeSpy = vi.spyOn(document.body, 'removeChild')

      const result = await copyCurrentUrl()

      expect(document.execCommand).toHaveBeenCalledWith('copy')
      expect(appendSpy).toHaveBeenCalledOnce()
      expect(removeSpy).toHaveBeenCalledOnce()
      expect(result).toBe(true)
    })

    it('calls onSuccess when fallback succeeds', async () => {
      const onSuccess = vi.fn()
      await copyCurrentUrl({ onSuccess })

      expect(onSuccess).toHaveBeenCalledOnce()
    })

    it('works with no options provided', async () => {
      const result = await copyCurrentUrl()
      expect(result).toBe(true)
    })
  })
})
