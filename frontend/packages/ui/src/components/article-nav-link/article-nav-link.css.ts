import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

const base = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.s,
  borderRadius: vars.radii.xs,
  textDecoration: 'none',
  color: vars.color.text,
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

export const variant = styleVariants({
  back: [base, { alignItems: 'flex-start', textAlign: 'left' }],
  forward: [base, { alignItems: 'flex-end', textAlign: 'right' }],
})

export const direction = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  font: vars.font.shorthand.uiRegular,
  letterSpacing: vars.font.letterSpacing.uiRegular,
  color: vars.color.textMuted,
})

export const title = style({
  font: vars.font.shorthand.h3,
  letterSpacing: vars.font.letterSpacing.heading,
})

export const arrow = style({
  width: 16,
  height: 16,
  flexShrink: 0,
})
