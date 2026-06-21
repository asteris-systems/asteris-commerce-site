---
title: "Switch from a multi-plugin stack to Asteris in one weekend"
description: "End-to-end migration playbook from a typical 8-12 plugin WordPress stack (Yoast + Wordfence + UpdraftPlus + WP Mail SMTP + WP Rocket + MonsterInsights + Smush + WPForms + WP Activity Log + WPCode + accessibility) to Asteris Utility Suite. Friday → Sunday timeline with daily checkpoints."
sidebar:
  order: 7
---

# Switch from a multi-plugin stack to Asteris in one weekend

**Goal:** over a Friday-Sunday weekend, migrate your WordPress site from a typical 8-12 plugin stack (Yoast + Wordfence + UpdraftPlus + WP Mail SMTP + WP Rocket + MonsterInsights + Smush + WPForms + WP Activity Log + WPCode + accessibility) to a single Asteris installation. Total downtime: zero. Total active work: ~10-12 hours spread across 3 days.

**Asteris modules used:** All 13 (paid tier required — Starter / Pro / Agency)

**Why a weekend:**

- Friday evening: install + plan + first module (SEO — has the one-click importer)
- Saturday: bulk of the migration (Forms, SMTP, Analytics, Performance, Backups, Image Optimisation)
- Sunday: trickier modules (Security, Activity Log) + verification + final wind-down of old plugins

If you can't dedicate a weekend, you can spread this over 2-3 weeks (one module per evening). The weekend framing is the most-common "I want this done" timeline.

---

## Before you start

You need:

- **A paid Asteris Utility Suite licence** (all 13 modules + the importers are paid)
- **A current full backup** — run UpdraftPlus or your existing backup tool before starting. Migration risk is low (each step is reversible) but a full backup is your insurance.
- **A staging URL** (highly recommended) — test the cutover on staging before production, especially for cache/performance modules
- **A password manager** — you'll handle many credentials over the weekend (encryption keys, OAuth tokens, API keys)
- **Realistic expectations** — this isn't 10 minutes of clicks. It's 10-12 hours of work spread across 3 days.

---

## Friday evening (3-4 hours)

### Step 1 — Install Asteris + plan

1. Install Asteris Utility Suite (upload ZIP from customer portal → activate)
2. Activate licence (Asteris → Licence → paste key)
3. **Asteris → Modules** — note all 13 modules; verify each is available with your tier
4. **Asteris → Activity Log → Modules** — toggle Activity Log + Site Health ON now. Every change you make this weekend will be captured, giving you the timeline of what you did.

### Step 2 — Take inventory of your current stack

Open WP Admin → Plugins. List every active plugin + its role. Match each to an Asteris module:

| Current plugin | Asteris module replacement |
|---|---|
| Yoast SEO / RankMath / AIOSEO | SEO + AI Suite |
| Wordfence / Sucuri / iThemes Security | Security + Login + 2FA |
| WPForms / Fluent Forms / Gravity Forms | Forms |
| WP Mail SMTP / Fluent SMTP | SMTP + Email Logs |
| WP Rocket / LiteSpeed Cache / Perfmatters | Performance |
| Smush / Imagify / ShortPixel | Image Optimisation |
| UpdraftPlus / BackupBuddy / BlogVault | Backups + Migration |
| MonsterInsights / Site Kit / PixelYourSite | Analytics + Pixels |
| WP Activity Log / Simple History | Activity Log + Site Health |
| WP Accessibility / accessiBe | Accessibility scanner |

Plugins NOT replaced by Asteris (these stay):

