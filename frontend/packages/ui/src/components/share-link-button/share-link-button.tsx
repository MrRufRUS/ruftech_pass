import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC, ReactNode } from 'react'
import { useCallback, useRef, useState } from 'react'
import clsx from 'clsx'
import * as s from './share-link-button.css'

type State = 'idle' | 'confirmed'

export type ShareLinkButtonProps = IBaseProps & ComponentPropsWithRef<'button'> & {
  defaultIcon: ReactNode
  confirmedIcon: ReactNode
  onShare?: () => void
}

export const ShareLinkButton: FC<ShareLinkButtonProps> = ({
  className,
  style,
  defaultIcon,
  confirmedIcon,
  onShare,
  ref,
  ...props
}) => {
  const [state, setState] = useState<State>('idle')
  const timerRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleClick = useCallback(() => {
    onShare?.()

    if (timerRef.current) clearTimeout(timerRef.current)
    setState('confirmed')
    timerRef.current = setTimeout(() => setState('idle'), 3000)
  }, [onShare])

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(s.shareLinkButton, state === 'confirmed' && s.active, className)}
      style={style}
      onClick={handleClick}
      {...props}
    >
      {state === 'idle' ? defaultIcon : confirmedIcon}
    </button>
  )
}
