---
url: /asteris-utility-suite/modules/accessibility
title: "WordPress Accessibility Plugin — Asteris (WCAG 2.1 AA Scanner + EAA Statement)"
description: "Asteris Accessibility is a WordPress accessibility plugin with a WCAG 2.1 AA scanner (13 checks), in-editor issue highlighting, site-wide audit dashboard, and an EAA-compliant accessibility statement generator. Free lite version on WordPress.org."
og_title: "Asteris Accessibility — WCAG 2.1 AA Scanner for WordPress"
og_description: "WCAG scanner inside WP Admin. EAA-compliant statement generator. Site-wide audit dashboard with worst-offenders report."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/accessibility
primary_keyword: wordpress accessibility plugin
secondary_keywords:
  - wordpress wcag plugin
  - wordpress accessibility scanner
  - eaa compliance wordpress
  - wp accessibility alternative
  - accessibility checker wordpress
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: accessibility
internal_links_out:
  - /asteris-utility-suite/free
  - /asteris-utility-suite/modules
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Accessibility Plugin — Asteris Accessibility Scanner

**What is a WordPress accessibility plugin?** A WordPress accessibility plugin scans your site against the Web Content Accessibility Guidelines (WCAG) — the international standard for making web content usable by people with disabilities. The plugin flags issues (missing alt text, low colour contrast, empty buttons, improper heading order, etc.) and helps you fix them before they cause legal or usability problems. **WCAG 2.1 Level AA** is the standard most jurisdictions require (the EU's European Accessibility Act, the US ADA, the UK Equality Act).

**Does Asteris Accessibility help with the European Accessibility Act (EAA)?** Yes. The EAA became enforceable in **June 2025** and requires most B2C websites operating in the EU to meet WCAG 2.1 AA *and* publish an **accessibility statement**. Asteris's Accessibility module scans against WCAG 2.1 AA and includes an **EAA-compliant accessibility statement generator** that emits the statement at `/accessibility-statement` (or any URL you configure).

**Is there a free WordPress accessibility plugin?** Yes — **Asteris Utility Suite Free** on WordPress.org includes a lite version: on-save WCAG 2.1 AA scan of any post/page with 13 checks and in-editor issue highlighting. The full module adds the site-wide audit dashboard, worst-offenders report, EAA statement generator, scheduled rescans, and REST endpoint for CI integration.

---

## The complete feature set

### Scanner (13 WCAG 2.1 AA checks)

Asteris's scanner runs server-side (DOMDocument + XPath) on saved content. It checks:

1. **Images without alt text** (WCAG 1.1.1 Non-text Content)
2. **Empty buttons or links** (WCAG 2.4.4 Link Purpose, 4.1.2 Name Role Value)
3. **Heading order violations** (WCAG 1.3.1 Info and Relationships)
4. **Skipped heading levels** (e.g. h1 → h3 with no h2)
5. **Empty headings**
6. **Form inputs without labels** (WCAG 1.3.1, 3.3.2 Labels or Instructions)
7. **Low colour contrast** on text (WCAG 1.4.3 Contrast Minimum)
8. **Missing language declaration** on the `<html>` element
9. **Tables without headers** (WCAG 1.3.1)
10. **Auto-playing media** (WCAG 1.4.2 Audio Control)
11. **Duplicate IDs in the DOM** (WCAG 4.1.1 Parsing)
12. **Missing `lang` attribute on language-shifted text** (WCAG 3.1.2)
13. **Links with the same text but different destinations** (WCAG 2.4.4)

Each issue is flagged with the **WCAG criterion reference**, the **DOM line number**, a **plain-English explanation**, and a **recommended fix**.

### In-editor metabox (lite version: free)

When you save a post or page, Asteris scans it and shows issues in a metabox below the editor. Click an issue to jump to the offending element. Fix it; save again; rescan.

### Site-wide audit dashboard (paid)

WP Admin → **Asteris → Accessibility → Audit** shows:

- Total issue count across the site
- Issues by WCAG criterion
- Issues by post type
- **Worst-offenders report** — the 10 posts/pages with the most issues
- Trend chart — issue count over time

Useful for prioritising remediation on a site with hundreds or thousands of posts.

### Accessibility statement generator (paid) — locale-aware templates

WP Admin → **Asteris → Accessibility → Statement** generates an accessibility statement at `/accessibility-statement` (configurable URL) that includes:

- Organisation name and contact details
- Conformance level (WCAG 2.1 AA target)
- Known non-conformances (auto-pulled from the audit dashboard)
- Date of last full audit
- Feedback mechanism (contact form / email)
- Enforcement procedure reference

**The template auto-selects based on your configured content locale**:

- **`en-IE` / EU sites** → EAA (EU Directive 2019/882) + EN 301 549 framing + national EU regulator references
- **`en-US`** → ADA / Section 508 framing + DOJ enforcement reference
- **`en-GB`** → Equality Act 2010 + EHRC enforcement reference
- **`en-AU`** → Disability Discrimination Act 1992 + Australian Human Rights Commission reference
- **`en-CA`** → AODA (Ontario) + provincial equivalents
- **`en-NZ`** → Human Rights Act + Office for Disability Issues
- **`en-IN`** → Rights of Persons with Disabilities Act 2016
- **`en-ZA`** → Promotion of Equality and Prevention of Unfair Discrimination Act

The statement updates automatically as your audit findings change. The right legal framework appears in the statement automatically — no manual editing required.

### Scheduled rescans (paid)

Run a full site audit on a schedule (daily / weekly / monthly). Asteris emails a digest of new issues. Useful for catching regressions when content authors publish without thinking about alt text.

### REST endpoint for CI integration (paid)

`/wp-json/asteris/v1/accessibility/scan?url=...` returns the issue set as JSON. Wire this into your CI pipeline (GitHub Actions / GitLab CI / etc.) to fail builds when accessibility regressions are introduced.

---

## How Asteris's scanner compares

| Plugin | Scanning approach | EAA statement | Site-wide audit | Free version |
|---|---|---|---|---|
| WP Accessibility | Front-end fixes (toolbar) | — | — | ✓ |
| Equalize Digital Accessibility Checker | Server-side scan (similar to Asteris) | ✓ (paid) | ✓ (paid) | Limited |
| accessiBe / UserWay | Overlay (controversial — see below) | — | — | Free overlay |
| Asteris Accessibility | Server-side scan | ✓ | ✓ | ✓ (lite) |

**A note on overlays:** Plugins like accessiBe and UserWay install a JavaScript "accessibility overlay" that tries to fix accessibility issues at runtime. **The disability community is broadly critical of overlays** — they often fail to fix the underlying issues, can interfere with users' own assistive technology, and have been the subject of multiple lawsuits where the overlay didn't deliver the compliance it promised. Asteris is intentionally **not an overlay**. We scan, surface the issues, and help you fix them in the source — the only approach the legal community considers durable.

---

## When you need this module

- **You operate in the EU** — the European Accessibility Act applies to most B2C sites as of June 2025
- **You operate in the US** — the ADA applies to "places of public accommodation" which courts have interpreted broadly to include commercial websites
- **You operate in Canada / UK / Australia** — each has WCAG-referencing legislation
- **You're a government / public-sector site** — WCAG 2.1 AA is usually a hard requirement
- **You sell to users with disabilities** — accessibility is a baseline customer-experience requirement, not an add-on

---

## Frequently asked questions

**What is a WordPress accessibility plugin?**
A plugin that scans your WordPress site against the Web Content Accessibility Guidelines (WCAG) and flags issues like missing alt text, low colour contrast, or improper heading order. The goal is usability for people with disabilities and compliance with legislation that references WCAG.

**Does Asteris help with the European Accessibility Act (EAA)?**
Yes — Asteris's Accessibility module scans against WCAG 2.1 AA (the EAA's target standard) and includes a generator that emits an EAA-compliant accessibility statement at `/accessibility-statement`.

