// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import config from './src/config';

// https://astro.build/config
export default defineConfig({
  site: 'https://shorebird.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [react(), sitemap()],
  redirects: {
    // Some old docs may still point to .html urls for terms and privacy.
    '/terms.html': '/terms',
    '/privacy.html': '/privacy',
    '/faq': 'https://docs.shorebird.dev/faq',
    '/security': 'https://handbook.shorebird.dev/security',
    '/workshops': 'https://calendly.com/felix-shorebird/shorebird-workshop',
    '/newsletter-signup': config.newsletterSubscriptionUrl,
    // Initially tweeted the wrong link:
    '/success-stories/pushpress/': '/success-stories/push-press',
  },
});
