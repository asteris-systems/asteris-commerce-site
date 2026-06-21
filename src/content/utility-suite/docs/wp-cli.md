---
title: "WP-CLI commands"
description: "Asteris Utility Suite WP-CLI command reference. Planned for v1.1 — placeholder + intended scope here."
---

# WP-CLI commands

A small set of operational WP-CLI commands ship in **v1.0** — focused on diagnostics + recovery. The broader command surface (licence management, module enable/disable, SEO bulk ops) lands in **v1.1**.

---

## v1.0 — available now

### Status

```
wp asteris status
```

Prints plugin version, active modules, licence state, and Safe Mode state. Run this first when diagnosing any issue.

### Safe Mode (recovery path)

Safe Mode suspends ALL Asteris modules without deactivating the plugin or touching the licence. Use it when a module has broken wp-admin or you want to isolate a conflict.

```
wp asteris safe-mode enable        # persistent — modules suspended until disabled
wp asteris safe-mode disable       # back to normal
wp asteris safe-mode status        # is it active?
wp asteris safe-mode token         # get the one-shot URL bypass token
wp asteris safe-mode rotate-token  # rotate if the token leaked
```

See the [Recovery guide](/asteris-utility-suite/docs/recovery/) for the full step-by-step.

---

## v1.1 — planned

The rest of this page documents the intended scope so agency operators can plan + give us feedback on which commands matter most before we build.

## Why v1.1 not v1.0

WP-CLI command surface is a build-vs-buy call. For solo store owners, the WP admin UI covers every operation. For agencies managing 5–500 client sites, WP-CLI is the only way to automate repetitive tasks at scale. We're targeting agencies as a v1.1 buyer cohort, so WP-CLI lands in v1.1 alongside the multisite support those same agencies need.

---

## Planned commands (v1.1)

### Licence management

```
wp asteris license activate <key>
wp asteris license deactivate
wp asteris license status
wp asteris license transfer <new-domain>
```

### Module management

```
wp asteris modules list
wp asteris modules enable <module-id>
wp asteris modules disable <module-id>
wp asteris modules status <module-id>
```

### SEO module (bulk operations)

```
wp asteris seo generate-meta --batch=100  # uses AI Suite to fill empty meta titles + descriptions
wp asteris seo rebuild-sitemap
wp asteris seo audit                       # report on products missing SEO data
```

### Coupons module

```
wp asteris coupons list
wp asteris coupons preview <code> --subtotal=100 --qty=2  # CLI version of the metabox preview simulator
wp asteris coupons migrate-from-wc --dry-run               # bulk-migrate plain WC coupons to Asteris management
```

### PDF Invoices (bulk operations)

```
wp asteris pdf bulk-generate --orders=$(wp wc shop_order list --status=completed --format=ids)
wp asteris pdf regenerate <order-id>
```

### Migration

```
wp asteris migrate from-yoast --dry-run
wp asteris migrate from-yith --dry-run
wp asteris migrate from-iconic --dry-run
# etc — one subcommand per /migrate/from-X marketing page
```

### Diagnostic

```
wp asteris doctor          # runs the same self-check as Asteris admin → Status
wp asteris debug-log --tail
wp asteris export-settings # JSON dump of all Asteris module settings, for cloning between sites
wp asteris import-settings <file>
```

---

## What's NOT planned

- **Customer-data commands.** Asteris doesn't expose WP-CLI shortcuts for personal data export/erase — use WP core's `wp user personal-data-export` and `wp user personal-data-erase` which already invoke Asteris's exporters/erasers (see [Data handling](/asteris-utility-suite/docs/data-handling/)).
- **Direct module-internal-state commands.** WP-CLI is for operations a human admin would do, not internal plumbing. If you need to manipulate module state directly, use the public hooks documented in [API reference](/asteris-utility-suite/docs/api-reference/).

---

## Influence the v1.1 scope

If you operate at agency scale and there's a command you need that's not listed, **email support@asteriscommerce.com** with your use case before we build v1.1. The list above is what we think agencies need; ground-truth feedback from real agency operators will reshape it.

---

## See also

- [API reference](/asteris-utility-suite/docs/api-reference/) — programmatic extension points (PHP hooks + filters)
- [Roadmap](/asteris-utility-suite/roadmap/) — v1.1 timeline
- WP-CLI's own [command reference](https://developer.wordpress.org/cli/commands/) — standard core commands you can use today
