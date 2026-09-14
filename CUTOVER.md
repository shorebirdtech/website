# Cutover checklist: Webflow → Astro

Burn-down for taking `shorebird.dev` off Webflow and serving it from this repo.
Hosting target is Cloudflare (Pages or Workers static assets — undecided);
GitHub Pages is what the old CI workflow targets and is not the plan. Nothing
here is done until its box is checked.

## 1. Before we touch DNS

- [ ] **Export Webflow's 301 redirect rules.** Webflow does not expose them in
      the site export or the MCP tools we used. Two ways:
  - Site settings → Publishing → 301 Redirects: copy the table by hand.
  - Data API v2:
    `curl -H "Authorization: Bearer $WEBFLOW_TOKEN" https://api.webflow.com/v2/sites/694e589e299270321119525e/redirects`
    (needs a site token with `sites:read`).
  - Add every rule to `astro.config.mjs` `redirects` **and** to a
    `public/_redirects` file (Cloudflare reads it and returns real 301s; Astro's
    static redirects are meta-refresh stubs, which search engines treat as
    weaker). Consider generating `_redirects` from the config so there is one
    source of truth.
  - Then re-check the list once more on cutover day — anyone can add a rule in
    Webflow between now and then.
- [ ] **Everything else Webflow keeps in Site Settings rather than content.**
      None of this is in the CMS/page export; it was inventoried on 2026-09-14
      via the API where possible and must be re-checked by hand in the Webflow
      dashboard on cutover day (Site settings → General, Publishing, Forms,
      Custom code, SEO, Integrations):
  - Custom code (verified via API): site-level head = Plausible
    (`pa-KkCTgCak2h0t6JBTj3Tgm`) + Unify tag; footer = LinkedIn insight
    (`8654276`) + HubSpot (`js-na2.hs-scripts.com/246912764.js`). Plausible +
    LinkedIn are ported; Unify + HubSpot are a decision (below). No registered
    scripts. Per-page custom code: not readable via API without page ids, but
    the rendered HTML in `../webflow-migration/webflow-export/pages/` contains
    whatever was there; re-fetch any page edited after 2026-09-13.
  - Forms (verified via API): 15 form instances, all one of two shapes
    (newsletter: `email` + `country` honeypot; guide: `firstName`, `lastName`,
    `Email`, `country`), every one POSTing to
    `https://app.loops.so/api/newsletter-form/clkle380400tojo0nmapdkds7` — the
    same URL our forms use. No Webflow email notifications, no form webhooks, so
    nothing to recreate; just confirm nobody added one later.
  - Webhooks (verified via API): none registered.
  - `robots.txt`: live is just `Sitemap: https://shorebird.dev/sitemap.xml`.
    Added `public/robots.txt` pointing at Astro's `sitemap-index.xml`. Check the
    dashboard for any disallow rules or `noindex` page settings added later.
  - SEO per page: titles/descriptions/OG were taken from the rendered HTML; the
    site-wide share image, favicon and webclip are ported. Any page-level
    `noindex`/canonical overrides live only in the page settings panel — scan
    the page list.
  - Domain/SSL settings, password-protected pages, localization: none in use
    (locales disabled; verify nothing was added).
  - Assets served from `cdn.prod.website-files.com` that other properties link
    to: docs and console reference none (checked). Grep marketing emails / Loops
    templates / social posts for `website-files.com` before the Webflow site is
    deleted — those URLs die with the site.
- [ ] **Content freeze + final delta pull.** The port's snapshot is from
      2026-09-13. Anything published in Webflow after that must be re-imported
      (`scripts/import_webflow.py --only blog,stories` against a fresh CMS
      export; it only regenerates bodies that still carry the "Converted from
      the Webflow CMS export" marker, so hand-edited posts are safe). Freeze
      Webflow edits the day of cutover.
- [ ] **Test every form for real** on a preview deploy, with a test address:
      footer newsletter (`/`, `/code-push-guide`), blog sidebar newsletter, Code
      Push guide download. All post to the same Loops endpoint Webflow used;
      confirm the contact shows up in Loops with the right `source`/`userGroup`.
- [ ] **Decide on HubSpot chat and the Unify website tag.** Both were on every
      Webflow page and were deliberately not ported. Plausible and the LinkedIn
      insight tag are ported. Script and keys are in
      `../webflow-migration/webflow-export/pages/home.html` if we want them.
- [ ] **Trailing slashes: decided, keep Astro's default** (`/blog/foo/`,
      canonical + `og:url` + sitemap already agree). Webflow served `/blog/foo`;
      Cloudflare redirects the slash-less form to the slash form automatically,
      so inbound links keep working. Verify one on the preview.
