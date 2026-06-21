---
url: /asteris-utility-suite/modules/insights
title: "WordPress Analytics Plugin — Asteris Insights (Cookieless, GDPR, with Cross-Module Annotations)"
description: "Asteris Insights is a first-party, cookieless WordPress analytics plugin with automatic cross-module annotations from Security, Performance, SEO, and Activity Log — so you see WHY your numbers moved, not just that they did. Sub-1KB beacon. WooCommerce revenue tracking. GDPR-defensible without a consent banner."
og_title: "Asteris Insights — Cookieless WordPress Analytics with Cross-Module Annotations"
og_description: "Sub-1KB beacon. No cookies, no consent banner, no third parties. Annotations from Security / Performance / SEO / Activity Log show WHY your numbers moved. Per-post inline column. Search Console correlation. WooCommerce revenue."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/insights
primary_keyword: cookieless wordpress analytics plugin
secondary_keywords:
  - wordpress analytics plugin
  - first party analytics wordpress
  - gdpr wordpress analytics
  - wordpress visitor tracking plugin
  - search console wordpress plugin
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: analytics
internal_links_out:
  - /asteris-utility-suite/modules/analytics-pixels
  - /asteris-utility-suite/modules/security
  - /asteris-utility-suite/modules/seo-ai
  - /asteris-utility-suite/vs/monsterinsights
  - /asteris-utility-suite/migrate/from-monsterinsights
  - /asteris-utility-suite/pricing
verified_date: 2026-06-11
---

# WordPress Analytics Plugin — Asteris Insights

**What is a cookieless WordPress analytics plugin?** A cookieless WordPress analytics plugin tracks visitors without setting cookies, without third-party services, and without writing to `localStorage`. It uses a **rotating-salt visitor hash** that changes every 24 hours, so individual visitors can't be re-identified across days — which is what makes the analytics **GDPR-defensible without a consent banner** in most jurisdictions. Asteris Insights is that plugin, plus the analytics dashboard, plus the cross-module wedge no other WordPress analytics tool ships.

**Can WordPress analytics work without a consent banner?** Yes — when the analytics is genuinely cookieless, doesn't write to `localStorage`, truncates IP addresses, and rotates the visitor identity salt every 24 hours. Asteris Insights does all four. That doesn't mean a banner is never required (CCPA, GDPR enforcement varies by Member State) — but the technical basis for the "no banner needed" claim is the same one Plausible and Fathom use, and we honor `Do Not Track`, `Global Privacy Control`, and a per-visitor `localStorage.asteris_optout` flag.

---

## The wedge: cross-module annotations on the time-series chart

This is what no other WordPress analytics plugin ships. Asteris Insights' time-series chart automatically annotates with events from every other Asteris module:

- **Security module** — WAF block spikes (>50 blocks/hr), brute-force lockouts
- **Performance module** — LCP regressions, CLS regressions (when shipped)
- **SEO + AI module** — Search Console click drops (>30% vs trailing 7-day average), indexing issues
- **Activity Log module** — plugin updates, theme switches, core updates, user role changes
- **Analytics + Pixels module** — Search Console connection events
- **Insights itself** — collection drop-in reinstalls, REST fallback events

So when your traffic dips on Tuesday, the annotation panel shows **🛡 Security: WAF block spike (812 in 1h) — Tue 09:14** right next to the dip — and you instantly know it was a bot attack, not a content problem.

MonsterInsights' equivalent feature ("Site Notes") is a **paid upgrade**, requires **manual entry**, and shows your own typed-in notes — not automatic signals from the rest of your stack. Plausible and Fathom don't have it at all because they're not embedded in your WordPress install. Independent Analytics doesn't have it because it doesn't know about your security plugin.

This is the single biggest reason customers move to Asteris from any other WordPress analytics plugin: their dashboard finally explains itself.

---

## The complete feature set

### First-party tracking (parity with Plausible / Fathom / Independent Analytics)

