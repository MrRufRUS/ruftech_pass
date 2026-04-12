import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { playButton } from './play-button.css'

export type PlayButtonProps = IBaseWithChildrenProps & ComponentPropsWithRef<'button'>

export const PlayButton: FC<PlayButtonProps> = ({
  className,
  style,
  children,
  ref,
  ...props
}) => (
  <button ref={ref} type="button" className={clsx(playButton, className)} style={style} {...props}>
    {children}
  </button>
)
