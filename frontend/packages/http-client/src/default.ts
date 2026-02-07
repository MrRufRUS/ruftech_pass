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
