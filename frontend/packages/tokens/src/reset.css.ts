import { globalStyle } from '@vanilla-extract/css'
import { vars } from './contract.css'

globalStyle(
  `body, h1, h2, h3, h4, h5, h6, p, span, div, hr, b, strong, em, small, big, mark, dfn, abbr, time, address, bdi, bdo, cite, del, ins, q, s, samp, sub, sup, var, i, code, video, audio, ul, ol, a, img, form, article, main, button, input, label, select, textarea, svg, path, g, defs, use, clipPath, mask, circle, rect, ellipse, line, polyline, polygon, text, table, tbody, tr, td, th, li, blockquote, iframe`,
  {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
  },
)

globalStyle('html', {
  font: vars.font.shorthand.regularText,
  color: vars.color.text,
})
