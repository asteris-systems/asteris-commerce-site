---
title: "Wire up Core Web Vitals + Speculation Rules"
description: "End-to-end Performance module setup for the modern Web Vitals stack: fetchpriority on LCP image, Speculation Rules for hover-prerender, Early Hints (103) where supported, field-data Core Web Vitals monitoring via CrUX. ~20 minutes setup."
sidebar:
  order: 8
---

# Wire up CWV + Speculation Rules

**Goal:** in ~20 minutes, your WordPress site uses the modern Core Web Vitals optimisation techniques (fetchpriority on LCP image, Speculation Rules for hover-prerender, Early Hints, field-data CWV monitoring). These move the needle on real-user CWV scores — which is what Google ranks on.

**Asteris modules used:** Performance (paid tier; lite version doesn't include the modern techniques)

**Why this matters:**

- **Google ranks on field data**, not lab data. PageSpeed Insights shows both; the lab score is for debugging, field data is what determines ranking.
- **The modern techniques** (Speculation Rules, Early Hints, fetchpriority) typically move LCP from 3-4s lab to 1-2s field. They're the difference between "good" and "great" on Web Vitals.
- **Most WordPress sites don't have these yet** — they're recent additions to Chromium browsers + Cloudflare/Fastly hosting infrastructure. Asteris ships them by default.

---

## Before you start

You need:

- **A paid Asteris Utility Suite licence** (Performance module is paid)
- The **Performance module already activated** (see [Performance module configuration](/asteris-utility-suite/docs/modules/performance/) Quickstart if not)
- Some real visitor traffic — the CWV monitor uses Chrome User Experience Report (CrUX) data, which only has stats for sites with ~1k+ Chrome users per month
- ~20 minutes

If you have a brand-new site (no traffic yet), wait a few weeks until CrUX has data. The modern-techniques toggles still work without CrUX data; you just can't verify field-data improvement yet.

---

## Step 1 — Run a baseline PageSpeed Insights test

[pagespeed.web.dev](https://pagespeed.web.dev/) → paste your homepage URL → run.

You'll see:

- **Core Web Vitals Assessment** — Passed / Failed (field data summary)
- **Field data** — LCP / INP / CLS for real users (28-day window)
- **Lab data** — what Lighthouse synthesises in a controlled test

**Take a screenshot.** This is your baseline. Note:

- LCP target: <2.5s (good), <4s (needs improvement)
- INP target: <200ms (good), <500ms (needs improvement)
- CLS target: <0.1 (good), <0.25 (needs improvement)

If you don't see field data, your site doesn't have enough traffic for CrUX. The lab score is your baseline instead.

---

## Step 2 — Identify the LCP element on your homepage

Open Chrome DevTools → **Performance** tab → Record a page load → Stop. In the timeline, look for the "Largest Contentful Paint" mark.

Click it. The bottom panel shows which DOM element is the LCP target. Common LCP elements:

- **Hero image** (90% of cases on content sites)
- **Hero heading** (rare; usually on text-only landing pages)
- **Hero video** (rare; mostly autoplay-disabled video posters)

If your LCP is a hero image (very likely), Step 3 onward is dramatic. If it's something else, the improvements are smaller but still meaningful.

---

## Step 3 — Enable `fetchpriority` on LCP image

**Asteris → Performance → Modern → fetchpriority on LCP image**

Toggle ON (default).

Asteris automatically detects the LCP image on each page (using runtime heuristics + CrUX data when available) and adds `fetchpriority="high"` to it.

Example output in HTML:

```html
<img src="https://yoursite.com/hero.webp"
     alt="Hero"
     loading="eager"
     fetchpriority="high"
     width="1920"
     height="1080">
```

`fetchpriority="high"` tells the browser this image is critical — prioritise its download. Combined with `loading="eager"` (don't lazy-load it), this dramatically improves LCP.

**Verification:** view source on your homepage. Search for `fetchpriority="high"`. Should appear on your hero image.

If it doesn't appear:

- Asteris's LCP detection might be wrong. **Asteris → Performance → Modern → fetchpriority on LCP → Manual override** → specify the LCP image URL or CSS selector
- Some themes override Asteris's filter. Test in a different theme to isolate

---

## Step 4 — Enable Speculation Rules

**Asteris → Performance → Modern → Speculation Rules**

Toggle ON.

Asteris adds a `<script type="speculationrules">` block to `<head>`. The block tells Chromium browsers to **prerender** likely-next pages when the user hovers (or touches) a link.

Example output:

```html
<script type="speculationrules">
{
  "prerender": [
    {
      "source": "list",
      "urls": ["/", "/pricing", "/modules", "/free"]
    },
    {
      "source": "document",
      "eagerness": "moderate"
    }
  ]
}
</script>
```

When a user hovers a link, Chromium prerenders the destination in the background. By the time they click, the page is already rendered — near-instant navigation.

Behaviour:

- **`eagerness: "moderate"`** — prerender on hover after 200ms (filters out fly-over hovers; only triggers on intent)
- **`eagerness: "eager"`** — prerender immediately on hover (uses more memory + bandwidth; faster perceived navigation)
- **`eagerness: "conservative"`** — only prerender on user click intent (mousedown)

Defaults to moderate. Configure per-page or per-link selector for finer control.

**Verification:** in Chrome (DevTools open), hover a link on your site. Wait 250ms. Don't click. In DevTools → Application → Speculative Loads, you should see a "Prerender started" entry.

---

## Step 5 — Enable Early Hints (if your host supports it)

**Asteris → Performance → Modern → Early Hints**

Asteris auto-detects host support:

- ✓ **Cloudflare** — supported (requires Early Hints feature enabled on your Cloudflare zone)
- ✓ **Fastly** — supported (most plans)
- ✓ **Some Nginx + Apache configurations** — supported (rare; requires explicit config)
- ✗ **Most shared hosting** — NOT supported (Asteris detects and disables the toggle)

If your host is supported, toggle ON. Asteris will push 103 Early Hints responses pointing the browser at critical resources before the main response arrives.

Example: when a user navigates to a page, the host sends:

```
HTTP/2 103 Early Hints
Link: <https://cdn.example.com/critical.css>; rel=preload; as=style
Link: <https://cdn.example.com/hero.webp>; rel=preload; as=image
```

The browser starts fetching `critical.css` and `hero.webp` while the server is still generating the full HTML response. When the HTML arrives, those resources are already in cache.

**Impact:** ~50-200ms LCP improvement on cold loads. Most noticeable on mobile / slow networks.

**Cloudflare-specific:** In Cloudflare dashboard → **Speed → Optimization → Early Hints** → enable. Without this Cloudflare-side flag, Asteris's hints don't propagate to the browser.

---

## Step 6 — Set up the CWV Monitor

**Asteris → Performance → CWV Monitor**

Toggle ON.

Asteris connects to the Chrome UX Report (CrUX) API. CrUX is Google's public field-data dataset — real-user CWV measurements aggregated across all Chrome users.

For sites with enough traffic, you'll see:

- **28-day rolling LCP / INP / CLS** for the URL level (top 100 URLs)
- **Trend over time**
- **Pages failing "good" thresholds** — highlighted for remediation
- **Per-page Recommendations** — specific fixes Asteris suggests for each failing URL

For low-traffic sites (<1k Chrome users/month), CrUX shows "Insufficient data". Wait until traffic accumulates.

---

## Step 7 — Wait + iterate

The CWV monitor needs 28 days to fill out properly. In the meantime:

### Daily

- Check **Asteris → Performance → CWV Monitor → Recent** for early signals
- Run PageSpeed Insights on changed pages — confirm lab data improvements

### Weekly

- Compare baseline (Step 1) to current — should see LCP / INP improvements
- Review **Asteris → Performance → CWV Monitor → Recommendations** — fix per-URL suggestions

### After 28 days

- The full 28-day window is populated
- Field data should show improvements:
  - LCP: typically 30-50% improvement from baseline
  - INP: typically 20-40% improvement (depends on JavaScript-heavy themes)
  - CLS: depends on baseline; well-coded themes won't change

---

## Step 8 — Set up alerts on regression

**Asteris → Performance → CWV Monitor → Alerts**

- ✓ **Alert on regression** — when 28-day LCP / INP / CLS degrades by >10% week-over-week
- ✓ **Alert on Critical threshold breach** — when LCP goes above 4s (or INP above 500ms, CLS above 0.25)
- **Alert recipient** — admin email or dedicated `performance@` mailbox

Useful for catching:

- A new heavy plugin slowing the site
- A theme update introducing layout shift
- A CDN issue increasing LCP
- A new high-traffic page that's unoptimised

---

## Step 9 — Page-by-page optimisation

Use the CWV Monitor's per-page Recommendations to target the slowest URLs:

1. **Asteris → Performance → CWV Monitor → Pages failing LCP**
2. For each failing page, click to expand:
   - **LCP element** — what's being measured (hero image, heading, video)
   - **Current LCP** — field-data value
   - **Suggested fixes** — Asteris's recommendations:
     - Add `fetchpriority="high"` if image
     - Preconnect to image source
     - Resize image to rendered dimensions
     - Convert to WebP/AVIF
     - Reduce hero CSS complexity
3. Apply the fixes manually (or let Asteris auto-apply where possible)
4. After 7-28 days, the CWV monitor updates with new field data

---

## Common issues

### "Speculation Rules aren't firing in my Chrome"

Speculation Rules requires Chromium 110+. Check `chrome://version` to verify your browser version.

Some Chrome extensions (ad blockers, privacy extensions) block speculation rules. Test in incognito with extensions disabled.

If Speculation Rules still don't fire, check Asteris → Performance → Modern → Speculation Rules → Verification — the verification tool shows what Asteris emitted and whether the browser accepts it.

### "Early Hints toggle is disabled — host not supported"

Most shared hosting doesn't support Early Hints. Asteris detects via a HEAD request that includes a probe header; if the host echoes the probe in a 103 response, support is confirmed.

To verify your host explicitly:

```bash
curl -I --http2 https://yoursite.com
```

Look for `103 Early Hints` in the output. If present, your host supports it. If not, Asteris correctly detects "not supported".

To enable on Cloudflare: dashboard → Speed → Optimization → Early Hints → Enabled.

### "fetchpriority added but LCP didn't improve"

Possible causes:

1. **LCP isn't an image** — fetchpriority helps images specifically. Check Step 2 — what is your actual LCP element?
2. **Image is already small** — if your hero is 50KB and loads in 200ms anyway, fetchpriority adds nothing
3. **Bandwidth-constrained** — fetchpriority prioritises within available bandwidth. If your hosting has slow outbound bandwidth, the image takes the same time regardless of priority
4. **Caching layer between Asteris and browser** — some CDNs strip `fetchpriority` header. Check served HTML directly with `curl -I`

### "CWV Monitor shows 'Insufficient data'"

Your site doesn't have enough Chrome traffic for CrUX. Options:

1. Wait for traffic to accumulate (Google updates CrUX monthly; typically 1k+ Chrome users in 28 days threshold)
2. Use lab data (PageSpeed Insights) in the meantime
3. Use Real User Monitoring (Asteris's CWV monitor is CrUX-based; for actual per-page-load measurement, integrate with Cloudflare Web Analytics or similar RUM service separately)

### "CWV improved on field data but lab is still poor"

Lab data uses a simulated mobile device on a simulated 4G connection. It's intentionally pessimistic — your real users on faster connections see better performance.

What matters for ranking is field data. If field is good, you're winning.

If you want to improve lab specifically (e.g., for a CWV-aware client report):

- Optimise for the simulated environment: smaller images, more aggressive compression, fewer third-party scripts
- Note that some optimisations help lab but not real users (e.g., aggressive critical CSS extraction); diminishing returns

---

## See also

- [Performance module configuration](/asteris-utility-suite/docs/modules/performance/)
- [WordPress Core Web Vitals guide](/asteris-utility-suite/guides/wordpress-core-web-vitals/) — LCP/INP/CLS reference
- [Asteris vs WP Rocket comparison](/asteris-utility-suite/vs/wp-rocket/) — modern techniques angle
- [Image Optimisation module](/asteris-utility-suite/docs/modules/image-optimisation/) — coordinates fetchpriority on LCP image
- [Chrome Speculation Rules spec](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script/type/speculationrules)
- [Early Hints (HTTP 103) explainer](https://developer.chrome.com/blog/early-hints)
