---
url: /asteris-utility-suite/modules/smtp
title: "WordPress SMTP Plugin — Asteris SMTP + Email Logs (6 Provider Presets, OAuth, Full Logs)"
description: "Asteris SMTP is a WordPress SMTP plugin with 6 provider presets (Gmail OAuth, Microsoft 365 OAuth, SendGrid, Mailgun, Amazon SES, generic SMTP), full email logs with body capture, resend, bulk export, encrypted credentials. Bundled with 10 other modules."
og_title: "Asteris SMTP — Reliable WordPress Email With Full Logs"
og_description: "6 provider presets. OAuth + API + generic SMTP. Full email logs with body capture. Encrypted credentials. Bundled."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/smtp
primary_keyword: wordpress smtp plugin
secondary_keywords:
  - email logs plugin wordpress
  - wordpress gmail oauth smtp
  - wordpress microsoft 365 smtp
  - wp mail smtp alternative
  - wordpress smtp encrypted credentials
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: smtp
internal_links_out:
  - /asteris-utility-suite/vs/wp-mail-smtp
  - /asteris-utility-suite/migrate/from-wp-mail-smtp
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress SMTP Plugin — Asteris SMTP + Email Logs

**Why does WordPress need an SMTP plugin?** WordPress's default `wp_mail()` function uses PHP's `mail()` function, which sends email via your web server's local mail transfer agent. On most hosting environments this is **unreliable** — emails get marked as spam, blocked by reputation filters, or simply not delivered. Password resets, form notifications, comment notifications, order confirmations, and every other site-generated email is at the mercy of the host's mail config.

**An SMTP plugin replaces `wp_mail()`** with an authenticated connection to a real mail service (Gmail, Microsoft 365, SendGrid, Mailgun, Amazon SES, or any generic SMTP server). The mail is sent through a trusted provider with proper SPF/DKIM/DMARC alignment, which dramatically improves deliverability.

**Does Asteris SMTP support Gmail and Microsoft 365 OAuth?** Yes — both with full OAuth 2.0 (not legacy "less-secure apps"). **In the free tier.** Plus SendGrid, Mailgun, Amazon SES via native APIs (paid tier), and generic SMTP for any provider with host/port/auth credentials (free tier).

**Does Asteris log emails?** Yes. **Basic email logs are in the free tier** — recipient, subject, date, status. The paid tier adds full body capture (HTML + plain text), one-click resend, bulk resend, CSV export, configurable retention, and bounce/complaint webhooks.

---

## The complete feature set

### 6 provider presets

**Free tier:**

- **Generic SMTP** — any host with host/port/username/password (e.g. SMTP2GO, Postmark, Mailtrap, your hosting provider's SMTP, etc.)
- **Gmail** — OAuth 2.0 (the modern, secure path; works with personal and Workspace accounts)
- **Microsoft 365** — OAuth 2.0 (modern auth for Microsoft 365 / Outlook / Hotmail Workspace)

**Paid tier:**

- **SendGrid** — native API integration (not SMTP relay — faster + better deliverability tracking)
- **Mailgun** — native API integration
- **Amazon SES** — native API integration (lowest cost at scale)

### Basic email logs (free tier)

- Recipient, subject, date, delivery status (sent / failed / bounced)
- Error messages on failed sends (full SMTP / API error response)
- **Search** by recipient, subject, date range, status
- 30-day retention by default

### Full email logs (paid tier)

- Full headers + full body (HTML + plain text) of every send
- Recipient list (To / Cc / Bcc, with redaction options for PII)
- Attachment list (filename + size; not the attachment binary, to keep DB small)
- Delivery status — sent / failed / bounced (where the provider returns it)
- Error messages on failed sends (full SMTP / API error response)
- **Search** by recipient, subject, date range, status
- **Resend** any logged email with one click
- **Bulk resend** — select multiple, resend all
- **CSV export**
- **Configurable retention** (default 30 days, extendable)

### Security

- **AES-256-CBC encryption at rest** for all SMTP credentials (passwords, OAuth tokens, API keys)
- **Field-level redaction** via `asteris_activity_log_redact_value` filter — sensitive fields never enter the Activity Log
- **OAuth tokens auto-refresh** before expiry; no manual re-authorisation

### Deliverability tools

- **Test send** — verify provider config without sending to a real user
- **DNS check** — verify SPF, DKIM, and DMARC alignment for your sending domain
- **Deliverability alerts** — email digest when failed-send threshold exceeded
- **Bounce + complaint webhook** (SendGrid / Mailgun / SES) — auto-suppress hard-bounce addresses

### Retention cron

- Auto-purge email logs older than the retention threshold
- Per-provider exclusions (e.g. keep transactional sends 90 days, marketing sends 30 days)
- Runs on standard WP-Cron or external cron trigger

---

## Free version

[Asteris Utility Suite Free](/asteris-utility-suite/free/) on WordPress.org includes a **lite SMTP** with **generic SMTP** support only — no OAuth, no native APIs, no full email logs. For OAuth + full logs, you need a paid Asteris tier ($149/yr Starter).

---

## Frequently asked questions

**Why does WordPress need an SMTP plugin?**
WordPress's default `wp_mail()` uses PHP's `mail()` function, which is unreliable on most hosting. Password resets, form notifications, and every site-generated email get spam-filtered or blocked. An SMTP plugin routes mail through an authenticated provider (Gmail, SendGrid, etc.) for reliable delivery.

**Does Asteris support Gmail OAuth for SMTP?**
Yes — full OAuth 2.0 for Gmail (personal and Google Workspace). Setup takes about 60 seconds via a popup OAuth dance; no app-password workaround required.

**Does Asteris support Microsoft 365 OAuth?**
Yes — modern auth (OAuth 2.0) for Microsoft 365 / Outlook / Office 365 / Hotmail Workspace accounts.

**Can I keep full email logs?**
Yes, in the paid tier — full headers + body (HTML + plain text), recipient list, delivery status, resend, bulk resend, CSV export. WP Mail SMTP gates equivalent logging to its Pro+ tiers.

**What is the best WordPress SMTP plugin?**
For free + reliable: **Fluent SMTP** (free, well-built). For paid + bundled: **Asteris SMTP** (in Asteris Starter at $149/yr, with 10 other modules). For paid + SMTP-only: **WP Mail SMTP Pro** ($49-$199/yr depending on tier).

**Are credentials secure?**
Yes — AES-256-CBC encryption at rest for all SMTP credentials, OAuth tokens, and API keys. Tokens auto-refresh; passwords never appear in logs.

---

[Asteris vs WP Mail SMTP →](/asteris-utility-suite/vs/wp-mail-smtp/) · [Migrate from WP Mail SMTP →](/asteris-utility-suite/migrate/from-wp-mail-smtp/) · [Pricing →](/asteris-utility-suite/pricing/)
