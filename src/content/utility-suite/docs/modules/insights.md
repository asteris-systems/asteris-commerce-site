---
title: "Configure Asteris Insights"
description: "Step-by-step setup of the Asteris Insights module: enable tracking, connect Search Console, hook up WooCommerce conversions, upload MaxMind GeoLite2 for GeoIP, configure retention, opt into the weekly digest, export CSV. Quickstart in 5 minutes."
sidebar:
  order: 12
---

# Configure Asteris Insights

For the marketing overview of this module, see [/modules/insights](/asteris-utility-suite/modules/insights/). This page covers the practical setup — Quickstart, every settings field, common workflows, and the developer surface.

Insights is **off by default**. There's no consent banner because tracking doesn't start until you flip the toggle.

---

## Quickstart (5 minutes)

### 1. Enable tracking

**WP Admin → ★ Asteris → ⚙ Insights Settings → General**

Tick **Enable Asteris Insights tracking** and click **Save settings**.

What happens immediately:
- The ~500-byte JS beacon enqueues on every front-end page render
- The mu-plugin Drop-In (`wp-content/mu-plugins/asteris-collect.php`) auto-installs if writable; otherwise the REST endpoint at `/wp-json/asteris-wp/v1/collect` is used as fallback
- The hourly buffer→log promotion cron schedules itself
- The daily retention prune cron schedules itself

Visit any non-admin page (use incognito or log out — admins are excluded by default) and the beacon fires. A row lands in `wp_asteris_wp_insights_buffer`.

### 2. Trigger the first rollup

**WP Admin → ★ Asteris → 📊 Insights** → in the **🔧 Collection pipeline** QA strip at the top → click **⚡ Run rollup now**.

The dashboard badge flips from **`Preview · waiting for first visit`** to **`LIVE`**. Every tile populates with your real data. Subsequent rollups run hourly without intervention.

### 3. Done

That's the minimum-viable setup. The hero strip (Visitors / Pageviews / Bounce / Avg session), the 30-day time-series, Top Content, Devices, Channels, Top countries — all real, from your first recorded visit forward.

Continue below for the OAuth-based integrations (Search Console, MaxMind, WooCommerce), retention configuration, and the weekly digest.

---

## Common workflows

### Connect Google Search Console

