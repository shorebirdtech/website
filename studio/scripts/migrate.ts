/**
 * One-time import of the site's Markdown content into Sanity.
 *
 *   SANITY_WRITE_TOKEN=... npx tsx scripts/migrate.ts [--dataset dev] [--dry-run] [--only posts,stories,authors]
 *
 * Reads `../src/content/{blog,success-stories}` plus the author record and
 * headshots that lived in `src/layouts/blog.astro`, converts each body from
 * Markdown to Portable Text (Markdown → HTML with marked, HTML → blocks with
 * block-tools against the studio schema), uploads every referenced image, and
 * writes documents with deterministic ids so re-runs replace rather than
 * duplicate. Sanity de-duplicates uploaded assets by content hash.
 *
 * Production gets its content by copying the finished dataset
 * (`sanity dataset export dev` / `import production`), not by re-running this.
 */
import {
  createReadStream,
  existsSync,
  readdirSync,
  readFileSync,
} from 'node:fs';
import { basename, dirname, extname, join, resolve } from 'node:path';
import { htmlToBlocks, type DeserializerRule } from '@portabletext/block-tools';
import { createClient, type SanityClient } from '@sanity/client';
import matter from 'gray-matter';
import { JSDOM } from 'jsdom';
import { marked } from 'marked';
import { createSchema } from 'sanity';
import { schemaTypes } from '../schemaTypes';

const args = process.argv.slice(2);
const flag = (name: string) => {
  const i = args.indexOf(`--${name}`);
  return i === -1 ? undefined : (args[i + 1] ?? true);
};
const DRY_RUN = args.includes('--dry-run');
const DATASET = (flag('dataset') as string | undefined) ?? 'dev';
const ONLY = new Set(
  ((flag('only') as string | undefined) ?? 'authors,posts,stories').split(','),
);

const SITE = resolve(import.meta.dirname, '../..');
const CONTENT = join(SITE, 'src/content');
const ASSETS = join(SITE, 'src/assets');
const PUBLIC = join(SITE, 'public');

const token = process.env.SANITY_WRITE_TOKEN;
if (!token && !DRY_RUN) {
  console.error('SANITY_WRITE_TOKEN is required (or pass --dry-run)');
  process.exit(1);
}
const client: SanityClient = createClient({
  projectId: 'jrhcct5b',
  dataset: DATASET,
  apiVersion: '2026-09-01',
  token,
  useCdn: false,
});

// ---------------------------------------------------------------------------
// Authors: the record that lived in src/layouts/blog.astro.

interface AuthorSeed {
  key: string;
  name: string;
  jobTitle: string;
  headshot: string;
  github: string;
  twitter?: string;
}

const AUTHORS: AuthorSeed[] = [
  {
    key: 'shorebirdtech',
    name: 'Shorebird',
    jobTitle: 'The Shorebird Team',
    headshot: 'shorebird-headshot.png',
    github: 'shorebirdtech',
    twitter: '@shorebirddev',
  },
  {
    key: 'eseidel',
    name: 'Eric Seidel',
    jobTitle: 'CEO and Founder',
    headshot: 'eric-headshot.jpeg',
    github: 'eseidel',
    twitter: '@_eseidel',
  },
  {
    key: 'felangel',
    name: 'Felix Angelov',
    jobTitle: 'Founding Engineer',
    headshot: 'felix-headshot.jpeg',
    github: 'felangel',
    twitter: '@felangelov',
  },
  {
    key: 'bryanoltman',
    name: 'Bryan Oltman',
    jobTitle: 'Founding Engineer',
    headshot: 'bryan-headshot.png',
    github: 'bryanoltman',
  },
  {
    key: 'tomarra',
    name: 'Tom Arra',
    jobTitle: 'Operations Lead',
    headshot: 'tom-headshot.jpg',
    github: 'tomarra',
  },
  {
    key: 'dawn-ducky',
    name: 'Dawn Parzych',
    jobTitle: 'Head of Marketing',
    headshot: 'dawn-headshot.jpg',
    github: 'dawn-ducky',
  },
  {
    key: 'wesleypeck',
    name: 'Wesley Peck',
    jobTitle: 'Lead Product Manager',
    headshot: 'wesleypeck.png',
    github: 'wesleypeck',
  },
  {
    key: 'abhishekdoshi',
    name: 'Abhishek Doshi',
    jobTitle: 'Developer Relations Engineer',
    headshot: 'abhishekdoshi.jpg',
    github: 'AbhishekDoshi26',
  },
  {
    key: 'nickweatherley',
    name: 'Nick Weatherley',
    jobTitle: 'Software Engineer',
    headshot: 'nickweatherley.jpg',
    github: 'nickshorebird',
  },
  {
    key: 'maccarrithers',
    name: 'Mac Carrithers',
    jobTitle: 'Software Engineer',
    headshot: 'maccarrithers.avif',
    github: 'easymac',
  },
  {
    key: 'brandonderosier',
    name: 'Brandon DeRosier',
    jobTitle: 'Software Engineer',
    headshot: 'brandonderosier.png',
    github: 'bdero',
  },
];

