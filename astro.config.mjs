// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
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
  integrations: [react(), sitemap(), mdx()],
  redirects: {
    '/faq': 'https://docs.shorebird.dev/faq',
    '/privacy.html': '/privacy',
    '/security': 'https://handbook.shorebird.dev/security',
    // Initially tweeted the wrong link:
    '/success-stories/pushpress/': '/success-stories/push-press',
    '/talk-to-sales': config.contactSales,
    '/terms.html': '/terms',
    '/workshops': 'https://calendly.com/felix-shorebird/shorebird-workshop',
    '/jobs/full-stack-software-engineer': '/jobs',
    '/jobs': config.jobBoardUrl,
  },
});
