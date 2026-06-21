---
url: /asteris-utility-suite/guides/wordpress-accessibility-audit
title: "WordPress Accessibility Audit — WCAG 2.1 AA Checklist + Tools (2026)"
description: "How to audit a WordPress site against WCAG 2.1 AA accessibility standards. Manual checklist, automated tools, EAA compliance requirements, common WordPress accessibility issues, and how to fix them."
og_title: "WordPress Accessibility Audit — WCAG 2.1 AA Checklist"
og_description: "Audit a WordPress site against WCAG 2.1 AA. Manual checklist + automated tools. EAA compliance."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-accessibility-audit
primary_keyword: wordpress accessibility audit
secondary_keywords:
  - wcag 2.1 wordpress
  - wordpress accessibility checker
  - wordpress accessibility checklist
  - eaa compliance wordpress
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: accessibility
internal_links_out:
  - /asteris-utility-suite/modules/accessibility
verified_date: 2026-06-04
---

# WordPress Accessibility Audit — WCAG 2.1 AA Checklist

**What is a WordPress accessibility audit?** A WordPress accessibility audit is a systematic check of your site against the **Web Content Accessibility Guidelines (WCAG)** — the international standard for making web content usable by people with disabilities (visual, motor, cognitive, hearing impairments). **WCAG 2.1 Level AA** is the standard most legislation references (EU Accessibility Act, US ADA, UK Equality Act, Canada AODA). An audit identifies where your site fails the criteria and gives you a remediation plan.

**Do I legally need to audit my WordPress site?** Depends on jurisdiction and business type. **EU**: the European Accessibility Act became enforceable in **June 2025** and requires most B2C websites operating in the EU to meet WCAG 2.1 AA. **US**: the ADA has been interpreted by courts to apply to commercial websites; lawsuits are frequent. **UK / Canada / Australia**: each has WCAG-referencing legislation. Even if you're not legally required, accessibility audits surface usability issues affecting all users, not just users with disabilities.

