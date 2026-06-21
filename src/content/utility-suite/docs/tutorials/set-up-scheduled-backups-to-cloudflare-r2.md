---
title: "Set up scheduled backups to Cloudflare R2"
description: "End-to-end Cloudflare R2 backup setup for WordPress: bucket creation, API credentials, Asteris configuration, encryption key management, restore-to-staging verification. Why R2 (zero egress fees) makes it the cheapest credible backup destination."
sidebar:
  order: 4
---

# Set up scheduled backups to Cloudflare R2

**Goal:** in ~25 minutes, your WordPress site backs up daily to Cloudflare R2 — encrypted at rest, retention-managed, verified by a successful restore to a staging URL. Total cost: ~$0.50/month for a 1GB site (R2's storage is $0.015/GB/month; egress is free).

**Asteris modules used:** Backups + Migration (paid tier)

**Why Cloudflare R2:**

- **Zero egress fees** — restore costs nothing in bandwidth (unlike S3, which charges $0.09/GB egress). For a site that restores quarterly, that's $0 vs $90/year on S3.
- **S3-compatible API** — uses the same protocol as S3; works with every backup tool that supports S3
- **Cheapest credible cloud storage** — ~50% cheaper than S3 on storage; ~80% cheaper than Wasabi at small scale
- **Reliable** — Cloudflare's infrastructure; backed by SLAs

Trade-offs vs S3:

- Newer service (R2 launched 2022); smaller third-party tooling ecosystem than S3
- Smaller region selection (US-East, EU-West, AP currently)
- No native lifecycle policies as of mid-2026 (Asteris handles retention application-side instead)

For most WordPress sites, R2 is the right choice. If you have strict compliance requirements requiring AWS (HIPAA Business Associate Agreement, SOC 2 attestations, etc.), use S3.

---

## Before you start

You need:

- **A paid Asteris Utility Suite licence** (Backups + Migration is a paid module)
- **A Cloudflare account** — free tier is sufficient for R2; you'll add R2 separately if not already enabled
- **Admin access** to both your WordPress site + your Cloudflare account
- **A password manager** — you'll store the R2 credentials + encryption key
- ~25 minutes
- **A staging URL** for the verification step (Step 9) — most managed WP hosts provide one; or use a subdomain like `staging.yoursite.com`

---

## Step 1 — Enable R2 on Cloudflare

If you don't already have R2 enabled on your Cloudflare account:

1. Log in to [dash.cloudflare.com](https://dash.cloudflare.com)
2. Left sidebar → **R2 Object Storage**
3. If it's your first time: **Get started** → confirm + add billing info (R2 requires a billing method on file even on the free tier)

R2's free tier includes 10 GB storage + 1M Class A operations per month + 10M Class B operations per month. For most single-site backups, you stay within the free tier indefinitely.

---

## Step 2 — Create a bucket

1. **R2 Object Storage** → **Create bucket**
2. **Bucket name** — `yoursite-asteris-backups` (lowercase, alphanumeric + hyphens; must be globally unique)
3. **Location hint** — pick the region closest to your WordPress server's region (reduces upload latency):
   - North America: `WNAM` (Western) or `ENAM` (Eastern)
   - Europe: `WEUR` (Western) or `EEUR` (Eastern)
   - Asia-Pacific: `APAC`
4. **Storage class** — Standard (R2 only has one tier currently)
5. **Click Create**

The bucket now exists at `yoursite-asteris-backups.<account-hash>.r2.cloudflarestorage.com`. You'll see it in the R2 buckets list.

---

## Step 3 — Generate API credentials

R2 uses S3-compatible API tokens. You need:

1. **R2 Object Storage** → **Manage API Tokens**
2. **Create API Token**
3. **Token name** — `asteris-backups-<sitename>`
4. **Permissions** — pick **Object Read & Write**
5. **Specify bucket(s)** — pick the bucket you created in Step 2 (NOT all buckets — principle of least privilege)
6. **Token TTL** — leave as "Forever" (or set 1-year if your security policy requires rotation; you'll need to update Asteris when the token expires)
7. **Create API Token**

You'll see a one-time display of:

- **Access Key ID** (looks like `b8b9...`)
- **Secret Access Key** (looks like `1a2b3c4d...`)

**Copy BOTH to your password manager immediately.** Cloudflare only shows the secret once. If you lose it, you'll need to regenerate the token.

Also note the **Use jurisdiction-specific endpoint** if you have data-residency requirements (EU-only endpoints available for EU jurisdictions).

The default endpoint format is: `https://<account-hash>.r2.cloudflarestorage.com`

---

## Step 4 — Activate Asteris's Backups + Migration module

WP Admin → **Asteris → Modules** → toggle **Backups + Migration** to ON.

---

## Step 5 — Add Cloudflare R2 as a destination

**Asteris → Backups → Destinations → Add Destination**

- **Type** — Cloudflare R2 (it's S3-compatible; pick the R2 preset for the right endpoint format)
- **Name** — `r2-primary` (for your reference)
- **Access Key ID** — paste from Step 3
- **Secret Access Key** — paste from Step 3
- **Bucket name** — `yoursite-asteris-backups` (from Step 2)
- **Path prefix** — `asteris-backups/` (Asteris stores backups under this prefix in the bucket)
- **Endpoint** — `<your-account-hash>.r2.cloudflarestorage.com` (Asteris auto-detects from your account hash)

Click **Test Connection**. Asteris attempts to write a small test file to the bucket, then read it back, then delete it.

If you see ✓ Connection successful, save. If you see an error, troubleshoot:

- **"Access Denied"** — token permissions wrong (need Object Read & Write); regenerate the token in Step 3
- **"Bucket not found"** — bucket name typo; check exact name in R2 → Bucket list
- **"Endpoint unreachable"** — usually a network firewall blocking outbound HTTPS to Cloudflare; check your hosting provider's egress rules

---

## Step 6 — Generate encryption key

**Asteris → Backups → Encryption → Generate encryption key**

Asteris generates a 256-bit AES key.

> 🔐 **CRITICAL: copy this key to your password manager NOW.**
>
> Without the key, encrypted backups cannot be restored. Asteris stores a copy in your WP database (encrypted itself with a hosting-derived key), but if your WP database is destroyed, the in-DB copy is gone too.
>
> The off-site copy in your password manager is your last line of defence.

Confirm `✓ I've saved the key off-site` to dismiss the dialog.

---

## Step 7 — Configure the schedule

**Asteris → Backups → Schedule → Add Schedule**

- **Name** — `Daily R2 backup`
- **Frequency** — Daily
- **Time** — 03:00 site-local (off-peak)
- **What to back up**:
  - ✓ Database
  - ✓ Files (uploads, themes, plugins, mu-plugins)
- **Destination** — `r2-primary` (the R2 destination you added in Step 5)
- **Encryption** — ON (uses the key from Step 6)
- **Retention** — Grandfather-Father-Son (GFS):
  - Keep last 7 daily backups
  - Keep last 4 weekly backups
  - Keep last 6 monthly backups
  - Older backups auto-purged
- **Incremental after first full** — ON (saves R2 storage; only changed files uploaded after initial full)
- **Send failure alert to** — admin email

Save.

---

## Step 8 — Run the first backup manually

**Asteris → Backups → Run Backup Now → r2-primary → Run**

Asteris kicks off the first full backup. Progress is shown in the dashboard. For a 1 GB site:

- Filesystem scan: ~30 seconds
- Compression: ~1-3 minutes (depends on CPU)
- Encryption: ~30 seconds
- Upload to R2: ~1-5 minutes (depends on connection speed — upload is bottlenecked by your hosting's outbound bandwidth)

When complete, verify:

1. **Asteris → Backups → History** — should show a row with status: ✓ Successful
2. The row shows: size, file count, destination, SHA-256 checksum, completion time
3. **Cloudflare dashboard → R2 → your bucket** — the bucket now contains files under the `asteris-backups/` prefix; you should see compressed + encrypted archive files

---

## Step 9 — Restore to staging (the verification step you mustn't skip)

A backup you've never restored is not a backup. It's hope.

If you don't already have a staging URL, get one before going further. Most managed hosting platforms have one-click staging:

- **Kinsta** → Settings → Staging → Create
- **WP Engine** → Sites → Staging
- **SiteGround** → Tools → Staging
- **Local by Flywheel / LocalWP** → for testing on your laptop
- **A subdomain** → `staging.yoursite.com` with a separate WordPress install

In Asteris → **Backups → Restore → r2-primary** → select the backup you just ran → **Restore to: Different URL** → enter the staging URL → **Encryption key**: paste from your password manager.

**Confirm both**: ✓ I have the encryption key saved ✓ Target URL is correct.

Click **Restore**.

Asteris pulls the encrypted archive from R2, decrypts with your key, pushes to the staging URL, and runs URL rewriting (everything that was `yoursite.com` becomes `staging.yoursite.com`).

For a 1 GB site, restore takes ~5-15 minutes. When complete, visit the staging URL — should look exactly like production but at the staging URL.

**This is your verified, working backup-and-restore cycle.** Production can die at any time and you know you can recover.

---

## Step 10 — Set up failure monitoring

The backup is configured + verified. Now monitor it:

**Asteris → Backups → Notifications**

- ✓ **Alert on backup failure** — recipient: admin email (default) or a dedicated `alerts@` mailbox
- ✓ **Alert on missed schedule** — if 03:00 cron didn't fire, alert within 2 hours
- ✓ **Alert on storage approaching quota** — alert when R2 free-tier 10 GB is 80% used

Test by intentionally breaking the credentials (set the wrong secret access key in the destination, then run backup). You should get an email within 5 minutes. After verifying alerts work, restore the correct credentials.

---

## Step 11 — Add a second destination (optional, for redundancy)

For mission-critical sites, single-destination backup is single-point-of-failure. Add a second destination in a different cloud:

1. **Asteris → Backups → Destinations** → add another (Wasabi, Backblaze B2, or S3)
2. **Asteris → Backups → Schedule** → edit your schedule → **Destinations**: tick both
3. Future backups push to BOTH destinations

Cost doubles, but you have geographic redundancy. If Cloudflare R2 has a regional outage, you can restore from the secondary.

For most sites, single-destination is fine. Add the second only if you have specific business continuity requirements.

---

## Maintenance — what to do over time

### Monthly

- **Asteris → Backups → History** — verify successful backups for the last 30 days. Look for any failed runs.
- **R2 dashboard** — verify storage usage is within expectations (a steady-state 1 GB site should hover around ~5-10 GB after rotation reaches steady state due to incremental + retention)

### Quarterly

- **Run another restore-to-staging** to verify the restore flow still works
- Update your hosting account credentials, encryption key location, recovery procedure documentation

### Annually

- **Rotate the encryption key**: Asteris → Backups → Encryption → Rotate Key → optionally re-encrypt history
- **Rotate the R2 API token** (if your security policy requires): regenerate in Cloudflare, update in Asteris destination settings

### When you change hosting

- Reconfigure Asteris on the new host with the same R2 destination + same encryption key
- Test a restore to the new host before pointing DNS

---

## Common issues

### "Asteris reports backup successful but the bucket is empty"

This is rare but happens if:

1. **The destination test passed but the actual write failed** — the test writes a tiny file (different bucket policy might allow tiny files but not large)
2. **Bucket region mismatch** — your account is in NA but bucket was created in EU; this can cause silent failures with some S3 SDKs. Verify region in Cloudflare → R2 → bucket settings.

**Fix:** Delete the destination in Asteris, re-add with the bucket's actual region/endpoint.

### "Restore fails with 'decryption failed'"

You're using the wrong encryption key. The key that encrypted the backup must match.

1. Check your password manager — do you have the key from when you set up the destination?
2. Was the key recently rotated? If yes, you need the OLD key for old backups (Asteris stores both old + new keys when you rotate, but they're listed separately in the encryption panel)

If the key is truly lost, encrypted backups are unrecoverable. This is why Step 6's "save off-site" step is critical.

### "R2 upload is slow"

R2 upload speed depends on:

1. Your hosting's outbound bandwidth (sometimes capped on shared hosting; check with hosting provider)
2. R2's regional ingress speed (pick a location hint closer to your hosting region)
3. The size of the backup (incremental mode keeps subsequent backups small; first full is the slowest)

If uploads consistently exceed 30 minutes for a 1 GB site, contact your hosting provider — they may have an outbound bandwidth limit you're hitting.

### "I exceeded R2's free tier"

R2 free tier: 10 GB storage + 1M Class A ops + 10M Class B ops/month.

For a 1 GB WordPress site with daily backups + 7-day retention + GFS: typical steady-state usage is ~5 GB storage + ~50k Class A ops + ~5M Class B ops.

If you exceed:

- **Storage**: $0.015/GB-month for the overage (so 20 GB = ~$0.30/month over free tier)
- **Class A ops**: $4.50 per million (uploads)
- **Class B ops**: $0.36 per million (reads)

For typical use, you stay free or pay <$1/month.

### "How do I delete old backups manually?"

Asteris's retention auto-rotates. To force-purge specific old backups:

```bash
wp asteris backups list --before="60 days ago"
wp asteris backups delete --id=<backup_id>
```

Or via admin: **Asteris → Backups → History** → select rows → **Delete selected**.

---

## See also

- [Backups + Migration module configuration](/asteris-utility-suite/docs/modules/backups/)
- [Asteris vs UpdraftPlus comparison](/asteris-utility-suite/vs/updraftplus/)
- [Migrate from UpdraftPlus](/asteris-utility-suite/migrate/from-updraftplus/)
- [Cloudflare R2 documentation](https://developers.cloudflare.com/r2/)
