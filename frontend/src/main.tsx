import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './index.css'

import { routeTree } from './routeTree.gen'
const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

const rootElement = document.getElementById('root')!

if (rootElement.hasAttribute('data-server-rendered')) {
  // SSG page — hydrate pre-rendered HTML
  rootElement.removeAttribute('data-server-rendered')
  ReactDOM.hydrateRoot(
    rootElement,
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
} else {
  // SPA page — render from scratch
  const root = ReactDOM.createRoot(rootElement)
  root.render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}