**How long does an audit take?** A first manual + automated audit of a typical 50-page WordPress site takes 4-8 hours. Ongoing audits (run after content updates) take ~30 minutes per audit if you have a tool like [Asteris's Accessibility scanner](/asteris-utility-suite/modules/accessibility/).

---

## The audit workflow

### 1. Automated scan (catches ~30-40% of issues)

Run an automated scanner across every page on the site. Tools:

- **[Asteris Accessibility scanner](/asteris-utility-suite/modules/accessibility/)** — WCAG 2.1 AA scanner with 13 checks, site-wide audit dashboard, EAA statement generator
- **WAVE** ([wave.webaim.org](https://wave.webaim.org/)) — browser extension, free, page-by-page
- **axe DevTools** ([deque.com/axe](https://www.deque.com/axe/)) — Chrome extension, free, integrates with DevTools
- **Pa11y** ([pa11y.org](https://pa11y.org/)) — command-line tool for CI integration

Automated tools catch the "easy" issues: missing alt text, low colour contrast, empty buttons, heading order, form labels, missing language declarations. They cannot catch many issues that require human judgment — these need manual review.

### 2. Manual review (the remaining 60-70%)

Things only a human can verify:

- **Alt text is *meaningful*** (not just present — a decorative banner with `alt="banner"` is technically present but useless)
- **Tab order is logical** — tab through the page; does focus move in a sensible order?
- **Keyboard accessibility** — can every interactive element be operated without a mouse?
- **Screen reader compatibility** — install NVDA (free) or use VoiceOver; navigate the page
- **Colour as the sole indicator** — are error states marked only by red text, or also by icons / labels?
- **Auto-playing media** — videos that play automatically can disorient screen reader users
- **Time limits** — forms that time out can lock out users who need more time
- **Captions on videos** — automated tools can't tell if your captions are accurate

### 3. Document findings

Per issue, capture:

- WCAG criterion violated (e.g. "1.1.1 Non-text Content")
- Location (URL + DOM selector)
- Severity (Critical / Major / Minor)
- Recommended fix

Asteris's audit dashboard does this automatically; for manual audits, a spreadsheet works.

### 4. Prioritise + fix

- **Critical:** blocks core functionality for users with disabilities (login forms unusable, navigation inaccessible, content invisible). Fix immediately.
- **Major:** significantly degrades experience but doesn't fully block. Fix within 30 days.
- **Minor:** cosmetic / edge case. Fix on next content sprint.

### 5. Publish an accessibility statement

If you operate in the EU, this is legally required. The statement must include:

- Organisation details
- Conformance level you're targeting (WCAG 2.1 AA)
- Known non-conformances
- Date of last audit
- Feedback mechanism (how users can report issues)
- Enforcement procedure

[Asteris's Accessibility module](/asteris-utility-suite/modules/accessibility/) generates this automatically.

### 6. Re-audit on a schedule

Accessibility regresses. Every new post can introduce missing alt text. Every new theme update can introduce contrast issues. Schedule a re-audit every 3-6 months (or run a continuous scan with Asteris's scheduled rescan feature).

---

## The condensed WCAG 2.1 AA checklist

The 13 checks Asteris's scanner runs (matching the most-violated WCAG 2.1 AA criteria):

1. **All images have meaningful alt text** (1.1.1 Non-text Content)
2. **All buttons and links have accessible names** (2.4.4, 4.1.2)
3. **Heading order is logical** (1.3.1 Info and Relationships)
4. **No skipped heading levels** (1.3.1)
5. **No empty headings** (1.3.1)
6. **Form inputs have labels** (1.3.1, 3.3.2)
7. **Text has sufficient colour contrast** (1.4.3 Contrast Minimum — 4.5:1 for normal text, 3:1 for large text)
8. **The `<html>` element declares a language** (3.1.1)
9. **Data tables have headers** (1.3.1)
10. **Audio and video don't auto-play** (1.4.2)
11. **DOM IDs are unique** (4.1.1)
12. **Language changes mid-document are marked** (3.1.2)
13. **Links with the same text go to the same destination** (2.4.4)

Beyond these 13, manual checks for: tab order, keyboard accessibility, screen reader navigation, captions on video, sensible link text, sufficient time on time-limited content.

---

## Common WordPress accessibility issues

### Theme-level

- **Low colour contrast** on theme defaults (especially newer "minimal" themes with light grey text on white)
- **Missing focus indicators** when tabbing through links/buttons
- **Hamburger menus that don't open via keyboard**
- **Auto-playing carousels** without pause/stop controls

### Plugin-level

- **Form plugins without proper labels** (label-by-placeholder is a WCAG violation)
- **Slider plugins** that aren't keyboard-accessible
- **Modal popups** that trap focus or don't restore focus on close

### Content-level

- **Images uploaded without alt text** — the most common single issue on any WordPress site
- **Buttons / links with text like "Click here" / "Read more"** — uninformative for screen reader users
- **Headings used for styling rather than structure** (e.g. an H4 because "I wanted it to look smaller" instead of H2)

---

## Frequently asked questions

**What is WCAG 2.1 Level AA?**
WCAG (Web Content Accessibility Guidelines) is the international standard for web accessibility. **Level AA** is the standard most legislation references — covers the substantive accessibility issues (alt text, contrast, headings, forms, keyboard navigation). Level A is below it (essentials only); Level AAA is stricter (sign language for all video, etc.).

**Does my WordPress site need to comply with the European Accessibility Act (EAA)?**
If you sell B2C in the EU, almost certainly yes — the EAA became enforceable in June 2025. The standard is WCAG 2.1 AA. Public-sector sites have had similar requirements (EN 301 549) for years; the EAA extends the requirement to private commercial sites.

**Can an automated tool fully audit accessibility?**
No — automated tools catch ~30-40% of issues. The rest (alt text *meaningfulness*, tab order, screen reader navigation, captions) requires manual review. Use automated tools as the first pass; do manual review for completeness.

**What about accessibility overlays (accessiBe / UserWay)?**
Controversial. The disability community is broadly critical — overlays often fail to fix underlying issues, can interfere with users' own assistive technology, and have been the subject of multiple lawsuits. Audit and fix issues in the source; don't rely on an overlay.

**How often should I audit?**
Initial full audit, then re-audit every 3-6 months. For sites with high content turnover (blogs publishing daily), run an automated scan on a daily cron. Asteris's scanner has scheduled rescans built in.

---

[Accessibility module →](/asteris-utility-suite/modules/accessibility/) · [Modules →](/asteris-utility-suite/modules/)
