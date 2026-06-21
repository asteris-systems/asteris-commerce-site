---
url: /asteris-utility-suite/subprocessors
title: "Subprocessors — Asteris Utility Suite"
meta_description: "List of third-party subprocessors used by Asteris Commerce — Stripe (payments), Cloudflare (hosting + licence server), Plausible (analytics), GitHub (code), Google (email)."
schema_type: WebPage
noindex: false
verified_date: 2026-06-01
legal_review_required: true
---

# Subprocessor List

This page lists every third party (subprocessor) that processes personal data on behalf of Asteris Commerce. It is maintained in accordance with Article 28 of the EU General Data Protection Regulation (GDPR) and Australian Privacy Principle 8 (cross-border disclosure of personal information) under the Privacy Act 1988 (Cth).

**Last updated:** 01 June 2026
**Effective date:** 01 June 2026
**Maintained by:** Asteris Commerce ([support@asteriscommerce.com](mailto:support@asteriscommerce.com))

---

## What is a subprocessor?

A subprocessor is a third-party service we use to operate Asteris Commerce that, in the course of doing so, may process personal data we are responsible for as the data controller (or as a processor, where we act on behalf of a B2B customer).

This page lists every active subprocessor, what they do, what data they touch, where they're based, and how they protect it. It updates whenever we add, change, or remove a subprocessor.

---

## Our role: controller and processor

For most personal data we handle (our own customer records — billing, licence keys, support emails), Asteris Commerce is the data controller and the parties below are our processors.

For B2B customers who execute a Data Processing Addendum (DPA) with us in respect of personal data they upload via our plugins, Asteris Commerce is the processor and the parties below are our subprocessors.

The list, jurisdictions, and safeguards described below apply in both cases. (Reference: GDPR Arts. 4(7), 4(8), 28.)

For our Australian customers, this page also supports our obligations under the Privacy Act 1988 (Cth), in particular Australian Privacy Principle 8 (cross-border disclosure). Each subprocessor's processing jurisdiction is identified in the Location row. (Reference: OAIC APP 8 guidance — https://www.oaic.gov.au/privacy/australian-privacy-principles/australian-privacy-principles-guidelines/chapter-8-app-8-cross-border-disclosure-of-personal-information.)

---

## Active subprocessors (as of 01 June 2026)

### Payment processing

| Subprocessor | Stripe, Inc. |
|---|---|
| **Purpose** | Payment processing for checkout at `pay.asteriscommerce.com` — card processing, Apple Pay / Google Pay, fraud prevention (Stripe Radar), tax calculation (Stripe Tax), subscription billing, transactional emails (receipt, refund). Asteris Commerce is the merchant of record; Stripe is the payment processor only. |
| **Data shared** | Customer name, email, billing address, payment method details, purchase history, IP at checkout. Licence keys are NOT shared with Stripe — they are generated and stored on the Asteris Licence Server (see next entry). |
| **Categories of data subjects** | Asteris customers and their billing contacts |
| **Location** | United States (San Francisco, USA), with EU data processed by Stripe Payments Europe Ltd (Ireland) for EU customers |
| **Certifications / audits** | PCI DSS Level 1, SOC 1, SOC 2 Type II, ISO 27001 |
| **International transfer mechanism** | EU-US Data Privacy Framework certified + EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914) Modules 2/3 where applicable; UK IDTA applied for UK data subjects |
| **Privacy policy** | https://stripe.com/privacy |
| **DPA** | https://stripe.com/legal/dpa |
| **Used since** | 05 June 2026 |
| **Last verified** | 05 June 2026 |

### Licence server

| Subprocessor | Asteris Commerce — operated on Cloudflare infrastructure (see Cloudflare entry below) |
|---|---|
| **Purpose** | Licence key generation, storage, activation tracking, daily revalidation, customer portal (`pay.asteriscommerce.com`). This is first-party Asteris infrastructure — not an independent subprocessor — but listed here for transparency about where licence data lives. |
| **Data shared** | Customer email, licence key (hashed), site activation history (`instance_name` = site URL), tier, expiry. Card details are NEVER stored — they live exclusively at Stripe. |
| **Categories of data subjects** | Asteris customers |
| **Location** | Cloudflare global edge (Workers + D1), with primary persistence in a region selected by Cloudflare D1 |
| **Certifications / audits** | Inherits Cloudflare's SOC 2 Type II, ISO 27001 controls |
| **Used since** | 05 June 2026 |
| **Last verified** | 05 June 2026 |

### Infrastructure

