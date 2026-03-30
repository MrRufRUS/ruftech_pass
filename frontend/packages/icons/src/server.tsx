import type { FC } from 'react'
import type { IconProps } from './types'

export const Server: FC<IconProps> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
    <rect x="2" y="2" width="20" height="8" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" ry="2" stroke="currentColor" strokeWidth="2" />
    <line x1="6" y1="6" x2="6.01" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <line x1="6" y1="18" x2="6.01" y2="18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)