- [ ] **Sitemap & robots.** `dist/sitemap-index.xml` is generated; confirm the
      deployed host serves it and that no `robots.txt`/`noindex` from the
      preview environment leaks to production.
- [ ] **Console dependencies.** `/privacy/raw` and `/terms/raw` still serve
      JSON; confirm the console reads them from the new host (the `content`
      field of `/privacy/raw` no longer starts with the H1 — check nothing
      parses that).
- [ ] **DNS inventory for the apex move.** If the apex is moving to Cloudflare
      at the same time, list every record on `shorebird.dev` first (MX,
      SPF/DKIM/DMARC TXT, `docs`, `console`, `api`, `handbook`, download CDN,
      any verification TXTs) and recreate them before switching nameservers.
      Email is the one that hurts if missed.

## 2. Repo & CI

- [ ] Un-archive `shorebirdtech/website`; remove the archival notice (done in
      `README.md` on this branch).
- [ ] Open the PR from `webflow-port` (38+ commits; squash or not, your call).
      `npm run build`, `format:check`, `cspell`, `check:links` are green.
- [ ] Replace the GitHub Pages deploy job in `.github/workflows/main.yaml` with
      the Cloudflare deploy (Pages: `wrangler pages deploy dist`; Workers static
      assets: `wrangler deploy` with an `assets` binding). Keep the
      build/format/cspell/check-links job as the PR gate.
- [ ] Delete `public/CNAME` (GitHub Pages only). Add `public/_redirects`.
- [ ] Add a custom-404 check: Cloudflare Pages serves `dist/404.html`
      automatically; Workers needs `not_found_handling = "404-page"`.
- [ ] Delete the local `webflow-port-backup` ref once the PR is merged.

## 3. Preview deploy — verify on https before DNS

- [ ] `/jobs` Gem board renders (its CSP blocks `http://`, so this could not be
      verified locally).
- [ ] Every URL in `../webflow-migration/webflow-export/live_urls.txt` returns
      200 (or a 301 to a 200) — `scripts/check_links.py` covers the build; this
      is the hosted check.
- [ ] `www.shorebird.dev` → `shorebird.dev` 301, and HTTPS on both.
- [ ] Share previews: paste `/`, one blog post, one success story into Slack /
      LinkedIn post composer / X and check the image and title.
- [ ] Plausible receives events from the preview hostname (or add it as an extra
      domain temporarily).
- [ ] Spot-check home and pricing on a real phone.

## 4. Cutover day

- [ ] Content freeze in Webflow (tell whoever edits the blog).
- [ ] **Final refresh, right before deploy:** re-export the CMS collections
      (blogs `696386798ae9c71635fed478`, success stories
      `696403bea4559c9c354e00a9`, authors, reviews, logos, teams) into
      `../webflow-migration/webflow-export/cms/`, run
      `python3 scripts/import_webflow.py --only blog,stories,data`, review the
      diff (only new/changed CMS items should move), build, commit.
- [ ] Re-check the Webflow 301 list and Site Settings against the section-1
      inventory one last time.
- [ ] Deploy.
- [ ] Point `shorebird.dev` and `www` at Cloudflare. Watch for cert issuance.
- [ ] Do **not** delete the Webflow site. Unpublish it (or leave it on the
      `webflow.io` subdomain) for 30 days as a rollback.
- [ ] Watch 404s for a week (Plausible "404" goal or Cloudflare analytics) and
      add redirects for anything real.
- [ ] Google Search Console: resubmit the sitemap.

## 5. Afterwards

- [ ] Archive `../webflow-migration/` (Webflow snapshot, screenshots, comparison
      sheets, old CSV tooling) to Drive; nothing in the repo depends on it.
- [ ] Cancel the Webflow plan.
- [ ] Known, accepted differences from Webflow (see `PORT_REPORT.md`): no
      scroll-scrubbed Lottie / nav animation, CSS marquee instead of Swiper,
      styled code blocks in posts, success-story dates use `publish-date`,
      mobile 404 layout fixed rather than copied.
