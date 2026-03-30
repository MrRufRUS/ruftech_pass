import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as s from './textarea.css'

export type TextareaProps = IBaseProps & Omit<ComponentPropsWithRef<'textarea'>, 'children'> & {
  label: string
  name: string
  placeholder: string
  error?: boolean
  disabled?: boolean
}

export const Textarea: FC<TextareaProps> = ({
  className,
  style,
  label,
  name,
  placeholder,
  error,
  disabled,
  ref,
  ...props
}) => (
  <div
    className={clsx(s.wrapper, error && s.wrapperError, disabled && s.wrapperDisabled, className)}
    style={style}
  >
    <label className={s.fieldLabel}>
      <span className={s.srOnly}>{label}</span>
      <textarea
        ref={ref}
        className={s.textarea}
        name={name}
        placeholder={placeholder}
        disabled={disabled}
        aria-invalid={error ? 'true' : undefined}
        {...props}
      />
    </label>
  </div>
)
