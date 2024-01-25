import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: 'https://shorebird.dev',
  integrations: [react(), tailwind(), sitemap()],
  redirects: {
    // Some old docs may still point to .html urls for terms and privacy.
    '/terms.html': '/terms',
    '/privacy.html': '/privacy',
    '/pricing': '/#pricing'
  }
});