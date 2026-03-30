import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { level as levelStyle } from './heading.css'

type Level = 1 | 2 | 3 | 4 | 5 | 6

export type HeadingProps = IBaseWithChildrenProps & ComponentPropsWithRef<'h1'> & {
  level?: Level
}

export const Heading: FC<HeadingProps> = ({
  className,
  style,
  children,
  level = 1,
  ref,
  ...props
}) => {
  const Tag = `h${level}` as const

  return (
    <Tag ref={ref} className={clsx(levelStyle[level], className)} style={style} {...props}>
      {children}
    </Tag>
  )
}
