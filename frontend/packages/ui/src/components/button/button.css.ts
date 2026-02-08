import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '8px 16px',
  border: 'none',
  cursor: 'pointer',
  fontFamily: 'inherit',
  fontSize: 'inherit',
  color: vars.color.text,
  transition: 'background-color 0.2s, outline-color 0.2s',
  outline: '2px solid transparent',
  outlineOffset: 2,
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
    backgroundColor: vars.color.surface,
    ':hover': {
      filter: 'brightness(0.95)',
    },
  },
  success: {
    backgroundColor: vars.color.success,
    color: 'white',
    ':hover': {
      filter: 'brightness(0.9)',
    },
  },
})

export const rounded = styleVariants({
  none: { borderRadius: 0 },
  sm: { borderRadius: 4 },
  md: { borderRadius: 8 },
  full: { borderRadius: 9999 },
})

export const slot = style({
  display: 'inline-flex',
  alignItems: 'center',
})
