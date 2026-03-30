import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC, ReactNode } from 'react'
import clsx from 'clsx'
import * as s from './feature-card.css'

export type FeatureCardProps = IBaseProps & ComponentPropsWithRef<'article'> & {
  icon: ReactNode
  title: string
  description: string
}

export const FeatureCard: FC<FeatureCardProps> = ({
  className,
  style,
  icon,
  title,
  description,
  ref,
  ...props
}) => (
  <article ref={ref} className={clsx(s.card, className)} style={style} {...props}>
    <div className={s.iconWrapper}>{icon}</div>
    <h3 className={s.title}>{title}</h3>
    <p className={s.description}>{description}</p>
  </article>
)
