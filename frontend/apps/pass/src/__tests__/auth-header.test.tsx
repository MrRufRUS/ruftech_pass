import { describe, it, expect } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { AuthHeader } from '@/components/auth-header'
import { renderWithProviders } from '../test-utils'

describe('AuthHeader', () => {
  describe('render', () => {
    it('renders brand name', () => {
      renderWithProviders(<AuthHeader />)
      expect(screen.getByText('RufTECH Pass')).toBeVisible()
    })

    it('renders brand link', () => {
      renderWithProviders(<AuthHeader />)
      expect(screen.getByRole('link', { name: /RufTECH Pass/ })).toBeInTheDocument()
    })

    it('renders theme toggle button', () => {
      renderWithProviders(<AuthHeader />)
      expect(screen.getByRole('button', { name: /theme/i })).toBeInTheDocument()
    })
  })

  describe('theme toggle', () => {
    it('toggles theme when button clicked', async () => {
      const user = userEvent.setup()
      renderWithProviders(<AuthHeader />)

      const themeBtn = screen.getByRole('button', { name: /theme/i })
      const initialLabel = themeBtn.getAttribute('aria-label')
      await user.click(themeBtn)
      expect(themeBtn.getAttribute('aria-label')).not.toBe(initialLabel)
    })

    it('stores theme preference in localStorage', async () => {
      const user = userEvent.setup()
      renderWithProviders(<AuthHeader />)

      await user.click(screen.getByRole('button', { name: /theme/i }))

      // After toggle, a theme value should be stored
      expect(localStorage.getItem('theme')).toMatch(/^(light|dark)$/)
    })
  })
})
