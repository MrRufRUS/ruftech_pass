import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const fieldRow = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.xs,
  paddingBlock: vars.padding.xs,
})

export const fieldLabel = style({
  fontSize: '0.75rem',
  fontWeight: 500,
  color: vars.color.textMuted,
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
})

export const fieldValue = style({
  display: 'flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  color: vars.color.text,
  wordBreak: 'break-all',
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.s,
})

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: vars.padding.xl,
})

export const passwordToggle = style({
  background: 'none',
  border: 'none',
  cursor: 'pointer',
  color: vars.color.primary,
  padding: 0,
  fontSize: '0.875rem',
  ':hover': {
    textDecorationLine: 'underline',
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
})
