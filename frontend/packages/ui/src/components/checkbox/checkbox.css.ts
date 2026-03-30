import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const checkboxInput = style({
  position: 'absolute',
  width: 1,
  height: 1,
  padding: 0,
  margin: -1,
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
})

export const checkbox = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  cursor: 'pointer',
  borderRadius: vars.radii.xs,
  selectors: {
    [`&:has(${checkboxInput}:focus-visible)`]: {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

export const checkboxIndicator = style({
  display: 'block',
  flexShrink: 0,
  width: 18,
  height: 18,
})

globalStyle(`${checkboxIndicator} .octagon-stroke`, {
  stroke: vars.color.borderSubtle,
  fill: 'none',
  transitionProperty: 'stroke, fill',
  transitionDuration: vars.transition.duration.fast,
})

globalStyle(`${checkboxInput}:hover ~ ${checkboxIndicator} .octagon-stroke`, {
  stroke: vars.color.text,
})

globalStyle(`${checkboxInput}:checked ~ ${checkboxIndicator} .octagon-stroke`, {
  stroke: vars.color.text,
  fill: vars.color.text,
})

globalStyle(`${checkboxInput}:disabled ~ ${checkboxIndicator}`, {
  opacity: 0.5,
  cursor: 'not-allowed',
})

export const checkboxLabel = style({
  selectors: {
    [`${checkboxInput}:disabled ~ &`]: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})
