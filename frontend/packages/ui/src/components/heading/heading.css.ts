import { styleVariants } from '@vanilla-extract/css'
import { vars } from '@ruftech/tokens'

const base = {
  letterSpacing: vars.font.letterSpacing.heading,
  color: vars.color.text,
} as const

export const level = styleVariants({
  1: { ...base, font: vars.font.shorthand.h1 },
  2: { ...base, font: vars.font.shorthand.h2 },
  3: { ...base, font: vars.font.shorthand.h3 },
  4: { ...base, font: vars.font.shorthand.h3 },
  5: { ...base, font: vars.font.shorthand.h3 },
  6: { ...base, font: vars.font.shorthand.h3 },
})
