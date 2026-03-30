import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const paragraph = style({
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
})
