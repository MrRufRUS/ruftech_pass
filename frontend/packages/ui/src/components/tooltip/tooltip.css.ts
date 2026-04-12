import { keyframes, style, styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

export const wrapper = style({
  position: 'relative',
  display: 'inline-flex',
})

const fadeIn = keyframes({
  from: { opacity: 0 },
  to: { opacity: 1 },
})

export const tooltip = style({
  position: 'absolute',
  zIndex: 50,
  paddingBlock: vars.padding.xs,
  paddingInline: vars.padding.s,
  borderRadius: vars.radii.s,
  backgroundColor: vars.color.backgroundDark,
  color: vars.color.background,
  font: vars.font.shorthand.uiMini,
  letterSpacing: vars.font.letterSpacing.uiMini,
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  animationName: fadeIn,
  animationDuration: vars.transition.duration.fast,
  animationTimingFunction: vars.transition.easing.out,
  animationFillMode: 'both',
})

export const position = styleVariants({
  top: {
    bottom: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginBottom: vars.spacing.xs,
  },
  bottom: {
    top: '100%',
    left: '50%',
    transform: 'translateX(-50%)',
    marginTop: vars.spacing.xs,
  },
  left: {
    right: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginRight: vars.spacing.xs,
  },
  right: {
    left: '100%',
    top: '50%',
    transform: 'translateY(-50%)',
    marginLeft: vars.spacing.xs,
  },
})
