import type { IHttpPlugin } from './client'

export interface IHttpLogInfo {
  url: string
  method: string
  duration: number
  error?: unknown
}

export type IHttpLogger = (info: IHttpLogInfo) => void

export type IHttpLogSanitizer = (info: IHttpLogInfo) => IHttpLogInfo

export interface IWithLoggingOptions {
  log: IHttpLogger
  sanitize?: IHttpLogSanitizer
}

const SENSITIVE_KEYS = /token|key|secret|password|auth|session|credential/i

function sanitizeURL(raw: string | URL): string {
  try {
    const url = new URL(String(raw))

    for (const key of [...url.searchParams.keys()]) {
      if (SENSITIVE_KEYS.test(key)) {
        url.searchParams.set(key, '***')
      }
    }

    return url.toString()
  } catch {
    return String(raw)
  }
}

function defaultSanitize(info: IHttpLogInfo): IHttpLogInfo {
  return {
    ...info,
    url: sanitizeURL(info.url),
    error: info.error instanceof Error ? info.error.message : info.error,
  }
}

export function withLogging(options: IHttpLogger | IWithLoggingOptions): IHttpPlugin {
  const log = typeof options === 'function' ? options : options.log
  const sanitize = typeof options === 'function' ? defaultSanitize : (options.sanitize ?? defaultSanitize)

  return (fn) => async (url, requestOptions) => {
    const method = requestOptions.method ?? 'GET'
    const start = performance.now()

    try {
      const result = await fn(url, requestOptions)
      log(sanitize({ url: String(url), method, duration: performance.now() - start }))
      return result
    } catch (error) {
      log(sanitize({ url: String(url), method, duration: performance.now() - start, error }))
      throw error
    }
  }
}
