---
title: "API reference — public hooks + filters"
description: "Every public WordPress action, filter, REST endpoint, and shared helper Asteris Utility Suite exposes for developers + agencies extending the plugin."
---

# API reference

This page lists every **public, semver-stable** extension point Asteris exposes for developers, agencies, and module authors. Anything not listed here is implementation detail and may change without notice.

**Stability commitment:** breaking changes to documented APIs happen only on major version bumps with at least one minor version of deprecation notice in advance.

---

## Cross-module shared APIs

### `asteris_cart_thresholds` (filter)

Published by **Asteris Coupons (Module 20)** and consumed by **Free Shipping Bar**. Returns an array of cart-spend thresholds that unlock something — coupons, free shipping, future modules.

```php
$thresholds = apply_filters( 'asteris_cart_thresholds', [] );
// Each entry shape:
// [
//   'spend'  => 50.00,                 // float, cart subtotal that unlocks
//   'label'  => 'Save 10%',            // human-readable display label
//   'source' => 'coupon:SUMMER25',     // namespaced origin identifier
//   'kind'   => 'discount',            // 'discount' | 'shipping' | 'gift' | ...
// ]
```

**Use case:** another module (yours or a future Asteris module) can register additional thresholds — e.g. a loyalty-points module could publish "earn 100 points at $75 spend" so the Free Shipping Bar surfaces it.

**Performance:** publishers should cache their threshold list statically per request. Consumers can call the filter freely; it's not expensive.

---

## Per-module APIs

### Asteris Coupons — `Auto_Apply_Engine::trace_id_for()`

```php
$trace_id = \Asteris\Modules\CouponCode\Frontend\Auto_Apply_Engine::trace_id_for( 'SUMMER25' );
// Returns int trace ID or null
```

Static accessor returning the per-request trace ID for a coupon that was applied during the current request. Used internally by `Cart_Hooks` to stamp `_asteris_coupon_trace_id` on the order. External callers can use this to correlate cart-time rule evaluation with order data for debugging.

---

## Module activation hooks

Asteris emits two actions when modules are toggled on/off via the admin:

```php
do_action( 'asteris_module_activated',   $module_id ); // e.g. 'coupon_code'
do_action( 'asteris_module_deactivated', $module_id );
```

Use case: bridge plugins that need to react to module state changes (e.g. flush a cache when SEO module toggles).

---

## Plugin lifecycle hooks

```php
do_action( 'asteris_plugin_activated' );    // fires once on first plugin activation
do_action( 'asteris_plugin_deactivated' );  // fires once on plugin deactivation
do_action( 'asteris_plugin_loaded' );       // fires on every `plugins_loaded`, after all modules have loaded
```

---

## REST endpoints

No public REST endpoints exposed for third-party use at v1.0.

Internal REST routes (used by the admin UI — not stable, do not depend on):
- `asteris/v1/coupon/preview` (POST) — backs the Coupons preview-tab simulator. Cap-gated to `manage_woocommerce`.
- `asteris/v1/license/activate` (POST) — backs the Licence tab Activate button. Cap-gated to `manage_options`.

---

## Filters for module-specific behaviour

### SEO module

- `asteris_seo_meta_title_template` — modify the meta title template before render
- `asteris_seo_meta_description_template` — modify the meta description template
- `asteris_seo_schema_product` — modify the Product schema JSON-LD before output

### PDF Invoices module

- `asteris_pdf_template_paths` — register your own PDF template directory
- `asteris_pdf_invoice_data` — modify the data array passed to the template before render
- `asteris_pdf_filename` — customise the generated PDF filename

### Side Cart module

- `asteris_side_cart_should_open` — control whether the side cart auto-opens on add-to-cart (return bool)
- `asteris_side_cart_upsell_products` — modify the cross-sell product list shown in the side cart

### Analytics module

The Analytics module deliberately exposes **no public extension points** at v1.0. The `gtag` and GTM snippets are printed inline at `wp_head` priority 1, so there's nothing to dequeue. Extend or unhook through WooCommerce's own hooks (`woocommerce_add_to_cart`, `woocommerce_thankyou`, etc.).

---

## Conventions

All Asteris public hooks follow these conventions:

- **Namespace:** every action/filter is prefixed `asteris_` (cross-module) or `asteris_{module_id}_*` (module-specific)
- **Module IDs:** snake_case matching the module's class id (`coupon_code`, `pdf_invoices`, `side_cart`, etc.)
- **Filters return-type:** documented in each filter's docblock in source. If a filter returns the wrong type, Asteris falls back to the unfiltered default rather than crashing.
- **Action priority:** Asteris's own callbacks run at default priority 10 unless documented otherwise. To run before/after Asteris's own logic, hook at priority < 10 or > 10 accordingly.

---

## How to read the source

The plugin codebase is GPL-2.0+ and readable. Every public hook in this document has a corresponding `do_action` / `apply_filters` call in the source — search for the hook name to find the call site. Each module's `Module.php` is the entry point.

Source: `wp-content/plugins/asteris-for-wordpress/src/`

---

## See also

- [Plugin conflicts](/asteris-utility-suite/docs/conflicts/) — known interactions with other plugins
- [Security architecture](/asteris-utility-suite/docs/security/) — what hooks Asteris uses internally for licence + activation
- [Asteris Coupons module docs](/asteris-utility-suite/docs/modules/coupons/) — full hook list for the Coupons module