// ---------------------------------------------------------------------------
// Assets

const uploaded = new Map<string, string>();
let uploadCount = 0;

async function uploadImage(path: string): Promise<string> {
  const cached = uploaded.get(path);
  if (cached) return cached;
  if (!existsSync(path)) throw new Error(`Missing image: ${path}`);
  uploadCount++;
  if (DRY_RUN) {
    const id = `image-dry-${uploaded.size}`;
    uploaded.set(path, id);
    return id;
  }
  const asset = await client.assets.upload('image', createReadStream(path), {
    filename: basename(path),
  });
  uploaded.set(path, asset._id);
  return asset._id;
}

const imageRef = (assetId: string, extra: Record<string, unknown> = {}) => ({
  _type: 'image',
  asset: { _type: 'reference', _ref: assetId },
  ...extra,
});

// ---------------------------------------------------------------------------
// Markdown → Portable Text

// `code` and `table` come from studio plugins, so the compiled schema needs
// stand-ins with the same field names for block-tools to accept them.
const pluginTypes = [
  {
    name: 'code',
    type: 'object',
    fields: [
      { name: 'language', type: 'string' },
      { name: 'code', type: 'text' },
    ],
  },
  {
    name: 'tableRow',
    type: 'object',
    fields: [{ name: 'cells', type: 'array', of: [{ type: 'string' }] }],
  },
  {
    name: 'table',
    type: 'object',
    fields: [{ name: 'rows', type: 'array', of: [{ type: 'tableRow' }] }],
  },
];
const blockContentType = createSchema({
  name: 'shorebird',
  types: [...schemaTypes, ...pluginTypes],
}).get('blockContent') as Parameters<typeof htmlToBlocks>[1];

const keyGenerator = () => Math.random().toString(36).slice(2, 14);

const tag = (node: Node) => (node as Element).tagName?.toLowerCase();
const attr = (node: Node, name: string) =>
  (node as Element).getAttribute?.(name) ?? '';

