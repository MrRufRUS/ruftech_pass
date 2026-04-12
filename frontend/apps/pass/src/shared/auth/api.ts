import type { IHttpClient } from '@ruftech/http-client'
import type { ILoginRequest, ISignupRequest, IUserUpdate } from '@ruftech/api'
import { TokenInfo, UserMe, MessageResponse } from '@ruftech/api'

export function login(client: IHttpClient, data: ILoginRequest) {
  return client.request('/v1/jwt/login/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams(data),
    parse: (d) => TokenInfo.parse(d),
  })
}

export function signup(client: IHttpClient, data: ISignupRequest) {
  const body = new URLSearchParams({ username: data.username, password: data.password })
  if (data.email) body.append('email', data.email)
  return client.request('/v1/jwt/signup/', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body,
    parse: (d) => MessageResponse.parse(d),
  })
}

export function fetchMe(client: IHttpClient) {
  return client.request('/v1/jwt/me/', {
    method: 'GET',
    parse: (d) => UserMe.parse(d),
  })
}

export function updateMe(client: IHttpClient, data: IUserUpdate) {
  return client.request('/v1/jwt/me/', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    parse: (d) => UserMe.parse(d),
  })
}

export function logout(client: IHttpClient) {
  return client.request('/v1/jwt/logout/', {
    method: 'POST',
    parse: (d) => MessageResponse.parse(d),
  })
}

export function deleteAccount(client: IHttpClient) {
  return client.request('/v1/jwt/delete/', {
    method: 'DELETE',
    parse: (d) => MessageResponse.parse(d),
  })
}
