import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const header = style({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  zIndex: 50,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.l,
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  backdropFilter: 'blur(12px)',
  '@media': {
    [media.desktop]: {
      paddingInline: vars.padding.xxl,
    },
  },
})

export const nav = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.m,
})

export const navButton = style({
  all: 'unset',
  cursor: 'pointer',
  font: vars.font.shorthand.uiRegular,
  color: 'rgba(255, 255, 255, 0.7)',
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    color: 'white',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
    borderRadius: vars.radii.xs,
  },
})

export const loginLink = style({
  font: vars.font.shorthand.uiRegular,
  color: 'white',
  textDecorationLine: 'none',
  paddingBlock: vars.padding.xs,
  paddingInline: vars.padding.m,
  border: '1px solid rgba(255, 255, 255, 0.3)',
  borderRadius: vars.radii.pill,
  transitionProperty: 'border-color, background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    borderColor: 'white',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})
