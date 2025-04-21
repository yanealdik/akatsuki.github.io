import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '/akatsuki.github.io/',
  plugins: [react()],
  resolve: {
    alias: {
      '@components': '/src/components',
    },
  },
  server: {
    proxy: {
      '/api': 'http://127.0.0.1:5000',
    },
  },
});
