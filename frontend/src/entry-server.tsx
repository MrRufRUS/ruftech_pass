import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import {
  RouterProvider,
  createRouter,
  createMemoryHistory,
} from '@tanstack/react-router'

import { routeTree } from './routeTree.gen'
import { resources } from './shared/i18n/resources'
import type { ILocale } from './shared/i18n/i18n'
import { DEFAULT_LOCALE } from './shared/i18n/i18n'

export async function render(url: string): Promise<string> {
  const router = createRouter({
    routeTree,
    history: createMemoryHistory({ initialEntries: [url] }),
  })

  await router.load()

  return renderToString(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
}

export function getMeta(
  locale: ILocale,
  pageKey: string,
): { title: string; description: string } {
  const meta = resources[locale]?.meta as Record<
    string,
    { title: string; description: string }
  >
  return (
    meta[pageKey] ?? {
      title: resources[DEFAULT_LOCALE].meta.home.title,
      description: resources[DEFAULT_LOCALE].meta.home.description,
    }
  )
}
