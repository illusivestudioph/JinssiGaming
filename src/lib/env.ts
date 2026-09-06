interface SupabaseEnvironment {
  VITE_SUPABASE_URL?: string;
  VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  VITE_SUPABASE_ANON_KEY?: string;
}

function validatePublicKey(key: string) {
  if (key.startsWith('sb_secret_'))
    throw new Error(
      'Never use a Supabase secret/service-role key in the frontend. Use a publishable or legacy anon key.',
    );
  if (/^sb_publishable_[A-Za-z0-9_-]+$/.test(key)) return;
  try {
    const parts = key.split('.');
    if (parts.length !== 3) throw new Error();
    const payload: unknown = JSON.parse(atob(parts[1].replace(/-/g, '+').replace(/_/g, '/')));
    if (!payload || typeof payload !== 'object' || !('role' in payload) || payload.role !== 'anon')
      throw new Error();
  } catch {
    throw new Error(
      'Use a Supabase publishable key or a legacy anon JWT, never a service-role key.',
    );
  }
}

export function getSupabaseConfig(env: SupabaseEnvironment): { url: string; key: string } | null {
  const url = env.VITE_SUPABASE_URL?.trim();
  const keys = [
    env.VITE_SUPABASE_PUBLISHABLE_KEY?.trim(),
    env.VITE_SUPABASE_ANON_KEY?.trim(),
  ].filter((value): value is string => Boolean(value));
  // VITE_* values are public even when unused. Check BOTH keys before selecting.
  keys.forEach(validatePublicKey);
  const key = keys[0];
  if (!url && !key) return null;
  if (!url || !key)
    throw new Error(
      'Set both VITE_SUPABASE_URL and VITE_SUPABASE_PUBLISHABLE_KEY (or VITE_SUPABASE_ANON_KEY).',
    );

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    throw new Error('VITE_SUPABASE_URL must be a valid Supabase project URL.');
  }
  const local = ['localhost', '127.0.0.1', '[::1]'].includes(parsed.hostname);
  if (
    (parsed.protocol !== 'https:' && !(local && parsed.protocol === 'http:')) ||
    parsed.username ||
    parsed.password ||
    parsed.search ||
    parsed.hash ||
    parsed.pathname !== '/'
  ) {
    throw new Error(
      'VITE_SUPABASE_URL must be an HTTPS project origin (HTTP is allowed for local development only).',
    );
  }
  return { url: parsed.origin, key };
}
