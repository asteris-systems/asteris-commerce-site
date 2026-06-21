---
url: /asteris-utility-suite/guides/wordpress-2fa-setup
title: "WordPress 2FA Setup — TOTP vs Passkeys (WebAuthn) for 2026"
description: "Step-by-step WordPress 2FA setup: TOTP (Google Authenticator) vs WebAuthn passkeys (Touch ID, Face ID, YubiKey). Which to choose, how to enforce per-role, how to recover access if you lose your second factor."
og_title: "WordPress 2FA Setup — TOTP vs Passkeys"
og_description: "TOTP vs passkeys. Per-role enforcement. Recovery codes. Step-by-step setup."
canonical: https://asteriscommerce.com/asteris-utility-suite/guides/wordpress-2fa-setup
primary_keyword: wordpress 2fa
secondary_keywords:
  - wordpress two factor authentication
  - wordpress passkey login
  - wordpress webauthn 2fa
  - wordpress totp setup
schema_type: HowTo
faq_schema: true
ai_bot_policy: allow-citation-class
pillar: security
internal_links_out:
  - /asteris-utility-suite/modules/security
  - /asteris-utility-suite/vs/wordfence
verified_date: 2026-06-04
---

# WordPress 2FA Setup — TOTP vs Passkeys

**What is WordPress 2FA?** Two-Factor Authentication (2FA) requires **two pieces of evidence** to log in — typically your password plus a one-time code or biometric confirmation. A leaked password alone isn't enough to access the account. For WordPress, 2FA is the single highest-leverage security upgrade most sites can make: it stops 99%+ of credential-stuffing and brute-force attacks.

**TOTP vs WebAuthn passkey — which should I use?**

