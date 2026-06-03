# asteriscommerce.com

Parent brand site for **Asteris Commerce** — the company behind:
- [Asteris for WooCommerce](https://asterisforwoocommerce.com) — 20-module plugin suite for WC stores
- [Asteris for WordPress](https://asterisforwordpress.com) — 11-module plugin suite for WP sites (v1.0 alpha)

Asteris Commerce is the trading name of **My Cosmic Message Pty Ltd** (ACN 652 358 159, ABN 30 652 358 159). Australian proprietary limited company, sole director Nick Lord, based in Sydney.

## Stack

- **Astro 5** (static site generator)
- **Cloudflare Pages** (hosting + auto-deploy on push to main)
- **Sharp** (image optimisation)
- No runtime JS framework (everything is server-rendered at build time)

## Develop locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run preview  # serve dist/ locally
```

## Pages

- `/` — hero + product cards + about strip
- `/about` — founder + philosophy + funding model
- `/roadmap` — cross-product release timeline
- `/press` — media kit + bio + brand assets
- `/404` — 404 page

## Deploy

Pushes to `main` trigger Cloudflare Pages auto-deploy. DNS: `asteriscommerce.com` apex + `www` CNAME → CF Pages.

## Related

- WC plugin sales site repo: [asteris-systems/asteris-for-woocommerce-site](https://github.com/asteris-systems/asteris-for-woocommerce-site)
- WP plugin (in active development): asterisforwordpress.com
