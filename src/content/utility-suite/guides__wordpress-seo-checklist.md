---
url: /asteris-utility-suite/guides/wordpress-seo-checklist
title: "WordPress SEO Checklist (2026) — 30 Steps for a New Site"
description: "WordPress SEO checklist for 2026: 30 actionable steps covering technical foundations, on-page optimization, schema, sitemaps, AI-era surfaces (llms.txt, IndexNow, AI bot management), and Core Web Vitals."
og_title: "WordPress SEO Checklist — 30 Steps for 2026"
og_description: "From plugin install to llms.txt — every step a new WordPress site should run through."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-seo-checklist
primary_keyword: wordpress seo checklist
secondary_keywords:
  - wordpress seo audit
  - wordpress seo steps
  - new wordpress site seo
  - wordpress launch checklist
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/modules/seo-ai
  - /asteris-utility-suite/guides/how-to-add-schema-to-wordpress
  - /asteris-utility-suite/guides/wordpress-meta-description-guide
  - /asteris-utility-suite/guides/llms-txt-for-wordpress
verified_date: 2026-06-04
---

# WordPress SEO Checklist (2026)

**What's on a complete WordPress SEO checklist in 2026?** 30 steps across six categories: (1) technical foundations, (2) plugin setup, (3) on-page optimisation, (4) schema + sitemaps, (5) the AI-era surfaces (llms.txt, IndexNow, AI bot management), and (6) ongoing measurement. The first 10 take an hour; the rest are ongoing. This checklist applies to a new WordPress site at launch; for an existing site, work through it in the same order treating each step as "audit + fix" rather than "set up from scratch".

This is the condensed action list. For depth on any step, link out to the relevant sub-guide.

---

## A. Technical foundations (1-hour setup)

### 1. Use HTTPS everywhere

Get a free Let's Encrypt cert (most hosts auto-provision). HTTPS is a Google ranking signal and a baseline trust requirement. Verify with [SSL Labs](https://www.ssllabs.com/ssltest/) — aim for A+.

### 2. Set canonical URLs

Decide whether your site lives at `https://example.com` or `https://www.example.com` (or `http://...` — but you fixed that in step 1). Set the canonical in WordPress → Settings → General. Set up a redirect from the non-canonical to the canonical at the server level.

### 3. Configure permalinks

Settings → Permalinks → set to **Post name** (`/%postname%/`). This is the standard SEO-friendly URL structure. If you're on a different structure already and the site has rankings, **don't change it** — the redirects cost more than the new structure gains.

### 4. Set timezone + date format

Settings → General → set to your operating timezone. Affects `lastmod` in sitemaps and `datePublished`/`dateModified` in schema.

### 5. Disable search-engine deterrence

Settings → Reading → confirm **"Discourage search engines from indexing this site"** is **NOT** checked. (Common mistake when copying a staging site to production.)

### 6. Set up `robots.txt`

By default WordPress generates a minimal `robots.txt`. Customise it to **allow all** unless you have a specific reason to block. Add a `Sitemap:` line pointing to your sitemap. AI bot management goes here too — see step 22.

---

## B. SEO plugin setup

### 7. Install an SEO plugin

