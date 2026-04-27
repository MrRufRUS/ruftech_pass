import { DefaultHttpClient, withBaseURL, withCredentials, withLogging, withUnauthorizedHandler } from '@ruftech/http-client'
import { DefaultLogger } from '@ruftech/logger'

export const logger = DefaultLogger.create()

/** Callback вызывается при 401. Устанавливается в RootLayout через setUnauthorizedHandler. */
let _unauthorizedHandler: (() => void) | null = null

export function setUnauthorizedHandler(handler: () => void): void {
  _unauthorizedHandler = handler
}

export const httpClient = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withBaseURL('/api'))
  .applyPlugin(withCredentials())
  .applyPlugin(withLogging((info) => logger.log(info.error ? 'error' : 'info', info)))
  .applyPlugin(withUnauthorizedHandler(() => _unauthorizedHandler?.()))
