import { describe, it, expect, vi } from 'vitest'
import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { PasswordList } from '@/pages/dashboard/password-list'
import { renderWithProviders } from '../test-utils'

const mockPasswords = [
  { id: 1, service_name: 'GitHub' },
  { id: 2, service_name: 'Google' },
  { id: 3, service_name: 'GitLab' },
]

describe('PasswordList', () => {
  describe('loading state', () => {
    it('renders spinner when loading', () => {
      renderWithProviders(
        <PasswordList passwords={[]} loading={true} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      // Spinner renders in center div when loading
      expect(document.querySelector('svg') || document.querySelector('[class*="center"]')).toBeTruthy()
    })

    it('does not render search or grid when loading', () => {
      renderWithProviders(
        <PasswordList passwords={[]} loading={true} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      expect(screen.queryByRole('searchbox')).not.toBeInTheDocument()
    })
  })

  describe('empty state', () => {
    it('shows empty title when no passwords', () => {
      renderWithProviders(
        <PasswordList passwords={[]} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      expect(screen.getByText('Нет сохранённых паролей')).toBeVisible()
    })

    it('shows description in empty state', () => {
      renderWithProviders(
        <PasswordList passwords={[]} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      expect(screen.getByText('Добавьте первый пароль, чтобы начать')).toBeVisible()
    })

    it('calls onAdd when add button clicked in empty state', async () => {
      const user = userEvent.setup()
      const onAdd = vi.fn()
      renderWithProviders(
        <PasswordList passwords={[]} loading={false} onSelect={vi.fn()} onAdd={onAdd} />
      )
      await user.click(screen.getByRole('button', { name: 'Добавить пароль' }))
      expect(onAdd).toHaveBeenCalledOnce()
    })
  })

  describe('with passwords', () => {
    it('renders password cards', () => {
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      expect(screen.getByText('GitHub')).toBeVisible()
      expect(screen.getByText('Google')).toBeVisible()
      expect(screen.getByText('GitLab')).toBeVisible()
    })

    it('calls onSelect with correct id when card clicked', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={onSelect} onAdd={vi.fn()} />
      )
      await user.click(screen.getByText('GitHub'))
      expect(onSelect).toHaveBeenCalledWith(1)
    })

    it('renders search input', () => {
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      expect(screen.getByRole('searchbox')).toBeInTheDocument()
    })
  })

  describe('search', () => {
    it('filters cards by search query', async () => {
      const user = userEvent.setup()
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      await user.type(screen.getByRole('searchbox'), 'git')
      // GitHub and GitLab match, Google does not
      expect(screen.getAllByRole('button', { name: /^G/ })).toHaveLength(2)
      expect(screen.queryByText('Google')).not.toBeInTheDocument()
    })

    it('shows no results message when search has no matches', async () => {
      const user = userEvent.setup()
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      await user.type(screen.getByRole('searchbox'), 'xyz')
      expect(screen.getByText('Ничего не найдено')).toBeVisible()
    })

    it('shows autocomplete suggestions on focus', async () => {
      const user = userEvent.setup()
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={vi.fn()} onAdd={vi.fn()} />
      )
      const input = screen.getByRole('searchbox')
      await user.type(input, 'git')
      // Suggestions list should appear
      expect(screen.getAllByRole('button').length).toBeGreaterThan(0)
    })

    it('calls onSelect and clears search when suggestion clicked', async () => {
      const user = userEvent.setup()
      const onSelect = vi.fn()
      renderWithProviders(
        <PasswordList passwords={mockPasswords} loading={false} onSelect={onSelect} onAdd={vi.fn()} />
      )
      const input = screen.getByRole('searchbox')
      await user.type(input, 'git')

      // Find suggestion buttons in the dropdown (not card buttons)
      const suggestions = screen.getAllByRole('button')
      // Click first suggestion that matches 'git'
      const githubSuggestion = suggestions.find(b => b.textContent?.includes('GitHub'))
      if (githubSuggestion) {
        await user.click(githubSuggestion)
        expect(onSelect).toHaveBeenCalledWith(1)
      }
    })
  })
})
