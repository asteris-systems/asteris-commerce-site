---
url: /asteris-utility-suite/modules/seo-ai
title: "AI SEO Plugin for WordPress — Asteris SEO + AI Suite (llms.txt, AI Bot Blocker, IndexNow)"
description: "The Asteris SEO + AI module is an AI SEO plugin for WordPress with llms.txt generator, AI bot blocker, AI traffic tracker, IndexNow auto-submit, AI content tools, schema, sitemaps, redirects, and one-click importers from Yoast, RankMath, AIOSEO, SEOPress."
og_title: "Asteris SEO + AI — AI SEO Plugin for WordPress"
og_description: "llms.txt + IndexNow + AI bot blocker + AI traffic tracker + AI content tools. The AI layer Yoast and RankMath haven't built yet."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/seo-ai
primary_keyword: ai seo plugin wordpress
secondary_keywords:
  - wordpress llms.txt plugin
  - ai bot blocker wordpress
  - wordpress schema plugin
  - indexnow wordpress
  - wordpress ai content tools
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/guides/llms-txt-for-wordpress
  - /asteris-utility-suite/vs/yoast
  - /asteris-utility-suite/migrate/from-yoast
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# AI SEO Plugin for WordPress — Asteris SEO + AI Suite

**What is an AI SEO plugin for WordPress?** An AI SEO plugin is a WordPress SEO plugin that adds **AI-era features** on top of the classic SEO toolkit (titles, schema, sitemaps, redirects). Those features include: an **`llms.txt` generator** (so AI assistants can read your site cleanly), an **AI bot blocker** (so you can decide which AI crawlers train on your content), an **AI traffic tracker** (so you know which assistants are sending visitors), and **AI content tools** (so writers can draft, brief, and outline with an LLM inside the editor). Asteris's SEO + AI module is one of the first to ship all four in a single WordPress plugin.

**Can a WordPress plugin generate `llms.txt` automatically?** Yes — Asteris generates `llms.txt` (and `llms-full.txt`) automatically from your site's content, exposes it at `/llms.txt`, and refreshes it on a schedule. [See the full guide on llms.txt for WordPress →](/asteris-utility-suite/guides/llms-txt-for-wordpress/).

**How do I block AI bots from training on my WordPress site?** Asteris's AI bot blocker controls **GPTBot**, **ClaudeBot**, **PerplexityBot**, **Google-Extended**, **CCBot**, and ~20 others — at the `robots.txt` layer, the per-page meta layer, or both. You can allow some bots for citation while blocking others from training.

---

## The complete feature set

### Classic SEO (parity with Yoast / RankMath / AIOSEO)

- **Title + description templates** per post type with token replacement
- **30+ schema types** — Article, Product, FAQ, HowTo, LocalBusiness, Person, Organization, Event, Review, Recipe, VideoObject, ImageObject, BreadcrumbList, WebPage, WebSite, AboutPage, ContactPage, and more
- **XML sitemaps** with image, video, and news extensions
- **Redirects manager** — bulk import, regex support, 301/302/307/410, hit-count tracking
- **Breadcrumbs** — schema + visual renderer
- **Open Graph + Twitter Card** overrides per post
- **Canonical URLs** with self-canonical detection
- **Noindex / nofollow** rules per post-type, taxonomy, or individual URL
- **robots.txt editor** with one-click safe presets

### AI layer (the differentiator)

