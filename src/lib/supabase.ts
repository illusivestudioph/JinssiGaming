import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';
import { getSupabaseConfig } from './env';

let configurationError: string | null = null;
let config: ReturnType<typeof getSupabaseConfig> = null;
try {
  config = getSupabaseConfig({
    VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
    VITE_SUPABASE_PUBLISHABLE_KEY: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  });
} catch (error) {
  configurationError = error instanceof Error ? error.message : 'Invalid Supabase configuration.';
}

export const supabaseConfigurationError = configurationError;
export const supabase = config
  ? createClient<Database>(config.url, config.key, {
      auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true },
    })
  : null;

export function requireSupabase() {
  if (!supabase)
    throw new Error(
      configurationError ||
        'Supabase is not configured. Follow the setup instructions in README.md.',
    );
  return supabase;
}
