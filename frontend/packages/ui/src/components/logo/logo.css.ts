import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const container = style({
  padding: 6,
})

export const logo = style({
  color: vars.color.text,
  display: 'block',
})
