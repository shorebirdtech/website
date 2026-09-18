/**
 * Seeds changelog entries from published blog posts so the timeline has
 * real, dated content. Each entry links to the post it came from.
 *
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/seed-changelog.ts [--dataset dev]
 */
import { createClient } from '@sanity/client';

const args = process.argv.slice(2);
const dataset = args[args.indexOf('--dataset') + 1] || 'dev';
const client = createClient({
  projectId: 'jrhcct5b',
  dataset,
  apiVersion: '2026-09-01',
  token: process.env.SANITY_WRITE_TOKEN,
  useCdn: false,
});

// slug → how the change should be classified. Title, date and summary come
// from the post itself.
const seeds: Record<
  string,
  { area: string; kind: string; minFlutterVersion?: string }
> = {
  'advanced-permissions': { area: 'console', kind: 'new' },
  'introducing-mission-control': { area: 'console', kind: 'new' },
  'making-the-shorebird-cli-agentic': { area: 'cli', kind: 'new' },
  'improved-patch-delivery': { area: 'code-push', kind: 'improved' },
  'migrate-to-shorebird-api-keys': { area: 'cli', kind: 'deprecated' },
  'yearly-plans': { area: 'billing', kind: 'new' },
  'windows-desktop': { area: 'code-push', kind: 'new' },
  'flutter-3-32-release': { area: 'code-push', kind: 'improved' },
  'improved-cloud-infra': { area: 'code-push', kind: 'improved' },
  'simplified-pricing': { area: 'billing', kind: 'improved' },
};

async function main() {
  const posts = await client.fetch<
    Array<{ slug: string; title: string; date: string; description: string }>
  >(
    `*[_type == "post" && slug.current in $slugs]{ "slug": slug.current, title, date, description }`,
    { slugs: Object.keys(seeds) },
  );
  const tx = client.transaction();
  for (const post of posts) {
    const seed = seeds[post.slug];
    tx.createOrReplace({
      _id: `changelog-${post.slug}`,
      _type: 'changelogEntry',
      title: post.title,
      slug: { _type: 'slug', current: post.slug },
      date: post.date,
      area: seed.area,
      kind: seed.kind,
      summary: post.description,
      link: `/blog/${post.slug}`,
      ...(seed.minFlutterVersion
        ? { minFlutterVersion: seed.minFlutterVersion }
        : {}),
    });
  }
  await tx.commit();
  console.log(`seeded ${posts.length} changelog entries into ${dataset}`);
  const missing = Object.keys(seeds).filter(
    (s) => !posts.some((p) => p.slug === s),
  );
  if (missing.length) console.log('no post for:', missing.join(', '));
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
