---
url: /asteris-utility-suite/migrate/from-yoast
title: "Migrate From Yoast to Asteris (One-Click Importer, Rankings Safe)"
description: "Step-by-step: how to migrate from Yoast SEO to Asteris Utility Suite. One-click importer carries over titles, meta descriptions, schema, redirects, and focus keywords. Rankings are unaffected if metadata is preserved."
og_title: "Migrate From Yoast to Asteris — One-Click Importer"
og_description: "One-click Yoast importer preserves titles, meta, schema, redirects. Switching SEO plugins does not hurt rankings if metadata is preserved."
canonical: https://asteriscommerce.com/asteris-utility-suite/migrate/from-yoast
primary_keyword: migrate from yoast
secondary_keywords:
  - switch from yoast to
  - import yoast seo data
  - yoast to asteris
  - yoast seo migration
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/vs/yoast
  - /asteris-utility-suite/modules/seo-ai
  - /asteris-utility-suite/wordpress-seo
verified_date: 2026-06-04
---

# How to Migrate From Yoast to Asteris

**How do I migrate from Yoast to Asteris without losing my SEO settings?** Asteris ships a **one-click Yoast importer** that carries over titles, meta descriptions, schema settings, redirects, focus keywords, social card metadata, and breadcrumb configuration. Run the importer, verify your top 10 posts kept their metadata in a spot-check, then deactivate Yoast. Total time: ~15 minutes for most sites.

**Will switching SEO plugins hurt my rankings?** No — provided your titles, meta descriptions, and redirects are preserved. Google ranks the URL, not the plugin that emits the meta tags. Asteris's one-click importer is built to preserve every Yoast field that's visible to a search engine.

**Does Asteris import Yoast titles, meta descriptions and redirects?** Yes — all three, plus focus keywords, primary categories, social card overrides (Open Graph + Twitter Cards), schema markup configuration, breadcrumb structure, and the noindex/canonical settings per post.

**Is there a one-click Yoast importer?** Yes. Asteris → SEO + AI → Tools → Import from Yoast. One button, ~30 seconds for sites up to 10,000 posts.

---

## Before you start

You need:

- A running WordPress site with Yoast SEO (free or Premium) installed and configured
- Admin access to WP Admin
- ~15 minutes (mostly verification, not the import itself)
- A list of your 5-10 most important URLs to spot-check after import

**Make a backup first.** This is a metadata-only migration so the data risk is low, but it touches the postmeta table. Run a manual backup from Asteris → Backups, or from UpdraftPlus / your existing backup tool, before proceeding.

---

## Step-by-step

### 1. Install Asteris Utility Suite

- **Paid version (recommended for migration — full SEO module):** Upload from customer portal → enter licence key in **Asteris → License**
- **Free version:** Available on WordPress.org but the full SEO + AI module is paid-only

Asteris and Yoast can coexist — they don't conflict at the plugin level. Both can be installed simultaneously while you migrate.

### 2. Activate the SEO + AI module

WP Admin → **Asteris → Modules** → toggle **SEO + AI Suite** to ON. The SEO submenu appears under Asteris.

### 3. Configure Asteris's site-wide SEO settings to match Yoast's

Before importing per-post data, mirror your site-wide settings:

- **Title separator** (Yoast uses `·`, `-`, `|`, etc. by default)
- **Default meta description format**
- **Knowledge Graph entity type** (Person / Organization)
- **Default social card image**

In **Asteris → SEO + AI → General**, copy each value from your Yoast settings.

### 4. Run the Yoast importer

**Asteris → SEO + AI → Tools → Import**:

1. Select **Yoast SEO** as the source
2. Click **Run Import**
3. Wait ~30 seconds (longer for sites with >10,000 posts)
4. Review the import summary

The importer carries over:

- Post / page / custom-post-type titles (`_yoast_wpseo_title` → Asteris title field)
- Meta descriptions (`_yoast_wpseo_metadesc` → Asteris description)
- Focus keywords (`_yoast_wpseo_focuskw` → Asteris primary keyword)
- Open Graph titles + descriptions + images (`_yoast_wpseo_opengraph-*`)
- Twitter Card overrides (`_yoast_wpseo_twitter-*`)
- Canonical URLs (`_yoast_wpseo_canonical`)
- Noindex / nofollow flags
- Primary category settings
- Schema markup type per post
- Redirects (Yoast Premium only — `_yoast_wpseo_redirect`)
- Breadcrumb configuration
- XML sitemap inclusions / exclusions

