/**
 * Параметры копирования текущего URL.
 *
 * @property onSuccess — вызывается после успешного копирования
 * @property onError — вызывается при ошибке копирования
 */
export interface CopyCurrentUrlOptions {
  onSuccess?: () => void
  onError?: (error: unknown) => void
}

/**
 * Копирует URL текущей страницы в буфер обмена.
 *
 * Использует `navigator.clipboard`, если доступен.
 * В противном случае — фолбэк через `execCommand('copy')`.
 *
 * @returns `true` при успешном копировании, `false` при ошибке.
 */
export const copyCurrentUrl = async (options: CopyCurrentUrlOptions = {}): Promise<boolean> => {
  const { onSuccess, onError } = options
  const url = window.location.href

  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(url)
    } else {
      const textarea = document.createElement('textarea')
      textarea.value = url
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
    }
    onSuccess?.()
    return true
  } catch (error) {
    onError?.(error)
    return false
  }
}
