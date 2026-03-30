import { DefaultHttpClient, withCredentials, withLogging } from '@ruftech/http-client'
import { DefaultLogger } from '@ruftech/logger'

export const logger = DefaultLogger.create()
export const httpClient = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withCredentials())
  .applyPlugin(withLogging((info) => logger.log(info.error ? 'error' : 'info', info)))
