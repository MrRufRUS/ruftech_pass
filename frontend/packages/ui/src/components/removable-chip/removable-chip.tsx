import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { CloseSmall } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './removable-chip.css'

export type RemovableChipProps = IBaseProps & ComponentPropsWithRef<'span'> & {
  label: string
  value?: string
  removeLabel?: string
  onRemove?: (value: string) => void
}

export const RemovableChip: FC<RemovableChipProps> = ({
  className,
  style,
  label,
  value,
  removeLabel,
  onRemove,
  ref,
  ...props
}) => {
  const chipValue = value ?? label
  const displayRemoveLabel = removeLabel ?? `Убрать ${label}`

  return (
    <span ref={ref} className={clsx(s.chip, className)} style={style} data-chip={chipValue} {...props}>
      {label}
      <button
        type="button"
        className={s.chipRemove}
        aria-label={displayRemoveLabel}
        onClick={() => onRemove?.(chipValue)}
      >
        <CloseSmall width={10} height={10} />
      </button>
    </span>
  )
}