**What is the difference between WCAG 2.1 A, AA, and AAA?**
WCAG defines three conformance levels. **A** is the minimum (essential issues). **AA** is the standard most legislation references — what Asteris targets. **AAA** is the strictest (sign-language interpretation of all video, etc.) — appropriate for some specialist sites but generally unrealistic for the whole web.

**Is the accessibility scanner free?**
A lite version (on-save scan, in-editor metabox, 13 WCAG 2.1 AA checks) is free in [Asteris Utility Suite Free](/asteris-utility-suite/free/) on WordPress.org. The full module (site-wide audit dashboard, EAA statement generator, scheduled rescans, REST endpoint) is in the paid Asteris tiers.

**Does Asteris use an accessibility overlay?**
No — and deliberately not. Overlays (accessiBe, UserWay) are controversial in the disability community and have been the subject of multiple lawsuits where they failed to deliver the compliance they promised. Asteris scans and surfaces issues for you to fix in the source — the only approach that holds up legally.

**Can I run accessibility scans in my CI pipeline?**
Yes — the paid module exposes a REST endpoint (`/wp-json/asteris/v1/accessibility/scan?url=...`) that returns the issue set as JSON. Wire it into GitHub Actions, GitLab CI, or any CI system to fail builds on accessibility regressions.

---

[Install free on WordPress.org →](/asteris-utility-suite/free/) · [See all 13 modules →](/asteris-utility-suite/modules/) · [Pricing →](/asteris-utility-suite/pricing/)
