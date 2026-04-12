import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'
import { vars } from '../contract.css'

const p = vars.palette

const light = {
  text: p.greyBlack,
  textMuted: '#666666', // solid mid-gray: ~5.7:1 on white, ~4.9:1 on #f1f1f1
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
  textMuted: '#8b93a7',
  background: p.deepSpace,
  backgroundTransparent: 'transparent',
  surface: p.spaceElevated,
  border: 'rgba(255,255,255,0.07)',
  primary: p.indigo,
  primaryHover: p.indigoDark,
  primaryPressed: p.indigoDeep,
  success: p.emerald,
  successHover: p.darkGreen,
  successPressed: p.deepGreen,
  error: p.red,
  errorHover: p.darkRed,
  errorPressed: p.deepRed,
  warning: p.brightAmber,
  warningHover: p.amber,
  warningPressed: p.darkAmber,
  borderSubtle: 'rgba(129,140,248,0.15)',
  surfaceSubtle: 'rgba(129,140,248,0.1)',
  logoBg: p.indigoDark,
  backgroundDark: p.spaceMid,
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
