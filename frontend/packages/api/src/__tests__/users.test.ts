import { describe, it, expect } from 'vitest'
import {
  LoginRequest,
  SignupRequest,
  TokenInfo,
  UserMe,
  UserUpdate,
  MessageResponse,
} from '../users'

describe('LoginRequest', () => {
  it('parses valid login', () => {
    const result = LoginRequest.parse({ username: 'john', password: 'secret' })
    expect(result).toEqual({ username: 'john', password: 'secret' })
  })

  it('rejects missing username', () => {
    expect(() => LoginRequest.parse({ password: 'secret' })).toThrow()
  })

  it('rejects missing password', () => {
    expect(() => LoginRequest.parse({ username: 'john' })).toThrow()
  })
})

describe('SignupRequest', () => {
  it('parses with all fields', () => {
    const result = SignupRequest.parse({
      username: 'john',
      password: 'secret',
      email: 'john@example.com',
    })
    expect(result.email).toBe('john@example.com')
  })

  it('parses without optional email', () => {
    const result = SignupRequest.parse({ username: 'john', password: 'secret' })
    expect(result.email).toBeUndefined()
  })

  it('accepts null email', () => {
    const result = SignupRequest.parse({ username: 'john', password: 'secret', email: null })
    expect(result.email).toBeNull()
  })

  it('rejects invalid email', () => {
    expect(() => SignupRequest.parse({
      username: 'john',
      password: 'secret',
      email: 'not-an-email',
    })).toThrow()
  })
})

describe('TokenInfo', () => {
  it('parses valid token response', () => {
    const result = TokenInfo.parse({ access_token: 'abc123', token_type: 'Bearer' })
    expect(result.access_token).toBe('abc123')
    expect(result.token_type).toBe('Bearer')
  })
})

describe('UserMe', () => {
  it('parses full user', () => {
    const result = UserMe.parse({ id: 1, username: 'john', email: 'j@ex.com' })
    expect(result.id).toBe(1)
  })

  it('parses user without email', () => {
    const result = UserMe.parse({ id: 1, username: 'john' })
    expect(result.email).toBeUndefined()
  })

  it('accepts null email', () => {
    const result = UserMe.parse({ id: 1, username: 'john', email: null })
    expect(result.email).toBeNull()
  })

  it('rejects non-integer id', () => {
    expect(() => UserMe.parse({ id: 1.5, username: 'john' })).toThrow()
  })
})

describe('UserUpdate', () => {
  it('parses empty update', () => {
    const result = UserUpdate.parse({})
    expect(result.email).toBeUndefined()
    expect(result.password).toBeUndefined()
  })

  it('parses partial update', () => {
    const result = UserUpdate.parse({ email: 'new@ex.com' })
    expect(result.email).toBe('new@ex.com')
  })

  it('rejects invalid email', () => {
    expect(() => UserUpdate.parse({ email: 'bad' })).toThrow()
  })
})

describe('MessageResponse', () => {
  it('parses message', () => {
    const result = MessageResponse.parse({ message: 'User created' })
    expect(result.message).toBe('User created')
  })
})
