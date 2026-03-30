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
  justifyContent: 'space-between',
  paddingInline: vars.padding.m,
  paddingBlock: vars.padding.s,
  backgroundColor: vars.color.surface,
  borderWidth: '1px',
  borderStyle: 'solid',
  borderColor: vars.color.border,
  borderRadius: '8px',
  cursor: 'pointer',
  transitionProperty: 'background-color, border-color',
  transitionDuration: '0.15s',
  transitionTimingFunction: 'ease-in-out',
  ':hover': {
    borderColor: vars.color.primary,
  },
  ':focus-visible': {
    outline: `2px solid ${vars.color.primary}`,
    outlineOffset: '2px',
  },
})

export const itemName = style({
  fontWeight: 500,
  color: vars.color.text,
})

export const empty = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.xl,
  color: vars.color.textMuted,
  textAlign: 'center',
})

export const center = style({
  display: 'flex',
  justifyContent: 'center',
  paddingBlock: vars.padding.xl,
})
