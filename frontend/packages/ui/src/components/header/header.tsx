import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { header as headerStyle } from './header.css'

export type HeaderProps = IBaseWithChildrenProps & ComponentPropsWithRef<'header'>

export const Header: FC<HeaderProps> = ({ className, style, children, ref, ...props }) => (
  <header ref={ref} className={clsx(headerStyle, className)} style={style} {...props}>
    {children}
  </header>
)
