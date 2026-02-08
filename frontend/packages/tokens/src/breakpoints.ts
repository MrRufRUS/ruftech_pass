export const breakpoints = {
  mobile: '48rem',
  tablet: '48rem',
  desktop: '80rem',
  desktopLarge: '120rem',
} as const

export type Breakpoint = keyof typeof breakpoints

export const media = {
  mobile: `screen and (max-width: ${breakpoints.mobile})`,
  tablet: `screen and (min-width: ${breakpoints.tablet})`,
  desktop: `screen and (min-width: ${breakpoints.desktop})`,
  desktopLarge: `screen and (min-width: ${breakpoints.desktopLarge})`,
} as const
