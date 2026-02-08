import type { IBaseProps } from '../../types'
import type { FC } from 'react'
import clsx from 'clsx'
import { container } from './logo.css'

export type LogoProps = IBaseProps & {
  width?: number
  height?: number
}

export const Logo: FC<LogoProps> = ({
  className,
  style,
}) => {
  return (
    <div className={clsx(container, className)} style={style}></div>
  )
}