The Search Console connection lives under **Analytics + Pixels → Data sources** tab (it's a two-way integration where Asteris pulls data back, alongside Bing Webmaster and GA4 Data API roadmap cards).

1. **WP Admin → ★ Asteris → 📊 Analytics + Pixels → 🔌 Data sources tab**
2. Click **🔎 Google Search Console → Connect**
3. You'll need a Google Cloud OAuth Client ID + Secret (free; takes ~5 minutes to create in [console.cloud.google.com](https://console.cloud.google.com/) — the Settings page links straight to the right screen). Paste both → Save → click **Authorize with Google**
4. Pick the Search Console property that matches this site
5. The first sync runs immediately. Subsequent syncs run daily via cron

Verify it worked:
- **★ Asteris → 📊 Insights** — the 🔎 Search Console tile should show non-zero Clicks / Impressions / CTR / Avg position within ~5 minutes
- The "Why numbers moved" annotation panel will start surfacing `search_console_drop` events whenever today's clicks fall below 70% of the trailing 7-day average

### Track WooCommerce conversions

No setup required. As soon as Insights is enabled and WooCommerce is active:

- Every order transitioning to **status = Completed** writes a conversion event automatically
- `event_value` = order total in the order's currency
- `country_code` is pulled from the billing address (works even on non-Cloudflare sites)
- Idempotent — multiple status-completed fires won't double-count (we set `_asteris_insights_recorded` order meta)

To make Revenue the headline KPI on the dashboard:

**Insights Settings → Primary metric → tick Revenue (WooCommerce) → Save**

The hero strip switches to **Revenue / Pageviews / Bounce / Avg session**, with revenue summed across the last 30 days.

### Configure GeoIP

Insights detects the visitor's country in this priority order:

1. **Cloudflare `CF-IPCountry` header** — automatic, zero-config, when your site is fronted by Cloudflare. Most modern WordPress sites are.
2. **MaxMind GeoLite2-Country.mmdb** — for non-Cloudflare sites, upload the free MaxMind database once and country detection works for everyone after.
3. **No detection** — country tile gracefully shows illustrative seed data, the rest of the dashboard works fine.

To upload MaxMind:

1. Sign up for a free MaxMind account at [maxmind.com/en/geolite2/signup](https://www.maxmind.com/en/geolite2/signup) and accept the GeoLite2 EULA
2. Generate a license key in Account → Manage License Keys
3. Download `GeoLite2-Country.mmdb` (~6 MB)
4. **WP Admin → ★ Asteris → ⚙ Insights Settings → GeoIP — country detection** → click **Choose file** → select your `.mmdb` → **Upload database**
5. The Settings page will show ✅ `GeoLite2-Country.mmdb — 6,234 KB, MaxMind build 3 days old`

MaxMind updates the database weekly. Re-upload any time to refresh.

### Set the retention window

Insights stores raw event rows. Older data is pruned daily by cron — you control the window.

**Insights Settings → General → Retention** → number-input (clamped 7-3650 days) → Save.

Defaults:
- **90 days** — recommended for most sites; covers quarter-over-quarter comparison
- **365 days** — year-over-year reporting (the digest's "vs last week" delta is always vs last week regardless of this setting)
- **30 days** — minimal data footprint if you have storage concerns

The prune cron runs daily at ~9 AM UTC. Aggregated stats (the `log_action` URL/title strings) are NEVER pruned — only the raw event rows. So historical chart labels stay correct even after deletion.

### Opt into the weekly digest

**Insights Settings → General → Weekly digest email** → tick **Send me a weekly summary email**.

Optional **Recipient** override (defaults to `admin_email`). Sent every Monday at 09:00 UTC.

The email includes:
- 4-KPI strip (Visitors / Pageviews / Bounce / Avg session) with % delta vs prior week
- Top 5 pages by views
- Top 3 countries
- **Highlight this week** callout — the highest-severity annotation from the past 7 days
- "Open full dashboard" CTA button

Click **Send test digest now** to preview the email immediately (bypasses the opt-in gate; useful for QA).

### Export CSV

For GDPR data portability requests, external reporting, or migration:

**Insights Settings → Data export**:
- **Download visits.csv** — one row per session (`log_visit` table). Columns: idvisit, idvisitor hash prefix, first/last action time, referrer type, country, device class, browser, OS, is_bot, actions count
- **Download events.csv** — one row per pageview/conversion (`log_link_visit_action` joined with `log_action` for URL + title strings)

Both files are UTF-8 with BOM (so Excel opens them in the right encoding). Capped at 100,000 rows per export — shrink the retention window first if you have more.

### Tag campaign URLs with UTMs (v2 — alpha.243)

**WP Admin → ★ Asteris → ⚙ Insights Settings → 🔗 UTM Builder**

Paste your destination URL, fill in **source / medium / campaign** (and optionally term / content), copy the result. The builder validates the URL, lowercases UTM values for consistency, and produces a single tagged URL.

Once the link is in the wild, every visitor who lands on it carries the UTM tagging through their entire session:
- `log_visit.utm_source / utm_medium / utm_campaign / utm_term / utm_content` get set on the first pageview of the session
- Subsequent pageviews in the same session keep the same UTMs
- If the visitor returns later via a different campaign, `utm_first_*` columns stay locked to the original first-touch campaign — so conversion attribution credits the right campaign

The **💸 UTM campaigns — performance** tile on the Insights dashboard shows visits, bounce rate, conversions, and revenue per campaign, with auto-classified channel labels.

### Compare two campaigns A/B

**Insights Settings → ⚖ Compare campaigns**

Pick Campaign A and Campaign B from the dropdowns — side-by-side metrics: visits, bounce rate, conversion rate, revenue, revenue-per-visit, channel. Use it for "did the new headline beat the old?"

### Track AI assistant traffic

No setup required. As soon as someone clicks an Asteris citation in ChatGPT, Claude, Perplexity, Gemini, Copilot, You.com, Phind, or Meta AI, Asteris classifies the referrer and counts the visit. The 🤖 **AI assistant traffic** tile on the dashboard shows the breakdown.

If AI traffic crosses 10 visits in 24h, an annotation fires on the time-series chart — useful for spotting "we just got a Perplexity citation" moments.

### Capture WP internal site searches

Automatic for any URL with `?s=foo` (the standard WP search URL). The query is stored in `log_search_internal` with an optional result count. The 🔎 **Top searches on your site** tile surfaces the most-searched-for terms.

When zero-result searches spike (the same query returns nothing 5+ times in 24h), an annotation fires labeled with the query — direct signal of a content gap.

### Track custom events from your own front-end code

The Asteris Insights beacon exposes a public JS API:

```js
window.asterisInsights.trackEvent('signup_started', { plan: 'pro', value: 49 });
```

Events join to the current visit's UTMs automatically. The `event_value` field rolls up into the revenue metric series for custom conversions outside of WooCommerce.

### See keyword performance from Search Console

Once Search Console is connected (via Analytics + Pixels → Data sources), the daily sync pulls both `(page)` and `(query, page)` dimensions. Two new tiles populate:

- 🔑 **Top search queries — 7 days** — top queries by clicks, with impressions / CTR / average position
- 🎯 **Keyword opportunities** — pages with ≥200 impressions but <4% CTR at position ≤20. These are content-optimization candidates: you're showing up but not getting the click.

### Exclude / include admin browsing

By default, **logged-in administrators are NOT tracked** — your own dashboard browsing would otherwise pollute customer stats.

To include admins (e.g. you want to count internal staff usage):

**Insights Settings → General → Administrator tracking** → tick **Track visits from logged-in administrators** → Save.

To override per-environment in code (e.g. force-track admins in staging only):

```php
add_filter( 'asteris_insights_track_admins', '__return_true' );
```

### View per-section engagement on the Studio canvas

This is the v1.0.1 Phase-2 differentiator: the only WordPress page builder that shows you which sections of your page actually convert. No third-party plugin combination can replicate this — it requires owning the analytics, the AI, and the canvas.

**Prerequisites:** Insights enabled, the page has had real front-end traffic (the [section_view](#sectionview-and-sectionclick-events) and [section_click](#sectionview-and-sectionclick-events) events accumulate as visitors load and interact with the page).

**Steps:**

1. **★ Asteris → 🎨 Studio** → open any page that's been live and getting traffic
2. In the Studio top bar, look for the **📊 Insights** button (next to the breakpoint icons — desktop / tablet / mobile). **This button only appears when per-section data exists for this page.** On a brand-new page with no traffic yet, the button is hidden entirely.
3. Click **📊 Insights**. Every section on the canvas (every block carrying a `data-as-path` attribute) is painted with:
   - A small **corner chip** showing `▢ 320 views · 12 clicks · 3.8% CTR`
   - A **heat tint** scaled to the section's share of the page's max clicks — busy sections glow stronger blue
4. Click **📊 Insights** again to clean up. The chips + heat are removed and the canvas returns to its uncolored state.

The overlay is read-only — it reads from `Query::per_section_stats()` and paints the iframe DOM. Toggling it on or off never modifies the page content.

Data is cached for 5 minutes (transient-cached `Query::per_section_stats()` result). Studio explicitly invalidates the cache on every Save, so adding a new section + saving + re-opening Insights gives you the fresh chip map.

### Rewrite a low-CTR section with AI (the Insights → AI loop)

Once you have per-section engagement data, the natural next question is *"this section underperforms — what should I do?"* AI Suite's Section_Rewrite endpoint answers it directly.

**Prerequisites:** All of the prerequisites above (Insights enabled, traffic accumulated), PLUS AI Suite configured (provider key set under SEO + AI → AI Provider).

**Steps:**

1. With the **📊 Insights** overlay on, find a section with low CTR (<5%) or zero clicks despite real views. Its chip will carry a **🪄 Rewrite** button.
2. Click 🪄 **Rewrite**.
3. A modal opens with:
   - **Diagnosis** — an explicit statement of what's wrong (e.g. *"Zero clicks despite 320 views — readers are reaching this section but bouncing past. The CTA or value prop is missing or invisible."*)
   - **Current** (left column) — the section's HTML as-is
   - **AI rewrite** (right column) — the suggested replacement, with the diagnosis explicitly addressed
4. Review the diff side-by-side. The AI rewrite is **never auto-applied** — you read it, decide.
5. If you want it, click **📋 Copy rewrite** → paste into the section's text block.

For the full developer surface of the Section_Rewrite endpoint, see [/docs/modules/ai-suite#rest-endpoint--section_rewrite](/asteris-utility-suite/docs/modules/ai-suite/#rest-endpoint--section_rewrite). Each rewrite charges 1 request against your AI Suite monthly cap.

### Track outbound link clicks separately from internal clicks

Phase 2 also split section clicks into two distinct signals:

- **Internal click** — the visitor clicked a button or link inside the section that goes somewhere on your site
- **Outbound click** — the visitor clicked an anchor whose hostname differs from your site's

This is a crucial distinction: a button getting 12 clicks because *"buy now"* converts is a completely different signal from getting 12 clicks because *"competing brand reviewed it better"* sends people away.

The split runs automatically — no setup required. The beacon detects the closest `<a href>` ancestor of the clicked target, parses its hostname, and compares to `location.host`. Matching hostnames fire `section_click`. Non-matching fire `section_outbound`.

Where the split shows up:

- **Studio canvas chips** — the chip text shows `12 clicks` for total clicks AND a separate `outbound: N` count if any of them left the site
- **Insights dashboard → Top sections tile** — sortable by total clicks OR by outbound clicks
- **`Query::per_section_stats()`** — returns `outbound_clicks` alongside `views` and `clicks`. The `clicks` field is total (internal + outbound).

If a section is getting almost all outbound clicks, that's a strong signal to either (a) move the outbound link to a section that doesn't matter to your funnel, or (b) replace it with an internal CTA. The diagnosis surfaces in the Section_Rewrite endpoint automatically.

### Get notified when a page's traffic drops or spikes

Daily anomaly detection (added in v1.0.1) compares yesterday's pageviews for each tracked URL against the trailing-7-day daily average. Drops or spikes above ±50% (on pages with ≥20 yesterday-views, to suppress noise) trigger a dismissible admin notice.

No setup required. Once Insights is enabled and accumulating data, the daily cron runs once per 24 hours and writes the anomalies into a wp_option. The next admin page load shows a banner at the top:

> **📊 Asteris Insights — traffic anomalies detected**
> ↓ 70%   /pricing — 28 views yesterday vs 94.2 avg
> ↑ 180%  /blog/new-feature-x — 224 views yesterday vs 80.1 avg
> *...and 3 more*
>
> [Open Insights →]  [Dismiss until next anomaly]

The banner is dismissible. **Dismiss until next anomaly** writes the run timestamp into your user-meta — the same anomaly never re-surfaces. The next day's anomalies (different timestamp) DO re-surface.

This is more useful than any chart you'd otherwise check manually. Pricing pages drop quietly, blog posts spike unexpectedly — you find out the next morning instead of three weeks later.

To configure the thresholds (e.g. trigger at 30% not 50%, ignore pages with <100 yesterday-views), filter on the daily-run hook:

```php
add_filter( 'asteris_wp_insights_anomaly_threshold_pct', static fn() => 30.0 );
add_filter( 'asteris_wp_insights_anomaly_min_views',     static fn() => 100 );
```

---

## Settings reference

### Insights Settings → General

| Field | Default | What it does |
|---|---|---|
| Enable Asteris Insights tracking | OFF | Master switch. When OFF, the beacon doesn't enqueue. Schema + dashboard still render so you can preview the layout. |
| Primary metric | Visitors | Drives the hero strip. Choose Visitors (default), Conversions, or Revenue (WooCommerce). |
| Retention | 90 days | Days of raw event history kept. Clamped 7-3650. Daily cron prunes. |
| Track logged-in administrators | OFF | When OFF, admins are excluded from the beacon. Toggle on for internal-staff tracking. |
| Weekly digest email | OFF | Opt-in weekly summary email. Recipient defaults to admin_email. |

### Insights Settings → GeoIP

| Field | What it does |
|---|---|
| Reader library status | Read-only. Shows whether the vendored MaxMind\Db\Reader is loaded. |
| Database status | Read-only. Shows uploaded .mmdb file size + MaxMind build age. |
| Upload `.mmdb` file | File picker — accepts `.mmdb` up to 100 MB. Validates as Country DB before move. |
| Remove database | Deletes the uploaded file. GeoIP falls back to CF-IPCountry only. |

### Insights Settings → Data export

| Field | What it does |
|---|---|
| Download visits.csv | Streams CSV of `log_visit` rows. Capped at 100,000 rows. |
| Download events.csv | Streams CSV of `log_link_visit_action` rows joined with URLs + titles. |

### Analytics + Pixels → Data sources → Search Console

| Field | What it does |
|---|---|
| Client ID + Secret | From Google Cloud Console OAuth setup. |
| Authorize with Google | Starts the OAuth flow. |
| Property picker | Choose which Search Console property to sync (only shown after auth). |
| Last sync | Read-only — timestamp of the last successful daily sync. |
| Sync now | Manual trigger — useful after configuration changes. |
| Disconnect | Revokes tokens, removes property selection. |

---

## Developer surface

### REST endpoints

| Endpoint | Method | Purpose |
|---|---|---|
| `/wp-json/asteris-wp/v1/collect` | POST | Beacon collection endpoint (REST fallback when mu-plugin path unavailable). Accepts JSON `{url, type, title, event_data}`. Returns 204. |

The mu-plugin Drop-In at `?asteris_collect=1` is the same protocol with a faster bootstrap path.

### Filters

```php
// Toggle admin tracking programmatically (env-aware).
add_filter( 'asteris_insights_track_admins', '__return_true' );

// Extend or replace the annotation-source allowlist.
// Map: action_type → [emoji, source, severity, label_template].
add_filter( 'asteris_insights_annotation_action_types', function( array $types ) : array {
    $types['custom_module_event'] = [ '⚡', 'custom_module', 'medium', 'Custom event: {target}' ];
    return $types;
} );
```

### Recording an annotation from your own code

If you write your own plugin and want it to surface events on the Insights dashboard chart:

```php
if ( class_exists( '\AsterisShared\Modules\Activity_Log\Event_Recorder' ) ) {
    \AsterisShared\Modules\Activity_Log\Event_Recorder::record(
        'my_plugin_event',  // action_type — must be in the allowlist (see filter above)
        'my-plugin/target',
        null,
        [ 'some_field' => 123 ],  // shows up in {after.some_field} of the label_template
        [ 'source_module' => 'my_plugin' ]
    );
}
```

The Insights annotation panel will pick it up on the next dashboard render — no extra wiring.

### Database tables

| Table | Role |
|---|---|
| `wp_asteris_wp_insights_buffer` | High-write decoupling buffer. Rows added by collection endpoint, drained hourly by rollup cron. |
| `wp_asteris_wp_insights_log_action` | Dedup of URL + page-title + event-name strings via `sha1(name)` hash. Referenced by FK from log_link_visit_action. NOT pruned by retention. |
| `wp_asteris_wp_insights_log_visit` | One row per session. Sessionized by `visitor_hash` + 30-min gap. |
| `wp_asteris_wp_insights_log_link_visit_action` | One row per pageview / conversion / 404 / custom event. The most-queried table. |

Schema is Matomo-pattern two-layer architecture. Multi-site rollup is a v1.1 schema decision — `idsite SMALLINT` columns already exist on every table; single-site customers always write `idsite=1`.

### WP-CLI

The Insights module doesn't expose dedicated WP-CLI commands in v1.0 — manual rollup can be triggered from the Dashboard QA strip. WP-CLI commands for bulk export + rollup are on the roadmap (v1.1).

---

## Troubleshooting

### Dashboard shows "Preview · waiting for first visit" indefinitely

Means the buffer is empty. Check:

1. **Is tracking enabled?** Insights Settings → General → Enable Asteris Insights tracking
2. **Are you visiting as a logged-in admin?** Admins are excluded by default. Open the site in incognito or log out.
3. **Is the beacon firing?** Open browser DevTools → Network tab → load a page → look for `POST /?asteris_collect=1` (Drop-In path) or `POST /wp-json/asteris-wp/v1/collect` (REST fallback). Should return 204.
4. **Is a content blocker stripping the beacon?** uBlock Origin with aggressive rules can block it. Try a different browser.

### Mu-plugin endpoint returns 404

The Drop-In auto-installs on every admin page load if `wp-content/mu-plugins/` is writable. If your host locks that directory (some managed hosts do):

- Insights Settings → "Collection endpoint" row will show ⚠ **REST fallback — mu-plugins directory not writable**
- The beacon automatically uses the REST endpoint instead — slower (~30-50ms vs <5ms) but functional
- No action required; the customer-visible behavior is identical

### Search Console tile shows "Connect Search Console" after I connected it

The first daily sync hasn't run yet, or the sync errored. Check:

1. **Analytics + Pixels → Data sources → 🔎 Search Console** — does "Last sync" show a recent timestamp?
2. If "Last error" shows a token error: click **Disconnect** + reconnect. The refresh token may have been revoked Google-side.
3. Click **Sync now** to force a fresh pull.

### Cron rollup doesn't fire on its own

Confirm WP-Cron is working. On most hosts it triggers on every page request. If you've disabled `DISABLE_WP_CRON` and use a real system cron, schedule it to hit `wp-cron.php` at least hourly.

The Insights dashboard QA strip shows **⏰ Next cron:** with the relative time — if that's not advancing, your cron isn't firing.

---

## See also

- [Asteris Insights — marketing overview](/asteris-utility-suite/modules/insights/)
- [Analytics + Pixels module](/asteris-utility-suite/modules/analytics-pixels/) — where Search Console connection lives
- [Migrate from MonsterInsights step-by-step](/asteris-utility-suite/migrate/from-monsterinsights/)
- [Asteris vs MonsterInsights](/asteris-utility-suite/vs/monsterinsights/)
- [Security module](/asteris-utility-suite/modules/security/) — source of WAF spike + brute-force annotations
- [Activity Log module](/asteris-utility-suite/modules/activity-log/) — the audit trail Insights reads from
