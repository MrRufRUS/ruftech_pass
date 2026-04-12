import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const track = style({
  width: '100%',
  height: 6,
  backgroundColor: vars.color.surfaceSubtle,
  borderRadius: vars.radii.full,
  overflow: 'hidden',
})

export const sizeVariant = styleVariants({
  sm: { height: 4 },
  md: { height: 6 },
  lg: { height: 10 },
})

export const fill = style({
  height: '100%',
  borderRadius: vars.radii.full,
  transitionProperty: 'width',
  transitionDuration: vars.transition.duration.base,
  transitionTimingFunction: vars.transition.easing.inOut,
})

export const colorVariant = styleVariants({
  primary: { backgroundColor: vars.color.primary },
  success: { backgroundColor: vars.color.success },
  warning: { backgroundColor: vars.color.warning },
  error: { backgroundColor: vars.color.error },
})

export const label = style({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  font: vars.font.shorthand.uiMini,
  letterSpacing: vars.font.letterSpacing.uiMini,
  color: vars.color.textMuted,
  marginBottom: vars.spacing.xs,
})
