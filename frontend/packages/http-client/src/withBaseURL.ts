import type { IHttpPlugin } from './client';

export function withBaseURL(baseURL: string): IHttpPlugin {
  const base = baseURL.endsWith('/') ? baseURL.slice(0, -1) : baseURL;

  return (fn) => (url, options) => {
    const path = String(url);
    const separator = path.startsWith('/') ? '' : '/';
    return fn(`${base}${separator}${path}`, options);
  };
}
