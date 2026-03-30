import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { textLink } from './text-link.css'

export type TextLinkProps = IBaseWithChildrenProps & ComponentPropsWithRef<'a'> & {
  href: string
}

export const TextLink: FC<TextLinkProps> = ({ className, style, children, href, ref, ...props }) => (
  <a ref={ref} className={clsx(textLink, className)} style={style} href={href} {...props}>
    {children}
  </a>
)
