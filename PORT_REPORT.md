# Webflow → Astro port report

Branch `webflow-port` (35 commits over `main`, 2026-09-13/14). The Astro site in
this repo now reproduces the live Webflow site (`webflow-export/` is the
reference snapshot). `npm run build` emits 94 pages; `format:check`, `cspell`
and `check:links` are green.

## How to run

```
npm install
npm run dev            # http://localhost:4321
npm run build && npm run check:links
```

## What was ported

| Route                                             | Source                                                            | Status  | Notes                                                                                             |
| ------------------------------------------------- | ----------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `/`                                               | `src/pages/index.astro`, `src/components/home/*`                  | Done    | Hero Lottie, logo marquee, benefits, enterprise, security, testimonials, FAQ, JSON-LD, newsletter |
| `/product/code-push`                              | `src/pages/product/code-push.astro`, `src/components/product/*`   | Done    | Arcade demo embed, Lottie motion                                                                  |
| `/product/shorebird-ci`                           | `src/pages/product/shorebird-ci.astro`                            | Done    | Sunset notice page, as live                                                                       |
| `/code-push-guide`                                | `src/pages/code-push-guide.astro`, `product/guide-form.tsx`       | Done    | Form posts to the same Loops endpoint as live, PDF in `public/guides/`                            |
| `/pricing`                                        | `src/pages/pricing.astro`, `src/components/pricing/*`             | Done    | Monthly/yearly toggle, comparison table, FAQ                                                      |
| `/about`                                          | `src/pages/about.astro`, `src/data/team.json`                     | Done    | Team from CMS `teams`                                                                             |
| `/jobs`                                           | `src/pages/jobs.astro`                                            | Done    | Gem job board iframe (blank on `http://localhost`, see diffs)                                     |
| `/blog`                                           | `src/pages/blog/index.astro`                                      | Done    | Highlight + latest + all 69 posts                                                                 |
| `/blog/<slug>` (69)                               | `src/content/blog/*.md`, `src/layouts/blog.astro`                 | Done    | 30 posts imported from CMS, 39 kept from repo (5 renamed to Webflow slugs), sidebar newsletter    |
| `/success-stories`                                | `src/pages/success-stories/index.astro`                           | Done    |                                                                                                   |
| `/success-stories/<slug>` (10)                    | `src/content/success-stories/*.md`, `layouts/success-story.astro` | Done    | `scapia`, `vetc` added; industry / company size / website sidebar                                 |
| `/dpa`, `/privacy`, `/terms`                      | `src/pages/{dpa.md,privacy/,terms/}`, `layouts/markdown.astro`    | Done    | `/legal/dpa`, `/terms/ci`, `/terms/code-push` redirect here; PDFs in `public/legal/`              |
| `/contact`, `/newsletter-signup`, `/demo`         | `src/pages/*`                                                     | Kept    | Not on Webflow; restyled with the shared layout (demo is a meta-refresh to Calendly)              |
| `/rss.xml`, `/blog/rss.xml`, `/sitemap-index.xml` | `src/pages/*.ts`, `@astrojs/sitemap`                              | Done    | 69 RSS items, 94 sitemap URLs                                                                     |
| `/design-system/styleguide`                       | —                                                                 | Dropped | Webflow-internal page                                                                             |

Every URL in `webflow-export/live_urls.txt` resolves in `dist/` except the
styleguide. Redirects (`astro.config.mjs`): 5 renamed blog slugs, `/legal/dpa`,
`/terms/ci`, `/terms/code-push`, `/success-stories/pushpress/`, plus the
pre-existing `/faq`, `/security`, `/talk-to-sales`, `/workshops`,
`/privacy.html`, `/terms.html`, `/jobs/full-stack-software-engineer`.

Head: `<title>`/description match the live pages; default share image is the
Webflow "shared image" (`public/open-graph.jpg`), posts use their CMS
`shared-image`, stories their cover; favicon/apple-touch-icon are the live ones;
Plausible + LinkedIn Insight tags are in `main.astro`.

## Theme model

