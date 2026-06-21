---
title: "Configure Asteris AI Suite"
description: "Step-by-step setup of the AI Suite module: four AI generators on every page/post (long content, excerpt, SEO meta, image alt text), tone/language/cap settings, monthly usage meter, and the 🪄 Rewrite-this-section loop in Studio. Shares one API key with the SEO + AI module."
sidebar:
  order: 13
---

# Configure Asteris AI Suite

For the marketing overview of this module, see [/modules/ai-suite](/asteris-utility-suite/modules/ai-suite/). This page covers the practical setup — Quickstart, every settings field, the four generators on the page/post sidebar, the Studio per-section Rewrite flow, and the developer surface.

AI Suite is the **page + post AI generator suite**. It is distinct from the SEO + AI module: SEO + AI handles the per-post SEO sidebar panel (title, meta description, focus keyword discovery, social copy, content briefs); AI Suite adds **four generic content generators** as a side metabox on every page and post screen, plus the **🪄 Rewrite-this-section** loop that pairs with Studio's per-section engagement overlay.

**Both share the same API provider configuration.** Configure your provider (Anthropic / OpenAI / Gemini / OpenRouter) once under **SEO + AI → AI Provider**; AI Suite uses the same key automatically. No duplicate setup, no second key.

---

## Quickstart (3 minutes)

### 1. Configure an AI provider (once)

**WP Admin → ★ Asteris → 🎯 SEO + AI → AI Provider tab**

