import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { sharePanel } from './share-panel.css'

export type SharePanelProps = IBaseWithChildrenProps & ComponentPropsWithRef<'div'>

export const SharePanel: FC<SharePanelProps> = ({ className, style, children, ref, ...props }) => (
  <div ref={ref} className={clsx(sharePanel, className)} style={style} {...props}>
    {children}
  </div>
)
