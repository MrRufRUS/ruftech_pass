import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const articleLink = style({
  display: 'block',
  borderRadius: vars.radii.xs,
  border: `1px solid ${vars.color.border}`,
  padding: `40px ${vars.padding.xl}`,
  textDecoration: 'none',
  color: 'inherit',
  transitionProperty: 'border-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    borderColor: vars.color.primary,
  },
  ':active': {
    borderColor: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: -8,
  },
})

globalStyle(`${articleLink} h3`, {
  transitionProperty: 'color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
})

globalStyle(`${articleLink}:hover h3`, {
  color: vars.color.primary,
})
