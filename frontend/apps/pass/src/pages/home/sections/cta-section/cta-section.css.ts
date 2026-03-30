import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.primary,
  textAlign: 'center',
  '@media': {
    [media.desktop]: {
      paddingBlock: '80px',
    },
  },
})

export const heading = style({
  font: vars.font.shorthand.h2,
  letterSpacing: vars.font.letterSpacing.heading,
  color: 'white',
  margin: 0,
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: 'white',
  margin: 0,
  opacity: 0.9,
  maxWidth: '32rem',
})
