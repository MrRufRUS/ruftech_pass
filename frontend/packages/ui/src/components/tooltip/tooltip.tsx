import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import { useId, useState } from 'react'
import clsx from 'clsx'
import * as s from './tooltip.css'

type Position = 'top' | 'bottom' | 'left' | 'right'

export type TooltipProps = IBaseWithChildrenProps & ComponentPropsWithRef<'div'> & {
  content: string
  position?: Position
}

export const Tooltip: FC<TooltipProps> = ({
  className,
  style,
  children,
  content,
  position: pos = 'top',
  ref,
  ...props
}) => {
  const [visible, setVisible] = useState(false)
  const tooltipId = useId()

  return (
    <div
      ref={ref}
      role="button"
      tabIndex={0}
      className={clsx(s.wrapper, className)}
      style={style}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
      aria-describedby={visible ? tooltipId : undefined}
      {...props}
    >
      {children}
      {visible && (
        <div
          id={tooltipId}
          role="tooltip"
          className={clsx(s.tooltip, s.position[pos])}
        >
          {content}
        </div>
      )}
    </div>
  )
}
