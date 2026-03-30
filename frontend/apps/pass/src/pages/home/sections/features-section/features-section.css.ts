import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.xxl,
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
  backgroundColor: vars.color.background,
  '@media': {
    [media.desktop]: {
      paddingBlock: '80px',
    },
  },
})

export const grid = style({
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: vars.spacing.l,
  width: '100%',
  maxWidth: '64rem',
  '@media': {
    [media.desktop]: {
      gridTemplateColumns: '1fr 1fr',
    },
  },
})
