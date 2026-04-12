import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.backgroundDark,
  textAlign: 'center',
  '@media': {
    [media.desktop]: {
      paddingBlock: '80px',
    },
  },
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: '#8b93a7',
  margin: 0,
  maxWidth: '40rem',
})
