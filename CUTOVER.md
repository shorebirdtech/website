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

- [ ] Content freeze in Webflow; final delta pull; deploy.
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
