/**
 * Параметры обработки клика за пределами элемента.
 *
 * @property root — CSS-селектор или ссылка на DOM-элемент
 * @property callback — вызывается при клике за пределами элемента
 */
export interface OnClickOutsideOptions {
  root: string | Element
  callback: () => void
}

/**
 * Подписывается на клики за пределами указанного элемента.
 * Возвращает функцию отписки для удаления слушателя.
 *
 * Если передан селектор — элемент ищется при каждом клике,
 * что позволяет корректно работать с динамическим DOM.
 */
export const onClickOutside = ({ root, callback }: OnClickOutsideOptions): (() => void) => {
  const resolve = typeof root === 'string'
    ? () => document.querySelector(root)
    : () => root

  const handler = (event: MouseEvent) => {
    const element = resolve()
    if (element && !element.contains(event.target as Node)) {
      callback()
    }
  }

  document.addEventListener('click', handler)

  return () => document.removeEventListener('click', handler)
}
