import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const card = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.xl,
  paddingInline: vars.padding.xl,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.m,
  transitionProperty: 'border-color, box-shadow',
  transitionDuration: vars.transition.duration.base,
  transitionTimingFunction: vars.transition.easing.out,
  ':hover': {
    borderColor: vars.color.primary,
    boxShadow: `0 4px 16px ${vars.color.borderSubtle}`,
  },
})

export const iconWrapper = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 48,
  height: 48,
  borderRadius: vars.radii.s,
  backgroundColor: vars.color.surfaceSubtle,
  color: vars.color.primary,
})

export const title = style({
  font: vars.font.shorthand.h3,
  letterSpacing: vars.font.letterSpacing.heading,
  color: vars.color.text,
  margin: 0,
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: vars.color.textMuted,
  margin: 0,
})
