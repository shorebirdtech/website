import * as privacy from './index.md';

import type { APIRoute } from 'astro';

// This is an API endpoint that returns a JSON object with the raw markdown content.
// In the future, this can be consolidated with the `privacy.md` page however it would
// require enabling SSR and moving away from the static site generation model.
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
