---
url: /asteris-utility-suite/guides/llms-txt-for-wordpress
title: "llms.txt for WordPress — What It Is, How to Add It, Why It Matters"
description: "llms.txt is a simple text file that helps AI assistants (ChatGPT, Claude, Perplexity, Google AI) understand and cite your WordPress site. This guide explains what llms.txt is, how it differs from robots.txt and sitemap.xml, and how to add it to WordPress."
og_title: "llms.txt for WordPress — The Definitive Guide"
og_description: "What llms.txt is. Why it matters for AI search. How to add it to WordPress (manually or automatically)."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/llms-txt-for-wordpress
primary_keyword: llms.txt wordpress
secondary_keywords:
  - what is llms.txt
  - how to add llms.txt
  - llms.txt generator wordpress
  - generative engine optimization wordpress
  - llms.txt vs robots.txt
schema_type: Article
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/modules/seo-ai
  - /asteris-utility-suite/wordpress-seo
verified_date: 2026-06-04
---

# llms.txt for WordPress — What It Is, How to Add It, Why It Matters

**What is `llms.txt`?** `llms.txt` is a plain-text file at the root of a website (e.g. `yoursite.com/llms.txt`) that helps AI assistants and large-language-model crawlers understand and cite the site's content. It functions as a curated map of the site's most important pages, written in a format optimised for LLM consumption rather than for traditional search-engine crawling. The proposal originated from Jeremy Howard (Answer.AI) in late 2024 and has been adopted by a growing number of documentation sites, technical product pages, and content-first publishers.

**Does my WordPress site need `llms.txt`?** If your content is being read by users through ChatGPT, Claude, Perplexity, or Google AI Overviews — and you want those assistants to cite your site accurately when they reference your topics — then yes, `llms.txt` is worth shipping. It's not (yet) a ranking signal in the classic Google sense, but it's a citation signal for the generative-search layer that's increasingly mediating how users find content.

**How do I add `llms.txt` to WordPress?** Two paths: (1) **Manually** — create a `llms.txt` file with the structure shown below, upload it to your site root via SFTP or your host's file manager. (2) **Automatically** — install a plugin that generates and maintains `llms.txt` from your site's content. Asteris Utility Suite's SEO + AI module includes this; the file is generated, schema-aware, and refreshes on a schedule. [See the SEO + AI module →](/asteris-utility-suite/modules/seo-ai/)

---

## What `llms.txt` looks like

A minimal `llms.txt` file follows this structure:

```
# Your Site Name

> One-sentence description of what the site does.

Optional longer description with context an LLM should know before
reading the site (audience, scope, key terminology).

## Section heading

- [Page title](https://yoursite.com/url): Brief description of what this page covers.
- [Another page](https://yoursite.com/another): Description.

## Another section

- [Page](https://yoursite.com/page): Description.
```

The spec is deliberately simple: Markdown, a single H1 for the site name, a blockquote tagline, optional paragraph context, then H2 sections containing bulleted lists of links with descriptions.

A companion file, `llms-full.txt`, contains the **full text of the listed pages** concatenated. This lets an LLM consume the entire site's content corpus without crawling individual URLs.

---

## How `llms.txt` differs from `robots.txt` and `sitemap.xml`

These three files coexist; they serve different purposes.

| File | Audience | Purpose | Format |
|---|---|---|---|
| **`robots.txt`** | Search-engine crawlers + AI crawlers | Says *which URLs to crawl or skip* | Plain text, directive-based |
| **`sitemap.xml`** | Search-engine crawlers | Lists *every URL on the site* (for indexing) | XML |
| **`llms.txt`** | AI assistants / LLM crawlers | Curates *the most important URLs* (for understanding + citation) | Markdown |

- `robots.txt` controls *access*. `sitemap.xml` provides *exhaustive coverage*. `llms.txt` provides *curated importance*.
- `sitemap.xml` is for the bot, machine-to-machine. `llms.txt` is for the bot, optimised for an LLM to actually read and reason about.
- An ideal site has all three.

---

## Does `llms.txt` improve visibility in ChatGPT, Claude and Perplexity?

**Honestly:** the evidence is still early. `llms.txt` adoption is recent enough (late 2024-2025) that we don't yet have a year of citation data showing "sites with `llms.txt` get cited X% more often". The mechanism is plausible — LLMs work better with curated context than with raw site-crawl noise — but the empirical proof is thin.

**What we do know:**

- Anthropic, Cloudflare, and other developer-platform companies have published `llms.txt` files publicly.
- AI assistants are increasingly trained to *look for* curated content surfaces.
- The cost of shipping `llms.txt` is near-zero (one file, auto-generated). The upside is asymmetric.

**Our recommendation:** ship it. The cost is trivial; the differentiated visibility is real even if the magnitude is uncertain.

---

## Block AI bots vs allow citation crawlers — what should you do?

Some site owners block AI crawlers entirely (via `robots.txt` `User-agent: GPTBot` → `Disallow: /`) to prevent their content being used as training data. Others allow them to encourage citation.

The honest split: **training-class** crawlers (which ingest content into model training datasets) and **citation-class** crawlers (which read content live to ground answers in real-time) are increasingly **separate user-agents**. You can allow one and block the other.

