import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as s from './spinner.css'

type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
type Variant = 'primary' | 'text' | 'success'

export type SpinnerProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  size?: Size
  variant?: Variant
  label?: string
}

export const Spinner: FC<SpinnerProps> = ({
  className,
  style,
  size: sz = 'md',
  variant = 'primary',
  label: labelText,
  ref,
  ...props
}) => {
  const spinnerEl = (
    <div
      className={clsx(s.spinner, s.size[sz], s.colorVariant[variant])}
      role="status"
      aria-label={labelText ?? 'Загрузка'}
    />
  )

  if (!labelText) {
    return (
      <div ref={ref} className={className} style={style} {...props}>
        {spinnerEl}
      </div>
    )
  }

  return (
    <div ref={ref} className={clsx(s.wrapper, className)} style={style} {...props}>
      {spinnerEl}
      <span className={s.label} aria-hidden="true">{labelText}</span>
    </div>
  )
}
