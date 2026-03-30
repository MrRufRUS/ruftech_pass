import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const wrapper = style({
  position: 'relative',
})

export const trigger = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: '100%',
  boxSizing: 'border-box',
  gap: vars.spacing.s,
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.xl,
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
  backgroundColor: 'transparent',
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.m,
  cursor: 'pointer',
  transitionProperty: 'border-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    borderColor: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})

export const triggerOpen = style({
  borderColor: vars.color.text,
})

export const triggerError = style({
  borderColor: vars.color.error,
  ':hover': {
    borderColor: vars.color.errorHover,
  },
})

export const placeholder = style({
  opacity: 0.4,
})

export const chevron = style({
  width: 16,
  height: 16,
  flexShrink: 0,
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
})

export const chevronOpen = style({
  transform: 'rotate(90deg)',
})

export const dropdown = style({
  position: 'absolute',
  top: '100%',
  left: 0,
  right: 0,
  zIndex: 10,
  display: 'none',
  flexDirection: 'column',
  marginTop: vars.spacing.xs,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.m,
  paddingBlock: vars.padding.s,
  backgroundColor: vars.color.background,
  maxHeight: 200,
  overflowY: 'auto',
})

export const dropdownOpen = style({
  display: 'flex',
})

export const option = style({
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
  cursor: 'pointer',
  transitionProperty: 'background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    backgroundColor: vars.color.surfaceSubtle,
  },
})

export const optionSelected = style({
  backgroundColor: vars.color.surfaceSubtle,
})

export const srOnly = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  border: 0,
})
