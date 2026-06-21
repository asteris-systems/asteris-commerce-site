---
title: "Getting started with Asteris Utility Suite"
description: "How to install and configure Asteris Utility Suite. From download to first module active in under 10 minutes."
---
# Getting started with Asteris Utility Suite

Asteris Utility Suite installs like any other WordPress plugin. Free version: directly from WordPress.org. Paid tiers: download from your asteriscommerce.com account after purchase.

---

## Requirements

- WordPress 6.4 or later (tested up to 6.8)
- PHP 8.1 or later
- Minimum 128 MB PHP memory limit (256 MB recommended for large sites)
- Tested with: Astra, Kadence, GeneratePress, Blocksy, Hello Elementor, Twenty Twenty-Four, and major builders (Elementor, Bricks, Beaver Builder, Divi)

---

## Installing Asteris Utility Suite Free

1. In your WordPress admin, go to **Plugins → Add New**
2. Search "Asteris Utility Suite"
3. Click **Install Now**, then **Activate**
4. The **Asteris** menu item appears in your WP admin sidebar

No licence key needed for Asteris Utility Suite Free.

---

## Installing a paid tier (Starter, Pro, Agency)

1. After purchase, download the plugin ZIP from your asteriscommerce.com customer portal
2. In your WordPress admin, go to **Plugins → Add New → Upload Plugin**
3. Upload the ZIP and activate
4. Go to **Asteris → Licence** in your WP admin sidebar
5. Enter your licence key (sent by email on purchase)
6. Click **Activate Licence**

If Asteris Utility Suite Free is already installed, installing the paid tier upgrades it automatically. You don't need to deactivate the free version first.

### Upgrading from an old free install (legacy `*-lite` folder)

If you installed Asteris Utility Suite Free **before 19 June 2026**, the free edition lived in a separate `asteris-for-wordpress-lite/` folder with its own slug. From v1.0.1 onward, paid handles this migration automatically:

1. Upload the paid ZIP via **Plugins → Add New → Upload Plugin** as normal
2. The paid plugin extracts into `asteris-for-wordpress/` (or `asteris-wp/` depending on your edition) and activates
3. **On activation, paid detects the legacy `asteris-for-wordpress-lite/` plugin in your active-plugins list and deactivates it automatically**
4. You see a green notice at the top of your admin: *"Asteris activated. The legacy 'Asteris Utility Suite Free' companion plugin has been deactivated automatically — paid contains everything Lite had, plus more. Your settings carried over because both editions write to the same option namespace."*
5. Click the link in the notice to open Plugins, then delete the `asteris-for-wordpress-lite/` folder if you want it gone (the auto-deactivation does NOT delete files — that's your call)

All your settings, snippets, SMTP config, scheduled backups, etc. carry over because both editions write to the same `asteris_wp_*` option namespace. Nothing to manually migrate.

This auto-deactivation only fires when the legacy basename is actually active. Fresh installs and customers who installed the free version after 19 June 2026 (when free + paid share the same slug) never see the notice — paid extracts over free in place per the standard WordPress Replace dialog, and there's nothing extra to clean up.

---

## Enabling modules

After activation, go to **Asteris → Modules** in your WP admin.

All 13 modules (or 6, if on Free) are listed. Toggle the ones you want active. Modules activate immediately — no save button.

Start with the modules you know you need. Add more as required. **Disabled modules load zero PHP, zero JS, zero CSS** — performance impact is minimal.

---

## First steps per module

- **Security + Login + 2FA** — Asteris → Security. Enable TOTP and/or WebAuthn passkey 2FA. Configure brute-force thresholds.
- **SEO + AI Suite** — Asteris → SEO + AI → General. Set sitewide title/description templates. Declare site identity (Organization or Person).
- **Performance** — Asteris → Performance. Safe-defaults profile turns on what's universally safe. Opt into aggressive optimisations per-feature.
- **Forms** — Asteris → Forms → New Form. Drag-and-drop builder.
- **SMTP + Email Logs** — Asteris → SMTP → Provider. Pick one of 6 presets (Gmail OAuth / M365 OAuth / SendGrid / Mailgun / SES / generic). Send a test.
- **Activity Log + Site Health** — Asteris → Activity Log. Capture is on by default; configure retention and notifications.
- **Analytics + Pixels** — Asteris → Analytics + Pixels → Google. Enter your GA4 Measurement ID and (optionally) GTM container.
- **Image Optimisation** — Asteris → Image Optimisation. Run bulk-optimise on your existing media library; enable WebP (and AVIF for paid).
- **Backups + Migration** — Asteris → Backups → Destinations. Add a cloud destination (S3 / B2 / R2 / Wasabi / SFTP). Schedule a daily backup.
- **Accessibility** — Asteris → Accessibility. On-save scan runs automatically; the audit dashboard shows site-wide issue counts.

---

## Running with Asteris for WooCommerce

If you also run WooCommerce, install [Asteris for WooCommerce](https://asterisforwoocommerce.com) alongside this plugin. The five truly-shared modules (SEO + AI, Analytics + Pixels, Activity Log + Site Health, Links, AI library) deduplicate automatically — same code, same data, served once.

[Docs index →](/asteris-utility-suite/docs/) · [Troubleshooting →](/asteris-utility-suite/docs/troubleshooting/) · [Licensing →](/asteris-utility-suite/docs/licensing/) · [Modules →](/asteris-utility-suite/docs/modules/security/)
