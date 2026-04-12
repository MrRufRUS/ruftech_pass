import type { FC } from 'react'
import type { IconProps } from './types'

export const Checkmark: FC<IconProps> = (props) => (
  <svg viewBox="0 0 14 14" fill="none" aria-hidden="true" {...props}>
    <path d="M2 7.5L5.5 11L12 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)
