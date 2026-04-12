import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

const spin = keyframes({
  from: { transform: 'rotate(0deg)' },
  to: { transform: 'rotate(360deg)' },
})

export const spinner = style({
  display: 'inline-block',
  borderStyle: 'solid',
  borderColor: vars.color.borderSubtle,
  borderTopColor: vars.color.primary,
  borderRadius: '50%',
  animationName: spin,
  animationDuration: '0.7s',
  animationTimingFunction: 'linear',
  animationIterationCount: 'infinite',
})

export const size = styleVariants({
  xs: { width: vars.icon.size.xs, height: vars.icon.size.xs, borderWidth: 2 },
  sm: { width: vars.icon.size.s, height: vars.icon.size.s, borderWidth: 2 },
  md: { width: vars.icon.size.m, height: vars.icon.size.m, borderWidth: 2 },
  lg: { width: vars.icon.size.l, height: vars.icon.size.l, borderWidth: 3 },
  xl: { width: vars.icon.size.xl, height: vars.icon.size.xl, borderWidth: 3 },
})

export const colorVariant = styleVariants({
  primary: { borderTopColor: vars.color.primary },
  text: { borderTopColor: vars.color.text },
  success: { borderTopColor: vars.color.success },
})

export const wrapper = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.s,
})

export const label = style({
  font: vars.font.shorthand.uiRegular,
  letterSpacing: vars.font.letterSpacing.uiRegular,
  color: vars.color.textMuted,
})
