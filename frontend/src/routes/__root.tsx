import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import {
  DefaultHttpClient,
  HttpClientProvider,
} from '../shared/http'

// #можемПодменить
const httpClient = DefaultHttpClient.create(globalThis.fetch.bind(globalThis))

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <HttpClientProvider client={httpClient}>
      <Outlet />
      {/* только в development режиме по умолчанию, см
        * https://tanstack.com/router/latest/docs/framework/react/devtools#import-the-devtools
        */}
      <TanStackRouterDevtools position="bottom-right" />
    </HttpClientProvider>
  )
}
