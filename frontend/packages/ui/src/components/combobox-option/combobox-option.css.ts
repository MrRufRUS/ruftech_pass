import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const option = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.l,
  cursor: 'pointer',
  transitionProperty: 'background-color, color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  selectors: {
    '&:hover': {
      backgroundColor: vars.color.borderSubtle,
    },
    '&[data-active]': {
      backgroundColor: vars.color.borderSubtle,
    },
    '&[aria-selected="true"]': {
      color: vars.color.primary,
    },
  },
})

export const checkmark = style({
  width: 14,
  height: 14,
  flexShrink: 0,
  marginLeft: 'auto',
  opacity: 0,
  transitionProperty: 'opacity',
  transitionDuration: vars.transition.duration.fast,
  selectors: {
    [`${option}[aria-selected="true"] &`]: {
      opacity: 1,
    },
  },
})
