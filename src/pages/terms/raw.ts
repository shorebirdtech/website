import * as code_push_terms from './code-push/index.md';
import * as ci_terms from './ci/index.md';

import type { APIRoute } from 'astro';

// This is an API endpoint that returns a JSON object with the raw markdown content.
// In the future, this can be consolidated with the `terms.md` page however it would
// require enabling SSR and moving away from the static site generation model.
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
