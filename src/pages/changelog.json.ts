import type { APIRoute } from 'astro';
import { loadChangelog, toFeedEntry } from '@/lib/changelog';

// Machine-readable changelog for the docs site and the console. Static on
// the production host, so consumers hit the site's CDN, never Sanity.
export const GET: APIRoute = async ({ site }) => {
  const entries = await loadChangelog();
  return new Response(
    JSON.stringify({
      generated_at: new Date().toISOString(),
      entries: entries.map((entry) => toFeedEntry(entry, site!)),
    }),
    {
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'access-control-allow-origin': '*',
      },
    },
  );
};
