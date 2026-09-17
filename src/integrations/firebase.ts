import type { AstroIntegration } from 'astro';
import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { format, resolveConfig } from 'prettier';

/**
 * Keeps `hosting.redirects` in `firebase.json` in sync with the `redirects`
 * map in `astro.config.mjs`, so the config (with its comments on *why* each
 * rule exists) stays the single source of truth. Astro's own static redirects
 * are `<meta http-equiv="refresh">` stubs, which search engines treat as
 * weaker than a real 301; Firebase Hosting evaluates its redirects before
 * looking for static content, so on the deployed site every rule is a real 301
 * and the stubs are never reached (they still make `astro preview` behave).
 *
 * `firebase.json` is checked in — the Firebase CLI reads it at deploy time —
 * so a build that changes it leaves a diff to commit; CI fails on that diff.
 * Each source is written as `/path{,/}` so both slash forms match.
 */
export default function firebase(): AstroIntegration {
  let redirects: Record<
    string,
    string | { destination: string; status?: number }
  > = {};
  return {
    name: 'firebase',
    hooks: {
      'astro:config:done': ({ config }) => {
        redirects = config.redirects;
      },
      'astro:build:done': async ({ logger }) => {
        const rules = Object.entries(redirects).map(([source, target]) => ({
          source: `${source.replace(/\/+$/, '')}{,/}`,
          destination: typeof target === 'string' ? target : target.destination,
          type: typeof target === 'string' ? 301 : (target.status ?? 301),
        }));
        const path = fileURLToPath(
          new URL('../../firebase.json', import.meta.url),
        );
        const json = JSON.parse(await readFile(path, 'utf8'));
        json.hosting.redirects = rules;
        // Match `npm run format` so the regenerated file never fails the
        // format check.
        const options = (await resolveConfig(path)) ?? {};
        await writeFile(
          path,
          await format(JSON.stringify(json), { ...options, filepath: path }),
        );
        logger.info(`firebase.json: ${rules.length} redirects`);
      },
    },
  };
}
