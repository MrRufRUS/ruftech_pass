import type { FC } from 'react'
import type { IconProps } from './types'

export const Search: FC<IconProps> = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <circle cx="7" cy="7" r="5" stroke="currentColor" strokeWidth="1.2" />
    <path d="M11 11L14 14" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
