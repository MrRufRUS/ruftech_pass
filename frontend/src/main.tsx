import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createRouter } from '@tanstack/react-router'

import './index.css'

import { routeTree } from './routeTree.gen'
import { detectLocale } from '@/shared/i18n'

const router = createRouter({ routeTree })

// Устанавливаем lang до рендера для корректной гидрации SSG
document.documentElement.lang = detectLocale(window.location.pathname)

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
