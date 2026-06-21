---
title: "Configure GA4 + Meta CAPI + Consent Mode v2"
description: "The modern WordPress analytics stack in one 20-minute setup: GA4 wired correctly, Meta Pixel with Conversions API (server-side deduplicated against browser Pixel), and Google Consent Mode v2 for EU compliance. Covers verification + debugging."
sidebar:
  order: 3
---

# Configure GA4 + Meta CAPI + Consent Mode v2

**Goal:** in 20 minutes, your WordPress site fires GA4 + Meta Pixel + Meta Conversions API in a deduplicated way, respects EU consent under Consent Mode v2, and survives ad-blockers via server-side delivery. This is the **modern WordPress analytics stack** in 2026.

**Asteris modules used:** Analytics + Pixels (paid tier for Meta CAPI; lite version in Asteris Utility Suite Free covers GA4 + Meta Pixel only)

**Why this stack matters:**

- **Ad-blockers + iOS Limit Ad Tracking** kill 20-40% of browser-side Pixel events. Conversions API replaces those events server-side.
- **GA4 + Meta Pixel + CAPI** is the conversion-attribution combo most ads teams need. Without CAPI, you're significantly underreporting conversions to Meta.
- **Consent Mode v2** (effective March 2024 for EEA traffic) is required for GA4 + Google Ads compliance in the EU. Without it, you fragment your data + risk compliance issues.

---

## Before you start

You need:

