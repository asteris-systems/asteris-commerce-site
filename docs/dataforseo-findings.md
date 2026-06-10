# DataForSEO findings — homepage redesign

**Run date:** 10 Jun 2026 · **Total cost:** ~$0.40 of credits · **Raw data:** `docs/dataforseo-results/`

---

## Headline insights

### 1. "All-in-one WooCommerce plugin" framing is dead in search
- `all in one woocommerce plugin` = **10/mo US** (LOW competition)
- `woocommerce plugin bundle` = **20/mo**
- `best woocommerce plugins` = **170/mo** ← the actual phrase buyers use

**Implication:** drop the "All-in-one" / "X modules in one plugin" angle from H1 / hero. Lead with **specific module benefits** ("SEO, swatches, invoices, wishlist…"), or with **"Best WooCommerce plugins from one vendor"**.

### 2. People search by SPECIFIC plugin function, not by suite
| Query | Vol/mo US |
|---|---:|
| wordpress seo plugin | 8,100 |
| wordpress security plugin | 2,900 |
| wordpress affiliate plugin | 390 |
| woocommerce variation swatches | 260 |
| best woocommerce plugins | 170 |
| woocommerce seo plugin | 90 |
| woocommerce pdf invoice plugin | 50 |
| woocommerce checkout customizer | 50 |

**Implication:** the homepage should mention the specific module names that buyers Google. Anchor links to "SEO", "Variation Swatches", "PDF Invoices", "Security" should appear in the plugin card descriptions.

### 3. The "free WooCommerce theme" market is the biggest opportunity for us
| Query | Vol/mo US | Vol/mo AU |
|---|---:|---:|
| free woocommerce theme | 140 | 20 |
| best wordpress theme for woocommerce | 50 | 10 |
| woocommerce product page template | 40 | 10 |
| woocommerce block theme | 10 | 10 |
| gutenberg woocommerce theme | 10 | 10 |

`free woocommerce theme` has **MEDIUM competition** ($8.31 CPC = real commercial intent). `woocommerce block theme` is **LOW competition** — gettable.

**Implication:** the Theme spotlight on the homepage should anchor explicitly in **"free WooCommerce block theme"** + **"product page templates"** (we have 14 — nobody else does).

### 4. The actual top competitors (by search volume) — none are FSE block themes
Q7 related-keywords surfaced the real ranking giants:

| Theme | Vol/mo US |
|---|---:|
| **XStore** | 1,300 |
| **Woodmart** | 1,000 |
| **Storefront** (the WC default) | 1,000 |
| **Flatsome** | 320 |
| **Astra** (for WC) | 210 |
| **Divi** (for WC) | 70 |

**These are all classic themes, not block themes.** Asteris is positioned uniquely as a **block theme with 14 product templates** — there's no direct competitor at the top of SERPs. Storefront is the closest target (it's the only free WC-first option), and `storefront alternative` = 10/mo with LOW competition.

### 5. "CartFlows alternative" / "FunnelKit alternative" are NOT highly searched
| Query | Vol/mo |
|---|---:|
| cartflows alternative | 10 |
| funnelkit alternative | — |
| cartflows vs funnelkit | (SERP populated — comparison content ranks) |

**Implication:** for Cart positioning on the homepage, "checkout customizer" (50/mo) is a better anchor than "CartFlows alternative". Save "alternative" framing for content marketing, not the homepage.

### 6. SERP patterns — what's ranking right now
For `woocommerce block theme` (the most direct match for our Theme):
1. r/woocommerce thread
2. WooCommerce dev docs
3. **YITH Wonder** (only commercial block theme ranking)
4. WooCommerce themes page
5. Various blog posts ("What the shift to WC Blocks means…")
6. **Olliewp** ("Best WooCommerce Block Themes for 2026")

For `free woocommerce theme 2026`:
1. wp-rocket.me ("10 Fastest")
2. teamupdraft.com ("Best free WordPress themes 2026")
3. wpforms.com ("26 Best Free")
4. WooCommerce.com themes
5. **CartFlows** ("32 Best Free WooCommerce Themes 2026")
6. Astra ("21 Best")

**Pattern:** the listicle blog posts dominate. To rank for these queries we'd need our own listicle (`/blog/best-free-woocommerce-block-themes-2026/`), but for the homepage we need a direct landing page targeting `/asteris-theme/` for the actual brand search and `Asteris` for branded searches.

---

## Copy proposals — homepage H1 + hero

### Option A — Lead with the Theme (free entry point)
> **H1:** *Free WooCommerce block theme. 14 product page templates. From a Sydney indie company.*
> **Sub:** And five other things you might want — paid plugin suites for SEO, security, affiliates, and checkout. Free Gutenberg blocks. Premium block patterns. One vendor.
> **CTAs:** `Get the free theme →` · `See all products`

