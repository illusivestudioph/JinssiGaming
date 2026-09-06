import { describe, expect, it } from 'vitest';
import { getSupabaseConfig } from './env';

const url = 'https://example.supabase.co';
const key = 'sb_publishable_test';
const jwt = (role: string) => `header.${btoa(JSON.stringify({ role }))}.signature`;

describe('Supabase environment', () => {
  it('allows an unconfigured read-only preview', () => expect(getSupabaseConfig({})).toBeNull());
  it('accepts public keys and trims configuration', () =>
    expect(
      getSupabaseConfig({
        VITE_SUPABASE_URL: ` ${url}/ `,
        VITE_SUPABASE_PUBLISHABLE_KEY: ` ${key} `,
      }),
    ).toEqual({ url, key }));
  it('accepts legacy anon JWTs', () =>
    expect(
      getSupabaseConfig({ VITE_SUPABASE_URL: url, VITE_SUPABASE_ANON_KEY: jwt('anon') })?.key,
    ).toBe(jwt('anon')));
  it.each(['sb_secret_privileged', jwt('service_role'), jwt('authenticated'), 'invalid'])(
    'rejects a privileged or malformed key: %s',
    (value) => {
      expect(() =>
        getSupabaseConfig({ VITE_SUPABASE_URL: url, VITE_SUPABASE_PUBLISHABLE_KEY: value }),
      ).toThrow();
    },
  );
  it('rejects privileged fallback keys even when the selected key is safe', () => {
    expect(() =>
      getSupabaseConfig({
        VITE_SUPABASE_URL: url,
        VITE_SUPABASE_PUBLISHABLE_KEY: key,
        VITE_SUPABASE_ANON_KEY: jwt('service_role'),
      }),
    ).toThrow();
  });
  it.each([
    'http://example.supabase.co',
    'https://example.supabase.co/rest/v1',
    'https://name:secret@example.supabase.co',
    'https://example.supabase.co?key=secret',
    'not-a-url',
  ])('rejects an unsafe project URL: %s', (value) => {
    expect(() =>
      getSupabaseConfig({ VITE_SUPABASE_URL: value, VITE_SUPABASE_PUBLISHABLE_KEY: key }),
    ).toThrow();
  });
  it('supports a local Supabase stack', () =>
    expect(
      getSupabaseConfig({
        VITE_SUPABASE_URL: 'http://127.0.0.1:54321',
        VITE_SUPABASE_PUBLISHABLE_KEY: key,
      })?.url,
    ).toBe('http://127.0.0.1:54321'));
  it('does not silently ignore half-configured projects', () =>
    expect(() => getSupabaseConfig({ VITE_SUPABASE_URL: url })).toThrow('Set both'));
});