- **`llms.txt` generator** — automatic, schema-aware, at `/llms.txt`
- **`llms-full.txt`** with the full content corpus, refreshed on a schedule
- **AI bot blocker** — toggle per-bot allow/deny; supports GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider, ChatGPT-User, Anthropic-AI, OAI-SearchBot, and more
- **AI traffic tracker** — surfaces which AI assistants linked into your site (via referrer headers + user-agent classification)
- **AI content tools** — brief generator, outline generator, draft assistant, all running through your choice of model (OpenAI, Anthropic, Google) with **bring-your-own-key**
- **Content locale-aware generation** — AI output (briefs, drafts, meta descriptions, headlines) uses the English variant you've configured at the Asteris level (`en-US`, `en-GB`, `en-AU`, `en-CA`, `en-IE`, `en-NZ`, `en-IN`, `en-ZA`). UK agencies generating for US clients get US spelling; Australian sites stay in en-AU. None of the competing AI-SEO plugins do this.
- **Headline analyser** — score H1s against power-word, length, and emotional-impact axes (uses the configured locale's conventions)
- **Schema import URL** — paste an existing schema JSON-LD URL to import settings
- **Author E-E-A-T metadata** — author entity, role, credentials, sameAs links

### Migration tools

- **One-click Yoast importer** — titles, meta, schema, redirects, focus keywords, social cards
- **RankMath importer** (v1.1)
- **AIOSEO importer** (v1.1)
- **SEOPress importer** (v1.1)

### Editor integrations

The SEO + AI module renders a **docked sidebar** in every major WordPress editor:

- **Gutenberg** (Block Editor) — `PluginSidebar` integration
- **Classic Editor** — metabox
- **Elementor** — docked sidebar
- **Bricks Builder** — docked sidebar
- **Beaver Builder** — docked sidebar
- **Divi** — docked sidebar

Same module, six render targets. No "Classic editor not supported" footnote.

---

## Why the AI layer matters now

Search is changing. **Google's AI Overviews** (and **Bing Copilot**, **Perplexity**, **ChatGPT Search**, **Claude with web search**) are increasingly the first place users see your content — often *instead of* clicking through. The classic SEO model (rank #1, get the click) is being layered on top of with a second model: **rank in a way an AI assistant can extract, cite, and link to**.

That requires:

1. **Clean machine-readable content** — schema markup, semantic HTML, `llms.txt`
2. **A position on AI training** — allow it (gain citation surface), block it (preserve your IP), or split the difference
3. **Visibility into AI-driven traffic** — knowing which assistant is sending users
4. **Tools to draft for both audiences** — humans + machines reading the same content

Yoast and RankMath are excellent at the classic layer. They haven't yet shipped the AI layer. Asteris ships both — and that's the strategic reason this module exists.

---

## Does Asteris work inside Elementor, Bricks and Divi?

Yes — and Beaver Builder, Gutenberg, and the classic editor. The SEO sidebar **docks inside the builder UI** (it's not a separate page or a tab on the WordPress sidebar). You edit a page in Elementor, the SEO panel sits docked on the right; same in Bricks, Divi, and Beaver Builder. Gutenberg uses the standard `PluginSidebar`. Classic editor gets a metabox below the content area.

---

## What this module is not

- **A 4,500-word AI content generator.** Asteris's AI content tools are *briefs, outlines, and assistance for human writers*, not a press-the-button-get-an-article SaaS. We won't ship content spam tools.
- **A keyword research tool.** Asteris has a keyword explorer that taps an external API (DataForSEO compatible), but it's not Ahrefs or Semrush. Use it for in-WordPress lookups; use a dedicated tool for portfolio-level keyword research.
- **A backlink manager.** Backlinks are out of scope.

[See what Asteris doesn't do →](/asteris-utility-suite/what-asteris-doesnt-do/)

---

## Frequently asked questions

**What is an AI SEO plugin for WordPress?**
An AI SEO plugin handles classic SEO (titles, schema, sitemaps, redirects) *plus* AI-era features (`llms.txt`, AI bot management, AI content tools, AI traffic tracking). Asteris's SEO + AI module is one of the first to ship all four AI features in a single WordPress plugin.

**Can a WordPress plugin generate `llms.txt` automatically?**
Yes. Asteris generates `llms.txt` and `llms-full.txt` automatically from your site's content, exposes them at `/llms.txt` and `/llms-full.txt`, and refreshes on a schedule. [Full guide →](/asteris-utility-suite/guides/llms-txt-for-wordpress/)

**How do I block AI bots from training on my WordPress site?**
Asteris's AI bot blocker toggles per-bot allow/deny for GPTBot, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Bytespider, and more — at `robots.txt`, per-page meta, or both. You can allow citation-class crawlers while blocking training-class crawlers.

**Does Asteris work inside Elementor, Bricks and Divi?**
Yes — docked sidebar inside the builder UI for all four (Elementor, Bricks, Beaver Builder, Divi). Plus Gutenberg `PluginSidebar` and a classic editor metabox.

**How does the AI content tool work? Does it cost extra?**
Bring-your-own-key. You provide an OpenAI / Anthropic / Google API key in Asteris settings. Token costs are paid directly to the provider — we don't mark up. The module generates briefs, outlines, and draft sections; it does not auto-publish.

**Will this replace Yoast?**
For classic SEO, yes — the one-click Yoast importer carries over your titles, meta, schema, redirects, and focus keywords. [Migration walkthrough →](/asteris-utility-suite/migrate/from-yoast/). For the AI layer, there's nothing to replace because Yoast hasn't shipped it yet.

---

[See the WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [llms.txt guide →](/asteris-utility-suite/guides/llms-txt-for-wordpress/) · [Asteris vs Yoast →](/asteris-utility-suite/vs/yoast/) · [Migrate from Yoast →](/asteris-utility-suite/migrate/from-yoast/) · [Pricing →](/asteris-utility-suite/pricing/)
