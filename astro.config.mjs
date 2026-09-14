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
    // Blog slugs were renamed when the site moved to Webflow; Webflow's slugs
    // are canonical now.
    '/blog/1.0': '/blog/1',
    '/blog/dart-3.5.0': '/blog/dart-3-5-0',
    '/blog/flutter-3.32-release': '/blog/flutter-3-32-release',
    '/blog/growing': '/blog/shorebird-is-growing',
    '/blog/building-great-developer-tools': '/blog/building-good-software',
  },
});