1. Pick a provider — **Anthropic (Claude)**, **OpenAI (GPT)**, **Google Gemini**, or **OpenRouter (any model)**. Claude is the default for brand-voice adherence in our internal testing.
2. Paste your API key into the corresponding row. (Each row links straight to the provider's API-key creation screen.)
3. Optionally pick a non-default model (e.g. `claude-haiku-4-5` for cheaper bulk meta generation, `claude-opus-4-5` for nuanced content briefs).
4. Click **Save AI settings**.

The provider key is encrypted at rest via the Security module's libsodium-based Encryption class.

### 2. Open any page or post

**WP Admin → Pages → Edit any page** (or Posts → Edit any post).

In the right-hand sidebar (or the Meta Boxes tray at the bottom of Gutenberg if your screen is narrow), you'll see a metabox titled **🪄 Asteris — AI Suite** with two text fields (Target keywords, Brief / key facts) and four buttons:

- 🪄 **Generate long content**
- 🪄 **Generate excerpt**
- 🪄 **Generate SEO meta**
- 🪄 **Generate featured image alt text**

### 3. Generate something

Type a comma-separated focus keyword list into **Target keywords** (e.g. `wordpress backup plugin, restore wordpress site`). Optionally drop a few facts into **Brief / key facts** (e.g. *"Step-by-step guide for non-developers. Covers UpdraftPlus + native WP backups. Target: WordPress beginners. USPs: no-jargon, screenshots, 5-min read."*).

Click any generator button. The result appears in a preview pane below with **Replace / Append / Copy** actions. SEO meta writes straight into the Asteris SEO fields; image alt text updates the featured image via REST.

### 4. Done

That's the minimum-viable setup. Continue below for the Studio per-section Rewrite flow, tone/language configuration, monthly usage cap, and the developer-facing REST endpoint.

---

## The four generators

Each generator weaves your page title + categories + tags + brief + keywords + tone/language settings into the prompt.

### Generate long content

**Output:** 4–6 short paragraphs (200–400 words total). Plain prose, no headings, no bullet points.

**Where it lands:**

- **Gutenberg editor:** Insert as new paragraph blocks at the end of the current content, OR replace all blocks (with confirmation).
- **Classic editor:** Append to the existing post content via TinyMCE (HTML wrapped in `<p>` tags), OR replace.
- **Copy** button is always available for manual paste.

**Best for:** generating page body copy from a brief when you have a clear value prop and target keywords. Not for replacing a writer — for unblocking a first draft.

### Generate excerpt

**Output:** 1–2 sentences, ≤200 characters.

**Where it lands:** post excerpt field directly. Works in both Gutenberg and Classic editor.

**Best for:** archive snippets, RSS feed summaries, and search-result previews. Often paired with **Generate SEO meta** which writes to the actual meta description.

### Generate SEO meta

**Output:** an SEO title (under 60 chars) and meta description (under 155 chars).

**Where it lands:** writes straight into the SEO + AI module's `_asteris_seo_title` and `_asteris_seo_description` fields. The live SERP preview in the SEO sidebar updates instantly.

**Best for:** the single highest-leverage AI action on a page — the search-results snippet that decides whether anyone clicks through. Always review before publishing.

### Generate featured image alt text

**Output:** descriptive alt text, ≤125 characters.

**Where it lands:** sends a REST `POST /wp/v2/media/{id}` to update the featured image's `alt_text`. If no featured image is set, the generator surfaces a Copy button instead.

**Best for:** every image needs alt text for accessibility + image-search SEO. This generator drafts it; you review and apply.

---

## Common workflows

### Configure tone + language

**WP Admin → ★ Asteris → 🪄 AI Suite**

- **Tone** — Professional (default) / Friendly / Concise / Enthusiastic / Expert (technical). Applied to every prompt. The AI weaves it in without you having to repeat the brand voice in every brief.
- **Language** — ISO code (default `en`). Determines the language of all generated copy. Tested across `en`, `fr`, `es`, `de`, `it`, `nl`, `pt`, `pl`. Other ISO codes work but quality depends on the provider's model.

Click **Save AI Suite settings**.

### Hide a generator you don't use

Some sites never use long content (image-heavy galleries) or never use image alt text (no featured images). Each generator is independently toggleable.

**WP Admin → ★ Asteris → 🪄 AI Suite → Generator buttons** section.

- Uncheck **Generate long content**, **Generate excerpt**, **Generate SEO meta**, or **Generate featured image alt text**.
- Save. The unchecked button is removed from the page/post metabox.

The toggle does not delete data — checking it again restores the button immediately.

### Cap monthly AI requests

To protect against runaway costs (a stuck loop, a malicious editor, a hostile script), set a monthly request cap.

**WP Admin → ★ Asteris → 🪄 AI Suite → Usage + rate limits**

- **Monthly request cap** — default 100. Soft cap; once the counter hits the cap, all generators return *"Monthly request cap reached. Raise the limit in AI Suite settings."* until the next calendar month.
- **Used this month** shows the live counter and a colored progress bar (blue → amber at 70% → red at 90%).

Set the cap to **0** for unlimited usage (only do this if your provider has its own spend limits set on the key).

The counter is stored in `wp_options['asteris_wp_ai_suite_usage']` as a per-month integer map (`{ "2026-06": 47, "2026-05": 102, ... }`), capped at 12 months of history.

### Rewrite a low-CTR section with AI (Studio integration)

This is the loop that pairs AI Suite with the Studio canvas overlay (Phase 2 Insights). It closes the gap between *"this section underperforms"* and *"here's a rewrite."*

**Prerequisites:**
- Insights enabled (so per-section engagement data exists)
- Real front-end traffic on the page (so views/clicks have accumulated — chips appear once at least one section has ≥10 views in the last 30 days)
- AI Suite configured (so the Rewrite REST endpoint can call your provider)

**Steps:**

1. **WP Admin → ★ Asteris → 🎨 Studio** → open the page
2. In the Studio top bar, click the **📊 Insights** toggle (next to the breakpoint buttons). Every section on the canvas now displays a chip — `▢ 320 views · 4 clicks · 1.3% CTR`.
3. Sections with low CTR (<5% or zero clicks despite real views) carry a **🪄 Rewrite** button on the chip.
4. Click the Rewrite button on any chip.
5. A modal opens showing:
   - **Diagnosis** — what the AI thinks is wrong (e.g. *"Zero clicks despite 320 views — the section is read but doesn't move readers forward. The CTA or value prop is missing or invisible."*)
   - **Current** — the section's existing HTML
   - **AI rewrite** — the suggested replacement, with the diagnosis explicitly addressed
6. Review both side-by-side. If you want it, click **📋 Copy rewrite** — the rewrite is copied to your clipboard, ready to paste into the section's text block.

The Rewrite button charges 1 request against your monthly cap. The rewrite is never auto-applied — you read it, decide, paste.

---

## Settings reference

Every field on **WP Admin → ★ Asteris → 🪄 AI Suite**, in order.

### AI provider header card

A status panel at the top of the settings page. Shows:

- ✓ **Configured** (green) if a key is set on the active provider in SEO + AI
- ⚠ **Not configured** (amber) otherwise, with a **Configure** button linking straight to the AI Provider tab

This is informational — the actual key is configured on the SEO + AI page, not here. The link button is a one-click jump so you don't have to remember the path.

### Generator buttons (shown on the page/post sidebar)

Four checkbox toggles, one per generator. Each row shows:

- The generator label (e.g. "Generate long content")
- A "Show this generator button" checkbox — default checked
- A hint line explaining what the generator writes to

Unchecking a row hides that button from the page/post metabox. Existing generated content is unaffected.

### Tone + language

- **Tone** — `professional` (default), `friendly`, `concise`, `enthusiastic`, `expert`
- **Language** — ISO 639-1 code, max 10 chars, default `en`

Stored as `wp_options['asteris_wp_ai_suite_tone']` and `wp_options['asteris_wp_ai_suite_language']`.

### Usage + rate limits

- **Monthly request cap** — integer, default 100. Set to 0 for unlimited.
- **Used this month** — live counter with progress bar. Read-only.

---

## Developer surface

### REST endpoint — Section_Rewrite

`POST /wp-json/asteris-wp/v1/ai/section-rewrite`

Used by Studio's per-section Rewrite button. Available to any code with `edit_post` capability on the target post.

**Request body (JSON):**

```json
{
  "post_id": 123,
  "block_path": "0.2.1",
  "current_html": "<p>Buy now and save 10%.</p>",
  "views": 320,
  "clicks": 4,
  "goal": "engagement"
}
```

| Field | Type | Required | Notes |
|---|---|---|---|
| `post_id` | int | ✓ | The post containing the section. Caller must have `edit_post` cap. |
| `block_path` | string | ✓ | The Studio block-path identifier (e.g. `"0.2.1"`). |
| `current_html` | string | ✓ | The section's current HTML — used as the rewrite anchor. |
| `views` | int |  | 30-day view count from `per_section_stats`. Default 0. |
| `clicks` | int |  | 30-day click count from `per_section_stats`. Default 0. |
| `goal` | string |  | `engagement` (default), `clarity`, or `cta`. |

**Response:**

```json
{
  "suggestion_html": "<p>Save 10% — but only until midnight. Add it to your cart.</p>",
  "reasoning": "Zero clicks despite 320 views — the CTA is invisible. Strengthened the urgency and made the action explicit.",
  "provider": "anthropic",
  "model": "claude-sonnet-4-5",
  "latency_ms": 1247
}
```

The endpoint counts against the monthly cap. It returns HTTP 429 with `{ "error": "cap_reached" }` when the cap is hit, HTTP 400 with `{ "error": "no_ai" }` if AI Suite is not configured.

### AJAX endpoints — per-page generators

- `POST wp-admin/admin-ajax.php?action=asteris_wp_ai_generate` — the four-button generator. Body: `ai_action`, `post_id`, `nonce`, `brief`, `keywords`. Returns `{ success, data }`.
- `POST wp-admin/admin-ajax.php?action=asteris_wp_ai_save_inputs` — side-saves the brief + keywords so they persist even if the editor doesn't WP Update.

Both require `edit_post` capability and the `asteris_wp_ai_nonce` nonce.

### Filters + hooks

- `apply_filters( 'asteris_wp_ai_suite_prompt', $prompt, $action, $post, $brief, $keywords )` — modify the prompt before it's sent to the provider. Useful for inserting brand guidelines or compliance text into every generation.
- `do_action( 'asteris_wp_ai_suite_generated', $action, $post_id, $response )` — fires after a successful generation. Hook this to log usage to your own analytics.

### Storage

- **Per-post:** `_asteris_ai_brief` (brief text) and `_asteris_ai_keywords` (CSV string).
- **Usage counter:** `wp_options['asteris_wp_ai_suite_usage']` — JSON map of `YYYY-MM → int`, max 12 entries.
- **Settings:** `wp_options['asteris_wp_ai_suite_*']` — one option per setting key.

---

## Troubleshooting

### "AI provider not configured" on every generator button

The buttons are greyed out. Means SEO + AI doesn't have a key set on the active provider.

**Fix:** **★ Asteris → SEO + AI → AI Provider tab** → pick a provider → paste the key → save. Refresh the page/post edit screen.

### Generator returns "Monthly request cap reached"

You've hit your monthly cap.

**Fix:** **★ Asteris → 🪄 AI Suite → Usage + rate limits** → raise the **Monthly request cap** (or set to 0 for unlimited) → save. The counter resets automatically on the 1st of the next month.

### "Permission denied" from a generator

The current user lacks `edit_post` on the target post.

**Fix:** check the user's role. Editor / Author / Admin all have it; Contributors only have it on their own drafts; Subscribers never do.

### Generate long content writes into the wrong block

In Gutenberg, **Replace content** replaces ALL blocks on the page (after confirmation). **Append** inserts new paragraph blocks at the END of the current content. If you want it elsewhere, click **📋 Copy** and paste it manually into the target block.

### Studio Rewrite button doesn't appear on any chip

Three preconditions must all be true:

1. The chip's section has ≥10 views in the last 30 days (suppresses noise on brand-new pages)
2. The CTR is below 5% OR clicks is zero
3. AI Suite is configured

If all three are true and the button is still missing, hard-refresh the Studio canvas iframe and check the browser console for errors.

### Counter doesn't decrement on a failed generation

Correct behaviour — failed requests don't count against the cap. The counter only increments after a successful provider response.

---

## See also

- [/modules/seo-ai](/asteris-utility-suite/modules/seo-ai/) — the SEO + AI module that hosts the shared API provider config.
- [/modules/insights](/asteris-utility-suite/modules/insights/) — the Insights module that feeds per-section engagement data into the Studio Rewrite flow.
- [/docs/api-reference](/asteris-utility-suite/docs/api-reference/) — full REST + AJAX reference.
- [/changelog](/asteris-utility-suite/changelog/) — when Section_Rewrite and the four generators shipped (v1.0.1).
