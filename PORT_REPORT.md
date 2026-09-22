# Webflow → Astro port report

Branch `webflow-port` (2026-09-13/14). The Astro site in this repo now
reproduces the live Webflow site. The reference snapshot (CMS JSON, rendered
pages, CSS, assets, screenshots) and the side-by-side comparison sheets live
outside the repo in `../webflow-migration/`. `npm run build` emits 94 pages;
`format:check`, `cspell` and `check:links` are green.

## How to run

```
npm install
npm run dev            # http://localhost:4321
npm run build && npm run check:links
```

## What was ported

| Route                                             | Source                                                            | Status  | Notes                                                                                                                               |
| ------------------------------------------------- | ----------------------------------------------------------------- | ------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `/`                                               | `src/pages/index.astro`, `src/components/home/*`                  | Done    | Hero Lottie, logo marquee, benefits, enterprise, security, testimonials, FAQ, JSON-LD                                               |
| `/product/code-push`                              | `src/pages/product/code-push.astro`, `src/components/product/*`   | Done    | Arcade demo embed, Lottie motion                                                                                                    |
| `/product/shorebird-ci`                           | `src/pages/product/shorebird-ci.astro`                            | Done    | Sunset notice page, as live                                                                                                         |
| `/code-push-guide`                                | `src/pages/code-push-guide.astro`, `product/guide-form.tsx`       | Done    | Form posts to the same Loops endpoint as live, PDF in `public/guides/`                                                              |
| `/pricing`                                        | `src/pages/pricing.astro`, `src/components/pricing/*`             | Done    | Monthly/yearly toggle, comparison table, FAQ                                                                                        |
| `/about`                                          | `src/pages/about.astro`, `src/data/team.json`                     | Done    | Team from CMS `teams`                                                                                                               |
| `/jobs`                                           | `src/pages/jobs.astro`                                            | Done    | Gem job board iframe (blank on `http://localhost`, see diffs)                                                                       |
| `/blog`                                           | `src/pages/blog/index.astro`                                      | Done    | Highlight + latest + all 69 posts                                                                                                   |
| `/blog/<slug>` (69)                               | `src/content/blog/*.md`, `src/layouts/blog.astro`                 | Done    | 30 posts imported from CMS, 39 kept from repo (5 renamed to Webflow slugs), sidebar newsletter                                      |
| `/success-stories`                                | `src/pages/success-stories/index.astro`                           | Done    |                                                                                                                                     |
| `/success-stories/<slug>` (10)                    | `src/content/success-stories/*.md`, `layouts/success-story.astro` | Done    | `scapia`, `vetc` added; industry / company size / website sidebar                                                                   |
| `/dpa`, `/privacy`, `/terms`                      | `src/pages/{dpa.md,privacy/,terms/}`, `layouts/markdown.astro`    | Done    | `/legal/dpa`, `/terms/ci`, `/terms/code-push` redirect here; PDFs in `public/legal/`                                                |
| `/contact`                                        | `src/pages/contact.md`                                            | Done    | From the unpublished Webflow draft (created 2026-09-11); support / sales / billing / privacy contacts and the mailing address       |
| `/newsletter-signup`, `/demo`                     | —                                                                 | Removed | Pre-Webflow pages nothing linked to; `/demo` pointed at a personal Calendly. Removed 2026-09-15 so the port does not resurrect them |
| `404`                                             | `src/pages/404.astro`                                             | Done    | Copy/bird/layout from the Webflow utility page; mobile stacks instead of copying the live overflow                                  |
| `/rss.xml`, `/blog/rss.xml`, `/sitemap-index.xml` | `src/pages/*.ts`, `@astrojs/sitemap`                              | Done    | 69 RSS items, 94 sitemap URLs                                                                                                       |
| `/llms.txt`                                       | `public/llms.txt`                                                 | Done    | Copied from live 2026-09-21 (fixed its `/term` link); `/sitemap.xml` 301s to `/sitemap-index.xml`                                   |
| `/design-system/styleguide`                       | —                                                                 | Dropped | Webflow-internal page                                                                                                               |

Every URL in the live sitemap at export time
(`webflow-migration/webflow-export/live_urls.txt`) resolves in `dist/` except
the styleguide. Redirects (`astro.config.mjs`): 5 renamed blog slugs,
`/legal/dpa`, `/terms/ci`, `/terms/code-push`, `/success-stories/pushpress/`,
plus the pre-existing `/faq`, `/security`, `/talk-to-sales`, `/workshops`,
`/privacy.html`, `/terms.html`, `/jobs/full-stack-software-engineer`.

Head: `<title>`/description match the live pages; default share image is the
Webflow "shared image" (`public/open-graph.jpg`), posts use their CMS
`shared-image`, stories their cover; favicon/apple-touch-icon are the live ones;
Plausible + LinkedIn Insight tags are in `main.astro`.

## Theme model

`:root` is dark. `Section theme="light"` sets `data-theme="light"` on a
full-bleed band, which redefines the surface/text/border tokens inside it
(`src/styles/global.css`). The sticky navbar's theme is fixed per page: blog
pages pass `initialTheme="light"` to `<Navbar />`, everything else is dark. An
earlier version swapped the navbar theme to match the section scrolling under
it; the live site does not do that, so it was removed (2026-09-15). No
`prefers-color-scheme`. `<CtaBand />` + `<Footer />` are per-page. The
after-footer newsletter block and the blog-sidebar newsletter card were removed
from the live site in September 2026 and are not in the port.

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
   submitted end-to-end during the port. Webflow marked "Last name" required and
   "First name" optional; the port requires first name and marks last name
   optional instead (Loops only needs the email, and a required family name
   excludes people who have one name or whose name orders the other way).
8. **Forms elsewhere** — Webflow form success/error blocks are reproduced in
   React; HubSpot chat widget (`js-na2.hs-scripts.com/246912764.js`) and the
   Unify website tag (script and key in
   `webflow-migration/webflow-export/pages/home.html`) were intentionally not
   ported. Add to `src/layouts/main.astro` if wanted.
9. **`/terms` and `/privacy` on `astro preview`** — the pre-existing
   `/terms.html` → `/terms` redirect emits `dist/terms.html/index.html`, and
   Astro's preview server resolves `/terms` to that stub, producing a refresh
   loop. GitHub Pages resolves `/terms` to `dist/terms/index.html` (this config
   predates the Webflow move); use `/terms/` locally.
10. **Repo size** — `src/assets` grew from 62 MB to 68 MB (new covers, product
    and about imagery). Share images in `public/blog/og` are JPEG (6 MB, was 42
    MB as PNG) and the 65 MB Webflow snapshot was moved out of the repo with the
    branch history rewritten so neither ever landed in git.
11. **Blog index on live** captures only ~7 tiles in the reference screenshots
    (lazy-loaded grid); the port renders all 69 posts statically — same content,
    longer page.
12. Font preload warnings in headless Chrome ("preloaded but not used within a
    few seconds") on text-light pages; harmless.

## Human-only cutover steps

Superseded by `CUTOVER.md` (the live burn-down list). Hosting is expected to be
Cloudflare, not GitHub Pages; the GitHub Pages workflow and `public/CNAME` are
leftovers to replace. Headline items: export Webflow's 301 rules (not in any
export we have), content freeze + final delta import, test the Loops forms on a
real deploy, DNS inventory before moving the apex.

## Not resolved

- No fallback for the Gem iframe when framing is blocked.
- No end-to-end test of the Loops submission (Code Push guide form).
