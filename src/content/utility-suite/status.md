---
url: /asteris-utility-suite/status
title: "Asteris Utility Suite — System status"
meta_description: "Live operational status for asteriscommerce.com, the licence activation server, plugin download CDN, and customer portal. Historical uptime + incident reports."
og_title: "Asteris Utility Suite — System status"
og_description: "Live status + historical uptime for Asteris Utility Suite infrastructure."
canonical: https://asteriscommerce.com/asteris-utility-suite/status
schema_type: WebPage
noindex: false
verified_date: 2026-06-03
---

# System status

**Live status for Asteris Utility Suite infrastructure.** This page is the source of truth when something feels broken.

The detailed status board (per-component uptime, incident history, response-time graphs) lives at **[status.asteriscommerce.com](https://status.asteriscommerce.com)**, hosted on UptimeRobot's public status page. This page links to it and explains what each component does.

---

## What we monitor

| Component | What it does | Why an outage matters |
|---|---|---|
| **Marketing site** (`asteriscommerce.com`) | The pages you're reading right now | New customers can't find or buy. Existing customers can still use the plugin. |
| **Licence activation server** | The endpoint your plugin calls to verify your licence key | New activations fail. Existing activated sites continue working in their grace window (7 days). |
| **Plugin download CDN** (Cloudflare R2) | Versioned plugin `.zip` downloads | New installs + manual updates can't fetch the zip. Auto-updates via WordPress's own update mechanism are unaffected (they go through WP.org). |
| **Customer portal** (`/account`) | Licence management, download history, invoices (v1.1) | Customers can't self-serve licence moves. Email support@ as a fallback. |

---

## During an outage, what should I do?

1. **Check this page first** — if a component is red, we already know. No need to email.
2. **If everything here is green but your site is having problems** — it's a local issue (your host, your theme, your config). Start at [Troubleshooting](/asteris-utility-suite/docs/troubleshooting/).
3. **If your licence activation specifically is failing** — the plugin enters a 7-day grace period and continues to function normally. You can wait or email support@.
4. **If the status page itself is unreachable** — that's the worst kind of outage. Email **support@asteriscommerce.com** — Nick monitors that inbox even when other systems are down.

---

## Historical uptime target

We commit to **99.5% uptime** on the licence activation server and the marketing site (roughly 3.5 hours/month of unplanned downtime as a hard ceiling). This is a small-team operation running on Cloudflare's infrastructure — we don't promise four-nines, we promise honest reporting and fast root-cause communication.

When an incident happens, we publish:
- What broke + when (within 60 seconds via UptimeRobot)
- The customer impact (which features were degraded vs fully down)
- What we did to fix it
- What we changed so it doesn't happen again

All incident reports stay public on the status board for 12 months.

---

## See also

- [Troubleshooting guide](/asteris-utility-suite/docs/troubleshooting/)
- [Support](/asteris-utility-suite/support/)
- Detailed status board: [status.asteriscommerce.com](https://status.asteriscommerce.com)
