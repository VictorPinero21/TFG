import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [
    laravel({
      input: ['resources/js/app.jsx'], // Ajusta si usas otro archivo
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@components': path.resolve(__dirname, 'resources/js/components'),
    },
  },
});
