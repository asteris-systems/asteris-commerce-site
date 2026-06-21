---
url: /asteris-utility-suite/migrate/from-wp-mail-smtp
title: "Migrate From WP Mail SMTP to Asteris (Without Losing Email Delivery)"
description: "Step-by-step: how to switch from WP Mail SMTP to Asteris Utility Suite without losing email delivery, Gmail OAuth, or your historical email logs. 10-minute walkthrough."
og_title: "Migrate From WP Mail SMTP to Asteris — Step-by-Step"
og_description: "Switch SMTP plugin without losing email delivery. Test before deactivating. Keep historical logs."
canonical: https://asteriscommerce.com/asteris-utility-suite/migrate/from-wp-mail-smtp
primary_keyword: migrate from wp mail smtp
secondary_keywords:
  - how to switch from wp mail smtp
  - import wp mail smtp settings
  - wp mail smtp to asteris
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: smtp
internal_links_out:
  - /asteris-utility-suite/vs/wp-mail-smtp
  - /asteris-utility-suite/modules/smtp
verified_date: 2026-06-04
---

# How to Migrate From WP Mail SMTP to Asteris

**How do I switch from WP Mail SMTP to Asteris without losing email delivery?** Install Asteris alongside WP Mail SMTP (they don't conflict), configure the same provider in Asteris's SMTP module, send a test email through Asteris, confirm it arrives, then deactivate WP Mail SMTP. Total time: ~10 minutes. Your Gmail / Microsoft 365 OAuth connection re-establishes during configuration — there's no automated import, but the steps are short.

**Will my Gmail / Microsoft 365 OAuth connection carry over?** No, you'll re-authorise once. OAuth tokens are bound to the originating plugin's app credentials — Asteris uses its own. Re-authorisation takes ~60 seconds per provider.

**Do I lose my email logs when I switch?** No — historical WP Mail SMTP logs stay in WP Mail SMTP's database tables. They're accessible from WP Mail SMTP's UI even after you stop using it for new sends. **Export logs to CSV before deactivating** if you want a permanent record outside the plugin.

---

## Before you start

You need:

- A running WordPress site with WP Mail SMTP installed and working
- The provider credentials you originally configured WP Mail SMTP with (Gmail account, SendGrid API key, etc.)
- ~10 minutes
- An email address you can monitor for the test send

**Do NOT deactivate WP Mail SMTP before you've confirmed Asteris is delivering.** The whole point of running them alongside is to keep a known-working fallback while testing.

---

## Step-by-step

### 1. Install Asteris Utility Suite

If you don't already have Asteris:

- **Free version:** WP Admin → Plugins → Add New → search "Asteris Utility Suite" → Install → Activate
- **Paid version:** Download from your customer portal → WP Admin → Plugins → Add New → Upload Plugin → Activate → enter licence key in **Asteris → License**

Asteris and WP Mail SMTP can both be active simultaneously without conflict.

### 2. Activate the Asteris SMTP module

In WP Admin → **Asteris → Modules**, toggle **SMTP + Email Logs** to ON. The SMTP submenu appears under Asteris.

### 3. Export your WP Mail SMTP logs (optional)

If you want a record of historical email logs, in WP Admin → **WP Mail SMTP → Email Log**, click **Export to CSV**. Save the file somewhere safe. Historical logs stay accessible inside WP Mail SMTP even after deactivating, but the CSV is the format-independent backup.

### 4. Configure Asteris SMTP with the same provider

In **Asteris → SMTP → Settings**, select the provider you use with WP Mail SMTP. Asteris supports the same six presets:

- Gmail (OAuth)
- Microsoft 365 (OAuth)
- SendGrid
- Mailgun
- Amazon SES
- Generic SMTP (any host/port/auth combination)

Re-enter the credentials. For OAuth providers (Gmail, M365), click **Authorise** — the OAuth dance happens in a new tab; takes ~60 seconds. For API providers, paste your existing API key. For generic SMTP, the same host/port/username/password you have in WP Mail SMTP works.

Credentials are encrypted at rest with AES-256-CBC.

### 5. Send a test email through Asteris

In **Asteris → SMTP → Test**, enter the email address you want to receive at, click **Send Test**. Wait ~30 seconds.

**Check the inbox.** If the test arrives, Asteris is delivering. If it doesn't, check the **Asteris → SMTP → Logs** tab — the failed send will have a detailed error.

Do not proceed to step 6 until step 5 has succeeded. If you get stuck, [support@asteriscommerce.com](mailto:support@asteriscommerce.com).

### 6. Disable WP Mail SMTP's send (but keep it installed)

In WP Mail SMTP → **Settings**, find the **Mailer** dropdown and set it to **Default (PHP)**. This stops WP Mail SMTP from intercepting `wp_mail()` calls without uninstalling the plugin.

**Why not deactivate yet?** Because both plugins hook `wp_mail()` — if you simply deactivate WP Mail SMTP first, there's a brief window where the site falls back to PHP mail. Setting WP Mail SMTP's mailer to Default first means Asteris becomes the sole `wp_mail()` handler before any plugin gets deactivated.

### 7. Verify Asteris is the sole sender

Send another test email through Asteris. Confirm it arrives. Check **Asteris → SMTP → Logs** to verify the log entry. Send any other test that touches `wp_mail()` from your site (e.g. trigger a password reset on a test account, submit a form, etc.) — each should land in Asteris's log.

### 8. Deactivate WP Mail SMTP

In WP Admin → **Plugins**, deactivate WP Mail SMTP. **Don't delete it yet** — keep it installed but inactive for 30 days as insurance. After 30 days of clean delivery via Asteris, delete it.

---

## Frequently asked questions

**Will my Gmail or Microsoft 365 OAuth connection carry over from WP Mail SMTP?**
No — you'll re-authorise once during Asteris setup (60 seconds). OAuth tokens are bound to the plugin's app credentials; each plugin uses its own.

**Do I lose my email logs when I switch?**
No. Historical WP Mail SMTP logs stay in the WP Mail SMTP plugin's database tables and remain accessible from its UI. Export to CSV before deactivating if you want a portable backup. Asteris starts logging fresh from the moment you activate it.

**Can I run both plugins simultaneously?**
For *configuration and testing*, yes — that's the whole approach. For long-term *production sending*, no — one should handle `wp_mail()`. The cleanest way to switch is to set WP Mail SMTP's mailer to "Default (PHP)" before deactivating, so Asteris becomes the sole handler without a fallback gap.

**What if Asteris fails to send and I've already deactivated WP Mail SMTP?**
Reactivate WP Mail SMTP. WordPress's `wp_mail()` will route through whichever plugin handles it first; if WP Mail SMTP's mailer is still configured, sending resumes. This is why we recommend keeping WP Mail SMTP installed-but-deactivated for 30 days.

**Is there a one-click import for WP Mail SMTP settings?**
Not in v1.0. WP Mail SMTP's settings are encrypted with credentials we can't decrypt without your input. Manual re-entry takes ~60 seconds per provider — acceptable tradeoff for not handling third-party credential decryption.

---

[See the SMTP module →](/asteris-utility-suite/modules/smtp/) · [WP Mail SMTP comparison →](/asteris-utility-suite/vs/wp-mail-smtp/) · [Pricing →](/asteris-utility-suite/pricing/)
