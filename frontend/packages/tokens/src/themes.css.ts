import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'
import { vars } from './contract.css'

createGlobalTheme(':root', vars.palette, {
  greyBlack: '#333333',
  greySelection: '#3333331a',
  greyBorder: '#33333399',
  black: '#0b0400',
  light: '#f1f1f1',
  lightBorder: '#f1f1f199',
  white: 'white',
  whiteSub: '#ffffff80',
  blue: '#566ae4',
  darkBlue: '#3845cf',
  lightBlue: '#babde7',
})

createGlobalTheme(':root', vars.font, {
  size: {
    h1: '1.75rem',
    h2: '1.5rem',
    h3: '1.25rem',
    regularText: '1.125rem',
    descriptor: '1.25rem',
    smallerText: '1rem',
    altSmallerText: '0.875rem',
    pagination: '0.875rem',
    uiCaps: '0.75rem',
    uiMini: '0.75rem',
    uiRegular: '0.875rem',
    uiMedium: '0.875rem',
  },
  shorthand: {
    h1: 'normal 700 1.75rem / 1.08 "JetBrains Mono"',
    h2: 'normal 600 1.5rem / 1.14 "JetBrains Mono"',
    h3: 'normal 600 1.25rem / 1.4 "JetBrains Mono"',
    regularText: 'normal 400 1.125rem / 1.54 "JetBrains Mono"',
    pagination: 'normal 600 1.25rem / 1.4 "JetBrains Mono"',
    descriptor: 'normal 600 1.25rem / 1.55 "JetBrains Mono"',
    smallerText: 'normal 400 1rem / 1.55 "JetBrains Mono"',
    altSmallerText: 'normal 500 0.875rem / 1 "Inter"',
    uiCaps: 'normal 400 0.75rem / 1.55 "JetBrains Mono"',
    uiMini: 'normal 100 0.75rem / 1.55 "JetBrains Mono"',
    uiRegular: 'normal 400 0.875rem / 1.55 "JetBrains Mono"',
    uiMedium: 'normal 500 0.875rem / 1 "Inter"',
  },
  letterSpacing: {
    heading: '-5%',
    pagination: '-5%',
    smallerText: '-3%',
    altSmallerText: '-2.5%',
    uiCaps: '-2.5%',
    uiMedium: '-2.5%',
    uiRegular: '-3%',
    uiMini: '-3.5%',
  },
})

const light = {
  text: '#333333',
  textMuted: '#33333399',
  background: '#f1f1f1',
  backgroundTransparent: 'transparent',
  surface: 'white',
  border: '#f1f1f199',
  primary: '#566ae4',
  primaryHover: '#3845cf',
  primaryMuted: '#babde7',
  success: '#22c55e',
  error: '#ef4444',
  warning: '#f59e0b',
} as const

const dark = {
  text: 'white',
  textMuted: '#ffffff80',
  background: '#333333',
  backgroundTransparent: 'transparent',
  surface: '#3d3d3d',
  border: '#33333399',
  primary: '#7b8ff0',
  primaryHover: '#566ae4',
  primaryMuted: '#2e3570',
  success: '#4ade80',
  error: '#f87171',
  warning: '#fbbf24',
} as const

type ColorKey = keyof typeof vars.color
const colorVars = (values: Record<ColorKey, string>) =>
  Object.fromEntries(
    (Object.keys(values) as ColorKey[]).map((k) => [vars.color[k], values[k]]),
  ) as Record<string, string>

createGlobalTheme(':root', vars.color, light)

globalStyle(':root', {
  '@media': {
    '(prefers-color-scheme: dark)': {
      vars: colorVars(dark),
    },
  },
})

globalStyle(':root[data-theme="dark"]', { vars: colorVars(dark) })
globalStyle(':root[data-theme="light"]', { vars: colorVars(light) })
