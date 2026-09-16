import * as code_push_terms from '@/legal/terms-code-push.md';
import * as ci_terms from '@/legal/terms-ci.md';

import type { APIRoute } from 'astro';

// This is an API endpoint that returns a JSON object with the raw markdown content
// of the per-product terms. The Markdown lives in `src/legal/` (not `src/pages/`)
// because the live site no longer serves `/terms/ci` and `/terms/code-push` as
// pages; `/terms` links the PDF versions instead.
//
// The `.json` in the filename is what makes this work on a static host: the
// `Response` headers below are only used by `astro dev`/`preview`, so on
// Firebase Hosting the content type comes from the emitted file's extension.
// `/terms/raw` redirects here (see `astro.config.mjs`) for anything still
// pointing at the pre-Webflow URL.
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      code_push: {
        last_updated: code_push_terms.frontmatter.last_updated,
        content: code_push_terms.rawContent(),
      },
      ci: {
        last_updated: ci_terms.frontmatter.last_updated,
        content: ci_terms.rawContent(),
      },
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
