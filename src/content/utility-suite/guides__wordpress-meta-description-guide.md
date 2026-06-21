---
url: /asteris-utility-suite/guides/wordpress-meta-description-guide
title: "WordPress Meta Description Guide — Length, Format, Examples (2026)"
description: "WordPress meta descriptions appear under the title in Google search results. This guide covers ideal length (under 160 chars), what to include, common mistakes, and how to write meta descriptions that drive clicks."
og_title: "WordPress Meta Description Guide"
og_description: "Length, format, examples. How to write meta descriptions that drive clicks in 2026."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-meta-description-guide
primary_keyword: wordpress meta description
secondary_keywords:
  - meta description length
  - how to write meta description
  - meta description examples
  - wordpress meta description plugin
schema_type: Article
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/guides/wordpress-seo-checklist
  - /asteris-utility-suite/modules/seo-ai
verified_date: 2026-06-04
---

# WordPress Meta Description Guide

**What is a WordPress meta description?** A meta description is the **short summary** (typically 120-160 characters) that appears under the title in Google search results. It's set per page via the `<meta name="description" content="...">` tag in the HTML head. The meta description doesn't directly affect rankings, but it materially affects **click-through rate** — the same #1 ranking with a compelling description gets significantly more clicks than the same ranking with a generic one.

**How long should a WordPress meta description be?** **Under 160 characters** as a hard cap (Google truncates anything longer). The practical sweet spot is **120-155 characters** on desktop SERPs and around **120 characters** on mobile (mobile truncates earlier). Lead with the most important information in the first ~80 characters in case the rest gets cut.

**Does the meta description affect SEO rankings?** Not directly — Google has confirmed repeatedly that meta description content isn't a ranking signal. But it **indirectly** affects rankings: a higher click-through rate signals to Google that your result is relevant for the query, which correlates with maintaining or improving rankings over time.

---

## What to include

A good meta description has three components:

1. **The primary keyword** — naturally placed, ideally in the first half. Confirms to the searcher that the page covers their query.
2. **The value proposition** — what the user gets by clicking. "Learn how to...", "Step-by-step guide to...", "Free tool for...", "Compare 5 options for...".
3. **A subtle call-to-action** (optional but effective) — "Read the guide", "See pricing", "Start free".

### Examples

| Page | Strong meta description | Why |
|---|---|---|
| Pricing page | "Asteris pricing: Free on WP.org · Starter $149/yr (1 site) · Pro $349/yr (3 sites) · Agency $549/yr (10 sites). One standard price for everyone." | Specific numbers, comparison table, clear value hook |
| Module page | "Asteris SEO + AI is an AI SEO plugin for WordPress with llms.txt, AI bot blocker, IndexNow, schema, sitemaps, redirects, and one-click Yoast import." | Feature list, keyword + differentiation, migration angle |
| Guide page | "How to add schema markup to WordPress: which types matter, plugin vs manual JSON-LD, FAQ + HowTo + Article examples. Validation included." | Outcome-focused, structure preview, completeness signal |

### Weak descriptions

- "Welcome to our site. We are passionate about helping you succeed." — no keyword, no specifics, no reason to click
- "WordPress SEO best practices and tips for beginners and experts alike to improve their site." — keyword-stuffed, vague, no differentiation
- "Click here to learn more about our amazing product offerings and services." — clickbait without payoff

---

## How to set meta descriptions in WordPress

### Via your SEO plugin (recommended)

Asteris SEO + AI, Yoast, RankMath, AIOSEO, and SEOPress all add a meta description field in the post edit screen. Set per-post overrides; the plugin emits the meta tag automatically.

Sitewide template fallbacks: most plugins let you set a template like `%excerpt%` (uses the post excerpt) or `%page_title% – key insights and tips` for posts without a custom description.

### Via theme `functions.php` (not recommended)

If you don't want a plugin, you can emit the meta tag from your theme's `wp_head` hook. Most themes have this built in but it doesn't give per-post customisation in the editor UI.

### Don't rely on the auto-generated excerpt

WordPress's auto-excerpt grabs the first ~55 words of the post. This rarely makes a good meta description — too long, too narrative, no keyword density at the start. Always write a custom meta description for your top-traffic pages.

---

## Common mistakes

- **Letting Google write it** — Google sometimes ignores your meta description and synthesises one from page content. This happens more when your description doesn't match the user's query. The fix is writing a description that matches search intent for the page's primary keyword.
- **Duplicate descriptions across the site** — every page should have a unique meta description. Search Console flags duplicates in the Coverage report.
- **Stuffing keywords** — "WordPress SEO, WordPress SEO plugin, best WordPress SEO, WordPress SEO 2026..." reads as spam and Google may override it.
- **Ignoring mobile truncation** — front-load important content; mobile truncates around 120 characters.
- **Forgetting the homepage** — the homepage meta description is the one Google shows for your brand search. Make it count.

---

## Frequently asked questions

**What's the ideal meta description length for WordPress in 2026?**
120-155 characters. Hard cap is 160 (Google truncates anything longer). Front-load important info in the first 80 characters in case mobile truncates earlier.

**Does the meta description affect SEO rankings?**
Not directly. It affects click-through rate, which indirectly affects rankings over time. A compelling description on a #5 ranking can earn more clicks than a generic one on a #2.

**Will Google use my meta description verbatim?**
Usually yes; sometimes Google synthesises a different one from your page content (especially if your description doesn't match the user's specific query). To minimise overrides, write descriptions that match likely search intent.

**Should every page have a unique meta description?**
Yes — duplicates dilute relevance signals. Search Console flags duplicates in the Coverage report.

**Can I add emoji or special characters?**
Yes, but use sparingly. ★ ⭐ ✓ → render correctly. Heavy emoji can look spammy.

---

[WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [WordPress SEO Checklist →](/asteris-utility-suite/guides/wordpress-seo-checklist/) · [SEO + AI module →](/asteris-utility-suite/modules/seo-ai/)
