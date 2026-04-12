import { describe, it, expect } from 'vitest'
import { ApiError, ValidationError, ValidationErrorItem } from '../errors'

describe('ApiError', () => {
  it('parses valid error with string detail', () => {
    expect(ApiError.parse({ detail: 'Not found' })).toEqual({ detail: 'Not found' })
  })

  it('parses safeParse successfully for valid data', () => {
    const result = ApiError.safeParse({ detail: 'Forbidden' })
    expect(result.success).toBe(true)
    if (result.success) expect(result.data.detail).toBe('Forbidden')
  })

  it('fails safeParse when detail missing', () => {
    expect(ApiError.safeParse({}).success).toBe(false)
  })

  it('fails safeParse when detail is not a string', () => {
    expect(ApiError.safeParse({ detail: 123 }).success).toBe(false)
  })

  it('fails safeParse on empty object', () => {
    expect(ApiError.safeParse(null).success).toBe(false)
  })
})

describe('ValidationErrorItem', () => {
  it('parses valid item with string loc', () => {
    const item = { loc: ['body', 'email'], msg: 'invalid email', type: 'value_error.email' }
    expect(ValidationErrorItem.parse(item)).toEqual(item)
  })

  it('parses item with numeric loc elements', () => {
    const item = { loc: [0, 'field'], msg: 'required', type: 'missing' }
    expect(ValidationErrorItem.parse(item)).toEqual(item)
  })

  it('parses item with mixed loc types', () => {
    const item = { loc: ['body', 0, 'name'], msg: 'too short', type: 'string_too_short' }
    expect(ValidationErrorItem.parse(item)).toEqual(item)
  })

  it('fails when msg is missing', () => {
    expect(ValidationErrorItem.safeParse({ loc: ['field'], type: 'err' }).success).toBe(false)
  })

  it('fails when type is missing', () => {
    expect(ValidationErrorItem.safeParse({ loc: ['field'], msg: 'err' }).success).toBe(false)
  })
})

describe('ValidationError', () => {
  it('parses valid validation error with items', () => {
    const data = {
      detail: [
        { loc: ['body', 'email'], msg: 'invalid email', type: 'value_error.email' },
        { loc: ['body', 'username'], msg: 'required', type: 'missing' },
      ],
    }
    expect(ValidationError.parse(data)).toEqual(data)
  })

  it('parses with empty detail array', () => {
    expect(ValidationError.parse({ detail: [] })).toEqual({ detail: [] })
  })

  it('fails when detail is a string instead of array', () => {
    expect(ValidationError.safeParse({ detail: 'error string' }).success).toBe(false)
  })

  it('fails when detail is missing', () => {
    expect(ValidationError.safeParse({}).success).toBe(false)
  })
})
