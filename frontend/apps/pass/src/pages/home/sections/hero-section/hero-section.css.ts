import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  gap: vars.spacing.m,
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.backgroundDark,
  textAlign: 'center',
})

export const title = style({
  font: vars.font.shorthand.h1,
  letterSpacing: vars.font.letterSpacing.heading,
  color: vars.color.background,
  margin: 0,
})

export const subtitle = style({
  font: vars.font.shorthand.h2,
  letterSpacing: vars.font.letterSpacing.heading,
  color: vars.color.background,
  margin: 0,
  opacity: 0.85,
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: vars.color.background,
  margin: 0,
  opacity: 0.7,
  maxWidth: '36rem',
})
