import type { FC } from 'react'
import type { IconProps } from './types'

export const Play: FC<IconProps> = (props) => (
  <svg viewBox="0 0 48 48" fill="none" aria-hidden="true" {...props}>
    <circle cx="24" cy="24" r="23" stroke="currentColor" strokeWidth="1.5" />
    <path d="M19 15l14 9-14 9V15z" fill="currentColor" />
  </svg>
)
