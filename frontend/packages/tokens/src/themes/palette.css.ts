import { createGlobalTheme } from '@vanilla-extract/css'
import { vars } from '../contract.css'

createGlobalTheme(':root', vars.palette, {
  greyBlack: '#333333',
  greySelection: '#3333331a',
  greyBorder: '#33333399',
  greySurface: '#3d3d3d',
  black: '#0b0400',
  light: '#f1f1f1',
  lightBorder: '#f1f1f199',
  white: 'white',
  whiteSub: '#ffffff80',
  blue: '#566ae4',
  darkBlue: '#3845cf',
  lightBlue: '#babde7',
  softBlue: '#7b8ff0',
  deepBlue: '#232a5c',
  green: '#22c55e',
  darkGreen: '#16a34a',
  deepGreen: '#0c7332',
  red: '#ef4444',
  darkRed: '#dc2626',
  deepRed: '#b70202',
  amber: '#f59e0b',
  darkAmber: '#d97706',
  deepAmber: '#92400e',
  brightAmber: '#fbbf24',
})
