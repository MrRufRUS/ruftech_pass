import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from '../contract.css'

const multiplier = 1
const ms = (v: number) => `${(v * multiplier).toString()}ms`

createGlobalTheme(':root', vars.transition, {
  duration: {
    extraFast: ms(100),
    fast: ms(150),
    base: ms(300),
    slow: ms(600),
    xSlow: ms(1000),
  },
  easing: {
    base: 'ease',
    in: 'ease-in',
    out: 'ease-out',
    inOut: 'ease-in-out',
  },
})