- **A paid Asteris Utility Suite licence** (CAPI is in the paid module; lite version only has Pixel base)
- **A Google Analytics 4 property** set up at [analytics.google.com](https://analytics.google.com) (free)
- **A Meta Business account** with a Pixel set up at [business.facebook.com](https://business.facebook.com) (free)
- **A consent management platform (CMP)** — Asteris auto-wires with Cookiebot, OneTrust, Iubenda, CookieYes, Complianz. If you don't have one, you can use the manual JS API (Step 6 below) or skip Consent Mode v2 entirely if you're not EU-facing.
- ~20 minutes of active work + access to your Google + Meta admin

You should already have completed the [Analytics + Pixels module Quickstart](/asteris-utility-suite/docs/modules/analytics-pixels/) — this tutorial adds Meta CAPI + Consent Mode v2 on top of the basic GA4 + Pixel wiring.

---

## Step 1 — Verify GA4 base wiring

If you haven't already done the GA4 quickstart:

**Asteris → Analytics + Pixels → Google → GA4**

- **Measurement ID** — paste your `G-XXXXXXXXXX` (from GA4 → Admin → Data Streams → Web)
- Save

Verify in [GA4 → Reports → Real-Time](https://analytics.google.com) — open your site in incognito; the page-view should appear within 30 seconds.

If GA4 isn't firing, the rest of this tutorial won't work. Debug GA4 first (most common: typo in Measurement ID, or ad-blocker in your test browser blocking the gtag request).

---

## Step 2 — Verify Meta Pixel base wiring

**Asteris → Analytics + Pixels → Meta**

- **Pixel ID** — paste your 16-digit Pixel ID (from Meta Events Manager → Data Sources)
- Save

Install Meta's Pixel Helper Chrome extension. Visit your site — Pixel Helper should detect your Pixel firing the `PageView` event.

If Pixel Helper shows no Pixel:

1. Check Pixel ID is correct (Meta Events Manager → Data Sources → Pixels → click your Pixel → Settings → ID)
2. Disable any ad-blocker in the test browser
3. View Source on your site — search for `fbq('init', '` — your Pixel ID should appear

---

## Step 3 — Generate Meta CAPI access token

In Meta Events Manager:

1. Click your Pixel in the left sidebar
2. **Settings** tab
3. Scroll to **Conversions API**
4. Click **Generate access token**
5. **Important:** copy the token immediately — Meta only shows it once. Store in your password manager.

The token is a long random string. Keep it safe — it's like a password for server-side event delivery to Meta.

---

## Step 4 — Wire CAPI in Asteris

**Asteris → Analytics + Pixels → Meta → Conversions API**

- **Access Token** — paste the token from Step 3
- **Test events code** (optional but useful while testing) — generate in Meta Events Manager → your Pixel → **Test events** tab. Paste the code (a string like `TEST31234`)
- Save

Asteris now fires every Pixel event TWICE:

- Once from the browser (the Pixel `fbq()` call)
- Once from the WordPress server (a `POST` to `graph.facebook.com`)

Meta deduplicates the two calls using the `event_id` field. Asteris generates matching `event_id` values for the browser + server calls automatically — no manual work needed.

---

## Step 5 — Verify CAPI is firing

Trigger a test event. The easiest is `PageView` (fires automatically on every page).

1. Open your site in a private window (with the test events code from Step 4 in play, you can use ANY browser including ad-blocker-equipped ones)
2. Visit any page

In Meta Events Manager:

1. Open the **Test events** tab
2. Filter by your test events code from Step 4
3. Within 30 seconds, you should see TWO events:
   - **Source: Browser** — from the Pixel `fbq()` call
   - **Source: Server** — from CAPI

If you see both, CAPI is working. The deduplication will activate when Meta's matching algorithm runs (you don't see deduplication in test events; you see it in production data).

If you only see one source:

- **Browser only** — your CAPI access token is wrong or expired
- **Server only** — Pixel isn't firing in your test browser (ad-blocker?)

After verification, you can leave the test events code in or remove it. Removing the test code switches Meta from test mode to production mode.

---

## Step 6 — Set up Consent Mode v2

This is the EU-specific compliance step. Skip if you only serve non-EU users (US, Australia, Asia outside EEA, etc.).

### If you have a supported CMP (Cookiebot / OneTrust / Iubenda / CookieYes / Complianz):

**Asteris → Analytics + Pixels → Consent → Google Consent Mode v2**

Toggle **Enable** to ON. Asteris auto-detects your CMP and wires the Consent Mode v2 calls.

Verify:

1. Open your site in a private window in a EU IP (use a VPN if you're not in the EEA)
2. Your CMP's banner appears
3. **Click "Decline"** (test the strictest case)
4. Open DevTools → Network → filter `collect`
5. You should see GA4 requests with `gcs=G100` (analytics + ads BOTH denied)
6. **Click "Accept"** (test the permissive case)
7. You should see GA4 requests with `gcs=G111` (analytics + ads BOTH granted)

If you see `G100` after decline and `G111` after accept, Consent Mode v2 is working.

### If you don't have a supported CMP — use the manual JS API:

**Asteris → Analytics + Pixels → Consent → Manual JS API**

Asteris exposes a JS API. Wire it into your custom consent solution:

```javascript
// On user consent grant (e.g., they click "Accept" in your banner):
window.asterisConsent.grant('analytics_storage');
window.asterisConsent.grant('ad_storage');
window.asterisConsent.grant('ad_user_data');
window.asterisConsent.grant('ad_personalization');

// On user consent revoke (e.g., they click "Reject"):
window.asterisConsent.revoke('analytics_storage');
window.asterisConsent.revoke('ad_storage');
window.asterisConsent.revoke('ad_user_data');
window.asterisConsent.revoke('ad_personalization');

// Check current state:
console.log(window.asterisConsent.getState());
// → { analytics_storage: 'granted', ad_storage: 'denied', ... }
```

Add these calls to your consent banner's accept / decline / change handlers.

---

## Step 7 — Verify in production (24-48 hour wait)

Consent Mode v2 doesn't immediately show in GA4's normal reports — Google needs to process the data through its consent-aware pipelines. Wait 24-48 hours, then check:

1. **GA4 → Admin → Property → Settings → Consent settings** — verify "Consent signals received" shows recent timestamps
2. **GA4 → Reports → Acquisition → Traffic acquisition** — sessions with EU traffic should be visible; "Modelled conversions" (Google's term for conversions reconstructed from consent-mode-cookieless pings) should appear in the conversion reports

If neither shows up after 48 hours, double-check Step 6 — the consent state must be communicated to Google for modelling to kick in.

---

## Step 8 — Set up event-specific tracking (purchase, lead, etc.)

The PageView event verified above is the baseline. For real conversion tracking, configure event-specific firing.

**Asteris → Analytics + Pixels → Events**

Asteris ships pre-built event recipes for common conversions. Toggle ON the ones relevant to you:

- ✓ **Form submission** — fires `Lead` (Meta) + `generate_lead` (GA4) when an Asteris form is submitted
- ⚙️ **Add to cart** (Asteris for WooCommerce only) — fires `AddToCart` + `add_to_cart`
- ⚙️ **Begin checkout** (WC only) — fires `InitiateCheckout` + `begin_checkout`
- ⚙️ **Purchase** (WC only) — fires `Purchase` + `purchase` with transaction value
- ⚙️ **Custom — File download** — fires when users click .pdf / .doc / .zip links
- ⚙️ **Scroll depth** — fires at 25 / 50 / 75 / 100% scroll
- ⚙️ **Time on page** — fires at 30s / 1 min / 5 min thresholds

Per-event, Asteris fires to BOTH GA4 (with the GA4-standard event name) AND Meta (with the Meta-standard event name) AND any other enabled pixel (TikTok, Pinterest, LinkedIn).

Save. Test by triggering each event you enabled.

---

## Step 9 — Add additional pixels (optional)

If you also run TikTok / Pinterest / LinkedIn ads:

**Asteris → Analytics + Pixels → TikTok**

- **Pixel ID** — from TikTok Events Manager
- **Events API access token** — same place
- Toggle Events API ON
- Save

**Pinterest** and **LinkedIn Insight** follow the same pattern (Pixel ID / Tag ID + optional API token). Each fires both browser-side (the pixel) + server-side (the events API) where the platform supports it.

All fire on the same configured events from Step 8 — one place to manage, one place to debug.

---

## Step 10 — Configure Microsoft Clarity (heatmaps + session recordings)

Optional but recommended for UX work:

**Asteris → Analytics + Pixels → Microsoft Clarity**

- **Project ID** — from [clarity.microsoft.com](https://clarity.microsoft.com) → your project → Setup → Install manually → copy the ID
- Save

Clarity gives:

- Heatmaps (where users click + scroll)
- Session recordings (replays of individual user visits — anonymised by default)
- Insights (Clarity's own analytics like "rage clicks", "dead clicks", "JavaScript errors")

Free, made by Microsoft, gathers a lot of UX signal you can't get from GA4 or Meta. Privacy-respectful (no PII collected; anonymised IDs only).

---

## Verification checklist (post-setup)

Before considering this complete, verify ALL of these:

- [ ] GA4 Real-Time shows your test page-views (Step 1)
- [ ] Meta Pixel Helper detects your Pixel (Step 2)
- [ ] Meta Events Manager Test events shows both Browser + Server sources for `PageView` (Step 5)
- [ ] CMP shows banner to EU IPs; consent state correctly propagates to GA4 + Meta (Step 6)
- [ ] Custom events fire on user actions (form submission, scroll depth, etc.) (Step 8)
- [ ] Each additional pixel (TikTok, Pinterest, LinkedIn) fires from its Events Manager / equivalent (Step 9)
- [ ] Clarity Setup status shows "Tracking active" (Step 10)

If all 7 are green, you're done.

---

## Common issues

### "Meta CAPI events show up in Test events but not in production"

Production data has stricter validation. Common causes:

1. **Missing user-data fields** — Meta wants email, phone, etc. (hashed) for matching. Asteris auto-collects these from logged-in users + form submissions. If your traffic is mostly anonymous, match quality is low (which means dedupe rate is low).
2. **Test events code still set** — events with a test code go ONLY to test events, not to production. Remove the test code in **Asteris → Analytics + Pixels → Meta → Conversions API → Test events code**.
3. **Pixel + CAPI event_id mismatch** — Asteris generates matching IDs automatically; if you've customised event firing, verify the IDs match between browser + server.

### "GA4 Real-Time shows events but Reports → Acquisition shows nothing after 24h"

GA4 has a 24-48 hour processing delay for production reports. Real-Time is real-time; everything else lags. Wait 48 hours after first-fire before debugging.

If after 48 hours still nothing:

1. **Check GA4 → Admin → Data streams → Web → your stream** — verify the data stream is receiving events (counter increments)
2. **Check `gtag` debug output** — install Chrome's GA Debugger extension; visit your site; check DevTools → Console for `gtag` debug log
3. **Check Search Console linking** — sometimes Search Console linking causes a one-time data delay; this resolves within 7 days

### "Consent Mode v2 isn't reducing my GA4 traffic from EU users"

If your CMP defaults to "all consent granted" (no opt-in required by your jurisdiction), Consent Mode v2 sends events through normally — no reduction expected.

If your CMP defaults to opt-in required (strict GDPR jurisdictions), consent-mode-cookieless pings still fire (just without identifiers). Google reports them in the "Modelled" rows of conversion reports.

This is working as designed. Reduction would only happen if a CMP fails to grant *or* deny — but that shouldn't happen in production.

### "Multiple plugins are firing GA4 / Meta Pixel"

Most common cause: you installed Asteris but forgot to deactivate MonsterInsights / Site Kit / PixelYourSite. Two plugins firing the same Pixel ID double-counts events.

**Fix:** pick one plugin per Pixel. If Asteris is your choice, deactivate the others. See [/migrate/from-monsterinsights](/asteris-utility-suite/migrate/from-monsterinsights/) for the MonsterInsights migration.

### "I changed my consent on the live site but events keep firing"

Browser cache. Hard-refresh (Cmd-Shift-R / Ctrl-Shift-R). Asteris's consent state lives in `localStorage` — clearing browser data or using a private window forces a fresh state.

---

## See also

- [Analytics + Pixels module configuration](/asteris-utility-suite/docs/modules/analytics-pixels/)
- [Asteris vs MonsterInsights comparison](/asteris-utility-suite/vs/monsterinsights/)
- [Migrate from MonsterInsights](/asteris-utility-suite/migrate/from-monsterinsights/)
- [Privacy policy](/asteris-utility-suite/privacy/) — what Asteris does + doesn't collect
- [Subprocessors](/asteris-utility-suite/subprocessors/) — Google, Meta, TikTok, Pinterest, LinkedIn, Microsoft Clarity privacy policies
