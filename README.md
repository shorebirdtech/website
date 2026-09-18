# Shorebird Site 🐦

Home of the [shorebird.dev](https://shorebird.dev) site: Astro 7 + Tailwind v4
with a few React islands, deployed to Firebase Hosting (`firebase.json`, GCP
project `shorebird-website`) by `.github/workflows/main.yaml` on every push to
`main`. Pull requests get a preview URL commented on the PR. See `CUTOVER.md`
for the DNS and custom-domain steps still pending.

`firebase.json` caches `/_astro/**` and `/fonts/**` for a year as `immutable`.
Astro fingerprints everything under `/_astro/`, but the font files in
`public/fonts/` are named by hand — if a face is ever re-exported, change its
filename (and the `@font-face`/preload in `src/styles/global.css` and
`src/layouts/main.astro`) rather than overwriting it in place. Everything else,
including HTML, uses Hosting's default `max-age=3600`.

## Running locally

```
npm install
npm run dev          # http://localhost:4321
npm run build        # static site in dist/
npm run preview      # serve dist/
```

Before committing: `npm run format`, `npm run cspell`, and (after a build)
`npm run check:links`.

## Running with Docker 🐳

```
docker compose up --build
```

## Content

Blog posts, success stories, authors and the changelog live in Sanity (project
`jrhcct5b`, org "Shorebird"). The Studio is `studio/` in this repo, hosted at
<https://shorebird.sanity.studio> with one workspace per dataset (`/production`,
`/dev`). Everything else on the site is code.

- The site reads Sanity at build time through `src/lib/sanity/load-query.ts` and
  the GROQ in `src/lib/sanity/queries.ts`; bodies are Portable Text rendered by
  `src/components/portable-text/rich-text.astro`. Images are served from
  Sanity's CDN with `srcset` (`src/components/sanity/sanity-image.astro`), so
  builds never download or re-encode them. Reading time is computed from the
  body, and `og:image` is the share image or the cover, cropped to 1200×630
  JPEG.
- `/changelog` renders the `changelogEntry` documents; `/changelog.json` and
  `/changelog/rss.xml` expose the same entries for the docs site and console.
  The JSON field set only ever grows (see `src/lib/changelog.ts`).
- Publishing does not redeploy by itself: a Sanity webhook dispatches
  `.github/workflows/sanity-rebuild.yaml`, which rebuilds and deploys.
- `SANITY_DATASET` selects the dataset (default `production`). See
  `.env.example`.
- `src/data/{reviews,logos,team}.json` — the homepage testimonials, the "Trusted
  by" logo strip and the About page team grid. Image paths are `/src/assets/...`
  strings resolved with `import.meta.glob`.
- `src/pages/{dpa,privacy,terms}` — legal pages as Markdown; `/privacy/raw.json`
  and `/terms/raw.json` expose the Markdown as JSON for the console (the
  slash-less `/privacy/raw` and `/terms/raw` 301 there; a static host takes the
  content type from the extension, so the name has to carry the `.json`).

### Live preview

Editors preview drafts through the Studio's Presentation tool, which loads a
server-rendered copy of this site. That copy is the same code built with
`PREVIEW_MODE=true` (`Dockerfile.preview`, `cloudbuild.preview.yaml`): pages
render per request, `/api/preview/enable` validates the Studio's secret and sets
a cookie, and from then on that session reads drafts with click-to-edit
overlays. Without the cookie the preview host serves published content only,
`noindex`. It needs a Viewer token in `SANITY_API_READ_TOKEN` at runtime.

The dev copy runs on Cloud Run in `code-push-dev` as `website-preview`, reading
the `dev` dataset. Locally, `npm run dev` with the token in `.env` works the
same way, and the Studio falls back to `http://localhost:4321` when no preview
origin is configured for a workspace.

### Studio

```
cd studio
npm install
npm run dev                          # http://localhost:3333
SANITY_STUDIO_PREVIEW_ORIGIN_DEV=... npm run deploy
```

`studio/scripts/migrate.ts` is the one-time import of the pre-Sanity Markdown
content and is kept for reference; production gets its content by copying the
`dev` dataset (`sanity dataset export` / `import`), not by re-running it.
`studio/scripts/seed-changelog.ts` creates changelog entries from published
posts.

Scripts (Python 3, stdlib only):

- `scripts/import_webflow.py` — one-time import of the Webflow CMS export into
  the pre-Sanity `src/content` and into `src/data` (downloads images, converts
  HTML to Markdown, keeps hand-written posts). Only the `src/data` part still
  has a target. The snapshot it reads is kept outside the repo at
  `../webflow-migration/webflow-export/` (override with `WEBFLOW_EXPORT=`).
  Re-running regenerates every body that still carries the
  `<!-- Converted from the Webflow CMS export ... -->` marker and rewrites
  `src/data/*.json`, so hand edits made after the import are lost unless the
  marker is removed first. It is kept for the final delta pull before cutover
  (see `CUTOVER.md`); after that it is history, not a tool.
- `scripts/check_links.py` — crawls `dist/**/*.html` and reports internal links,
  images, scripts and `og:image` URLs that do not resolve to a file.
  `npm run check:links` runs it against `dist/`.

## Theme model

The page background is dark (`:root`). Sections opt into light with
`data-theme="light"` (see `src/components/ui/section.astro`), which redefines
the surface/text/border tokens for everything inside. The sticky navbar's theme
is fixed per page and matches the first section (light on blog pages via
`initialTheme="light"`, dark everywhere else); it does not change as sections
scroll under it. There is no system `prefers-color-scheme` switching, matching
the Webflow site.
