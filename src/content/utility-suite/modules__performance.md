---
url: /asteris-utility-suite/modules/performance
title: "WordPress Caching Plugin — Asteris Performance (Safe Defaults, Speculation Rules, CWV Monitor)"
description: "Asteris Performance is a WordPress caching plugin with safe defaults that don't break page builders, plus modern techniques: fetchpriority on LCP, Speculation Rules, Early Hints, field-data Core Web Vitals monitor. Bundled with 10 other modules."
og_title: "Asteris Performance — Caching + Modern Optimization for WordPress"
og_description: "Safe defaults. Speculation Rules. Early Hints. fetchpriority. Field-data CWV. Won't break Elementor, Bricks or Divi."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/performance
primary_keyword: wordpress caching plugin
secondary_keywords:
  - wordpress core web vitals plugin
  - wordpress speculation rules
  - wordpress lcp optimization
  - wordpress lazy load plugin
  - wp rocket alternative
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: performance
internal_links_out:
  - /asteris-utility-suite/vs/wp-rocket
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Caching Plugin — Asteris Performance

**Will a caching plugin break my page builder?** Not with Asteris's **safe-defaults profile**. Aggressive optimisations that break Elementor, Bricks, Beaver Builder, or Divi (CSS combine, async CSS, JS delay, link preload on logged-in pages) are **opt-in only** — never auto-enabled. The defaults turn on what's universally safe: page caching, browser cache headers, script defer, image preconnect, lazy loading, and `fetchpriority` on your LCP image.

**Can a plugin improve Core Web Vitals from real-user (field) data?** Yes — Asteris's Performance module includes a **CrUX-based field-data Core Web Vitals monitor** that reports LCP, INP, and CLS for your site's real users, not just lab-data Lighthouse scores. Field data is what Google ranks on; lab data is a proxy.

---

## The complete feature set

### Caching

- **Page caching** — full-page HTML cache (filesystem + optional memory layer)
- **Browser cache headers** — `Cache-Control` + `Expires` on static assets
- **Object cache integration** — Redis, Memcached, or default (transparent)
- **Cache purge rules** — on post save, comment, plugin/theme update, custom hooks
- **Per-URL exclusions** — cart, checkout, account, custom paths
- **Logged-in user bypass** — admins see uncached versions; the rest of the world sees fast cached versions

### Asset optimization

- **Script defer / async** with **builder-aware exclusions** (Elementor / Bricks / Beaver / Divi scripts auto-excluded from delays)
- **CSS minification** (per-file opt-in)
- **JS minification** (per-file opt-in)
- **CSS combine** (opt-in with warnings — known to conflict with some builders)
- **JS delay** (opt-in with warnings — known to break some plugins until first interaction)
- **Critical CSS generation** (above-the-fold inline CSS for faster first paint)
- **Image preconnect** to CDN domains

### Modern Web Vitals techniques

- **`fetchpriority="high"` on the LCP image** — explicitly tells the browser to prioritise the largest above-the-fold image
- **Speculation Rules** — `<script type="speculationrules">` declarations to prerender pages on hover/touchstart (Chromium-only currently)
- **Early Hints (103)** — when the host supports it (Cloudflare, Fastly, some Apache/Nginx configs), pushes a 103 Early Hints response so the browser can start preloading critical resources before the main response arrives

### Field-data CWV monitor

- Pulls CrUX (Chrome User Experience report) data via the Chrome UX API
- Reports **LCP, INP, CLS** at the URL level for your site's real users
- Highlights URLs failing the "good" thresholds (LCP <2.5s, INP <200ms, CLS <0.1)
- Trend over 28 days

### Image-side coordination

The Performance module coordinates with the [Image Optimisation module](/asteris-utility-suite/modules/image-optimisation/) — when both are active, image preconnect + WebP/AVIF serving + lazy load + fetchpriority on LCP work together without conflict.

### WC-aware (when Asteris for WooCommerce is also installed)

- Never cache cart, checkout, my-account, or order-confirmation pages
- Auto-purge on order status change, stock change, cart change
- Builder-aware exclusions extend to WC-specific scripts (cart fragments, etc.)

---

## What this module does NOT do

- **Database optimization** (post revision cleanup, transient cleanup, etc.) — use a dedicated tool like WP-Optimize. We don't bundle it because it's a different competency.
- **Image conversion** — that lives in the [Image Optimisation module](/asteris-utility-suite/modules/image-optimisation/).
- **CDN provisioning** — Asteris configures *integration with* a CDN; we don't sell CDN bandwidth.

---

## Frequently asked questions

**Will Asteris caching break my page builder?**
Not with the default profile. Aggressive optimisations (CSS combine, JS delay) are opt-in only with explicit warnings of which builder each conflicts with.

**Does Asteris support Speculation Rules and Early Hints?**
Yes — both. Speculation Rules prerender pages on hover (Chromium browsers). Early Hints push 103 responses when your host supports it (Cloudflare, Fastly, recent Apache/Nginx).

**How is this different from WP Rocket?**
Asteris ships **safe defaults that don't break sites**, **modern techniques** (Speculation Rules, Early Hints, fetchpriority on LCP), and a **field-data CWV monitor** — all things WP Rocket either doesn't ship yet or auto-enables in a way that breaks page builders. WP Rocket ships database optimisation + auto-applied managed-WP-host compatibility profiles that Asteris doesn't yet. [Full comparison →](/asteris-utility-suite/vs/wp-rocket/)

**Can Asteris improve Core Web Vitals?**
Yes — the field-data monitor reports your site's real LCP, INP, and CLS, and the optimisations above directly target the metrics. The plugin doesn't *guarantee* good CWV (a slow host or a heavy theme can still tank scores) — but it gives you the tools and visibility.

**Should I run Asteris Performance alongside another caching plugin?**
No — running two caching plugins simultaneously causes conflicts. Pick one.

---

[Asteris vs WP Rocket →](/asteris-utility-suite/vs/wp-rocket/) · [Pricing →](/asteris-utility-suite/pricing/)
