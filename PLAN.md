# Port shorebird.dev from Webflow back to Astro

Goal: stand up the existing Astro site in this repo (the "bones"), backfill
everything that was authored on Webflow since Jan 2026, and restyle it so it
looks near-identical to the live Webflow site. Do **not** replicate Webflow's
lazy-loading / jQuery / Swiper behaviour — plain Astro + Tailwind + React
islands, same as before.

Rules for every agent:

- Work only in this repo. Local commits are fine. **Never push.**
- Don't touch Webflow (read-only API use only; never publish/update/delete).
- Run `npm run build`, `npm run format`, `npm run cspell` before each commit.
- Reference material lives in `webflow-export/` (see Phase 0). Prefer it over
  re-fetching. Live site is `https://shorebird.dev` if you need to look.
- Keep the existing component structure and file layout. Add, don't rewrite.

## Ground truth (what differs between repo and live)

| Area            | Repo (Jan 2026)                                                                            | Live Webflow (Sep 2026)                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Blog posts      | 39 in `src/content/blog`                                                                   | 69 in CMS. 5 slugs renamed: `1.0→1`, `dart-3.5.0→dart-3-5-0`, `flutter-3.32-release→flutter-3-32-release`, `growing→shorebird-is-growing`, `building-great-developer-tools→building-good-software` |
| Success stories | 8                                                                                          | 10 (`scapia`, `vetc` new). CMS adds `industry`, `company-size`, `website-url` fields                                                                   |
| Pages           | `/`, `/about`, `/pricing`, `/jobs`, `/blog`, `/success-stories`, `/legal/dpa`, `/privacy`, `/terms/*`, `/contact`, `/newsletter-signup` | Same, plus **`/product/code-push`**, **`/product/shorebird-ci`**, **`/code-push-guide`**. `/legal/dpa` → `/dpa`. `/terms/ci`, `/terms/code-push` gone (verify) |
| Homepage        | Old hero "Deliver instant updates"                                                         | New sections: "Build Flutter apps with confidence", "An opinionated platform for building", "Enterprise-scale infrastructure", customer quotes, etc. |
| Design          | Old palette/layout                                                                          | New tokens (below), General Sans, light + dark surfaces                                                                                                |
| Blog metadata   | title/description/author/date/cover                                                        | + `article-intro`, `reading-time`, `shared-image` (OG), `seo---title`, `seo---meta-description`, `highlight-article`, Author is a reference           |

Webflow design tokens (from `shorebird.webflow.shared.*.css`):

```
surface-1 #ffffff / dark #0d1117     text-1 #0d1117 / dark #f8f8f9
surface-2 #f6f6f7 / dark #161c25     text-2 #5a6066 / dark #909aa3
surface-3 #faf6f3 / dark #1e2733     border  #00000014 / dark #ffffff1a
brand primary  solid #79c0ff  soft #e0f1ff
brand secondary solid #d49bff soft #f2e0ff
button primary gradient #916ebb → #425ea3, white text
container padding 1.5rem mobile / 3.5rem desktop
font: General Sans (public/fonts/GeneralSans)
```

## Phase 0 — Export (run once, before agents start; needs Webflow MCP)

