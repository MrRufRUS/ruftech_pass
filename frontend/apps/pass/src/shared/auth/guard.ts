import type { IHttpClient } from '@ruftech/http-client'
import type { IUserMe } from '@ruftech/api'
import { fetchMe } from './api'

/** Проверка аутентификации. В dev-режиме пропускает проверку. */
export async function checkAuth(client: IHttpClient): Promise<IUserMe | null> {
  if (import.meta.env.DEV) return null
  try {
    return await fetchMe(client)
  } catch {
    return null
  }
}