- **Cookieless by default** — no cookies, no localStorage writes, no third-party loads
- **Sub-1KB beacon** (~500 bytes gzipped) — defers, never blocks render, uses `navigator.sendBeacon()`
- **24-hour rotating salt** on the visitor hash — same Plausible-style identity model
- **IP truncation** (`/24` for v4, `/48` for v6) before storage
- **Bot filtering** via the Security module's curated 88-signature bot detector — vuln-scanner traffic rejected at the endpoint, good/scraper bots stored but flagged
- **Visitor opt-outs honored** — `Do Not Track`, `Global Privacy Control` (CA/CO law), `localStorage.asteris_optout=1`
- **Single opinionated dashboard** — 4-KPI hero strip (Visitors / Pageviews / Bounce / Avg session), 30-day time-series, Top Content / Entry / Exit page tabs, Devices / Browsers / OS donut tabs, Channels, Referrers, UTM Campaigns, Top Countries
- **Period-vs-previous comparison** on every hero KPI — % delta with arrow direction
- **Real-time tile** showing pageviews per minute for the last 30 minutes
- **Per-post inline analytics column** — 📊 column in `wp-admin/edit.php` for every public post type, showing 30-day views + bounce + avg duration per post. Independent Analytics and MonsterInsights have this. Plausible and Fathom **structurally cannot** because they're not WordPress-native.

### The cross-module layer (the differentiator)

- **"Why numbers moved" annotation panel** — automatic, reads from Activity Log
- **Vertical annotation markers** on the time-series chart at the right dates
- **Severity coloring** — info / medium / high
- **Forward-declared signal sources** — add a new Asteris module, its events appear here automatically

### Campaign attribution & UTM tracking (v2 — alpha.243)

- **Persistent UTM columns on every visit** — `utm_source`, `utm_medium`, `utm_campaign`, `utm_term`, `utm_content` written at landing and visible on every subsequent pageview + conversion in that session
- **First-touch attribution sticky across return visits** — visitor returns 3 weeks after their first Twitter-campaign landing and converts? The conversion still credits the original `utm_first_campaign`
- **UTM campaign performance table** — visits, bounce rate, conversions, revenue, channel — for every campaign you've ever tagged
- **UTM channel auto-classification** — GA4-aligned. `utm_source=twitter`, `t.co`, `x.com` all roll up into "Organic Social". Customizable via the `asteris_insights_channel_rule` filter.
- **Compare campaigns A/B view** — pick two campaigns from a dropdown, see visits / bounce / conversion rate / revenue side-by-side
- **UTM builder** — paste destination URL, fill source / medium / campaign, copy the result
- **Cohort retention** — visitors grouped by first-touch campaign with 7-day + 30-day return rates

### Search keywords — the dimension nothing else surfaces (v2)

- **Search Console keyword tile** — top queries by clicks, with impressions / CTR / average position. Updated daily via the existing SC OAuth.
- **Page-level keyword opportunity finder** — pages with high impressions but low CTR (≥200 impr, <4% CTR, position ≤20). Content-optimization candidates surfaced automatically.
- **WP internal site search capture** — `?s=foo` queries logged with result counts so you see what people are searching FOR on your site
- **Zero-result search annotation** — when an internal search returns zero results 5+ times in 24h, fires an annotation onto the chart (content-gap signal)

### AI assistant traffic — a tier nothing else has (v2)

- **AI-search referrer classification** — ChatGPT, Claude, Perplexity, Gemini, Copilot, You.com, Phind, Meta AI all detected from referrer host + classified as a dedicated "AI Search" channel (separate from Direct or Referral)
- **AI assistant traffic tile** — dashboard tile names which AI sent how many visitors
- **AI traffic spike annotation** — when ≥10 AI-assistant visits land in 24h, surfaces as an annotation marker
- **No competitor surfaces this** — MonsterInsights / Plausible / Fathom / Independent Analytics all bucket AI assistant traffic generically. We don't.

### Custom event tracking (v2)

