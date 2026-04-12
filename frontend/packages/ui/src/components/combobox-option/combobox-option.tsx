import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { Checkmark } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './combobox-option.css'

export type ComboboxOptionProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  label: string
  value?: string
  selected?: boolean
}

export const ComboboxOption: FC<ComboboxOptionProps> = ({
  className,
  style,
  label,
  value,
  selected = false,
  ref,
  ...props
}) => (
  <div
    ref={ref}
    role="option"
    aria-selected={selected ? 'true' : 'false'}
    data-value={value ?? label}
    data-label={label}
    className={clsx(s.option, className)}
    style={style}
    {...props}
  >
    {label}
    <Checkmark className={s.checkmark} />
  </div>
)
