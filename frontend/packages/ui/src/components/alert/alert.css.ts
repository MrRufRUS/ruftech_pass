import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const base = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.l,
  borderRadius: vars.radii.m,
  border: '1px solid transparent',
  font: vars.font.shorthand.regularText,
  transitionProperty: 'opacity, transform',
  transitionDuration: vars.transition.duration.base,
  transitionTimingFunction: vars.transition.easing.base,
})

export const variant = styleVariants({
  info: {
    backgroundColor: vars.color.surfaceSubtle,
    borderColor: vars.color.borderSubtle,
    color: vars.color.text,
  },
  success: {
    backgroundColor: vars.color.surfaceSubtle,
    borderColor: vars.color.success,
    color: vars.color.text,
  },
  warning: {
    backgroundColor: vars.color.surfaceSubtle,
    borderColor: vars.color.warning,
    color: vars.color.text,
  },
  error: {
    backgroundColor: vars.color.surfaceSubtle,
    borderColor: vars.color.error,
    color: vars.color.text,
  },
})

export const icon = style({
  flexShrink: 0,
  width: vars.icon.size.s,
  height: vars.icon.size.s,
})

export const iconVariant = styleVariants({
  info: { color: vars.color.primary },
  success: { color: vars.color.success },
  warning: { color: vars.color.warning },
  error: { color: vars.color.error },
})

export const content = style({
  flex: 1,
  minWidth: 0,
})

export const dismissButton = style({
  all: 'unset',
  display: 'inline-flex',
  flexShrink: 0,
  cursor: 'pointer',
  borderRadius: vars.radii.xs,
  opacity: 0.6,
  transitionProperty: 'opacity',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    opacity: 1,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

const slideIn = keyframes({
  from: { opacity: 0, transform: 'translateY(-8px)' },
  to: { opacity: 1, transform: 'translateY(0)' },
})

export const toast = style({
  animationName: slideIn,
  animationDuration: vars.transition.duration.base,
  animationTimingFunction: vars.transition.easing.out,
  animationFillMode: 'both',
})

export const dismissed = style({
  opacity: 0,
  transform: 'translateY(-8px)',
  pointerEvents: 'none',
})
