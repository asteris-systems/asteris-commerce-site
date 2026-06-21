---
title: "Configure Performance"
description: "Step-by-step setup of the Asteris Performance module: page caching, asset optimisation, fetchpriority on LCP, Speculation Rules, Early Hints, field-data Core Web Vitals monitor. Quickstart in 10 minutes."
sidebar:
  order: 3
---

# Configure the Performance module

For the marketing overview of this module, see [/modules/performance](/asteris-utility-suite/modules/performance/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

The Performance module ships a **safe-defaults profile** — the optimisations that are universally safe are on by default; the optimisations that break page builders are opt-in only with explicit conflict warnings. This means Quickstart is short (3 minutes for the safe baseline). The full power comes from the workflows below.

---

## Quickstart (10 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Performance** to ON.

Activation immediately turns on the safe-defaults profile:

- ✓ Page caching (filesystem)
- ✓ Browser cache headers
- ✓ Script defer (with builder-aware exclusions)
- ✓ Image preconnect
- ✓ Native lazy loading on images
- ✓ `fetchpriority="high"` on the LCP image

No further action needed for the baseline. Verify it's working in step 3.

> 💡 **Page builder users:** these defaults are tested against Elementor, Bricks, Beaver Builder, and Divi. The aggressive optimisations (CSS combine, JS delay, link preload) are NOT in the default profile because they break page builders.

### 2. Pick a cache backend

**Asteris → Performance → Cache → Backend**

Default is **Filesystem** (writes cached HTML to `wp-content/cache/asteris/`). Works on any hosting.

Faster options if available:

- **Redis** — paste host:port, optional auth. Asteris detects existing Redis (e.g., from Object Cache Pro) and offers to share.
- **Memcached** — same flow.
- **Memory (APCu)** — only useful for object caching, not page caching.

For most sites, filesystem is fine. Switch to Redis only if your hosting provider already has Redis configured (Kinsta, WP Engine often do).

### 3. Verify caching is working

Two tests:

#### Test A — Headers

```bash
curl -I https://yoursite.com
```

Should return:

```
HTTP/2 200
cache-control: public, max-age=86400
x-asteris-cache: HIT
```

`x-asteris-cache: HIT` confirms the page was served from cache (rather than regenerated). First hit after activation will be `MISS` — refresh and you should see `HIT`.

#### Test B — DevTools

Open Chrome DevTools → **Network** tab. Reload your homepage. Click the document request (first row). In Headers → Response, find `x-asteris-cache` — should be `HIT`.

If neither shows the header, the cache isn't active. Check:

1. **Are you logged in?** Logged-in users bypass cache by default. Open an incognito window.
2. **Is the URL excluded?** Cart/checkout/my-account exclusions are sensible defaults; if your test URL matches one of those, it won't cache.
3. **Is another caching plugin active?** WP Super Cache, W3 Total Cache, WP Rocket, LiteSpeed Cache — pick one. Asteris detects conflict and stands down with a warning notice.

### 4. Run Lighthouse / PageSpeed Insights

[pagespeed.web.dev](https://pagespeed.web.dev/) → paste your site URL → wait for results.

You should see:

- **Performance score** likely 80-95 (depends on theme + content weight)
- **LCP** likely sub-2.5s for above-the-fold-only content
- **CLS** depends on theme; should be sub-0.1
- **INP** measured from field data when available

> ⚠️ **Lab data vs field data:** PageSpeed Insights shows both. The lab score is the synthesised Lighthouse run; field is from real users (via Chrome User Experience Report). **Google ranks on field data.** The lab score is for debugging — the field data is the truth.

Note your baseline before turning on more aggressive optimisations.

### 5. Enable image preconnect to your CDN (if you use one)

**Asteris → Performance → Assets → Image Preconnect**

If your media is on a CDN:

1. Add the CDN hostname (e.g., `cdn.bunny.net`, `imagedelivery.net`, your custom CF domain)
2. Save

Asteris adds `<link rel="preconnect" href="https://cdn.example.com" crossorigin>` to `<head>`. Shaves 100-300ms off image fetch on first paint.

### 6. Set up scheduled cache purge (optional)

**Asteris → Performance → Cache → Purge**

Defaults:

- ✓ Purge on post save / update
- ✓ Purge on theme/plugin update
- ✓ Purge on comment approval (page where the comment lives)
- ✓ Purge on cron at 03:00 site-local time (full purge)

The 03:00 nightly full-purge prevents stale-cache accumulation. Adjust the time if 03:00 conflicts with your traffic peak — most sites are fine with default.

### 7. Verify Speculation Rules are active (Chromium browsers)

**Asteris → Performance → Modern → Speculation Rules** → confirm toggle is ON (it's on by default).

In a Chrome/Edge browser, view source on your homepage. Search for `<script type="speculationrules">` — you should see a block like:

```json
{
  "prerender": [
    {
      "source": "list",
      "urls": ["..."]
    },
    {
      "source": "document",
      "eagerness": "moderate"
    }
  ]
}
```

Chrome prerenders pages on hover (when eagerness is "moderate"). The user experiences near-instant page loads for any link they hover before clicking.

> 💡 Speculation Rules is Chromium-only currently. Firefox/Safari users get the standard click-load. No fallback needed; the spec degrades gracefully.

### 8. Enable Early Hints (if your host supports it)

**Asteris → Performance → Modern → Early Hints**

Asteris auto-detects host support:

- **Cloudflare** (with Early Hints feature flag) — supported
- **Fastly** — supported
- **Some Nginx + recent Apache configs** — supported
- **Most shared hosting** — not supported (Asteris detects and disables the toggle)

If your host shows as "supported", toggle ON. Asteris will push 103 Early Hints responses pointing the browser at critical resources before the main response arrives. ~50-200ms LCP improvement on cold loads.

### 9. Start the field-data CWV monitor

**Asteris → Performance → CWV Monitor** → toggle ON.

Asteris connects to the public Chrome UX Report (CrUX) API. No setup beyond toggling.

After 28 days of real-user data accumulating, you'll see in the CWV dashboard:

- LCP / INP / CLS at the URL level (top 100 URLs)
- 28-day trend per metric
- Pages failing the "good" thresholds (LCP <2.5s, INP <200ms, CLS <0.1)

> ⚠️ CrUX only includes sites with sufficient Chrome traffic. New / low-traffic sites may not have CrUX data — Asteris will display "Insufficient data" until traffic accumulates. Once you have ~1k+ Chrome users per month, data fills in.

### 10. Bookmark the CWV dashboard

Set a calendar reminder for 28 days from now to come back and review the CWV data. By then you'll have real user-experience metrics, not just lab estimates.

---

## Common workflows

### Decide whether to enable CSS combine + JS delay (the risky toggles)

These two settings are opt-in only because they break page builders if applied carelessly. Decision framework:

**Enable CSS combine if:**

- You're on a static theme (no page builder) OR
- You've tested the homepage + 3-5 key landing pages with combine ON and confirmed nothing breaks visually

**Enable JS delay if:**

- You're on a content site (blog, magazine, marketing site) where no JavaScript is critical to first paint
- You've tested cart/checkout/forms/calculators — anything interactive — and confirmed they still work
- You're willing to accept that interactive elements may take 100-500ms longer to "wake up"

**Don't enable if:**

- You're on Elementor / Bricks / Beaver Builder / Divi without testing — these builders have known sensitivity to JS delay timing
- You run forms that submit before first user interaction (e.g., auto-fired tracking pixels)
- You can't test page-by-page

To enable: **Asteris → Performance → Assets → Advanced → CSS Combine / JS Delay** → toggle ON one at a time, then test.

> ⚠️ Always toggle one optimisation at a time. If something breaks, you know which setting caused it.

### Switch from WP Rocket to Asteris Performance

WP Rocket and Asteris both hook the page-cache layer, so they conflict. Steps:

1. **Note your WP Rocket settings** — screenshot the WP Rocket dashboard so you have a record of what was on
2. **Deactivate WP Rocket** — Plugins → Deactivate. Cache is auto-cleared by WP Rocket's deactivation hook.
3. **Activate Asteris Performance** module if not already
4. **Map WP Rocket settings to Asteris equivalents** — most are 1:1; some don't exist:
   - Page caching → Asteris cache (same)
   - Browser cache headers → on by default in Asteris
   - Defer JS → Asteris defer-async (with builder exclusions)
   - Combine CSS → Asteris CSS combine (opt-in, with warning)
   - Combine JS → Asteris JS combine (opt-in)
   - Lazy load images → Asteris lazy loading (on by default, native)
   - WP Rocket's "Optimize CSS delivery" (critical CSS) → Asteris critical CSS (opt-in)
   - WP Rocket database optimization → **NOT in Asteris** (use WP-Optimize separately)
5. **Wait 24 hours, watch the field-data CWV monitor** — should remain stable
6. **Delete WP Rocket** after a clean week (don't leave inactive plugins lingering — security risk)

### Configure a CDN

**Asteris → Performance → CDN**

Asteris supports CDN integration in two modes:

**Mode A — Rewriter only** (for Bunny CDN, custom Cloudflare configs, generic CDNs):

1. Set **Origin URL** (your site's domain, e.g., `https://example.com`)
2. Set **CDN URL** (e.g., `https://cdn.example.com`)
3. Asteris rewrites `<img src>`, `<link href>` for CSS, `<script src>`, and other asset URLs to point at the CDN
4. Configure your CDN to fetch from the origin

**Mode B — Cloudflare integration** (if you have Cloudflare in front):

1. Paste your **Cloudflare API token** (with Zone:Read + Cache:Purge:Edit scope)
2. Paste your **Zone ID** (from your Cloudflare dashboard's right sidebar)
3. Save

Asteris will now purge Cloudflare cache when you save a post, plus a few other automatic-purge events. Helpful when you're serving from Cloudflare's edge.

### Optimise Largest Contentful Paint (LCP)

LCP is the single most-actionable Core Web Vital. The metric measures how fast the largest above-the-fold element renders.

Asteris's LCP optimisation flow:

1. **Asteris → Performance → CWV Monitor → Pages failing LCP**
2. For each failing page, Asteris suggests:
   - LCP element identification (which DOM element is the LCP target)
   - Whether it's an image (90% of cases), large heading, or video
   - Recommended fix (add `fetchpriority="high"` if image; preconnect to source; size the image to actual rendered dimensions; convert to WebP/AVIF)
3. Many of these are auto-applied by Asteris:
   - ✓ `fetchpriority="high"` on the detected LCP image — auto
   - ✓ Image preconnect — auto
   - ⚠️ Resize image to rendered dimensions — manual (or use Asteris Image Optimisation's bulk resize)
   - ⚠️ Convert to WebP/AVIF — auto if [Image Optimisation module](/asteris-utility-suite/docs/modules/image-optimisation/) is active

For the deep-dive walkthrough, see [/docs/tutorials/wire-up-cwv-and-speculation-rules](/asteris-utility-suite/docs/tutorials/wire-up-cwv-and-speculation-rules/).

### Purge cache manually

When you publish a critical change and don't want to wait for the auto-purge:

**Asteris → Performance → Cache → Actions**

- **Purge all** — empties the entire cache (use for theme changes, plugin updates)
- **Purge URL** — paste a single URL to purge only that
- **Purge tag** — purge by content-type tag (e.g., "all category pages")

Or via WP-CLI:

```bash
wp asteris performance cache purge
wp asteris performance cache purge-url --url=https://example.com/specific-page
```

### Diagnose a slow page

1. Run the URL through [pagespeed.web.dev](https://pagespeed.web.dev/) — note LCP, INP, CLS lab + field values
2. Open Chrome DevTools → **Performance** → Record → reload the page
3. Look at the waterfall:
   - **First request (HTML)** taking >500ms → server-side problem (hosting / cache miss / heavy theme PHP)
   - **First contentful paint >1s** → blocking CSS or JS
   - **LCP element fetch >1.5s** → image too large, no preconnect, not WebP/AVIF
   - **Long tasks >50ms** in the JS column → third-party scripts (analytics, ads, embeds)
4. Fix the largest item first; rerun PageSpeed; iterate

Asteris's CWV Monitor surfaces some of this automatically — check the **Recommendations** tab per URL.

---

## Settings reference

### Cache

- **Backend** — Filesystem (default) / Redis / Memcached
- **TTL** — default 24 hours; configurable per content-type
- **Logged-in user bypass** — always on (cannot disable)
- **Per-URL exclusions** — regex patterns
- **Auto-purge** triggers — post save, plugin/theme update, comment approval, cron
- **Mobile cache separation** — on by default (serves different cached versions to mobile vs desktop)

### Assets

- **Script defer/async** — on with builder-aware exclusions
- **CSS minification** — per-file opt-in
- **JS minification** — per-file opt-in
- **CSS combine** — opt-in (warns of builder conflicts)
- **JS delay** — opt-in (warns of plugin conflicts)
- **Critical CSS** — auto-generate above-the-fold CSS, inline in `<head>`
- **Image preconnect** — auto-add `<link rel="preconnect">` to image-source domains
- **Native lazy loading** — `loading="lazy"` on `<img>` elements

### Modern

- **`fetchpriority="high"` on LCP image** — on by default; per-image override available
- **Speculation Rules** — `<script type="speculationrules">` for prerender on hover (Chromium)
- **Early Hints (103)** — auto-detected host support
- **Image format hints** — emit `<link rel="preload">` with `imagesrcset` for the LCP image

### CWV Monitor

- **CrUX API connection** — toggle
- **Update frequency** — daily / weekly (default daily)
- **Field-data thresholds** — Good / Needs Improvement / Poor breakpoints (Google defaults)
- **Trend window** — 7 / 28 / 90 days

### CDN

- **Rewriter** — Origin URL + CDN URL
- **Cloudflare integration** — API token + Zone ID for auto-purge
- **Per-domain CDN rules** — for sites with multiple CDN destinations (e.g., images on one, JS on another)

### WC Coordination

When Asteris for WooCommerce is installed (separate plugin):

- ✓ Never cache `/cart/`, `/checkout/`, `/my-account/`, `/order-received/`
- ✓ Auto-purge on order status change
- ✓ Cart fragments excluded from JS delay

---

## REST API

```
# Cache
GET    /wp-json/asteris/v1/performance/status
POST   /wp-json/asteris/v1/performance/cache/purge
POST   /wp-json/asteris/v1/performance/cache/purge-url
GET    /wp-json/asteris/v1/performance/cache/stats

# CWV
GET    /wp-json/asteris/v1/performance/cwv
POST   /wp-json/asteris/v1/performance/cwv/refresh

# Config
GET    /wp-json/asteris/v1/performance/config
PUT    /wp-json/asteris/v1/performance/config
```

---

## WP-CLI

```bash
# Cache management
wp asteris performance cache purge
wp asteris performance cache purge-url --url=<url>
wp asteris performance cache stats

# CWV monitor
wp asteris performance cwv refresh
wp asteris performance cwv export --format=csv --output=cwv.csv

# Critical CSS regeneration
wp asteris performance critical-css regenerate
wp asteris performance critical-css regenerate --url=<url>

# Config
wp asteris performance config get
wp asteris performance config set --key=cache_ttl --value=86400
```

---

## See also

- [Tutorial: Wire up CWV + Speculation Rules](/asteris-utility-suite/docs/tutorials/wire-up-cwv-and-speculation-rules/)
- [Asteris vs WP Rocket comparison](/asteris-utility-suite/vs/wp-rocket/) — safe-defaults framing
- [WordPress Core Web Vitals guide](/asteris-utility-suite/guides/wordpress-core-web-vitals/) — LCP/INP/CLS practitioner reference
- [Image Optimisation module](/asteris-utility-suite/docs/modules/image-optimisation/) — WebP/AVIF coordination
