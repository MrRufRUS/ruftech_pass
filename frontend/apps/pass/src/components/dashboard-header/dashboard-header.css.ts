import { globalStyle, style } from '@vanilla-extract/css'
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

export const langSwitcher = style({})

globalStyle(`${langSwitcher} button`, {
  color: 'rgba(255,255,255,0.7)',
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

export const profileButton = style({
  all: 'unset',
  cursor: 'pointer',
  font: vars.font.shorthand.uiRegular,
  color: 'rgba(255,255,255,0.7)',
  paddingBlock: vars.padding.xs,
  paddingInline: vars.padding.m,
  border: '1px solid rgba(255,255,255,0.15)',
  borderRadius: vars.radii.pill,
  transitionProperty: 'border-color, background-color, color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    color: 'white',
    borderColor: 'rgba(255,255,255,0.3)',
    backgroundColor: 'rgba(255,255,255,0.06)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

export const logoutButton = style({
  all: 'unset',
  cursor: 'pointer',
  font: vars.font.shorthand.uiRegular,
  color: '#a5b4fc',
  paddingBlock: vars.padding.xs,
  paddingInline: vars.padding.m,
  border: '1px solid rgba(129,140,248,0.35)',
  borderRadius: vars.radii.pill,
  transitionProperty: 'border-color, background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    borderColor: '#818cf8',
    backgroundColor: 'rgba(129,140,248,0.1)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})
