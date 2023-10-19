import * as terms from './index.md';

import type { APIRoute } from 'astro';

export const GET: APIRoute = async () => {
  return new Response(
    JSON.stringify({
      last_updated: terms.frontmatter.last_updated,
      content: terms.rawContent(),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
      },
    }
  );
};
