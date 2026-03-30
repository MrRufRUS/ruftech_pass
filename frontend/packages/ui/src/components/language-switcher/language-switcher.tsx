import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import clsx from 'clsx'
import * as s from './language-switcher.css'

export type LanguageSwitcherProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  locales: { code: string, href: string }[]
  currentLocale?: string
}

export const LanguageSwitcher: FC<LanguageSwitcherProps> = ({
  className,
  style,
  locales,
  currentLocale = 'ru',
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
    <div ref={rootRef} className={clsx(s.switcher, className)} style={style} {...props}>
      <button
        type="button"
        className={s.trigger}
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
      >
        {currentLocale}
      </button>
      <div className={clsx(s.dropdown, open && s.dropdownOpen)}>
        <div className={s.dropdownInner}>
          {locales.map((loc) => (
            <a
              key={loc.code}
              className={clsx(s.localeLink, loc.code === currentLocale && s.activeLocale)}
              href={loc.href}
            >
              {loc.code}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
