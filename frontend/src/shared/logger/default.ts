import type { ILogger, ILogLevel } from './logger';
import { createLogger } from './logger';

/**
 * Реализация логгера на основе `console`.
 * Маппит уровни напрямую на `console.debug / .info / .warn / .error`.
 */
export const DefaultLogger = {
  create(): ILogger<ILogLevel> {
    return createLogger((level, payload) => {
      console[level](payload);
    });
  },
};
