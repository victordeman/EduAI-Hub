import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import rsc from '@vitejs/plugin-rsc';

export default defineConfig({
  plugins: [react(), rsc()],
  server: {
    port: 3000,
  },
});
