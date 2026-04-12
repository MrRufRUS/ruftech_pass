import type { FC } from 'react'
import type { IconProps } from './types'

export const CloseSmall: FC<IconProps> = (props) => (
  <svg viewBox="0 0 10 10" fill="none" aria-hidden="true" {...props}>
    <path d="M2 2L8 8M8 2L2 8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
  </svg>
)
