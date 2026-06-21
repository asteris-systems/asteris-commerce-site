---
url: /asteris-utility-suite/guides/wordpress-sitemap-guide
title: "WordPress Sitemap Guide — How to Create, Submit, and Optimize (2026)"
description: "A WordPress sitemap is an XML file listing every URL search engines should index. This guide covers how to create one (core, plugin, or manual), how to submit it to Google Search Console and Bing, and how to optimize it for faster indexing."
og_title: "WordPress Sitemap Guide"
og_description: "Create, submit, optimize. WordPress core sitemap vs SEO plugin sitemaps. Image, video, and news extensions."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-sitemap-guide
primary_keyword: wordpress sitemap
secondary_keywords:
  - wordpress xml sitemap
  - create sitemap wordpress
  - submit sitemap google search console
  - wordpress sitemap plugin
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/guides/wordpress-seo-checklist
  - /asteris-utility-suite/modules/seo-ai
verified_date: 2026-06-04
---

# WordPress Sitemap Guide

**What is a WordPress sitemap?** A WordPress sitemap is an **XML file** listing every URL on the site that should be indexed by search engines. It tells Google, Bing, and other crawlers (1) what URLs exist, (2) when each was last modified, and (3) optionally how important each is relative to others. Sitemaps are submitted to **Google Search Console** and **Bing Webmaster Tools** so search engines can discover content faster than they would by following links alone.

**Where is the WordPress sitemap located?** WordPress core generates a basic sitemap at `https://yoursite.com/wp-sitemap.xml` automatically (since WordPress 5.5). If you have an SEO plugin installed (Asteris, Yoast, RankMath, AIOSEO, SEOPress), it usually generates its own extended sitemap and deactivates the core one. Asteris's sitemap is at `/asteris-sitemap.xml`; Yoast's is at `/sitemap_index.xml`; RankMath's at `/sitemap_index.xml`.

**Do I need a sitemap if my site has good internal linking?** Yes — internal linking helps Google discover pages, but the sitemap is the **explicit declaration** of what should be indexed. Without one, Google may miss new pages for weeks (especially on low-traffic sites with weak crawl budget) or accidentally index pages you didn't want indexed.

---

## What's in a WordPress sitemap

A standard XML sitemap contains, per URL:

- `<loc>` — the canonical URL
- `<lastmod>` — when the page was last modified
- `<changefreq>` — optional, hint at update frequency (Google largely ignores this now)
- `<priority>` — optional, 0.0 to 1.0 (Google also largely ignores this)

A sitemap index can include sub-sitemaps for different content types: posts, pages, custom post types, categories, tags. Asteris and most plugins split by content type for clarity and to stay under per-sitemap URL limits (50,000 URLs per file, 50 MB uncompressed).

### Sitemap extensions

Beyond the basic XML sitemap, three extensions add specialised content:

- **Image sitemap** — lists images on the site so they can be indexed for Google Image Search
- **Video sitemap** — for pages with embedded video, surfaces video metadata for Google Video Search
- **News sitemap** — for news sites with sufficient publication volume, surfaces news articles for Google News (requires Google News inclusion)

Asteris, Yoast Premium, and RankMath Pro support all three. Free plugins typically cover image sitemaps; video and news are usually paid features.

---

## How to create a WordPress sitemap

### Option A: WordPress core (basic)

WordPress 5.5+ generates `/wp-sitemap.xml` automatically. It includes posts, pages, custom post types, taxonomies, and user archives. **Pros:** zero configuration, always up-to-date. **Cons:** no image/video extensions, no per-post-type exclusions, no priority/changefreq control.

For a personal blog or simple site, the core sitemap is sufficient. For commercial sites, an SEO plugin sitemap is better.

### Option B: SEO plugin (recommended)

Install Asteris SEO + AI, Yoast, RankMath, AIOSEO, or SEOPress. Each generates its own sitemap with:

- Per-post-type inclusion/exclusion
- Image extension
- Per-URL priority control
- Custom post type support
- Excluded URL patterns (e.g. exclude `/cart/` from being indexed)
- Sitemap index splitting by content type

Asteris's sitemap is at `/asteris-sitemap.xml`. Configure inclusion rules at **Asteris → SEO + AI → Sitemap**.

### Option C: Manual XML

If you have a specific need WordPress and plugins can't meet (custom URL patterns, external content), you can generate XML manually and serve it from your theme. Rare. Most sites don't need this.

---

## How to submit a sitemap to Google Search Console

1. Sign in to [Google Search Console](https://search.google.com/search-console)
2. Add and verify your site (DNS TXT record or HTML file upload)
3. Sidebar → **Sitemaps**
4. Enter the sitemap URL (just the path: `asteris-sitemap.xml` or `wp-sitemap.xml`)
5. Click Submit

Google will fetch the sitemap within minutes, then re-fetch periodically. The Sitemaps panel shows "Discovered URLs" and "Indexed URLs" counts.

**Also submit to Bing Webmaster Tools:** [bing.com/webmasters](https://www.bing.com/webmasters/). Same process. Bing indexes faster than Google for new sites.

---

## How to optimize a WordPress sitemap

### Include what should be indexed; exclude what shouldn't

- **Include:** posts, pages, top-level taxonomies (categories, tags) you want in search results
- **Exclude:** author archives (usually thin), date archives (usually thin), search results pages, `?` query parameter URLs, login/admin URLs

Asteris's sitemap settings let you exclude per content type.

### Set `lastmod` accurately

Google uses `lastmod` to decide whether to re-crawl. If `lastmod` is wrong (e.g. always showing today's date), Google ignores it. If it's accurate, Google prioritises recently changed pages.

### Use IndexNow for fast indexing

IndexNow is a protocol that pushes URL change notifications immediately to search engines (currently Bing, Yandex, and others adopting) — much faster than waiting for crawler discovery. Asteris's SEO + AI module wires this automatically.

### Don't include canonicalised duplicates

If page A canonicals to page B, only page B should be in the sitemap. Including both confuses crawlers.

### Don't include noindex pages

If a page is marked noindex, leaving it in the sitemap signals confusion to Google. Either index it or remove it from the sitemap.

---

## Frequently asked questions

**Where is the WordPress sitemap?**
WordPress core generates a sitemap at `/wp-sitemap.xml`. SEO plugins generate their own at `/asteris-sitemap.xml` (Asteris), `/sitemap_index.xml` (Yoast / RankMath), or similar. Visit the URL directly to verify.

**Do I need to submit a sitemap to Google?**
Google can crawl your site without a sitemap if internal linking is good, but submitting accelerates discovery and gives you the Coverage report in Search Console — worth the 2 minutes.

**How often is the sitemap updated?**
Plugin sitemaps update in real-time as content changes. The core WordPress sitemap regenerates on every cron run.

**Do sitemaps affect rankings?**
Not directly. They affect *discovery* and *indexing speed* — both prerequisites for ranking. A page not in the sitemap and not internally linked may never be indexed at all.

**What's the difference between an XML sitemap and an HTML sitemap?**
**XML sitemaps** are machine-readable, submitted to search engines. **HTML sitemaps** are human-readable pages listing all site URLs — useful for navigation on very large sites but not what search engines parse. Different tools for different purposes.

---

[WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [SEO Checklist →](/asteris-utility-suite/guides/wordpress-seo-checklist/) · [SEO + AI module →](/asteris-utility-suite/modules/seo-ai/)
