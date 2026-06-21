---
title: "Asteris Utility Suite — Recovery guide"
description: "If Asteris breaks your site or you can't access wp-admin, here's how to recover. Safe Mode, FTP plugin-folder rename, WP-CLI deactivate, license continuity."
---
# Asteris Utility Suite — Recovery guide

Site broken after activating a module? wp-admin not loading? Here's how to recover, in order of how disruptive each step is. Start at the top — most issues resolve at step 1 or 2.

---

## Quick decision tree

| Symptom | Start here |
|---|---|
| wp-admin **still loads**, but a specific module is misbehaving | Step 1 — Safe Mode (URL token) |
| wp-admin **still loads**, you want to disable all modules to isolate | Step 1 — Safe Mode (URL token) or Step 2 — persistent Safe Mode |
| wp-admin **won't load** (white screen, fatal error before login) | Step 3 — WP-CLI |
| You have **no SSH / WP-CLI access**, only FTP | Step 4 — Rename plugin folder via FTP |
| Site fully unresponsive, even FTP not helping | Step 5 — Contact support@asteriscommerce.com with your hosting panel access details |

---

## Step 1 — Safe Mode via URL (one-shot bypass)

If you can still log into wp-admin, Safe Mode lets you suspend ALL Asteris modules for a single request. License + admin shell + WP-CLI continue to load — you stay in Pro/Agency tier through the recovery flow.

1. SSH into your server or open your hosting panel terminal
2. Run: `wp asteris safe-mode token`
3. Copy the printed URL (looks like `https://your-site.com/?asteris_safe_mode=Xa9bK2mN…`)
4. Paste into your browser
5. For THAT request only, all Asteris modules are bypassed — site renders without Asteris features
6. Use this to confirm Asteris is the source of the issue before flipping the persistent flag

**Security note:** the token is auto-generated and site-scoped. Don't post it in public forums. If it leaks, rotate via `wp asteris safe-mode rotate-token`.

---

## Step 2 — Persistent Safe Mode (modules suspended until you re-enable)

If you've confirmed Asteris is the source and want to keep modules off while you troubleshoot:

```
wp asteris safe-mode enable
```

This sets a persistent flag. Every page load skips Asteris modules. wp-admin shows an orange warning banner so you know it's active.

When you've fixed the underlying issue (deactivated the problem module, fixed the conflict, etc.):

```
wp asteris safe-mode disable
```

Modules return to normal. Or click the **Disable Safe Mode** button in the admin warning banner.

**Status check:**
```
wp asteris safe-mode status
wp asteris status          # also shows Safe Mode state
```

---

## Step 3 — WP-CLI deactivate (wp-admin won't load at all)

If wp-admin is fully broken (white screen of death, fatal PHP error before login renders):

```
wp plugin deactivate asteris-for-wordpress
```

Site comes back without Asteris loaded at all. Log in normally. Once you've diagnosed the root cause, reactivate:

```
wp plugin activate asteris-for-wordpress
```

If you immediately need just to isolate one module before deactivating the whole plugin:

```
wp option get asteris_enabled_modules
wp option update asteris_enabled_modules '<json-with-the-bad-module-removed>' --format=json
```

---

## Step 4 — Rename plugin folder via FTP / SFTP / file manager

No CLI access? Most hosts give you SFTP or a file-manager in cPanel.

1. Connect via FTP / SFTP / hosting file manager
2. Navigate to `wp-content/plugins/`
3. Rename `asteris-for-wordpress/` to `asteris-for-wordpress.broken/`
4. WordPress auto-detects the missing plugin folder on next page load and deactivates the plugin
5. wp-admin loads — log in normally
6. Once the underlying issue is identified, rename the folder back: `asteris-for-wordpress.broken/` → `asteris-for-wordpress/`
7. Go to wp-admin → Plugins → click **Activate** on Asteris Utility Suite

**Caveat for sister-plugin users:** if you also have Asteris for WooCommerce installed and the two share modules via the vendored shared/ architecture, renaming the `asteris-for-wordpress/` plugin folder will only disable WP-specific modules. Shared modules (SEO + AI, Analytics, Links, AI library, Activity Log + Site Health) will continue running from the WC plugin. Usually this is what you want — but if a shared module is the culprit, you'll need to rename `asteris-for-woocommerce/` too.

---

## Step 5 — Last resort: contact support

If steps 1–4 don't restore access:

Email **support@asteriscommerce.com** with:
- A description of what happened, including which module you most recently activated/configured
- The exact error message (screenshot or copy-paste)
- Your hosting environment (host name, PHP version if you know it)
- Whether you can access SFTP or any kind of file manager
- Your site URL

We'll respond within your tier's first-response SLA. For severe outages on Pro / Agency tiers, we'll prioritise — flag "site down" in the subject line so it routes to the priority queue.

---

## License continuity during recovery

Important: Safe Mode does **NOT** affect your license state. Pro / Agency access is preserved through the entire recovery flow. The license check fires BEFORE the module loader, so safe-mode bypass doesn't accidentally drop you to Free tier mid-troubleshoot.

If you needed to do Step 4 (rename plugin folder), the license stays bound to your site instance. After you rename the folder back and reactivate, the license picks up where it left off — no re-activation needed.

If you somehow ended up needing to **deactivate via Plugins screen** (which clears the LS activation slot via `register_uninstall_hook`), you'll need to re-enter your license key after reinstalling.

---

## Activity Log — coming in v1.1

In Asteris Utility Suite v1.1, every settings change and bulk operation will be logged with one-click undo (Asteris Undo). This means most "I changed something and now the site looks wrong" issues will resolve in seconds without needing this recovery guide.

Until v1.1 ships, the steps above are the recovery path.

---

## See also

- [Troubleshooting →](/asteris-utility-suite/docs/troubleshooting/) — common Asteris issues and fixes
- [Plugin conflicts →](/asteris-utility-suite/docs/conflicts/) — known conflicts with other plugins
- [WP-CLI commands →](/asteris-utility-suite/docs/wp-cli/) — full list of `wp asteris …` commands
- [Licensing →](/asteris-utility-suite/docs/licensing/) — how license activation + revalidation works
- Email: support@asteriscommerce.com
