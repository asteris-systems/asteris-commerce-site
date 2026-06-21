---
url: /asteris-utility-suite/guides/wordpress-redirects-guide
title: "WordPress Redirects Guide — 301, 302, 410 (Plugin vs htaccess vs Server)"
description: "How to set up WordPress redirects: 301 (permanent) vs 302 (temporary) vs 410 (gone), plugin-based vs server-level, bulk import, and how to avoid redirect chains that hurt SEO."
og_title: "WordPress Redirects Guide"
og_description: "301, 302, 410. Plugin vs htaccess vs server. Avoid chains. Bulk import."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-redirects-guide
primary_keyword: wordpress redirects
secondary_keywords:
  - wordpress 301 redirect
  - wordpress redirect plugin
  - htaccess redirect wordpress
  - redirect old urls wordpress
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/modules/seo-ai
verified_date: 2026-06-04
---

# WordPress Redirects Guide

**What is a WordPress redirect?** A redirect tells the browser (and search engines) that a URL has moved — the server returns a redirect status code instead of the page, and the browser follows the redirect to the new URL. The most common types are **301 (permanent)** for URLs that have moved for good, **302 (temporary)** for temporary moves, and **410 (gone)** for URLs that have been deleted and won't return.

**When do I need a WordPress redirect?** Three scenarios cover 95% of cases: (1) **changing a URL slug** on an existing post or page (always 301 the old URL to the new), (2) **deleting content** that has inbound links or rankings (301 to the most relevant remaining page, or 410 if there's no good destination), (3) **changing site structure** (consolidating categories, switching from `/blog/post-name` to `/post-name`, switching domains).

**Will redirects hurt SEO?** Not when used correctly. A clean 301 preserves ~99% of the original URL's ranking authority. Where redirects hurt SEO is in two failure modes: **redirect chains** (URL A → B → C → D, where each hop loses a bit and Google may stop following after 5) and **redirect loops** (A → B → A — infinite, the page never loads). Avoid both.

---

## 301 vs 302 vs 307 vs 410

| Code | Meaning | When to use |
|---|---|---|
| **301** Moved Permanently | The resource has permanently moved | Default for any URL change you're not going to undo |
| **302** Found (temporary) | Temporary redirect | A/B testing, geo-redirects, temporary maintenance |
| **307** Temporary Redirect | Like 302 but preserves HTTP method | Modern equivalent of 302; preferred for API redirects |
| **308** Permanent Redirect | Like 301 but preserves HTTP method | Modern equivalent of 301; preferred for API redirects |
| **410** Gone | The resource was deleted and won't return | When you've deleted content with no good replacement; tells Google to drop the URL from the index |
| **451** Unavailable for Legal Reasons | Resource removed due to legal demand | Rare; consider if you're DMCA-removed |

**For SEO purposes:** use **301** for permanent URL changes (preserves link equity) and **410** for deletions (faster de-indexing than 404).

---

## How to set up WordPress redirects

### Option A: SEO plugin (recommended for most)

Most SEO plugins include a redirects manager. Asteris SEO + AI, Yoast Premium, RankMath, AIOSEO Pro all have one.

**Asteris:** WP Admin → **Asteris → SEO + AI → Redirects** → Add new → Source URL → Destination URL → Redirect type (301/302/307/308/410) → Save.

**Features in plugin redirects managers:**

- Bulk import via CSV
- Regex/wildcard patterns (`/old-blog/(.*)` → `/blog/$1`)
- Hit-count tracking (see which redirects are getting used)
- Automatic redirect-on-slug-change (when you edit a post's slug, plugin offers to add the redirect)
- Redirect-chain detection (warns when A → B and B → C creates a chain)

### Option B: Dedicated redirect plugin

Redirection (free) and Safe Redirect Manager (free) are dedicated redirect plugins. Both are competent if you don't have an SEO plugin with redirects.

### Option C: `.htaccess` (Apache)

Edit `/.htaccess` in your WordPress install root:

```apache
# Permanent redirect — single URL
Redirect 301 /old-page /new-page

# Permanent redirect — entire path with regex
RedirectMatch 301 ^/old-blog/(.*)$ /blog/$1

# 410 Gone
Redirect 410 /removed-page
```

**Pros:** server-level, fastest performance (no PHP execution). **Cons:** harder to manage at scale, no admin UI, requires SFTP/SSH access.

### Option D: Nginx config

If your host runs Nginx, redirects go in the server block:

```nginx
location = /old-page {
    return 301 /new-page;
}

location ~ ^/old-blog/(.*)$ {
    return 301 /blog/$1;
}
```

Same pros/cons as `.htaccess`.

### Option E: WordPress functions / theme `functions.php`

```php
add_action( 'template_redirect', function() {
    if ( is_404() && $_SERVER['REQUEST_URI'] === '/old-page' ) {
        wp_redirect( home_url( '/new-page' ), 301 );
        exit;
    }
});
```

Works but doesn't scale well; use a redirect manager.

---

## Avoid these redirect mistakes

### Redirect chains

A → B → C is a chain. Each hop costs:

- A small amount of link equity (~1% per hop, per most SEO studies)
- A small amount of crawl budget (Google may stop following after 5 hops)
- Page load time for the user

**Fix:** when you create a new redirect that targets an already-redirected URL, point the new redirect at the **final destination** directly. Asteris's redirects manager auto-detects chains and offers to flatten.

### Redirect loops

A → B → A — infinite. The browser shows "ERR_TOO_MANY_REDIRECTS". The plugin/server should detect these on save, but always test after adding new redirects.

### 302 instead of 301 for permanent moves

302 is temporary. Google may keep the old URL indexed longer because the move is signalled as temporary. Use 301 for anything permanent.

### Redirecting everything to the homepage

When deleting old content with no good replacement, redirecting to the homepage is *worse* than letting the URL 404 (or returning 410). Mass redirects to homepage are treated as soft-404s by Google and dilute the homepage's relevance signals.

### Not redirecting `http://` to `https://`

If you've moved to HTTPS but didn't add a sitewide 301 from `http://` to `https://`, search engines see two versions of every URL. Configure at the server or host level.

---

## Bulk imports

For large redirect sets (e.g. migrating from a different CMS or domain change):

1. Export current URLs from old system
2. Map each to a new URL in a spreadsheet (CSV: `source,destination,type`)
3. Import via your redirects plugin's CSV upload
4. Test 10-20 redirects manually before going live

Asteris's redirects manager supports CSV import.

---

## Frequently asked questions

**What is the difference between 301 and 302 redirects?**
**301** is permanent — tells search engines the move is for good, transfers ~99% of link equity. **302** is temporary — used for A/B tests, geo-redirects, or temporary maintenance. Use 301 by default for anything you're not going to undo.

**Will redirects hurt my SEO rankings?**
Not when done correctly. A clean 301 preserves ~99% of original URL's authority. Where redirects hurt SEO is in chains (each hop costs a little equity) and loops (infinite, page never loads).

**How do I add a 301 redirect in WordPress without a plugin?**
Edit `.htaccess` (Apache) or your Nginx server block. For one-off redirects, this is fine. For more than ~10 redirects, a plugin is materially easier to manage.

**What is the difference between 301 and 410?**
**301** says "moved permanently to X". **410** says "deleted, gone, don't ask again". Use 301 when there's a relevant new URL; use 410 when the content is gone with no replacement — 410 de-indexes faster in Google than letting the URL 404.

**Do redirects slow my site down?**
A single 301 adds ~50-200ms (the round-trip to the server). Chains compound this. Server-level redirects (`.htaccess`, Nginx) are faster than plugin-based redirects (which involve PHP execution). For high-traffic sites, server-level redirects are noticeably faster.

---

[WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [SEO + AI module →](/asteris-utility-suite/modules/seo-ai/) · [SEO Checklist →](/asteris-utility-suite/guides/wordpress-seo-checklist/)
