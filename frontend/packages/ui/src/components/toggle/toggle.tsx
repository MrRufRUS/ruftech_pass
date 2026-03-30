import type { IBaseWithChildrenProps } from '../../types'
import type { ChangeEventHandler, ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as s from './toggle.css'

type LabelPosition = 'before' | 'after'
type Variant = 'light' | 'dark'

export type ToggleProps = Omit<IBaseWithChildrenProps, 'children'> & ComponentPropsWithRef<'label'> & {
  name: string
  checked?: boolean
  disabled?: boolean
  labelPosition?: LabelPosition
  variant?: Variant
  onChange?: ChangeEventHandler<HTMLInputElement>
  children?: React.ReactNode
}

export const Toggle: FC<ToggleProps> = ({
  className,
  style,
  name,
  checked,
  disabled,
  labelPosition = 'after',
  variant = 'light',
  onChange,
  children,
  ref,
  ...props
}) => {
  const labelClass = labelPosition === 'before' ? s.toggleLabelBefore : s.toggleLabelAfter

  return (
    <label ref={ref} className={clsx(s.toggle, className)} style={style} {...props}>
      <input
        className={s.toggleInput}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={onChange}
      />
      <span className={s.toggleTrack[variant]} aria-hidden="true" />
      {children && <span className={labelClass}>{children}</span>}
    </label>
  )
}
