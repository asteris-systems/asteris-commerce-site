---
url: /asteris-utility-suite/guides/how-to-add-schema-to-wordpress
title: "How to Add Schema Markup to WordPress — Complete 2026 Guide"
description: "How to add schema markup to WordPress: which schema types matter, how to implement Article, Product, FAQ, HowTo, LocalBusiness, Person, and Organization schema with WordPress plugins. Includes manual JSON-LD examples."
og_title: "How to Add Schema Markup to WordPress"
og_description: "Article, Product, FAQ, HowTo, LocalBusiness, Person, Organization schema. Plugin-based and manual implementation."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/how-to-add-schema-to-wordpress
primary_keyword: how to add schema to wordpress
secondary_keywords:
  - wordpress schema plugin
  - wordpress structured data
  - faq schema wordpress
  - howto schema wordpress
  - product schema wordpress
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: seo
internal_links_out:
  - /asteris-utility-suite/wordpress-seo
  - /asteris-utility-suite/modules/seo-ai
  - /asteris-utility-suite/guides/wordpress-seo-checklist
verified_date: 2026-06-04
---

# How to Add Schema Markup to WordPress

**What is schema markup?** Schema markup is **structured data** (a defined vocabulary of properties) embedded in a webpage to tell search engines what the content *is*. A blog post becomes `Article` schema; a product page becomes `Product` schema; a recipe becomes `Recipe` schema. Schema markup is invisible to human readers but enables **rich results** in search engine SERPs (star ratings, FAQ accordions, recipe cards, breadcrumbs, video thumbnails) and helps AI assistants extract content for citation.

**How do I add schema to WordPress?** Three ways, in increasing order of complexity: (1) **install an SEO plugin** that ships schema automatically (Asteris SEO + AI, Yoast, RankMath, AIOSEO, SEOPress — easiest, recommended); (2) **install a dedicated schema plugin** like Schema Pro or Schema App (more control); (3) **add JSON-LD manually** to your theme `functions.php` or via a third-party code-snippets plugin (most control, most work). For 95% of sites, option 1 is the right answer.

**Which schema types should every WordPress site use?** At minimum: `Organization` or `Person` sitewide (declares site identity), `WebSite` sitewide (declares site name + search action), `Article` on blog posts, and `BreadcrumbList` on every page (renders breadcrumbs in SERPs). Add `FAQPage` on pages with Q&A content, `HowTo` on step-by-step guides, `Product` on product pages, `LocalBusiness` if you have a physical location, and `Review` / `AggregateRating` on review content.

---

## What schema does (and doesn't) do for SEO

**Does:** enables rich results in SERPs (star ratings, FAQ accordions, recipe cards, etc.), helps Google understand content context, helps AI assistants extract content for citation, can improve click-through rate from the SERP, may indirectly help rankings via better extraction.

**Doesn't:** directly improve search rankings (Google has stated repeatedly that schema is not a ranking signal in itself — rankings come from content quality + links + classic SEO). Schema *enables* rich results; rich results *can* drive more clicks; more clicks *correlate with* rankings.

---

## The schema types that matter most

### `Organization` / `Person` (sitewide)

