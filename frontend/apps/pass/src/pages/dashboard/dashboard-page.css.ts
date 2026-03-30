import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100dvh',
  paddingInline: vars.padding.l,
  paddingBlock: vars.padding.xl,
  backgroundColor: vars.color.background,
})

export const container = style({
  width: '100%',
  maxWidth: '720px',
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.l,
})

export const header = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.m,
})

export const alert = style({
  width: '100%',
})
