import type { ReactElement, ReactNode } from 'react'
import type { RenderOptions, RenderResult } from '@testing-library/react'
import type { IHttpClient } from '@ruftech/http-client'
import { render } from '@testing-library/react'
import { vi } from 'vitest'
import { HttpClientProvider } from '@ruftech/http-client/react'
import { I18nProvider, DefaultI18n } from '@/shared/i18n'

const defaultI18n = DefaultI18n.create('ru')

export type MockClient = IHttpClient & { request: ReturnType<typeof vi.fn> }

export function createMockClient(overrides?: Partial<IHttpClient>): MockClient {
  return {
    request: vi.fn().mockResolvedValue({}),
    applyPlugin: vi.fn(),
    ...overrides,
  } as MockClient
}

export interface TestRenderOptions extends Omit<RenderOptions, 'wrapper'> {
  client?: MockClient
}

export function renderWithProviders(
  ui: ReactElement,
  { client, ...options }: TestRenderOptions = {},
): RenderResult & { client: MockClient } {
  const mockClient = client ?? createMockClient()

  function Wrapper({ children }: { children: ReactNode }) {
    return (
      <HttpClientProvider client={mockClient}>
        <I18nProvider locale="ru" i18n={defaultI18n}>
          {children}
        </I18nProvider>
      </HttpClientProvider>
    )
  }

  return {
    ...render(ui, { wrapper: Wrapper, ...options }),
    client: mockClient,
  }
}
