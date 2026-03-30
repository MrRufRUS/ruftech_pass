import { describe, it, expect } from 'vitest'
import {
  PasswordCreate,
  PasswordPublic,
  PasswordDetail,
  PasswordUpdate,
} from '../passwords'

describe('PasswordCreate', () => {
  it('parses with all fields', () => {
    const result = PasswordCreate.parse({
      service_name: 'GitHub',
      service_url: 'https://github.com',
      login: 'john',
      password: 'secret',
    })
    expect(result.service_name).toBe('GitHub')
    expect(result.service_url).toBe('https://github.com')
  })

  it('parses without optional service_url', () => {
    const result = PasswordCreate.parse({
      service_name: 'GitHub',
      login: 'john',
      password: 'secret',
    })
    expect(result.service_url).toBeUndefined()
  })

  it('accepts null service_url', () => {
    const result = PasswordCreate.parse({
      service_name: 'GitHub',
      service_url: null,
      login: 'john',
      password: 'secret',
    })
    expect(result.service_url).toBeNull()
  })

  it('rejects invalid url', () => {
    expect(() => PasswordCreate.parse({
      service_name: 'GitHub',
      service_url: 'not-a-url',
      login: 'john',
      password: 'secret',
    })).toThrow()
  })

  it('rejects missing required fields', () => {
    expect(() => PasswordCreate.parse({ service_name: 'GitHub' })).toThrow()
  })
})

describe('PasswordPublic', () => {
  it('parses list item', () => {
    const result = PasswordPublic.parse({ id: 1, service_name: 'GitHub' })
    expect(result.id).toBe(1)
  })

  it('rejects non-integer id', () => {
    expect(() => PasswordPublic.parse({ id: 1.5, service_name: 'GitHub' })).toThrow()
  })
})

describe('PasswordDetail', () => {
  it('parses full detail', () => {
    const result = PasswordDetail.parse({
      id: 1,
      service_name: 'GitHub',
      service_url: 'https://github.com',
      login: 'john',
      password_hash: '$2b$12$abc',
    })
    expect(result.password_hash).toBe('$2b$12$abc')
  })

  it('parses without service_url', () => {
    const result = PasswordDetail.parse({
      id: 1,
      service_name: 'GitHub',
      login: 'john',
      password_hash: '$2b$12$abc',
    })
    expect(result.service_url).toBeUndefined()
  })
})

describe('PasswordUpdate', () => {
  it('parses empty update', () => {
    const result = PasswordUpdate.parse({})
    expect(result.service_name).toBeUndefined()
  })

  it('parses partial update', () => {
    const result = PasswordUpdate.parse({ service_name: 'GitLab', password: 'new' })
    expect(result.service_name).toBe('GitLab')
    expect(result.login).toBeUndefined()
  })

  it('rejects invalid url in update', () => {
    expect(() => PasswordUpdate.parse({ service_url: 'bad' })).toThrow()
  })
})
