import { keyframes, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

const scaleIn = keyframes({
  from: { opacity: 0, transform: 'scale(0.95)' },
  to: { opacity: 1, transform: 'scale(1)' },
})

export const overlay = style({
  position: 'fixed',
  inset: 0,
  zIndex: 100,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  animationName: fadeIn,
  animationDuration: vars.transition.duration.fast,
  animationTimingFunction: vars.transition.easing.out,
  animationFillMode: 'both',
})

export const dialog = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  width: '100%',
  maxWidth: 480,
  maxHeight: '85vh',
  backgroundColor: vars.color.background,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.l,
  animationName: scaleIn,
  animationDuration: vars.transition.duration.base,
  animationTimingFunction: vars.transition.easing.out,
  animationFillMode: 'both',
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.xl,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
})

export const title = style({
  font: vars.font.shorthand.h3,
  color: vars.color.text,
  margin: 0,
})

export const closeButton = style({
  all: 'unset',
  display: 'inline-flex',
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

export const body = style({
  flex: 1,
  overflowY: 'auto',
  paddingBlock: vars.padding.l,
  paddingInline: vars.padding.xl,
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.s,
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.xl,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
})
