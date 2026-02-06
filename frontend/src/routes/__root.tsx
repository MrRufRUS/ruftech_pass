import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  DefaultHttpClient,
  HttpClientProvider,
  withLogging,
} from '../shared/http'
import { DefaultLogger, LoggerProvider } from '../shared/logger'

// #можемПодменить
const logger = DefaultLogger.create()
const httpClient = DefaultHttpClient
  .create(globalThis.fetch.bind(globalThis))
  .applyPlugin(withLogging((info) => logger.log(info.error ? 'error' : 'info', info)))

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <LoggerProvider logger={logger}>
      <HttpClientProvider client={httpClient}>
        <Outlet />
        {/* только в development режиме по умолчанию, см
          * https://tanstack.com/router/latest/docs/framework/react/devtools#import-the-devtools
          */}
        <TanStackRouterDevtools position="bottom-right" />
      </HttpClientProvider>
    </LoggerProvider>
  )
}
