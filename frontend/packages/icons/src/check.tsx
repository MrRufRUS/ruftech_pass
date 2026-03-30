import type { FC } from 'react'
import type { IconProps } from './types'

export const Check: FC<IconProps> = (props) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
    <path d="M4 9l4 4 6-8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