function embedFor(
  el: Element,
): { _type: 'embed'; [key: string]: unknown } | undefined {
  const iframe = tag(el) === 'iframe' ? el : el.querySelector('iframe');
  const src = iframe ? attr(iframe, 'src') : '';
  if (/youtube\.com\/embed\//.test(src)) {
    const id = src.match(/embed\/([\w-]+)/)?.[1];
    return {
      _type: 'embed',
      provider: 'youtube',
      url: `https://www.youtube.com/watch?v=${id}`,
      title: attr(iframe!, 'title') || undefined,
    };
  }
  if (/demo\.arcade\.software\//.test(src)) {
    return {
      _type: 'embed',
      provider: 'arcade',
      url: src.split('?')[0],
      title: attr(iframe!, 'title') || undefined,
    };
  }
  if (el.classList?.contains('twitter-tweet')) {
    const links = Array.from(el.querySelectorAll('a')).map(
      (a) => a.getAttribute('href') ?? '',
    );
    const url = links
      .reverse()
      .find((h) => /twitter\.com\/\w+\/status\//.test(h));
    if (url)
      return { _type: 'embed', provider: 'tweet', url: url.split('?')[0] };
  }
  return undefined;
}

function rulesFor(imageIds: Map<string, string>): DeserializerRule[] {
  return [
    {
      // Fenced code → @sanity/code-input block.
      deserialize(el, _next, createBlock) {
        if (tag(el) !== 'pre') return undefined;
        const code = (el as Element).querySelector('code');
        const language = code?.className.match(/language-([\w-]+)/)?.[1];
        return createBlock({
          _type: 'code',
          language: language ?? 'text',
          code: (code ?? el).textContent?.replace(/\n$/, '') ?? '',
        });
      },
    },
    {
      // Images, already uploaded; `<p><img></p>` is hoisted to a block.
      deserialize(el, _next, createBlock) {
        const isImgParagraph =
          tag(el) === 'p' &&
          (el as Element).children.length === 1 &&
          tag((el as Element).children[0]) === 'img' &&
          !(el.textContent ?? '').trim();
        const img =
          tag(el) === 'img'
            ? (el as Element)
            : isImgParagraph
              ? (el as Element).children[0]
              : undefined;
        if (!img) return undefined;
        const src = attr(img, 'src');
        const assetId = imageIds.get(src);
        if (!assetId) throw new Error(`Image not uploaded: ${src}`);
        return createBlock(
          imageRef(assetId, { alt: attr(img, 'alt') || basename(src) }),
        );
      },
    },
    {
      // Tables → @sanity/table (plain-string cells).
      deserialize(el, _next, createBlock) {
        if (tag(el) !== 'table') return undefined;
        const rows = Array.from((el as Element).querySelectorAll('tr')).map(
          (tr) => ({
            _type: 'tableRow',
            _key: keyGenerator(),
            cells: Array.from(tr.children).map(
              (c) => c.textContent?.trim() ?? '',
            ),
          }),
        );
        return createBlock({ _type: 'table', rows });
      },
    },
    {
      // Embeds: YouTube/Arcade iframes (often wrapped in a centering div)
      // and Twitter blockquotes. Their loader <script> tags are dropped.
      deserialize(el, next, createBlock) {
        const t = tag(el);
        if (t === 'script') return [];
        if (t !== 'div' && t !== 'iframe' && t !== 'blockquote')
          return undefined;
        const embed = embedFor(el as Element);
        if (embed) return createBlock(embed);
        if (t === 'div') return next(el.childNodes);
        return undefined;
      },
    },
    {
      // Inline marks marked emits that block-tools does not map by default.
      deserialize(el, next) {
        const t = tag(el);
        if (t === 'kbd')
          return {
            _type: '__decorator',
            name: 'kbd',
            children: next(el.childNodes),
          };
        if (t === 'del' || t === 's')
          return {
            _type: '__decorator',
            name: 'strike-through',
            children: next(el.childNodes),
          };
        return undefined;
      },
    },
  ];
}

interface ConvertedBody {
  blocks: unknown[];
  stats: Record<string, number>;
}

async function markdownToBlocks(
  markdown: string,
  mdPath: string,
): Promise<ConvertedBody> {
  const html = await marked.parse(markdown, { gfm: true, async: false });
  const dom = new JSDOM(html);
  const imageIds = new Map<string, string>();
  for (const img of Array.from(dom.window.document.querySelectorAll('img'))) {
    const src = img.getAttribute('src') ?? '';
    const path = src.startsWith('/')
      ? join(PUBLIC, src)
      : resolve(dirname(mdPath), src);
    imageIds.set(src, await uploadImage(path));
  }
  const blocks = htmlToBlocks(html, blockContentType, {
    parseHtml: (h) => new JSDOM(h).window.document,
    rules: rulesFor(imageIds),
    keyGenerator,
  }) as Array<{ _type: string }>;
  const stats: Record<string, number> = {};
  for (const b of blocks) stats[b._type] = (stats[b._type] ?? 0) + 1;
  return { blocks, stats };
}

// ---------------------------------------------------------------------------
// Documents

const toDateString = (d: unknown) =>
  d instanceof Date ? d.toISOString().slice(0, 10) : String(d);

// The one MDX story imports its images and renders them with Astro's
// <Image>. Rewrite those to plain Markdown images and drop the imports and
// JSX comments so the file converts like the rest.
function mdxToMarkdown(source: string): string {
  const imports = new Map<string, string>();
  const withoutImports = source.replace(
    /^import\s+(\w+)\s+from\s+'([^']+)';\n/gm,
    (_m, name: string, path: string) => {
      if (!path.startsWith('astro:')) imports.set(name, path);
      return '';
    },
  );
  return withoutImports
    .replace(/\{\/\*[\s\S]*?\*\/\}\n?/g, '')
    .replace(
      /<Image\s+src=\{(\w+)\}\s+alt="([^"]*)"\s*\/>/g,
      (_m, name: string, alt: string) => {
        const path = imports.get(name);
        if (!path) throw new Error(`Unknown image import: ${name}`);
        return `![${alt}](${path})`;
      },
    );
}

