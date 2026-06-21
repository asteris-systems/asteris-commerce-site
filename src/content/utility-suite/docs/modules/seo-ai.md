---
title: "Configure SEO + AI Suite"
description: "Step-by-step setup of the Asteris SEO + AI module: titles, schema, sitemaps, redirects, llms.txt, IndexNow, AI bot management, AI content tools, Yoast importer. Quickstart in 15 minutes."
sidebar:
  order: 2
---

# Configure the SEO + AI Suite module

For the marketing overview of this module, see [/modules/seo-ai](/asteris-utility-suite/modules/seo-ai/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

The SEO + AI Suite is the largest module in Asteris. Don't try to configure everything on day one. The Quickstart below gets you a working classic-SEO baseline in 15 minutes; come back for the AI surface (llms.txt, IndexNow, AI bot policy) once the basics are stable.

---

## Quickstart (15 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **SEO + AI Suite** to ON.

The SEO + AI submenu appears. A docked sidebar also appears in every editor (Gutenberg, classic, Elementor, Bricks, Beaver Builder, Divi) — that's where you'll do per-post overrides.

### 2. Declare site identity

**Asteris → SEO + AI → General → Site Identity**

Choose **Organization** or **Person**:

- **Organization** for businesses, agencies, SaaS products, publications
- **Person** for personal brands, freelancers, sole-trader consultancies, blogs that ARE the author

Then fill:

- **Name** — exactly as you want it cited (e.g., "Acme Pty Ltd" not "acme")
- **Logo URL** — 1:1 aspect ratio recommended, at least 600×600 px
- **`sameAs` links** — LinkedIn, Twitter/X, GitHub, YouTube, Wikipedia entry if any (one per line)

This data populates Organization or Person schema on every page. Save before moving on.

### 3. Set sitewide title + description templates

**Asteris → SEO + AI → General → Templates**

The defaults are sensible but verify they match your brand:

- **Single post:** `%post_title% – %site_title%`
- **Page:** `%page_title% – %site_title%`
- **Category archive:** `%category_name% – %site_title%`
- **Author archive:** `Articles by %author_name% – %site_title%`
- **Separator:** `–` (en-dash) is the default; common alternatives: `·` (middot), `|` (pipe), `—` (em-dash)

> 💡 Pick a separator and stick with it sitewide. Inconsistent separators across templates look amateurish in SERPs.

### 4. Configure schema for your business type

**Asteris → SEO + AI → Schema → Defaults**

For most sites, the auto-detection is right:

- **Posts** → `Article`
- **Pages** → `WebPage`
- **Author pages** → `Person`
- **Category pages** → `CollectionPage`

If you're a local business with a physical location, also set the homepage to `LocalBusiness` (or one of its subtypes: Restaurant, Plumber, Dentist, etc. — pick the most specific) and fill the address fields.

If you're a publication, `NewsArticle` is the right subtype for posts.

Per-post overrides happen in the SEO sidebar in the editor.

### 5. Submit the sitemap to Google Search Console + Bing

Asteris generates a sitemap automatically at `https://yoursite.com/asteris-sitemap.xml` (a sitemap index pointing to per-content-type sub-sitemaps).

1. Open [Google Search Console](https://search.google.com/search-console). Verify your domain (DNS TXT record or HTML file).
2. **Sitemaps** → paste `asteris-sitemap.xml` → Submit.
3. Open [Bing Webmaster Tools](https://www.bing.com/webmasters/). Same flow. Bing indexes new sites faster than Google.
4. (Optional, Google) → **Settings → Crawl stats** — verify Googlebot is hitting your sitemap.

> ⚠️ **If you're migrating from Yoast**, you'll have a `sitemap_index.xml` already submitted. Keep it submitted alongside Asteris's for 30 days as a parallel index — won't hurt rankings (Google deduplicates URLs), and gives you a fallback if anything goes wrong with Asteris's sitemap. After 30 days, remove the Yoast sitemap from GSC.

### 6. Verify a real post

Open a real published post on your site. View source (Cmd-U / Ctrl-U). Search for:

- `<title>` — should match your template
- `<meta name="description">` — should match either the per-post override or the template default
- `<script type="application/ld+json">` — should contain the Article schema with your Organization or Person sitewide identity

If anything looks wrong, fix it before moving on. Common causes:

1. **Another SEO plugin is still active** — Asteris detects and stands down. Deactivate Yoast/RankMath/etc., or have Asteris take over (see workflow below).
2. **Theme has hard-coded `<title>` / `<meta>` tags** — most modern themes use `add_theme_support('title-tag')` and defer to plugins, but older themes hard-code. Search your theme's `header.php` and remove duplicates.

### 7. Set up redirects (if migrating URLs)

**Asteris → SEO + AI → Redirects**

If you're changing URL slugs, consolidating categories, or moving from a different CMS, every URL change needs a 301:

| Source | Destination | Type |
|---|---|---|
| `/old-blog-post-name` | `/new-blog-post-name` | 301 |
| `/old-category/post` | `/blog/post` | 301 |

Bulk import via CSV: **Redirects → Import → CSV** (format: `source,destination,type`).

Auto-redirect-on-slug-change: when you edit a post's slug, Asteris pops a modal asking "Add a 301 from the old slug?" — say yes. Always.

### 8. Run the Yoast importer (if you have Yoast installed)

**Asteris → SEO + AI → Tools → Import → Yoast SEO** → **Run Import**.

30 seconds. Imports titles, meta descriptions, focus keywords, Open Graph + Twitter Card overrides, canonical URLs, noindex/nofollow flags, primary categories, schema markup type per post, redirects (Yoast Premium only), breadcrumb configuration.

Full migration walkthrough at [/migrate/from-yoast](/asteris-utility-suite/migrate/from-yoast/). RankMath / AIOSEO / SEOPress importers are v1.1.

### 9. Enable `llms.txt` (optional, but high-leverage)

**Asteris → SEO + AI → AI Surface → llms.txt** → toggle ON.

Generates `/llms.txt` automatically from your content. Verify at `https://yoursite.com/llms.txt` — should return Markdown with your site name + curated links.

Also enable **llms-full.txt** (the content-rich companion). Both files refresh on cron + on every post save.

Full tutorial at [/docs/tutorials/setup-llms-txt-for-ai-visibility](/asteris-utility-suite/docs/tutorials/setup-llms-txt-for-ai-visibility/).

### 10. Set AI bot policy

**Asteris → SEO + AI → AI Surface → AI Bot Blocker**

Three choices:

- **Allow all** — citation + training. Maximum AI visibility; your content is absorbed into model weights.
- **Allow citation, block training** (recommended) — visible in AI assistant answers; not absorbed into training data.
- **Block all** — invisible to AI assistants.

For most sites, **Allow citation, block training** is the right call. Toggle the training-class crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot, Bytespider) to **Block** while leaving citation-class crawlers (ChatGPT-User, OAI-SearchBot, PerplexityBot) on **Allow**.

That's the baseline. Come back for IndexNow, AI content tools, and headline analyser when you're ready — they're not day-one prerequisites.

---

## Common workflows

### Migrate from Yoast (one-click)

Full walkthrough at [/migrate/from-yoast](/asteris-utility-suite/migrate/from-yoast/). Short version:

1. Install Asteris alongside Yoast (no conflict)
2. Activate Asteris SEO + AI module
3. **Asteris → SEO + AI → Tools → Import → Yoast SEO** → Run
4. Spot-check 5-10 important URLs in private browser (View Source → verify `<title>` + meta + schema)
5. **Asteris → SEO + AI → General → "Take over from active SEO plugin (Yoast detected)"** → toggle ON (causes Yoast to defer via WP hook priorities)
6. Wait 30 days monitoring Search Console for rank changes (should be flat)
7. Deactivate Yoast (keep installed-but-inactive for another 30 days as insurance)

### Set up per-page schema (e.g., FAQ on a support page)

1. Open the page in the editor (any builder — sidebar appears the same in each)
2. In the Asteris SEO sidebar → **Schema** → change from `WebPage` to `FAQPage`
3. Asteris parses Q&A pairs from your content (markdown-detected `**Q:** ... **A:** ...` blocks or HTML `<dt>/<dd>` pairs)
4. Save the page

Verify at [Google's Rich Results Test](https://search.google.com/test/rich-results) by pasting the URL. The FAQ markup should pass.

> ⚠️ Google reduced FAQ rich-result eligibility in late 2023 — currently limited to government + health-authority sites. The schema is still parsed (and AI assistants extract from it), but the visual accordion in SERPs is unlikely for most sites.

### Add Author E-E-A-T metadata

**Asteris → SEO + AI → Schema → Author E-E-A-T**

For each author on your site (Users → Profile):

1. Open the user profile
2. Scroll to **Asteris → E-E-A-T metadata**
3. Fill: **Credentials**, **Bio**, **Same-as links** (LinkedIn, X, ORCID, Mastodon, etc.)
4. Save

This populates `Person` schema on author pages and `author` properties on every article they publish. Critical for Y-M-Y-L content (health, finance, legal). Helps Google attribute expertise; helps AI assistants cite the right author when summarising.

### Set up Yoast → Asteris "takeover" (parallel running)

If you want to keep Yoast installed during evaluation but use Asteris for output:

1. **Asteris → SEO + AI → General → "Take over from active SEO plugin (Yoast detected)"** → ON
2. Asteris registers at hook priority 1; Yoast still runs but emits at priority 10
3. The browser sees Asteris's tags; Yoast's tags are filtered out before output
4. Yoast's data stays intact in the database — easy rollback by toggling off

### Generate AI content briefs (BYOK)

**Asteris → SEO + AI → AI Tools → Settings**

1. Pick provider: **OpenAI** / **Anthropic** / **Google Gemini**
2. Paste API key (BYOK — you pay the provider directly; no markup from Asteris)
3. Save

Then in any post editor:

1. SEO sidebar → **AI Tools** → **Generate brief**
2. Asteris sends current draft + your target keyword + competitor titles to the AI
3. Returns a brief: H2 outline, key questions to answer, internal-link suggestions
4. Use it as a starting point — never auto-publish

The same panel has **Generate draft section**, **Suggest meta description**, **Refine title** — each runs against your configured model.

### Use the Headline Analyser

**Asteris → SEO + AI → Tools → Headline Analyser**

Paste a headline. Returns scores on:

- **Length** (50-60 chars is the click-through-rate sweet spot)
- **Power words** (free, proven, instant, secret, etc. — overuse degrades trust)
- **Emotional impact** (sad / happy / fear / surprise / anger — strong-emotion headlines outperform but get diminishing returns)
- **Readability** (Flesch-Kincaid score)

Useful for tuning blog post titles before publish. Not a ranking signal — a click-through-rate signal.

### Submit to IndexNow

**Asteris → SEO + AI → IndexNow** → toggle ON.

Asteris generates an IndexNow key and exposes it at `/<key>.txt` (the discovery file Bing/Yandex check). When you publish or update a post, Asteris pings the IndexNow API immediately. Bing typically re-indexes within minutes; Google ignores IndexNow (uses its own crawl).

Verify on the **IndexNow** panel → **Last submissions** — should show successful posts.

---

## Settings reference

### General

- **Site Identity** — Organization or Person + name + logo + sameAs links
- **Title templates** per post type (with `%post_title%`, `%site_title%`, `%separator%`, `%page_number%`, `%category_name%`, `%author_name%` tokens)
- **Description templates** per post type
- **Knowledge Graph entity** — Organization / Person / Custom
- **Take over from active SEO plugin** — toggle for parallel running with Yoast / RankMath / AIOSEO / SEOPress

### Schema

- **Defaults per post type** — Article / NewsArticle / BlogPosting / WebPage / Product / FAQPage / HowTo / Event / Recipe / Review / VideoObject / etc.
- **Author E-E-A-T metadata** (per-user — Profile → Asteris → E-E-A-T)
- **Schema import URL** — paste an existing JSON-LD URL to mirror settings
- **Breadcrumbs** — `BreadcrumbList` schema + visual renderer

### Sitemaps

- **Per-post-type inclusion** — toggle which post types appear
- **Image sitemap extension** — adds `<image:image>` entries for media in posts
- **Video sitemap extension** — adds video metadata
- **News sitemap extension** — for sites with Google News inclusion
- **URL exclusion patterns** — regex match against URLs to exclude

### Redirects

- **Add redirect** — single source/destination/type entry
- **CSV import** — bulk upload
- **Hit counters** — see which redirects fire most
- **Chain detection** — warns when A→B and B→C would create a chain

### AI Surface

- **llms.txt** — toggle + customise + refresh schedule
- **llms-full.txt** — toggle + max size + page count cap
- **IndexNow** — toggle + API key + manual submit
- **AI Bot Blocker** — per-bot allow/deny (citation-class + training-class)
- **AI Traffic Tracker** — surfaces visits from AI assistant referrers

### AI Tools

- **Provider** — OpenAI / Anthropic / Google Gemini
- **API key** (encrypted at rest)
- **Default model** per provider
- **Token-spend monitor** (informational; pay direct to provider)
- **Per-feature enable** — Brief / Draft / Title / Meta / Headline

### Content locale (AI Tools sub-setting)

- **Locale** — `en-US` / `en-GB` / `en-AU` / `en-CA` / `en-IE` / `en-NZ` / `en-IN` / `en-ZA` (defaults to your WordPress site language)
- **Apply to AI content tools** — toggle ON; AI prompts include locale instruction so output uses the configured variant (spelling, conventions, regional references)
- **Apply to headline analyser** — toggle ON; analyser uses locale-appropriate power-word lists + conventions

The setting is read at Asteris → Settings → Content Locale (sitewide); this panel lets you override per-feature if needed.

### Editor integrations

The SEO sidebar renders in:

- **Gutenberg** — `PluginSidebar` (toggle from the publish-button kebab menu → "Asteris SEO")
- **Classic editor** — metabox below content area
- **Elementor** — docked sidebar (toggle bottom-left)
- **Bricks Builder** — docked sidebar
- **Beaver Builder** — docked sidebar
- **Divi** — docked sidebar

Same module, six render targets, identical fields.

---

## REST API

```
# Per-post SEO data
GET    /wp-json/asteris/v1/seo/post/<id>
PUT    /wp-json/asteris/v1/seo/post/<id>

# Sitemaps
GET    /wp-json/asteris/v1/seo/sitemap
POST   /wp-json/asteris/v1/seo/sitemap/regenerate

# IndexNow
POST   /wp-json/asteris/v1/seo/indexnow/submit
GET    /wp-json/asteris/v1/seo/indexnow/last-submissions

# llms.txt
GET    /wp-json/asteris/v1/seo/llms-txt              # returns the curated text
POST   /wp-json/asteris/v1/seo/llms-txt/regenerate

# AI Bot Policy
GET    /wp-json/asteris/v1/seo/ai-bot-policy
PUT    /wp-json/asteris/v1/seo/ai-bot-policy

# Importers
POST   /wp-json/asteris/v1/seo/import/yoast          # one-click Yoast import
GET    /wp-json/asteris/v1/seo/import/yoast/status
```

All endpoints capability-checked (`manage_options` for writes; `read` for the public `llms-txt` endpoint).

---

## WP-CLI

```bash
# Sitemap
wp asteris seo sitemap regenerate
wp asteris seo sitemap validate

# llms.txt
wp asteris seo llms-txt regenerate
wp asteris seo llms-txt validate

# IndexNow
wp asteris seo indexnow submit --url=<url>
wp asteris seo indexnow status

# Importers
wp asteris seo import --from=yoast
wp asteris seo import --from=rankmath          # v1.1
wp asteris seo import --from=aioseo            # v1.1
wp asteris seo import --from=seopress          # v1.1

# AI Tools
wp asteris seo ai brief --post-id=<id>
wp asteris seo ai meta-description --post-id=<id>

# Redirects
wp asteris seo redirects list
wp asteris seo redirects add --source=/old --destination=/new --type=301
wp asteris seo redirects import --file=redirects.csv
```

---

## See also

- [Tutorial: Set up llms.txt for AI visibility](/asteris-utility-suite/docs/tutorials/setup-llms-txt-for-ai-visibility/) — end-to-end llms.txt flow
- [Tutorial: Migrate from Yoast step-by-step](/asteris-utility-suite/docs/tutorials/migrate-from-yoast-step-by-step/)
- [Asteris vs Yoast comparison](/asteris-utility-suite/vs/yoast/) — when to switch + what you keep
- [WordPress SEO pillar guide](/asteris-utility-suite/wordpress-seo/) — classic SEO + AI layer in one stack
- [How to add schema to WordPress](/asteris-utility-suite/guides/how-to-add-schema-to-wordpress/) — practitioner schema guide
- [What is Generative Engine Optimization (GEO)?](/asteris-utility-suite/guides/what-is-generative-engine-optimization/) — broader practice
