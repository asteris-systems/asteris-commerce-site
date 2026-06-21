---
title: "Security architecture"
description: "How Asteris Utility Suite handles licence activation, data transmission, code-signing, and hardening — the architecture that protects your store + customer data."
---

# Security architecture

This page is the trust signal for technical buyers and agencies pitching Asteris to their clients' security/compliance reviews. It documents what data Asteris sends home, how the licence-activation flow is hardened, and what we don't do.

---

## What Asteris sends home — full disclosure

Asteris makes **only one type of outbound network call from your WordPress site:** licence activation against the Asteris Licence Server at `pay.asteriscommerce.com` (Cloudflare Workers + D1 — first-party Asteris infrastructure).

Data sent on every activation check:

- Your licence key (the one you pasted in)
- Your site's normalised hostname (e.g. `example.com`, `www.example.com`, and `https://example.com` are treated as one site for licensing — preventing accidental slot-burn)
- Your WordPress version + PHP version (so we can warn you if you're on a version we no longer support)

**Cadence:** once at activation, then once per 24 hours as a background check.

**Data NOT sent:**
- ❌ Page URLs / page content / visitor traffic — we don't track what your customers browse
- ❌ Site content / user data / visitor data — we don't receive any of it
- ❌ Module usage / which features you enable — we don't profile your site's behaviour
- ❌ Server fingerprints / IP geolocation / device data
- ❌ Anything from disabled modules — disabled modules load zero PHP, make zero network calls

If you want to verify, read the source: `src/Core/License.php` is GPL-2.0+ and contains every network call the plugin makes.

---

## Licence activation hardening

The licence flow has been hardened across 12 layers since v1.9.3:

1. **Per-request static guard** — no double-run inside a single request, prevents activation thrashing
2. **`current_user_can('manage_options')` check** — only admins can trigger activation
3. **Dev-mode bypass** — `.local` / `.test` / `localhost` hostnames bypass activation entirely (no slot burn on dev sites)
4. **Multisite bail** — multisite networks rejected at v1.0 (planned v1.1), prevents subsite-level slot confusion
5. **Atomic add_option lock** — race-safe against concurrent admin tabs hitting the activation endpoint
6. **Stale-lock steal after 5 min** — if a lock is abandoned (crash mid-activation), next admin request can steal it
7. **Retry counter capped at 5 with backoff** — prevents infinite retry loops on network failure
8. **WP_Error preservation** — if the LS API returns a retryable error, the licence key is kept locally for retry; permanent failures clear the local reference and surface an admin notice
9. **Defensive read-back after marking done** — if the "activation complete" flag fails to write, we don't lose the migration state
10. **Dismissible admin notice** — admin can dismiss the migration notice via nonce-checked AJAX
11. **Uninstall hook** — best-effort deactivation on plugin Delete (frees the LS slot for the customer)
12. **Autoloaded done-flag** — post-migration, zero DB hits per request to check migration state

16 license-system bugs were caught and fixed across the 1.9.3 → 1.9.6 cycle via adversarial-review workflows BEFORE any customer impact. Three were customer-bricking criticals (network failure deleting the licence key, race condition burning slots, idempotency hole).

---

## Code-signing + tamper detection

Asteris is distributed two ways:

- **Asteris Free** — through WordPress.org's official plugin repository (signed by WP.org infrastructure)
- **Asteris paid tiers** — downloaded from your `/account` page on asteriscommerce.com (zip served from Cloudflare R2, signed URLs valid 24 hours)

Both downloads include the standard WordPress plugin header (Author: Asteris Commerce). If you find an Asteris zip from a different source ("nulled" / "cracked" sites), **do not install it** — those zips routinely have malware injected into the loader, and you have no way to verify the source. Email support@ for an authentic download.

---

## What Asteris does NOT do — explicit non-claims

- ❌ No phone-home telemetry from disabled modules (disabled = zero code loaded → zero network calls)
- ❌ No usage analytics — we don't know which features you use
- ❌ No customer-data transmission — your customer emails / order data never leave your site
- ❌ No obfuscated PHP loaders (ionCube, Source Guardian) — every line of code is readable
- ❌ No automatic data collection without licence-activation purpose
- ❌ No third-party trackers in the WP admin UI (no Google Fonts loaded from googleapis.com, no Intercom widget, no FullStory)

---

## Responsible disclosure

If you find a security issue, please email **support@asteriscommerce.com** (NOT GitHub issues, NOT the public forum). We commit to:

- **24-hour first response** wall-clock, weekdays + weekends
- **Coordinated disclosure** — we patch + ship + disclose with the reporter as co-discoverer in the changelog (if they want credit)
- **No legal threats for good-faith research** — security researchers acting in good faith are explicitly safe to investigate Asteris under our [security.md](/asteris-utility-suite/security/) policy

Our [public security policy](/asteris-utility-suite/security/) covers the full disclosure protocol, scope, and out-of-scope items.

---

## See also

- [Privacy Policy](/asteris-utility-suite/privacy/) — what personal data we collect from customers (the buyers, not their end-users)
- [Subprocessors](/asteris-utility-suite/subprocessors/) — Stripe, Cloudflare, Google Workspace — full list
- [Data handling per module](/asteris-utility-suite/docs/data-handling/) — what data each enabled module stores in your WordPress database
- [Public security policy](/asteris-utility-suite/security/) — responsible disclosure protocol
