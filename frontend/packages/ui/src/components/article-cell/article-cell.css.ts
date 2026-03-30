import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const cell = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
})

export const textWrapper = style({
  display: 'flex',
  flexGrow: 1,
  flexShrink: 0,
  alignItems: 'flex-end',
})

export const meta = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

export const tags = style({
  font: vars.font.shorthand.uiRegular,
  letterSpacing: vars.font.letterSpacing.uiRegular,
})

export const title = style({
  font: vars.font.shorthand.h3,
  letterSpacing: vars.font.letterSpacing.heading,
})

export const date = style({
  font: vars.font.shorthand.uiMini,
  letterSpacing: vars.font.letterSpacing.uiMini,
})

export const readTime = style({
  font: vars.font.shorthand.uiMini,
  letterSpacing: vars.font.letterSpacing.uiMini,
})
