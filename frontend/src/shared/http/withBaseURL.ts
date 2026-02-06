import type { IHttpPlugin } from './client';

/**
 * Плагин, добавляющий базовый URL ко всем запросам.
 *
 * @example
 * ```ts
 * const client = DefaultHttpClient
 *   .create(fetch)
 *   .applyPlugin(withBaseURL('https://api.example.com/v1'));
 *
 * // client.request('users') → fetch('https://api.example.com/v1/users')
 * ```
 */
export function withBaseURL(baseURL: string): IHttpPlugin {
  const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

  return (fn) => (url, options) => {
    const path = String(url);
    const separator = path.startsWith('/') ? '' : '/';
    return fn(`${base}${separator}${path}`, options);
  };
}
