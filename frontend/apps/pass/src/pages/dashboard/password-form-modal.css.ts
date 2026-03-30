import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  width: '100%',
})

export const footer = style({
  display: 'flex',
  justifyContent: 'flex-end',
  gap: vars.spacing.s,
})
