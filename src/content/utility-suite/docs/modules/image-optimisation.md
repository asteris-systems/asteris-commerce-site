---
title: "Configure Image Optimization"
description: "Step-by-step setup of the Asteris Image Optimization module: JPEG/PNG compression, WebP + AVIF conversion, bulk-optimise existing media, lazy loading, EXIF stripping, retina (2x) generation, CDN integration. Quickstart in 10 minutes."
sidebar:
  order: 8
---

# Configure the Image Optimization module

For the marketing overview of this module, see [/modules/image-optimisation](/asteris-utility-suite/modules/image-optimisation/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

Images are typically 50-80% of a page's total weight. Optimising them is the single highest-leverage performance win on most WordPress sites. The Quickstart below gets WebP + bulk-optimise running in 10 minutes.

---

## Quickstart (10 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Image Optimisation** to ON.

Activation enables the safe defaults:

- ✓ JPEG compression at quality 82
- ✓ PNG lossless compression
- ✓ WebP conversion for every new upload
- ✓ Native lazy loading on `<img>` tags
- ✓ `<picture>` element wrapping (so browsers get WebP, with JPEG fallback)

### 2. Run the bulk optimiser on your existing media library

**Asteris → Image Optimisation → Bulk Optimise**

If your media library has been accumulating for a while, the bulk optimiser walks through every existing image, compresses it, and generates WebP versions. **This is the single highest-impact step in this Quickstart.**

1. **Per-batch size** — default 50 images per cron run (works on shared hosting; bump to 200 on dedicated)
2. **Click Start**
3. Asteris kicks off a background process

Progress is shown in the dashboard. You can leave the panel and come back — the process runs on `WP-Cron` independently. For a 500-image library, expect ~10-20 minutes total wall-clock time.

Original images are preserved (the optimiser saves WebP + compressed JPEG alongside, never replacing the original). You can revert any image individually.

### 3. Enable AVIF (recommended for paid tier)

AVIF is the next-generation format: ~40-50% smaller than JPEG, ~25-30% smaller than WebP. Browser support is ~93% and rising. Asteris generates AVIF alongside WebP + the original.

**Asteris → Image Optimisation → Formats → AVIF** → toggle ON.

Browsers that support AVIF get the smallest file. Browsers that don't get WebP. Browsers that support neither get the original.

Asteris regenerates AVIF for the existing library on the next bulk-optimise run. Or trigger immediately:

```bash
wp asteris images bulk-optimise --formats=avif
```

> 💡 AVIF is the recommended default for paid tier (more storage but better field-data CWV scores). The free version of the module includes WebP only.

### 4. Set up `fetchpriority` on LCP image

**Asteris → Image Optimisation → Modern → fetchpriority on LCP**

Toggle ON (default).

This coordinates with the [Performance module](/asteris-utility-suite/docs/modules/performance/) — when both are active, Asteris detects the LCP image on each page and adds `fetchpriority="high"` to it. The browser fetches that image with high priority, improving LCP times.

### 5. Verify with PageSpeed Insights

Run your homepage through [pagespeed.web.dev](https://pagespeed.web.dev/).

Before this Quickstart vs after: you should see image-size reductions in the **Diagnostics → "Properly size images"** + **"Serve images in next-gen formats"** sections drop by 30-60%.

LCP should improve. CLS shouldn't change (already-set image dimensions don't shift). INP shouldn't change (not image-related).

### 6. Enable lazy loading rules (optional)

WordPress 5.5+ adds `loading="lazy"` natively. Asteris's lazy loading layer adds:

**Asteris → Image Optimisation → Lazy Load**

- **Skip above-the-fold images** — toggle ON (don't lazy-load images visible on first paint; lazy-loading them hurts LCP)
- **Per-post-type rules** — eager-load on landing pages, lazy elsewhere
- **Eager-load on specific selectors** — e.g., `.hero img` always eager

For most sites, the defaults are right. Customise only if you have landing pages where image-above-fold is critical.

### 7. (Optional) Strip EXIF metadata — free tier

**Asteris → Image Optimisation → Privacy → Strip EXIF**

Toggle ON to remove EXIF metadata (geolocation, camera info, edit history) from new uploads. **This moved from paid to free in v1.0** — geolocation EXIF on user-uploaded photos is a real privacy concern; compliance baseline shouldn't be gated.

Reasons to strip:

- **Privacy** — geolocation EXIF on a personal photo leaks where it was taken
- **Size** — EXIF adds 5-15 KB per image; small per-image but adds up across a media library

Reasons NOT to strip:

- **Photography portfolios** — photographers often want EXIF preserved (camera + lens settings are part of the artistic record)
- **Stock photo sites** — same

Most content sites should strip. Photography sites should keep. Per-post-type rules available if you want different behaviour for different content.

### 8. (Optional) Set up CDN integration

If your media is served from a CDN:

**Asteris → Image Optimisation → CDN**

Pick the integration:

- **Cloudflare Polish + Mirage** — Asteris signs off on Cloudflare's image optimisation (avoids double-optimisation)
- **Bunny Optimizer + Stream** — adds Bunny's URL-based transformation
- **Generic CDN rewriter** — point image URLs at any CDN domain
- **Cloudinary** — URL-based delivery with auto-transform
- **ImageKit** — URL-based delivery with auto-transform

Each integration has provider-specific config (API keys, zone IDs). Save and verify by viewing image URLs on your site — they should point at the CDN now.

### 9. (Optional) Enable retina generation

For HiDPI displays (Mac Retina, iPhone, modern Android), 2x versions look sharper:

**Asteris → Image Optimisation → Retina** → toggle ON.

Asteris generates 2x versions on upload + serves them via `srcset`. Non-retina users still get the 1x version (browser picks based on device pixel ratio).

> ⚠️ Retina doubles storage per image. On a 5000-image library, that's substantial. Trade-off: ~50-100MB extra storage vs sharper images on ~70% of mobile devices.

### 10. Done — verify the cumulative effect

Run PageSpeed Insights one more time on the homepage. Compare to step 5 baseline:

- LCP should be measurably better (target: <2.5s)
- "Serve images in next-gen formats" warning should be gone
- "Properly size images" should be gone if you ran bulk-optimise
- Image transfer size should be 40-60% smaller than baseline

That's the baseline image optimisation. Workflows below cover bulk re-optimisation, undoing changes, and the trickier configurations.

---

## Common workflows

### Re-run bulk optimisation after changing settings

If you changed compression quality / enabled AVIF / enabled retina after first run, you'll want to re-optimise the existing library:

1. **Asteris → Image Optimisation → Bulk Optimise**
2. **Mode** — pick:
   - **Only new/unprocessed** — default; skip already-optimised
   - **Re-optimise all** — process everything again with new settings
   - **Re-optimise with new format only** — e.g., add AVIF to images that only have WebP
3. **Click Start**

Asteris detects what's missing per image and skips work that's already done.

### Revert an over-compressed image

Sometimes a specific image looks bad after compression (lots of fine detail compressed away):

1. **Media → Library** → find the image
2. **Edit** → Asteris Image Optimisation panel on the right
3. **Restore original** — Asteris swaps the optimised version back to the original
4. Optionally re-optimise with **Quality: 95** (higher quality, larger file) for this specific image

Original is preserved — restore is non-destructive.

### Switch from Smush / ShortPixel / Imagify to Asteris

These plugins typically replace originals with optimised versions. Asteris does NOT — it saves alongside. Migration:

1. Install Asteris + activate Image Optimisation module
2. **Note: your current "originals" are actually the previously-optimised versions** (the real originals were replaced by your old plugin)
3. Deactivate the old plugin (don't delete yet)
4. Run **Asteris → Image Optimisation → Bulk Optimise** in **Re-optimise all** mode
5. Asteris compresses what's there — slight additional compression, but mostly Asteris is generating new formats (WebP, AVIF)
6. After verifying everything renders correctly, delete the old plugin

Quality loss from re-compression is minimal (1-3%) but visible on critical hero images. If those images matter, re-upload the true originals from your source files.

### Configure for an image-heavy portfolio site

For photography / design / agency portfolios where image quality is paramount:

**Asteris → Image Optimisation → Settings**

- **JPEG quality** — bump from 82 to **90** (visually lossless for most viewers)
- **PNG mode** — keep lossless
- **AVIF** — ON
- **Strip EXIF** — OFF (photographers keep EXIF)
- **Retina** — ON (worth the storage)
- **Lazy loading** — eager-load gallery hero images via the selector option

Bulk-optimise at the higher quality setting. Files will be larger than the default 82 quality but still meaningfully smaller than uncompressed originals.

### Use a CDN with Cloudflare Polish

Cloudflare Polish auto-optimises images at the edge. If you use it, you don't need Asteris's compression — Cloudflare handles it.

**Asteris → Image Optimisation → CDN → Cloudflare Polish**

- ✓ **Cloudflare Polish active** — toggle ON
- Asteris stops generating WebP / AVIF locally (Cloudflare does it on-the-fly)
- Asteris still handles `fetchpriority` + lazy loading + retina (those are page-side, not edge-side)

Net effect: less storage, less server-side CPU, equivalent or better delivery (Cloudflare edge is faster than your origin).

The trade-off: Polish only works for images served through Cloudflare. If you have a multi-host setup, keep local optimisation on for the non-Cloudflare images.

### Optimise images via WP-CLI (no admin panel needed)

```bash
# Optimise everything
wp asteris images bulk-optimise

# Re-optimise with AVIF only
wp asteris images bulk-optimise --formats=avif

# Optimise specific attachment
wp asteris images optimise --id=1234

# Restore an attachment to original
wp asteris images restore --id=1234

# Show what's pending
wp asteris images bulk-optimise status
```

Useful for staging environments where the admin panel is slow / unavailable.

### Detect + fix images that are too large for their rendered size

Images that ARE 2000px wide but display at 400px are wasting 80% of bytes. Asteris can detect + flag these:

**Asteris → Image Optimisation → Diagnostics → Oversized Images**

Shows the top 20 oversized images on the homepage + the 10 next most-trafficked pages. Per-image:

- **Source dimensions** (e.g., 2000×1500)
- **Rendered dimensions** (e.g., 400×300 from inspection of the live page)
- **Suggested fix** — Resize to match rendered + 1.5x for retina (so 600×450)
- **Action** — click to generate the resized version + use it on the page

This is iterative — fix the worst offenders first. After fixing them, re-run diagnostics to find the next batch.

---

## Settings reference

### Compression

- **JPEG quality** — 60-100 (default 82)
- **PNG mode** — lossless (default) / lossy
- **Per-image-size quality** — override per WordPress image size (full / large / medium / thumbnail)
- **Strip EXIF on upload** — toggle

### Formats

- **WebP** — auto-generate (default ON)
- **AVIF** — auto-generate (paid tier)
- **Format negotiation** — via `<picture>` element with `srcset`
- **Manual format override** per image — admin can force JPEG/PNG for compatibility edge cases

### Bulk

- **Batch size** — default 50 per cron run; configurable 1-1000
- **Resume on interruption** — auto-resumes if cron dies mid-batch
- **Modes** — Only new / Re-optimise all / Re-optimise with new format only
- **Schedule** — manual trigger / daily auto-run / weekly auto-run

### Lazy loading

- **Native `loading="lazy"`** — on `<img>` elements (WordPress 5.5+)
- **Skip above-the-fold** — toggle
- **Eager-load selectors** — CSS selectors to always load eagerly
- **Per-post-type rules**

### Modern

- **`fetchpriority="high"` on LCP image** — coordinates with Performance module
- **Image preconnect** — auto-add `<link rel="preconnect">` to CDN domains
- **Resource hints** — `<link rel="preload">` for critical above-the-fold images

### Retina

- **Generate 2x versions** — toggle
- **Serve via `srcset`** — automatic
- **Skip on slow connections** — uses the `Save-Data` header

### CDN

- **Rewriter** — Origin URL + CDN URL
- **Cloudflare Polish + Mirage**
- **Bunny Optimizer**
- **Cloudinary**
- **ImageKit**
- **Custom URL transformation rules**

---

## REST API

```
# Per-image
GET    /wp-json/asteris/v1/images/<id>                  # status + variants
POST   /wp-json/asteris/v1/images/<id>/optimise
POST   /wp-json/asteris/v1/images/<id>/restore

# Bulk
POST   /wp-json/asteris/v1/images/bulk-optimise          # body: { mode, batch_size, formats }
GET    /wp-json/asteris/v1/images/bulk-optimise/status

# Format conversion
POST   /wp-json/asteris/v1/images/convert
       body: { id, format: "webp"|"avif", quality }

# Diagnostics
GET    /wp-json/asteris/v1/images/diagnostics/oversized?limit=20
```

---

## WP-CLI

```bash
# Bulk
wp asteris images bulk-optimise
wp asteris images bulk-optimise status
wp asteris images bulk-optimise --batch-size=200
wp asteris images bulk-optimise --formats=avif,webp
wp asteris images bulk-optimise --mode=re-optimise-all

# Per-image
wp asteris images optimise --id=<attachment_id>
wp asteris images restore --id=<attachment_id>

# Conversion
wp asteris images convert --id=<id> --format=webp --quality=82
wp asteris images convert --all --format=avif

# Diagnostics
wp asteris images diagnostics oversized --limit=20
```

---

## See also

- [Performance module](/asteris-utility-suite/docs/modules/performance/) — coordinates `fetchpriority` on LCP image
- [WordPress Core Web Vitals guide](/asteris-utility-suite/guides/wordpress-core-web-vitals/) — LCP improvements
- [WordPress sitemap guide](/asteris-utility-suite/guides/wordpress-sitemap-guide/) — Asteris adds image sitemap extensions for image SEO
