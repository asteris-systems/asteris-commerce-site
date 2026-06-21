---
title: "Run a WordPress accessibility audit before the EAA deadline"
description: "End-to-end EAA compliance flow for WordPress: run the WCAG 2.1 AA scanner, fix the worst offenders, generate an EAA-compliant accessibility statement, schedule monthly rescans. ~25 minutes setup + ongoing remediation."
sidebar:
  order: 6
---

# Run a WordPress accessibility audit before the EAA deadline

**Goal:** in ~25 minutes of setup + ongoing remediation work, your WordPress site is auditable against WCAG 2.1 AA (the EAA's target standard), has a published EAA-compliant accessibility statement, and runs scheduled rescans to catch regressions.

**Asteris modules used:** Accessibility scanner (lite version in Asteris Utility Suite Free covers the scan; full audit dashboard + EAA statement generator are paid)

**Why this matters now:**

- **European Accessibility Act (EAA)** became enforceable **June 2025**. Most B2C websites operating in the EU must meet WCAG 2.1 AA and publish an accessibility statement.
- **US ADA** has been interpreted by federal courts to apply to commercial websites. Lawsuits are common (~4,000+ federal cases in 2024).
- **UK Equality Act 2010** + **Canada AODA** + **Australia DDA** all reference WCAG-style standards.
- Even where there's no specific legal requirement, accessibility audits surface usability issues affecting all users — better UX, broader audience.

If you operate B2C in the EU and you're not yet compliant, **today is the right day to start.** The EAA's enforcement is real but graduated — regulators favour good-faith remediation effort over either ignoring or claiming false compliance.

---

## Before you start

You need:

- **Asteris Utility Suite** (free or paid; lite version works for the scan; paid for the audit dashboard + statement generator)
- Admin access to WP Admin
- ~25 minutes of active setup
- A multi-month remediation horizon (most sites take 30-90 days of ongoing work to reach compliance from a cold start)
- A page on your site for the accessibility statement (Asteris will create one at `/accessibility-statement` by default)

---

## Step 1 — Activate the Accessibility module

WP Admin → **Asteris → Modules** → toggle **Accessibility** to ON.

The Accessibility submenu appears, plus a metabox on every post/page edit screen.

---

## Step 2 — Configure scan defaults

**Asteris → Accessibility → Settings → Scan defaults**

For an EAA-bound site:

- ✓ **Scan on save** — every post/page is scanned when saved
- ✓ **Severity threshold for display** — All (don't filter; surface everything)
- ✓ **Post types included** — Posts, Pages, + any custom post types serving public-facing content (e.g., products, courses, events)
- ✓ **Exclude URLs** — typically only `/wp-admin/` paths; everything public should be scanned

Save.

---

## Step 3 — Run the first site-wide audit

**Asteris → Accessibility → Audit → Run Full Audit**

Asteris walks every published post + page + included custom post types. For a 200-post site, the audit takes 5-15 minutes in the background.

While it runs, you can leave the panel. The scan runs on WP-Cron independently. Refresh the panel after ~15 minutes; the audit completes status flips to "Successful".

Click into the completed audit. The dashboard shows:

- **Total issues** across the site (likely 100s to 1000s for a never-audited site)
- **Issues by WCAG criterion** — which check fires most (usually 1.1.1 alt text)
- **Issues by post type** — where issues concentrate
- **Worst offenders** — top 10 posts/pages with the most issues
- **Severity breakdown** — Critical / Major / Minor counts

This is your baseline. **Take a screenshot** — you'll compare against future audits to demonstrate remediation progress.

---

## Step 4 — Triage by severity

Don't try to fix everything at once. Triage:

### Critical (fix in first 30 days)

Issues that **block users with disabilities** from using core site functionality:

- Form inputs without labels (screen readers can't identify the field)
- Empty buttons / links (no accessible name → effectively invisible to AT)
- Auto-playing media (disorients screen reader users; some users with cognitive disabilities can't tolerate)

These are legal-exposure issues. Fix first.

### Major (fix in 30-90 days)

Issues that **degrade** but don't block:

- Heading order violations (skipped levels — confuses screen reader navigation but doesn't block)
- Low colour contrast (text under 4.5:1 ratio — harder to read for low-vision users)
- Duplicate DOM IDs (causes some assistive tech to fail unexpectedly)
- Tables without headers (screen readers can't navigate)

### Minor (ongoing — fix in normal content workflow)

Cosmetic / edge-case issues:

- Empty headings (visual noise, no accessibility blocker)
- Same-text links to different destinations (a "Read more" with 3 different targets — annoying but not blocking)
- Language attribute missing on the `<html>` element (one fix in theme)
- EXIF / autoplay artifacts in legacy content

Triage tells you what to do this month vs this quarter vs ongoing.

---

## Step 5 — Fix the top 10 worst-offender pages

**Asteris → Accessibility → Audit → Worst offenders**

Click each post in the top 10. In the editor, the Asteris Accessibility metabox shows:

- WCAG criterion violated
- DOM line number where the issue is
- Plain-English explanation
- Recommended fix

For each issue:

1. Fix it in the editor (add alt text, add label, fix heading order, etc.)
2. Save the post (auto-rescans)
3. Verify the issue is gone in the metabox

**Most sites resolve 60-80% of total issues by fixing the top 10 offenders.** This is the highest-leverage step — focus here before chasing the long-tail.

---

## Step 6 — Generate the EAA accessibility statement

You can publish the statement BEFORE you finish remediation. Honesty about known non-conformances is materially better than false compliance.

**Asteris → Accessibility → Statement → Generator**

Fill the required fields:

- **Organisation name** — defaults to your site title
- **Contact email** — defaults to admin; consider a dedicated `accessibility@yourdomain.com` mailbox
- **Conformance level target** — WCAG 2.1 AA (default; standard)
- **Date of last full audit** — auto-populated from your latest audit
- **Feedback mechanism** — Contact form URL + email + alternative (phone, post)
- **Enforcement procedure** — for EU sites, reference your national accessibility regulator (e.g., for AU: Australian Human Rights Commission; for UK: Equality and Human Rights Commission; for Germany: Schlichtungsstelle nach dem Behindertengleichstellungsgesetz)
- **Known non-conformances** — auto-populated from your audit findings

Click **Generate Statement**.

Asteris creates a page at `/accessibility-statement` containing:

- A standard EAA-compliant template populated with your data
- "Last updated" date reflecting the most recent audit
- Feedback mechanism (so users can report issues to you)
- Reference to the enforcement procedure
- Known non-conformances listed honestly

**Link to this page from your footer.** This is the EAA's "publish the statement" requirement.

---

## Step 7 — Schedule monthly rescans

**Asteris → Accessibility → Audit → Schedule**

- **Frequency** — Monthly (Daily for high-content-velocity sites)
- **Time** — first day of the month, 03:00 site-local
- ✓ **Email digest** — send results to the admin (or accessibility-team mailbox) after each run
- ✓ **Alert on new Critical issues** — immediate email if new Critical issues appear (catches regressions when authors publish without remediation)

Save. The audit runs automatically and surfaces regressions before they accumulate.

---

## Step 8 — Set up CI integration (optional, for dev teams)

If you have a CI pipeline (GitHub Actions, GitLab CI, etc.) that deploys WordPress changes, gate deployments on the accessibility scanner.

Asteris exposes a REST endpoint:

```bash
curl https://yoursite.com/wp-json/asteris/v1/accessibility/scan?url=https://staging.yoursite.com/<page>
```

Response:

```json
{
  "summary": {
    "critical": 0,
    "major": 3,
    "minor": 5,
    "total": 8
  },
  "issues": [...]
}
```

Example GitHub Actions step:

```yaml
- name: Accessibility scan critical pages
  run: |
    for url in $(cat critical-pages.txt); do
      response=$(curl -s "${{ env.STAGING_URL }}/wp-json/asteris/v1/accessibility/scan?url=$url" \
                      -H "X-API-Key: ${{ secrets.ASTERIS_API_KEY }}")
      critical=$(echo "$response" | jq '.summary.critical')
      if [ "$critical" -gt "0" ]; then
        echo "::error file=critical-pages.txt::Page $url has $critical critical issues"
        exit 1
      fi
    done
```

Builds that introduce Critical issues fail. Catches regressions before they reach production.

---

## Step 9 — Add manual review to your editorial workflow

The scanner catches ~30-40% of issues. Manual review catches the rest. Add to your editorial checklist:

### Per-post manual checks before publish

1. **Tab through the post** — does focus order make sense? (Asteris's metabox has a "Focus order" visualisation toggle)
2. **Screen reader test** — install NVDA (free, Windows) or use VoiceOver (built-in, Mac). Navigate the post. Does it make sense audibly?
3. **Verify alt text *meaningfulness*** — Asteris flags missing alt; you verify present alt describes the image meaningfully
4. **Check captions on videos** — Asteris detects autoplay but can't verify caption accuracy

### Per-page manual checks before launch

1. **Keyboard-only operation** — disable your mouse. Can you operate every interactive element? (forms, menus, modals, accordions, carousels)
2. **Colour as the sole indicator** — error states marked only by red? Add icons / labels. Status indicators only by colour? Add text.
3. **Time limits** — forms that timeout? Login sessions that boot users? Add warnings + extension options.

Document the manual review in your audit log (per Step 7's monthly rescan flow).

---

## Step 10 — Track remediation over time

Each monthly rescan produces an issue-count number. Track over time:

| Month | Total issues | Critical | Major | Minor |
|---|---|---|---|---|
| Month 0 (baseline) | 1,200 | 80 | 400 | 720 |
| Month 1 | 850 | 35 | 280 | 535 |
| Month 2 | 520 | 15 | 180 | 325 |
| Month 3 | 280 | 5 | 95 | 180 |
| Month 6 | 150 | 0 | 30 | 120 |

**A clear downward trend with Critical → 0 is what regulators (and lawyers) look for** if your compliance is ever questioned. Document the trend — it's evidence of good-faith remediation effort.

Asteris's audit history (Asteris → Accessibility → Audit → History) tracks this automatically. Export to PDF for legal documentation.

---

## What this isn't

This tutorial gets you to **WCAG 2.1 AA scanning + an EAA statement + scheduled rescans + manual review workflow**. It doesn't:

- Make your site automatically WCAG compliant — fixes still require human work
- Replace expert legal advice — for high-risk sites (e.g., government, healthcare, financial services), retain specialised accessibility legal counsel
- Cover the full EU EAA compliance regime — there are jurisdiction-specific requirements (national accessibility regulators, complaint procedures, alternative format obligations) beyond WCAG 2.1 AA
- Cover ADA / Section 508 in depth — US compliance has its own contours; the WCAG 2.1 AA target is a common baseline but not the full requirement

If you're operating a government or public-sector site, retain an accessibility consultancy. The automated scan + manual review is a baseline; expert audit goes deeper.

---

## Common issues

### "The scanner found 2,000 issues. Where do I start?"

Filter to **Severity: Critical** and look at the count there. Usually it's much smaller (e.g., 50-100 critical issues even when total is 2,000). Fix Critical first. Major is 30-90 days. Minor is ongoing.

### "An accessibility overlay would be much faster — why doesn't Asteris ship one?"

Overlays (accessiBe, UserWay) are controversial. Multiple lawsuits have ruled that overlay-deployed sites are still inaccessible, and they can interfere with users' own assistive technology. The disability community is broadly against them.

Asteris deliberately doesn't ship an overlay. Fix issues at the source. This is the only path the legal community treats as durable.

If your contract requires an overlay (some agencies require this), install one separately — it doesn't conflict with Asteris. But for actual compliance, fix the source HTML.

### "Will the EAA actually be enforced?"

The EAA's enforcement model is complaint-driven + regulator-initiated. Most countries' national accessibility regulators are under-resourced; enforcement is sporadic. But:

- **Lawsuits are common in the US** — the EAA's UK + EU equivalent is increasingly tested
- **Procurement requirements** — many government and corporate buyers require accessibility statements before purchase
- **Reputation** — being publicly called out for inaccessibility damages trust

Even where enforcement is patchy, accessibility audits are good practice. Most sites that have done the work find the effort meaningful — not just compliance theatre.

### "We have an existing accessibility statement from a consultancy. Should I replace it?"

If you have a recent statement (audited within the last 6-12 months by a qualified consultancy), don't replace it — extend it. Asteris's statement generator is the ongoing-monthly tool; the consultancy audit is the periodic deep verification.

For most sites, the Asteris-generated statement is sufficient. For high-stakes sites, do both.

### "What if a remediation fix breaks something?"

Each fix should be small + tested. Common breakages:

- **Heading order fix** — changing an `<h3>` to `<h2>` may unintentionally change visual styling. Verify the page looks right after the fix.
- **Alt text on decorative images** — empty `alt=""` is correct for decorative images; `alt="decorative image"` is wrong (screen readers will read it). Verify alt text serves the user.
- **Form labels** — adding a `<label>` may shift layout. Verify the page renders correctly.

Always re-test after each fix. If a fix breaks rendering, revert + try a different approach.

---

## See also

- [Accessibility scanner module configuration](/asteris-utility-suite/docs/modules/accessibility/)
- [WordPress accessibility audit guide](/asteris-utility-suite/guides/wordpress-accessibility-audit/) — manual review reference
- [W3C WCAG 2.1 Guidelines](https://www.w3.org/WAI/WCAG21/quickref/) — official WCAG criteria
- [European Accessibility Act (EAA) full text](https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX%3A32019L0882) — EU directive 2019/882