### 5. Spot-check your 10 most important URLs

Open each of your 5-10 most important URLs in a private window. View source. Verify:

- `<title>` tag matches what Yoast emitted yesterday
- `<meta name="description">` is preserved
- `<meta property="og:*">` tags are preserved
- Schema JSON-LD (`<script type="application/ld+json">`) matches the expected type

If any URL doesn't match, **don't deactivate Yoast yet**. Open an issue at [support@asteriscommerce.com](mailto:support@asteriscommerce.com) with the URL and what's different.

### 6. Set Asteris as the active SEO plugin (Yoast steps aside)

Yoast and Asteris both add SEO meta tags. To avoid duplicates:

- In Yoast → **Settings → Tools**, do NOT use Yoast's "remove from front-end" toggle (it's destructive)
- Instead, in **Asteris → SEO + AI → General**, enable **"Take over from active SEO plugin (Yoast detected)"**
- This causes Yoast to defer to Asteris's meta output via WordPress hook priorities — Yoast's settings stay intact in case you want to roll back

### 7. Verify front-end output once more

After enabling Asteris's takeover, refresh a private-window view of your test URLs. Verify each meta tag is now emitted by Asteris (the format may have minor whitespace differences from Yoast — content matters, not whitespace).

### 8. Submit a fresh sitemap to Google Search Console

Asteris emits its own XML sitemap at `/asteris-sitemap.xml` (Yoast's was at `/sitemap_index.xml`). In Google Search Console → Sitemaps:

1. Submit `https://yoursite.com/asteris-sitemap.xml`
2. Keep the Yoast sitemap submitted for 30 days as a parallel index (won't hurt rankings — Google deduplicates URLs)

### 9. Deactivate Yoast (after 30 days of clean operation)

After 30 days of verified Asteris operation, deactivate Yoast in WP Admin → Plugins. Keep it installed-but-inactive for another 30 days. Then delete it.

This long horizon is paranoid by design. Yoast's data is your SEO history; treat it gently.

---

## Frequently asked questions

**Will switching SEO plugins hurt my rankings?**
No, provided your titles, meta descriptions, and redirects are preserved. Google ranks the URL based on the content + on-page signals — not on which plugin emits the meta tags. Asteris's one-click importer is built to preserve every Yoast field that Google sees.

**Does Asteris import Yoast titles, meta descriptions and redirects?**
Yes — all three, plus focus keywords, primary categories, Open Graph and Twitter Card overrides, canonical URLs, noindex/nofollow flags, schema settings, and breadcrumb configuration.

**Is there a one-click Yoast importer?**
Yes. Asteris → SEO + AI → Tools → Import → Yoast. One button. ~30 seconds for sites up to 10,000 posts.

**What if I have Yoast Premium with redirects and content analysis?**
Redirects import (Yoast Premium's redirect manager → Asteris's redirects). Content-analysis history (Yoast's "this post is green/orange/red" scores) doesn't import — those are computed live, and Asteris's analyser is different. You won't lose any actual SEO data.

**Can I roll back to Yoast if something goes wrong?**
Yes. Yoast's data stays untouched in the database (we read it, we don't delete it). If Asteris doesn't work for you within the first 14 days, deactivate Asteris, re-activate Yoast — you're back where you started. The 14-day refund applies.

**Will the focus keywords carry over to Asteris?**
Yes, as Asteris's primary keyword field. Asteris's keyword analysis is different from Yoast's (different scoring algorithm) but the keyword string itself imports cleanly.

**What about RankMath, AIOSEO, SEOPress?**
RankMath, AIOSEO, and SEOPress importers are on the v1.1 roadmap. For v1.0, Yoast is the only one-click importer. If you're on RankMath/AIOSEO/SEOPress, you can manually export-then-paste, but expect ~5-10 minutes per 100 posts.

---

[See the SEO + AI module →](/asteris-utility-suite/modules/seo-ai/) · [Yoast comparison →](/asteris-utility-suite/vs/yoast/) · [WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [Pricing →](/asteris-utility-suite/pricing/)
