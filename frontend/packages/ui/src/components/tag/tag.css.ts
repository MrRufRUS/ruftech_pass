import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const tag = style({
  all: 'unset',
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  lineHeight: 1,
  borderRadius: vars.radii.xs,
  ':hover': {
    color: vars.color.primary,
  },
  ':active': {
    color: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})
