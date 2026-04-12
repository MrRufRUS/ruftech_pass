import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  background: 'linear-gradient(135deg, #17172a 0%, #1e1b4b 50%, #17172a 100%)',
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(99,102,241,0.2) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
})

export const inner = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  textAlign: 'center',
  paddingBlock: vars.padding.xxl,
  paddingInline: vars.padding.l,
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
  color: 'rgba(255,255,255,0.7)',
  margin: 0,
  maxWidth: '32rem',
})
