---
url: /asteris-utility-suite/modules/security
title: "WordPress Security Plugin — Asteris Security + Login + 2FA (Passkeys, Lightweight)"
description: "Asteris Security + Login + 2FA is a lightweight WordPress security plugin with brute-force protection, TOTP + WebAuthn passkey 2FA, file-change monitoring, IP geofence, hide wp-login, XML-RPC kill switch. Bundled with 10 other modules from $149/yr."
og_title: "Asteris Security — Lightweight, Passkey 2FA, Bundled"
og_description: "Brute-force protection, passkeys, file-change monitor, geofence. Run alongside Wordfence or replace it entirely."
canonical: https://asteriscommerce.com/asteris-utility-suite/modules/security
primary_keyword: wordpress security plugin
secondary_keywords:
  - wordpress 2fa
  - wordpress passkey login
  - wordpress webauthn 2fa
  - wordpress brute force protection
  - hide wp-login plugin
schema_type: SoftwareApplication
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: security
internal_links_out:
  - /asteris-utility-suite/vs/wordfence
  - /asteris-utility-suite/vs/sucuri
  - /asteris-utility-suite/migrate/from-wordfence
  - /asteris-utility-suite/pricing
verified_date: 2026-06-04
---

# WordPress Security Plugin — Asteris Security + Login + 2FA

**What does a WordPress security plugin actually do?** Three jobs: (1) **stop attackers from logging in** (brute-force protection, 2FA, account lockout, IP blocking), (2) **detect intrusions when they happen** (file-change monitoring, malware scanning, anomaly detection), and (3) **harden the WordPress surface** (hide wp-login, disable XML-RPC, restrict Application Passwords, audit user capabilities). The two heavyweights in this market — **Wordfence** and **Sucuri** — also ship a **Web Application Firewall (WAF)** layer; Asteris does not (Asteris assumes you have a WAF in front of WordPress, like Cloudflare or your host's).

**Does Asteris support WordPress passkeys (WebAuthn)?** Yes — Asteris Security includes both **TOTP** (Google Authenticator / 1Password / Authy) **and WebAuthn passkey** 2FA. Wordfence and most other security plugins still gate 2FA to TOTP only. Passkeys are phishing-resistant in a way TOTP isn't, which is why most security teams now recommend them as the default.

**Can I run Asteris alongside Wordfence?** Yes. They don't conflict at the plugin level. Most paid Wordfence users add Asteris for the passkey 2FA + the other 10 modules, keeping Wordfence's malware scanner and WAF. The one rule: don't enable both plugins' brute-force protection simultaneously — pick one. [Full comparison →](/asteris-utility-suite/vs/wordfence/)

---

## The complete feature set

### Login hardening

- **Brute-force protection** with progressive lockout (1 min → 5 min → 15 min → 1 hour)
- **Hide / rename `wp-login.php`** to a custom slug (`/secure-entry`, etc.)
- **XML-RPC kill switch** (one toggle to disable the legacy XML-RPC endpoint that attackers love)
- **Application Passwords audit** — list every active App Password with last-used date; revoke unused ones
- **Login URL whitelisting** — restrict `wp-login.php` access to specific IP ranges or VPN exits
- **Custom login error messages** — return generic "credentials don't match" rather than "user not found" / "wrong password" (reduces username enumeration)

### Two-factor authentication

- **TOTP** — works with Google Authenticator, 1Password, Authy, Microsoft Authenticator, or any standard TOTP app
- **WebAuthn / passkeys** — phishing-resistant biometric or hardware-key 2FA (Touch ID, Face ID, Windows Hello, YubiKey)
- **Per-role enforcement** — require 2FA for administrators / editors / authors / specific roles
- **Backup codes** — one-time codes for account recovery
- **2FA bypass for trusted devices** (30-day remember)

### Intrusion detection

- **File-change monitoring** — daily checksum scan of wp-admin, wp-includes, and active themes/plugins; alerts on any unexpected change
- **Plugin / theme integrity check** — compares installed files to the WordPress.org canonical version; flags drift
- **Activity Log integration** — every failed login, locked account, 2FA challenge appears in the [Activity Log](/asteris-utility-suite/modules/activity-log/)

### IP allow/block + country geofence

- **Block specific IPs** or CIDR ranges
- **Whitelist specific IPs** (your office, your VPN, etc.)
- **Country geofence** — block traffic from countries you don't operate in (uses MaxMind GeoIP)
- **Auto-block on N failed logins from same IP**

### What this module does NOT do (intentionally)

- **No WAF.** Asteris assumes you have one in front of WordPress (Cloudflare, your host's WAF, Sucuri at the DNS level). Asteris is the WordPress-layer hardening; the WAF is the perimeter.
- **No real-time malware signature scanner.** Wordfence's in-house signature database is one of the best in the market — we don't replicate it. The file-change monitor catches *malware after it lands*, which is a different (complementary) detection model.
- **No real-time threat feed.** Wordfence Premium's threat feed is a paid commercial product they invest heavily in. If you need that, keep Wordfence.

This module is the **lightweight, modern, bundled** WordPress security layer. For the heavyweight + WAF + signature scanner stack, **run both Asteris and Wordfence side-by-side** — Asteris adds passkeys + the 10 other modules, Wordfence keeps its WAF + scanner.

---

## When this module is the right choice

- You're behind a WAF already (Cloudflare, host-level) and Wordfence's WAF is duplicative
- You want passkey login that Wordfence and most other security plugins don't ship yet
- You want security + the other 10 plugins a WordPress site needs in one bundle
- Your site isn't a primary target for sophisticated attackers (most WordPress sites aren't — the attacker volume is automated brute force, which the login hardening above stops)

---

## Frequently asked questions

**What is the best WordPress security plugin?**
Depends on threat model. **Wordfence Premium** is best-in-class for malware signature scanning + WAF + threat feed. **Sucuri** is best for DNS-level WAF and incident response. **Asteris Security** is the lightweight, modern layer with passkey 2FA — best when you already have a WAF and want bundled value.

**Does Asteris support WordPress passkeys (WebAuthn)?**
Yes — both WebAuthn passkeys (Touch ID, Face ID, Windows Hello, YubiKey) and TOTP (Google Authenticator etc.). Wordfence gates passkeys to its premium tier in some configurations; Asteris includes them at the Starter tier.

**Will Asteris stop brute-force attacks?**
Yes — progressive lockout, IP allow/block, country geofence, and Application Passwords audit. The login hardening stack matches Wordfence's at the brute-force layer. For DDoS-scale attacks, you need a WAF in front of WordPress (Cloudflare, your host).

**Can I run Asteris and Wordfence together?**
Yes. Don't enable both plugins' brute-force protection simultaneously (pick one). All other features (file monitoring, 2FA, login hardening, WAF) can run in parallel without conflict.

**Does Asteris scan for malware?**
File-change monitoring (which catches malware after it lands), not signature-based real-time scanning. For active malware scanning, Wordfence, MalCare, or Patchstack are the right tools — run them alongside Asteris.

---

[Asteris vs Wordfence →](/asteris-utility-suite/vs/wordfence/) · [Migrate from Wordfence →](/asteris-utility-suite/migrate/from-wordfence/) · [Pricing →](/asteris-utility-suite/pricing/)
