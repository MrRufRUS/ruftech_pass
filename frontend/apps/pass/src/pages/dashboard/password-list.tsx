import type { IPasswordPublic } from '@ruftech/api'
import type { FC } from 'react'
import { useState, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { Button } from '@ruftech/ui/button'
import { Spinner } from '@ruftech/ui/spinner'
import * as s from './password-list.css'

type Props = {
  passwords: IPasswordPublic[]
  loading: boolean
  onSelect: (id: number) => void
  onAdd: () => void
}

export const PasswordList: FC<Props> = ({ passwords, loading, onSelect, onAdd }) => {
  const { t } = useTranslation('dashboard')
  const [query, setQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const trimmed = query.trim().toLowerCase()

  const filtered = trimmed
    ? passwords.filter((p) => p.service_name.toLowerCase().includes(trimmed))
    : passwords

  const suggestions = trimmed
    ? passwords
        .filter((p) => p.service_name.toLowerCase().includes(trimmed))
        .slice(0, 6)
    : []

  function handleSuggestionClick(id: number) {
    setShowSuggestions(false)
    setQuery('')
    onSelect(id)
  }

  function handleBlur() {
    // Delay to allow click on suggestion to fire first
    setTimeout(() => setShowSuggestions(false), 150)
  }

  if (loading) {
    return (
      <div className={s.center}>
        <Spinner size="md" />
      </div>
    )
  }

  if (passwords.length === 0) {
    return (
      <div className={s.empty}>
        <span className={s.emptyIcon}>🔒</span>
        <p>{t('empty.title')}</p>
        <p>{t('empty.description')}</p>
        <Button variant="successFilled" rounded="md" onClick={onAdd}>
          {t('addPassword')}
        </Button>
      </div>
    )
  }

  return (
    <div className={s.wrapper}>
      {/* Search */}
      <div className={s.searchWrapper}>
        <input
          ref={inputRef}
          type="search"
          className={s.searchInput}
          value={query}
          placeholder={t('search.placeholder')}
          onChange={(e) => {
            setQuery(e.target.value)
            setShowSuggestions(true)
          }}
          onFocus={() => setShowSuggestions(true)}
          onBlur={handleBlur}
          autoComplete="off"
        />
        {showSuggestions && suggestions.length > 0 && (
          <ul className={s.suggestions}>
            {suggestions.map((p) => (
              <li key={p.id}>
                <button
                  type="button"
                  className={s.suggestion}
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => handleSuggestionClick(p.id)}
                >
                  <span className={s.suggestionAvatar}>{p.service_name.charAt(0)}</span>
                  {p.service_name}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Grid or empty search result */}
      {filtered.length === 0
        ? (
            <div className={s.empty}>
              <span className={s.emptyIcon}>🔍</span>
              <p>{t('search.noResults')}</p>
            </div>
          )
        : (
            <div className={s.grid}>
              {filtered.map((pw) => (
                <button
                  key={pw.id}
                  type="button"
                  className={s.card}
                  onClick={() => onSelect(pw.id)}
                >
                  <span className={s.cardAvatar}>{pw.service_name.charAt(0)}</span>
                  <span className={s.cardName}>{pw.service_name}</span>
                </button>
              ))}
            </div>
          )}
    </div>
  )
}