**Pros:** anchors in the highest-intent free-buyer query. The Theme has zero direct block-theme competitor at the top of SERPs.
**Cons:** undersells the paid revenue products.

### Option B — Lead with vendor identity, then product list
> **H1:** *WordPress + WooCommerce, end-to-end. One Sydney indie team.*
> **Sub:** A free block theme. Four plugin suites that replace stacks of separate plugins. Two free toolkits. Sold direct, no marketplaces, no resellers.
> **CTAs:** `Start with the free theme →` · `See all products`

**Pros:** keeps brand identity central (matches the existing tone). Doesn't underwrite either free or paid.
**Cons:** "end-to-end" is vague — doesn't hook search demand directly.

### Option C — Lead with the cost-replacement angle (matches the mission strip)
> **H1:** *One vendor. Replaces $5,960/yr of WordPress + WooCommerce plugins.*
> **Sub:** Asteris for WordPress (security, SEO, performance). Asteris for WooCommerce (SEO, swatches, invoices, wishlist). Asteris Cart (checkout funnel). Asteris Affiliates. Plus a free block theme, free Gutenberg blocks, and premium block patterns. Sydney-built.
> **CTAs:** `See the pricing` · `Start free`

**Pros:** matches buyer mental model ("replaces N plugins") which IS searched ("best woocommerce plugins"). Specific module names (SEO, swatches, invoices) match high-volume queries.
**Cons:** numerical claim ($5,960/yr) needs to be defensible — already in the mission table but front-and-centre invites scrutiny.

### My recommendation: hybrid of A + C
> **H1:** *WordPress + WooCommerce — end-to-end, from a Sydney team.*
> **Sub-H1 strap:** *Free block theme. Four plugin suites. Two free toolkits. Replaces ~$5,960/yr of separate plugins.*
> **Lead paragraph (2 sentences):**
> Start free with the Asteris theme — the only free WooCommerce block theme with 14 product page templates. Then add the plugin suite that matches your needs: SEO, security, performance, swatches, PDF invoices, checkout funnel, affiliate program — all under one roof.
> **CTAs:** `Get the free theme →` · `See the plugin suites`

This puts the **free Theme as the obvious on-ramp** (matches search demand + competitive opening), but uses the lead paragraph to name the specific high-volume plugin queries ("SEO", "security", "swatches", "PDF invoices") so we capture buyers looking for individual functions.

---

## Section heading proposals

| Section | Old | Proposed (data-anchored) |
|---|---|---|
| Theme spotlight | (none) | **Start free — Asteris Theme** · *"The free WooCommerce block theme with 14 product page templates"* |
| Plugin grid | "Products" / "Four plugins…" | **The four plugin suites** · *"Specific functions — SEO, security, swatches, checkout, affiliates — under one vendor"* |
| Add-ons | "Asteris Blocks" card alone | **Round it out** · 2 cards: Asteris Blocks (free) + Pro Patterns (paid) |
| Mission | "More inclusions. Less cost." | (keep — table is good as-is, add Theme row) |
| Why split | "Why four plugins, one company" | **"Why six products, one vendor"** |
| About | (keep) | (keep) |

---

## Meta description proposal

**Current** (~270 chars, includes "five plugins" inaccurately):
> Asteris Commerce builds five plugins: Asteris for WooCommerce (20 modules), Asteris for WordPress (11 modules)...

**Proposed** (~155 chars — Google's display limit):
> Free WooCommerce block theme with 14 product page templates. Plus four plugin suites for WordPress + WooCommerce. Sydney-built. One vendor.

---

## What I do NOT recommend changing based on the data

- The **mission/cost-replacement table** — the "$5,960/yr replacement" is the right pitch and is grounded in real plugin licence prices.
- The **About strip** with company history — this is brand voice, not search-driven.
- The **violet brand palette** — locked, not up for review.
- The **trust badges / "Australian indie"** framing — small distinguishing differentiator, no SEO data needed to validate it.

---

## What I'd want to validate further (NOT included in this pull)

- Whether `asterisforwoocommerce.com` should retarget any of these high-volume queries (`wordpress seo plugin` = 8,100/mo) at the page level — that's a sub-site SEO question, not parent-site.
- Whether to spend the $0.05 to also pull AU SERPs for the top queries (so far only AU keyword volumes, not AU SERPs).
- DA/backlink data on the top-ranking competitor pages — separate DataForSEO endpoint, ~$0.50 more.

---

## Next step

**Pick** Option A / B / C / hybrid (or sketch your own), and I'll build the new homepage to match.
