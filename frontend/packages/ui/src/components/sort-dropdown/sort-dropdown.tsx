import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Chevron } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './sort-dropdown.css'

export type SortDropdownOption = {
  label: string
  href: string
  active?: boolean
}

export type SortDropdownProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  options: SortDropdownOption[]
  currentLabel: string
}

export const SortDropdown: FC<SortDropdownProps> = ({
  className,
  style,
  options,
  currentLabel,
  ...props
}) => {
  const [open, setOpen] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
      setOpen(false)
    }
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [handleClickOutside])

  return (
    <div ref={rootRef} className={clsx(s.sortDropdown, className)} style={style} {...props}>
      <button
        type="button"
        className={s.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {currentLabel}
        <Chevron width={16} height={16} className={clsx(s.chevronIcon, open && s.chevronIconOpen)} />
      </button>
      <div className={clsx(s.optionsList, open && s.optionsListOpen)}>
        {options.map((opt) => (
          <a
            key={opt.href}
            className={clsx(s.option, opt.active && s.activeOption)}
            href={opt.href}
          >
            {opt.label}
          </a>
        ))}
      </div>
    </div>
  )
}
