import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Chevron } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './select.css'

export type SelectOption = {
  label: string
  value: string
}

export type SelectProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  label: string
  name: string
  options: SelectOption[]
  value?: string
  placeholder?: string
  error?: boolean
  disabled?: boolean
  onChange?: (value: string) => void
}

export const Select: FC<SelectProps> = ({
  className,
  style,
  label,
  name,
  options,
  value,
  placeholder = 'Выберите...',
  error,
  disabled,
  onChange,
  ref,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const [internalValue, setInternalValue] = useState(value)
  const rootRef = useRef<HTMLDivElement>(null)

  const currentValue = value !== undefined ? value : internalValue
  const selectedOption = options.find((o) => o.value === currentValue)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  const handleSelect = useCallback((optValue: string) => {
    setInternalValue(optValue)
    onChange?.(optValue)
    setOpen(false)
  }, [onChange])

  return (
    <div ref={rootRef} className={clsx(s.wrapper, className)} style={style} {...props}>
      <span className={s.srOnly}>{label}</span>
      <input type="hidden" name={name} value={currentValue ?? ''} />
      <button
        ref={ref}
        type="button"
        className={clsx(s.trigger, open && s.triggerOpen, error && s.triggerError)}
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={label}
      >
        {selectedOption
          ? <span>{selectedOption.label}</span>
          : <span className={s.placeholder}>{placeholder}</span>}
        <Chevron className={clsx(s.chevron, open && s.chevronOpen)} />
      </button>
      <div
        role="listbox"
        className={clsx(s.dropdown, open && s.dropdownOpen)}
        aria-label={label}
      >
        {options.map((opt) => (
          <div
            key={opt.value}
            role="option"
            aria-selected={opt.value === currentValue}
            tabIndex={0}
            className={clsx(s.option, opt.value === currentValue && s.optionSelected)}
            onClick={() => handleSelect(opt.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleSelect(opt.value) }}
          >
            {opt.label}
          </div>
        ))}
      </div>
    </div>
  )
}
