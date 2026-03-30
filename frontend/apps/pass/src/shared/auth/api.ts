import type { IHttpClient } from '@ruftech/http-client'
import type { ILoginRequest } from '@ruftech/api'
import { TokenInfo, UserMe, MessageResponse } from '@ruftech/api'

export function login(client: IHttpClient, data: ILoginRequest) {
  return client.request('/v1/jwt/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
    parse: (d) => TokenInfo.parse(d),
  })
}

export function fetchMe(client: IHttpClient) {
  return client.request('/v1/jwt/me/', {
    method: 'GET',
    parse: (d) => UserMe.parse(d),
  })
}

export function logout(client: IHttpClient) {
  return client.request('/v1/jwt/logout/', {
    method: 'POST',
    parse: (d) => MessageResponse.parse(d),
  })
}
