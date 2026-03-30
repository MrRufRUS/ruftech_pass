import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const wrapper = style({
  position: 'relative',
  overflow: 'hidden',
})

export const inputArea = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.xs,
  overflow: 'hidden',
  width: '100%',
  boxSizing: 'border-box',
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.m,
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  transitionProperty: 'border-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    borderColor: vars.color.primary,
  },
  ':focus-within': {
    borderColor: vars.color.text,
  },
})

export const searchIcon = style({
  width: 16,
  height: 16,
  flexShrink: 0,
  opacity: 0.6,
})

export const toggleButton = style({
  all: 'unset',
  display: 'inline-flex',
  cursor: 'pointer',
  flexShrink: 0,
  borderRadius: vars.radii.xs,
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

export const toggleIcon = style({
  width: 14,
  height: 14,
  flexShrink: 0,
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
})

export const toggleIconOpen = style({
  transform: 'rotate(45deg)',
})

export const input = style({
  flex: 1,
  minWidth: 60,
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
  background: 'none',
  border: 'none',
  outline: 'none',
  padding: 0,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  '::placeholder': {
    color: vars.color.text,
    opacity: 0.4,
  },
})

export const listbox = style({
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

export const listboxOpen = style({
  display: 'flex',
})

export const emptyMessage = style({
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  opacity: 0.5,
})
