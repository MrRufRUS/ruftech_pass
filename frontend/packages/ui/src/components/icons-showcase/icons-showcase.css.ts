import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const grid = style({
  display: 'flex',
  flexWrap: 'wrap',
  gap: vars.spacing.m,
})

export const cell = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: vars.spacing.s,
  padding: vars.padding.s,
  border: `1px solid ${vars.color.borderSubtle}`,
  borderRadius: vars.radii.xs,
})
