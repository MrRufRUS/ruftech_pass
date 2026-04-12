import type { FC } from 'react'
import type { IconProps } from './types'

export const SuccessCircle: FC<IconProps> = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path d="M8 1a7 7 0 110 14A7 7 0 018 1zm-2 7l2 2 4-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
