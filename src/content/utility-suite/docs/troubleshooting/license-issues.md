---
title: License issues — activation, limits, and migrations
description: Fix "License limit reached", "I migrated my site and lost activation", and other licensing problems with Asteris Utility Suite.
---

If you're running into a licensing problem, this page walks through the most common scenarios and how to solve each. If none match, email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) (1 business day SLA, Pro/Agency) or post in the [WordPress.org plugin forum](https://wordpress.org/support/plugin/asteris-for-wordpress/) (Asteris Utility Suite Free, 2–3 business days fallback).

## First: where does your license live?

Asteris licences are stored on the **Asteris Licence Server** at `pay.asteriscommerce.com` — first-party Asteris infrastructure (Cloudflare Workers + D1). The licence server is the source of truth, not the plugin. This means:

- Your licence persists even if you delete the plugin
- Activation slots are tracked centrally across every site you install on
- You can manage activations directly from your [Asteris customer portal](https://pay.asteriscommerce.com/portal)

If you're not sure which Asteris account holds your licence, check the email address you used when you purchased — it'll be the inbox that received `Your Asteris licence is ready` from Asteris Commerce.

---

## "License limit reached" when activating

**What's happening:** Your tier's site activation limit is already used by another install.

| Tier | Site limit |
|---|---|
| Asteris Starter | 1 site |
| Asteris Pro | 3 sites |
| Asteris Agency | 10 sites |

One standard price for everyone — site limit follows the tier you subscribed at.

**Fix (in order — try the first one that applies):**

### A. You already use Asteris on another site you still own

You need to free a slot before activating on this one. Two ways:

**Easiest — deactivate from the other site's WordPress admin:**

1. Log into the other site's WordPress admin
2. Go to **Asteris → Licence**
3. Click **Deactivate licence** (releases the slot back to the Asteris Licence Server)
4. Now come back to this site and activate

**If you can't access the other site (deleted / locked out / sold):**

1. Log into [your Asteris customer portal](https://pay.asteriscommerce.com/portal)
2. Find your Asteris subscription → click **Manage activations**
3. Find the old activation in the list → click **Deactivate**
4. The slot is now free — activate on the new site

### B. Your slot count is wrong (it's actually free, but the server thinks it's not)

This can happen if you cloned a site (dev → staging → production) without uninstalling Asteris cleanly first. Each clone consumed a slot.

**Fix:** Use the Asteris customer portal (method above) to find and deactivate the stale instances. You can see when each was activated and what URL it was registered for — that helps identify which one to release.

### C. You need more sites than your tier allows

Upgrade. From the Asteris admin:

1. Asteris → Licence → **Upgrade licence**
2. Pick your new tier (Starter → Pro is pro-rated; Pro → Agency same)
3. Pay via Stripe at `pay.asteriscommerce.com`
4. Your new licence key is sent to your email; replace the existing one

Or contact [support@asteriscommerce.com](mailto:support@asteriscommerce.com) for help with upgrades.

---

## "I migrated my site to a new URL and lost activation"

**What's happening:** Your licence was activated for `oldsite.com`, but Asteris now reports the site as `newsite.com`. The licence server sees this as a new site — and your old slot is still in use by `oldsite.com`.

**Two scenarios:**

### Scenario 1: You changed the WordPress Site URL setting (Settings → General)

Your activation is now associated with a host that doesn't exist. Free it and re-activate:

1. Asteris → Licence → **Deactivate licence** (clears the local activation)
2. Then click **Activate licence** with the same key — registers under the new URL

### Scenario 2: You moved the site to a new domain entirely (e.g., `example.com` → `mybrand.com`)

Same fix as above — deactivate, then re-activate. If you've completely lost access to the old domain and your slot count is now wrong, use the Asteris customer portal to manually deactivate the stale `example.com` instance.

**To prevent this in the future:** Asteris treats `example.com`, `www.example.com`, `https://example.com`, and `https://www.example.com/` as the same site (since v1.0). So if you only changed protocol or added/removed `www`, you don't need to re-activate. But if you changed the actual hostname, you do.

---

## "My licence shows valid in Asteris but a paid module is locked"

Two possible causes:

### Cause 1: You're on the Free tier, not paid

Asteris Utility Suite Free includes 5 of the 12 modules — lite versions of Image Optimisation, Analytics + Pixels, Activity Log, SMTP, and the Accessibility scanner. The 7 paid-only modules (Security + 2FA, SEO + AI, Performance, Forms, Backups + Migration, plus Asteris Links and Asteris Insights) and the full versions of the lite ones require a paid licence.

Every paid tier (Starter / Pro / Agency) unlocks every module — site count is the only difference. If a module is locked and your licence is valid, see Cause 2 below.

### Cause 2: Your validation cache is stale

Asteris re-validates your licence once per day in the background. If you just upgraded tiers, the local cache may not have refreshed yet.

**Force a re-validation:**

1. Asteris → Licence → **Re-check licence** (top right of the licence screen)
2. Page should refresh with the new tier
3. Your modules unlock

If it still doesn't update, log out of WordPress admin, log back in, and check again. Worst case: deactivate and re-activate the licence (no slot burn, since you're re-activating on the same site).

---

## "I deleted Asteris but my licence slot is still consumed"

The uninstall hook (built in from v1.0) automatically deactivates your slot on the Asteris Licence Server when you delete the plugin via **Plugins → Delete** in wp-admin. Best-effort — if your site couldn't reach the server during uninstall (network failure, firewall block), the slot can be left stranded.

**Fix:** Log into your [Asteris customer portal](https://pay.asteriscommerce.com/portal) and manually deactivate the stale instance.

Or email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) and we'll clear it.

Note: **Deactivating the plugin (Plugins → Deactivate) does NOT free the slot** — only deletion does. If you want to free the slot without deleting, go to **Asteris → Licence → Deactivate licence** first.

---

## "I'm running Asteris on a development/staging site — do I need a licence?"

**No.** Asteris auto-detects development environments and bypasses licence enforcement on hostnames ending in:

- `.test`
- `.local`
- `localhost`

Plus any host where you've explicitly set `define( 'ASTERIS_WP_DEV_MODE', true );` in your `wp-config.php`.

This means you can develop and test freely without burning your licence slot. Only your production hostname needs an activation.

**Once a licence key is pasted on a dev site, validation proceeds normally against the server** — so you can still test the full real-world activation flow on `.local`/`.test` if you want.

---

## "Asteris is in offline mode / grace period"

If Asteris can't reach the licence server (network outage, firewall blocking outbound HTTPS, your hosting provider's outbound restrictions), it falls back to a cached licence state:

