import type { FC } from 'react'
import type { IconProps } from './types'

export const Close: FC<IconProps> = (props) => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" {...props}>
    <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)
