import tailwindcss from '@tailwindcss/vite';
import { tanstackRouter } from '@tanstack/router-plugin/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    // Must come before the React plugin: it generates src/routeTree.gen.ts
    // and splits each route file into lazily loaded chunks.
    tanstackRouter({ target: 'react', autoCodeSplitting: true }),
    react(),
    tailwindcss(),
  ],
  resolve: { tsconfigPaths: true },
  server: {
    // In production Caddy serves the app and the API on one origin (ADR 0002).
    proxy: { '/api': 'http://localhost:8000' },
  },
});
