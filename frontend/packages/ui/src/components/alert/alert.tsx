import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useCallback, useRef, useState } from 'react'
import { Close, ErrorCircle, InfoCircle, SuccessCircle, WarningCircle } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './alert.css'

const alertIcons = {
  info: InfoCircle,
  success: SuccessCircle,
  warning: WarningCircle,
  error: ErrorCircle,
} as const

type Variant = 'info' | 'success' | 'warning' | 'error'
type State = 'visible' | 'dismissed'

export type AlertProps = IBaseWithChildrenProps & ComponentPropsWithRef<'div'> & {
  variant?: Variant
  dismissible?: boolean
  toast?: boolean
  autoDismissMs?: number
  onDismiss?: () => void
}

export const Alert: FC<AlertProps> = ({
  className,
  style,
  children,
  variant = 'info',
  dismissible = false,
  toast: isToast = false,
  autoDismissMs,
  onDismiss,
  ref,
  ...props
}) => {
  const [state, setState] = useState<State>('visible')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleDismiss = useCallback(() => {
    setState('dismissed')
    if (timerRef.current) clearTimeout(timerRef.current)
    onDismiss?.()
  }, [onDismiss])

  if (autoDismissMs && !timerRef.current && state === 'visible') {
    timerRef.current = setTimeout(handleDismiss, autoDismissMs)
  }

  if (state === 'dismissed' && !isToast) return null

  return (
    <div
      ref={ref}
      role="alert"
      className={clsx(
        s.base,
        s.variant[variant],
        isToast && s.toast,
        state === 'dismissed' && s.dismissed,
        className,
      )}
      style={style}
      {...props}
    >
      {(() => {
        const Icon = alertIcons[variant]
        return <Icon className={clsx(s.icon, s.iconVariant[variant])} />
      })()}
      <div className={s.content}>{children}</div>
      {dismissible && (
        <button
          type="button"
          className={s.dismissButton}
          onClick={handleDismiss}
          aria-label="Закрыть"
        >
          <Close width={14} height={14} />
        </button>
      )}
    </div>
  )
}
