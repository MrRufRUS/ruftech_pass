export interface IHttpOptions<T> extends RequestInit {
  parse: (data: unknown) => T;
}

export type IHttpFn = <T>(
  url: string | URL,
  options: IHttpOptions<T>,
) => Promise<T>;

export type IHttpFetch = (
  url: string | URL,
  init?: RequestInit,
) => Promise<Response>;

export type IHttpPlugin = (fn: IHttpFn) => IHttpFn;

export interface IHttpClient {
  request<T>(url: string | URL, options: IHttpOptions<T>): Promise<T>;
  applyPlugin(plugin: IHttpPlugin): IHttpClient;
}

export function createHttpClient(fn: IHttpFn): IHttpClient {
  return {
    request: fn,
    applyPlugin(plugin) {
      return createHttpClient(plugin(fn));
    },
  };
}
