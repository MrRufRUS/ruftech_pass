import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const wrapper = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.l,
})

/* ── Search ──────────────────────────────────────────────── */

export const searchWrapper = style({
  position: 'relative',
  width: '100%',
  maxWidth: '480px',
})

export const searchInput = style({
  width: '100%',
  paddingBlock: vars.padding.m,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.m,
  color: vars.color.text,
  font: vars.font.shorthand.uiRegular,
  outline: 'none',
  transitionProperty: 'border-color, box-shadow',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  '::placeholder': {
    color: vars.color.textMuted,
  },
  ':focus': {
    borderColor: vars.color.primary,
    boxShadow: `0 0 0 3px rgba(99,102,241,0.15)`,
  },
})

export const suggestions = style({
  position: 'absolute',
  top: 'calc(100% + 4px)',
  left: 0,
  right: 0,
  listStyle: 'none',
  margin: 0,
  padding: vars.padding.xs,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.m,
  boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
  zIndex: 10,
})

export const suggestion = style({
  all: 'unset',
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  width: '100%',
  paddingBlock: vars.padding.s,
  paddingInline: vars.padding.m,
  borderRadius: vars.radii.s,
  cursor: 'pointer',
  color: vars.color.text,
  font: vars.font.shorthand.uiRegular,
  boxSizing: 'border-box',
  transitionProperty: 'background-color',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.base,
  ':hover': {
    backgroundColor: 'rgba(129,140,248,0.12)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: 2,
  },
})

export const suggestionAvatar = style({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  borderRadius: vars.radii.xs,
  backgroundColor: 'rgba(129,140,248,0.2)',
  color: vars.color.primary,
  fontSize: '0.75rem',
  fontWeight: 600,
  flexShrink: 0,
  textTransform: 'uppercase',
})

/* ── Grid ────────────────────────────────────────────────── */

export const grid = style({
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 1fr)',
  gap: vars.spacing.m,
  '@media': {
    [media.desktop]: {
      gridTemplateColumns: 'repeat(4, 1fr)',
    },
  },
})

export const card = style({
  all: 'unset',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.xl,
  paddingInline: vars.padding.m,
  backgroundColor: vars.color.surface,
  border: `1px solid ${vars.color.border}`,
  borderRadius: vars.radii.l,
  cursor: 'pointer',
  textAlign: 'center',
  boxSizing: 'border-box',
  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
  transitionProperty: 'border-color, box-shadow, transform',
  transitionDuration: vars.transition.duration.fast,
  transitionTimingFunction: vars.transition.easing.out,
  ':hover': {
    borderColor: 'rgba(129,140,248,0.4)',
    boxShadow: '0 8px 32px rgba(99,102,241,0.14)',
    transform: 'translateY(-2px)',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
})

export const cardAvatar = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 56,
  height: 56,
  borderRadius: vars.radii.m,
  backgroundColor: 'rgba(129,140,248,0.15)',
  border: '1px solid rgba(129,140,248,0.25)',
  color: vars.color.primary,
  fontWeight: 700,
  fontSize: '1.375rem',
  flexShrink: 0,
  textTransform: 'uppercase',
})

export const cardName = style({
  color: vars.color.text,
  fontWeight: 600,
  fontSize: '0.9375rem',
  width: '100%',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
})

/* ── States ──────────────────────────────────────────────── */

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
