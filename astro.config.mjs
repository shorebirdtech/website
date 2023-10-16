import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://shorebird.dev',
  integrations: [react(), tailwind()],
  redirects: {
    // Some old docs may still point to .html urls for terms and privacy.
    '/terms.html': '/terms',
    '/privacy.html': '/privacy',
    // Temporarily redirect /pricing to the pricing section on the homepage.
    '/pricing': '/#pricing',
  },
});
