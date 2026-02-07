import type { CSSProperties, ReactNode } from 'react'

export type IBaseProps = {
  className?: string
  style?: CSSProperties
}

// В отличие от PropsWithChildren здесь children required
export type IBaseWithChildrenProps = IBaseProps & {
  children: ReactNode
}