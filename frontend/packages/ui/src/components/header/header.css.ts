import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: vars.padding.l,
})
