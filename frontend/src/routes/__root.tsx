import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'

export const Route = createRootRoute({ component: RootLayout })

function RootLayout() {
  return (
    <div>
      <Outlet />
      {/* только в development режиме по умолчанию, см
        * https://tanstack.com/router/latest/docs/framework/react/devtools#import-the-devtools
        */}
      <TanStackRouterDevtools position="bottom-right" />
    </div>
  )
}
