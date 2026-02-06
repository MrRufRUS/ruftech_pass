import type { IHttpPlugin } from './client';

export interface IHttpLogInfo {
  url: string | URL;
  method: string;
  duration: number;
  error?: unknown;
}

/**
 * Функция логирования, принимаемая через DI.
 */
export type IHttpLogger = (info: IHttpLogInfo) => void;

/**
 * Плагин логирования запросов.
 * Принимает функцию логирования и передаёт в неё объект с информацией
 * о каждом запросе: URL, метод, длительность, ошибка (если была).
 *
 * @example
 * ```ts
 * const client = applyPlugins(base, [withLogging(console.log)]);
 * ```
 */
export function withLogging(log: IHttpLogger): IHttpPlugin {
  return (client) => async (url, options) => {
    const method = options.method ?? 'GET';
    const start = performance.now();

    try {
      const result = await client(url, options);
      log({ url, method, duration: performance.now() - start });
      return result;
    } catch (error) {
      log({ url, method, duration: performance.now() - start, error });
      throw error;
    }
  };
}
