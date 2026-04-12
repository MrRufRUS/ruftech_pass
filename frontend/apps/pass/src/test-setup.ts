import '@testing-library/jest-dom/vitest'
import { afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// RTL cleanup between tests (required when vitest globals are not enabled)
afterEach(() => {
  cleanup()
})

// matchMedia is not fully implemented in happy-dom
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: (_query: string) => ({
    matches: false,
    media: _query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
})
