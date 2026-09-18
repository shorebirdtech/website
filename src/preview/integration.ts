import type { AstroIntegration } from 'astro';

/**
 * Adds the preview-mode toggle routes. Only the server-rendered preview
 * deployment registers this, so the static production build has no
 * on-demand routes and needs no adapter.
 */
export function previewRoutes(): AstroIntegration {
  return {
    name: 'sanity-preview-routes',
    hooks: {
      'astro:config:setup': ({ injectRoute }) => {
        injectRoute({
          pattern: '/api/preview/enable',
          entrypoint: './src/preview/enable.ts',
          prerender: false,
        });
        injectRoute({
          pattern: '/api/preview/disable',
          entrypoint: './src/preview/disable.ts',
          prerender: false,
        });
      },
    },
  };
}
