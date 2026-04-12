import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.m,
  borderBottom: `1px solid ${vars.color.border}`,
  ':last-child': {
    borderBottom: 'none',
    paddingBottom: 0,
  },
})

export const sectionTitle = style({
  font: vars.font.shorthand.uiRegular,
  color: vars.color.text,
  fontWeight: 600,
  marginBottom: vars.spacing.xs,
})

export const dangerSection = style([
  section,
  {
    borderTop: `1px solid rgba(239, 68, 68, 0.3)`,
    borderBottom: 'none',
    paddingBottom: 0,
  },
])

export const dangerTitle = style([
  sectionTitle,
  { color: vars.color.error },
])

export const note = style({
  font: vars.font.shorthand.uiRegular,
  color: vars.color.textMuted,
  fontSize: '0.8125rem',
})

export const successText = style({
  font: vars.font.shorthand.uiRegular,
  color: vars.color.success,
  fontSize: '0.875rem',
})

export const confirmText = style({
  font: vars.font.shorthand.uiRegular,
  color: vars.color.textMuted,
  fontSize: '0.875rem',
  lineHeight: 1.5,
})

export const buttonRow = style({
  display: 'flex',
  gap: vars.spacing.s,
})
