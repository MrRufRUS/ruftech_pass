import type { IHttpPlugin } from './client'
import { HttpError } from './default'

/** Вызывает onUnauthorized при получении 401, затем пробрасывает ошибку дальше. */
export function withUnauthorizedHandler(onUnauthorized: () => void): IHttpPlugin {
  return (fn) => async (url, options) => {
    try {
      return await fn(url, options)
    } catch (err) {
      if (err instanceof HttpError && err.status === 401) {
        onUnauthorized()
      }
      throw err
    }
  }
}