function readMarkdown(dir: string) {
  return readdirSync(dir)
    .filter((f) => /\.mdx?$/.test(f))
    .sort()
    .map((f) => {
      const path = join(dir, f);
      const { data, content } = matter(readFileSync(path, 'utf8'));
      return {
        slug: f.replace(/\.mdx?$/, ''),
        path,
        data,
        content: f.endsWith('.mdx') ? mdxToMarkdown(content) : content,
      };
    });
}

async function migrateAuthors() {
  const docs = [];
  for (const a of AUTHORS) {
    const avatar = await uploadImage(
      join(ASSETS, 'blog/headshots', a.headshot),
    );
    docs.push({
      _id: `author-${a.key}`,
      _type: 'author',
      name: a.name,
      slug: { _type: 'slug', current: a.key },
      jobTitle: a.jobTitle,
      avatar: imageRef(avatar),
      github: a.github,
      ...(a.twitter ? { twitter: a.twitter } : {}),
    });
  }
  return docs;
}

async function migratePosts() {
  const docs = [];
  for (const post of readMarkdown(join(CONTENT, 'blog'))) {
    const d = post.data;
    const cover = await uploadImage(join(ASSETS, 'blog/covers', d.cover));
    const og = d.ogImage
      ? await uploadImage(join(PUBLIC, d.ogImage))
      : undefined;
    const { blocks, stats } = await markdownToBlocks(post.content, post.path);
    console.log(`post ${post.slug}: ${JSON.stringify(stats)}`);
    docs.push({
      _id: `post-${post.slug}`,
      _type: 'post',
      title: d.title,
      slug: { _type: 'slug', current: post.slug },
      author: { _type: 'reference', _ref: `author-${d.author}` },
      date: toDateString(d.date),
      description: d.description,
      ...(d.intro && d.intro !== d.description ? { intro: d.intro } : {}),
      cover: imageRef(cover),
      highlight: Boolean(d.highlight),
      body: blocks,
      ...(d.seoTitle && d.seoTitle !== d.title ? { seoTitle: d.seoTitle } : {}),
      ...(d.seoDescription && d.seoDescription !== d.description
        ? { seoDescription: d.seoDescription }
        : {}),
      ...(og ? { ogImage: imageRef(og) } : {}),
    });
  }
  return docs;
}

async function migrateStories() {
  const docs = [];
  for (const story of readMarkdown(join(CONTENT, 'success-stories'))) {
    const d = story.data;
    const cover = await uploadImage(
      join(ASSETS, 'success-stories/covers', d.cover),
    );
    const { blocks, stats } = await markdownToBlocks(story.content, story.path);
    console.log(`story ${story.slug}: ${JSON.stringify(stats)}`);
    docs.push({
      _id: `story-${story.slug}`,
      _type: 'successStory',
      title: d.title,
      slug: { _type: 'slug', current: story.slug },
      date: toDateString(d.date),
      description: d.description,
      ...(d.intro && d.intro !== d.description ? { intro: d.intro } : {}),
      cover: imageRef(cover),
      highlights: d.highlights ?? [],
      body: blocks,
      ...(d.industry ? { industry: d.industry } : {}),
      ...(d.companySize ? { companySize: d.companySize } : {}),
      ...(d.website ? { website: d.website } : {}),
      ...(d.seoTitle && d.seoTitle !== d.title ? { seoTitle: d.seoTitle } : {}),
      ...(d.seoDescription && d.seoDescription !== d.description
        ? { seoDescription: d.seoDescription }
        : {}),
    });
  }
  return docs;
}

async function main() {
  const docs: Array<{ _id: string; _type: string }> = [];
  if (ONLY.has('authors')) docs.push(...(await migrateAuthors()));
  if (ONLY.has('posts')) docs.push(...(await migratePosts()));
  if (ONLY.has('stories')) docs.push(...(await migrateStories()));

  console.log(
    `\n${docs.length} documents, ${uploadCount} images${DRY_RUN ? ' (dry run, nothing written)' : ''}`,
  );
  const print = flag('print') as string | undefined;
  if (print) {
    const doc = docs.find((d) => d._id.endsWith(`-${print}`));
    console.log(
      doc ? JSON.stringify(doc, null, 2) : `no document for ${print}`,
    );
  }
  if (DRY_RUN) return;
  // Batches of 50 keep each transaction well under Sanity's request limits.
  for (let i = 0; i < docs.length; i += 50) {
    const tx = client.transaction();
    for (const doc of docs.slice(i, i + 50)) tx.createOrReplace(doc as any);
    await tx.commit();
    console.log(`committed ${Math.min(i + 50, docs.length)}/${docs.length}`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
