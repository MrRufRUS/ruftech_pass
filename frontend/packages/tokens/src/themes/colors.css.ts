import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'
import { vars } from '../contract.css'

const p = vars.palette

const light = {
  text: p.greyBlack,
  textMuted: p.greyBorder,
  background: p.light,
  backgroundTransparent: 'transparent',
  surface: p.white,
  border: p.greyBorder,
  primary: p.blue,
  primaryHover: p.darkBlue,
  primaryPressed: p.deepBlue,
  success: p.green,
  successHover: p.darkGreen,
  successPressed: p.deepGreen,
  error: p.red,
  errorHover: p.darkRed,
  errorPressed: p.deepRed,
  warning: p.amber,
  warningHover: p.darkAmber,
  warningPressed: p.deepAmber,
  borderSubtle: 'rgba(51,51,51,0.3)',
  surfaceSubtle: 'rgba(51,51,51,0.1)',
  logoBg: p.greyBlack,
  backgroundDark: p.black,
} as const

const dark = {
  text: p.white,
  textMuted: p.whiteSub,
  background: p.greyBlack,
  backgroundTransparent: 'transparent',
  surface: p.greySurface,
  border: p.lightBorder,
  primary: p.softBlue,
  primaryHover: p.blue,
  primaryPressed: p.darkBlue,
  success: p.green,
  successHover: p.darkGreen,
  successPressed: p.deepGreen,
  error: p.red,
  errorHover: p.darkRed,
  errorPressed: p.deepRed,
  warning: p.brightAmber,
  warningHover: p.amber,
  warningPressed: p.darkAmber,
  borderSubtle: 'rgba(255,255,255,0.3)',
  surfaceSubtle: 'rgba(255,255,255,0.1)',
  logoBg: p.darkBlue,
  backgroundDark: p.white,
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
