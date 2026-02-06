import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { HttpClientProvider, useHttpClient } from '../provider';
import type { IHttpClient } from '../client';

describe('useHttpClient', () => {
  it('returns the client from provider', () => {
    const client: IHttpClient = {
      request: vi.fn(),
      applyPlugin: vi.fn().mockReturnThis(),
    };
    let captured: IHttpClient | null = null;

    function Consumer() {
      captured = useHttpClient();
      return null;
    }

    renderToString(
      createElement(HttpClientProvider, { client }, createElement(Consumer)),
    );

    expect(captured).toBe(client);
  });

  it('throws when used outside provider', () => {
    function Consumer() {
      useHttpClient();
      return null;
    }

    expect(() => renderToString(createElement(Consumer))).toThrow(
      'useHttpClient must be used within HttpClientProvider',
    );
  });
});
