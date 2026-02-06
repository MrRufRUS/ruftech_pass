import { describe, it, expect, vi } from 'vitest';
import { createElement } from 'react';
import { renderToString } from 'react-dom/server';
import { LoggerProvider, useLogger } from '../provider';
import type { ILogger } from '../logger';

describe('useLogger', () => {
  it('returns the logger from provider', () => {
    const logger: ILogger = { log: vi.fn() };
    let captured: ILogger | null = null;

    function Consumer() {
      captured = useLogger();
      return null;
    }

    renderToString(
      createElement(LoggerProvider, { logger }, createElement(Consumer)),
    );

    expect(captured).toBe(logger);
  });

  it('throws when used outside provider', () => {
    function Consumer() {
      useLogger();
      return null;
    }

    expect(() => renderToString(createElement(Consumer))).toThrow(
      'useLogger must be used within LoggerProvider',
    );
  });
});