Pick one: **Asteris SEO + AI** (AI layer + bundled), **Yoast** (deepest content analysis), **RankMath** (free + feature-rich), **AIOSEO**, **SEOPress**. Activate. [Comparison →](/asteris-utility-suite/wordpress-seo/#how-to-choose-a-wordpress-seo-plugin)

### 8. Configure title + meta description templates

Set sitewide templates per post type:

- Single posts: `%post_title% — %site_title%`
- Pages: `%page_title% — %site_title%`
- Archives: `%archive_title% — %site_title%`

Customise per-post when the template doesn't fit.

### 9. Set the site identity (Organization or Person)

In your SEO plugin's settings, declare whether the site represents an Organization or a Person. Add logo, address (if local business), and same-as links (LinkedIn, Twitter, etc.). This populates Organization or Person schema.

### 10. Connect Google Search Console + Bing Webmaster Tools

Both are free. Verify ownership (DNS TXT record or HTML file upload). Submit your XML sitemap. Search Console is the single most important monitoring tool.

---

## C. On-page optimisation (per page)

### 11. Title tag — under 60 chars

Front-load the primary keyword. Make a human want to click. Avoid keyword-stuffing.

### 12. Meta description — under 160 chars

Summarise the page. Include the primary keyword. Make it click-worthy. [Full guide →](/asteris-utility-suite/guides/wordpress-meta-description-guide/)

### 13. URL slug — short and descriptive

`/how-to-add-schema-to-wordpress` beats `/2026/06/04/heres-everything-you-need-to-know-about-how-to-add-schema-to-wordpress-comma-a-comprehensive-guide`. WordPress auto-generates from the title; override for clarity.

### 14. Single H1 per page

The H1 should match user intent. Often (but not always) identical to the title tag.

### 15. Logical H2/H3 hierarchy

No skipping levels (don't go H1 → H3). No orphan H4s with no H3 parent. Headings communicate document structure to search engines and assistive tech.

### 16. Image alt text

Every meaningful image needs `alt="..."` describing what the image shows. Decorative images get `alt=""` (empty but present). Asteris's [Accessibility scanner](/asteris-utility-suite/modules/accessibility/) flags missing alt text in real-time.

### 17. Internal linking

Link to 3-5 related pages from every new post. Link to the new post from 1-3 existing pages. Internal linking distributes authority and helps users.

### 18. External links to authoritative sources

Cite where claims come from. Use `rel="noopener"` on external links opening in new tabs.

---

## D. Schema + sitemaps

### 19. Add Article schema to every blog post

Most SEO plugins do this automatically once you've set the site identity (step 9). [Schema implementation guide →](/asteris-utility-suite/guides/how-to-add-schema-to-wordpress/)

### 20. Add FAQPage schema to pages with Q&A content

The FAQ accordion appearance in Google SERPs comes from FAQPage schema. Adds visual prominence in the SERP.

### 21. Add HowTo schema to step-by-step content

How-to guides (this checklist included) qualify for HowTo schema, which can render with step markers in the SERP.

### 22. Submit XML sitemap to Google Search Console + Bing Webmaster Tools

Your SEO plugin generates the sitemap; you submit it. [Sitemap guide →](/asteris-utility-suite/guides/wordpress-sitemap-guide/)

---

## E. The AI-era surfaces (the new layer)

### 23. Ship `llms.txt`

Generate it manually or with [Asteris SEO + AI's llms.txt generator](/asteris-utility-suite/modules/seo-ai/). [Full guide →](/asteris-utility-suite/guides/llms-txt-for-wordpress/)

### 24. Decide your AI bot policy

In `robots.txt`, allow citation-class crawlers (ChatGPT-User, OAI-SearchBot, PerplexityBot, Anthropic-AI). Decide whether to allow or block training-class crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot). [GEO guide →](/asteris-utility-suite/guides/what-is-generative-engine-optimization/)

### 25. Set up IndexNow

Asteris's SEO module wires this automatically. Bing + Yandex use it natively; some other engines adopting. Pushes content changes immediately instead of waiting for the crawler.

### 26. Write definitional openers

The first sentence of every page should answer the page's primary question directly. AI assistants extract these disproportionately.

---

## F. Performance + measurement

### 27. Optimise Core Web Vitals

Pass LCP <2.5s, INP <200ms, CLS <0.1. [Asteris Performance module →](/asteris-utility-suite/modules/performance/) handles most of this — fetchpriority on LCP, lazy loading, caching, Speculation Rules.

### 28. Compress + WebP/AVIF every image

[Asteris Image Optimisation →](/asteris-utility-suite/modules/image-optimisation/) does this automatically.

### 29. Set up redirects for any URL change

Never delete a redirect that's getting traffic. [Redirects guide →](/asteris-utility-suite/guides/wordpress-redirects-guide/)

### 30. Monitor in Search Console + GA4

Watch which queries you show for, which click through, and which AI referrers send traffic. Adjust monthly.

---

## What this checklist deliberately omits

- **Backlink building** — out of scope for on-page checklists; addressed separately
- **Content strategy** — what to write about; addressed in your editorial planning
- **Keyword research at scale** — use Ahrefs / Semrush / DataForSEO; Asteris's keyword tools cover the in-WordPress portion
- **Local SEO depth** — separate playbook for local businesses

---

## Frequently asked questions

**What's on a WordPress SEO checklist for 2026?**
30 steps across technical foundations, plugin setup, on-page optimisation, schema, sitemaps, the AI-era surfaces (llms.txt, IndexNow, AI bot management), and ongoing measurement.

**How long does the full WordPress SEO setup take?**
The first 10 technical-foundation steps take ~1 hour. Plugin setup adds 30 minutes. On-page optimisation is ongoing per post. The AI-era surfaces add 30 minutes with the right plugin. Plan for ~3 hours of initial setup, then ongoing per-post effort.

**Do I need to do all 30 steps?**
For a new commercial site, yes. For a hobby blog, the first 15-20 cover the high-leverage work. Skipping steps 23-26 (the AI-era surfaces) means missing the differentiated visibility AI search is increasingly mediating.

**What's the single most important step?**
Long-term: step 17 (internal linking) — compounds over the life of the site. Short-term: steps 7-10 (SEO plugin + Search Console + sitemap submission) — without these, Google takes longer to index changes.

---

[WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [SEO + AI module →](/asteris-utility-suite/modules/seo-ai/) · [Schema guide →](/asteris-utility-suite/guides/how-to-add-schema-to-wordpress/) · [llms.txt guide →](/asteris-utility-suite/guides/llms-txt-for-wordpress/)
