import icon from 'astro-icon';
import { defineConfig } from 'astro/config';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://www.runeoliveira.com',
  integrations: [sitemap(), icon()],
});
