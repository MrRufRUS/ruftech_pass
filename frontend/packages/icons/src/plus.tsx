import type { FC } from 'react'
import type { IconProps } from './types'

export const Plus: FC<IconProps> = (props) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
    <path d="M7 1V13M1 7H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