- WooCommerce (your store layer — Asteris coexists, doesn't replace)
- Page builders (Elementor / Bricks / Beaver Builder / Divi — Asteris integrates with all)
- LMS (LearnDash etc. — Asteris doesn't compete)
- Membership (MemberPress etc. — Asteris doesn't compete)
- Translation (WPML / Polylang — Asteris coexists)
- Niche-specific (your industry-specific plugins)

For each plugin you're replacing, write down its current settings — what's configured, what's customised. Asteris's modules need to match these.

### Step 3 — Migrate SEO (one-click importer)

This is the easiest first migration. Asteris has a one-click Yoast importer.

Follow the full walkthrough: [/docs/tutorials/migrate-from-yoast-step-by-step](/asteris-utility-suite/docs/tutorials/migrate-from-yoast-step-by-step/)

Friday-evening abbreviated version:

1. **Asteris → Modules** → activate SEO + AI Suite
2. **Asteris → SEO + AI → Tools → Import → Yoast** → Run
3. Spot-check 5 URLs (Step 5 of the migration tutorial)
4. **Asteris → SEO + AI → General → "Take over from active SEO plugin"** → ON (parallel running for the next 30 days)

> 💡 **Don't deactivate Yoast yet.** The takeover toggle suppresses Yoast's output while keeping Yoast's data intact. After 30 days of verified clean operation, deactivate. This is the safer path.

### Step 4 — Friday checkpoint

End of Friday:

- ✓ Asteris installed + licensed
- ✓ Activity Log capturing
- ✓ SEO module imported from Yoast and active (Asteris emits; Yoast suppressed)
- ✓ Inventory of plugins to replace this weekend

Sleep on it. Don't rush the rest of the migration into Friday — Saturday is the bulk of the work.

---

## Saturday (5-6 hours)

### Step 5 — Set up SMTP (15 minutes)

Form notifications + password resets need this BEFORE you migrate Forms.

Follow: [/docs/tutorials/configure-gmail-oauth-smtp](/asteris-utility-suite/docs/tutorials/configure-gmail-oauth-smtp/) (or pick SendGrid / Mailgun / SES if higher volume).

1. **Asteris → Modules** → activate SMTP + Email Logs
2. Configure provider (Gmail OAuth is the easiest start; OR generic SMTP if you already have a transactional service)
3. Send a test email
4. ✓ Test arrived → SMTP is working

Deactivate WP Mail SMTP (or equivalent). 5-minute task.

### Step 6 — Migrate Forms (60-90 minutes — depends on form count)

If you have 1-3 forms, this is fast. 10+ forms, plan accordingly.

1. **Asteris → Modules** → activate Forms
2. For each existing form (WPForms / Fluent / Gravity):
   - Open in old plugin → screenshot the form structure (field types + labels + conditional logic)
   - **Asteris → Forms → Add New** → rebuild the form
   - Match the email notification template
   - Match the conditional logic
   - Save
3. Replace each form on its page:
   - If using shortcode: swap `[wpforms id="123"]` → `[asteris_form id="<new_id>"]`
   - If using block: replace WPForms block with Asteris Form block
   - If in builder: replace WPForms widget with Asteris Form widget
4. Test each form's submission flow end-to-end:
   - Visitor submits form
   - Email notification arrives (verifies SMTP from Step 5)
   - Submission appears in Asteris → Forms → Entries
5. After all forms verified, deactivate WPForms (or equivalent)

> ⚠️ **Don't delete entries from the old plugin.** Existing submissions stay in WPForms / Fluent's tables — useful for historical reference. Just deactivate the plugin; don't delete the tables.

For complex forms with many integrations (Mailchimp / Salesforce / Zapier), this step takes longer. Budget accordingly.

### Step 7 — Migrate Analytics + Pixels (45 minutes)

Follow: [/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2](/asteris-utility-suite/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2/)

Saturday-abbreviated version:

1. **Asteris → Modules** → activate Analytics + Pixels
2. **Asteris → Analytics + Pixels → Google → GA4** → paste the same Measurement ID from MonsterInsights
3. Verify GA4 Real-Time shows events from Asteris
4. **MonsterInsights → Settings → General → Tracking Code → Disabled** (suppresses MonsterInsights firing; keep plugin installed for reports access for 30 days)
5. Add Meta Pixel + CAPI (if you run Meta ads) — see tutorial
6. Add Consent Mode v2 if you serve EU users

After 24 hours of clean GA4 data with no duplicates, deactivate MonsterInsights.

### Step 8 — Set up Performance (45 minutes)

This is the trickiest migration because two caching plugins will conflict. You need to switch atomically.

1. **Note your WP Rocket settings** — screenshot Performance settings
2. **Deactivate WP Rocket** (or LiteSpeed Cache, NitroPack, etc.) — cache is auto-cleared
3. **Asteris → Modules** → activate Performance — safe-defaults profile turns on automatically
4. Map WP Rocket settings to Asteris:
   - Page cache → Asteris (auto)
   - Browser headers → Asteris (auto)
   - Defer JS → Asteris (auto with builder-aware exclusions)
   - CSS combine → Asteris (opt-in if you had it on)
   - JS delay → Asteris (opt-in)
   - Critical CSS → Asteris (opt-in)
5. Run [pagespeed.web.dev](https://pagespeed.web.dev/) on your homepage → note baseline scores
6. Wait 24 hours, monitor field-data CWV
7. Verify no regressions

> ⚠️ **Don't enable Asteris's CSS combine + JS delay on day 1.** These are opt-in for a reason — they break page builders. If WP Rocket had them on and your site worked, fine — enable on Asteris. If you've never had them on, leave them off.

### Step 9 — Set up Image Optimisation (30 minutes — runs in background for hours)

1. **Asteris → Modules** → activate Image Optimisation
2. **Asteris → Image Optimisation → Bulk Optimise** → Start
3. Asteris processes existing media library in the background; you can leave the panel
4. Deactivate Smush / ShortPixel / Imagify
5. Verify the bulk-optimise completes successfully (status: 100%)

For a 1000-image library, bulk-optimise takes 30-60 minutes. Run in parallel with the next steps.

### Step 10 — Set up Backups + Migration (45 minutes)

Follow: [/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2](/asteris-utility-suite/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2/)

Saturday-abbreviated version:

1. **Asteris → Modules** → activate Backups + Migration
2. Add a cloud destination (R2 recommended; or S3 / B2 / Wasabi / SFTP)
3. Generate encryption key — **save to password manager**
4. Configure daily schedule
5. Run the first backup manually
6. **Restore to staging** to verify the backup actually works (this is the most-important step)
7. Set up failure alerts

Keep UpdraftPlus installed-but-inactive for 30 days. Existing UpdraftPlus archives remain restorable.

### Step 11 — Saturday checkpoint

End of Saturday:

- ✓ SEO migrated (Friday)
- ✓ SMTP migrated
- ✓ Forms migrated
- ✓ Analytics + Pixels migrated
- ✓ Performance migrated
- ✓ Image Optimisation running
- ✓ Backups verified

That's 6 of 13 modules done. Hardest day. Sunday is the final stretch.

---

## Sunday (3-4 hours)

### Step 12 — Set up Security (30 minutes)

Follow [/docs/modules/security](/asteris-utility-suite/docs/modules/security/) Quickstart steps 1-5.

1. **Asteris → Modules** → activate Security + Login + 2FA
2. Set brute-force threshold + 2FA per-role enforcement
3. **Enrol your own account in 2FA** (passkey + TOTP backup) — most important step
4. Test logout/login flow in incognito
5. Optionally hide wp-login (Step 6 of Security quickstart)

**Don't deactivate Wordfence yet.** This is the most-paranoid migration — run both side-by-side until you're confident.

In Asteris → Security → Brute Force → **Disable for site (Wordfence is doing this)**. Don't run two brute-force protections.

In Wordfence → Login Security → **Disable 2FA enforcement**. Use Asteris's 2FA (passkey support) instead.

Run side-by-side for 30 days, monitoring Wordfence's malware scanner + Asteris's other security features. Decide at 30 days whether to fully replace Wordfence or keep it for the WAF + signature scanner.

### Step 13 — Set up Activity Log + Site Health (15 minutes)

Already activated Friday (Step 1). Now configure:

1. **Asteris → Activity Log → Settings → Capture** — review categories; trim noisy ones if needed (e.g., disable comment capture on high-comment sites)
2. **Asteris → Activity Log → Settings → Retention** — set to 90 days (most sites) or forever (compliance-bound)
3. **Asteris → Activity Log → Notifications** — set up Slack or email digest if you actively monitor
4. Deactivate WP Activity Log Premium / Simple History

Asteris's per-event Undo is the differentiator here — every change you've made this weekend has an Undo button. Useful safety net.

### Step 14 — Run Accessibility scan (1 hour active + ongoing remediation)

Follow [/docs/tutorials/run-accessibility-audit-before-eaa-deadline](/asteris-utility-suite/docs/tutorials/run-accessibility-audit-before-eaa-deadline/)

Sunday-abbreviated version:

1. **Asteris → Modules** → activate Accessibility
2. **Asteris → Accessibility → Audit → Run Full Audit** — takes 10-15 minutes for a 200-post site
3. Review the worst-offenders list
4. Generate the EAA accessibility statement
5. Schedule monthly rescans
6. Plan ongoing remediation (won't be done this weekend; that's expected)

Deactivate WP Accessibility / accessiBe / UserWay (if you had one).

### Step 16 — Final verification

For each module, verify it's working:

| Module | Verification |
|---|---|
| SEO + AI | View source on 3 important pages → Asteris's tags emit, Yoast suppressed |
| Security | Log out + log back in → 2FA challenge fires |
| Performance | PageSpeed Insights → score is equivalent or better than before |
| Forms | Submit a form → email arrives + entry in Asteris → Forms |
| SMTP | Reset a test user's password → reset email arrives |
| Activity Log | Check Asteris → Activity Log → recent events from this weekend are captured |
| Analytics | GA4 Real-Time shows events from Asteris (no MonsterInsights duplicates) |
| Image Optimisation | Open a page → images load as WebP/AVIF (not the original JPEG/PNG) |
| Backups | Asteris → Backups → History → recent backup successful + on cloud destination |
| Accessibility | Audit dashboard shows results; EAA statement page exists |

If anything fails verification, fix BEFORE you deactivate the old plugin. Each module has reversibility — re-activate the old plugin if Asteris isn't quite right.

### Step 17 — Wind down old plugins (per the 30-day waiting period)

Most plugins should be **deactivated** (not deleted) at this point. Keep them installed for 30 days as insurance.

Exception: WordPress's plugin updates apply to all installed plugins (active + inactive). If you don't want updates on plugins you're winding down, mark them as "Disable Updates" via your security plugin's plugin-update controller, or simply ignore the update prompts.

After 30 days of clean Asteris operation:

- **Plugins → Delete** all the replaced plugins
- Asteris is your sole stack

---

## What's NOT covered by this migration

Some things stay on the old plugins / aren't in Asteris:

- **WP Rocket database optimisation** — not in Asteris Performance; use WP-Optimize separately
- **Form payment gateways** (Stripe / PayPal directly in WPForms / Gravity) — not in Asteris Forms v1.0; on the v1.x roadmap
- **GA4 reports inside WP Admin** (MonsterInsights's defining feature) — Asteris doesn't replicate; point to Google Analytics directly
- **Specific niche features** — if your WPForms / Wordfence / etc. has a niche feature your business depends on, verify it's in Asteris before committing

For each non-covered feature, decide: live without it, keep the niche plugin alongside Asteris, or skip the migration entirely for that module.

---

## Post-migration — what to monitor for 30 days

### Week 1

- **SEO rankings** in Search Console — should be flat (small fluctuations ±2 positions normal)
- **Email delivery** — watch for password reset / form notification complaints
- **Form submission rate** — compare to pre-migration baseline; should be equivalent

### Week 2

- **Backup integrity** — verify backups are running daily; restore one to staging to confirm
- **Security event log** — Asteris → Security → Failed Login Log → should show normal brute-force noise being blocked
- **Performance** — Core Web Vitals field data starts populating; verify equivalent or better than baseline

### Week 4

- **Accessibility audit progress** — if you started Step 15 on Sunday, by week 4 you should have remediated the top 10 worst offenders
- **Full plugin wind-down** — at day 30, delete the remaining inactive replaced plugins

After 30 clean days, the migration is complete. You're now on Asteris.

---

## See also

- [SEO migration tutorial](/asteris-utility-suite/docs/tutorials/migrate-from-yoast-step-by-step/)
- [Backups tutorial](/asteris-utility-suite/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2/)
- [Analytics tutorial](/asteris-utility-suite/docs/tutorials/configure-ga4-meta-capi-consent-mode-v2/)
- [Migration hub](/asteris-utility-suite/migrate/) — per-plugin migration walkthroughs
- [Why we built this](/asteris-utility-suite/founder/) — the team's framing of why consolidating to one plugin matters
