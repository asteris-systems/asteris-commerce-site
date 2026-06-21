---
url: /asteris-utility-suite/modules/analytics-pixels
title: "WordPress Analytics Plugin — Asteris Analytics + Pixels (GA4, Meta CAPI, Consent Mode v2)"
description: "Asteris Analytics + Pixels is a WordPress analytics plugin covering GA4, Google Tag Manager, Google Ads conversions, Meta Pixel + Conversions API, TikTok, Pinterest, LinkedIn, Microsoft Clarity, and Consent Mode v2 — bundled with 10 other modules."
og_title: "Asteris Analytics + Pixels — GA4 + Every Pixel That Matters"
og_description: "GA4, GTM, Meta Pixel + CAPI, TikTok, Pinterest, LinkedIn, Clarity. Consent Mode v2. Not gated to a Pro tier."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/analytics-pixels
primary_keyword: wordpress analytics plugin
secondary_keywords:
  - wordpress google analytics plugin
  - meta pixel conversions api wordpress
  - consent mode v2 wordpress
  - monsterinsights alternative
  - pixelyoursite alternative
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: analytics
internal_links_out:
  - /asteris-utility-suite/vs/monsterinsights
  - /asteris-utility-suite/migrate/from-monsterinsights
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Analytics Plugin — Asteris Analytics + Pixels

**What does a WordPress analytics plugin do?** Two jobs: (1) **wire your analytics tags** correctly so events fire reliably (GA4 page-views, conversions, custom events), and (2) **handle privacy compliance** so consent banners don't break tracking. Most "WordPress analytics plugins" focus on Google Analytics (MonsterInsights, Site Kit). A handful go broader and wire multiple ad pixels (PixelYourSite, Pixel Caffeine). Almost none cover the **Conversions API** layer that Meta, TikTok, and Google now require for accurate tracking with iOS 14+ and ad-blockers.

**Does Asteris wire Meta Pixel + the Conversions API together?** Yes — both. The browser Pixel and the server-side Conversions API send the same events with the same `event_id`, which Meta de-duplicates. This is the modern correct setup; MonsterInsights doesn't support CAPI in any tier.

**Does Asteris support Consent Mode v2?** Yes — Google Consent Mode v2 (the version Google made effective March 2024 for EEA traffic) and Meta's Limited Data Use mode. Both wire automatically when a supported consent management platform (CMP) is detected, or via a manual JavaScript hook. **Both are in the free tier** — compliance baseline shouldn't be gated to paid.

---

## The complete feature set

### Google stack

- **GA4** — Measurement ID setup, page-view tracking, custom events (free tier)
- **Google Tag Manager** — container snippet, dataLayer pushes for standard events (free tier)
- **Google Consent Mode v2** — auto-wires with major CMPs (Cookiebot, OneTrust, Iubenda, CookieYes, Complianz) or via manual JS hook (free tier)
- **Google Ads** — conversion linker + conversion event setup (paid tier)
- **Enhanced ecommerce events** — when [Asteris for WooCommerce](https://asterisforwoocommerce.com) is also installed, full WC event coverage (view_item, add_to_cart, begin_checkout, purchase, refund) (paid tier)

### Meta (Facebook + Instagram)

- **Meta Pixel** — browser-side standard events (free tier)
- **Limited Data Use** — for California / GDPR / regional compliance (free tier)
- **Meta Conversions API (CAPI)** — server-side event delivery with `event_id` deduplication against the browser Pixel (paid tier)
- **Custom audience setup** (paid tier)

### TikTok

- **TikTok Pixel** — browser-side events
- **TikTok Events API** — server-side delivery (the CAPI equivalent)
- Custom event mapping

### Other ad platforms

- **Pinterest Tag** + conversion API
- **LinkedIn Insight Tag**
- **Twitter / X Pixel**

### Analytics + behaviour

- **Microsoft Clarity** — heatmaps + session recordings
- **Custom event recipes** — pre-built event configurations for common interactions (file download, scroll depth, video play, form submission, outbound link click)

### Consent + privacy

- **Consent Mode v2** auto-wiring
- **Meta Limited Data Use**
- **Manual JS API** for custom consent solutions
- **Per-script consent gates** — block specific pixels until consent given
- **Cookie audit** report — surfaces what cookies the site is setting

### Anti-blocking + accuracy

- **Server-side Meta CAPI** survives ad-blockers (browser Pixel blocked → server still sends the event)
- **Server-side TikTok Events API** — same
- **Event ID deduplication** between browser + server so events don't double-count

---

## What this module does NOT do

- **GA4 reports inside WP Admin.** MonsterInsights and Site Kit render GA4 reports inside the WordPress dashboard. Asteris doesn't — we point you to Google Analytics directly. If admin-side reporting is the feature you use, MonsterInsights is the better tool.
- **Custom dimension management at scale.** Asteris wires standard events and a configurable set of custom events. For agency-level multi-property custom dimension orchestration, Google Tag Manager + GA4 directly is the right tool.
- **Funnel analysis / cohort analysis / dashboarding.** Use GA4's native reports or a BI tool.

---

## Frequently asked questions

**What is the best WordPress analytics plugin?**
For free GA4 + WP-Admin reports: **Google Site Kit**. For paid GA4 + WP-Admin reports + WooCommerce ecommerce: **MonsterInsights Pro**. For GA4 + Meta CAPI + every other pixel + Consent Mode v2 in one plugin: **Asteris Analytics + Pixels** (in Asteris Starter at $149/yr with 10 other modules).

**Does Asteris support Meta Conversions API?**
Yes — server-side CAPI with `event_id` deduplication against the browser Pixel. The modern correct setup for iOS 14+ and ad-blocker resilience.

**Does Asteris support Consent Mode v2?**
Yes — auto-wires with Cookiebot, OneTrust, Iubenda, CookieYes, and Complianz. Manual JS hook for custom CMPs.

**Will I lose GA4 history if I switch to Asteris?**
No — GA4 history lives in Google's servers. Switching the WordPress plugin that *sends* events to Google has no effect on what's already stored. [Migration walkthrough →](/asteris-utility-suite/migrate/from-monsterinsights/)

**Can I see analytics reports inside WP Admin?**
Not at v1.0. Asteris points you to Google Analytics directly. If admin-side reporting is the feature you need, MonsterInsights Pro or Site Kit are the better tools.

**Does this replace PixelYourSite?**
For most cases, yes — Asteris covers Meta Pixel + CAPI, TikTok, Pinterest, LinkedIn, and Google Ads. PixelYourSite has more depth in some niche configurations (specific event mapping for some platforms); for a typical WP site, Asteris covers it.

---

[Asteris vs MonsterInsights →](/asteris-utility-suite/vs/monsterinsights/) · [Migrate from MonsterInsights →](/asteris-utility-suite/migrate/from-monsterinsights/) · [Pricing →](/asteris-utility-suite/pricing/)
