import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  maxWidth: '100%',
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  cursor: 'pointer',
  font: vars.font.shorthand.regularText,
  border: '1px solid transparent',
  outline: '2px solid transparent',
  outlineOffset: 2,
  transitionProperty: 'background-color, border-color, color, outline-color',
  transitionDuration: '0.2s',
  transitionTimingFunction: 'ease-in-out',
  ':focus-visible': {
    outlineColor: vars.color.primary,
  },
  ':disabled': {
    cursor: 'not-allowed',
    opacity: 0.5,
  },
})

export const variant = styleVariants({
  surface: {
    backgroundColor: vars.color.backgroundTransparent,
    borderColor: vars.color.border,
    color: vars.color.text,
    ':hover': {
      backgroundColor: 'transparent',
      borderColor: vars.color.primary,
    },
    ':active': {
      backgroundColor: vars.color.primary,
      borderColor: vars.color.primary,
      color: 'white',
    },
  },
  success: {
    backgroundColor: vars.color.backgroundTransparent,
    borderColor: vars.color.border,
    color: vars.color.success,
    ':hover': {
      backgroundColor: 'transparent',
      borderColor: vars.color.success,
    },
    ':active': {
      backgroundColor: vars.color.success,
      borderColor: vars.color.success,
      color: 'white',
    },
  },
  successFilled: {
    backgroundColor: vars.color.success,
    borderColor: vars.color.success,
    color: 'white',
    ':hover': {
      backgroundColor: vars.color.successHover,
      borderColor: vars.color.successHover,
    },
    ':active': {
      backgroundColor: vars.color.successPressed,
      borderColor: vars.color.successPressed,
    },
  },
  errorFilled: {
    backgroundColor: vars.color.error,
    borderColor: vars.color.error,
    color: 'white',
    ':hover': {
      backgroundColor: vars.color.errorHover,
      borderColor: vars.color.errorHover,
    },
    ':active': {
      backgroundColor: vars.color.errorPressed,
      borderColor: vars.color.errorPressed,
    },
  },
})

export const rounded = styleVariants({
  none: { borderRadius: 0 },
  sm: { borderRadius: 4 },
  md: { borderRadius: 8 },
  full: { borderRadius: 9999 },
})

export const content = style({
  display: 'block',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  lineHeight: 1,
})

export const slot = style({
  alignItems: 'center',
  verticalAlign: 'middle',
  color: 'currentColor',
  selectors: {
    '& + &': {
      marginLeft: vars.spacing.s,
    },
  },
})
