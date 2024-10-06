import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import icon from 'astro-icon';

import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://www.runeoliveira.com',
  integrations: [mdx(), sitemap(), icon()],
});