- **Beacon JS API** — `window.asterisInsights.trackEvent('signup_started', {plan: 'pro', value: 49})` from anywhere in your front-end code
- **Joins to UTM session** — events automatically inherit the current visit's UTM attribution. "20 signups started this week, 14 from `utm_campaign=launch-week`" answers itself.
- **Cookieless still holds** — no localStorage writes, no fingerprinting, opt-outs (DNT, GPC, localStorage.asteris_optout) still honored

### Search Console correlation

- **🔎 Search Console tile** on the dashboard — 7-day clicks, impressions, CTR, average position
- **Top 5 URLs by clicks** with per-URL impressions
- **Search Console connection** lives under [Analytics + Pixels → Data sources](/asteris-utility-suite/modules/analytics-pixels/) — same place as GA4, Meta Pixel, TikTok, LinkedIn
- **Daily sync via OAuth** — credentials encrypted at rest, refresh-token handling, last-sync indicator

### WooCommerce conversion tracking

- **Server-side conversion hook** on `woocommerce_order_status_completed` — bypasses ad-blockers, never misses an order
- **Idempotent** via order meta flag — multiple status fires won't double-count
- **Country code** pulled from billing address — works on non-Cloudflare sites for the conversion path even when visitor GeoIP doesn't
- **Revenue primary metric** in the hero strip — surfaces alongside Visitors and Conversions

### GeoIP — two paths, no third-party data leakage

- **Cloudflare CF-IPCountry header** — zero-config when your site is behind Cloudflare
- **MaxMind GeoLite2 upload** — for non-Cloudflare customers, upload the free MaxMind DB once, country detection works for everyone after
- **Both paths visible** in Insights Settings → GeoIP panel

### Data portability + compliance

- **CSV export** of `log_visit` and `log_link_visit_action` from Settings → Data export
- **Configurable retention** — daily cron prunes log tables past your chosen retention window (7-3650 days, default 90)
- **Weekly email digest** (opt-in) — 4-KPI strip, top 5 pages, top 3 countries, "Highlight this week" callout (the highest-severity annotation)
- **GDPR-defensible** — no PII at row level, identity is unrecoverable after 24-hour salt rotation, IP truncated before storage

---

## Quickstart — 5 steps to live data

You don't need a config sprint. From a fresh Asteris install:

1. **Enable the module.** WP Admin → **★ Asteris → ⚙ Insights Settings** → tick **Enable Asteris Insights tracking** → Save. The beacon enqueues on every front-end page from this moment forward. No code changes, no `wp-config` constants required.

2. **Visit any non-admin page.** Open your homepage in an incognito window (or while logged out as admin). The ~500-byte beacon fires `navigator.sendBeacon()` to the collection endpoint. A row lands in the buffer table.

3. **Click "Run rollup now"** on the dashboard QA strip — or wait up to one hour for the cron to fire. Buffer → log tables promotion. The dashboard badge flips **`Preview · waiting`** → **`LIVE`**.

4. **(Optional) Connect Search Console** under **★ Asteris → 📊 Analytics + Pixels → Data sources** tab → click **Connect Google Search Console** → OAuth dance → pick property. The 🔎 Search Console tile on the Insights dashboard populates on the next daily sync.

5. **(Optional) Opt into the weekly digest** — Insights Settings → tick **Send me a weekly summary email** + recipient. Click **Send test digest now** to preview it immediately.

That's the entire setup. No tag manager, no measurement IDs, no consent banner. The first visit you record after step 3 surfaces in every tile. Full walkthrough including Search Console OAuth, WooCommerce conversion tracking, MaxMind GeoLite2 upload, CSV export, and retention tuning is in the [Insights configuration guide](/asteris-utility-suite/docs/modules/insights/).

---

## How Insights compares to other WordPress analytics plugins

### vs MonsterInsights / ExactMetrics

MonsterInsights connects WordPress to **Google Analytics 4**. The data lives in Google's servers. The dashboard you see in WP is a thin display layer over GA4's API. That means you're still in the third-party-cookie / consent-banner regime, and your Site Notes (timeline annotations) cost extra and require manual entry.

