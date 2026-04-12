import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

const base = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.xs,
  border: `1px solid ${vars.color.borderSubtle}`,
  background: 'none',
  cursor: 'pointer',
  transitionProperty: 'color, border-color, background-color',
  transitionDuration: vars.transition.duration.fast,
  selectors: {
    '&:hover': {
      color: vars.color.primary,
      borderColor: vars.color.primary,
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

export const variant = styleVariants({
  round: [base, {
    width: 44,
    height: 44,
    padding: 0,
    borderRadius: vars.radii.full,
  }],
  pill: [base, { padding: `${vars.padding.m} ${vars.padding.l}`, borderRadius: vars.radii.pill }],
})
