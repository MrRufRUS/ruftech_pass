import { describe, it, expect, vi, afterEach } from 'vitest'
import { navigateTo } from '../dom/navigate-to'

describe('navigateTo', () => {
  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('target: _self (default)', () => {
    it('calls window.location.assign with the given URL', () => {
      const assign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { assign },
        writable: true,
        configurable: true,
      })

      navigateTo({ url: 'https://example.com/about' })

      expect(assign).toHaveBeenCalledWith('https://example.com/about')
    })

    it('uses _self when target is explicitly set to _self', () => {
      const assign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { assign },
        writable: true,
        configurable: true,
      })

      navigateTo({ url: '/dashboard', target: '_self' })

      expect(assign).toHaveBeenCalledWith('/dashboard')
    })

    it('does not call window.open for _self', () => {
      const open = vi.spyOn(window, 'open').mockImplementation(() => null)
      Object.defineProperty(window, 'location', {
        value: { assign: vi.fn() },
        writable: true,
        configurable: true,
      })

      navigateTo({ url: '/page' })

      expect(open).not.toHaveBeenCalled()
    })
  })

  describe('target: _blank', () => {
    it('opens URL in a new tab with noopener,noreferrer', () => {
      const open = vi.spyOn(window, 'open').mockImplementation(() => null)

      navigateTo({ url: 'https://external.com', target: '_blank' })

      expect(open).toHaveBeenCalledWith('https://external.com', '_blank', 'noopener,noreferrer')
    })

    it('does not call window.location.assign for _blank', () => {
      vi.spyOn(window, 'open').mockImplementation(() => null)
      const assign = vi.fn()
      Object.defineProperty(window, 'location', {
        value: { assign },
        writable: true,
        configurable: true,
      })

      navigateTo({ url: 'https://external.com', target: '_blank' })

      expect(assign).not.toHaveBeenCalled()
    })
  })
})
