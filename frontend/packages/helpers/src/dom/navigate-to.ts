/**
 * Параметры навигации.
 *
 * @property url — адрес для перехода
 * @property target — `'_blank'` для новой вкладки, `'_self'` по умолчанию
 */
export interface NavigateToOptions {
  url: string
  target?: '_self' | '_blank'
}

/**
 * Выполняет навигацию по указанному адресу.
 *
 * `_self` — через `window.location.assign`.
 * `_blank` — через `window.open` с `noopener,noreferrer`.
 */
export const navigateTo = ({ url, target = '_self' }: NavigateToOptions): void => {
  if (target === '_blank') {
    window.open(url, target, 'noopener,noreferrer')
  } else {
    window.location.assign(url)
  }
}
