import { describe, it, expect, vi } from 'vitest';
import { withBaseURL } from '../withBaseURL';
import type { IHttpFn } from '../client';

describe('withBaseURL', () => {
  const inner: IHttpFn = vi.fn().mockResolvedValue('ok');

  function apply(base: string, path: string) {
    const wrapped = withBaseURL(base)(inner);
    wrapped(path, { parse: (d) => d });
    return (inner as ReturnType<typeof vi.fn>).mock.calls.at(-1)![0];
  }

  it('prepends base URL to relative path', () => {
    expect(apply('https://api.example.com', '/users')).toBe('https://api.example.com/users');
  });

  it('adds separator when path has no leading slash', () => {
    expect(apply('https://api.example.com', 'users')).toBe('https://api.example.com/users');
  });

  it('strips trailing slash from base URL', () => {
    expect(apply('https://api.example.com/', '/users')).toBe('https://api.example.com/users');
  });

  it('handles base with path segments', () => {
    expect(apply('https://api.example.com/v1', 'items')).toBe('https://api.example.com/v1/items');
  });
});
