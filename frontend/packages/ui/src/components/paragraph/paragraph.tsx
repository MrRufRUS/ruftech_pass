import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { paragraph as paragraphStyle } from './paragraph.css'

export type ParagraphProps = IBaseWithChildrenProps & ComponentPropsWithRef<'p'>

export const Paragraph: FC<ParagraphProps> = ({ className, style, children, ref, ...props }) => (
  <p ref={ref} className={clsx(paragraphStyle, className)} style={style} {...props}>
    {children}
  </p>
)
