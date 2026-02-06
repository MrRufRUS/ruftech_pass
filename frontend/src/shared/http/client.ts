/**
 * Опции HTTP-запроса.
 * Расширяет стандартный RequestInit функцией parse для типобезопасного
 * преобразования ответа.
 */
export interface IHttpOptions<T> extends RequestInit {
  parse: (data: unknown) => T;
}

/**
 * HTTP-клиент — функция, выполняющая запрос и возвращающая
 * распарсенный результат.
 */
export type IHttpClient = <T>(
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
 * Плагин — функция-обёртка, расширяющая поведение клиента.
 */
export type IHttpPlugin = (client: IHttpClient) => IHttpClient;

/**
 * Последовательно применяет плагины к клиенту.
 * Плагины оборачивают клиент слева направо: первый плагин — внешний слой.
 */
export function applyPlugins(
  client: IHttpClient,
  plugins: readonly IHttpPlugin[],
): IHttpClient {
  return plugins.reduce<IHttpClient>((c, plugin) => plugin(c), client);
}
