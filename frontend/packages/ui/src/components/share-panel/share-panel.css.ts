import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const sharePanel = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
})
