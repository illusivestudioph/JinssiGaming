import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    proxy: {
      '/api/gutenberg': {
        target: 'https://www.gutenberg.org',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/gutenberg/, ''),
      },
      '/api/steam-proxy': {
        target: 'https://store.steampowered.com',
        changeOrigin: true,
        bypass(req, res) {
          const url = new URL(req.url || '', 'http://localhost');
          const action = url.searchParams.get('action');
          const term = url.searchParams.get('term') || '';
          const appId = url.searchParams.get('appId') || '';

          if (action === 'search') {
            const target = `https://store.steampowered.com/api/storesearch/?term=${encodeURIComponent(term)}&l=english&cc=US`;
            fetch(target)
              .then((r) => r.json())
              .then((data) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
              })
              .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });
            return false;
          }

          if (action === 'details') {
            const target = `https://store.steampowered.com/api/appdetails?appids=${encodeURIComponent(appId)}&l=english`;
            fetch(target)
              .then((r) => r.json())
              .then((data) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
              })
              .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });
            return false;
          }

          if (action === 'news') {
            const target = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=${encodeURIComponent(appId)}&count=3&format=json`;
            fetch(target)
              .then((r) => r.json())
              .then((data) => {
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify(data));
              })
              .catch((err) => {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: err.message }));
              });
            return false;
          }

          return null;
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
