# DataForSEO research pull — Asteris Commerce homepage redesign

**Purpose:** ground the new homepage H1, section headers, meta description, and product positioning in actual search demand rather than internal-only language. One-off pull, ~$0.50–$2 in DataForSEO credits.

**Affiliate link to use externally:** https://dataforseo.com/?aff=223918 ([memory rule](../../../.claude/projects/C--Users-Nick-CLAUDE-CODE-ASTERIS-FOR-WOOCOMMERCE/memory/reference_dataforseo_affiliate.md))

---

## Credentials handling

- Store the basic-auth credentials in `.env` at the site root, **not** in this doc or any committed file
- `.env` is already gitignored
- Format:
  ```
  DATAFORSEO_LOGIN=<your-login-email>
  DATAFORSEO_PASSWORD=<your-api-password>
  ```
- Creds are in `.env` as of 10 Jun 2026. Live key — do not paste into chat or commits.
- API base: `https://api.dataforseo.com/v3/`
- Auth header: `Authorization: Basic <base64(login:password)>`

I'll write a one-shot Node script at `scripts/dataforseo-pull.mjs` that reads `.env`, hits the endpoints below, writes raw JSON results to `docs/dataforseo-results/`, then I'll synthesise findings into copy decisions.

---

## Queries to run

Each query targets a distinct positioning question for the homepage. All run against location `Australia` + `United States` (both markets matter — Asteris is built in Sydney but most WC stores are US-based), language `English`.

### Q1 — Theme positioning headlines
**Goal:** find the language buyers actually use for "WooCommerce block theme"

**Endpoint:** `keywords_data/google_ads/search_volume/live`
**Keywords:**
- `woocommerce block theme`
- `free woocommerce theme`
- `best wordpress theme for woocommerce`
- `woocommerce product page template`
- `fse woocommerce theme`
- `block theme woocommerce`
- `gutenberg woocommerce theme`
- `storefront alternative`

**Output we want:** monthly search volume per phrase + competition index. Tells us which phrases to anchor the Theme spotlight in.

### Q2 — Plugin-suite positioning
**Goal:** validate "X-modules-in-one-plugin" framing vs alternatives

**Endpoint:** same
**Keywords:**
- `all in one woocommerce plugin`
- `woocommerce plugin bundle`
- `best woocommerce plugins`
- `replace yoast for woocommerce`
- `woocommerce seo plugin`
- `woocommerce pdf invoice plugin`
- `woocommerce variation swatches`
- `wordpress security plugin`
- `wordpress seo plugin`

**Output:** confirms or rejects the "replaces $X/yr of separate plugins" angle.

### Q3 — Cart/checkout positioning
**Goal:** validate Cart product positioning

**Endpoint:** same
**Keywords:**
- `woocommerce side cart`
- `woocommerce checkout optimizer`
- `cartflows alternative`
- `funnelkit alternative`
- `woocommerce express checkout`
- `woocommerce checkout customizer`

### Q4 — Affiliate program positioning
**Goal:** Affiliates positioning

**Endpoint:** same
**Keywords:**
- `affiliatewp alternative`
- `wordpress affiliate plugin`
- `woocommerce affiliate program`
- `tapfiliate alternative`
- `referral plugin wordpress`

### Q5 — Patterns / Blocks
**Goal:** Pro Patterns + Blocks add-on positioning

**Endpoint:** same
**Keywords:**
- `gutenberg block patterns`
- `wordpress page patterns`
- `block theme patterns`
- `gutenberg blocks plugin`
- `free gutenberg blocks`
- `stackable alternative`
- `kadence blocks alternative`

### Q6 — Competitor SERPs (top 10 each)
**Goal:** see what's actually ranking for our core queries — gives us headline patterns to match or differentiate from

**Endpoint:** `serp/google/organic/live/advanced`
**Queries:**
- `woocommerce block theme`
- `free woocommerce theme 2026`
- `all in one woocommerce plugin`
- `cartflows vs funnelkit` (informs Cart positioning)
- `affiliatewp alternative`

**Output:** top 10 organic results per query with title + meta description + URL. Skim for pattern (e.g. do all winning pages use "free" in title? what numbers do they lead with?).

### Q7 — Related keywords expansion
**Goal:** discover phrases I haven't thought of

**Endpoint:** `keywords_data/google_ads/keywords_for_keywords/live`
**Seed keywords:**
- `woocommerce theme`
- `wordpress block theme`
- `gutenberg blocks`

**Output:** related keywords with search volume. Often surfaces unexpected angles ("woocommerce theme for clothing store" etc.).

---

## Estimated cost

- Q1–Q5: 5 calls × ~30 keywords each = 150 keyword-rows. DataForSEO Google Ads search-volume is $0.075 per 1k rows → **~$0.01 total**
- Q6: 5 SERP calls × $0.001 = **$0.005**
- Q7: 3 related-keywords calls × ~$0.01 each = **~$0.03**

**Total: ~$0.05 of credits.** Trivial.

---

## What I'll do with the data

1. Write findings into `docs/dataforseo-findings.md` — table per query with top phrases by volume + my interpretation
2. Draft 3–5 candidate H1s for the homepage, scored against search-demand alignment + brand voice
3. Same for the Theme spotlight H2, Plugins section heading, meta description
4. Surface any phrases we should be using in product card headlines on the homepage
5. Cross-reference against the [feedback_no_competitor_longevity_framing](../../../.claude/projects/C--Users-Nick-CLAUDE-CODE-ASTERIS-FOR-WOOCOMMERCE/memory/feedback_no_competitor_longevity_framing.md) rule (no install-count claims) and the small-team rule before locking copy

---

## What I need from you

1. Confirm: **add DataForSEO creds to `.env`** at `C:\Users\Nick\CLAUDE_CODE\ASTERIS_COMMERCE_SITE\.env`?
2. Or do you want me to write the pull script and you'll set the creds yourself?
3. Any keywords you want me to add or drop?

Once creds are in place I'll run the pull, write findings, then propose the final homepage copy before building.
