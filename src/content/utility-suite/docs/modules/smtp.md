---
title: "Configure SMTP + Email Logs"
description: "Step-by-step setup of the Asteris SMTP + Email Logs module: 6 provider presets (Gmail OAuth, Microsoft 365, SendGrid, Mailgun, Amazon SES, generic SMTP), full email logs with resend, encrypted credentials. Quickstart in 10 minutes."
sidebar:
  order: 5
---

# Configure the SMTP + Email Logs module

For the marketing overview of this module, see [/modules/smtp](/asteris-utility-suite/modules/smtp/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

WordPress's default `wp_mail()` uses PHP's `mail()` function, which is unreliable on most hosting. Password resets, form notifications, comment notifications, order confirmations — all rely on `wp_mail()` and all silently fail on shared hosting. An SMTP plugin replaces that with an authenticated connection to a real mail service.

This module ships with 6 provider presets. Three are in the **free** tier (Generic SMTP, Gmail OAuth, Microsoft 365 OAuth) — plus basic email logs. The other three (SendGrid, Mailgun, Amazon SES native APIs) and full email logs with body capture + resend + bulk + CSV are in the **paid** tier.

The Quickstart below uses **generic SMTP** for the broadest compatibility; switch to OAuth providers (Gmail, Microsoft 365) once the baseline is working — both are free.

---

## Quickstart (10 minutes — generic SMTP)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **SMTP + Email Logs** to ON.

### 2. Pick a provider

**Asteris → SMTP → Provider**

For this Quickstart, choose **Generic SMTP** — works with any provider (your hosting provider's SMTP, a transactional service like Postmark / Mailtrap / SMTP2GO, or an existing Gmail-app-password setup).

For the OAuth providers (Gmail, Microsoft 365), see the workflows below — they're more secure but the initial setup is more involved.

### 3. Fill the SMTP credentials

For a typical transactional service:

- **Host** — your provider's SMTP server (e.g., `smtp.sendgrid.net`, `mail.privateemail.com`, `email-smtp.us-east-1.amazonaws.com`)
- **Port** — `587` (TLS) is the modern default; `465` (SSL) if your provider requires it; `25` is plaintext and should NOT be used
- **Encryption** — `TLS` (matches port 587)
- **Username** — usually your full email address, sometimes a separate username (check your provider's SMTP docs)
- **Password** — provider-specific API key or app password (NOT your account password — use a generated app-specific credential)
- **From email** — should be on your domain (e.g., `noreply@yourdomain.com`); some providers require this to match an authenticated sender
- **From name** — your site name

Click **Save**. Asteris encrypts the password with AES-256-CBC before storing.

> ⚠️ **Never use your real Gmail / Outlook / etc. account password.** Major providers require app-specific passwords or OAuth. App passwords are generated in your account's security settings.

### 4. Send a test email

**Asteris → SMTP → Test Send**

- **To** — your own email address (use one not on the same domain as the From email — e.g., if From is `noreply@example.com`, test to your `gmail.com` so you can see it in an unrelated inbox)
- **Subject** — `Asteris SMTP test`
- **Body** — anything, default is fine

Click **Send**. Within 30 seconds you should see:

- ✓ "Send successful" notice in the admin
- ✓ The test email in your test inbox
- ✓ A row in **Asteris → SMTP → Logs** with `Status: sent`

If the send fails, jump to the troubleshooting workflow below.

### 5. Run a DNS check

**Asteris → SMTP → Deliverability → DNS Check**

Asteris checks three records for your sending domain:

- **SPF** (Sender Policy Framework) — declares which servers can send mail for your domain
- **DKIM** (DomainKeys Identified Mail) — cryptographic signature that lets receivers verify the message wasn't tampered
- **DMARC** (Domain-based Message Authentication, Reporting and Conformance) — tells receivers what to do when SPF/DKIM fail

For each, the panel shows:

- ✅ — record present and aligned
- ⚠️ — record present but misaligned (provider says "soft fail" — emails may go to spam)
- ❌ — record missing (emails will be marked as spam by reputable receivers)

If you see ❌, you need to add DNS records via your DNS provider (Cloudflare / GoDaddy / Route53 / etc.). The exact records depend on your SMTP provider — Asteris shows the expected values per provider, and most providers publish setup docs.

### 6. Enable email logs (paid tier)

**Asteris → SMTP → Logs → Settings**

- ✓ **Enable email logging** (captures every send)
- ✓ **Log body content** (HTML + plain text — useful for debugging template issues)
- ✓ **Log attachments** (filename + size only; binary not stored)
- **Retention** — default 30 days. Set to 90 days if you want longer audit history; 7 days if you want minimal storage footprint.
- **Auto-purge cron** — runs daily at 03:00 site-local time; deletes log entries past retention

> 💡 Logs are searchable by recipient, subject, date, status. Search is fast even at 100k+ logs because Asteris indexes the recipient address column.

### 7. Send a test from another plugin

The real test isn't Asteris's own test send — it's a real `wp_mail()` from elsewhere in WordPress:

1. Go to **Users → Add New** → create a test user with a real email address you control
2. Check **Send User Notification** when creating
3. The new user receives the WP welcome email

If they get the email + you see it logged in **Asteris → SMTP → Logs**, the integration is working end-to-end. `wp_mail()` calls from anywhere in WordPress (forms, comments, plugins, WP core) now route through Asteris.

### 8. Set up deliverability alerts (optional)

**Asteris → SMTP → Deliverability → Alerts**

- ✓ **Alert on failed-send threshold** — Default: notify when >10 sends fail in a 1-hour window
- **Alert recipient** — admin email by default; override if you want alerts to a different inbox

Useful for catching:

- Provider outage (SendGrid down → alerts you immediately)
- DNS misconfiguration after a domain change
- Spam-block from a destination domain (e.g., your sends to gmail.com start bouncing)

That's the baseline. The OAuth providers (workflow below) give better security; the email logs give visibility into every send.

---

## Common workflows

### Configure Gmail OAuth (recommended)

For users on personal Gmail or Google Workspace, OAuth is the modern, secure path. App passwords are being deprecated by Google — use OAuth.

Full walkthrough at [/docs/tutorials/configure-gmail-oauth-smtp](/asteris-utility-suite/docs/tutorials/configure-gmail-oauth-smtp/). Short version:

1. **Asteris → SMTP → Provider** → select **Gmail** → click **Authorise**
2. Browser opens to Google's OAuth consent screen
3. Sign in with the Gmail account you want to send from
4. Grant the requested permissions (Gmail send + read-own-profile)
5. Browser returns to Asteris with a success message
6. Send a test from **Asteris → SMTP → Test Send**

> ⚠️ **Gmail rate limits:** personal Gmail accounts cap at ~500 emails/day. Google Workspace caps at ~2000/day. For higher volume, use a transactional service (SendGrid, Mailgun, SES).

### Configure Microsoft 365 OAuth

Same flow as Gmail, but for Microsoft accounts (Office 365 / Outlook.com / Hotmail / Live).

1. **Asteris → SMTP → Provider** → **Microsoft 365** → **Authorise**
2. Sign in with the Microsoft account
3. Grant `Mail.Send` permission
4. Return + test

### Configure SendGrid (API mode)

For higher-volume transactional email, SendGrid's native API beats SMTP:

1. SendGrid dashboard → **Settings → API Keys** → **Create API Key**
2. Scope: **Mail Send** only (principle of least privilege)
3. Copy the key (Sendgrid only shows it once)
4. **Asteris → SMTP → Provider → SendGrid**:
   - **API Key** — paste
   - **From email** — must match a verified Sender Identity in SendGrid
   - **From name**
5. Save + test

SendGrid's API is faster than SMTP relay (single request vs SMTP handshake), supports webhooks (Asteris can auto-suppress hard-bouncing addresses), and gives better tracking.

### Configure Mailgun (API mode)

1. Mailgun dashboard → **Sending → Domains** → confirm your sending domain is verified
2. **Settings → API Keys** → copy the **Private API Key**
3. **Asteris → SMTP → Provider → Mailgun**:
   - **API Key**
   - **Region** — `US` or `EU` (match your Mailgun account region)
   - **Domain** — your verified sending domain
   - **From email** (on your verified domain)
4. Save + test

### Configure Amazon SES

SES is the cheapest option at scale — $0.10 per 1000 emails — but has the most setup friction (verification, sandbox lift, IAM credentials).

1. AWS Console → **SES → Verified identities** → verify your sending domain (DNS records — TXT + CNAME)
2. **Request production access** if you're still in the SES sandbox (sandbox allows sending only to verified addresses; production access is unrestricted)
3. **IAM → Users → Create user** with policy `AmazonSESFullAccess` (or scoped tighter for production)
4. Generate **Access Key + Secret** for that user
5. **Asteris → SMTP → Provider → Amazon SES**:
   - **Access Key ID**
   - **Secret Access Key**
   - **Region** — match your SES region (e.g., `us-east-1`, `eu-west-1`, `ap-southeast-2`)
   - **From email** — on a verified domain
6. Save + test

### Resend a failed email

When you see a row in **Asteris → SMTP → Logs** with `Status: failed`:

1. Click the row to expand the detail
2. **Error message** shows the SMTP / API response (e.g., `554 5.7.1 Relaying denied` or `550 5.4.1 Recipient address rejected`)
3. Fix the underlying issue (DNS, provider config, recipient address)
4. Click **Resend** at the bottom of the entry

Asteris re-attempts the send with the current configuration. A new log row appears with the resend status.

### Bulk-resend many emails

After a provider outage or DNS fix:

1. **Asteris → SMTP → Logs**
2. Filter by `Status: failed` and the relevant date range
3. Select rows (or **Select all matching**)
4. **Bulk actions → Resend selected** → Apply

Each selected email is resent in sequence. Progress shown in a status bar. Failed resends update their log row with the new error.

### Search the email logs

Common search patterns:

- **By recipient** — `to:user@example.com` — every email sent to that address
- **By subject** — `subject:"password reset"` — find a specific notification template
- **By date** — `before:2026-06-01` / `after:2026-05-01` (combinable)
- **By status** — `status:failed` / `status:bounced`
- **By plugin** — `from-plugin:woocommerce` (when WC is also installed)

Search box at **Asteris → SMTP → Logs**. Free-form text searches the body too if "Search body" is toggled.

### Export logs for compliance / audit

**Asteris → SMTP → Logs → Export**

- **Date range** — required
- **Format** — CSV (with or without body content); JSON (structured for programmatic processing)
- **Recipient field redaction** — option to hash recipient addresses with SHA-256 (compliance use case where you need volume metrics but not PII)

### Set up bounce/complaint webhook (SendGrid / Mailgun / SES)

Hard-bounce auto-suppression — Asteris stops trying to send to addresses that repeatedly bounce:

**SendGrid:**

1. SendGrid → **Settings → Mail Settings → Event Webhook** → enable
2. **HTTP Post URL** — copy from Asteris → SMTP → Webhooks (it's `/wp-json/asteris/v1/smtp/webhook/sendgrid`)
3. **Events to receive** — check `Bounce`, `Spam Report`, `Drop`, `Unsubscribe`
4. Save

**Mailgun:**

1. Mailgun → **Sending → Webhooks** → for your domain → **Add webhook**
2. **URL** — `/wp-json/asteris/v1/smtp/webhook/mailgun`
3. **Events** — `permanent_fail`, `complained`, `unsubscribed`

**Amazon SES:**

1. AWS SES → **Configuration Sets → create one** → name `asteris-suppressions`
2. **Event destinations → Add SNS topic** → subscribe Asteris's webhook to the topic
3. Set the configuration set as the default for the IAM user Asteris uses

After setup, addresses that hard-bounce or complain are added to Asteris's suppression list automatically. Future sends to those addresses are skipped + logged.

---

## Settings reference

### Provider

- **6 presets** — Gmail OAuth, Microsoft 365 OAuth, SendGrid (API), Mailgun (API), Amazon SES (API), Generic SMTP
- **Credentials** — encrypted at rest (AES-256-CBC)
- **OAuth tokens** — auto-refresh before expiry; no manual re-authorisation
- **From email + From name** — sitewide default; per-plugin override available via filter
- **Reply-to** — sitewide default

### Email logs (paid tier)

- **Enable logging** — toggle
- **Log body content** — HTML + plain text
- **Log attachments** — filename + size only (not binary)
- **Retention** — 7 / 30 / 60 / 90 / 180 days / forever
- **Auto-purge cron** — daily at site-local 03:00
- **Search** — by recipient, subject, date, status, plugin source

### Deliverability

- **DNS check** — SPF + DKIM + DMARC verification against expected provider values
- **Failed-send alert** — threshold + recipient
- **Bounce webhook** — auto-suppress hard-bounce addresses (SendGrid / Mailgun / SES)
- **Suppression list** — viewable + editable in admin

### Test send

- **To / Subject / Body** — manual test from admin
- **Send as plain-text** — test plain rendering
- **Send as HTML** — test HTML rendering

### Resend

- **Single resend** — from a log entry
- **Bulk resend** — from filtered log view
- **API resend** — via REST endpoint

---

## REST API

```
# Logs
GET    /wp-json/asteris/v1/smtp/logs
GET    /wp-json/asteris/v1/smtp/logs/<id>
POST   /wp-json/asteris/v1/smtp/logs/<id>/resend
POST   /wp-json/asteris/v1/smtp/logs/bulk-resend     # body: { ids: [...] }
DELETE /wp-json/asteris/v1/smtp/logs/<id>

# Test
POST   /wp-json/asteris/v1/smtp/test
       body: { to: "...", subject: "...", body: "..." }

# DNS check
GET    /wp-json/asteris/v1/smtp/dns-check?domain=<domain>

# Suppressions
GET    /wp-json/asteris/v1/smtp/suppressions
POST   /wp-json/asteris/v1/smtp/suppressions
DELETE /wp-json/asteris/v1/smtp/suppressions/<address>

# Bounce/complaint webhooks (public — provider POSTs to these)
POST   /wp-json/asteris/v1/smtp/webhook/sendgrid
POST   /wp-json/asteris/v1/smtp/webhook/mailgun
POST   /wp-json/asteris/v1/smtp/webhook/ses
```

Webhook endpoints validate provider signatures (HMAC for SendGrid, signature header for Mailgun, SNS confirmation for SES).

---

## WP-CLI

```bash
# Test send
wp asteris smtp test --to=<email> --subject="<subject>" --body="<body>"

# Logs
wp asteris smtp logs list --limit=10 --status=failed
wp asteris smtp logs info --id=<log_id>
wp asteris smtp logs resend --id=<log_id>
wp asteris smtp logs bulk-resend --status=failed --since="2 days ago"
wp asteris smtp retention purge

# DNS check
wp asteris smtp dns-check
wp asteris smtp dns-check --domain=<domain>

# Suppressions
wp asteris smtp suppressions list
wp asteris smtp suppressions add --email=<email> --reason=<reason>
wp asteris smtp suppressions remove --email=<email>

# Provider testing
wp asteris smtp provider test                # tests current provider
wp asteris smtp provider status              # shows config without revealing credentials
```

---

## See also

- [Tutorial: Configure Gmail OAuth SMTP](/asteris-utility-suite/docs/tutorials/configure-gmail-oauth-smtp/)
- [Asteris vs WP Mail SMTP comparison](/asteris-utility-suite/vs/wp-mail-smtp/)
- [Migrate from WP Mail SMTP](/asteris-utility-suite/migrate/from-wp-mail-smtp/)
- [Forms module](/asteris-utility-suite/docs/modules/forms/) — relies on SMTP for notification delivery
- [Activity Log + Site Health module](/asteris-utility-suite/docs/modules/activity-log/) — SMTP send events appear in the unified log
