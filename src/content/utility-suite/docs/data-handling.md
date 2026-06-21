---
title: "Data handling (GDPR + privacy)"
description: "Per-module map of what personal data Asteris Utility Suite stores, where, and for how long — for agencies and operators handling GDPR-regulated WordPress sites."
---
# Data handling per module

This page is for agencies, in-house teams, and site operators who need to document Asteris Utility Suite's data flows for their GDPR Records of Processing Activities (Article 30), Australian Privacy Act compliance reviews, or any other data-mapping exercise.

For each module, the tables below list:

- What personal data the module stores in your WordPress database
- Which database table or option key it lives in
- The retention period (when stored data expires or can be deleted)
- Whether the WP core privacy exporter / eraser (Tools → Export / Erase Personal Data) reaches the data

This document is generated from the `gdpr_data_keys()` declaration each module makes in code, so it stays accurate as modules evolve.

---

## At-a-glance — modules that store personal data

| Module | Stores PII? | Categories |
|---|---|---|
| Security + Login + 2FA | **Yes** | Failed login records (IP + username), 2FA secrets per user, IP allow/block lists |
| SEO + AI Suite | No | Page-level meta + sitewide settings; no per-user data. AI API requests pass-through (BYOK; not stored) |
| Performance | No | Cache state and CWV monitor data are aggregate-only; no per-user identifiers |
| Forms | **Yes (significant)** | Every form submission contains exactly what the user typed; can include any field-type (name, email, phone, address, file uploads, signature) |
| SMTP + Email Logs | **Yes (paid tier)** | Full email logs capture sender, recipient, subject, body — recipients are real people |
| Activity Log + Site Health | **Yes** | User actions, user IDs, IP addresses, change diffs; the audit log is by-design PII-bearing |
| Analytics + Pixels | No (storage is at the provider) | Events stream directly to GA4 / Meta / TikTok / etc. — Google / Meta / TikTok store the data, not Asteris |
| Image Optimisation | No | Operates on uploaded files; no per-user data |
| Backups + Migration | **Yes (whole-site)** | Backup archives are full database + filesystem snapshots — by definition include every PII row in your site. Encrypted at rest (AES-256). |
| Accessibility scanner | No | Scan results reference URLs and HTML elements; no per-user data |

**Six modules either store identifiable personal data themselves (Security, Forms, SMTP logs, Activity Log) or operate on it in bulk (Backups).** Analytics + Pixels sends events to third parties but doesn't itself store them.

---

## Per-module data inventory

### Security + Login + 2FA

| What | Where | Retention |
|---|---|---|
| Failed login attempts (IP + username + timestamp) | `wp_asteris_security_attempts` custom table | 90 days (configurable) |
| IP allow / block / geofence rules | `wp_options` key `asteris_security_ip_rules` | Until removed manually |
| Per-user 2FA secrets (TOTP + WebAuthn public keys) | `wp_usermeta` keys `_asteris_2fa_*` | Until user removes 2FA |
| 2FA backup codes (hashed) | `wp_usermeta` key `_asteris_2fa_backup_codes` | Until used or regenerated |
| File-change monitor baseline checksums | `wp_asteris_file_baseline` custom table | Rolling — replaced on each scheduled scan |

**WP exporter / eraser:** failed-login attempts and 2FA secrets are deleted by WP core's user-erasure flow when the WP user is erased. IP rules are sitewide config (no per-user attribution).

### Forms

| What | Where | Retention |
|---|---|---|
| Form submissions (all field values) | `wp_asteris_forms_entries` custom table | Per-form retention setting (default 90 days; configurable to forever) |
| Per-field PII redaction flags | `wp_postmeta` keyed to the form post | Same as form |
| GDPR consent capture (timestamp + consent text snapshot) | `wp_asteris_forms_consents` custom table | 7 years (configurable; default matches AU tax-records retention) |
| File uploads from form submissions | `wp-content/uploads/asteris-forms/` | Same retention as the entry |

**WP exporter / eraser:** Asteris Forms registers exporters and erasers with WP core. Tools → Export Personal Data and Tools → Erase Personal Data both reach form submission data matching the requested email.

**PII redaction:** fields marked as PII never enter the Activity Log (redacted at capture time via the `asteris_activity_log_redact_value` filter).

### SMTP + Email Logs *(paid tier)*

| What | Where | Retention |
|---|---|---|
| Full email log (headers + body, HTML + plain text) | `wp_asteris_email_logs` custom table | Default 30 days; configurable; retention cron purges expired logs |
| Recipient addresses (To / Cc / Bcc) | Same row | Same retention |
| Attachment metadata (filename + size; not binary) | Same row | Same retention |
| SMTP provider credentials (passwords / OAuth tokens / API keys) | `wp_options` key `asteris_smtp_provider`, encrypted | Until reconfigured |

**Encryption:** SMTP credentials are encrypted at rest with AES-256-CBC.

**WP exporter / eraser:** matched by recipient address. The log can be filtered by email; export returns all messages where the email appears as a recipient, eraser removes them.

### Activity Log + Site Health

