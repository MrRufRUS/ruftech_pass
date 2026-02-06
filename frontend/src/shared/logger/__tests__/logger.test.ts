import { describe, it, expect, vi } from 'vitest';
import { createLogger } from '../logger';

describe('createLogger', () => {
  it('delegates log calls to the handler', () => {
    const handler = vi.fn();
    const logger = createLogger(handler);

    logger.log('info', 'hello');
    logger.log('error', { code: 42 });

    expect(handler).toHaveBeenCalledTimes(2);
    expect(handler).toHaveBeenNthCalledWith(1, 'info', 'hello');
    expect(handler).toHaveBeenNthCalledWith(2, 'error', { code: 42 });
  });

  it('works with custom log levels', () => {
    const handler = vi.fn();
    const logger = createLogger<'trace' | 'fatal'>(handler);

    logger.log('trace', 'tracing');
    logger.log('fatal', 'crash');

    expect(handler).toHaveBeenNthCalledWith(1, 'trace', 'tracing');
    expect(handler).toHaveBeenNthCalledWith(2, 'fatal', 'crash');
  });
});
