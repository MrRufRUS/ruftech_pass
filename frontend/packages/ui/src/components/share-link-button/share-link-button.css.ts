import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const shareLinkButton = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 44,
  height: 44,
  padding: 0,
  borderRadius: vars.radii.full,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: 'none',
  cursor: 'pointer',
  transitionProperty: 'color, border-color, background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  selectors: {
    '&:hover': {
      color: vars.color.background,
      backgroundColor: vars.color.backgroundDark,
      borderColor: vars.color.backgroundDark,
    },
    '&:active': {
      color: vars.color.background,
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

globalStyle(`${shareLinkButton} svg`, {
  display: 'block',
})

export const active = style({
  color: vars.color.background,
  backgroundColor: vars.color.backgroundDark,
  borderColor: vars.color.backgroundDark,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.backgroundDark,
      borderColor: vars.color.backgroundDark,
    },
  },
})