Declares who or what the site represents. Most SEO plugins (Asteris, Yoast, RankMath, etc.) ask for this in initial setup and emit it automatically on every page.

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Your Company",
  "url": "https://yoursite.com",
  "logo": "https://yoursite.com/logo.png",
  "sameAs": [
    "https://linkedin.com/company/your-company",
    "https://twitter.com/yourhandle"
  ]
}
```

### `WebSite` (sitewide)

Declares the site name and an optional sitelinks search box for Google.

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Your Site",
  "url": "https://yoursite.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://yoursite.com/?s={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

### `Article` (blog posts + news)

The standard for any editorial content. Variants: `NewsArticle` (news outlets), `BlogPosting` (subtype of Article).

Required fields: `headline`, `image`, `datePublished`, `author`. Recommended: `dateModified`, `publisher` (with logo), `mainEntityOfPage`.

### `Product` (product pages)

Renders price + availability + rating in SERPs. Required: `name`, `image`, `description`. Critical: `offers` (price + availability + currency), `aggregateRating` if you have reviews.

### `FAQPage` (Q&A content)

Renders as an accordion in Google SERPs. Caveat: Google reduced FAQ rich-result eligibility in late 2023 — currently FAQ rich results are limited to **government and health authority sites**. The schema is still recommended (Google still parses it; AI assistants extract from it); just don't expect the visual accordion in SERPs unless you're in those categories.

### `HowTo` (step-by-step guides)

Same caveat as `FAQPage` — Google reduced HowTo rich results in 2023 to a very narrow eligibility set. Still worth adding (parsed for context); don't expect visual rich results.

### `LocalBusiness` (physical location)

Critical for local SEO. Declares address, opening hours, accepted payment types, geo coordinates. Inherits subtypes (Restaurant, Plumber, Dentist, etc.) — use the most specific subtype that applies.

### `BreadcrumbList` (every page)

Renders breadcrumb trails in SERPs. SEO plugins emit this automatically when you've configured breadcrumbs.

### `Review` / `AggregateRating`

For reviews and rating summaries. The 1-5 star rating you see in SERPs comes from this.

### `VideoObject`

For pages with embedded video. Required: `thumbnailUrl`, `uploadDate`, `name`. Enables video rich results.

---

## How to add schema with a plugin (recommended)

### Option A: Asteris SEO + AI

1. Install [Asteris Utility Suite](/asteris-utility-suite/free/) (free) or upgrade to a paid tier for the full SEO + AI module
2. WP Admin → **Asteris → Modules** → toggle **SEO + AI Suite** to ON
3. **Asteris → SEO + AI → Schema** → declare site identity (Organization or Person)
4. Asteris automatically emits Organization, WebSite, Article, and BreadcrumbList schema on appropriate page types
5. Per-page schema overrides in the SEO sidebar (Gutenberg / Classic / Elementor / Bricks / Beaver / Divi)

Asteris ships 30+ schema types. [See the SEO + AI module →](/asteris-utility-suite/modules/seo-ai/)

### Option B: Yoast / RankMath / AIOSEO

Each works similarly. Configure site identity in plugin settings; the plugin emits schema on every page based on the page type. Per-post overrides in the sidebar. Yoast and RankMath cover the common schemas; for esoteric types (Recipe, Course, Event), Schema Pro or a dedicated schema plugin may be needed.

---

## How to add schema manually (JSON-LD)

If you want full control or want a schema type your plugin doesn't ship:

### Via theme `functions.php`

Add to your child theme's `functions.php`:

```php
function my_custom_schema() {
    if ( is_single() ) {
        echo '<script type="application/ld+json">';
        echo wp_json_encode([
            '@context' => 'https://schema.org',
            '@type' => 'Article',
            'headline' => get_the_title(),
            'datePublished' => get_the_date( 'c' ),
            'author' => [
                '@type' => 'Person',
                'name' => get_the_author(),
            ],
        ]);
        echo '</script>';
    }
}
add_action( 'wp_head', 'my_custom_schema' );
```

### Via a code-snippets plugin

If you're using WPCode or another code-snippets plugin, the same PHP can go in a snippet — no theme edits, survives theme changes.

### Via direct HTML injection in posts

For one-off pages, paste the `<script type="application/ld+json">...</script>` block into a Custom HTML block in Gutenberg. Less elegant; works.

---

## Validate every schema implementation

Three tools, all free:

### 1. [Google Rich Results Test](https://search.google.com/test/rich-results)

Paste a URL or code; Google parses it and tells you which rich results are eligible, plus any errors.

### 2. [Schema.org Validator](https://validator.schema.org/)

Pure schema validity check (independent of Google).

### 3. View source manually

Pull up the page, View Source, search for `application/ld+json` — verify the JSON is well-formed.

**Validate every time you change schema.** A malformed schema can silently prevent rich results.

---

## What schema NOT to add

- **Markup that doesn't match what's on the page** — Google's spam policies treat this as schema spam. Don't add Review schema if there are no reviews.
- **`Product` schema on category pages** — Product schema is for individual products. Categories get `CollectionPage` schema.
- **Multiple competing schema types on one page** — e.g. `Article` + `Product` on the same URL is confusing. Pick the right one for the dominant content.
- **Deprecated schema types** (`Article`'s `articleBody` is fine; older Hatom or Hentry microformats are deprecated — don't add).

---

## Frequently asked questions

**Does schema markup improve SEO rankings?**
Not directly — Google has stated repeatedly schema is not a ranking signal in itself. Schema *enables* rich results (star ratings, FAQ accordions, etc.), which *can* improve click-through, which *correlates with* rankings indirectly.

**Which schema types should I add to WordPress?**
At minimum: Organization or Person (sitewide), WebSite (sitewide), Article (blog posts), BreadcrumbList (every page). Add FAQPage / HowTo / Product / LocalBusiness / Review where content type warrants.

**Can I add schema manually without a plugin?**
Yes — JSON-LD via theme `functions.php`, via a code-snippets plugin, or via Custom HTML blocks. Plugins automate it; manual gives full control.

**Why don't I see star ratings in Google after adding schema?**
Three possibilities: (1) the schema isn't valid — check Google Rich Results Test, (2) Google hasn't re-crawled the page yet — wait 1-4 weeks, (3) the rich result eligibility doesn't apply (FAQ and HowTo rich results were significantly reduced in late 2023; star ratings require sufficient site authority for Google to trust them).

**What's the difference between JSON-LD, Microdata, and RDFa?**
Three formats for embedding schema. **JSON-LD** is Google's recommended format and what all modern SEO plugins use. Microdata and RDFa are older inline formats; both work but JSON-LD is cleaner.

---

[WordPress SEO pillar →](/asteris-utility-suite/wordpress-seo/) · [SEO + AI module →](/asteris-utility-suite/modules/seo-ai/) · [WordPress SEO Checklist →](/asteris-utility-suite/guides/wordpress-seo-checklist/)
