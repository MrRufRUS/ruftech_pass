import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.surface,
  textAlign: 'center',
  '@media': {
    [media.desktop]: {
      paddingBlock: '80px',
    },
  },
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: vars.color.textMuted,
  margin: 0,
  maxWidth: '40rem',
})
