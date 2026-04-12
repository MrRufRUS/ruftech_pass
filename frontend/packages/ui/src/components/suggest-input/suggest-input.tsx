import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import clsx from 'clsx'
import * as s from './suggest-input.css'

export type SuggestOption = {
  label: string
  value: string
}

export type SuggestInputProps = IBaseProps & Omit<ComponentPropsWithRef<'div'>, 'onChange'> & {
  label: string
  name: string
  placeholder?: string
  suggestions: SuggestOption[]
  value?: string
  error?: boolean
  disabled?: boolean
  emptyMessage?: string
  onChange?: (value: string) => void
  onSelect?: (option: SuggestOption) => void
}

export const SuggestInput: FC<SuggestInputProps> = ({
  className,
  style,
  label,
  name,
  placeholder = '',
  suggestions,
  value: controlledValue,
  error,
  disabled,
  emptyMessage = 'Ничего не найдено',
  onChange,
  onSelect,
  ref,
  ...props
}) => {
  const id = useId()
  const [query, setQuery] = useState(controlledValue ?? '')
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const filtered = suggestions.filter((opt) =>
    opt.label.toLowerCase().includes(query.toLowerCase()),
  )

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const handleInputChange = useCallback((val: string) => {
    setQuery(val)
    onChange?.(val)
    setOpen(true)
  }, [onChange])

  const handleSelect = useCallback((opt: SuggestOption) => {
    setQuery(opt.label)
    onChange?.(opt.value)
    onSelect?.(opt)
    setOpen(false)
  }, [onChange, onSelect])

  return (
    <div ref={rootRef} className={clsx(s.wrapper, className)} style={style} {...props}>
      <div className={clsx(s.inputWrapper, error && s.inputWrapperError, disabled && s.inputWrapperDisabled)}>
        <label className={s.fieldLabel}>
          <span className={s.srOnly}>{label}</span>
          <input
            ref={ref}
            className={s.input}
            type="text"
            name={name}
            role="combobox"
            aria-expanded={open}
            aria-controls={`listbox-${id}`}
            aria-autocomplete="list"
            aria-haspopup="listbox"
            aria-label={label}
            aria-invalid={error ? 'true' : undefined}
            placeholder={placeholder}
            autoComplete="off"
            disabled={disabled}
            value={query}
            onChange={(e) => handleInputChange(e.target.value)}
            onFocus={() => !disabled && setOpen(true)}
          />
        </label>
      </div>
      <div
        id={`listbox-${id}`}
        role="listbox"
        className={clsx(s.dropdown, open && filtered.length > 0 && s.dropdownOpen)}
        aria-label={label}
      >
        {filtered.map((opt) => (
          <div
            key={opt.value}
            role="option"
            aria-selected={false}
            tabIndex={0}
            className={s.option}
            onClick={() => handleSelect(opt)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(opt) }}
          >
            {opt.label}
          </div>
        ))}
      </div>
      {open && query.length > 0 && filtered.length === 0 && (
        <div className={clsx(s.dropdown, s.dropdownOpen)}>
          <div className={s.emptyMessage}>{emptyMessage}</div>
        </div>
      )}
    </div>
  )
}
