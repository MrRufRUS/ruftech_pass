import type { IHttpClient, IHttpFetch } from './client';
import { createHttpClient } from './client';

export class HttpError extends Error {
  readonly status: number;
  readonly response: Response;

  constructor(response: Response) {
    super(`HTTP ${response.status} ${response.statusText}`);
    this.name = 'HttpError';
    this.status = response.status;
    this.response = response;
  }
}

/**
 * Реализация HTTP-клиента на основе Fetch API.
 *
 * @example
 * ```ts
 * const client = DefaultHttpClient
 *   .create(globalThis.fetch.bind(globalThis))
 *   .applyPlugin(withLogging(log));
 *
 * const user = await client.request('/api/user/1', { parse: parseUser });
 * ```
 */
export const DefaultHttpClient = {
  create(fetch: IHttpFetch): IHttpClient {
    return createHttpClient(async (url, { parse, ...init }) => {
      const response = await fetch(url, init);

      if (!response.ok) {
        throw new HttpError(response);
      }

      const data: unknown = await response.json();
      return parse(data);
    });
  },
};
