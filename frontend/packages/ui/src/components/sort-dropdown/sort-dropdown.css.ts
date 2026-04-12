import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const sortDropdown = style({
  position: 'relative',
})

export const trigger = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  borderRadius: vars.radii.xs,
  cursor: 'pointer',
  userSelect: 'none',
  background: 'none',
  border: 'none',
  padding: 0,
  font: 'inherit',
  color: 'inherit',
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

export const chevronIcon = style({
  transform: 'rotate(90deg)',
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
})

export const chevronIconOpen = style({
  transform: 'rotate(270deg)',
})

export const optionsList = style({
  display: 'none',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  paddingTop: vars.padding.s,
})

export const optionsListOpen = style({
  display: 'flex',
})

export const option = style({
  borderRadius: vars.radii.xs,
  textDecoration: 'none',
  opacity: 0.6,
  transitionProperty: 'opacity, color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  selectors: {
    '&:hover': {
      opacity: 1,
      color: vars.color.primary,
    },
    '&:active': {
      opacity: 1,
      color: vars.color.primary,
    },
    '&:focus-visible': {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

export const activeOption = style({
  opacity: 1,
  color: vars.color.primary,
})

globalStyle(`${sortDropdown} svg`, {
  display: 'block',
})
