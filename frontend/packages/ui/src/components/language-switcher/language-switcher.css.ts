import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const switcher = style({
  position: 'relative',
  display: 'inline-block',
})

export const trigger = style({
  textTransform: 'uppercase',
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  padding: 0,
  borderRadius: vars.radii.xs,
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  font: vars.font.shorthand.uiCaps,
  letterSpacing: vars.font.letterSpacing.uiCaps,
  color: vars.color.text,
  ':hover': {
    color: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 1,
  },
})

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  display: 'grid',
  gridTemplateRows: '0fr',
  visibility: 'hidden',
  transitionProperty: 'grid-template-rows, visibility',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  paddingTop: vars.padding.xs,
  minWidth: 'max-content',
})

export const dropdownOpen = style({
  gridTemplateRows: '1fr',
  visibility: 'visible',
})

export const dropdownInner = style({
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.s,
  paddingBlock: vars.padding.xs,
  paddingInline: vars.padding.s,
  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
})

export const localeLink = style({
  textTransform: 'uppercase',
  textDecoration: 'none',
  font: vars.font.shorthand.uiCaps,
  letterSpacing: vars.font.letterSpacing.uiCaps,
  transitionProperty: 'color, opacity',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  color: vars.color.text,
  ':hover': {
    color: vars.color.primary,
  },
})

export const activeLocale = style({
  color: vars.color.primary,
  textDecoration: 'underline',
})
