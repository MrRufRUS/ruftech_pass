import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const container = style({
  padding: '10px',
})

export const logo = style({
  color: vars.color.text,
})
