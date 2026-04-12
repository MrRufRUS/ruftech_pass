import type { FC } from 'react'
import type { IconProps } from './types'

export const OctagonDot: FC<IconProps> = (props) => (
  <svg viewBox="0 0 18 18" fill="none" aria-hidden="true" {...props}>
    <path
      className="octagon-stroke"
      d="M5.4 1h7.2L17 5.4v7.2L12.6 17H5.4L1 12.6V5.4z"
      strokeWidth="1.5"
    />
    <path
      className="octagon-dot"
      d="M7.2 5h3.6L13 7.2v3.6L10.8 13H7.2L5 10.8V7.2z"
    />
  </svg>
)
