import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as s from './icons-showcase.css'

export type IconsShowcaseProps = IBaseWithChildrenProps & ComponentPropsWithRef<'div'>

const IconsShowcaseRoot: FC<IconsShowcaseProps> = ({
  className,
  style,
  children,
  ref,
  ...props
}) => (
  <div ref={ref} className={clsx(s.grid, className)} style={style} {...props}>
    {children}
  </div>
)

const Cell: FC<IBaseWithChildrenProps & ComponentPropsWithRef<'div'>> = ({
  className,
  style,
  children,
  ref,
  ...props
}) => (
  <div ref={ref} className={clsx(s.cell, className)} style={style} {...props}>
    {children}
  </div>
)

export const IconsShowcase = Object.assign(IconsShowcaseRoot, { Cell })
