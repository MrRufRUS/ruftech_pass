import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  backgroundColor: 'rgba(10, 10, 18, 0.7)',
  backdropFilter: 'blur(12px)',
  borderBottom: '1px solid rgba(255,255,255,0.06)',
})

export const inner = style({
  width: '100%',
  maxWidth: '1240px',
  marginInline: 'auto',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.l,
  '@media': {
    [media.desktop]: {
      paddingInline: vars.padding.xxl,
    },
  },
})

export const brandLink = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  textDecoration: 'none',
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 4,
    borderRadius: vars.radii.xs,
  },
})

export const brandIcon = style({
  fontSize: '1.25rem',
  lineHeight: 1,
})

export const brandName = style({
  font: vars.font.shorthand.uiRegular,
  color: 'white',
  fontWeight: 600,
})

export const actions = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
})

export const themeButton = style({
  all: 'unset',
  cursor: 'pointer',
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 32,
  height: 32,
  borderRadius: vars.radii.s,
  color: 'rgba(255,255,255,0.6)',
  transitionProperty: 'color, background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    color: 'white',
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})
