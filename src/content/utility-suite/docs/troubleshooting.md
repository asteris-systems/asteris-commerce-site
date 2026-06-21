---
title: "Asteris Utility Suite — Troubleshooting"
description: "Common Asteris Utility Suite issues and how to fix them. Activation errors, module display issues, PHP compatibility, and more."
---
# Asteris Utility Suite — Troubleshooting

---

## Licence key won't activate

**Check:** is the licence key entered exactly as it appears in the email? Keys are case-sensitive. Copy-paste directly from the email.

**Check:** is the licence already active on another domain? Each tier has a site limit. Deactivate from the old domain before activating on the new one (Asteris Utility Suite → Licence → Deactivate).

**Check:** is your server able to make outbound HTTPS requests? Licence activation calls asteriscommerce.com. Some servers block outbound connections. Ask your host.

If none of these resolve it, email support@ with your licence key (last 4 characters only, for privacy) and domain.

---

## Module not showing on the frontend

1. Confirm the module is toggled ON in Asteris Utility Suite → Modules
2. Clear your caching plugin's cache (WP Rocket, W3 Total Cache, etc.)
3. Check your theme isn't overriding the module's CSS with a more specific rule (browser inspect tool → look for overridden styles)
4. Check for JavaScript errors in the browser console (F12 → Console) — a JS conflict from another plugin can prevent modules from initialising

---

## White screen or PHP fatal error after activation

Check the error log: `wp-content/debug.log` (if WP_DEBUG_LOG is enabled) or your host's PHP error log.

Most common cause: PHP version below 8.1. Asteris Utility Suite requires PHP 8.1+.

Second most common: memory limit below 128MB. Increase in wp-config.php:
```
define('WP_MEMORY_LIMIT', '256M');
```

---

## Module works on desktop but not mobile

Check for CSS z-index conflicts (common with Side Cart and sticky header themes). Also check your mobile breakpoints — some module settings have mobile-specific display options.

---

## A plugin update broke my site — how do I roll back?

Asteris Utility Suite auto-updates through WordPress's standard update mechanism (your site → Plugins → Updates). If a new version causes a problem on your specific theme + WP + WC combination, you can roll back in two ways:

**Option 1 — Roll back via plugin (recommended).** Install [WP Rollback](https://wordpress.org/plugins/wp-rollback/) from the WP.org plugin directory. After activation, **Plugins → Asteris Utility Suite → Rollback** lets you pick any previous version we've shipped. Your licence + settings are preserved across the rollback.

**Option 2 — Roll back manually.** Download the previous version's `.zip` from your customer portal at [/account](https://pay.asteriscommerce.com/account) (versioned downloads are available for the last 10 releases). Delete the current Asteris Utility Suite plugin folder via FTP/SFTP, upload the older `.zip` via **Plugins → Add New → Upload**. Re-paste your licence key.

**While rolled back, please email support@** with what broke + what you rolled back to. We treat rollback reports as P1 bug reports — they tell us a release shipped with a regression and we'll patch within the SLA for your tier. Every paid release goes through 6-theme local-site testing before ship, but every customer environment differs — your report fills the gap our test fleet can't.

**The 14-day refund window does NOT reset on a problematic update** — refunds run from the original purchase date. If you've passed the 14-day window and a release breaks something for you, your remedy is the rollback path above + a P1-priority fix from us, not a refund. (Your statutory consumer-law rights for "major failure" remain available under ACL s260 if the issue is unresolvable within a reasonable time — see [Refund Policy §2](/asteris-utility-suite/refund-policy/).)

---

## Is asteriscommerce.com down?

Check [status.asteriscommerce.com](https://status.asteriscommerce.com) for live status of: marketing site, licence activation server, plugin download CDN, and customer portal. Status page updates within 60 seconds of an outage and shows historical uptime.

If the status page itself is down: that's the worst kind of outage and you should email support@asteriscommerce.com — we monitor that inbox even during outages.

---

## Still stuck?

Email support@asteriscommerce.com with:
- WordPress version, PHP version (and WooCommerce version if Asteris for WooCommerce is also installed)
- Asteris Utility Suite version
- What you expected vs what happened
- Any error messages from the browser console or PHP log

[Plugin conflicts →](/asteris-utility-suite/docs/conflicts/) · [Support →](/asteris-utility-suite/support/) · [Status page →](https://status.asteriscommerce.com)