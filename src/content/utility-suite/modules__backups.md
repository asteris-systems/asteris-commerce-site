---
url: /asteris-utility-suite/modules/backups
title: "WordPress Backup Plugin — Asteris Backups + Migration (S3, B2, R2, Wasabi, Encrypted)"
description: "Asteris Backups + Migration is a WordPress backup plugin with scheduled backups to S3, Backblaze B2, Cloudflare R2, Wasabi, SFTP, or local — AES-256 encrypted, one-click restore, cross-site migration, incremental backups."
og_title: "Asteris Backups + Migration — Modern Destinations, Encrypted, Bundled"
og_description: "S3, B2, R2, Wasabi, SFTP. AES-256. One-click restore. Cross-site migration not a paid add-on."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/backups
primary_keyword: wordpress backup plugin
secondary_keywords:
  - wordpress backup to s3
  - wordpress backup to backblaze b2
  - wordpress backup to cloudflare r2
  - wordpress migration plugin
  - updraftplus alternative
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: backups
internal_links_out:
  - /asteris-utility-suite/vs/updraftplus
  - /asteris-utility-suite/migrate/from-updraftplus
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Backup Plugin — Asteris Backups + Migration

**What should a WordPress backup plugin do?** Four jobs: (1) **scheduled automatic backups** so you don't have to remember, (2) **off-site storage** so a server failure doesn't take your backup with it, (3) **one-click restore** that actually works (an untested restore is hope, not insurance), and (4) **encryption at rest** so a compromised backup destination doesn't compromise your site's data.

**Where should I store WordPress backups?** Anywhere except the same server as the WordPress install. Modern cost-effective options: **Cloudflare R2** (no egress fees, S3-compatible), **Backblaze B2** (cheap hot storage, S3-compatible), **Wasabi** (~80% cheaper than S3 for cold storage), **Amazon S3** (the canonical option, more expensive). Asteris supports all four natively, plus SFTP and local storage.

**Can Asteris restore a backup to a different URL?** Yes — that's the cross-site migration feature. Restore your live-site backup to a staging URL to verify the restore works, or push it to a new production site to migrate hosting. Not gated to a paid add-on.

---

## The complete feature set

### Scheduled backups

- **Hourly / daily / weekly / monthly** schedules
- **Multiple schedules per site** (e.g. daily database, weekly full)
- **Backup what** — files only, database only, or both
- **Per-folder exclusions** (skip `wp-content/uploads/cache/`, custom dirs, etc.)
- **Per-table exclusions** (skip large analytics tables, etc.)
- **Incremental backups** — after the first full backup, only changed files + database deltas are uploaded

### Storage destinations (all native, no add-ons)

- **Amazon S3** — any region, IAM role or access key auth
- **Backblaze B2** — native S3-compatible API
- **Cloudflare R2** — native S3-compatible API (zero egress fees — great for backup storage)
- **Wasabi** — native S3-compatible API
- **SFTP** — to any SSH-accessible host
- **Local** — to a separate directory on the same host (low-quality option but available)

### Encryption

- **AES-256 encryption at rest** — backup archives are encrypted with a key only you control
- **Encryption key stored encrypted** (AES-256-CBC) in the WordPress database
- **Decrypt + restore** requires the key — store a copy off-site (Asteris reminds you on setup)

### One-click restore

- **Restore to current site** — replace current database + files with backup contents
- **Restore to staging URL** — point Asteris at a different URL; restore there
- **Restore to a new site** — install Asteris on the new site, point at the backup destination, restore — full site migration
- **Per-folder or per-table restore** — restore only specific parts (e.g. just the database, just the uploads folder)
- **Restore preview** — list what will change before clicking Restore

### Cross-site migration (not a paid add-on)

- **Push to staging** — one-click clone from production to a staging URL
- **Pull from production** — staging can pull the latest from production
- **URL rewrite** — automatic URL replacement during restore (no separate Better Search Replace step needed)
- **Domain change handling** — switching from `dev.example.com` to `example.com`? Asteris rewrites every URL in the database during restore

### Backup integrity verification

- **Checksum verification** — every backup archive has a SHA-256 checksum; Asteris verifies the archive at the destination matches the checksum
- **Test restore** — optional: every Nth backup is auto-restored to a sandbox URL and tested for boot success; failures alert via email
- **Retention** — keep the last N daily / weekly / monthly backups (configurable)

---

## What this module does NOT do

- **Real-time / live backups.** Asteris backs up on a schedule. For real-time database replication, use a managed backup service like BlogVault or your host's snapshot system.
- **Manage backups across 100s of sites.** Asteris is per-site. For agency-level multi-site backup management, ManageWP or MainWP are better.

---

## Frequently asked questions

**What is the best WordPress backup plugin?**
**UpdraftPlus** ships a broader free-tier destination set (Dropbox, Google Drive, OneDrive free; Asteris currently free-tier supports S3-compatible + SFTP + local). **BlogVault** is a managed off-site backup service with real-time replication + push-button staging environments — different category (managed service vs in-WordPress plugin). **BackWPup** is free and competent. **Asteris Backups + Migration** is best when you want backups + the other 10 plugins a WordPress site needs in one bundle, with modern destinations (R2 with zero egress fees, Wasabi) and cross-site migration included (not as a $30 add-on).

**Can Asteris back up to Cloudflare R2 or Wasabi?**
Yes — both natively. R2 (no egress fees) is the smart choice for backup storage; you pay storage cost only. Wasabi is the cheapest for long-term cold storage.

**Does Asteris encrypt backups?**
Yes — AES-256 encryption at rest. The encryption key is stored encrypted in the WordPress database; you should also keep a copy off-site (e.g. in 1Password).

**Can I migrate a WordPress site to a new host with Asteris?**
Yes — cross-site migration is built into the Backups + Migration module. Install Asteris on the new site, point it at your backup destination, restore. Asteris handles URL rewriting during restore so links update automatically.

**Will Asteris back up to my existing UpdraftPlus storage?**
You configure Asteris with the same credentials. UpdraftPlus's existing backup archives stay in their UpdraftPlus format — they're restorable from UpdraftPlus's UI, not from Asteris. Asteris starts a new backup chain in its own format.

**What happens if a backup fails?**
You get an email alert. The failed backup is logged in the [Activity Log](/asteris-utility-suite/modules/activity-log/) with the error. Asteris retries on the next schedule (doesn't bombard you with retries between schedules).

---

[Asteris vs UpdraftPlus →](/asteris-utility-suite/vs/updraftplus/) · [Migrate from UpdraftPlus →](/asteris-utility-suite/migrate/from-updraftplus/) · [Pricing →](/asteris-utility-suite/pricing/)
