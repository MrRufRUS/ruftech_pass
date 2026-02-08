import type { FC } from 'react'
import clsx from 'clsx'

import type { IBaseProps } from '../../types'
import { container, logo } from './logo.css'
import LogoSvg from './logo.svg?react'
export type LogoProps = IBaseProps & {
  width?: number
  height?: number | 'auto'
}

export const Logo: FC<LogoProps> = ({
  className,
  style,
  width = 100,
  height = 'auto',
}) => {
  return (
    <div className={clsx(container, className)} style={style}>
      <LogoSvg width={width} height={height} className={logo} />
    </div>
  )
}