| Subprocessor | Cloudflare, Inc. |
|---|---|
| **Purpose** | DNS, CDN, DDoS protection, SSL, hosted static site (Cloudflare Pages), serverless functions (Workers), key-value storage (KV), object storage (R2) for plugin zip distribution, email routing for our @asteriscommerce.com addresses |
| **Data shared** | IP addresses + request metadata (standard CDN logs), email metadata (sender, recipient, subject, timestamp for routing), licence keys + customer email at lookup time |
| **Data classification + retention detail** | Licence-lookup requests pass through Cloudflare Workers in memory and are not written to persistent Cloudflare storage. Standard Cloudflare edge HTTP logs (containing IP + request metadata) are retained for approximately 6 hours per Cloudflare's published policy (subject to Cloudflare's then-current retention defaults). |
| **Categories of data subjects** | Asteris customers, prospective customers, and any visitor to our public sites |
| **Location** | Global edge network, US-headquartered (San Francisco, USA) |
| **Certifications / audits** | SOC 2 Type II, ISO 27001 |
| **International transfer mechanism** | EU-US Data Privacy Framework certified + EU SCCs (Commission Implementing Decision (EU) 2021/914) Modules 2/3 where applicable; UK IDTA applied for UK data subjects |
| **Privacy policy** | https://www.cloudflare.com/privacypolicy/ |
| **DPA** | https://www.cloudflare.com/cloudflare-customer-dpa/ |
| **Used since** | 01 June 2026 |
| **Last verified** | 01 June 2026 |

### Analytics

| Subprocessor | Plausible Analytics OU |
|---|---|
| **Purpose** | Privacy-friendly website analytics — page views, referrers, browser types, countries. Cookieless, aggregated, anonymous. |
| **Data shared** | Plausible Analytics is cookieless and processes only aggregated, anonymised data per their published data policy. |
| **Categories of data subjects** | Visitors to our public sites |
| **Location** | European Union (Estonia) |
| **Certifications / audits** | GDPR-compliant by design (no cookies, no cross-site tracking) |
| **International transfer mechanism** | Processing within the EEA — no third-country transfer |
| **DPA** | A DPA is available from Plausible for customers who require one: https://plausible.io/dpa |
| **Privacy policy** | https://plausible.io/privacy |
| **Data policy** | https://plausible.io/data-policy |
| **Used since** | 01 June 2026 |
| **Last verified** | 01 June 2026 |

### Code repository

| Subprocessor | GitHub, Inc. (Microsoft) |
|---|---|
| **Purpose** | Source code hosting (private repositories), version control, release artefact storage for plugin zip files distributed via the Asteris Licence Server |
| **Data shared** | No customer personal data. GitHub hosts our source code and release artefacts (plugin .zip files) which contain no customer data. If you separately interact with us via a public GitHub issue, GitHub will process that interaction under its own terms. |
| **Categories of data subjects** | None routinely; only persons who voluntarily interact via public GitHub channels |
| **Location** | United States |
| **Certifications / audits** | SOC 2 Type II, ISO 27001 |
| **International transfer mechanism** | EU-US Data Privacy Framework certified (Microsoft) + EU SCCs where applicable; UK IDTA applied for UK data subjects |
| **Privacy policy** | https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement |
| **Used since** | 01 June 2026 |
| **Last verified** | 01 June 2026 |

### Email + support

| Subprocessor | Google LLC (Gmail / Workspace) |
|---|---|
| **Purpose** | Inbox processing for support@, founder@, privacy@, security@ addresses (routed via Cloudflare Email Routing into Gmail) |
| **Data shared** | Whatever you include in emails to those addresses |
| **Categories of data subjects** | Anyone who emails us |
| **Location** | United States (Mountain View, CA) |
| **Certifications / audits** | SOC 2 Type II, ISO 27001, ISO 27018 |
| **International transfer mechanism** | EU-US Data Privacy Framework certified + EU SCCs (Commission Implementing Decision (EU) 2021/914) Module 3; UK IDTA applied for UK data subjects |
| **Privacy policy** | https://policies.google.com/privacy |
| **DPA** | https://workspace.google.com/terms/dpa_terms.html |
| **Used since** | 01 June 2026 |
| **Last verified** | 01 June 2026 |

---

## AI providers (special status)

The Asteris AI Suite module integrates with external AI providers (OpenRouter, OpenAI, Anthropic, Google Gemini).

Because the AI Suite uses a bring-your-own-key architecture, AI API requests are sent directly from your WordPress server to the AI provider you have configured, using credentials that you control. Asteris Commerce does not transmit, store, or have access to the prompts, responses, or API keys.

On that basis, AI providers are not subprocessors of Asteris Commerce in respect of those requests — your relationship with them is direct and governed by their terms. The AI provider is a separate controller (or your processor, depending on your configuration) with whom you have a direct relationship under their terms.

We document this here for B2B due-diligence completeness; if your compliance regime requires AI providers to be treated as Asteris subprocessors, the current product architecture cannot accommodate that — please contact support@asteriscommerce.com before purchase.

