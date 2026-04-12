import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { ArrowLeft, ArrowRight } from '@ruftech/icons'
import clsx from 'clsx'
import * as s from './article-nav-link.css'

type Variant = 'back' | 'forward'

export type ArticleNavLinkProps = IBaseProps & ComponentPropsWithRef<'a'> & {
  href: string
  variant: Variant
  title: string
  directionLabel?: string
}

export const ArticleNavLink: FC<ArticleNavLinkProps> = ({
  className,
  style,
  href,
  variant: v,
  title: titleText,
  directionLabel,
  ref,
  ...props
}) => {
  const label = directionLabel ?? (v === 'back' ? 'Предыдущая' : 'Следующая')

  return (
    <a ref={ref} className={clsx(s.variant[v], className)} style={style} href={href} {...props}>
      <span className={s.direction}>
        {v === 'back' && <ArrowLeft className={s.arrow} />}
        {label}
        {v === 'forward' && <ArrowRight className={s.arrow} />}
      </span>
      <span className={s.title}>{titleText}</span>
    </a>
  )
}
