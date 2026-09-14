# Shorebird Site 🐦

Home of the [shorebird.dev](https://shorebird.dev) site: Astro 5 + Tailwind v4
with a few React islands, deployed to GitHub Pages by
`.github/workflows/main.yaml` on every push to `main`.

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

- `src/content/blog/*.md` — blog posts. Frontmatter: `title`, `description`,
  `author` (key into the `authors` map in `src/layouts/blog.astro`), `date`,
  `cover`, plus the Webflow-era fields `intro`, `readingTime`, `ogImage`,
  `seoTitle`, `seoDescription`, `highlight`. Body images live in
  `src/assets/blog/<slug>/`, covers in `src/assets/blog/covers/`, share images
  in `public/blog/og/`.
- `src/content/success-stories/*.md` — customer stories, with `industry`,
  `companySize`, `website` and `highlights` for the sidebar.
- `src/data/{reviews,logos,team}.json` — the homepage testimonials, the "Trusted
  by" logo strip and the About page team grid. Image paths are `/src/assets/...`
  strings resolved with `import.meta.glob`.
- `src/pages/{dpa,privacy,terms}` — legal pages as Markdown; `/privacy/raw` and
  `/terms/raw` expose the Markdown as JSON for the console.
- `webflow-export/` — read-only snapshot of the Webflow site (CMS JSON, rendered
  pages, CSS, assets, screenshots) taken when the site was ported back to Astro.
  See its README; nothing in it ships.

Scripts (Python 3, stdlib only):

- `scripts/import_webflow.py` — one-time import of `webflow-export/cms/*.json`
  into `src/content` and `src/data` (downloads images, converts HTML to
  Markdown, keeps hand-written posts). Idempotent; safe to re-run.
- `scripts/check_links.py` — crawls `dist/**/*.html` and reports internal links,
  images, scripts and `og:image` URLs that do not resolve to a file.
  `npm run check:links` runs it against `dist/`.

## Theme model

The page background is dark (`:root`). Sections opt into light with
`data-theme="light"` (see `src/components/ui/section.astro`), which redefines
the surface/text/border tokens for everything inside; the sticky navbar follows
the theme of the section under it. There is no system `prefers-color-scheme`
switching, matching the Webflow site.
