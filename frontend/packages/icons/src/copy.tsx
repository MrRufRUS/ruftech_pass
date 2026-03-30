import type { FC } from 'react'
import type { IconProps } from './types'

export const Copy: FC<IconProps> = (props) => (
  <svg viewBox="0 0 17 20" fill="none" aria-hidden="true" {...props}>
    <rect x="4.5" y="4.5" width="12" height="15" rx="1.5" stroke="currentColor" />
    <path d="M12.5 4.5V1.5C12.5 0.948 12.052 0.5 11.5 0.5H1.5C0.948 0.5 0.5 0.948 0.5 1.5V15.5C0.5 16.052 0.948 16.5 1.5 16.5H4.5" stroke="currentColor" />
  </svg>
)
