import { style } from '@vanilla-extract/css'
import { media, vars } from '@ruftech/tokens'

export const section = style({
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  backgroundColor: vars.color.backgroundDark,
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 80% 50% at 50% -10%, rgba(99,102,241,0.25) 0%, transparent 60%)',
    pointerEvents: 'none',
    zIndex: 0,
  },
  '::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    backgroundImage: [
      'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
      'repeating-linear-gradient(90deg, transparent, transparent 59px, rgba(255,255,255,0.03) 59px, rgba(255,255,255,0.03) 60px)',
    ].join(', '),
    pointerEvents: 'none',
    zIndex: 0,
  },
})

export const inner = style({
  position: 'relative',
  zIndex: 1,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '24px',
  textAlign: 'center',
  paddingTop: '120px',
  paddingBottom: '80px',
  paddingInline: vars.padding.l,
})

export const eyebrow = style({
  display: 'inline-flex',
  alignItems: 'center',
  gap: '6px',
  paddingBlock: '6px',
  paddingInline: '14px',
  borderRadius: vars.radii.pill,
  border: '1px solid rgba(129,140,248,0.3)',
  backgroundColor: 'rgba(129,140,248,0.08)',
  font: vars.font.shorthand.uiRegular,
  color: '#818cf8',
  marginBottom: '8px',
})

export const title = style({
  font: vars.font.shorthand.h1,
  letterSpacing: vars.font.letterSpacing.heading,
  margin: 0,
  background: 'linear-gradient(135deg, #ffffff 0%, #a5b4fc 50%, #818cf8 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  maxWidth: '52rem',
  '@media': {
    [media.desktop]: {
      fontSize: '3rem',
    },
  },
})

export const subtitle = style({
  font: vars.font.shorthand.h2,
  letterSpacing: vars.font.letterSpacing.heading,
  color: '#8b93a7',
  margin: 0,
  maxWidth: '36rem',
})

export const description = style({
  font: vars.font.shorthand.regularText,
  color: '#8b93a7',
  opacity: 0.8,
  margin: 0,
  maxWidth: '32rem',
})
