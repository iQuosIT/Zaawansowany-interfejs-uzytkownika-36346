import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  // Ścieżki względne — aplikacja działa pod dowolnym hostem
  // (Vercel, Netlify, GitHub Pages w podkatalogu) bez dodatkowej konfiguracji.
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['@mui/material', '@emotion/react', '@emotion/styled'],
  },
});