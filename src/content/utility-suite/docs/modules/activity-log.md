---
title: "Configure Activity Log + Site Health"
description: "Step-by-step setup of the Asteris Activity Log + Site Health module: event capture, per-event Asteris Undo, Site Health tab, debug snapshot ZIP, temp support user provisioning. Quickstart in 10 minutes."
sidebar:
  order: 6
---

# Configure the Activity Log + Site Health module

For the marketing overview of this module, see [/modules/activity-log](/asteris-utility-suite/modules/activity-log/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

This module is **one of the five truly-shared modules** between Asteris Utility Suite and Asteris for WooCommerce. If both plugins are installed, you get one combined activity log capturing both content + store events; no duplication. The Asteris Undo feature works across both products' captured events.

---

## Quickstart (10 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Activity Log + Site Health** to ON.

The Activity Log submenu appears, plus a new tab on WordPress's native Site Health screen (Tools → Site Health → **Asteris**).

### 2. Set retention

**Asteris → Activity Log → Settings → Retention**

Defaults:

- **Retention period** — 90 days
- **Auto-purge cron** — daily at 03:00 site-local time
- **Per-event-type retention** — toggle on if you want different retention by event type (e.g., 1 year for security events, 30 days for content edits)

90 days is right for most sites. Set to **forever** if you have compliance requirements (HIPAA, SOC 2, ISO 27001 audit trails). Set to **30 days** if you want minimal storage footprint.

### 3. Pick which events to capture

**Asteris → Activity Log → Settings → Capture**

100+ event types organised into categories:

- ✓ **Authentication** — logins, failed logins, logouts, password resets, 2FA challenges
- ✓ **Posts & pages** — created, edited, published, unpublished, trashed, restored, deleted (per-field captures)
- ✓ **Plugins** — activated, deactivated, installed, updated, deleted
- ✓ **Themes** — activated, switched, customised, file edits
- ✓ **Users** — created, edited, role changes, capability changes, deleted
- ✓ **Settings** — every option update (sitewide settings, plugin settings, customizer changes)
- ⚙️ **Comments** — created, status changes (often noisy on high-traffic sites — disable if not relevant)
- ⚙️ **Menus** — created, edited, items added/removed
- ⚙️ **Widgets/blocks** — sidebar changes, block-pattern modifications
- ⚙️ **Files** — uploads, modifications (via the file-change monitor in the Security module)
- ⚙️ **WooCommerce** (when Asteris for WooCommerce is installed) — orders, products, customers (high-volume; consider disabling order-level capture and keeping only refunds + product changes)

Defaults are sensible. Trim down only if log volume is overwhelming you (most sites won't hit this for years).

### 4. Set up notifications (optional)

**Asteris → Activity Log → Notifications**

Optional ship-to-external destinations:

- **Slack webhook** — paste incoming webhook URL → Asteris posts notable events (configurable filter)
- **Email digest** — daily / weekly digest of events to a specified inbox
- **Syslog** — RFC 5424 over UDP to a syslog endpoint (for SIEM / centralised log aggregation)

For most sites, leaving notifications off and reviewing the log when needed is fine. Set up Slack or email digest only if you actively monitor security events.

### 5. Trigger a test event

In another browser tab, do something simple — change the site tagline:

1. WP Admin → Settings → General
2. Change the **Tagline** field
3. Save

Then back in Activity Log → Recent Events. You should see a row:

- **Event** — `settings.option_updated`
- **Detail** — `blogdescription: <old> → <new>`
- **User** — your user
- **IP** — your IP
- **Timestamp** — just now

If you see the row, capture is working.

### 6. Try Asteris Undo

Same panel. Find your tagline-change row. There's an **Undo** button.

Click it. Asteris reverts the option to the previous value. Verify by going back to Settings → General — your old tagline is back.

This works for any logged event:

- **Post edits** → restores the previous revision
- **Settings** → restores the previous value
- **Plugin activations** → deactivates (without uninstalling)
- **User role changes** → restores the previous role
- **Menu changes** → restores the previous menu state

What can't be undone:

- **Logins** (you can't un-log-in)
- **Hard deletes past the trash window** (use backup restore instead)
- **File changes** (use backup restore — file content isn't in the activity log, only the change event)
- **Compounding changes** (Asteris flags these in the Undo dialog: "This change has dependent changes. Undo will leave the site in an inconsistent state. Continue anyway? Use backup restore instead?")

### 7. Check the Site Health tab

WP Admin → **Tools → Site Health → Asteris**

WordPress's native Site Health screen now has an Asteris tab showing:

- **Active modules** — list of currently-on Asteris modules
- **Recent errors** — last 200 entries from Asteris's error log
- **Database table integrity** — checksums + row counts for Asteris's custom tables
- **Cache status** — backend + size + recent purges (if Performance module is active)
- **Mail-send health** — recent send success rate (if SMTP module is active)
- **Background task queue depth** — pending Asteris cron jobs

This is on top of WordPress's built-in Site Health checks (it doesn't replace them; it adds an Asteris tab next to the WordPress tabs).

### 8. Generate a debug snapshot

When you need to send diagnostic info to support, instead of manually compiling versions / configs:

**Asteris → Activity Log → Site Health → Generate Snapshot** → click **Generate**.

Asteris builds a redacted ZIP containing:

- WordPress / PHP / MySQL versions
- Active plugins + versions
- Active theme + version
- Asteris module status
- Recent error log (last 200 entries)
- Server environment (web server, memory limit, max upload size, PHP extensions)
- Database table sizes for Asteris tables
- Cache + mail health summaries

**What's NOT in the snapshot:**

- ❌ User data (no email addresses, no usernames beyond your own admin's)
- ❌ Content (no post titles, no settings values)
- ❌ Credentials (no API keys, no SMTP passwords, no licence keys)
- ❌ Visitor IPs (your own admin IP only, for the snapshot-generated-by audit trail)

Personal data is redacted at capture time via the `asteris_activity_log_redact_value` filter. You can extend the redaction list — see the Settings reference below.

The ZIP downloads to your machine. Email it to support@asteriscommerce.com. Support gets everything needed to diagnose, you don't ship credentials or content.

### 9. (Optional) Provision a temp support user

For deeper access — when support needs to actually log in and see the problem:

**Asteris → Activity Log → Temp Support User**

- **Email** — `support@asteriscommerce.com` (or wherever you're sending the credentials)
- **Expiry** — 24 hours (configurable up to 7 days)
- **Role** — Administrator (typically) or restricted role for tighter scope

Click **Provision**.

Asteris creates a time-limited admin user, emails the credentials to the specified address, and starts a countdown. The user can log in and operate normally; every action they take is captured in the Activity Log with the marker `[support session]`. At expiry, the account self-destructs.

> ⚠️ **Use temp support users sparingly.** A live admin login is the highest-risk grant you can give. Verify the support email goes to the actual support team (not a phishing inbox). Set the shortest expiry that allows them to complete the work.

### 10. Done — the baseline is running

You now have:

- ✓ Activity capture across 100+ event types
- ✓ Per-event Asteris Undo for revertable events
- ✓ Site Health tab with diagnostics
- ✓ Debug snapshot ZIP for support handoff
- ✓ Temp support user provisioning ready

Come back for filtering, notifications, search, and Activity Log forensics when you have real events to investigate.

---

## Common workflows

### Investigate "what changed last Tuesday?"

The single most common Activity Log use case:

1. **Asteris → Activity Log → Recent Events**
2. **Filter** → Date range → Tuesday last week (or custom range)
3. Optionally narrow by:
   - **User** — only events by a specific person
   - **Event type** — only `settings.option_updated`, only `posts.published`, etc.
   - **IP** — events from a specific IP (e.g., if you suspect an external actor)
4. The log shows the chronological list of every change

For each event, click to expand:

- **Before / After** values
- **Diff view** for content changes
- **Undo** button (if revertable)
- **Related events** — what else happened in the same session

### Asteris Undo a destructive change

You realised yesterday's update was wrong:

1. Find the event in the log (filter by date + event type if you know roughly when)
2. Click the event row → **Undo**
3. Asteris shows a **preview** of what will change:
   - Affected field / option / table
   - Before / after values
   - Any dependent changes (compounding changes are flagged here)
4. Click **Confirm Undo**
5. The change is reverted
6. A new event row appears in the log: `asteris.undo` — pointing back at the undone event

> ⚠️ **Compounding changes:** if you changed the homepage at 2pm, then changed it again at 4pm based on the 2pm version, undoing the 2pm change leaves the 4pm change in an inconsistent state. Asteris flags this and asks you to confirm. The safer path is to undo the 4pm change first, then the 2pm.

### Export logs for a compliance audit

For SOC 2 / HIPAA / ISO 27001 audits, you typically need:

- Time-bounded log export
- Specific event types (often: authentication, user changes, permission changes, data access)
- Verifiable integrity (checksum + signed export)

**Asteris → Activity Log → Export**

- **Date range** — required
- **Event types** — filter to compliance-relevant categories
- **Format** — CSV / JSON / Syslog
- **Include integrity hash** — SHA-256 hash + timestamp signed with a key only Asteris knows; auditors can verify the export hasn't been tampered

Export to CSV for spreadsheet review; JSON for programmatic processing; Syslog for ingestion into a SIEM.

### Ship logs to an external SIEM (Splunk, Datadog, Elastic)

**Asteris → Activity Log → Notifications → Syslog**

- **Host** — your SIEM's syslog receiver (e.g., `splunk.example.com`)
- **Port** — typically `514` for UDP, `6514` for TLS-encrypted UDP
- **Protocol** — UDP / UDP-TLS / TCP
- **Facility** — `LOCAL0` through `LOCAL7` (your SIEM's convention)
- **Severity mapping** — Asteris maps event types to syslog severity levels (default: security events → CRIT, content events → INFO, etc.)

Save. Asteris streams every captured event to the syslog endpoint in RFC 5424 format. SIEM ingestion is immediate.

### Set up Slack notifications for high-priority events

**Asteris → Activity Log → Notifications → Slack**

- **Webhook URL** — paste your Slack incoming webhook
- **Channel** — `#alerts` or wherever
- **Event filter** — which events post:
  - ✓ Authentication: failed login > 5 attempts
  - ✓ Authentication: admin login from new IP
  - ✓ Users: admin role assigned
  - ✓ Plugins: activated/deactivated
  - ✓ Settings: critical (`admin_email`, `siteurl`, `home`, etc.)
  - ✓ Asteris licence: deactivated

Filter granularly. Avoid posting every event (Slack channel becomes noise → ignored).

### Provision a temp support user (full workflow)

For when support needs more than a debug snapshot:

1. **Asteris → Activity Log → Temp Support User**
2. **Email** — `support@asteriscommerce.com`
3. **Username** — auto-generated (`asteris-support-<random>`)
4. **Role** — Administrator (default) or scope to a custom role
5. **Expiry** — 24 hours
6. **Auto-extend on activity** — toggle if you want the timer to reset on each support action (default OFF)
7. **Notify on first login** — Asteris emails you when support actually logs in (so you can monitor)
8. Click **Provision**

Asteris emails the support address with credentials + the magic-link to the WP admin. At expiry:

- Account auto-disables
- Sessions auto-terminate
- The user record is retained (deleted) so the Activity Log entries attributable to that user still resolve their identity

You can manually revoke earlier:

```bash
wp asteris support-user revoke --user-id=<id>
```

Or in admin → **Asteris → Activity Log → Temp Support User → Active sessions → Revoke**.

### Custom event capture (developer)

To log a custom event from your own code (plugin / theme / snippet):

```php
do_action( 'asteris_activity_log_event', [
    'event'    => 'mycode.custom_thing',
    'user_id'  => get_current_user_id(),
    'data'     => [
        'foo' => 'bar',
        'old' => $previous_value,
        'new' => $current_value,
    ],
    'undoable' => true,   // optional; if true, you also register an undo callback
] );
```

Register an undo callback for the event:

```php
add_filter( 'asteris_activity_log_undo_mycode.custom_thing', function( $event ) {
    update_option( 'my_option', $event['data']['old'] );
    return true;
} );
```

When the user clicks Undo on a `mycode.custom_thing` event, your callback fires + reverts the change.

### Extend PII redaction (custom field names)

If your codebase stores sensitive data in non-standard option keys / postmeta keys, extend the redaction list:

```php
add_filter( 'asteris_activity_log_redact_keys', function( $keys ) {
    $keys[] = '_my_plugin_api_key';
    $keys[] = '_customer_tax_id';
    $keys[] = 'mycorp_internal_token';
    return $keys;
} );
```

Any event referencing those keys shows `[REDACTED]` instead of the value. Critical when you're storing API keys, government IDs, financial details, etc., that shouldn't appear in plaintext in the log.

---

## Settings reference

### Capture

- **100+ event types** organised by category
- **Per-category enable/disable** — trim noisy capture
- **Per-event-type retention override** — different retention per category
- **Custom event registration** — `asteris_activity_log_event` action hook for developer-defined events

### Retention

- **Default retention** — 7 / 30 / 60 / 90 / 180 / 365 / forever
- **Auto-purge cron** — daily at 03:00 site-local time
- **Manual purge** — admin trigger to immediately purge entries past retention
- **Pre-purge backup** — toggle to dump expiring entries to a CSV before deletion (compliance use case)

### Asteris Undo

- **Enabled by default** — applies to all undoable event types
- **Compounding-change detection** — warns when undo would create inconsistency
- **Undo audit trail** — every undo action logged as its own event
- **Per-user enable** — restrict undo capability to specific roles (e.g., administrator only)

### Site Health tab

- **Active modules**
- **Recent errors**
- **DB table integrity**
- **Cache status**
- **Mail-send health**
- **Background task queue depth**

### Debug snapshot

- **Standard scope** — versions, plugins, themes, modules, errors, environment, table sizes
- **Custom redaction keys** — `asteris_activity_log_redact_keys` filter
- **Snapshot retention** — auto-deleted from `wp-content/uploads/asteris-snapshots/` after 7 days

### Temp support user

- **Default role** — Administrator
- **Default expiry** — 24 hours
- **Max expiry** — 7 days
- **Auto-extend on activity** — toggle
- **First-login notification** — email admin when support actually logs in

### Notifications

- **Slack webhook** — per-event-type filter
- **Email digest** — daily / weekly summary
- **Syslog** — RFC 5424 over UDP / UDP-TLS / TCP; configurable facility + severity mapping

---

## REST API

```
# Log entries
GET    /wp-json/asteris/v1/activity-log
GET    /wp-json/asteris/v1/activity-log/<id>
POST   /wp-json/asteris/v1/activity-log/<id>/undo
DELETE /wp-json/asteris/v1/activity-log/<id>             # admin purge of a specific entry

# Site Health
GET    /wp-json/asteris/v1/site-health
GET    /wp-json/asteris/v1/site-health/snapshot          # returns snapshot file URL after generation
POST   /wp-json/asteris/v1/site-health/snapshot/generate

# Temp support user
POST   /wp-json/asteris/v1/support-user                  # body: { email, role, expiry_hours }
GET    /wp-json/asteris/v1/support-user                  # list active
DELETE /wp-json/asteris/v1/support-user/<id>             # revoke

# Notifications
GET    /wp-json/asteris/v1/activity-log/notifications/test?destination=slack
```

All capability-checked (`manage_options`).

---

## WP-CLI

```bash
# Log queries
wp asteris activity-log list --limit=20
wp asteris activity-log list --user=<id>
wp asteris activity-log list --event=settings.option_updated
wp asteris activity-log list --since="2 days ago"

# Undo
wp asteris activity-log undo --id=<event_id>
wp asteris activity-log undo --dry-run --id=<event_id>   # preview without applying

# Export
wp asteris activity-log export --since=2026-01-01 --until=2026-12-31 --format=csv
wp asteris activity-log export --format=json --output=audit.json

# Retention
wp asteris activity-log retention purge
wp asteris activity-log retention purge --dry-run

# Site Health
wp asteris site-health
wp asteris site-health snapshot                          # generates + outputs path

# Temp support user
wp asteris support-user create --email=<email> --expires-in=24h
wp asteris support-user list
wp asteris support-user revoke --user-id=<id>
```

---

## See also

- [Security + Login + 2FA module](/asteris-utility-suite/docs/modules/security/) — security events also land in the activity log
- [Forms module](/asteris-utility-suite/docs/modules/forms/) — form submissions appear with PII redaction
- [SMTP module](/asteris-utility-suite/docs/modules/smtp/) — email sends logged in both SMTP logs + activity log (linked)
- [Subprocessor list](/asteris-utility-suite/subprocessors/) — what activity-log data leaves your install (nothing, by default; only syslog if you configure it)