| Bot | Class | Purpose |
|---|---|---|
| GPTBot | Training | Crawls for OpenAI training data |
| ChatGPT-User | Citation | Live retrieval when ChatGPT browses to answer a user |
| OAI-SearchBot | Citation | OpenAI's search-index crawler |
| ClaudeBot | Training | Crawls for Anthropic training data |
| Anthropic-AI | Mixed | Anthropic citation/general |
| Google-Extended | Training | Crawls for Google AI training (Gemini) |
| Googlebot | Search | Classic Google Search |
| PerplexityBot | Citation | Perplexity's live answer retrieval |
| CCBot | Training | Common Crawl (used by many LLM training pipelines) |

**Our recommendation for most content sites:** allow citation-class crawlers (you gain citation visibility), block training-class crawlers (you preserve your IP from being absorbed without attribution). Asteris's AI bot blocker lets you make this distinction per-bot in one settings panel.

---

## How to add `llms.txt` to WordPress

### Option 1: Manually

1. Open your text editor of choice.
2. Write a `llms.txt` following the structure shown above. The H1 is your site name. The blockquote is a one-sentence description. The sections list your most important pages.
3. Save as `llms.txt` (UTF-8, LF line endings).
4. Upload to your site's root directory via SFTP, your host's file manager, or your hosting control panel. The file must be accessible at `https://yoursite.com/llms.txt` — not `/wp-content/llms.txt` or any subdirectory.
5. Verify by opening `https://yoursite.com/llms.txt` in a browser. You should see the raw text.

**Limitation:** you'll need to manually update the file every time you add or rename important content. For sites with more than ~20 pages, this becomes impractical quickly.

### Option 2: Automatically (with Asteris)

1. Install Asteris Utility Suite ([free version](https://wordpress.org/plugins/asteris-utility-suite/) or a paid tier — the SEO + AI module's `llms.txt` generator is in the paid module).
2. WP Admin → **Asteris → Modules** → toggle **SEO + AI Suite** to ON.
3. **Asteris → SEO + AI → Tools → llms.txt** → enable.
4. Asteris generates `llms.txt` (and `llms-full.txt`) from your content automatically. It refreshes on a daily schedule by default. The file is served at `yoursite.com/llms.txt` via a WordPress rewrite rule (no actual file on disk).
5. Customise the auto-generated content if needed — site name, tagline, section structure, which post types to include — in the same admin panel.

### Option 3: Other plugins

A handful of dedicated `llms.txt` plugins exist on WordPress.org (e.g. "Website LLMs.txt", "AEOmatic"). They generate the file but don't integrate with broader SEO + AI bot management. If you only need the file, they work fine. If you also need AI bot blocking, AI traffic tracking, and the full SEO toolkit, Asteris bundles it.

---

## Eat your own dog food

This site (asteriscommerce.com) ships its own `llms.txt`. View it at **[asteriscommerce.com/llms.txt](https://asteriscommerce.com/asteris-utility-suite/llms.txt)** — it's generated by the same Asteris SEO + AI module described above, so you can see the output before installing. (The companion `llms-full.txt` is at `/llms-full.txt`.)

---

## How `llms.txt` fits into Generative Engine Optimization (GEO)

`llms.txt` is one piece of a broader practice that's emerged in 2024-2025: **Generative Engine Optimization** — the discipline of making content visible and citable inside AI-driven answer engines, in the same way SEO makes content visible inside link-driven search engines.

GEO overlaps with SEO but extends into:

- Structured, citable claims (one-sentence facts AI can quote)
- Definitional openers (lead the page with a clear definition)
- Schema markup (machine-readable context)
- `llms.txt` (curated content surface)
- AI bot management (control what trains on you)
- Tracking AI-driven referral traffic

If you're investing in SEO in 2026, GEO is the adjacent surface — and `llms.txt` is the cheapest, lowest-friction first step.

---

## Frequently asked questions

**What is `llms.txt`?**
A plain-text Markdown file at the root of a website that helps AI assistants understand and cite the site's content. It curates the most important pages with descriptions, formatted for LLM consumption.

**How do I add `llms.txt` to WordPress?**
Either manually (write the file, upload to site root) or automatically (install a plugin like Asteris Utility Suite's SEO + AI module that generates and maintains it).

**Is `llms.txt` different from `robots.txt` and `sitemap.xml`?**
Yes. `robots.txt` controls crawler access. `sitemap.xml` provides exhaustive URL coverage. `llms.txt` curates the most important pages for LLM understanding. They serve different purposes; an ideal site has all three.

**Does `llms.txt` improve visibility in ChatGPT, Claude and Perplexity?**
The evidence is still early. The mechanism is plausible and adoption is rising, but empirical citation-rate data is thin. The cost of shipping `llms.txt` is near-zero; the upside is asymmetric.

**Should I block GPTBot and ClaudeBot from my WordPress site?**
Depends on goals. To preserve IP from training, block training-class crawlers (GPTBot, ClaudeBot, Google-Extended, CCBot). To gain citation visibility, allow citation-class crawlers (ChatGPT-User, OAI-SearchBot, PerplexityBot, Anthropic-AI). You can do both — Asteris's AI bot blocker manages per-bot.

**What is `llms-full.txt`?**
A companion file containing the full text of every page listed in `llms.txt`, concatenated. Lets an LLM consume the entire site's curated corpus in one fetch.

---

[See the SEO + AI module →](/asteris-utility-suite/modules/seo-ai/) · [WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [Asteris vs Yoast →](/asteris-utility-suite/vs/yoast/) · [Pricing →](/asteris-utility-suite/pricing/)
