import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { Tag } from '../tag'
import * as s from './article-cell.css'

export type ArticleCellProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  date: string
  readTime: string
  tags: string[]
  title: string
  onTagClick: (tag: string) => void
}

export const ArticleCell: FC<ArticleCellProps> = ({
  className,
  style,
  date,
  readTime,
  tags,
  title,
  onTagClick,
  ref,
  ...props
}) => {
  const visibleTags = tags.slice(0, 3)

  return (
    <div ref={ref} className={clsx(s.cell, className)} style={style} {...props}>
      <div className={s.meta}>
        <span className={s.date}>{date}</span>
        <span className={s.readTime}>{readTime}</span>
      </div>
      <div className={s.tags}>
        {'[ '}
        {visibleTags.map((t, i) => (
          <span key={t}>
            {i > 0 && ' / '}
            <Tag tag={t} onClick={() => onTagClick(t)} />
          </span>
        ))}
        {' ]'}
      </div>
      <div className={s.textWrapper}>
        <h3 className={s.title}>{title}</h3>
      </div>
    </div>
  )
}
