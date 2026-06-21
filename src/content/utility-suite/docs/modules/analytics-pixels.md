---
title: "Configure Analytics + Pixels"
description: "Step-by-step setup of the Asteris Analytics + Pixels module: GA4, GTM, Google Ads conversions, Meta Pixel + Conversions API, TikTok, Pinterest, LinkedIn, Microsoft Clarity, Consent Mode v2. Quickstart in 10 minutes."
sidebar:
  order: 7
---

# Configure the Analytics + Pixels module

For the marketing overview of this module, see [/modules/analytics-pixels](/asteris-utility-suite/modules/analytics-pixels/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

**Free tier**: GA4, Google Tag Manager, Meta Pixel base, basic events, **Google Consent Mode v2** (auto-wires with Cookiebot / OneTrust / Iubenda / CookieYes / Complianz).

**Paid tier**: Google Ads conversions, Meta Conversions API (server-side), TikTok Pixel + Events API, Pinterest Tag, LinkedIn Insight Tag, Microsoft Clarity, custom event recipes, WC enhanced ecommerce events.

For the deep-dive end-to-end flow on the modern analytics stack (GA4 + Meta CAPI + Consent Mode v2 together), see [/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2](/asteris-utility-suite/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2/).

---

## Quickstart (10 minutes — GA4 + basic Meta Pixel)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Analytics + Pixels** to ON.

The Analytics + Pixels submenu appears with sub-panels for each provider.

### 2. Wire up GA4

**Asteris → Analytics + Pixels → Google → GA4**

You need your **Measurement ID** (looks like `G-XXXXXXXXXX`).

If you don't have GA4 set up yet:

1. Go to [Google Analytics](https://analytics.google.com)
2. **Admin → Create Property** → name it after your site
3. **Data Streams → Add stream → Web** → enter your site URL
4. Copy the **Measurement ID** from the stream details

Paste the Measurement ID into Asteris. Save.

Asteris immediately starts firing GA4 page-views from every page on your site.

### 3. Verify GA4 in Real-Time

Open Google Analytics → **Reports → Real-Time**. In a separate browser (or incognito), visit your site. Within 30 seconds, the page-view should appear in Real-Time.

If nothing shows up:

1. **Check the Measurement ID** — easy typo
2. **Check for ad-blockers** — turn off uBlock / AdGuard in the test browser; GA4 events are blocked by most ad-blockers
3. **Check for another GA4 plugin** — MonsterInsights, Site Kit, GA4 plugin (the standalone one) all fire GA4. Two plugins firing for the same Measurement ID double-counts. Pick one.

### 4. (Optional) Wire up Google Tag Manager

If you use GTM to manage tags beyond GA4:

**Asteris → Analytics + Pixels → Google → GTM**

- **Container ID** — `GTM-XXXXXXX`

Save. Asteris adds the GTM container script to `<head>` and the noscript fallback to `<body>`.

> 💡 If you have GTM, you typically don't need to configure GA4 directly in Asteris — GTM handles GA4. But Asteris's direct GA4 wiring is a fallback that runs even if GTM fails to load (defense in depth).

### 5. Add Meta Pixel (Facebook + Instagram)

**Asteris → Analytics + Pixels → Meta**

- **Pixel ID** — your Meta Pixel ID (16-digit number, from Meta Events Manager)
- Save

Asteris fires the Pixel base on every page-view + standard events on common WordPress actions (form submissions, etc.).

Verify with Meta's **Pixel Helper** Chrome extension. Visit your site with Pixel Helper open — it should detect your Pixel and show events firing.

### 6. Enable Conversions API (CAPI)

Browser-side Pixel alone misses 20-40% of events because of ad-blockers + iOS privacy. CAPI sends server-side from your WordPress install, deduplicated against the browser Pixel:

**Asteris → Analytics + Pixels → Meta → Conversions API**

- **Access Token** — generate in Meta Events Manager → your Pixel → Settings → Conversions API → Generate access token
- **Test events code** — optional; useful while testing (Meta shows test events in a separate UI tab)
- Save

Asteris now sends every event TWICE — once from the browser (Pixel) and once from the server (CAPI). Meta's deduplication uses the `event_id` field; Asteris generates matching IDs automatically.

> ⚠️ MonsterInsights doesn't support CAPI in any tier. PixelYourSite Pro does. This is one of the killer features of the Asteris module.

### 7. Enable Consent Mode v2 (EU / EEA / UK)

If you serve EU users, you need Google Consent Mode v2 for GA4 + Ads compliance:

**Asteris → Analytics + Pixels → Consent → Google Consent Mode v2**

Asteris auto-detects your CMP (consent management platform):

- **Cookiebot** — auto-wires; no manual config
- **OneTrust** — auto-wires
- **Iubenda** — auto-wires
- **CookieYes** — auto-wires
- **Complianz** — auto-wires
- **Custom / no CMP** — see step 8

If you have a supported CMP, the toggle is the only action. Save.

### 8. (Custom CMP) Wire Consent Mode manually

If you don't have a supported CMP, or you use a custom consent solution:

**Asteris → Analytics + Pixels → Consent → Manual JS API**

Asteris exposes a JS API your CMP / cookie banner calls:

```javascript
// On consent grant for analytics:
window.asterisConsent.grant('analytics_storage');
window.asterisConsent.grant('ad_storage');
window.asterisConsent.grant('ad_user_data');
window.asterisConsent.grant('ad_personalization');

// On consent revoke:
window.asterisConsent.revoke('analytics_storage');
// etc.
```

Wire these into your consent banner's accept / decline / change handlers. Asteris's Consent Mode v2 implementation respects the state.

### 9. Verify Pixel Helper + GA4 + Meta both fire

Open your site in a private window with both:

- **Meta Pixel Helper** (Chrome extension)
- **GA Debugger** (Chrome extension) OR open Chrome DevTools → Network tab → filter `google-analytics`

Reload the homepage. You should see:

- **Pixel Helper** — your Pixel + PageView event firing
- **DevTools** — request to `google-analytics.com/g/collect?...` with your `tid=G-XXXXXXXXXX`
- (If Meta CAPI enabled) — your server-side log shows the CAPI POST to `graph.facebook.com`

If anything's missing, debug per-provider — most issues are typos in IDs or ad-blockers blocking the test browser.

### 10. Note your baseline

Take a screenshot of your GA4 Real-Time + Meta Events Manager + Ads dashboard. You'll want a baseline before adding more pixels (TikTok, Pinterest, LinkedIn, Clarity) so you can verify each new addition doesn't break the existing ones.

That's the baseline. Workflows below cover the additional providers + advanced configurations.

---

## Common workflows

### Add Google Ads conversions

**Asteris → Analytics + Pixels → Google → Google Ads**

- **Conversion ID** — `AW-XXXXXXXXX` (from Google Ads → Tools → Conversions → click a conversion → Tag Setup)
- **Conversion label** — the per-conversion label (different per conversion action)

Asteris fires the conversion linker on every page + the conversion event on configured WP actions (purchase, form submission, etc.).

For a typical content site, configure conversions on:

- **Form submissions** — via the Forms module integration
- **Specific page views** — pricing, demo, thank-you pages
- **Custom events** — via the developer hooks

### Add TikTok Pixel + Events API

**Asteris → Analytics + Pixels → TikTok**

- **Pixel ID** — from TikTok Events Manager
- **Access Token** — from Pixel settings → Events API
- Save

TikTok's Events API is the server-side equivalent of Meta CAPI. Same `event_id` deduplication mechanism. Asteris fires both browser + server-side.

### Add Pinterest, LinkedIn, Microsoft Clarity

**Asteris → Analytics + Pixels → Other**

- **Pinterest Tag** — Tag ID + conversion API token
- **LinkedIn Insight Tag** — Partner ID
- **Microsoft Clarity** — Project ID

Clarity gives heatmaps + session recordings — useful for UX work. The other two are conversion-tracking only.

### Configure custom event recipes

Pre-built event configurations that fire to all your enabled providers simultaneously:

**Asteris → Analytics + Pixels → Events**

Common recipes:

- **File download** — any link to `.pdf`, `.doc`, `.zip`, configurable extensions
- **Scroll depth** — 25% / 50% / 75% / 100%
- **Video play / pause** — for embedded videos (YouTube, Vimeo, native HTML5)
- **Outbound link click** — any link to an external domain
- **Form submission** — auto-fires when Asteris Forms submission completes
- **Time on page** — 30s / 1 min / 5 min thresholds

Toggle the recipes you want. Each fires to **every enabled provider** (GA4, Meta, TikTok, Pinterest, LinkedIn) with consistent event names.

### Test events without affecting production data

Most providers have a "test mode" that fires events to a separate test view:

**Meta:** **Asteris → Analytics + Pixels → Meta → Test events code** — paste the test code from Meta Events Manager → Test events tab. All events from your IP are routed to test mode for 24 hours.

**TikTok:** Same pattern — test events code in Asteris → TikTok.

**GA4:** Less elegant — GA4 doesn't have a separate test stream. Instead, use GA4's **Debug View** (Reports → Configure → DebugView) which shows events with `debug_mode: true`. Asteris fires `debug_mode: true` when the current user has the `ASTERIS_GA4_DEBUG` cookie (set by clicking **Asteris → Analytics + Pixels → Google → GA4 → Enable Debug** for your session).

### Migrate from MonsterInsights

Full walkthrough at [/migrate/from-monsterinsights](/asteris-utility-suite/migrate/from-monsterinsights/). Short version:

1. **Note your MonsterInsights GA4 Measurement ID** (Settings → General → UA Code field)
2. **Install Asteris + activate Analytics + Pixels** module
3. **Asteris → Analytics + Pixels → Google → GA4** — paste the SAME Measurement ID
4. **Verify GA4 Real-Time** — events should be visible from Asteris
5. **MonsterInsights → Settings → General → Tracking Code → Disabled** (stops MonsterInsights firing)
6. Verify Real-Time still shows events (now from Asteris only — no duplicates)
7. Wait 24-48 hours to confirm clean data
8. Deactivate MonsterInsights (keep installed for 30 days as insurance, then delete)

> 💡 **GA4 history is safe.** It lives in Google, not the plugin. Switching plugins doesn't lose any history.

### Set up Meta CAPI deduplication (verify it's working)

When both Meta Pixel (browser) and Conversions API (server) fire for the same event, Meta deduplicates via `event_id`. Verify:

1. Trigger a tracked event (e.g., submit a form on your site)
2. In Meta Events Manager → your Pixel → **Events** tab → find the event
3. Check the event's **Connection Method** field:
   - ✓ `Browser + Server` → deduplication working
   - ⚠️ `Browser only` or `Server only` → only one path fired
4. If only one path, check Asteris's CAPI debug log: **Asteris → Analytics + Pixels → Meta → Debug → Recent CAPI calls**

The `event_id` is generated by Asteris's pixel-side JS and passed to the server-side CAPI call via a hidden field on the same request. If the IDs match in both calls, Meta dedupes.

### Configure GDPR-required consent gating

If you're in a strict GDPR jurisdiction and need NO tracking until consent:

**Asteris → Analytics + Pixels → Consent → Strict mode**

Toggle **Block all pixels until consent** to ON.

Now:

- **No GA4 events fire** until `window.asterisConsent.grant('analytics_storage')` is called
- **No Meta Pixel fires** until `window.asterisConsent.grant('ad_storage')` is called
- **No other pixels fire** until their respective consent categories are granted

Consent Mode v2 (Google's softer model) STILL respects the state but allows consent-mode-aware pixel fires (cookieless pings to Google that don't store identifiers). Strict mode is harder: nothing fires at all without explicit consent.

Use strict mode if:

- Your CMP isn't Consent Mode v2 compatible
- Your DPO requires zero-tracking-until-consent
- You're in a jurisdiction (e.g., parts of Germany) that interprets ePrivacy more strictly than Google's Consent Mode allows

### Audit cookies your site is setting

**Asteris → Analytics + Pixels → Consent → Cookie audit**

Asteris scans your site and lists:

- Cookies set by Asteris (none in cookieless Consent Mode v2; some when ad pixels grant consent)
- Cookies set by other plugins (WooCommerce, page builders, etc.)
- Cookies set by third parties (CDN, embedded YouTube, etc.)

Useful for compliance documentation — populate your privacy policy / cookie notice with the actual list.

---

## Settings reference

### Google stack

- **GA4 Measurement ID** — page-view + auto-events
- **GTM Container ID** — adds GTM script + noscript fallback
- **Google Ads Conversion ID + Label**
- **Google Consent Mode v2** — auto-wires with CMP; manual JS API for custom

### Meta (Facebook / Instagram)

- **Pixel ID**
- **Conversions API access token**
- **Limited Data Use** mode (California)
- **Test events code** for Events Manager test view

### TikTok

- **Pixel ID**
- **Events API access token**

### Other ad platforms

- **Pinterest Tag** + Conversion API
- **LinkedIn Insight Tag**
- **Twitter / X Pixel**

### Analytics + behaviour

- **Microsoft Clarity Project ID** — heatmaps + session recordings

### Custom event recipes

- File download / scroll depth / video play / outbound link / form submission / time on page
- Per-recipe enable/disable
- Per-recipe destination (which providers receive)

### Consent

- **Consent Mode v2** — auto-wires with CMP
- **Manual JS API** — `window.asterisConsent.grant()` / `.revoke()`
- **Strict mode** — no tracking until consent
- **Cookie audit** — site-wide cookie inventory

---

## REST API

```
# Config
GET    /wp-json/asteris/v1/analytics/config
PUT    /wp-json/asteris/v1/analytics/config

# Cookies audit
GET    /wp-json/asteris/v1/analytics/cookies

# Test event
POST   /wp-json/asteris/v1/analytics/test-event
       body: { platform: "ga4|meta|tiktok|...", event: "page_view|purchase|...", data: {...} }

# CAPI debug log
GET    /wp-json/asteris/v1/analytics/meta/capi-debug-log
```

All capability-checked (`manage_options`).

---

## WP-CLI

```bash
# Config
wp asteris analytics config get
wp asteris analytics config set --key=ga4_measurement_id --value=G-XXXXXXXXXX

# Test events
wp asteris analytics test-event --platform=ga4 --event=page_view
wp asteris analytics test-event --platform=meta --event=PageView

# Cookie audit
wp asteris analytics cookies                            # outputs cookies set on the homepage
wp asteris analytics cookies --url=<url>                # specific URL

# CAPI debug
wp asteris analytics meta capi-log                      # recent server-side calls
wp asteris analytics meta capi-log --tail               # follow mode (debugging)
```

---

## See also

- [Tutorial: Configure GA4 + Meta CAPI + Consent Mode v2](/asteris-utility-suite/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2/)
- [Asteris vs MonsterInsights comparison](/asteris-utility-suite/vs/monsterinsights/)
- [Migrate from MonsterInsights](/asteris-utility-suite/migrate/from-monsterinsights/)
- [Privacy policy](/asteris-utility-suite/privacy/) — what Asteris analytics does + doesn't collect
- [Subprocessors](/asteris-utility-suite/subprocessors/) — third parties that receive your analytics data (Google, Meta, TikTok, etc.)
