import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { tag as tagStyle } from './tag.css'

export type TagProps = IBaseProps & ComponentPropsWithRef<'button'> & {
  tag: string
}

export const Tag: FC<TagProps> = ({ className, style, tag, ref, ...props }) => (
  <button ref={ref} type="button" className={clsx(tagStyle, className)} style={style} {...props}>
    {tag}
  </button>
)