- **0–7 days offline:** Cached "valid" state is honoured — Asteris continues working
- **7–30 days offline:** Cached state is honoured but a warning is shown in admin
- **30+ days offline:** Cached state expires; Asteris falls back to free-tier behaviour

**Common causes:**

1. **WP Engine, Pantheon, or similar managed host blocking outbound HTTPS** — whitelist `pay.asteriscommerce.com` in their dashboard
2. **Wordfence or similar security plugin blocking outbound requests** — add an exception for `pay.asteriscommerce.com`
3. **Server-level firewall (iptables, etc.)** — your sysadmin needs to allow outbound HTTPS to `pay.asteriscommerce.com`

If you've confirmed the network is fine and you're still in offline mode, email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) — we can check our end.

---

## Subscription notes

One standard price for everyone. Each tier sets your site limit and SLA.

- **Site activations follow your tier** (Starter 1 / Pro 3 / Agency 10)
- **All future modules included** during the subscription — when v1.1, v1.2 ship, modules appear in your install at no extra cost
- **Migrating to a new site is fine.** Deactivate from the old site, activate on the new — same slot, just relocated
- **You CAN'T transfer the licence to a different person or business entity.** It's tied to your Asteris Commerce customer record (per [EULA](/asteris-utility-suite/license/))

---

## Still stuck?

| Tier | First-response SLA | Channel |
|---|---|---|
| Asteris Utility Suite Free | 2–3 business days (forum first) | [WP.org plugin forum](https://wordpress.org/support/plugin/asteris-for-wordpress/) → [support@](mailto:support@asteriscommerce.com) |
| Asteris Starter | 2–3 business days | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |
| Asteris Pro | 1 business day | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |
| Asteris Agency | 1 business day | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |

Include in your email:
- Your licence key (the one shown in Asteris → Licence)
- The email address on your Asteris Commerce account (might differ from where you want the reply)
- The URL of the site giving you trouble
- A screenshot of the error message

We'll have you sorted within SLA.
