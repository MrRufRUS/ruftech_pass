import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC, ReactNode } from 'react'
import { useCallback, useEffect } from 'react'
import { Close } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './modal.css'

export type ModalProps = IBaseWithChildrenProps & ComponentPropsWithRef<'div'> & {
  open: boolean
  onClose: () => void
  title?: string
}

const ModalRoot: FC<ModalProps> = ({
  className,
  style,
  children,
  open,
  onClose,
  title,
  ref,
  ...props
}) => {
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
  }, [onClose])

  useEffect(() => {
    if (!open) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [open, handleKeyDown])

  if (!open) return null

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose()
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div className={s.overlay} onClick={handleOverlayClick}>
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={clsx(s.dialog, className)}
        style={style}
        {...props}
      >
        {title && (
          <div className={s.header}>
            <h2 className={s.title}>{title}</h2>
            <button
              type="button"
              className={s.closeButton}
              onClick={onClose}
              aria-label="Закрыть"
            >
              <Close width={16} height={16} />
            </button>
          </div>
        )}
        {children}
      </div>
    </div>
  )
}

const Body: FC<IBaseWithChildrenProps> = ({ className, style, children }) => (
  <div className={clsx(s.body, className)} style={style}>{children}</div>
)

const Footer: FC<IBaseWithChildrenProps & { children: ReactNode }> = ({ className, style, children }) => (
  <div className={clsx(s.footer, className)} style={style}>{children}</div>
)

export const Modal = Object.assign(ModalRoot, { Body, Footer })
