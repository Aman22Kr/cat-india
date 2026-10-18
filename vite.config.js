import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Relative base + HashRouter => works under ANY repository name on GitHub Pages.
// Override with VITE_BASE=/repo-name/ if you prefer an absolute base.
export default defineConfig({
  base: process.env.VITE_BASE || './',
  plugins: [react()],
});
