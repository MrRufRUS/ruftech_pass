import { style } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const page = style({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100dvh',
  paddingTop: '72px',
  paddingInline: vars.padding.l,
  paddingBottom: vars.padding.xl,
  backgroundColor: vars.color.background,
  position: 'relative',
  overflow: 'hidden',
  '::before': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'radial-gradient(ellipse 70% 60% at 50% 30%, rgba(99,102,241,0.18) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
})

export const container = style({
  width: '100%',
  maxWidth: '1200px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  position: 'relative',
  zIndex: 1,
})

export const card = style({
  width: '100%',
  maxWidth: '420px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: vars.spacing.l,
  padding: vars.padding.xxl,
  backgroundColor: 'rgba(23, 23, 42, 0.8)',
  border: '1px solid rgba(129, 140, 248, 0.2)',
  borderRadius: vars.radii.l,
  backdropFilter: 'blur(20px)',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(129, 140, 248, 0.05)',
})

export const form = style({
  display: 'flex',
  flexDirection: 'column',
  gap: vars.spacing.m,
  width: '100%',
})

export const submit = style({
  marginTop: vars.spacing.s,
  width: '100%',
})

export const alert = style({
  width: '100%',
})
