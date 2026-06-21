---
url: /asteris-utility-suite/modules/image-optimisation
title: "WordPress Image Optimization Plugin — Asteris (WebP, AVIF, Bulk, CDN)"
description: "Asteris Image Optimization is a WordPress image optimization plugin with JPEG/PNG compression, WebP + AVIF conversion, bulk-optimise existing library, lazy loading, EXIF stripping, retina generation, and CDN integration."
og_title: "Asteris Image Optimization — WebP + AVIF for WordPress"
og_description: "WebP, AVIF, bulk-optimise, lazy load, EXIF strip, CDN integration. Free lite version on WordPress.org."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/image-optimisation
primary_keyword: wordpress image optimization plugin
secondary_keywords:
  - wordpress webp plugin
  - wordpress avif plugin
  - smush alternative
  - imagify alternative
  - shortpixel alternative
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: image-optimisation
internal_links_out:
  - /asteris-utility-suite/free
  - /asteris-utility-suite/modules/performance
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Image Optimization Plugin — Asteris Image Optimization

**Why does WordPress need an image optimization plugin?** Images are typically 50-80% of a page's total weight. Unoptimised images directly hurt Core Web Vitals (LCP especially), eat bandwidth, and slow mobile users. An image optimization plugin **compresses** images without visible quality loss, **converts** to modern formats (WebP, AVIF) that are 25-50% smaller than JPEG/PNG, and **serves** the right format to each browser.

**What's the difference between WebP and AVIF?** Both are modern image formats. **WebP** (released 2010, mature, ~95% browser support) is typically 25-35% smaller than equivalent JPEG. **AVIF** (released 2019, growing support ~93%) is typically 40-50% smaller than JPEG and often beats WebP. Asteris generates both and serves whichever the visitor's browser supports.

**Can Asteris optimize my existing image library?** Yes — bulk-optimise runs through every image in your media library, compresses each, generates WebP + AVIF versions, and stores them alongside the original. Old uploads benefit from the same compression as new ones.

---

## The complete feature set

### Compression

- **JPEG compression** — adjustable quality (default 82, range 60-100)
- **PNG compression** — lossless via `pngquant`-equivalent; ~30-50% size reduction with no visible quality loss
- **Custom quality per image type** (set higher quality for hero images, lower for thumbnails)

### Modern formats

- **WebP conversion** — automatic for every image, alongside the original (free tier)
- **AVIF conversion** — automatic for every image (paid tier)
- **Format negotiation** — Asteris serves the smallest format the visitor's browser supports (via `<picture>` element with `srcset` fallbacks)
- **Manual format override** per image (e.g. force JPEG for compatibility)

### Privacy + size optimisation

- **EXIF stripping** (free tier) — remove geolocation, camera info, edit history from new uploads. Privacy win + ~5-15 KB savings per image.

### Bulk optimization

- **Bulk-optimise existing library** — runs in the background; doesn't lock WP Admin
- **Per-batch limit** (default 50 images per cron run) to avoid host CPU/memory limits
- **Resume on interruption** — if the cron job dies mid-batch, resumes from the last completed image

### On-upload optimization

- **Automatic on every new upload** — original is kept, optimised + WebP + AVIF versions generated immediately
- **WP Media Library integration** — see optimization status per image
- **One-click re-optimise** per image with different settings

### Lazy loading

- **Native `loading="lazy"`** on `<img>` tags
- **Per-post-type rules** (e.g. eager-load on landing pages, lazy elsewhere)
- **`fetchpriority="high"` on the LCP image** (coordinates with the [Performance module](/asteris-utility-suite/modules/performance/))
- **Exclusion rules** for above-the-fold images

### EXIF stripping

- Remove EXIF metadata from uploads (geolocation, camera info, edit history)
- Privacy + size reduction (typically 5-15 KB per image)
- Per-post-type rules (some sites want EXIF preserved, e.g. photography portfolios)

### Retina (2x) generation

- Auto-generate 2x versions for retina/HiDPI displays
- Served via `srcset` so non-retina users don't download 2x assets

### CDN integration

- **Cloudflare Polish + Mirage** — Asteris signs off on aggressive Cloudflare image optimization (knows when to defer to CF)
- **Bunny.net Stream + CDN** — image variants
- **Generic CDN URL rewriter** — point image URLs at any CDN domain
- **Image CDNs** — Cloudinary, ImageKit, Bunny Optimizer (URL-based transformation)

---

## Free version

[Asteris Utility Suite Free](/asteris-utility-suite/free/) includes a **lite version**: bulk JPEG/PNG compression, on-upload optimisation, WebP conversion, before/after comparison. The full module (AVIF, CDN integration, lazy-loading rules, EXIF stripping, retina generation) is paid.

---

## Frequently asked questions

**Is there a free WordPress image optimization plugin?**
Yes — Asteris Utility Suite Free includes WebP + bulk compression. **Smush Free** is also competent at the basic compression layer. **EWWW Image Optimizer Free** is another solid free option. For AVIF + CDN integration + retina generation, you need a paid tier.

**What's the difference between WebP and AVIF?**
Both are modern image formats smaller than JPEG/PNG. WebP (~95% browser support) is typically 25-35% smaller than JPEG. AVIF (~93% support, growing) is typically 40-50% smaller than JPEG and often beats WebP. Asteris generates both and serves whichever the browser supports.

**Will optimization hurt image quality?**
Not visibly at default settings (JPEG quality 82, PNG lossless). You can lower quality further if you want smaller files; you can raise it for hero images. Side-by-side comparison is built into the admin.

**Can I optimize images I've already uploaded?**
Yes — bulk-optimise runs through your existing library, compresses each, and generates WebP + AVIF versions. Originals are kept (so you can re-optimise with different settings or revert).

**Does Asteris work with Cloudflare Polish or Bunny Optimizer?**
Yes — Asteris coordinates with both. If you have Cloudflare Polish on, Asteris defers to it for delivery-time optimization while still generating local WebP/AVIF for any non-Cloudflare delivery paths.

**Will optimization break my images?**
No — originals are always preserved. If anything goes wrong, you can roll back per-image or in bulk.

---

[Free version on WordPress.org →](/asteris-utility-suite/free/) · [Performance module →](/asteris-utility-suite/modules/performance/) · [Pricing →](/asteris-utility-suite/pricing/)
