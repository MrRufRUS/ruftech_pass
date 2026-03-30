import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from '../contract.css'

createGlobalTheme(':root', vars.icon, {
  size: {
    xs: '1rem',
    s: '1.25rem',
    m: '1.5rem',
    l: '2rem',
    xl: '3rem',
  },
})
