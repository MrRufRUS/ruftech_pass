import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const wrapper = style({
  position: 'relative',
})

export const inputWrapper = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.m,
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.xl,
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

export const inputWrapperError = style({
  borderColor: vars.color.error,
  ':hover': {
    borderColor: vars.color.errorHover,
  },
  ':focus-within': {
    borderColor: vars.color.errorPressed,
  },
})

export const inputWrapperDisabled = style({
  opacity: 0.5,
  cursor: 'not-allowed',
})

export const fieldLabel = style({
  display: 'contents',
})

export const input = style({
  flex: 1,
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
  background: 'none',
  border: 'none',
  outline: 'none',
  '::placeholder': {
    color: vars.color.text,
    opacity: 0.4,
  },
  ':disabled': {
    cursor: 'not-allowed',
  },
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

export const emptyMessage = style({
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  opacity: 0.5,
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
