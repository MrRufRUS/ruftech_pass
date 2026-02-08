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
