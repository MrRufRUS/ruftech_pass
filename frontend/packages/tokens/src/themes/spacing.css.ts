import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'
import { media } from '../breakpoints'
import { vars } from '../contract.css'

const scale = {
  xs: '4px',
  s: '8px',
  m: '12px',
  l: '16px',
  xl: '24px',
}

createGlobalTheme(':root', vars.padding, scale)
createGlobalTheme(':root', vars.spacing, scale)

const pd = vars.padding
const sp = vars.spacing

globalStyle(':root', {
  '@media': {
    [media.desktop]: {
      vars: {
        [pd.m]: '16px',
        [pd.l]: '24px',
        [pd.xl]: '32px',
        [sp.m]: '16px',
        [sp.l]: '24px',
        [sp.xl]: '32px',
      },
    },
    [media.desktopLarge]: {
      vars: {
        [pd.xl]: '40px',
        [sp.xl]: '40px',
      },
    },
  },
})
