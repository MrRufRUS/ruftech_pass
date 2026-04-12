import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const list = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.s,
})

export const item = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.m,
  paddingInline: vars.padding.l,
  paddingBlock: vars.padding.m,
  backgroundColor: 'rgba(23, 23, 42, 0.6)',
  border: '1px solid rgba(255,255,255,0.06)',
  borderRadius: vars.radii.m,
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color, box-shadow',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.out,
  ':hover': {
    backgroundColor: 'rgba(23, 23, 42, 0.9)',
    borderColor: 'rgba(129,140,248,0.35)',
    boxShadow: '0 4px 20px rgba(99,102,241,0.12)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
})

export const avatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 40,
  height: 40,
  borderRadius: vars.radii.s,
  backgroundColor: 'rgba(129,140,248,0.15)',
  color: '#818cf8',
  fontWeight: 600,
  fontSize: '0.875rem',
  flexShrink: 0,
  textTransform: 'uppercase',
  border: '1px solid rgba(129,140,248,0.2)',
})

export const itemContent = style({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  flex: 1,
  minWidth: 0,
})

export const itemName = style({
  fontWeight: 600,
  color: vars.color.text,
  fontSize: '0.9375rem',
})

export const itemArrow = style({
  color: 'rgba(255,255,255,0.2)',
  flexShrink: 0,
  transitionProperty: 'color, transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.out,
  selectors: {
    [`${item}:hover &`]: {
      color: '#818cf8',
      transform: 'translateX(2px)',
    },
  },
})

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.xxl,
  color: vars.color.textMuted,
  textAlign: 'center',
})

export const emptyIcon = style({
  fontSize: '3rem',
  opacity: 0.3,
})

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: vars.padding.xl,
})
