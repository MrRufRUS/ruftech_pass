import { describe, it, expect, vi, afterEach } from 'vitest'
import { onClickOutside } from '../dom/on-click-outside'

describe('onClickOutside', () => {
  afterEach(() => {
    vi.restoreAllMocks()
    // Clean up any leftover listeners
    document.body.innerHTML = ''
  })

  it('calls callback when click target is outside the root element', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    const callback = vi.fn()
    onClickOutside({ root, callback })

    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(callback).toHaveBeenCalledOnce()
  })

  it('does not call callback when click target is inside the root element', () => {
    const root = document.createElement('div')
    const inner = document.createElement('span')
    root.appendChild(inner)
    document.body.appendChild(root)

    const callback = vi.fn()
    onClickOutside({ root, callback })

    inner.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(callback).not.toHaveBeenCalled()
  })

  it('does not call callback when click target is the root element itself', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)

    const callback = vi.fn()
    onClickOutside({ root, callback })

    root.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(callback).not.toHaveBeenCalled()
  })

  it('removes the listener when returned unsubscribe function is called', () => {
    const root = document.createElement('div')
    document.body.appendChild(root)
    const outside = document.createElement('button')
    document.body.appendChild(outside)

    const callback = vi.fn()
    const unsubscribe = onClickOutside({ root, callback })

    unsubscribe()
    outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

    expect(callback).not.toHaveBeenCalled()
  })

  describe('when root is a CSS selector string', () => {
    it('calls callback when click is outside the matching element', () => {
      const root = document.createElement('div')
      root.id = 'modal'
      document.body.appendChild(root)
      const outside = document.createElement('button')
      document.body.appendChild(outside)

      const callback = vi.fn()
      onClickOutside({ root: '#modal', callback })

      outside.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(callback).toHaveBeenCalledOnce()
    })

    it('does not call callback when click is inside the matched element', () => {
      const root = document.createElement('div')
      root.id = 'modal'
      const inner = document.createElement('p')
      root.appendChild(inner)
      document.body.appendChild(root)

      const callback = vi.fn()
      onClickOutside({ root: '#modal', callback })

      inner.dispatchEvent(new MouseEvent('click', { bubbles: true }))

      expect(callback).not.toHaveBeenCalled()
    })
  })
})
