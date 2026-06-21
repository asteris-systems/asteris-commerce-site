---
url: /asteris-utility-suite/migrate/from-updraftplus
title: "Migrate From UpdraftPlus to Asteris (Restore-Verified, No Lost Backups)"
description: "Step-by-step: how to switch from UpdraftPlus to Asteris Utility Suite backups. Run both during transition, verify Asteris restore on staging, then deactivate UpdraftPlus. Keep historical backups accessible."
og_title: "Migrate From UpdraftPlus to Asteris — Restore-Verified Switch"
og_description: "Run both during transition. Verify Asteris restore on staging. Keep UpdraftPlus archives accessible."
canonical: https://asteriscommerce.com/asteris-utility-suite/migrate/from-updraftplus
primary_keyword: migrate from updraftplus
secondary_keywords:
  - switch from updraftplus
  - replace updraftplus
  - updraftplus to asteris
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: backups
internal_links_out:
  - /asteris-utility-suite/vs/updraftplus
  - /asteris-utility-suite/modules/backups
verified_date: 2026-06-04
---

# How to Migrate From UpdraftPlus to Asteris

**How do I switch backup plugins safely?** Two principles: (1) **never deactivate the old backup plugin until you've verified the new one works**, and (2) **never delete old backup archives until the new plugin has accumulated at least one full retention cycle**. Backups are insurance — you don't cancel one policy until the new one's in effect.

**What happens to my existing UpdraftPlus backup archives?** They stay in your storage destination (S3, Dropbox, Google Drive, etc.) and remain restorable from the UpdraftPlus plugin **even after you stop using it** — as long as UpdraftPlus is installed (active or not). We recommend keeping UpdraftPlus installed-but-inactive for 30 days after switching, then deleting once Asteris has a full set of its own backups.

**Will Asteris restore an UpdraftPlus backup?** No — UpdraftPlus's backup format and Asteris's format are different. To restore an UpdraftPlus backup, use UpdraftPlus. To migrate from UpdraftPlus to Asteris, the path is **forward-only**: switch to Asteris for *future* backups; keep UpdraftPlus available for *past* backups.

---

## Before you start

- An active WordPress site with UpdraftPlus configured and successfully backing up
- The credentials for your existing UpdraftPlus storage destination (S3 access key, B2 application key, etc.)
- ~30 minutes
- A staging site you can restore to (any subdomain or test environment) — needed for Path A below

---

## The safest path

### Step 1. Install Asteris Utility Suite and activate the Backups module

- Install Asteris (free or paid). The full Backups + Migration module is in the paid tier.
- WP Admin → **Asteris → Modules** → toggle **Backups + Migration** to ON.

### Step 2. Configure Asteris to write to the same destination as UpdraftPlus

In **Asteris → Backups → Destinations**:

1. Add a new destination matching what UpdraftPlus uses (Amazon S3 / Backblaze B2 / Cloudflare R2 / Wasabi / SFTP / etc.)
2. Use the **same credentials** you have in UpdraftPlus (or a parallel set if you'd prefer to keep them separated)
3. **Use a different folder** within the destination — e.g. if UpdraftPlus uses `s3://mybucket/updraftplus/`, point Asteris at `s3://mybucket/asteris/`. This keeps the two plugins' backups isolated and prevents either from clobbering the other.

### Step 3. Run one Asteris backup manually

In **Asteris → Backups**, click **Run Backup Now**. Wait for it to complete (depends on site size; typically 5-30 minutes for a small-to-medium site).

Verify the archive landed at your destination — log into S3 / B2 / etc. and confirm the file exists.

### Step 4. Restore the Asteris backup to staging (critical)

**This is the step everyone skips. Don't skip it.** A backup you've never restored is hope, not insurance.

In **Asteris → Backups → Restore**:

1. Select the backup you just ran
2. Choose **Restore to a different URL** (your staging site URL)
3. Click Restore
4. Wait for completion
5. Visit your staging site and verify it boots correctly

If the restore works, you have a verified working backup-and-restore cycle in Asteris. Proceed.

If the restore fails or the staging site doesn't boot, **don't deactivate UpdraftPlus**. Open a support ticket at [support@asteriscommerce.com](mailto:support@asteriscommerce.com) with the restore log. Stay on UpdraftPlus until the issue is resolved.

### Step 5. Configure Asteris's schedule

In **Asteris → Backups → Schedule**:

1. Set the schedule you want (daily / weekly / etc.)
2. Set retention (how many backups to keep)
3. Set what to back up (files + database, or one of)
4. Enable encryption (AES-256, recommended)
5. **Save your encryption key** somewhere off-site (1Password, password manager, printed and locked). Without the key, encrypted backups cannot be restored.

### Step 6. Disable UpdraftPlus's schedule (don't deactivate yet)

In WP Admin → UpdraftPlus → Settings:

1. Set scheduled backups to **Manual** (stops automatic runs)
2. **Do NOT delete existing backups** — they stay restorable from UpdraftPlus's UI

UpdraftPlus is now passive — installed, not scheduled. Asteris is the active backup driver.

### Step 7. Wait 30 days, watching both

- Asteris runs scheduled backups; verify each landed successfully in **Asteris → Backups → History**
- UpdraftPlus stays installed-but-inactive in case you need to restore from one of its archives
- After 30 days, you've built up a full Asteris backup history

### Step 8. Deactivate UpdraftPlus

In WP Admin → Plugins → deactivate UpdraftPlus. **Don't delete it yet** — your historical UpdraftPlus archives are only restorable while UpdraftPlus is installed.

### Step 9. (Optional, after 90 days) Delete UpdraftPlus

After 90 days of clean Asteris backup history, if you're confident you don't need to restore from an UpdraftPlus archive, you can delete UpdraftPlus and its old archives. At that point, Asteris is the sole backup system.

---

## What if I need to restore from an UpdraftPlus archive after switching?

Reactivate UpdraftPlus (if you kept it installed). Restore from UpdraftPlus → Existing Backups, as you always did. UpdraftPlus and Asteris don't conflict — temporarily reactivating UpdraftPlus to access an old archive doesn't break Asteris.

If you've deleted UpdraftPlus and need to restore from one of its archives: reinstall UpdraftPlus from WP.org, point it at your storage destination, the existing archives will be discoverable in its UI.

---

## Frequently asked questions

**What is the best free UpdraftPlus alternative?**
UpdraftPlus's own free tier is genuinely good — most sites don't need Premium features. **BackWPup** is a free alternative if you want different storage destination support. For a paid alternative bundled with 10 other plugins: **Asteris Backups + Migration** in Asteris Starter at $149/yr.

**Can Asteris restore an UpdraftPlus backup?**
No — different backup formats. To restore an UpdraftPlus archive, use UpdraftPlus. Migration is forward-only: switch Asteris for *future* backups; keep UpdraftPlus for *past* archives.

**Will I lose existing UpdraftPlus backups when I switch?**
No — they stay at your storage destination and remain restorable from UpdraftPlus's UI as long as UpdraftPlus is installed. We recommend keeping UpdraftPlus installed-but-inactive for at least 30 days after switching.

**Does Asteris back up to the same destinations as UpdraftPlus?**
For S3, B2, SFTP, and local: yes (same destinations, native support). For Dropbox, Google Drive, OneDrive: not at v1.0 — Asteris doesn't support these (we prioritised S3-compatible storage which is significantly cheaper than consumer cloud drives). Add to backlog.

**Is the cross-site migration feature included or an add-on?**
Included. UpdraftPlus's Migrator add-on is $30/yr — Asteris bundles the equivalent feature.

---

[See the Backups module →](/asteris-utility-suite/modules/backups/) · [Asteris vs UpdraftPlus →](/asteris-utility-suite/vs/updraftplus/) · [Pricing →](/asteris-utility-suite/pricing/)
