---
title: "Account portal (pay.asteriscommerce.com)"
description: "Customer self-service portal for licence management, downloads, invoices, and email changes. Runs on the Asteris Licence Server at pay.asteriscommerce.com."
---

# Account portal

The Asteris account portal lives at **[pay.asteriscommerce.com/portal](https://pay.asteriscommerce.com/portal)** — first-party Asteris infrastructure (Cloudflare Workers + D1 + R2). It handles licence management, downloads, invoices, and subscription changes for every Asteris product (WP, WC, Cart).

---

## What the portal includes

- **Licence dashboard** — see all your active Asteris licences across all your purchases, with current activation count + tier
- **Per-site activation management** — deactivate / move / reset activation for any site, no support email needed
- **Versioned downloads** — download any past Asteris release zip (last 10 versions), useful for rollback per [Troubleshooting](/asteris-utility-suite/docs/troubleshooting/#a-plugin-update-broke-my-site---how-do-i-roll-back)
- **Invoice + receipt history** — every Stripe invoice ever issued to your account, downloadable PDF
- **Email change** — update your account email, with magic-link verification of the new address
- **Subscription management** — pause / cancel / change tier (Stripe Customer Portal embedded)
- **Support ticket history** — every email you've sent to support@, threaded by issue, with response status

---

## Authentication

- **Magic-link only** — no password to manage, no password reset flow to support. Enter your email → click the link → 24-hour session.
- **Email-change with double-verification** — change requests require confirmation from both old and new email addresses (prevents account takeover via single compromised inbox).
- **Session lifetime:** 24 hours, automatic logout. Re-request a magic link to re-authenticate.

---

## Common operations

| If you want to… | Where | Response |
|---|---|---|
| Move your licence to a new domain | Portal → Manage activations → Deactivate old → activate on new site | Instant |
| Download a previous plugin version | Portal → Downloads → version dropdown | Instant |
| Get a copy of your past invoices | Portal → Billing → Invoices | Instant download |
| Change the email address on your account | Portal → Account → Change email (double-verification required) | Instant once both addresses confirm |
| Cancel an annual or monthly subscription | Portal → Subscription → Cancel | Instant (cancels at end of current period) |
| Request a refund (within 14-day window) | support@ with "REFUND" in the subject line + order ID | 24 hours |

For anything the portal doesn't cover, email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) — response per [the support SLA matrix](/asteris-utility-suite/support/).

---

## Architecture

The Asteris Licence Server runs on Cloudflare Workers + D1 (SQLite at the edge) for state, R2 for signed plugin-zip downloads, and KV for short-lived magic-link tokens.

- **Payments:** Stripe (cards, Apple Pay, Google Pay, regional methods). Stripe Tax calculates VAT/GST.
- **Merchant of record:** Asteris Commerce (My Cosmic Message Pty Ltd t/a Asteris Commerce, ACN 652 358 159).
- **Card data:** never stored on Asteris infrastructure — held exclusively by Stripe (PCI DSS Level 1).
- **Licence keys:** stored hashed on the Asteris Licence Server. The plain-text key only exists on your customer email receipt and on your WordPress site after activation.

---

## Influence the portal scope

If there's an account operation you need that the portal doesn't handle, **email support@asteriscommerce.com**. Customer feedback shapes the roadmap.

---

## See also

- [Roadmap](/asteris-utility-suite/roadmap/) — portal feature roadmap
- [Troubleshooting → rollback path](/asteris-utility-suite/docs/troubleshooting/#a-plugin-update-broke-my-site---how-do-i-roll-back) — uses the portal for versioned downloads
- [Pricing + tiers](/asteris-utility-suite/pricing/) — current pricing
- [Subprocessors](/asteris-utility-suite/subprocessors/) — Stripe, Cloudflare, and the rest of the stack