Asteris Insights is **first-party** — the data lives on your server, in your database tables, under your retention rules. Annotations are **automatic**, from your other Asteris modules. The Search Console tile shows the same data MonsterInsights would surface, without you having to leave WordPress.

[See the MonsterInsights migration walkthrough →](/asteris-utility-suite/migrate/from-monsterinsights/)
[Detailed comparison: Asteris vs MonsterInsights →](/asteris-utility-suite/vs/monsterinsights/)

### vs Plausible / Fathom (SaaS)

Plausible and Fathom are excellent cookieless analytics tools. They're also $10-50/month SaaS subscriptions you pay forever, with data hosted on their servers (Plausible: EU; Fathom: Canada). They can't have a per-post inline column in `wp-admin/edit.php` because they're not WordPress plugins. They can't annotate your chart with WAF events because they don't know about your security plugin.

Asteris Insights is **bundled** with your Asteris subscription (the same one you're already paying for Security, SEO + AI, Performance, etc.). The data lives on your server. The cross-module annotations only work because everything is in one install.

### vs Independent Analytics

Independent Analytics is the closest WordPress-native competitor and a solid plugin. It has the per-post column, cookieless tracking, and a clean dashboard.

What it doesn't have: **the cross-module wedge**. Independent Analytics is a focused, single-purpose plugin. The "Why numbers moved" panel requires being integrated with security + performance + SEO + activity log modules — which is the Asteris pattern, not the standalone-plugin pattern.

### vs Matomo

Matomo is the open-source heavyweight. The schema for Asteris Insights was modeled after Matomo's two-layer architecture (log_visit + log_link_visit_action + log_action). Matomo is more feature-complete (heatmaps, session replay, multi-site rollup, custom segments) and considerably more complex to set up. Asteris Insights is the **opinionated WordPress-native cut** of the Matomo model — fewer knobs, faster setup, integrated with the rest of your Asteris install. Customers who need Matomo's full surface area should run Matomo.

---

## What ships in v1.0

- ✅ First-party tracking pipeline (beacon → buffer → hourly rollup → log tables)
- ✅ Single opinionated dashboard with 15+ tiles
- ✅ Per-post inline analytics column in `wp-admin/edit.php`
- ✅ Cross-module annotation panel reading from Activity Log
- ✅ Search Console correlation tile
- ✅ WooCommerce conversion tracking
- ✅ GeoIP (Cloudflare + MaxMind paths)
- ✅ Configurable retention with daily cron prune
- ✅ Weekly email digest (opt-in)
- ✅ CSV export for visits + events
- ✅ Settings UI for everything above
- ✅ Activity Log integration — every Insights pipeline event recorded

## What's on the roadmap

- Bing Webmaster Tools data source (Analytics + Pixels → Data sources tab placeholder card already in place)
- GA4 Data API pull-back (same tab, same placeholder pattern)
- Performance module bridge — LCP / CLS regression events as annotations (when Performance v2 ships its field-data CWV monitor)
- Multi-site rollup UI (schema is already prepared — every log table carries `idsite SMALLINT`)
- Heatmap / session replay — **explicitly NOT planned**. Different product category, opposite privacy stance.

---

## See also

- [Tutorial: Migrate from MonsterInsights step-by-step](/asteris-utility-suite/migrate/from-monsterinsights/)
- [Asteris vs MonsterInsights comparison](/asteris-utility-suite/vs/monsterinsights/)
- [Configure Insights — practitioner guide](/asteris-utility-suite/docs/modules/insights/)
- [Analytics + Pixels module](/asteris-utility-suite/modules/analytics-pixels/) — third-party tracker config (GA4, GTM, Meta, TikTok, LinkedIn, Search Console)
- [Security module](/asteris-utility-suite/modules/security/) — source of WAF spike + brute-force annotations
- [SEO + AI module](/asteris-utility-suite/modules/seo-ai/) — source of Search Console drop annotations
- [Pricing](/asteris-utility-suite/pricing/) — Insights ships with every Asteris subscription
