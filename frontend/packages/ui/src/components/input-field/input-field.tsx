import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useState } from 'react'
import clsx from 'clsx'
import * as s from './input-field.css'

export type InputFieldProps = IBaseProps & Omit<ComponentPropsWithRef<'input'>, 'children'> & {
  label: string
  name: string
  placeholder: string
  error?: boolean
  disabled?: boolean
  autocomplete?: string
  mask?: string
}

const defaultPhoneMask = '+7 (___) ___-__-__'

const applyMask = (raw: string, mask: string): string => {
  const digits = raw.replace(/\D/g, '')
  let result = ''
  let digitIdx = 0

  for (let i = 0; i < mask.length; i++) {
    if (digitIdx >= digits.length) break
    if (mask[i] === '_') {
      result += digits[digitIdx]
      digitIdx++
    } else {
      result += mask[i]
    }
  }
  return result
}

export const InputField: FC<InputFieldProps> = ({
  className,
  style,
  label,
  name,
  placeholder,
  error,
  disabled,
  autocomplete = 'off',
  mask,
  ref,
  onChange: onChangeProp,
  ...props
}) => {
  const [maskedValue, setMaskedValue] = useState('')
  const hasMask = mask !== undefined

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (!hasMask) {
      onChangeProp?.(e)
      return
    }
    const formatted = applyMask(e.target.value, mask === 'phone' ? defaultPhoneMask : mask)
    setMaskedValue(formatted)
    Object.defineProperty(e, 'target', {
      writable: true,
      value: { ...e.target, value: formatted },
    })
    onChangeProp?.(e)
  }, [hasMask, mask, onChangeProp])

  return (
    <div
      className={clsx(s.wrapper, error && s.wrapperError, disabled && s.wrapperDisabled, className)}
      style={style}
    >
      <label className={s.fieldLabel}>
        <span className={s.srOnly}>{label}</span>
        <input
          ref={ref}
          className={s.input}
          type={props.type ?? 'text'}
          name={name}
          placeholder={placeholder}
          disabled={disabled}
          autoComplete={autocomplete}
          aria-invalid={error ? 'true' : undefined}
          {...props}
          {...(hasMask ? { value: maskedValue, onChange: handleChange } : {})}
        />
      </label>
    </div>
  )
}
