import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://runeoliveira.com',
  integrations: [sitemap()],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
  },
});
