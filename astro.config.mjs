import icon from 'astro-icon';
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://runeoliveira.com',
  integrations: [sitemap(), icon()],
  vite: {
    build: {
      assetsInlineLimit: 0,
    },
    // Proper TypeScript handling
    optimizeDeps: {
      include: ['three']
    },
    resolve: {
      alias: {
        'three/addons': 'three/examples/jsm'
      }
    }
  },
});
