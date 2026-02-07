import type { ILogger, ILogLevel } from './logger';
import { createLogger } from './logger';

export const DefaultLogger = {
  create(): ILogger<ILogLevel> {
    return createLogger((level, payload) => {
      console[level](payload);
    });
  },
};