(Reference: CNIL guidance on the legal qualification of AI system providers — https://www.cnil.fr/en/determining-legal-qualification-ai-system-providers.)

When you use the AI Suite, your prompts and product data are sent to whichever AI provider you've configured. You should review their privacy policies:

| AI provider | Privacy policy |
|---|---|
| OpenRouter | https://openrouter.ai/privacy |
| OpenAI | https://openai.com/policies/privacy-policy |
| Anthropic | https://www.anthropic.com/legal/privacy |
| Google (Gemini API) | https://policies.google.com/privacy |

We document this in our [Privacy Policy §4](/asteris-utility-suite/privacy/#4-third-parties-who-process-your-data-on-our-behalf-subprocessors) but list them here for B2B due-diligence completeness.

---

## Affiliates and personnel

Asteris Commerce is currently operated by a small team. All personnel, contractors, or affiliates who have access to customer personal data are bound by written confidentiality and data-protection obligations equivalent to those required under GDPR Art. 28(3)(b). Material changes to this arrangement will be disclosed on this page.

---

## International transfers — applicable instruments

Where personal data is transferred outside the EEA to a subprocessor, the transfer is governed by the EU Standard Contractual Clauses (Commission Implementing Decision (EU) 2021/914), the EU-US Data Privacy Framework (where the subprocessor is certified), or another lawful transfer mechanism. The applicable mechanism for each subprocessor is shown in its table above.

Where personal data of UK data subjects is transferred to a third country, the UK International Data Transfer Addendum to the EU SCCs (issued by the ICO) applies in addition to or in place of the EU SCCs as appropriate.

For Australian data subjects, cross-border disclosure is handled in accordance with Australian Privacy Principle 8 under the Privacy Act 1988 (Cth).

---

## How we change this list

We rely on a general written authorisation under Article 28(2) of the GDPR. Under that model, we are required to inform you of any intended addition or replacement of a subprocessor so that you have the opportunity to object. The process below describes how we satisfy that obligation. (Reference: GDPR Art. 28(2) — https://gdpr-info.eu/art-28-gdpr/.)

When we add, remove, or change a subprocessor, we will:

1. Update this page (with a new "Last updated" date).
2. Append an entry to the [change log](#change-log) below.
3. Provide at least thirty (30) days' prior notice via (a) update to this page, (b) entry in the change log, (c) update to the RSS feed (see below), and (d) email to active B2B customers and any party who has subscribed to subprocessor change notifications. Notice will be given for any addition or replacement of a subprocessor, regardless of whether the change is considered material.

If you have a B2B Data Processing Addendum (DPA) with us, you may have additional notification rights — contact privacy@ for your specific terms.

### Objection process

If you object to a new subprocessor on reasonable data-protection grounds, we will:

1. Acknowledge your objection in writing within 7 days.
2. Discuss whether the change can be avoided for your account, or whether alternative safeguards can be put in place.
3. If no resolution is possible, allow you to terminate the affected service with a pro-rated refund of any prepaid unused subscription period.

Objections must be sent to support@asteriscommerce.com within 30 days of the change notice.

### Emergency / short-notice replacements

Where a subprocessor must be replaced urgently (for example, due to a security incident or unplanned service termination by the subprocessor), we may engage a replacement on shorter notice. We will notify affected customers as soon as practicable and document the reason in the change log below.

---

## Subscribing to subprocessor change notifications

Two ways to stay informed:

1. **RSS feed** — Subscribe at https://asteriscommerce.com/asteris-utility-suite/subprocessors/feed.xml (machine-readable, updated immediately on every change). New entries are added on the same day a change takes effect on this page, and at least 30 days before a new subprocessor begins processing personal data.
2. **Email list** — Email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) with the subject line `SUBPROCESSOR NOTIFICATIONS` to be added to our low-volume announcement list (<2 emails per year typically).

Active B2B customers are added automatically to the email notification list at onboarding (default opt-in; you may opt out at any time by replying to a notification or emailing privacy@).

---

## Change log

| Date | Change | Notes |
|---|---|---|
| 01 June 2026 | Initial subprocessor list published | Day 1 — covers Lemon Squeezy, Cloudflare, Plausible, GitHub, Google. |
| 05 June 2026 | Payment processor changed from Lemon Squeezy to Stripe direct | Asteris Commerce becomes the merchant of record; Stripe replaces Lemon Squeezy in the payment-processor row. Stripe Tax used for VAT/GST calculation. Licence server moved to first-party `pay.asteriscommerce.com` (Cloudflare Workers + D1). |

Future entries will follow the format above when subprocessors are added or removed.

We retain the full change log on this page for the life of Asteris Commerce. Versioned snapshots are also kept internally for at least seven (7) years to support audit and compliance enquiries. (Reference: GDPR Art. 30 records-of-processing obligation — https://gdpr-info.eu/art-30-gdpr/.)

---

## Contact

For subprocessor questions, DPA requests, or to subscribe to change notifications:

- **Email:** [support@asteriscommerce.com](mailto:support@asteriscommerce.com)
- **Response time:** within 7 days
