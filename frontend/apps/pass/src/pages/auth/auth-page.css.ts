import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  paddingTop: '72px',
  paddingInline: vars.padding.l,
  paddingBottom: vars.padding.xl,
  backgroundColor: vars.color.background,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(99,102,241,0.18) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
})

export const container = style({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
})

export const card = style({
  width: '100%',
  maxWidth: '480px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  padding: vars.padding.xxl,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.l,
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  width: '100%',
})

export const submit = style({
  marginTop: vars.spacing.s,
  width: '100%',
})

export const alert = style({
  width: '100%',
})

export const switchLink = style({
  all: 'unset',
  cursor: 'pointer',
  font: vars.font.shorthand.uiRegular,
  color: vars.color.primary,
  textAlign: 'center',
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    color: vars.color.primaryHover,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
    borderRadius: vars.radii.xs,
  },
})
