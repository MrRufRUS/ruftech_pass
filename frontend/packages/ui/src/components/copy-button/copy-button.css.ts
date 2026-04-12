import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const copyButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  font: vars.font.shorthand.uiRegular,
  letterSpacing: vars.font.letterSpacing.uiRegular,
  background: 'none',
  border: 'none',
  borderRadius: vars.radii.xs,
  cursor: 'pointer',
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
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

export const active = style({
  color: vars.color.primary,
})

export const copyIcon = style({
  width: 14,
  height: 14,
  flexShrink: 0,
})
