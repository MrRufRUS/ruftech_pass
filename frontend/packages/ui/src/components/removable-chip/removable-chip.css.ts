import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const chip = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  paddingBlock: 2,
  paddingInline: vars.padding.s,
  borderRadius: vars.radii.xs,
  border: `1px solid ${vars.color.borderSubtle}`,
  font: vars.font.shorthand.uiMini,
  letterSpacing: vars.font.letterSpacing.uiMini,
  color: vars.color.text,
  lineHeight: 1,
  whiteSpace: 'nowrap',
  flexShrink: 0,
})

export const chipRemove = style({
  all: 'unset',
  display: 'inline-flex',
  cursor: 'pointer',
  opacity: 0.6,
  borderRadius: vars.radii.xs,
  transitionProperty: 'opacity',
  transitionDuration: vars.transition.duration.fast,
  ':hover': {
    opacity: 1,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 1,
  },
})
