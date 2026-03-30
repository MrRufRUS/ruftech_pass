import type { IBaseWithChildrenProps } from '../../types'
import type { ChangeEventHandler, ComponentPropsWithRef, FC } from 'react'
import { OctagonDot } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './radio.css'

export type RadioProps = Omit<IBaseWithChildrenProps, 'children'> & ComponentPropsWithRef<'label'> & {
  name: string
  value: string
  checked?: boolean
  disabled?: boolean
  onChange?: ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

export const Radio: FC<RadioProps> = ({
  className,
  style,
  name,
  value,
  checked,
  disabled,
  onChange,
  children,
  ref,
  ...props
}) => (
  <label ref={ref} className={clsx(s.radio, className)} style={style} {...props}>
    <input
      className={s.radioInput}
      type="radio"
      name={name}
      value={value}
      checked={checked}
      disabled={disabled}
      onChange={onChange}
    />
    <OctagonDot className={s.radioIndicator} />
    {children && <span className={s.radioLabel}>{children}</span>}
  </label>
)
