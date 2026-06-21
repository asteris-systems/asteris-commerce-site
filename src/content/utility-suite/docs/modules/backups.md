---
title: "Configure Backups + Migration"
description: "Step-by-step setup of the Asteris Backups + Migration module: scheduled backups to S3, Backblaze B2, Cloudflare R2, Wasabi, SFTP, or local. AES-256 encryption, one-click restore, cross-site migration. First backup in 15 minutes."
sidebar:
  order: 9
---

# Configure the Backups + Migration module

For the marketing overview of this module, see [/modules/backups](/asteris-utility-suite/modules/backups/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

**The most important step in any backup workflow is restoring to a staging URL to verify the backup works.** A backup you've never restored is hope, not insurance. Step 6 of the Quickstart is this verification — don't skip it.

---

## Quickstart (15 minutes)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Backups + Migration** to ON.

### 2. Add your first destination

**Asteris → Backups → Destinations → Add Destination**

For most users, the right first destination is **Cloudflare R2** — zero egress fees, S3-compatible API, ~$0.015/GB/month storage. If you're a smaller site / hobby project, **Backblaze B2** is similarly priced and slightly simpler to set up. **Amazon S3** has the widest third-party tooling ecosystem but higher pricing than R2 / B2 / Wasabi.

The full R2 walkthrough is at [/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2](/asteris-utility-suite/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2/).

For this Quickstart, we'll use **Local** (simplest, but **NOT recommended for primary backups** — same disk failure that kills the site kills the backup). Pick a real cloud destination ASAP after this Quickstart.

- **Type** — Local
- **Path** — `wp-content/asteris-backups/` (default)

Save.

> ⚠️ **NEVER rely on local-only backups for production.** Use them for testing the module, then switch to S3 / B2 / R2 / Wasabi / SFTP. A local backup on the same disk as the site is useless when the disk fails.

### 3. Set the encryption key

**Asteris → Backups → Encryption** → click **Generate encryption key**.

Asteris generates a 256-bit AES key.

> 🔐 **CRITICAL: copy this key to your password manager NOW.**
>
> Without the key, encrypted backups cannot be restored. Asteris stores a copy in your WP database (encrypted itself with a hosting-derived key), but if your WP database is corrupted or destroyed, the key in the DB is gone too. The off-site copy in your password manager is your last line of defence.

Click **Confirm — I've saved the key off-site**. The dialog won't dismiss until you do.

### 4. Configure the schedule

**Asteris → Backups → Schedule → Add Schedule**

Defaults that work for most sites:

- **Frequency** — Daily
- **Time** — 03:00 site-local (off-peak)
- **What to back up**:
  - ✓ Database
  - ✓ Files (uploads, themes, plugins, mu-plugins)
- **Destination** — pick the destination you added in step 2
- **Encryption** — ON
- **Retention** — keep last 7 daily backups + 4 weekly + 6 monthly (the GFS — Grandfather-Father-Son — pattern)
- **Incremental after first full** — toggle ON (saves storage; only changed files uploaded)

Save.

### 5. Run the first backup manually

**Asteris → Backups → Run Backup Now** → pick your schedule from the dropdown → click **Run**.

Asteris kicks off the backup. Progress is shown in the dashboard. For a 1 GB site, expect:

- Filesystem scan: ~30 seconds
- Compression: ~1-3 minutes
- Encryption: ~30 seconds
- Upload: depends on connection + destination — 1-10 minutes typical

When complete, verify in **Asteris → Backups → History**. You should see a row with:

- ✓ Status: Successful
- ✓ Size + file count
- ✓ Destination + path
- ✓ SHA-256 checksum

### 6. Restore to a staging URL (the most important step)

**This is where most "backup plans" fail in practice.** A backup that's never been restored is unverified.

If you don't have a staging URL, get one before going further. Most hosting providers (WP Engine, Kinsta, SiteGround, Cloudways, your own hosting) offer one-click staging. If yours doesn't, use a separate WordPress install on a subdomain (`staging.yoursite.com`) or a local environment (Local by Flywheel, LocalWP).

Then:

1. **Asteris → Backups → Restore** → select the backup you just ran
2. **Restore to** — pick **Different URL**
3. **Target URL** — `https://staging.yoursite.com`
4. **Encryption key** — paste from your password manager
5. **Confirm**: ✓ I have the encryption key saved ✓ Target URL is correct
6. Click **Restore**

Asteris pushes the encrypted backup to the staging URL, decrypts it, and runs an in-place restore. URL rewriting is automatic (everything that was `yoursite.com` becomes `staging.yoursite.com`).

Wait for completion. Visit `https://staging.yoursite.com` — should look exactly like production but with the staging URL.

**This is your verified, working backup-and-restore cycle.** You now know that if production dies, you can stand up a new WordPress install, point Asteris at the destination, and recover.

### 7. Set up backup integrity verification

**Asteris → Backups → Integrity → Auto-Verify**

- ✓ **SHA-256 checksum verification** — verifies the archive at the destination matches the locally-computed checksum (catches transmission corruption)
- ⚙️ **Test restore to sandbox** — every Nth backup auto-restored to a sandbox URL and tested for boot success; failures alert via email (more aggressive but resource-intensive)

For most sites, checksum verification is enough. Test restore is overkill unless you have very strict SLA requirements.

### 8. Set up failure alerts

**Asteris → Backups → Notifications**

- **Alert on backup failure** — email recipient (default: admin email)
- **Alert on missed schedule** — if a scheduled backup didn't run within X hours of its scheduled time
- **Alert on storage approaching quota** — if the destination is filling up

Test the alerts by intentionally failing a backup (e.g., wrong credentials on a test destination). You should get an email within 5 minutes.

### 9. (Optional) Add a second destination for redundancy

Once the primary is working, add a second destination — different cloud provider, different region:

- Primary: R2 us-east (Cloudflare)
- Secondary: Wasabi eu-west or S3 ap-southeast-2

Configure the same schedule to push to BOTH destinations. Doubles storage cost but gives you geographic redundancy — if Cloudflare R2 has an outage, you still have Wasabi.

For most sites, this is overkill. For mission-critical sites, it's the standard pattern.

### 10. Document your recovery plan

This isn't a software step. Write down:

- Where the encryption key is stored (password manager + which entry name)
- Which destination is primary, which is secondary (if any)
- The staging URL you tested restore on
- The hosting account credentials needed to provision a new WordPress install if the current one dies
- Who in your team knows the recovery procedure

Store this somewhere accessible from your phone (in case your laptop is part of the disaster). Print a copy and put it with your hosting paperwork.

---

## Common workflows

### Switch from UpdraftPlus to Asteris (forward-only)

UpdraftPlus and Asteris use different backup formats. You can't restore an UpdraftPlus archive with Asteris. Migration is forward-only:

1. Install Asteris + activate Backups + Migration
2. Configure Asteris with the SAME destination as UpdraftPlus (using a different folder within the destination)
3. Run Asteris's first backup; verify
4. Restore Asteris backup to staging; verify (step 6 of Quickstart)
5. Set Asteris's schedule + retention
6. **UpdraftPlus → Settings → Schedule → Manual** (stops UpdraftPlus auto-running; doesn't delete its archives)
7. After 30 days of clean Asteris operation, deactivate UpdraftPlus
8. After 60 days, delete UpdraftPlus + its archives

Full walkthrough at [/migrate/from-updraftplus](/asteris-utility-suite/migrate/from-updraftplus/).

### Restore from a specific backup to current site

When the live site is broken and you need to roll back:

1. **Asteris → Backups → Restore** → select the backup
2. **Restore to** — Current site
3. **Encryption key** — paste from password manager
4. **What to restore** — Database / Files / Both (default Both)
5. **Per-folder exclusions** — exclude active sessions, recent uploads if you want to preserve them
6. **Confirm**: ✓ I have a recent backup of the CURRENT state in case this restore makes things worse
7. Click **Restore**

Asteris takes the current site offline (maintenance page), restores the backup, runs URL rewriting (it's a no-op when the source/destination URLs match), brings the site back up.

For a 1 GB site this takes 5-15 minutes wall-clock.

### Run a cross-site migration

Moving a site from one host to another:

**On the source host:**

1. Install Asteris + run a backup
2. Verify the backup is at the destination
3. Note the backup ID + encryption key

**On the destination host:**

1. Install WordPress
2. Install Asteris + activate Backups + Migration module
3. **Asteris → Backups → Destinations** → add the same destination (read access only is sufficient)
4. **Asteris → Backups → Restore** → pick the backup by ID → **Restore to**: Current site
5. Paste the encryption key
6. **Target URL** — the new site's URL
7. Restore

URL rewriting handles the domain change. Database, files, settings, content — all migrate. Re-test logins, forms, payment flows, anything sensitive.

> ⚠️ **DNS cutover** — change DNS to point at the new host only AFTER you've verified the new host's installation works. Test by adding the new host's IP to your local `/etc/hosts` file with the production domain before changing DNS.

### Per-folder restore (restore a single deleted plugin)

If you accidentally deleted a plugin folder + want to recover only that:

1. **Asteris → Backups → Restore** → select the backup
2. **Restore mode** — Per-folder
3. **Path to restore** — `wp-content/plugins/the-plugin-name/`
4. Confirm

Asteris restores only that folder from the backup, leaving everything else untouched.

### Per-table restore (recover deleted content)

If a database table got truncated or rows were deleted:

1. **Asteris → Backups → Restore** → select the backup
2. **Restore mode** — Per-table
3. **Tables to restore** — `wp_posts` (or whichever)
4. Confirm

The selected tables are dropped + recreated from the backup. Other tables untouched.

### Rotate the encryption key

Periodically (e.g., annually, or after a security incident) you should rotate the encryption key:

1. **Asteris → Backups → Encryption → Rotate Key**
2. Asteris generates a new key + shows it
3. Copy to your password manager (alongside the old key, marked as "previous")
4. Click **Re-encrypt existing backups** — Asteris decrypts each archive with the old key, re-encrypts with the new key
5. Or, if you don't want to re-encrypt history: keep the old key for restoring old backups; new backups encrypt with the new key

Old backups encrypted with the previous key are restorable as long as you keep both keys in your password manager.

### Set up incremental backups for large sites

For sites > 5 GB, full daily backups are wasteful:

**Asteris → Backups → Schedule → Edit your schedule**

- **Type** — Incremental
- **Full backup frequency** — Weekly (every Sunday 03:00)
- **Incremental frequency** — Daily 03:00 (mon-sat)
- **Retention** — keep 4 full backups (last month of weekly fulls) + 7 incrementals (the last week)

Asteris does:

- Sunday: full backup (everything)
- Mon-Sat: only files that changed since the last incremental + the database

To restore, Asteris reconstructs the state by applying the most-recent full + all subsequent incrementals up to the target point.

### Diagnose a failing backup

If backups are failing repeatedly:

1. **Asteris → Backups → History** → click the failed row → see **Error log**
2. Common failures:
   - **Connection timeout** — destination unreachable; check credentials + network
   - **Permission denied** — destination credentials don't have write access
   - **Disk full** at destination — increase quota or rotate older backups out
   - **Quota exceeded** at destination — same
   - **WordPress timeout** — backup takes longer than `max_execution_time`; bump it in `wp-config.php` or use WP-CLI
   - **Encryption key mismatch** — rare; happens if WP database was restored from an older state where the key was different. Use the off-site key.

3. After fixing: **Run Backup Now** → manually retry

### Run backups from WP-CLI (bypass admin)

When the admin is slow / inaccessible:

```bash
# Run scheduled backup
wp asteris backups run

# Run specific schedule by name
wp asteris backups run --schedule=daily

# List recent backups
wp asteris backups list --limit=10

# Restore from CLI
wp asteris backups restore --id=<backup_id> --target-url=https://staging.example.com

# Verify checksum
wp asteris backups verify --id=<backup_id>
```

Useful for cron-triggered backups, server-side scripting, debugging.

---

## Settings reference

### Destinations

- **Amazon S3** — Access key + Secret + Region + Bucket + Path
- **Backblaze B2** — Application Key ID + Secret + Bucket + Path
- **Cloudflare R2** — Access key ID + Secret + Bucket + Path (S3-compatible)
- **Wasabi** — Access key + Secret + Region + Bucket + Path
- **SFTP** — Host + Port + Username + SSH key/password + Remote path
- **Local** — Path on the same host (NOT recommended for production)

Multiple destinations per schedule (push to N destinations simultaneously).

### Schedule

- **Frequency** — Hourly / Daily / Weekly / Monthly
- **What to back up** — Database / Files / Both
- **Retention** — Keep last N + rotation policy (GFS, simple, custom)
- **Per-folder exclusions** — regex patterns for paths to skip
- **Per-table exclusions** — DB tables to skip (e.g., large session tables)
- **Incremental mode** — after first full, only changes uploaded

### Encryption

- **Method** — AES-256-CBC at rest
- **Key generation** — Asteris-generated, displayed for off-site save
- **Key rotation** — admin trigger to generate a new key + optionally re-encrypt history

### Restore

- **Target** — Current site / Staging URL / New site
- **Mode** — Full / Per-folder / Per-table
- **URL rewriting** — automatic during restore
- **Encryption key entry** — must match the key that encrypted the backup

### Verification

- **SHA-256 checksum** — auto on every backup
- **Test restore to sandbox** — every Nth backup
- **Integrity report** — admin view of recent verifications

### Notifications

- **Backup failure** — email recipient
- **Missed schedule** — alert if cron didn't fire
- **Storage approaching quota**

---

## REST API

```
# Schedules
GET    /wp-json/asteris/v1/backups/schedules
POST   /wp-json/asteris/v1/backups/schedules
PUT    /wp-json/asteris/v1/backups/schedules/<id>
DELETE /wp-json/asteris/v1/backups/schedules/<id>

# Run
POST   /wp-json/asteris/v1/backups/run                  # body: { schedule_id? }
GET    /wp-json/asteris/v1/backups/run/status

# History
GET    /wp-json/asteris/v1/backups/history
GET    /wp-json/asteris/v1/backups/history/<id>
DELETE /wp-json/asteris/v1/backups/history/<id>

# Restore
POST   /wp-json/asteris/v1/backups/restore
       body: { backup_id, target: "current|staging|new", target_url?, key, mode, paths? }

# Destinations
GET    /wp-json/asteris/v1/backups/destinations
POST   /wp-json/asteris/v1/backups/destinations
PUT    /wp-json/asteris/v1/backups/destinations/<id>
DELETE /wp-json/asteris/v1/backups/destinations/<id>
POST   /wp-json/asteris/v1/backups/destinations/<id>/test

# Verify
POST   /wp-json/asteris/v1/backups/verify/<backup_id>
```

All write endpoints capability-checked (`manage_options`).

---

## WP-CLI

```bash
# Run
wp asteris backups run
wp asteris backups run --schedule=daily
wp asteris backups run --destination=r2-primary

# List
wp asteris backups list
wp asteris backups list --status=successful --since="7 days ago"

# Restore
wp asteris backups restore --id=<backup_id>
wp asteris backups restore --id=<id> --target-url=https://staging.example.com
wp asteris backups restore --id=<id> --mode=per-table --tables=wp_posts,wp_postmeta

# Verify
wp asteris backups verify --id=<backup_id>

# Destinations
wp asteris backups destinations list
wp asteris backups destinations test --name=<destination_name>

# Migrate
wp asteris backups migrate --to-url=https://newhost.example.com --id=<backup_id>
```

---

## See also

- [Tutorial: Scheduled backups to Cloudflare R2](/asteris-utility-suite/docs/tutorials/set-up-scheduled-backups-to-cloudflare-r2/)
- [Asteris vs UpdraftPlus comparison](/asteris-utility-suite/vs/updraftplus/)
- [Migrate from UpdraftPlus](/asteris-utility-suite/migrate/from-updraftplus/)
- [Recovery / safe mode](/asteris-utility-suite/docs/recovery/) — when restore alone isn't enough
- [Data handling (GDPR)](/asteris-utility-suite/docs/data-handling/) — backup archives + GDPR considerations