`:root` is dark. `Section theme="light"` sets `data-theme="light"` on a
full-bleed band, which redefines the surface/text/border tokens inside it
(`src/styles/global.css`). The sticky navbar samples the element under its
bottom edge on scroll and swaps its own `data-theme` to match, like the Webflow
`is--mode_0/1` toggling. No `prefers-color-scheme`. Pages whose first section is
light pass `initialTheme="light"` to `<Navbar />` to avoid a flash.
`<CtaBand />` + `<Footer />` are per-page; `<Footer newsletter />` adds the
after-footer Loops block (home and guide only, as live).

## Remaining differences vs Webflow (ranked)

1. **Jobs board iframe** — `jobs.gem.com` sends
   `frame-ancestors 'self' https://*`, so the board is blank when the site is
   served over `http://` (dev, preview). It renders on `https://shorebird.dev`.
   No fallback link is shown on the page.
2. **Nav is in-flow, not overlaying the hero** — the sticky 80px header takes
   space at the top; on live it also does, but Webflow animates its background
   via a ScrollTrigger script. Visual result matches at rest; no scroll
   animation.
3. **Hero / product Lottie animations** — the exported `.lottie` bundles play
   via `lottie-react` (autoplay, loop, paused when off-screen); Webflow's
   scroll-triggered playback timing is not reproduced, so the terminal lines in
   the hero can be mid-animation when the page is compared side by side.
4. **Success story date** — we show the CMS `publish-date`; live shows
   `lastPublished` (every story reads "July 31, 2026"), a Webflow template
   quirk. Deliberate.
5. **Blog code blocks** — live renders `<pre>` unstyled; the port uses the dark,
   syntax-highlighted block from the old repo. Deliberate improvement.
6. **Logo marquee** — CSS `animate-marquee` instead of Swiper; same logos, speed
   approximated.
7. **Guide download form** — posts to the live Loops endpoint with the same
   hidden fields (`source=ebook-CP-guide`, `userGroup=web-download`) but was not
   submitted end-to-end during the port.
8. **Forms elsewhere** — Webflow form success/error blocks are reproduced in
   React; HubSpot chat widget (`js-na2.hs-scripts.com/246912764.js`) and the
   Unify website tag (script and key in `webflow-export/pages/home.html`) were
   intentionally not ported. Add to `src/layouts/main.astro` if wanted.
9. **`/terms` and `/privacy` on `astro preview`** — the pre-existing
   `/terms.html` → `/terms` redirect emits `dist/terms.html/index.html`, and
   Astro's preview server resolves `/terms` to that stub, producing a refresh
   loop. GitHub Pages resolves `/terms` to `dist/terms/index.html` (this config
   predates the Webflow move); use `/terms/` locally.
10. **Repo size** — `public/blog/og` (42 MB of per-post share images from the
    CMS), `src/assets` (66 MB) and `webflow-export/` (63 MB) roughly double the
    repo. `webflow-export/` can be deleted once the port is accepted.
11. **Blog index on live** captures only ~7 tiles in the reference screenshots
    (lazy-loaded grid); the port renders all 69 posts statically — same content,
    longer page.
12. Font preload warnings in headless Chrome ("preloaded but not used within a
    few seconds") on text-light pages; harmless.

## Human-only cutover steps

1. Un-archive the GitHub repo; push `webflow-port` and merge to `main` (CI in
   `.github/workflows/main.yaml` builds and deploys to Pages; `public/CNAME` is
   `shorebird.dev`).
2. Verify the Pages deployment on its `*.github.io` URL, including `/jobs`
   (iframe needs https) and `/terms`, `/privacy`.
3. Point DNS for `shorebird.dev` from Webflow to GitHub Pages; re-enable the
   custom domain + HTTPS in the Pages settings.
4. Decide on HubSpot chat and the Unify tag (not ported); decide whether the
   Loops newsletter forms should keep the Webflow-era `userGroup` values.
5. Optionally submit the new sitemap in Search Console; the OG images and
   canonical URLs are unchanged in shape (`https://shorebird.dev/<path>/`).
6. Delete `webflow-export/` when no longer needed as the reference.

## Not resolved

- No fallback for the Gem iframe when framing is blocked.
- No end-to-end test of the Loops submissions (guide form, newsletter blocks).
