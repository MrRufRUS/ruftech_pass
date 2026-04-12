import type { FC } from 'react'
import type { IconProps } from './types'

export const Octagon: FC<IconProps> = (props) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
    <path
      className="octagon-stroke"
      d="M5.4 1h7.2L17 5.4v7.2L12.6 17H5.4L1 12.6V5.4z"
      strokeWidth="1.5"
    />
  </svg>
)
