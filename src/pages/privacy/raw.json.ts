import * as privacy from './index.md';

import type { APIRoute } from 'astro';

// This is an API endpoint that returns a JSON object with the raw markdown content.
// In the future, this can be consolidated with the `privacy.md` page however it would
// require enabling SSR and moving away from the static site generation model.
//
// The `.json` in the filename is what makes this work on a static host: the
// `Response` headers below are only used by `astro dev`/`preview`, so on
// Firebase Hosting the content type comes from the emitted file's extension.
// `/privacy/raw` redirects here (see `astro.config.mjs`) for anything still
// pointing at the pre-Webflow URL.
export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      last_updated: privacy.frontmatter.last_updated,
      content: privacy.rawContent(),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    },
  );
};
