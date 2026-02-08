import { createGlobalTheme, globalStyle } from '@vanilla-extract/css'
import { media } from '../breakpoints'
import { vars } from '../contract.css'
import { fontFamily as ff, fontWeight as fw } from '../fonts'

const sz = vars.font.size

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
    h1: `normal ${fw.mono.bold} ${sz.h1} / 1.08 ${ff.mono}`,
    h2: `normal ${fw.mono.semiBold} ${sz.h2} / 1.14 ${ff.mono}`,
    h3: `normal ${fw.mono.semiBold} ${sz.h3} / 1.4 ${ff.mono}`,
    regularText: `normal ${fw.mono.regular} ${sz.regularText} / 1.54 ${ff.mono}`,
    pagination: `normal ${fw.mono.semiBold} ${sz.pagination} / 1.4 ${ff.mono}`,
    descriptor: `normal ${fw.mono.semiBold} ${sz.descriptor} / 1.55 ${ff.mono}`,
    smallerText: `normal ${fw.mono.regular} ${sz.smallerText} / 1.55 ${ff.mono}`,
    altSmallerText: `normal ${fw.sans.medium} ${sz.altSmallerText} / 1 ${ff.sans}`,
    uiCaps: `normal ${fw.mono.regular} ${sz.uiCaps} / 1.55 ${ff.mono}`,
    uiMini: `normal ${fw.mono.regular} ${sz.uiMini} / 1.55 ${ff.mono}`,
    uiRegular: `normal ${fw.mono.regular} ${sz.uiRegular} / 1.55 ${ff.mono}`,
    uiMedium: `normal ${fw.sans.medium} ${sz.uiMedium} / 1 ${ff.sans}`,
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

// Используем vars.fonts.shortand и не думаем об адаптиве
globalStyle(':root', {
  '@media': {
    [media.desktop]: {
      vars: {
        [sz.h1]: '2.125rem',
        [sz.h2]: '1.875rem',
        [sz.h3]: '1.5rem',
        [sz.altSmallerText]: '1rem',
        [sz.pagination]: '1rem',
      },
    },
    [media.desktopLarge]: {
      vars: {
        [sz.h1]: '2.375rem',
        [sz.h2]: '2rem',
        [sz.h3]: '1.75rem',
        [sz.regularText]: '1.25rem',
        [sz.descriptor]: '1.375rem',
        [sz.smallerText]: '1.125rem',
        [sz.altSmallerText]: '1.125rem',
        [sz.pagination]: '0.875rem',
        [sz.uiCaps]: '1rem',
        [sz.uiRegular]: '1rem',
      },
    },
  },
})
