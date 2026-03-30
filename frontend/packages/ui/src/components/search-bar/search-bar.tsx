import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useId, useState } from 'react'
import { Plus, Search } from '@ruftech/icons'
import clsx from 'clsx'
import { RemovableChip } from '../removable-chip/removable-chip'
import { ComboboxOption } from '../combobox-option/combobox-option'
import * as s from './search-bar.css'

export type SearchBarTag = {
  label: string
  value?: string
}

export type SearchBarProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  tags: SearchBarTag[]
  placeholder?: string
  emptyMessage?: string
  onSelectionChange?: (selected: string[]) => void
}

export const SearchBar: FC<SearchBarProps> = ({
  className,
  style,
  tags,
  placeholder = 'Поиск тегов...',
  emptyMessage = 'Ничего не найдено',
  onSelectionChange,
  ref,
  ...props
}) => {
  const id = useId()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<string[]>([])

  const filtered = tags.filter((t) =>
    t.label.toLowerCase().includes(query.toLowerCase())
    && !selected.includes(t.value ?? t.label),
  )

  const handleSelect = useCallback((value: string) => {
    const next = [...selected, value]
    setSelected(next)
    setQuery('')
    onSelectionChange?.(next)
  }, [selected, onSelectionChange])

  const handleRemove = useCallback((value: string) => {
    const next = selected.filter((v) => v !== value)
    setSelected(next)
    onSelectionChange?.(next)
  }, [selected, onSelectionChange])

  return (
    <div ref={ref} className={clsx(s.wrapper, className)} style={style} {...props}>
      <div className={s.inputArea}>
        <Search className={s.searchIcon} />
        {selected.map((val) => {
          const tag = tags.find((t) => (t.value ?? t.label) === val)
          return tag
            ? <RemovableChip key={val} label={tag.label} value={val} onRemove={handleRemove} />
            : null
        })}
        <input
          type="text"
          className={s.input}
          role="combobox"
          aria-expanded={open}
          aria-controls={`listbox-${id}`}
          aria-autocomplete="list"
          aria-haspopup="listbox"
          aria-label={placeholder}
          placeholder={placeholder}
          autoComplete="off"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setOpen(true)}
        />
        <button
          type="button"
          className={s.toggleButton}
          onClick={() => setOpen((prev) => !prev)}
          aria-label="Показать подсказки"
        >
          <Plus className={clsx(s.toggleIcon, open && s.toggleIconOpen)} />
        </button>
      </div>
      <div
        id={`listbox-${id}`}
        role="listbox"
        aria-multiselectable="true"
        className={clsx(s.listbox, open && s.listboxOpen)}
      >
        {filtered.map((t, i) => (
          <ComboboxOption
            key={t.value ?? t.label}
            id={`option-${id}-${i}`}
            label={t.label}
            value={t.value}
            onClick={() => handleSelect(t.value ?? t.label)}
          />
        ))}
        {filtered.length === 0 && (
          <div className={s.emptyMessage}>{emptyMessage}</div>
        )}
      </div>
    </div>
  )
}
