import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { getSupabaseConfig } from './src/lib/env';

export default defineConfig(({ mode }) => {
  // Fail before bundling, so an accidentally configured privileged VITE_* key
  // cannot make it into a public production artifact.
  getSupabaseConfig(loadEnv(mode, process.cwd(), 'VITE_'));
  return {
    plugins: [react()],
    resolve: { alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) } },
    server: { host: '0.0.0.0', allowedHosts: ['.e2b.app'] },
    preview: { host: '0.0.0.0', allowedHosts: ['.e2b.app'] },
    build: {
      rollupOptions: {
        output: { manualChunks: { supabase: ['@supabase/supabase-js'], validation: ['zod'] } },
      },
    },
  };
});
