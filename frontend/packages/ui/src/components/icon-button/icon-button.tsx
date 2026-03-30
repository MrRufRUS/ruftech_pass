import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import { variant } from './icon-button.css'

type Variant = 'round' | 'pill'

export type IconButtonProps = IBaseWithChildrenProps & ComponentPropsWithRef<'button'> & {
  variant?: Variant
}

export const IconButton: FC<IconButtonProps> = ({
  className,
  style,
  children,
  variant: v = 'round',
  ref,
  ...props
}) => (
  <button ref={ref} type="button" className={clsx(variant[v], className)} style={style} {...props}>
    {children}
  </button>
)