Produce `webflow-export/` in the repo (commit it; it's the source of truth):

- `cms/blogs.json`, `cms/success-stories.json`, `cms/authors.json`,
  `cms/reviews.json`, `cms/logos.json`, `cms/teams.json` — raw
  `list_collection_items` output, all pages (site id `694e589e299270321119525e`,
  blog collection `696386798ae9c71635fed478`, success stories
  `696403bea4559c9c354e00a9`, authors `69724297af61d38ff721dfe2`, reviews
  `694e5d40028af33128ed2496`, logos `6960f768b8a3f81c4c87088d`, teams
  `69629e2d2a0dce5f45b0ed61`).
- `pages/<slug>.html` — `curl -L` of every non-CMS URL in the live sitemap
  (home, about, pricing, jobs, blog index, success-stories index, product/\*,
  code-push-guide, dpa, privacy, terms, design-system/styleguide).
- `css/shorebird.webflow.css` — the live stylesheet.
- `screenshots/<slug>-{desktop,mobile}.png` — full-page screenshots of each
  live page (use the `browse` skill). These are the visual targets.

## Phase 1 — Foundations (two agents, in parallel, on `main`)

**1A. Content import** (script-driven; write `scripts/import_webflow.py`,
stdlib only like the existing `blog_to_csv.py`)

- Convert every blog item to `src/content/blog/<slug>.md`. HTML→Markdown
  (headings, paragraphs, lists, links, `<pre><code>` → fenced blocks, images,
  bold/italic, blockquotes). Keep Webflow slugs as canonical.
- Rename the 5 drifted repo files to the Webflow slugs; add redirects from the
  old slugs in `astro.config.mjs`.
- For posts that exist in both, prefer the repo Markdown (hand-written, has
  cSpell hints) but update frontmatter from the CMS.
- Extend the blog schema in `src/content/config.ts`: `intro?`, `readingTime?`,
  `ogImage?`, `seoTitle?`, `seoDescription?`, `highlight?`. Author stays a
  string key; map CMS author ids → existing keys (`eseidel`, …) via
  `authors.json`, adding new authors to wherever authors are defined
  (`src/layouts/blog.astro` / `src/components/blog`).
- Download every referenced `cdn.prod.website-files.com` image into
  `src/assets/blog/<slug>/` (covers into `src/assets/blog/covers/`) and rewrite
  paths. No hotlinking.
- Same for success stories → `src/content/success-stories/<slug>.md`; add
  `industry`, `companySize`, `website` to the schema; add `scapia`, `vetc`.
- Write `src/data/{reviews,logos,team}.json` from the CMS for the homepage /
  about page to consume.
- Add any new words to `.cspell.yaml`; `npm run cspell` must pass.

**1B. Design system** (owns `src/styles/global.css`, `tailwind.config.ts`,
`src/components/ui/navbar.tsx`, `src/components/ui/footer.astro`,
`src/components/ui/button.tsx`, `src/layouts/main.astro`)

- Encode the tokens above as CSS variables + Tailwind theme (light + dark via
  `prefers-color-scheme`, matching Webflow).
- Restyle nav (links: Product ▾ [Code Push, Shorebird CI], Pricing, Success
  stories, Blog, About, Jobs; CTAs), footer, buttons, typography scale, section
  spacing, container widths to match the Webflow screenshots.
- Add the Plausible + LinkedIn pixel snippets from the live `<head>` to
  `main.astro` (Plausible script id is in `webflow-export/pages/home.html`).
- Other agents must not edit 1B's files; they compose from them.

## Phase 2 — Pages (parallel agents, each in its own worktree branch; do not

edit files owned by 1B — if you need a token or shared component, note it in
your final report instead)

Each agent: read the target screenshot + exported HTML, restyle the existing
Astro page/components to match, verify at desktop and ~400px widths with the
`browse` skill against `npm run dev`, commit.

- **2A Homepage** — `src/pages/index.astro` + `src/components/home/*`. Port the
  Webflow section order and copy. Reuse `hero-motion`, `brands` (from
  `logos.json`), `testimonials` (from `reviews.json`), `faq`, pricing overview.
- **2B Product pages + guide** — new `src/pages/product/code-push.astro`,
  `src/pages/product/shorebird-ci.astro`, `src/pages/code-push-guide.astro`.
  Build from homepage components where possible; new components go under
  `src/components/product/`.
- **2C Blog** — `src/pages/blog/index.astro` (highlight article + grid + any
  category/filter UI Webflow has), `src/layouts/blog.astro` (author, reading
  time, cover, prose styling via `@tailwindcss/typography`, code block
  styling), `rss.xml.ts` fields.
- **2D Success stories** — index + `src/layouts/success-story.astro` with the
  new industry/company-size/website sidebar.
- **2E Pricing, About, Jobs, legal** — `pricing.astro` (+ calculator/plans
  components), `about.astro` (team from `team.json`), `jobs.astro`, `dpa`
  (move from `/legal/dpa` to `/dpa`, redirect old), `privacy`, `terms`.
  Verify whether `/terms/ci` and `/terms/code-push` still exist on Webflow; if
  not, redirect them to `/terms`.

## Phase 3 — Integration + QA (one agent, serial, on `main`)

- Merge the Phase 2 branches; resolve conflicts; `npm run build` clean.
- `astro.config.mjs` redirects: old blog slugs, `/legal/dpa`, dropped terms
  pages, anything else in the old redirect list that still applies.
- Crawl `dist/` for broken internal links and missing images.
- Every URL in `webflow-export/live_urls.txt` must resolve in `dist/` (or via
  redirect) — except `/design-system/styleguide`, which we drop.
- Side-by-side screenshot pass of every page vs `webflow-export/screenshots`;
  write `PORT_REPORT.md` listing remaining visual diffs, ranked.
- Remove the archival notice from `README.md`; delete `blog_export.csv` and
  `scripts/blog_to_csv.py` (one-way Webflow tooling, no longer needed).
- CI (`.github/workflows/main.yaml`) already builds + deploys to GitHub Pages;
  leave as-is. DNS cutover from Webflow to Pages is a human step, out of scope.

## Out of scope tonight

- Pixel-perfect animation parity, Swiper carousels (use `marquee` / CSS).
- Dark mode if Webflow doesn't actually ship it on the live site (check
  `prefers-color-scheme` in the exported CSS before spending time on it).
- Any push, deploy, or DNS change.
