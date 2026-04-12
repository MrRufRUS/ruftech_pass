import type { IHttpClient } from '@ruftech/http-client'
import type { IPasswordCreate, IPasswordUpdate } from '@ruftech/api'
import { PasswordPublic, PasswordDetail } from '@ruftech/api'
import { z } from 'zod'

const API = '/v1/passwords'

export function listPasswords(client: IHttpClient) {
  return client.request(`${API}/`, {
    method: 'GET',
    parse: (d) => z.array(PasswordPublic).parse(d),
  })
}

export function createPassword(client: IHttpClient, data: IPasswordCreate) {
  return client.request(`${API}/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    parse: (d) => PasswordDetail.parse(d),
  })
}

export function getPassword(client: IHttpClient, id: number) {
  return client.request(`${API}/${id}`, {
    method: 'GET',
    parse: (d) => PasswordDetail.parse(d),
  })
}

export function updatePassword(client: IHttpClient, id: number, data: IPasswordUpdate) {
  return client.request(`${API}/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    parse: (d) => PasswordDetail.parse(d),
  })
}

export function deletePassword(client: IHttpClient, id: number) {
  return client.request(`${API}/${id}`, {
    method: 'DELETE',
    parse: (d) => z.object({ message: z.string() }).parse(d),
  })
}
