import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC, ReactNode } from 'react'
import { useId } from 'react'
import clsx from 'clsx'
import * as s from './accordion.css'

export type AccordionProps = IBaseProps & ComponentPropsWithRef<'div'> & {
  a11ySummaryLabel: string
  summaryContent?: ReactNode
  children: ReactNode
}

export const Accordion: FC<AccordionProps> = ({
  className,
  style,
  a11ySummaryLabel,
  summaryContent,
  children,
  ref,
  ...props
}) => {
  const id = useId()

  return (
    <div ref={ref} className={clsx(s.accordion, className)} style={style} {...props}>
      <input type="checkbox" className={s.input} id={id} />
      <label htmlFor={id} className={s.summary} aria-label={a11ySummaryLabel}>
        <span className={s.toggleIcon} role="presentation">
          [
          <span className={s.togglePlus}>+</span>
          ]
        </span>
        {summaryContent}
      </label>
      <div className={s.contentWrapper}>
        <div className={s.contentInner}>
          <div className={s.content}>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
