import { globalStyle, style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const radioInput = style({
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

export const radio = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  cursor: 'pointer',
  borderRadius: vars.radii.xs,
  selectors: {
    [`&:has(${radioInput}:focus-visible)`]: {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

export const radioIndicator = style({
  display: 'block',
  flexShrink: 0,
  width: 18,
  height: 18,
})

globalStyle(`${radioIndicator} .octagon-stroke`, {
  stroke: vars.color.borderSubtle,
  fill: 'none',
  transitionProperty: 'stroke',
  transitionDuration: vars.transition.duration.fast,
})

globalStyle(`${radioIndicator} .octagon-dot`, {
  fill: 'none',
  transitionProperty: 'fill',
  transitionDuration: vars.transition.duration.fast,
})

globalStyle(`${radioInput}:hover ~ ${radioIndicator} .octagon-stroke`, {
  stroke: vars.color.text,
})

globalStyle(`${radioInput}:checked ~ ${radioIndicator} .octagon-stroke`, {
  stroke: vars.color.text,
})

globalStyle(`${radioInput}:checked ~ ${radioIndicator} .octagon-dot`, {
  fill: vars.color.text,
})

globalStyle(`${radioInput}:disabled ~ ${radioIndicator}`, {
  opacity: 0.5,
  cursor: 'not-allowed',
})

export const radioLabel = style({
  selectors: {
    [`${radioInput}:disabled ~ &`]: {
      opacity: 0.5,
      cursor: 'not-allowed',
    },
  },
})
