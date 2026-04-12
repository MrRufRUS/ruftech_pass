import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const playButton = style({
  display: 'inline-flex',
  background: 'none',
  border: 'none',
  padding: 0,
  borderRadius: vars.radii.xs,
  cursor: 'pointer',
  color: vars.color.primary,
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    color: vars.color.background,
  },
  ':active': {
    color: vars.color.background,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})
