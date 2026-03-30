import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const wrapper = style({
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

export const wrapperError = style({
  borderColor: vars.color.error,
  ':hover': {
    borderColor: vars.color.errorHover,
  },
  ':focus-within': {
    borderColor: vars.color.errorPressed,
  },
})

export const wrapperDisabled = style({
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
