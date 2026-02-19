import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const container = style({
  padding: vars.padding.xs,
})

export const logo = style({
  color: vars.color.text,
  display: 'block',
})
