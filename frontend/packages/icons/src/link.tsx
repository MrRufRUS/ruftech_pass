import type { FC } from 'react'
import type { IconProps } from './types'

export const Link: FC<IconProps> = (props) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
    <path d="M7.5 10.5a3.5 3.5 0 005 0l2-2a3.536 3.536 0 00-5-5l-1 1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
    <path d="M10.5 7.5a3.5 3.5 0 00-5 0l-2 2a3.536 3.536 0 005 5l1-1" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
  </svg>
)
