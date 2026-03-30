import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as s from './progress-bar.css'

type Variant = 'primary' | 'success' | 'warning' | 'error'
type Size = 'sm' | 'md' | 'lg'

export type ProgressBarProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  value: number
  max?: number
  variant?: Variant
  size?: Size
  label?: string
  showPercentage?: boolean
}

export const ProgressBar: FC<ProgressBarProps> = ({
  className,
  style,
  value,
  max = 100,
  variant = 'primary',
  size = 'md',
  label: labelText,
  showPercentage = false,
  ref,
  ...props
}) => {
  const clamped = Math.min(Math.max(value, 0), max)
  const percentage = Math.round((clamped / max) * 100)

  return (
    <div ref={ref} className={className} style={style} {...props}>
      {(labelText || showPercentage) && (
        <div className={s.label}>
          {labelText && <span>{labelText}</span>}
          {showPercentage && <span>{`${percentage}%`}</span>}
        </div>
      )}
      <div
        className={clsx(s.track, s.sizeVariant[size])}
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={max}
        aria-label={labelText}
      >
        <div
          className={clsx(s.fill, s.colorVariant[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  )
}
