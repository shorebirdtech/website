// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import tailwindcss from '@tailwindcss/vite';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import config from './src/config';
import firebase from './src/integrations/firebase';

// https://astro.build/config
export default defineConfig({
  site: 'https://shorebird.dev',
  vite: {
    plugins: [tailwindcss()],
  },
  integrations: [
    react(),
    sitemap(),
    mdx(),
    firebase({
      // Rules that must not become Astro redirect stubs: this one differs
      // from the real page only by case, and on a case-insensitive filesystem
      // the stub and the page would land in the same directory.
      hostOnly: { '/success-stories/VETC': '/success-stories/vetc' },
    }),
  ],
  redirects: {
    '/faq': 'https://docs.shorebird.dev/faq',
    '/privacy.html': '/privacy',
    '/security': 'https://handbook.shorebird.dev/security',
    // Initially tweeted the wrong link:
    '/success-stories/pushpress/': '/success-stories/push-press',
    '/talk-to-sales': config.contactSales,
    '/terms.html': '/terms',
    '/jobs/full-stack-software-engineer': '/jobs',
    // Webflow's own 301 rules (Site settings → Publishing, exported
    // 2026-09-22); `/talk-to-sales` above is the fifth.
    '/customer-stories': '/success-stories',
    '/terms-of-service': '/terms',
    '/privacy-policy': '/privacy',
    // Webflow served the sitemap at `/sitemap.xml` (its robots.txt, Search
    // Console and the 404 page all point there); Astro emits an index instead.
    '/sitemap.xml': '/sitemap-index.xml',
    // Legal pages moved when the site moved to Webflow: the DPA lives at
    // `/dpa` and the per-product terms are PDFs linked from `/terms`.
    '/legal/dpa': '/dpa',
    '/terms/ci': '/terms',
    '/terms/code-push': '/terms',
    // The Code Push guide (an ebook behind a Loops signup form) was dropped
    // at cutover; send its landing page and PDF to the product page.
    '/code-push-guide': '/product/code-push',
    '/guides/shorebird-code-push-guide.pdf': '/product/code-push',
    // The raw-legal-text endpoints have to end in `.json` for a static host to
    // serve them as JSON (nothing rewrites the `content-type` at the edge);
    // keep the old paths the console may still hold working.
    '/privacy/raw': '/privacy/raw.json',
    '/terms/raw': '/terms/raw.json',
    // Blog slugs were renamed when the site moved to Webflow; Webflow's slugs
    // are canonical now.
    '/blog/1.0': '/blog/1',
    '/blog/dart-3.5.0': '/blog/dart-3-5-0',
    '/blog/flutter-3.32-release': '/blog/flutter-3-32-release',
    '/blog/flutter-332-release': '/blog/flutter-3-32-release',
    '/blog/growing': '/blog/shorebird-is-growing',
    '/blog/building-great-developer-tools': '/blog/building-good-software',
  },
});
