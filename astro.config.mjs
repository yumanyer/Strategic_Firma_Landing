import { defineConfig } from 'astro/config';

// Astro generates a static site that can be deployed directly to Cloudflare Pages.
export default defineConfig({
  output: 'static',
  vite: {
    server: {
      allowedHosts: ['extradosed-unathletically-heide.ngrok-free.dev'],
    },
  },
});