import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const accordion = style({
  display: 'grid',
  gridTemplateColumns: 'auto 1fr',
  columnGap: vars.spacing.s,
  borderTop: `1px solid ${vars.color.borderSubtle}`,
  borderBottom: `1px solid ${vars.color.borderSubtle}`,
})

export const input = style({
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

export const summary = style({
  gridColumn: '1 / -1',
  display: 'grid',
  gridTemplateColumns: 'subgrid',
  alignItems: 'center',
  paddingBlock: vars.padding.m,
  cursor: 'pointer',
  borderRadius: vars.radii.xs,
  selectors: {
    [`${input}:focus-visible ~ &`]: {
      outline: `2px solid ${vars.color.primary}`,
      outlineOffset: 1,
    },
  },
})

export const toggleIcon = style({
  display: 'flex',
  gap: vars.spacing.xs,
  font: vars.font.shorthand.uiRegular,
  letterSpacing: vars.font.letterSpacing.uiRegular,
  lineHeight: 1,
})

export const togglePlus = style({
  transformOrigin: 'center center',
  transitionProperty: 'transform',
  transitionDuration: vars.transition.duration.slow,
  transitionTimingFunction: vars.transition.easing.base,
  selectors: {
    [`${input}:checked ~ ${summary} &`]: {
      transform: 'rotate(45deg)',
    },
  },
})

export const contentWrapper = style({
  gridColumn: '2',
  display: 'grid',
  gridTemplateRows: '0fr',
  transitionProperty: 'grid-template-rows',
  transitionDuration: vars.transition.duration.slow,
  transitionTimingFunction: vars.transition.easing.base,
  selectors: {
    [`${input}:checked ~ &`]: {
      gridTemplateRows: '1fr',
    },
  },
})

export const contentInner = style({
  overflow: 'hidden',
})

export const content = style({
  paddingBottom: vars.padding.m,
})
