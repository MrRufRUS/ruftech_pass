import type { IBaseWithChildrenProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'
import * as styles from './button.css'

type Variant = 'surface' | 'success' | 'successFilled' | 'errorFilled'
type Rounded = 'none' | 'sm' | 'md' | 'full'

export type ButtonProps = IBaseWithChildrenProps & ComponentPropsWithRef<'button'> & {
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
  variant?: Variant
  rounded?: Rounded
}

const ButtonRoot: FC<ButtonProps> = ({
  className,
  style,
  children,
  type = 'button',
  variant = 'surface',
  rounded = 'md',
  ref,
  ...props
}) => {
  return (
    <button
      ref={ref}
      className={clsx(styles.base, styles.variant[variant], styles.rounded[rounded], className)}
      style={style}
      type={type}
      {...props}
    >
      <span className={styles.content}>{children}</span>
    </button>
  )
}

const Left: FC<IBaseWithChildrenProps> = ({ className, style, children }) => (
  <span className={clsx(styles.slot, className)} style={style}>{children}</span>
)

const Center: FC<IBaseWithChildrenProps> = ({ className, style, children }) => (
  <span className={clsx(styles.slot, className)} style={style}>{children}</span>
)

const Right: FC<IBaseWithChildrenProps> = ({ className, style, children }) => (
  <span className={clsx(styles.slot, className)} style={style}>{children}</span>
)

export const Button = Object.assign(ButtonRoot, { Left, Center, Right })
