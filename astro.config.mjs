import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://asteriscommerce.com',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
  // Old theme URLs are retired — send any inbound links to the plugins page.
  redirects: {
    '/asteris-theme': '/plugins/',
    '/try-theme': '/plugins/',
  },
  integrations: [
    sitemap(),
  ],
});
