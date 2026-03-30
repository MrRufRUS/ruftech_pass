import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  paddingInline: vars.padding.l,
  paddingBlock: vars.padding.xl,
  backgroundColor: vars.color.background,
})

export const container = style({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
})

export const card = style({
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  width: '100%',
})

export const submit = style({
  marginTop: vars.spacing.s,
  width: '100%',
})

export const alert = style({
  width: '100%',
})
