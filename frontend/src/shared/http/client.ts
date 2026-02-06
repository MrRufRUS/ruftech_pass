/**
 * Опции HTTP-запроса.
 * Расширяет стандартный RequestInit функцией parse для типобезопасного
 * преобразования ответа.
 */
export interface IHttpOptions<T> extends RequestInit {
  parse: (data: unknown) => T;
}

/**
 * Голая функция запроса — то, что оборачивают плагины.
 */
export type IHttpFn = <T>(
  url: string | URL,
  options: IHttpOptions<T>,
) => Promise<T>;

/**
 * Низкоуровневая функция отправки запроса (совместима с Fetch API).
 * Подменяется для тестов или кастомных транспортов.
 */
export type IHttpFetch = (
  url: string | URL,
  init?: RequestInit,
) => Promise<Response>;

/**
 * Плагин — функция-обёртка, расширяющая поведение запроса.
 */
export type IHttpPlugin = (fn: IHttpFn) => IHttpFn;

/**
 * HTTP-клиент с поддержкой цепочки плагинов.
 *
 * @example
 * ```ts
 * const client = DefaultHttpClient
 *   .create(fetch)
 *   .applyPlugin(withBaseURL('https://api.example.com'))
 *   .applyPlugin(withLogging(log));
 * ```
 */
export interface IHttpClient {
  request<T>(url: string | URL, options: IHttpOptions<T>): Promise<T>;
  applyPlugin(plugin: IHttpPlugin): IHttpClient;
}

/**
 * Создаёт клиент из голой функции запроса.
 */
export function createHttpClient(fn: IHttpFn): IHttpClient {
  return {
    request: fn,
    applyPlugin(plugin) {
      return createHttpClient(plugin(fn));
    },
  };
}
