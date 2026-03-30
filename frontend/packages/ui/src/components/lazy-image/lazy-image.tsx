import type { IBaseProps } from '../../types'
import type { ComponentPropsWithRef, FC } from 'react'
import clsx from 'clsx'

export type LazyImageProps = IBaseProps & ComponentPropsWithRef<'img'> & {
  src: string
  alt: string
}

export const LazyImage: FC<LazyImageProps> = ({ className, style, src, alt, ref, ...props }) => (
  <img ref={ref} className={clsx(className)} style={style} src={src} alt={alt} loading="lazy" {...props} />
)
