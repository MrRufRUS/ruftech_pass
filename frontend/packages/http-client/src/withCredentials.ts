import type { IHttpPlugin } from './client'

export function withCredentials(): IHttpPlugin {
  return (fn) => (url, options) =>
    fn(url, { ...options, credentials: 'include' })
}
