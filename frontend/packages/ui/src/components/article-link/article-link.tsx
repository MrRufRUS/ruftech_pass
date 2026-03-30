import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { articleLink } from './article-link.css'

export type ArticleLinkProps = IBaseWithChildrenProps & ComponentPropsWithRef<'a'> & {
  href: string
}

export const ArticleLink: FC<ArticleLinkProps> = ({ className, style, children, href, ref, ...props }) => (
  <a ref={ref} className={clsx(articleLink, className)} style={style} href={href} {...props}>
    {children}
  </a>
)
