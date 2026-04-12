import type { IBaseWithChildrenProps } from '../../types'
import type { ChangeEventHandler, ComponentPropsWithRef, FC } from 'react'
import { Octagon } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './checkbox.css'

export type CheckboxProps = Omit<IBaseWithChildrenProps, 'children'> & ComponentPropsWithRef<'label'> & {
  name: string
  checked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

export const Checkbox: FC<CheckboxProps> = ({
  className,
  style,
  name,
  checked,
  disabled,
  onChange,
  children,
  ref,
  ...props
}) => (
  <label ref={ref} className={clsx(s.checkbox, className)} style={style} {...props}>
    <input
      className={s.checkboxInput}
      type="checkbox"
      name={name}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
    <Octagon className={s.checkboxIndicator} />
    {children && <span className={s.checkboxLabel}>{children}</span>}
  </label>
)
