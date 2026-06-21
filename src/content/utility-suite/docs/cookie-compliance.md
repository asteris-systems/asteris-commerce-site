---
title: "Cookie compliance — v1.0 stopgap"
description: "Asteris Cookie Consent ships as Module 21 in v1.1. For v1.0 launch customers needing GDPR/ePrivacy/CCPA compliance now, here are two free WP.org plugins we recommend and configure carefully."
---

# Cookie compliance

**Asteris Cookie Consent ships in v1.1 (6–12 weeks post-launch).** It will be a full GDPR/ePrivacy/CCPA/LGPD-compliant banner with real script-blocking, consent audit log, withdraw-consent UI, geo-targeting, per-jurisdiction modes, multi-language, WCAG 2.1 AA accessibility, and migration adapters from CookieYes / Cookiebot / Iubenda. See [/changelog](/asteris-utility-suite/changelog/) for the release announcement.

**For v1.0 customers who need cookie compliance now**, the two free WP.org plugins below cover the gap. Both will be one-click-migratable when Asteris Cookie Consent ships.

---

## Option 1 — CookieYes Free (recommended for most stores)

[CookieYes WordPress plugin](https://wordpress.org/plugins/cookie-law-info/) — actively maintained, free tier covers GDPR + CCPA basics, paid tier adds Google Consent Mode v2 (also available free in Asteris's Analytics + Pixels module).

**What you get free:**
- Banner UI with 3 layouts (box / banner / popup)
- Cookie categories (necessary, analytics, marketing, preferences)
- Script-blocking pre-consent for GA4, Meta Pixel, GTM via shortcode wrapping
- Auto-translated banner copy in 30+ languages
- Cookie scan tool (free tier limited to 100 cookies)

**What's gated to paid ($10–$99/mo):**
- Geo-targeting (only show banner to EU/UK visitors)
- Consent audit log (proof-of-consent per GDPR Article 7(1))
- Cookie auto-blocking without shortcodes (free tier requires you to manually wrap each script)
- Multi-language beyond auto-translation
- A/B testing on banner copy

**Setup, 10 min:**
1. Install + activate from WP-admin → Plugins → Add New → "CookieYes"
2. Run the cookie scan (CookieYes → Scan)
3. Categorise any unrecognised cookies into necessary/analytics/marketing
4. Wrap your GA4/Meta tags in CookieYes shortcodes so they only fire post-consent
5. Test in EU-IP incognito mode

**When Asteris Cookie Consent ships:** Asteris will read CookieYes's stored consent state + cookie categorisation, so the migration is one-click and you don't lose audit history.

---

## Option 2 — WP Auto Terms (terms + privacy + cookie policy generator)

[WP Auto Terms WordPress plugin](https://wordpress.org/plugins/wp-auto-terms/) — generates legally-required Terms of Service, Privacy Policy, and Cookie Policy pages, kept up to date as laws change.

**Why pair with a cookie banner:** GDPR requires not just a consent banner, but a published cookie policy page that lists every cookie + purpose + duration. WP Auto Terms generates that page automatically.

**Setup, 5 min:**
1. Install + activate from WP-admin → Plugins → Add New → "WP Auto Terms"
2. Fill in your business details (legal name, jurisdiction, contact email)
3. Publish the three generated pages at `/terms`, `/privacy`, `/cookies`
4. Add the `/cookies` link to your CookieYes banner's "Read more" CTA

**When Asteris Cookie Consent ships:** Asteris will auto-generate the cookies page from its own consent registry, replacing the WP Auto Terms `/cookies` page. You can keep WP Auto Terms running for Terms + Privacy if you don't have lawyer-written versions.

---

## Why we're recommending free plugins instead of selling Asteris Cookie Consent now

Honest answer: a proper cookie consent module is 80–120 hours of build, and shipping a half-baked one (banner only, no script-blocking, no consent log) would be worse than recommending two well-maintained free alternatives. The Module Quality Protocol that ships every Asteris module forbids decoration-only modules. Asteris Cookie Consent will ship in v1.1 when we can build it properly — until then, CookieYes Free + WP Auto Terms covers the requirement.

If you're an agency managing client stores that need geo-targeting + audit log right now, **Iubenda Cookie Solution ($108/yr)** is the option we'd pick over CookieYes Premium ($120/yr) — better consent log UI, easier multi-language. Asteris Cookie Consent will include a one-click migration from Iubenda when it ships.

---

## See also

- [Module 21 roadmap entry](/asteris-utility-suite/changelog/#cookie-consent) — what Asteris Cookie Consent v1.1 will include
- [Privacy Policy](/asteris-utility-suite/privacy/) — how Asteris handles personal data
- [Subprocessors](/asteris-utility-suite/subprocessors/) — third parties Asteris uses for licence activation + downloads
