import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from '../contract.css'

createGlobalTheme(':root', vars.radii, {
  xs: '4px',
  s: '12px',
  m: '16px',
  l: '30px',
  full: '50%',
  pill: '9999px',
})
