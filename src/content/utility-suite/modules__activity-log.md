---
url: /asteris-utility-suite/modules/activity-log
title: "WordPress Activity Log Plugin — Asteris (Per-Event Undo + Site Health)"
description: "Asteris Activity Log is a WordPress activity log plugin with per-event Undo (revert any logged change), Site Health integration, 100+ event types, debug snapshot ZIP, and temp support user provisioning. Bundled with 10 other modules from $149/yr."
og_title: "Asteris Activity Log — Per-Event Undo + Site Health"
og_description: "Activity log with one-click undo on any change. The undo feature WP Activity Log Premium and Simple History don't ship."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/activity-log
primary_keyword: wordpress activity log plugin
secondary_keywords:
  - wordpress audit log
  - wp activity log alternative
  - simple history alternative
  - wordpress change tracking plugin
  - wordpress site health plugin
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: activity-log
internal_links_out:
  - /asteris-utility-suite/modules
  - /asteris-utility-suite/pricing
  - /asteris-utility-suite/docs/modules/activity-log
verified_date: 2026-06-04
---

# WordPress Activity Log Plugin — Asteris Activity Log + Site Health

**What is a WordPress activity log plugin?** A WordPress activity log records every meaningful change on the site — who logged in, what posts were edited, which plugins were activated, what settings changed — and stores it in a searchable, exportable history. The standard use cases are security forensics (what happened before the site was hacked?), team accountability (who changed the homepage?), and operational debugging (what changed last week that broke a feature?).

**What makes Asteris's Activity Log different?** **Per-event Undo.** Most activity log plugins (WP Activity Log Premium, Simple History, Stream) capture-and-display only — you see what changed but can't revert it without restoring from backup. Asteris adds a **one-click Undo button on every logged event** that reverts the specific change without touching anything else. Someone changed a setting at 11pm and the contact form broke? Open Activity Log, find the change, click Undo. The setting reverts. No backup restore, no "what did I touch last".

**Is Asteris Activity Log free?** A capture-only lite version is in [Asteris Utility Suite Free](/asteris-utility-suite/free/) on WordPress.org. The full module — with per-event Undo, Site Health tab, debug snapshot ZIP, and temp support user provisioning — is in the paid tiers (from $149/yr Starter, bundled with 10 other modules).

---

## The complete feature set

### Capture (100+ event types)

- **Authentication** — logins, failed logins, logouts, password resets, 2FA challenges
- **Posts & pages** — created, edited, published, unpublished, trashed, restored, deleted (per field changes captured)
- **Plugins** — activated, deactivated, installed, updated, deleted (per-version captured)
- **Themes** — activated, switched, customised, file edits
- **Users** — created, edited, role changes, capability changes, deleted
- **Settings** — every option update (sitewide settings, plugin settings, customizer changes)
- **Comments** — created, edited, status changes (spam / trash / approved)
- **Menus** — created, edited, items added/removed
- **Widgets / blocks** — sidebar changes, block-pattern modifications
- **Files** — uploads, modifications (via the file-change monitor in the Security module)
- **WooCommerce** — orders, products, customers (when Asteris for WooCommerce is also installed)

### Asteris Undo (the differentiator)

Every logged event has an **Undo** button. Click it, the change reverts. For post edits, it restores the previous revision. For settings, it restores the previous value. For plugin activations, it deactivates the plugin (without uninstalling). For user role changes, it restores the previous role.

**What can't be undone:** logins (you can't un-log-in), deletes that have passed the 30-day trash window, file changes (use a backup restore), and changes that compound on each other (Asteris flags these in the Undo dialog).

### Site Health tab

Asteris adds a tab to WordPress's native **Site Health** screen showing Asteris-specific diagnostics:

- Modules currently active
- Recent errors in the Asteris error log
- Database table integrity for Asteris tables
- Cache status (if Performance module is active)
- Mail-send health (if SMTP module is active)
- Background task queue depth

This is on top of WordPress's built-in Site Health checks (it doesn't replace them; it adds an Asteris tab next to the WordPress tabs).

### Debug snapshot ZIP

When support requests a debug snapshot, you click **Asteris → Site Health → Generate Snapshot**. Asteris builds a redacted ZIP containing:

- WordPress version, PHP version, MySQL version
- Active plugins + versions
- Active theme + version
- Asteris module status
- Recent error log (last 200 entries)
- Server environment (web server, memory limit, max upload size)
- Database table sizes
- **No user data. No content. No credentials.** Personal data is redacted at capture time via the `asteris_activity_log_redact_value` filter.

The ZIP downloads to your machine. Email it to support. Support gets everything needed to diagnose, you don't ship credentials.

### Temp support user

When deeper access is needed, **Asteris → Activity Log → Temp Support User** provisions a time-limited admin account. You set the expiry (default 24 hours), Asteris emails the credentials to support, and the account self-destructs at the expiry. The account's actions appear in the Activity Log marked **[support session]** for full transparency.

### Filtering, export, retention

- Filter by user, event type, date range, IP address, or free-text search
- Export to CSV
- Configurable retention (default 90 days, extendable to forever for paid tiers)
- Optional ship-to-external (Slack webhook, email digest, syslog) — set up in Notifications

---

## Where Asteris Activity Log sits in the stack

**Asteris Activity Log is one of the five truly-shared modules** across Asteris Utility Suite and [Asteris for WooCommerce](https://asterisforwoocommerce.com) — same code, same UX on both sides. If you run both plugins, you get one combined activity log capturing both content events and store events.

---

## When to use Asteris Activity Log

- **Small teams** where multiple people touch the site — accountability matters
- **Client sites** managed by an agency — Undo lets you fix a client's accidental change without a full restore
- **Compliance-driven sites** — GDPR / HIPAA / SOX audit trails
- **Sites that have been hacked before** — forensic timeline of what the attacker did
- **Anyone who's ever asked "what changed last Tuesday?"**

---

## Frequently asked questions

**What is a WordPress activity log plugin?**
A plugin that records every meaningful change on a WordPress site — logins, post edits, settings changes, plugin activations — into a searchable, exportable history. Used for security forensics, team accountability, and operational debugging.

**What's the difference between Asteris and WP Activity Log Premium?**
The headline difference is **per-event Undo** — Asteris reverts any logged change with one click. WP Activity Log Premium captures and displays only; reverting requires restoring from backup. Asteris also bundles 10 other modules at the price of WP Activity Log Premium alone.

**Is there a free WordPress activity log plugin?**
Yes — **Simple History** is free and competent. Asteris Utility Suite Free also includes a capture-only Activity Log (no Undo). For Undo + Site Health + debug snapshot + temp support user, you need a paid Asteris tier.

**Can I undo a change I made an hour ago?**
Yes — that's the per-event Undo feature. Find the event in the log, click Undo. Post edits restore from the revision system; settings restore from the previous value Asteris captured. Some changes can't be undone (logins, hard deletes after the trash window, file edits) — Asteris flags these clearly.

**Does Asteris Activity Log work with WooCommerce?**
Yes — when Asteris for WooCommerce is also installed, the shared Activity Log captures WC events (orders, products, customers, refunds) alongside WordPress events in one combined log.

**How long does Asteris keep activity log entries?**
Default 90 days, configurable up to forever. Set retention in Asteris → Activity Log → Settings → Retention.

---

[See all 13 modules →](/asteris-utility-suite/modules/) · [Pricing →](/asteris-utility-suite/pricing/) · [Activity Log technical docs →](/asteris-utility-suite/docs/modules/activity-log/)
