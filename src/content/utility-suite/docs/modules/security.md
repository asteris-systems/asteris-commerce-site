---
title: "Configure Security + Login + 2FA"
description: "Step-by-step setup of the Asteris Security + Login + 2FA module: brute-force protection, TOTP + WebAuthn passkey 2FA, file-change monitoring, IP geofence. Quickstart in 10 minutes."
sidebar:
  order: 1
---

# Configure the Security + Login + 2FA module

For the marketing overview of this module, see [/modules/security](/asteris-utility-suite/modules/security/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

---

## Quickstart (10 minutes)

The minimum-viable security baseline for a fresh WordPress install. Do these in order; each step is independent so you can stop after step 4 (the high-leverage half) and finish the rest later.

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Security + Login + 2FA** to ON.

The Security submenu appears under Asteris.

### 2. Set the brute-force lockout threshold

**Asteris → Security → Brute Force**

Defaults are sane for most sites:

- **Failed-attempt threshold:** 5 (stops attackers; gives real users some leeway)
- **Lockout duration:** 1 min → 5 min → 15 min → 1 hour (progressive)
- **Per-IP, not per-username** (default — stops credential stuffing where attackers cycle usernames)

Click **Save**. The module starts logging failed logins immediately.

> ⚠️ **If you also run Wordfence**, disable Asteris's brute-force protection here and let Wordfence handle it (or vice versa — pick one). Running both creates duplicate lockout logic.

### 3. Enable 2FA — both TOTP and WebAuthn

**Asteris → Security → 2FA**

Toggle ON:

- ✓ **TOTP** (Google Authenticator / 1Password / Authy compatible) — backwards-compatible, works on any device
- ✓ **WebAuthn passkeys** (Touch ID, Face ID, Windows Hello, YubiKey) — phishing-resistant, the modern default

Click **Save**.

### 4. Enroll YOUR account in 2FA

This is the most important step. Don't skip it.

Go to **Users → Profile → 2FA Setup**.

#### Set up a passkey first (recommended)

1. Click **Add passkey**
2. Your browser prompts for biometric (Touch ID / Face ID / Windows Hello) or a hardware key (YubiKey)
3. Confirm — the passkey enrolls
4. **Add at least one more passkey** on a different device (your phone if your laptop was first, or vice versa)

#### Set up TOTP as a backup

1. Click **Add TOTP authenticator**
2. Scan the QR with 1Password / Google Authenticator / Authy
3. Enter the 6-digit code from the app to confirm enrollment

#### Save the backup codes

After 2FA is set up, Asteris generates 8 one-time backup codes. **Copy them into your password manager.** These are your last-resort recovery if you lose every device.

#### Test the flow before you log out

1. Open an incognito window
2. Go to `yoursite.com/wp-admin`
3. Enter username + password
4. The 2FA challenge appears — confirm via passkey or TOTP code
5. You should land in WP Admin

**If the flow works**, log out of your normal session and log back in normally. If something's broken, your normal session is still active — you can fix the 2FA config before locking yourself out.

### 5. Enforce 2FA for all administrators (multi-user sites)

**Asteris → Security → 2FA → Enforcement**

Set **Required for: Administrator** (and Editor if you have an editorial team).

Users without 2FA enrolled will be prompted to enroll on their next login. Old sessions stay valid; new sessions hit the enrolment wall.

> 💡 **Roll-out tip:** announce the 2FA requirement to your team 24 hours before flipping this switch. The enrolment takes 60 seconds but is unfriendly to surprise.

### 6. Hide / rename `wp-login.php` (optional)

**Asteris → Security → Login → Hide wp-login**

Set a custom slug — e.g., `/secure-entry` — and click **Save**.

`yoursite.com/wp-login.php` will now 404 (or redirect to the homepage, configurable). The new path is `yoursite.com/secure-entry`.

**Bookmark the new path immediately.** If you lose it, recovery requires WP-CLI or SFTP access.

> ⚠️ This stops 99% of bot login attempts (they all hit `wp-login.php`) but is not a substitute for 2FA — sophisticated attackers find the custom slug from your sitemap, robots.txt, or `wp-admin` redirects. Use it on top of 2FA, not instead.

### 7. Kill XML-RPC (if you don't use it)

**Asteris → Security → Login → XML-RPC**

Toggle **Disable XML-RPC** to ON.

XML-RPC is the legacy WordPress API that bots love (it allows hundreds of password attempts per HTTP request, which bypasses normal rate limiting). Modern WordPress sites rarely need it. Disable unless you specifically use:

- **Jetpack** (uses XML-RPC)
- **The WordPress mobile apps**
- **Pingbacks / trackbacks** (mostly spam anyway)

If you're not sure, disable it and watch for breakage for a week — re-enable if anything breaks.

### 8. Configure IP geofence (optional)

**Asteris → Security → Geofence**

If you don't operate in certain countries, block them at the WP layer:

1. Select **Block traffic from:** check boxes for countries you don't serve
2. **Whitelist your office IP** under Asteris → Security → Geofence → Allowlist

Asteris uses MaxMind GeoIP for country detection. Default action on a geofence hit is **block at the login page** (so attackers can't probe credentials) — homepage + content still serves.

### 9. Run the baseline file-change scan

**Asteris → Security → File Monitor → Run baseline scan**

This takes 30 seconds to a few minutes depending on site size. Asteris records a SHA-256 checksum of every file in `wp-admin/`, `wp-includes/`, and your active theme/plugins.

Subsequent daily scans compare against this baseline. Any unexpected change (uploaded malware, defaced theme file, plugin file replaced) triggers an alert to the admin email.

### 10. Set the alert email

**Asteris → Security → Notifications**

Confirm the **Alert email** matches the inbox you actually watch. Default is the WP Admin email; override if you want security alerts routed to a different mailbox (e.g. `security@yourdomain.com`).

You're done. The site now has brute-force protection, passkey 2FA, hardened login, XML-RPC closed, and file-change monitoring with daily alerts.

---

## Common workflows

### Migrate from Wordfence to Asteris (run side-by-side)

Most sites running Wordfence Premium should **add Asteris alongside** rather than replace — Wordfence's malware scanner + WAF are the value, and Asteris adds passkey 2FA + 10 other modules. See the dedicated walkthrough at [/migrate/from-wordfence](/asteris-utility-suite/migrate/from-wordfence/).

The 30-second version:

1. Install Asteris, activate the Security module
2. **Disable Asteris's brute-force protection** (Wordfence is doing it)
3. **Disable Wordfence's 2FA** (Asteris is doing it — because passkeys)
4. Leave both file-change monitors running — pick one to receive alerts; silence the other

### Add a YubiKey or hardware passkey

1. WP Admin → **Users → Profile → 2FA Setup → Add passkey**
2. Insert your YubiKey into a USB port (or hold a NFC YubiKey to your phone)
3. Browser prompts for the key tap
4. Tap the key (the gold contact on a USB YubiKey, the centre disc on a Yubico YubiKey 5)
5. The passkey enrolls and appears in your passkey list

Asteris supports unlimited passkeys per user. Common pattern: phone (Face ID) + laptop (Touch ID) + YubiKey (backup) = three devices, any one of which can log you in.

### Set up an IP allowlist for your office

Per-IP allowlisting bypasses the brute-force lockout for trusted IPs. Useful if your team works from a known office IP and you want zero friction.

**Asteris → Security → Brute Force → IP Allowlist**

Add IPs one per line:

```
203.0.113.42
198.51.100.0/24
```

CIDR notation supported. Comments after `#` ignored.

> ⚠️ Allowlist IPs **never** get locked out, but they still hit 2FA. Don't add your home IP unless you're OK with that household being unable to brute-force lockout — defeats the protection.

### Lock yourself out — and how to recover

Three recovery paths, in order of "use first":

#### A. Backup codes (you saved them when you set up 2FA — right?)

At the 2FA challenge screen, click **Use a backup code**. Enter one of the 8 codes from your password manager. Each code works once. Replenish the pool by going to Profile → 2FA Setup → **Regenerate backup codes** afterwards.

#### B. WP-CLI (if you have SSH access)

```bash
wp asteris security 2fa reset --user=admin
```

Removes 2FA from the named user. They can log in with password only, then re-enroll.

#### C. Database reset (if you have phpMyAdmin or DB access)

Delete the rows from `wp_usermeta` where `meta_key` starts with `_asteris_2fa_`. The user no longer has 2FA configured.

If none of these are available — you've lost SSH, DB access, and your backup codes — email `support@asteriscommerce.com` with proof of site ownership (registrar WHOIS, hosting account login, recent invoice). Recovery requires us to coordinate with you via your hosting provider's file-manager.

### Find out who hit the brute-force lockout

**Asteris → Security → Failed Login Log** shows every failed attempt with IP, attempted username, timestamp, and outcome (lockout / passed-through). Filter by date range or IP.

The Activity Log module (if installed) captures lockout events too — they show up in the unified audit trail with one-click revert ("unlock this IP").

### Disable brute-force lockout for a specific user (account-recovery)

If a real user has been locked out (e.g., they fat-fingered their password 6 times in a row):

1. **Asteris → Security → Active Lockouts**
2. Find the IP + username pair
3. Click **Clear lockout**

They can immediately try again. Or via WP-CLI:

```bash
wp asteris security lockouts clear --ip=203.0.113.42
```

---

## Settings reference

### Brute-force protection

**Asteris → Security → Brute Force**

- **Threshold** — number of failed login attempts before lockout (default 5)
- **Lockout duration** — progressive: 1 min / 5 min / 15 min / 1 hour
- **IP allowlist** — comma-separated list of IPs / CIDR ranges exempt from lockout
- **Disable for site** — toggle off if running Wordfence's brute-force protection in parallel

### 2FA

**Asteris → Security → 2FA**

- **Enable TOTP** — toggle on; users enroll via Profile → 2FA Setup
- **Enable WebAuthn passkeys** — toggle on; users enroll devices via Profile
- **Per-role enforcement** — require 2FA for Administrators, Editors, Authors, etc.
- **Backup codes** — auto-generated 8-code pool on enrollment
- **Trusted device window** — bypass 2FA for 30 days after first 2FA login (configurable; set to 0 for always-prompt)

### Login hardening

**Asteris → Security → Login**

- **Hide / rename `wp-login.php`** — set custom slug
- **XML-RPC kill switch** — disable XML-RPC endpoint
- **Application Passwords audit** — list active App Passwords; revoke unused
- **Custom login error messages** — return generic "credentials don't match" rather than disclosing username existence

### File-change monitoring

**Asteris → Security → File Monitor**

- **Scheduled scan** — daily by default; checksum comparison against the baseline
- **Alert email** — recipient for change notifications
- **Exclude paths** — directories to skip (e.g., `wp-content/cache/`, `wp-content/uploads/asteris-snapshots/`)

### IP geofence

**Asteris → Security → Geofence**

- **Country allow/block list** — uses MaxMind GeoIP
- **Block specific IPs** — comma-separated or CIDR
- **Allow specific IPs** — always-allow list (overrides block + geofence)

---

## REST API

All endpoints are authenticated and capability-checked (`manage_options`).

```
GET    /wp-json/asteris/v1/security/status
POST   /wp-json/asteris/v1/security/lockouts/clear
GET    /wp-json/asteris/v1/security/file-monitor/last-scan
POST   /wp-json/asteris/v1/security/file-monitor/run-baseline
GET    /wp-json/asteris/v1/security/2fa/users         (admin only — list users with 2FA configured)
POST   /wp-json/asteris/v1/security/2fa/users/<id>/reset (admin only)
GET    /wp-json/asteris/v1/security/failed-logins?from=<date>&to=<date>
```

Full schemas at [/docs/api-reference](/asteris-utility-suite/docs/api-reference/).

---

## WP-CLI

```bash
# Status + monitoring
wp asteris security status
wp asteris security file-monitor scan
wp asteris security file-monitor baseline-refresh

# 2FA admin
wp asteris security 2fa reset --user=<id>           # remove 2FA from a user
wp asteris security 2fa list-users                  # list users with 2FA configured
wp asteris security 2fa backup-codes --user=<id>    # regenerate backup codes

# Lockout admin
wp asteris security lockouts list
wp asteris security lockouts clear                   # clear all
wp asteris security lockouts clear --ip=<ip>         # clear one IP
wp asteris security lockouts clear --user=<username> # clear one user

# IP rules
wp asteris security ip-block --ip=<ip>
wp asteris security ip-allow --ip=<ip>
wp asteris security ip-rules list
```

---

## See also

- [Asteris vs Wordfence comparison](/asteris-utility-suite/vs/wordfence/) — when to run side-by-side vs replace
- [Migrate from Wordfence](/asteris-utility-suite/migrate/from-wordfence/) — step-by-step alongside / migration
- [WordPress 2FA setup guide](/asteris-utility-suite/guides/wordpress-2fa-setup/) — TOTP vs passkeys explained
- [Activity Log + Site Health](/asteris-utility-suite/docs/modules/activity-log/) — security events also land here with per-event Undo
