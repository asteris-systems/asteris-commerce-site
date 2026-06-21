---
title: "Configure Accessibility Scanner"
description: "Step-by-step setup of the Asteris Accessibility scanner: WCAG 2.1 AA scan, in-editor metabox, site-wide audit dashboard, EAA-compliant accessibility statement generator, scheduled rescans, REST endpoint for CI. Quickstart in 10 minutes."
sidebar:
  order: 11
---

# Configure the Accessibility Scanner module

For the marketing overview of this module, see [/modules/accessibility](/asteris-utility-suite/modules/accessibility/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

This module scans WordPress content against WCAG 2.1 Level AA — the standard most accessibility legislation references (EU Accessibility Act effective June 2025, US ADA case law, UK Equality Act, Canada AODA). The scanner finds the catchable-by-automation 30-40% of accessibility issues; the remaining 60-70% require manual review (alt-text *meaningfulness*, tab order, screen reader navigation, captions accuracy).

---

## Quickstart (10 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Accessibility** to ON.

The Accessibility submenu appears, plus a metabox on every post/page edit screen.

### 2. Configure scan defaults

**Asteris → Accessibility → Settings → Scan defaults**

Defaults are sensible:

- ✓ **Scan on save** — every post/page is scanned when saved
- ✓ **Severity threshold** — All (show every issue; tighten later)
- ✓ **Include post types** — Posts + Pages (extend to custom post types as needed)
- ✓ **Exclude URLs** — admin-only paths automatically excluded

For most sites, no changes needed here. Save.

### 3. Open a real post + see the scan results

Open any published post in the editor. Below the content area you should see the **Asteris → Accessibility** metabox.

Click **Scan now** (or save the post — it auto-scans on save).

After a few seconds, the metabox shows:

- **Issue count** by severity (Critical / Major / Minor)
- **List of issues** with:
  - WCAG criterion (e.g., 1.1.1 Non-text Content)
  - Plain-English explanation
  - DOM line number where the issue is
  - Recommended fix
  - Severity classification

If your post has issues, **the most common one is missing alt text on images.** That's the easiest win — go to each image without alt text, set descriptive alt, save the post, re-scan.

### 4. Walk through the 13 checks

The scanner runs server-side (DOMDocument + XPath) and checks 13 WCAG 2.1 AA criteria:

| # | Criterion | Common failure |
|---|---|---|
| 1 | **1.1.1** Non-text Content | Images without alt attribute (or with empty alt for non-decorative images) |
| 2 | **2.4.4 + 4.1.2** Empty buttons/links | `<button>` or `<a>` with no accessible name |
| 3 | **1.3.1** Heading order | `<h1>` → `<h3>` skipping `<h2>` |
| 4 | **1.3.1** Skipped heading levels | Same — different aspect |
| 5 | **1.3.1** Empty headings | `<h2></h2>` with no content |
| 6 | **1.3.1 + 3.3.2** Form inputs without labels | `<input>` not wrapped in `<label>` or paired by `for`/`id` |
| 7 | **1.4.3** Low contrast | Text colour vs background fails 4.5:1 ratio (3:1 for large text) |
| 8 | **3.1.1** Missing `<html lang>` | Theme template doesn't declare the page language |
| 9 | **1.3.1** Tables without headers | `<table>` with `<td>` but no `<th>` |
| 10 | **1.4.2** Auto-playing media | `<video autoplay>` or `<audio autoplay>` without controls |
| 11 | **4.1.1** Duplicate DOM IDs | Multiple elements with `id="foo"` |
| 12 | **3.1.2** Language changes without `lang` | Multi-language content without `lang="es"` etc. on the foreign-language span |
| 13 | **2.4.4** Same-text links to different URLs | Two "Read more" links going to different posts (screen readers can't distinguish) |

Each is fixable in 30 seconds to a few minutes per occurrence. The compounding effect across a site of 50 posts is substantial.

### 5. Run the site-wide audit

**Asteris → Accessibility → Audit → Run full audit**

Asteris scans every post + page + (if configured) custom post types. For a 200-post site, the audit takes 5-15 minutes in the background.

When complete, the audit dashboard shows:

- **Total issues** across the site
- **Issues by WCAG criterion** (which check is fired most)
- **Issues by post type** (where the issues live)
- **Worst offenders** — top 10 posts/pages with the most issues
- **Trend chart** — if you've run audits over time, the delta

Click any post in the worst-offenders list to drill into its specific issues.

### 6. Fix the top 10 worst offenders

Open each of the top 10. Fix the issues with the metabox guidance. Save. Re-audit.

**Most sites resolve 60-80% of total issues by fixing the top 10 offenders.** This is the highest-leverage step — focus here before chasing the long-tail.

### 7. Generate an EAA-compliant accessibility statement

If you serve EU users (you almost certainly do), the European Accessibility Act effective June 2025 requires a published accessibility statement.

**Asteris → Accessibility → Statement → Generator**

Fill the required fields:

- **Organisation name** (defaults to your site title)
- **Contact email** (defaults to admin)
- **Conformance level target** — WCAG 2.1 AA (default; standard)
- **Date of last full audit** — auto-populated from your latest audit
- **Feedback mechanism** — Contact form URL or email
- **Enforcement procedure** — reference the relevant national accessibility regulator
- **Known non-conformances** — auto-populated from the audit; review + edit text descriptions if needed

Click **Generate Statement**.

Asteris creates a page at the configured URL (default `/accessibility-statement`) with:

- A standard EAA-compliant template populated with your data
- A "Last updated" date that reflects the most recent audit
- A feedback section with your specified mechanism
- A reference to the enforcement procedure

The page is a regular WordPress page — you can edit further if needed. The statement updates automatically as audit findings change (the "Known non-conformances" section regenerates).

### 8. Set up scheduled rescans

**Asteris → Accessibility → Audit → Schedule**

- **Frequency** — Daily / Weekly / Monthly
- **Time** — site-local
- **Email digest** — send results to the admin (or specified recipient) after each scheduled run
- **Alert threshold** — notify only if new issues are detected (suppress no-change reports)

Weekly is right for most sites. Daily for high-content-velocity publishers (5+ posts per day). Monthly for low-velocity sites.

### 9. Bookmark the audit dashboard

Add the audit dashboard URL to your editorial / dev workflow. The team should check it weekly (or align with the scheduled rescan).

### 10. Done — the baseline is running

You now have:

- ✓ Scanner active + scanning on every save
- ✓ Per-post metabox showing issues with fixes
- ✓ Site-wide audit dashboard
- ✓ Top 10 worst offenders identified
- ✓ EAA accessibility statement generated
- ✓ Scheduled rescans + alerts

Workflows below cover deeper patterns (CI integration, per-post-type exclusion, manual review beyond automation, etc.).

---

## Common workflows

### Use the REST endpoint for CI integration

For agencies + dev teams: fail builds when accessibility regresses.

The scanner exposes a REST endpoint:

```bash
curl https://yoursite.com/wp-json/asteris/v1/accessibility/scan?url=https://yoursite.com/some-page
```

Returns JSON:

```json
{
  "url": "https://yoursite.com/some-page",
  "scanned_at": "2026-06-04T12:00:00Z",
  "issues": [
    {
      "criterion": "1.1.1",
      "severity": "critical",
      "message": "Image without alt text",
      "selector": "main > article > img:nth-child(3)",
      "line": 142
    },
    ...
  ],
  "summary": {
    "critical": 2,
    "major": 5,
    "minor": 8,
    "total": 15
  }
}
```

In your CI pipeline (GitHub Actions, GitLab CI, Bitbucket, CircleCI), parse the response. Fail the build if `summary.critical > 0` OR `summary.total > some_threshold`.

Example GitHub Actions step:

```yaml
- name: Accessibility scan
  run: |
    response=$(curl -s "${{ secrets.SITE_URL }}/wp-json/asteris/v1/accessibility/scan?url=${{ env.PR_PREVIEW_URL }}")
    critical=$(echo "$response" | jq '.summary.critical')
    if [ "$critical" -gt "0" ]; then
      echo "::error::Accessibility scan found $critical critical issues"
      exit 1
    fi
```

### Manual review beyond the 13 automated checks

The scanner catches 30-40% of issues. Manual review catches the rest. Things only a human can verify:

**Per-page manual checklist:**

1. **Tab through the page** — does focus move in a logical order? (Asteris highlights the focus order visually if you toggle "Focus order visualisation" in the metabox)
2. **Screen reader test** — install NVDA (free, Windows) or use VoiceOver (built-in, macOS). Navigate the page. Does the content make sense audibly?
3. **Keyboard-only operation** — disable mouse. Can you operate every interactive element?
4. **Alt text *meaningfulness*** — Asteris flags missing alt; you verify present alt is meaningful (e.g., "Photo of CEO" is bad alt; "John Smith speaking at the Acme conference 2024" is good)
5. **Captions on videos** — Asteris detects auto-playing media but can't verify caption accuracy
6. **Colour as the sole indicator** — Asteris flags low contrast but can't tell if error states use red without an icon

Document the manual review in your audit log so you can defend it later if needed.

### Configure for a specific custom post type

If you have a CPT (Custom Post Type) that should be scanned:

**Asteris → Accessibility → Settings → Post types**

Toggle ON for the post types you want scanned. Re-run the audit to include them.

For high-volume CPTs (e.g., product catalogue with 10,000 entries), consider:

- **Sample audit** — scan random 100 per CPT instead of all
- **Per-CPT scheduled rescan** — different frequencies for different post types
- **Exclude template-driven CPTs** — if a CPT renders via a fixed template that's already verified, scanning each instance is duplicated work

### Generate accessibility statement for a specific market

Different jurisdictions have different statement requirements:

- **EU (EAA)** — Asteris's default template
- **UK (Public Sector Bodies Accessibility Regulations 2018)** — close to EAA but with UK-specific enforcement references
- **US (Section 508 / ADA)** — different format; Asteris doesn't auto-generate Section 508 statements (manual template provided in the customisation panel)
- **AU (DDA + WCAG)** — AU-specific template available

**Asteris → Accessibility → Statement → Template** → pick your jurisdiction. The statement regenerates with the right template.

### Run an audit before publishing a new section

For agency builds: scan a draft site before handover.

1. Set up Asteris on the staging URL
2. **Asteris → Accessibility → Audit → Run audit**
3. Export the audit results to PDF (Asteris → Audit → **Export PDF**)
4. Include the PDF in the handover docs to the client
5. Schedule monthly rescans to catch regressions after they take over

### Handle the EAA enforcement deadline (June 2025+)

If you're behind on EAA:

1. **Today:** Run a full audit. Generate the statement (even if non-compliant in places).
2. **Within 30 days:** Fix the Critical issues (sources of legal exposure — broken navigation, unusable forms)
3. **Within 90 days:** Fix the Major issues (degraded but not blocking)
4. **Ongoing:** Monthly audit + iteration on Minor issues + new content

The statement should accurately reflect your conformance status. Listing known non-conformances honestly is materially better than claiming false compliance — courts (and regulators) treat good-faith remediation effort favourably.

See [/docs/tutorials/run-accessibility-audit-before-eaa-deadline](/asteris-utility-suite/docs/tutorials/run-accessibility-audit-before-eaa-deadline/) for the full EAA-specific walkthrough.

### Why we don't ship an accessibility overlay (deliberate scope decision)

Plugins like accessiBe and UserWay install a JavaScript "accessibility overlay" — a widget that promises to fix accessibility issues at runtime via DOM manipulation. **The disability community is broadly critical of overlays:**

1. **They don't fix the underlying issues** — overlays apply cosmetic fixes (high contrast mode, font size adjustment) but the underlying HTML remains inaccessible
2. **They interfere with users' own assistive technology** — overlay-applied changes often conflict with screen readers / browser AT
3. **Multiple lawsuits have ruled overlays don't deliver promised compliance** — both Federal courts (US) and EU regulators have rejected overlay-based defences

Asteris deliberately doesn't ship an overlay. We scan, surface issues, and help you fix them in the source HTML. This is the only approach the legal community considers durable.

If your contract or vendor requires an overlay, you can install one separately — Asteris doesn't conflict. But for primary compliance, fix the source.

---

## Settings reference

### Scan defaults

- **Scan on save** — auto-trigger after every post/page save
- **Severity threshold for display** — All / Critical+Major / Critical only
- **Post types** — which post types to include
- **Exclude URLs** — regex patterns to skip
- **Exclude DOM selectors** — CSS selectors to skip (e.g., embedded third-party widgets where you can't fix the HTML)

### Site-wide audit

- **Run on demand** — admin trigger
- **Scheduled** — Daily / Weekly / Monthly
- **Sample mode** — scan random N per post type
- **Per-post-type rescan frequency** — override default per post type
- **Audit history** — keep last N audits for trend analysis

### Accessibility statement (locale-aware)

- **Template** — auto-selects based on Asteris → Settings → Content Locale: `en-IE` → EU EAA · `en-US` → ADA / Section 508 · `en-GB` → Equality Act 2010 · `en-AU` → DDA · `en-CA` → AODA · `en-NZ` → Human Rights Act · `en-IN` → RPwD Act 2016 · `en-ZA` → PEPUDA
- **Manual template override** — override the auto-selected template if needed
- **Auto-update non-conformances** — sync from audit findings
- **Statement URL** — default `/accessibility-statement`; configurable
- **Statement page status** — published / draft / scheduled

### Notifications

- **Email digest** — after scheduled audit
- **Alert on new Critical issues** — immediate email
- **Alert on threshold breach** — if total issues exceed N

### CI integration

- **REST endpoint** — `/wp-json/asteris/v1/accessibility/scan`
- **API key authentication** — for unauthenticated CI access (separate from `manage_options`)
- **Response format** — JSON / JUnit XML / CSV (for CI consumers)

---

## REST API

```
# Scan
GET    /wp-json/asteris/v1/accessibility/scan?url=<url>
GET    /wp-json/asteris/v1/accessibility/scan?post_id=<id>
POST   /wp-json/asteris/v1/accessibility/scan
       body: { html: "<...>", url?: "<url>" }            # scan ad-hoc HTML

# Audit
GET    /wp-json/asteris/v1/accessibility/audit            # latest results
POST   /wp-json/asteris/v1/accessibility/audit            # trigger new audit
GET    /wp-json/asteris/v1/accessibility/audit/<id>      # specific audit
GET    /wp-json/asteris/v1/accessibility/audit/worst-offenders?limit=10
GET    /wp-json/asteris/v1/accessibility/audit/history

# Statement
GET    /wp-json/asteris/v1/accessibility/statement
POST   /wp-json/asteris/v1/accessibility/statement/regenerate
```

Public read endpoints (scan, audit/worst-offenders, statement) require API key authentication for unauthenticated callers; capability-checked for `manage_options` users.

---

## WP-CLI

```bash
# Scan
wp asteris accessibility scan --post-id=<id>
wp asteris accessibility scan --url=<url>
wp asteris accessibility scan --file=local-page.html

# Audit
wp asteris accessibility audit
wp asteris accessibility audit --post-type=post
wp asteris accessibility audit history
wp asteris accessibility audit worst-offenders --limit=20

# Statement
wp asteris accessibility statement generate
wp asteris accessibility statement preview
```

---

## See also

- [Tutorial: Run accessibility audit before EAA deadline](/asteris-utility-suite/docs/tutorials/run-accessibility-audit-before-eaa-deadline/)
- [WordPress accessibility audit guide](/asteris-utility-suite/guides/wordpress-accessibility-audit/) — manual review beyond the 13 automated checks
- [Why Asteris doesn't ship an accessibility overlay](/asteris-utility-suite/modules/accessibility/#why-we-dont-ship-an-accessibility-overlay) — scope rationale
