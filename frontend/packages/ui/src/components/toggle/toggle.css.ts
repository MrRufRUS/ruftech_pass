import { style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const toggle = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  cursor: 'pointer',
})

export const toggleInput = style({
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

const trackBase = style({
  position: 'relative',
  width: 44,
  height: 24,
  borderRadius: vars.radii.s,
  transitionProperty: 'background-color',
  transitionDuration: vars.transition.duration.fast,
  flexShrink: 0,
  order: 2,
  '::before': {
    content: '""',
    position: 'absolute',
    top: 3,
    left: 3,
    width: 18,
    height: 18,
    borderRadius: vars.radii.full,
    transitionProperty: 'transform, background-color',
    transitionDuration: vars.transition.duration.fast,
  },
  selectors: {
    [`${toggleInput}:checked ~ &::before`]: {
      transform: 'translateX(20px)',
    },
    [`${toggleInput}:focus-visible ~ &`]: {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 2,
    },
  },
})

export const toggleTrack = styleVariants({
  light: [trackBase, {
    backgroundColor: vars.color.borderSubtle,
    '::before': { backgroundColor: vars.color.background },
    selectors: {
      [`${toggleInput}:checked ~ &`]: { backgroundColor: vars.color.primary },
    },
  }],
  dark: [trackBase, {
    backgroundColor: vars.color.backgroundDark,
    '::before': { backgroundColor: vars.color.background },
    selectors: {
      [`${toggleInput}:checked ~ &`]: { backgroundColor: vars.color.background },
      [`${toggleInput}:checked ~ &::before`]: { backgroundColor: vars.color.backgroundDark },
    },
  }],
})

export const toggleLabelBefore = style({
  order: 1,
})

export const toggleLabelAfter = style({
  order: 3,
})
