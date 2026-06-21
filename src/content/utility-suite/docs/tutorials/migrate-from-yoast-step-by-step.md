---
title: "Migrate from Yoast to Asteris step-by-step"
description: "End-to-end Yoast SEO → Asteris migration in ~30 minutes. One-click importer preserves titles, meta descriptions, schema, redirects, focus keywords. Includes verification, sitemap resubmit, parallel-running window, and Yoast wind-down checklist."
sidebar:
  order: 2
---

# Migrate from Yoast to Asteris step-by-step

**Goal:** within ~30 minutes (active work; plus a 30-day verification window), switch your site's SEO module from Yoast (free or Premium) to Asteris's SEO + AI Suite without losing rankings, breaking existing redirects, or causing downtime.

**Asteris modules used:** SEO + AI Suite (paid tier — Starter / Pro / Agency)

**The reassuring fact:** Asteris's Yoast importer preserves every Yoast field that's visible to a search engine — titles, meta descriptions, focus keywords, Open Graph + Twitter Card overrides, canonical URLs, noindex/nofollow flags, primary categories, schema markup type, redirects (Yoast Premium), and breadcrumb config. Google ranks on the URL + on-page signals — not on which plugin emits the tags. Migration is safe when done correctly.

---

## Before you start

You need:

- A site with **Yoast SEO** (free or Premium) installed and currently configured
- A **paid Asteris Utility Suite licence** (the SEO + AI Suite module is paid)
- Admin access to WP Admin + Google Search Console
- ~30 minutes of active work + a 30-day passive verification window
- Optional: a staging URL (Asteris can be tested there first if you're paranoid)

**Make a backup first.** Even though this is a metadata-only migration that doesn't touch content, anything that modifies the database carries some risk. From Asteris → Backups → **Run Backup Now**, or your existing backup tool (UpdraftPlus etc.).

---

## Step 1 — Install Asteris Utility Suite (if not already)

If Asteris is already installed (free or paid), skip to step 2.

For a fresh install:

1. **Plugins → Add New → Upload Plugin** → upload the Asteris ZIP from your asteriscommerce.com customer portal
2. **Activate**
3. **Asteris → Licence** → paste licence key → **Activate**

Asteris and Yoast can coexist — they don't conflict at the plugin level. Don't deactivate Yoast yet.

---

## Step 2 — Activate the SEO + AI Suite module

WP Admin → **Asteris → Modules** → toggle **SEO + AI Suite** to ON.

The SEO + AI submenu appears. A docked sidebar appears in every editor — but Yoast is still emitting the actual meta tags right now. We'll switch the active emitter in step 6.

---

## Step 3 — Configure Asteris's site-wide settings to mirror Yoast's

Open Yoast → **Settings → General** in one tab. Open Asteris → **SEO + AI → General** in another.

Mirror these values from Yoast to Asteris:

| Yoast field | Asteris equivalent |
|---|---|
| Site title (used in title templates) | Auto-populated from WP Settings → General; verify it matches what Yoast was using |
| Tagline | Auto-populated from WP Settings → General |
| Knowledge Graph type — Person or Organization | Asteris → General → Site Identity → pick Person or Organization (must match Yoast's choice) |
| Logo | Same logo URL (Asteris reads from Site Identity panel) |
| Title separator (·, –, |, —) | Asteris → General → Templates → Separator (pick the same character Yoast was using) |
| Default title format per post type | Asteris → General → Templates → per-post-type (e.g., `%post_title% – %site_title%`) |
| Default meta description format | Asteris → General → Templates → Description per post type |

This step takes 5 minutes. The values are all visible — copy from one panel to the other.

---

## Step 4 — Run the Yoast importer

**Asteris → SEO + AI → Tools → Import**

1. Source: **Yoast SEO**
2. Click **Run Import**
3. Wait ~30 seconds (longer for sites with 10,000+ posts)
4. Review the import summary

The importer carries over:

- ✓ Post / page / custom-post-type titles (`_yoast_wpseo_title` → Asteris title field)
- ✓ Meta descriptions (`_yoast_wpseo_metadesc` → Asteris description)
- ✓ Focus keywords (`_yoast_wpseo_focuskw` → Asteris primary keyword)
- ✓ Open Graph titles + descriptions + images (`_yoast_wpseo_opengraph-*`)
- ✓ Twitter Card overrides (`_yoast_wpseo_twitter-*`)
- ✓ Canonical URLs (`_yoast_wpseo_canonical`)
- ✓ Noindex / nofollow flags
- ✓ Primary category settings
- ✓ Schema markup type per post
- ✓ **Redirects** (Yoast Premium only — `_yoast_wpseo_redirect`)
- ✓ Breadcrumb configuration
- ✓ XML sitemap inclusions / exclusions

After the importer runs, every post + page on your site has Asteris-side SEO data alongside the Yoast-side data. Both plugins now have everything they need to emit identical tags.

---

## Step 5 — Spot-check 10 important URLs

Don't skip this. Verify the importer worked before activating Asteris's output.

Pick your 10 most important URLs:

- Homepage
- 3 highest-traffic blog posts
- 3 highest-converting pages (pricing, demo, signup)
- 3 SEO-critical landing pages

For each one:

1. Open in a private window (so caching doesn't interfere)
2. **View Source** (Ctrl-U / Cmd-Option-U)
3. Search for `<title>` — note the value
4. Search for `<meta name="description"` — note the value
5. Search for `<script type="application/ld+json"` — note the schema type

These are Yoast's current outputs. Now open the Asteris SEO sidebar in the editor for the same post. Verify Asteris has matching values:

- Title field — should match `<title>` from view source
- Description field — should match `<meta name="description">`
- Schema type — should match the imported value

**If any URL is missing data:**

1. Check that Yoast actually had data for that URL (some posts might use Yoast's defaults — those don't import per-post, they live in Yoast's settings, which we mirrored in Step 3)
2. Re-run the importer (it's idempotent — safe to run multiple times)
3. If still missing, manually copy from Yoast's sidebar to Asteris's sidebar for that post

Don't proceed to Step 6 until your 10 URLs are verified.

---

## Step 6 — Switch the active emitter to Asteris

This is the cutover. Two ways to do it; pick one.

### Option A — "Take over from active SEO plugin" (recommended)

**Asteris → SEO + AI → General → "Take over from active SEO plugin (Yoast detected)"** → toggle ON.

Asteris registers at WordPress hook priority 1; Yoast still runs but at priority 10. WordPress hooks run in priority order, so Asteris emits first. Yoast's tags are then suppressed by Asteris's filter.

Effect:

- ✓ The browser sees Asteris's tags
- ✓ Yoast's settings + data stay intact in the database (easy rollback)
- ✓ Yoast is still "active" so its other features (e.g., dashboard widget) still appear, but its SEO output is suppressed

This is the safer choice for the first 30 days.

### Option B — Deactivate Yoast entirely

**Plugins → Deactivate** Yoast.

Asteris immediately becomes the sole emitter.

Riskier — if anything goes wrong, you need to reactivate Yoast to fall back. Use Option A unless you're confident.

---

## Step 7 — Verify front-end output once more

Refresh the 10 test URLs from Step 5 in a private window. View Source. Verify:

- `<title>` — now emitted by Asteris, content matches expectations
- `<meta name="description">` — Asteris-emitted, content matches
- `<script type="application/ld+json">` — schema is now Asteris's format (slightly different from Yoast's; both pass Google Rich Results Test)
- **NO duplicate Yoast tags** — if Yoast is still active (Option A), confirm its tags are suppressed (Asteris's takeover filter is working)

If you see duplicate or stale tags:

1. Hard-refresh the page (Cmd-Shift-R / Ctrl-Shift-R) — your browser may have cached
2. Clear any caching plugin (WP Rocket / LiteSpeed Cache / W3 Total Cache) — manually purge
3. Clear CDN cache (Cloudflare → Purge Everything)
4. Re-test

---

## Step 8 — Submit the new sitemap to Google Search Console

Asteris emits its own sitemap at `/asteris-sitemap.xml`. Yoast was emitting at `/sitemap_index.xml`. Submit the new one alongside the old:

1. Open [Google Search Console](https://search.google.com/search-console)
2. **Sitemaps** → enter `asteris-sitemap.xml` → **Submit**
3. **Keep the existing Yoast sitemap submitted** for 30 days (parallel indexing — won't hurt; Google deduplicates URLs)
4. Bing Webmaster Tools — same flow

After 30 days of clean Asteris operation, return to GSC and:

1. Remove `sitemap_index.xml` from the Sitemaps list
2. The old Yoast sitemap will start returning 404 (since Yoast is being suppressed) — that's fine, Google notices and drops it

---

## Step 9 — Monitor for 30 days

This is the verification window. Watch:

### Google Search Console

- **Coverage report** — page impressions + clicks for top URLs. Compare to the 30 days BEFORE the migration. Should be flat.
- **Sitemaps report** — Asteris's sitemap should show URLs discovered + indexed
- **Mobile usability + Core Web Vitals** — unchanged (Asteris doesn't change page rendering, only meta output)

### Manual searches

Search Google for branded queries (`yoursite.com brand name`). The SERP snippet should still display correctly (title + meta description + breadcrumbs).

Search for your 5 highest-traffic non-branded queries. Position should be flat. Small fluctuations (±2 positions) are normal Google noise; large drops would indicate a real issue.

### Asteris's own metrics

- **Asteris → SEO + AI → AI Traffic Tracker** — if you enabled it, watch for AI assistant referrals
- **Asteris → SEO + AI → Tools → Importer status** — should show "Successful import, no pending items"

If everything looks flat across the 30 days, you're done. The migration succeeded.

If you see a rank drop > 3 positions on multiple top URLs:

1. Re-check the meta output for those URLs (View Source)
2. Check Asteris → SEO + AI → Sidebar for those URLs — verify field-by-field that the data matches what Yoast had
3. If a specific field is empty in Asteris but was populated in Yoast, manually copy it
4. **Don't roll back yet** — many drops self-correct as Google recrawls; give it another 2 weeks

If 6 weeks in you still see a drop, roll back (Step 11).

---

## Step 10 — Deactivate Yoast (after 30 clean days)

After 30 days of clean data:

1. **Plugins → Deactivate** Yoast
2. Asteris's "Take over from active SEO plugin" toggle (Step 6 Option A) becomes irrelevant — Yoast isn't there to take over from
3. **Keep Yoast installed-but-inactive for another 30 days** as ultimate insurance

After 60 days total of clean operation:

1. **Plugins → Delete** Yoast
2. The migration is complete

---

## Step 11 — If something goes wrong (rollback)

If you need to rollback during the 30-day verification:

### If you used Option A (takeover toggle):

1. **Asteris → SEO + AI → General → "Take over from active SEO plugin"** → toggle OFF
2. Yoast's tags immediately re-emit
3. Clear all caches
4. You're back where you started

### If you used Option B (deactivated Yoast):

1. **Plugins → Activate** Yoast
2. Yoast's data is still in the database (untouched by the importer — it only reads)
3. Toggle Asteris's takeover toggle OFF (or deactivate Asteris's SEO module)
4. Clear all caches
5. You're back where you started

Rollback takes 30 seconds. The migration is recoverable for the entire 30-day verification window.

---

## Common issues

### "I had Yoast Premium with redirects. Did those import?"

Yes — Yoast Premium's redirects (`_yoast_wpseo_redirect` entries) import to Asteris's Redirects manager. After import, verify:

**Asteris → SEO + AI → Redirects** → should show all your Yoast Premium redirects.

### "I had Yoast's 'content analysis' data (the green/orange/red scores). Did those import?"

Not directly — those scores are computed on demand by Yoast's algorithm. Asteris has its own analyser with different scoring. Your actual SEO data (titles, meta, schema, keywords) imports cleanly; the scores get recomputed by Asteris's analyser when you next edit a post.

You won't lose any *real* SEO data. You will lose visual continuity (red posts in Yoast might be green in Asteris, or vice versa).

### "I had Yoast Local SEO (the LocalBusiness add-on). Did that import?"

Partial. Asteris's SEO + AI module ships with LocalBusiness schema, but Yoast Local SEO's location-specific fields don't have a 1:1 mapping. After import, manually verify:

1. **Asteris → SEO + AI → Schema → Site Identity** → if you're a local business, set type to **LocalBusiness**
2. Fill the address, opening hours, geo coordinates, accepted payment types from your Yoast Local SEO data

### "Will switching the sitemap URL hurt indexing?"

No — Google's sitemap discovery is `robots.txt` → `Sitemap:` directive. Asteris updates `robots.txt` to point at `asteris-sitemap.xml`. Google re-reads `robots.txt` daily and re-fetches the sitemap. Indexing continues uninterrupted.

The old Yoast sitemap URL will 404 after Yoast is deactivated — Google notices and drops it from the Sitemaps list within ~2 weeks.

### "I have a CDN. Do I need to do anything special?"

After Step 6 (cutover) and Step 7 (verify), purge your CDN cache. Otherwise old Yoast-emitted pages stay cached at the edge until TTL expires, which can be hours.

- **Cloudflare:** Caching → Purge Everything
- **Bunny:** Pull zones → Purge cache
- **CloudFront:** Invalidations → Create invalidation → `/*`

After the cache purge, edge visitors get the new Asteris-emitted output.

---

## See also

- [SEO + AI Suite module configuration](/asteris-utility-suite/docs/modules/seo-ai/)
- [Migrate from Yoast — marketing-side walkthrough](/asteris-utility-suite/migrate/from-yoast/)
- [Asteris vs Yoast comparison](/asteris-utility-suite/vs/yoast/)
- [WordPress SEO pillar guide](/asteris-utility-suite/wordpress-seo/)
