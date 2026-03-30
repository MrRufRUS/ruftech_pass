import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const textLink = style({
  textDecoration: 'underline',
  font: vars.font.shorthand.regularText,
  fontWeight: 600,
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  selectors: {
    '&:hover': {
      color: vars.color.primary,
    },
  },
})
