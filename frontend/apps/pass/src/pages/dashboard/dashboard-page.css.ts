import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  minHeight: '100dvh',
  paddingTop: '72px',
  backgroundColor: vars.color.background,
})

export const container = style({
  width: '100%',
  maxWidth: '1240px',
  marginInline: 'auto',
  paddingInline: vars.padding.l,
  paddingBlock: vars.padding.xl,
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.l,
  '@media': {
    [media.desktop]: {
      paddingInline: vars.padding.xxl,
    },
  },
})

export const pageHeader = style({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  gap: vars.spacing.m,
})

export const alert = style({
  width: '100%',
})