| What | Where | Retention |
|---|---|---|
| Activity events (100+ types) — user ID, event type, timestamp, before/after snapshot, IP | `wp_asteris_activity_log` custom table | Default 90 days; configurable to forever |
| Asteris Undo state (per-event reversion data) | Same row | Same retention |
| Temp support user records (created / expiry / activity) | Same table + `wp_users` | Auto-purged at expiry; activity rows kept per retention |
| Debug snapshot ZIPs (when generated) | `wp-content/uploads/asteris-snapshots/` | 7 days then auto-deleted |

**Field-level redaction:** fields marked as PII (via the Forms module or the `asteris_activity_log_redact_value` filter) never enter the activity log — only redaction markers (`[REDACTED]`) appear.

**WP exporter / eraser:** activity log entries are attributable to user IDs where the actor is a WP user. WP core's eraser deletes attributable rows.

### Analytics + Pixels

| What | Where | Retention |
|---|---|---|
| GA4 / GTM / Meta / TikTok / Pinterest / LinkedIn / Clarity event data | At the provider's servers, NOT Asteris | Provider's retention policy |
| Provider configuration (IDs, access tokens, API keys) | `wp_options` keyed by provider, encrypted | Until reconfigured |
| Consent state per user session | Browser `localStorage` (`asteris-consent`), NOT server-stored | Per-browser, until cleared |

**Asteris does not store events.** Events stream directly from the browser (Pixel) or from the WordPress server (Conversions API) to the analytics / advertising provider. Provider privacy policies govern the data once it arrives.

### Image Optimisation

| What | Where | Retention |
|---|---|---|
| Optimised image variants (WebP / AVIF) | Alongside originals in `wp-content/uploads/` | Same as the original media item |
| Optimisation history per attachment | `wp_postmeta` keyed to the attachment post | Same as attachment |

**No PII stored.** Operates on whatever's in your media library.

### Backups + Migration

| What | Where | Retention |
|---|---|---|
| Backup archives (full DB + filesystem dumps) | Cloud destination you configured (S3 / B2 / R2 / Wasabi / SFTP / local) | Per your schedule's retention rules |
| Backup metadata (timestamp, size, checksum, destination) | `wp_asteris_backups` custom table | Indefinite (audit history) |
| Destination credentials | `wp_options` keyed by destination, encrypted | Until reconfigured |
| Encryption keys | `wp_options` key `asteris_backups_encryption_key`, itself encrypted | Until rotated; save off-site |

**Backup archives contain everything in your WP database** — including all PII any other plugin stores. AES-256 encrypted at rest.

**Restore data subject access requests** are typically handled at the source data level (the live database), not from backups. Backups exist for disaster recovery, not as a separate copy of customer data for compliance lookups.

### Accessibility scanner

| What | Where | Retention |
|---|---|---|
| Per-post scan results (issue list + WCAG criterion + DOM positions) | `wp_postmeta` keyed to the scanned post | Replaced on each re-scan |
| Site-wide audit dashboard data | Aggregated from per-post results; computed on-demand | N/A (computed) |
| EAA accessibility statement (when generated) | Stored as a normal WP page | Per your CMS retention |

**No PII stored.** Operates on rendered HTML, not on user data.

---

## How to handle a GDPR data-subject request

1. **Right of access (Article 15) / data portability (Article 20):** Tools → Export Personal Data → enter the data subject's email → WP core gathers exports from every plugin including Asteris's modules listed above. Output is a downloadable ZIP.
2. **Right of erasure (Article 17):** Tools → Erase Personal Data → enter the email → WP core invokes Asteris's erasers. Modules that store identifiable data (Forms, SMTP logs, Activity Log, Security failed-login records, 2FA secrets) participate.
3. **For data NOT erased by the WP core flow:** legally-retained accounting records, anything in a backup archive (back up — keep the live data clean and trust your retention policy), data sent to third-party analytics providers (Google / Meta / TikTok handle their own data subject requests via their tooling).

---

## Australian Privacy Act notes

Asteris Utility Suite does not transmit personal data outside your WordPress install except for:

1. The licence activation call (which sends only your licence key + hostname + WordPress version + PHP version — see [/docs/security](/asteris-utility-suite/docs/security/) for the full disclosure)
2. Whatever the **Analytics + Pixels** module is configured to send (GA4 / Meta / TikTok / etc. — destinations and event payloads under your control)
3. Whatever the **SMTP** module is configured to send (email through the provider you configured)
4. Whatever the **Backups** module is configured to send (encrypted backup archives to the destination you set)

For 2-4: the destinations are *your* configuration, not Asteris's defaults. The cross-border-disclosure obligation under Australian Privacy Principle 8 (APP 8) applies to *your* configuration of these modules, not to Asteris itself.

If your site collects PII via Asteris Forms, Activity Log, or other PII-bearing modules, the standard APP 5 collection notification and APP 11 reasonable-security-steps obligations apply to *your* handling of that data.

---

## See also

- [Security architecture](/asteris-utility-suite/docs/security/)
- [Privacy Policy](/asteris-utility-suite/privacy/) — what data Asteris collects about customers (the buyers, not the site visitors)
- [Subprocessors](/asteris-utility-suite/subprocessors/)
- [Refund policy](/asteris-utility-suite/refund-policy/)
