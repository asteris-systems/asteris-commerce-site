---
title: "Set up llms.txt for AI visibility on your WordPress site"
description: "Step-by-step: ship llms.txt + llms-full.txt + AI bot policy on a WordPress site in under 15 minutes. Covers the Asteris SEO + AI module's llms.txt generator, the AI bot blocker, and the robots.txt strategy that maximises citation while protecting IP."
sidebar:
  order: 1
---

# Set up llms.txt for AI visibility on your WordPress site

**Goal:** within 15 minutes, your WordPress site will (1) serve a curated `llms.txt` at the root, (2) serve a content-rich `llms-full.txt` companion, (3) allow citation-class AI crawlers (so ChatGPT, Claude, Perplexity can find and cite you), and (4) optionally block training-class AI crawlers (so your content isn't absorbed into the next model release without attribution).

This is the practical implementation of the `llms.txt` standard. For the background on *what* `llms.txt` is and *why* it matters, see the marketing-side explainer at [/guides/llms-txt-for-wordpress](/asteris-utility-suite/guides/llms-txt-for-wordpress/).

**Asteris modules used:** SEO + AI Suite (paid tier — Starter / Pro / Agency)

**Time:** 15 minutes for the basic setup, 30 minutes if you also customise the bot policy carefully.

---

## Before you start

You need:

- A paid Asteris Utility Suite licence active (the `llms.txt` generator is in the paid SEO + AI module; Asteris Free's lite Analytics/SMTP/etc. don't include SEO)
- The SEO + AI Suite module activated → if not, **Asteris → Modules → toggle SEO + AI Suite to ON**
- Admin access to WP Admin
- 15 minutes uninterrupted

You can revert any step here in under a minute. None of this is destructive.

---

## Step 1 — Enable the `llms.txt` generator

WP Admin → **Asteris → SEO + AI → AI Surface → llms.txt**

Toggle **Enable llms.txt** to ON.

Asteris immediately generates `/llms.txt` from your site's content. Open `https://yoursite.com/llms.txt` in a new tab to verify — you should see Markdown with your site name as the H1, a tagline blockquote, and sectioned link lists.

### What Asteris included by default

The generator auto-includes:

- Site name + tagline from your General settings
- Pages (all published `page` post type)
- Posts (latest 50 published `post` post type, sorted by date)
- Sections grouped by category if your site uses them

### What it skipped

- Draft / private / pending posts
- Posts marked `noindex` in the SEO sidebar
- Pages in `/wp-admin/`, `/wp-login.php`, login/auth flows
- The `llms.txt` file itself (no recursion)

If the output looks reasonable, move to step 2. If you want to customise what's included, jump to **step 6 — Curate the llms.txt content** below before going public.

---

## Step 2 — Enable the `llms-full.txt` companion

Same panel — **Asteris → SEO + AI → AI Surface → llms-full.txt** → toggle ON.

`llms-full.txt` is the content-rich companion to `llms.txt`. Where `llms.txt` is a curated *index* of important pages, `llms-full.txt` is the *full text* of those pages concatenated.

The rationale: an AI assistant that finds your `llms.txt` and wants to ground its answers in your content can fetch `llms-full.txt` in a single request and have the entire curated corpus at once — much faster than crawling every URL listed.

Verify by opening `https://yoursite.com/llms-full.txt` in a new tab. You should see the full body content of every page listed in `llms.txt`, concatenated with separators.

**Heads-up:** `llms-full.txt` can be large. For a 50-page site it's typically 100-500 KB. For a 500-page site it can be 5+ MB. Asteris's generator caps it at 5 MB by default; pages beyond the cap are listed in `llms.txt` but their bodies aren't included in `llms-full.txt`. Adjustable in advanced settings.

---

## Step 3 — Verify both files at the root

Two tests, both in your browser:

```
https://yoursite.com/llms.txt
https://yoursite.com/llms-full.txt
```

Both should return:

- HTTP 200
- Content-Type `text/plain` (or `text/markdown` — both are valid; Asteris emits `text/plain` per the spec recommendation)
- The Markdown body, raw, no theme wrapping

If you see a 404 or your theme's "page not found" page, Asteris's rewrite rule isn't winning. Common causes:

1. **Caching plugin overriding** — your cache might be serving a stale 404. Purge it (Asteris Performance: **Asteris → Performance → Purge All**).
2. **`.htaccess` rule order** — if you have custom rewrites that match `*.txt`, they may catch first. Move the Asteris rule to the top, or add an explicit `RewriteCond %{REQUEST_URI} !^/llms` before your custom rule.
3. **Nginx without WordPress rewrites** — Asteris registers a WP rewrite, but Nginx serves static `.txt` first if the file exists on disk. Solution: there's no static file (Asteris generates dynamically); make sure your Nginx config falls through to `index.php` for missing files (the standard WordPress Nginx config does this).

---

## Step 4 — Decide your AI bot policy (the strategic part)

**Asteris → SEO + AI → AI Surface → AI Bot Blocker**

You'll see a list of AI crawlers grouped by class. The defaults are conservative — **allow everything** — because most sites want to be cited. You'll customise based on your goals.

### The classes

| Class | What they do | Examples |
|---|---|---|
| **Citation-class** | Live retrieval when an AI assistant searches the web to answer a user's question. The user already exists; the AI just wants to ground its answer in real content. | ChatGPT-User · OAI-SearchBot · PerplexityBot · Anthropic-AI (citation pathways) |
| **Training-class** | Crawls for ingestion into the AI model's next training run. Your content becomes part of the model's "memory" but you receive no attribution at inference time. | GPTBot · ClaudeBot · Google-Extended · CCBot · Bytespider |

### Three policy options

#### Option A — Allow both (default)

The maximally-visible posture. Your content is cited live in AI assistant answers (citation-class) AND remembered as a fact source in future model releases (training-class). Cost: your IP is absorbed into LLM weights with no attribution after the training cutoff.

**Right for:** documentation sites, marketing sites, product pages, anything where being remembered as authoritative on a topic is the goal.

#### Option B — Allow citation-class, block training-class

Toggle:

- ✓ GPTBot → **Block**
- ✓ ClaudeBot → **Block**
- ✓ Google-Extended → **Block**
- ✓ CCBot → **Block**
- ✓ Bytespider → **Block**
- ✗ ChatGPT-User → **Allow**
- ✗ OAI-SearchBot → **Allow**
- ✗ PerplexityBot → **Allow**

You're cited in answers (visible to users live) but not absorbed into training data. The trade-off: future model releases won't remember you natively, so you depend on live retrieval to be cited.

**Right for:** original-research sites, paywalled content, premium documentation, anything where being trained-on is a worse deal than being cited.

This is the **recommended policy for most content businesses in 2026.** Citation gives you the visibility; blocking training preserves the IP.

#### Option C — Block everything

Toggle all rows to **Block**. Your content is invisible to AI assistants in any pathway.

**Right for:** legally-sensitive content (medical, legal), competitive intelligence you want to keep out of LLMs, or you have an active deal with an AI vendor that requires exclusivity.

### What Asteris does at each toggle

When you set a bot to Block, Asteris adds to `robots.txt`:

```
User-agent: GPTBot
Disallow: /
```

AND adds a per-page `<meta name="robots" content="noai, noimageai">` tag.

AND adds an HTTP `X-Robots-Tag: noai, noimageai` header.

Three layers because some crawlers respect one signal but not another. Belt + braces.

### Commit your policy

Pick A, B, or C. Click **Save**.

> 💡 **Most-WordPress-sites recommendation:** Option B. It's what Asteris's own brand site (asteriscommerce.com) uses. You can verify by checking [our robots.txt](https://asteriscommerce.com/asteris-utility-suite/robots.txt).

---

## Step 5 — Add IndexNow for fast re-indexing

While we're here, IndexNow is a different surface but solves a related problem: getting search engines to re-crawl your content immediately when it changes (instead of waiting for the next scheduled crawl).

**Asteris → SEO + AI → IndexNow** → toggle **Enable IndexNow** to ON.

Asteris generates an IndexNow API key and exposes it at `https://yoursite.com/<your-key>.txt` (the discovery file Bing and Yandex check). When you publish or update a post, Asteris pings the IndexNow API immediately — Bing typically re-indexes within minutes.

Not directly llms.txt-related, but it's the same panel and a 30-second win.

---

## Step 6 — Curate the `llms.txt` content (optional)

The auto-generated `llms.txt` is fine for most sites. If you want tighter editorial control:

**Asteris → SEO + AI → AI Surface → llms.txt → Customise**

You can override:

- **Site name** (defaults to your WP Site Title)
- **Tagline** (the blockquote — defaults to your tagline)
- **Context paragraph** (optional — adds context an LLM should know before reading; defaults to empty)
- **Per-section ordering** (which sections appear and in what order)
- **Inclusion rules** per post type:
  - Published only / include scheduled / include private
  - Latest N / by category / manual selection
  - Exclude `noindex` (default ON; recommended)
- **Per-page exclusions** (mark individual pages as "hide from llms.txt" via the SEO sidebar)

### Example: curate for a content-marketing site

A blog with 200 posts probably doesn't want all 200 in `llms.txt`. The signal-to-noise is wrong — the AI assistant gets a wall of links and can't tell which 10 posts represent your *core* expertise.

Better: curate the top 20-30 cornerstone posts. In **Customise → Posts** set:

- Inclusion mode: **Manual selection**
- Use the picker to select your 30 most authoritative posts
- Save

Now `llms.txt` lists those 30 with descriptions, plus your pages, plus any sections you've configured manually. The AI assistant gets your *best* content, not your *most recent* content.

---

## Step 7 — Test the file with a real AI assistant

Two quick tests:

### Test 1 — ChatGPT (or Claude) directly

Open a new chat and ask:

> "What's at https://yoursite.com/llms.txt?"

The assistant should fetch the file and summarise its contents back to you. If it can't fetch (rate-limited, geographic block, etc.), it'll say so — that's still useful information.

### Test 2 — Perplexity / brave.com/search

Search for `site:yoursite.com llms.txt` on Perplexity or Brave. You should see your `llms.txt` content indexed within 24-48 hours of publishing.

### Test 3 — Check the headers

```bash
curl -I https://yoursite.com/llms.txt
```

Expected response:

```
HTTP/2 200
content-type: text/plain; charset=utf-8
cache-control: public, max-age=3600
```

The `cache-control: public, max-age=3600` is Asteris's default — `llms.txt` is cached at the CDN edge for 1 hour, so updates take up to an hour to propagate. Adjust in the advanced panel if you need faster propagation (e.g., for sites that publish multiple times per day).

---

## Step 8 — Schedule re-generation

`llms.txt` content gets stale as you publish, update, and unpublish content. Asteris regenerates it on a schedule.

**Asteris → SEO + AI → AI Surface → llms.txt → Refresh schedule**

Defaults:

- **Daily** at 03:00 site-local time
- **On every post save** (publishes / updates trigger an immediate regenerate)
- **On manual trigger** (admin → Regenerate now)

For most sites, daily + on-save is right. For a high-volume publisher (10+ posts/day), bump on-save to debounced (regenerate at most once per 10 minutes) to avoid hot-loop on bulk imports.

---

## Step 9 — Eat your own dog food — link to it

Add a footer note or a `/about` mention:

> This site publishes [`llms.txt`](https://yoursite.com/llms.txt) and [`llms-full.txt`](https://yoursite.com/llms-full.txt) for AI assistants. Generated by [Asteris Utility Suite](https://asteriscommerce.com/asteris-utility-suite).

Cross-linking from human-readable pages helps both humans (who find out you do this and look at it) and AI crawlers (which discover the file through the link graph).

---

## Step 10 — Monitor AI traffic

This is where the *result* of the work shows up. Asteris's AI Traffic Tracker logs every visit that arrives from an AI assistant referrer.

**Asteris → SEO + AI → AI Traffic Tracker**

You'll see:

- Visits per assistant (ChatGPT, Claude, Perplexity, Google AI Overviews, Bing Copilot, others)
- 28-day trend chart
- Top-cited pages (which of your pages are being referred from AI answers)

Don't expect anything in the first 48 hours — AI assistants need to re-crawl + reindex. Useful data shows up in week 2-4. By month 3, you should have a real read on which pages are working for AI citation and which aren't.

---

## Common issues

### "Asteris doesn't see my pages in llms.txt"

Three causes, in order of likelihood:

1. **Pages are draft / private / pending** — Asteris only includes published. Check the post status.
2. **Pages marked noindex** in the SEO sidebar — toggle off, or in the llms.txt customise panel set "Include noindex pages: Yes".
3. **Wrong post type included** — Asteris defaults to `page` + `post`. Custom post types need explicit inclusion. Asteris → SEO + AI → AI Surface → llms.txt → Customise → Post types.

### "I changed the bot policy but the headers still say allow"

Two layers to refresh:

1. **CDN cache** — purge it (Cloudflare → Caching → Purge Everything, or your CDN equivalent)
2. **Browser cache** — hard-refresh (Cmd+Shift+R / Ctrl+Shift+R) in your test browser

Asteris's bot-policy changes apply to `robots.txt` immediately, but live HTML pages still serve cached headers until the next page-load AND the next cache TTL expires.

### "llms-full.txt is huge and slow to load"

Either:

1. **Cap the size** — Asteris → SEO + AI → AI Surface → llms-full.txt → Max size (default 5 MB; lower to 2 MB or 1 MB)
2. **Cap the page count** — include only your top N pages by manual selection
3. **Exclude individual heavy pages** — long-form guides over 50 KB each can blow the budget; consider excluding them and letting AI crawlers fetch individually if needed

---

## What you've built

After this tutorial:

- `yoursite.com/llms.txt` — curated content map for AI assistants
- `yoursite.com/llms-full.txt` — full content corpus, fetchable in one request
- `yoursite.com/robots.txt` — extended with explicit AI bot policy (Option A / B / C from step 4)
- Per-page `<meta name="robots" content="noai">` and `X-Robots-Tag` headers reflecting the bot policy
- IndexNow auto-submission firing on every publish/update
- Scheduled daily regeneration + on-save refresh
- AI Traffic Tracker logging every assistant referral

That's the AI visibility surface. From the AI side, your site is now:

1. Discoverable (via `llms.txt`)
2. Citable (citation-class crawlers allowed)
3. Protected from training-time absorption (if you chose Option B)
4. Trackable (you see what's working)

---

## See also

- [llms.txt for WordPress — what it is + why](/asteris-utility-suite/guides/llms-txt-for-wordpress/) — the marketing-side explainer
- [What is Generative Engine Optimization (GEO)?](/asteris-utility-suite/guides/what-is-generative-engine-optimization/) — broader practice
- [Configure the SEO + AI Suite module](/asteris-utility-suite/docs/modules/seo-ai/) — settings reference
- [WordPress SEO pillar guide](/asteris-utility-suite/wordpress-seo/) — how llms.txt fits into the broader SEO stack