- **TOTP** (Time-based One-Time Password) — the 6-digit code from Google Authenticator, 1Password, Authy, etc. Works with any TOTP-compatible app. Easy setup, broadly supported.
- **WebAuthn passkey** — phishing-resistant biometric or hardware-key 2FA. Touch ID, Face ID, Windows Hello, YubiKey. Modern, more secure than TOTP (passkeys can't be phished even by a convincing fake login page), but newer and slightly less broadly supported.

**Recommendation:** use **passkeys** as your primary 2FA. Fall back to **TOTP** for devices/users where passkeys aren't supported. Most modern security plugins (including [Asteris Security](/asteris-utility-suite/modules/security/)) support both.

---

## Step-by-step: TOTP setup in WordPress

### 1. Install a 2FA-capable security plugin

Pick one: **Asteris Security** (recommended — supports TOTP + WebAuthn passkeys), **Wordfence Login Security**, **WP 2FA** (Melapress), **Two-Factor** (free, by WordPress core contributors).

### 2. Enable TOTP

Asteris example: WP Admin → **Asteris → Security → 2FA** → enable TOTP → save.

### 3. Set up TOTP on your user account

Each user enrolls separately:

1. Profile page → **2FA Setup**
2. Scan the QR code with Google Authenticator / 1Password / Authy / your password manager
3. Enter the 6-digit code from the app to confirm
4. Save backup codes (one-time recovery codes for if you lose the device) — store these in a password manager

### 4. Optional: enforce 2FA for specific roles

For team sites: **Asteris → Security → 2FA → Enforcement** → require 2FA for Administrators (and optionally Editors, etc.). Users without 2FA set up will be prompted to enroll on next login.

### 5. Test logout + login

Critical step. Log out, log back in, verify you're prompted for the TOTP code. Confirm the 6-digit code from your authenticator app works.

---

## Step-by-step: WebAuthn passkey setup

### 1. Verify your security plugin supports passkeys

[Asteris Security](/asteris-utility-suite/modules/security/) supports WebAuthn passkeys. Wordfence Login Security as of 2026 supports TOTP only. **Two-Factor** plugin supports WebAuthn.

### 2. Enable passkeys in the plugin

Asteris example: WP Admin → **Asteris → Security → 2FA → WebAuthn** → enable → save.

### 3. Register a passkey on your user account

Profile page → **2FA Setup → Add passkey**:

- On Mac: Touch ID prompt appears; touch the sensor to enroll the passkey
- On iPhone: Face ID / Touch ID prompt appears
- On Windows: Windows Hello prompt (fingerprint, face, or PIN)
- On any device with a YubiKey or similar: USB security key prompt; tap the key to enroll
- On Android: device biometric or screen-lock prompt

The passkey is stored locally on the device (or synced via iCloud Keychain / 1Password / Bitwarden across devices). It is NOT sent to the WordPress site — only a public verification key is stored on the site.

### 4. Optional: register a second passkey on a different device

Recommended. If you lose your phone, you can still log in with a passkey on your laptop or a YubiKey.

### 5. Test logout + login

Same as TOTP — log out, log back in, verify the passkey prompt appears and works.

---

## What if I lose my 2FA device?

### Backup codes

When you set up 2FA, the plugin issues 8-10 one-time backup codes. **Save them in a password manager** (1Password, Bitwarden, etc.). If you lose your phone, use a backup code to log in, then re-enroll your 2FA on a new device.

### Multiple passkeys

If you registered passkeys on multiple devices (phone + laptop + YubiKey), losing one device still leaves you with working alternatives.

### Admin recovery

If you lose all 2FA factors and have no backup codes, an administrator on a different account can reset your 2FA from User Edit → Reset 2FA. If you're the only admin and you've locked yourself out, you'll need to reset via the database (deleting the 2FA usermeta rows) — this is the "break glass" path.

### WP-CLI recovery

`wp 2fa reset --user=admin` (Asteris exposes this WP-CLI command for emergency recovery via SSH).

---

## TOTP vs WebAuthn — detailed comparison

| Property | TOTP | WebAuthn passkey |
|---|---|---|
| Phishing resistance | Vulnerable (a fake login page can ask for the code and forward it) | Resistant (passkey only works on the real domain) |
| Setup | Scan QR with auth app | Biometric prompt or hardware key tap |
| Login | Type 6-digit code | Biometric or hardware key tap |
| Device requirements | Any phone with auth app | Modern OS / browser with WebAuthn support |
| Recovery | Backup codes | Backup codes, or multiple registered passkeys |
| Setup time | ~60 seconds | ~10 seconds |
| Browser support | All | ~98% of modern browsers |
| Mobile-friendly | Yes (with TOTP app) | Yes (Touch ID / Face ID native) |

For most users in 2026, passkeys are the better default with TOTP as the fallback for edge cases.

---

## Frequently asked questions

**Should I use TOTP or WebAuthn passkeys for WordPress 2FA?**
**WebAuthn passkeys** are more secure (phishing-resistant) and faster to use. **TOTP** has broader compatibility. Recommendation: use passkeys as primary, TOTP as fallback for devices/users where passkeys aren't supported.

**What apps work with WordPress TOTP?**
Any TOTP-compatible app: Google Authenticator, 1Password, Authy, Microsoft Authenticator, Bitwarden, Duo, etc. They all implement the same TOTP standard.

**Can I require 2FA for all WordPress users?**
Yes — most 2FA plugins (including [Asteris Security](/asteris-utility-suite/modules/security/)) support per-role enforcement. Require 2FA for Administrators at minimum; consider Editors and Authors if they edit content.

**Is WordPress core 2FA built in?**
No — WordPress core doesn't ship 2FA at the core level. The **Two-Factor** plugin is maintained by WordPress core contributors and is the closest to a canonical implementation. Most users prefer a security plugin (Asteris, Wordfence, etc.) that bundles 2FA with other features.

**What's the difference between passkeys and YubiKeys?**
**Passkeys** are stored locally on a device (phone, laptop, security key) and use the WebAuthn standard. **YubiKeys** are a brand of hardware security key that implements WebAuthn — they're one *form factor* of passkey. Other passkey form factors: Touch ID on Mac, Face ID on iPhone, Windows Hello on PC, biometric or PIN on Android.

---

[Security module →](/asteris-utility-suite/modules/security/) · [Asteris vs Wordfence →](/asteris-utility-suite/vs/wordfence/)
