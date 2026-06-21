---
url: /asteris-utility-suite/security
title: "Security — Asteris Utility Suite"
meta_description: "Security posture, vulnerability disclosure policy, and reporting channel for Asteris Utility Suite. RFC 9116 security.txt compliant."
schema_type: WebPage
noindex: false
verified_date: 2026-06-01
legal_review_required: true
---

# Security Policy

**Last updated:** 01 June 2026
**Effective date:** 01 June 2026

---

## 1. Why this page exists

Security researchers (the good kind) follow a standard process: before testing or reporting a vulnerability, they look for a `security.txt` file at `/.well-known/security.txt` or a dedicated security page that tells them how to report.

This page is that resource for Asteris Commerce. If you've found a security issue in Asteris (the plugin) or our websites, please read on.

---

## 2. How to report a security issue

**Email:** [support@asteriscommerce.com](mailto:support@asteriscommerce.com)

**Please include:**
- A description of the vulnerability
- Steps to reproduce
- The version of Asteris affected (e.g., 1.9.5)
- Your environment (PHP version, WordPress version, WooCommerce version, theme)
- Whether you've disclosed this to anyone else (and when)
- Your name + how you'd like to be credited (if you'd like to be) — see §6

**Response time:**
- **First acknowledgement:** typically within 2 business days (AEST/AEDT). Critical reports flagged `[CRITICAL]` in the subject line are monitored outside business hours on a best-effort basis.
- **Investigation:** within 7 business days of acknowledgement
- **Patch (where applicable):** typically within 14–30 days depending on severity; critical vulnerabilities may be patched within 24–72 hours

We treat all reports as confidential until a fix is released. We will not retaliate against good-faith security research.

---

## 3. Scope

### In scope

| Asset | Description |
|---|---|
| Asteris Free plugin | WordPress.org plugin |
| Asteris Utility Suite paid plugin | Stripe checkout + Asteris Licence Server at `pay.asteriscommerce.com` |
| `asteriscommerce.com` | Sales website |
| `asteriscommerce.com` | Parent brand site |
| `getasteris.com` | Marketing redirect |
| `api.asteriscommerce.com/*` | Cloudflare Worker endpoints (license validation) |
| Plugin zip distribution endpoints (via Cloudflare R2) | Authenticated download URLs |

### Out of scope

| Asset | Why |
|---|---|
| Stripe (payment processor) | Report to their security team: [stripe.com/security](https://stripe.com/security) |
| Cloudflare (infrastructure) | Report to Cloudflare HackerOne program |
| Plausible Analytics | Report to Plausible directly |
| GitHub | Report to GitHub Security |
| WordPress core | Report to [hackerone.com/wordpress](https://hackerone.com/wordpress) |
| WooCommerce core | Report to [hackerone.com/automattic](https://hackerone.com/automattic) |
| Customer WordPress installs | Vulnerabilities specific to a customer's own WordPress installation, server, or third-party plugins are out of scope. **Vulnerabilities in the Asteris plugin code that manifest on customer installations are in scope and should be reported here.** |

### Not security issues (please don't report as such)

- Missing security headers that don't enable a specific attack
- "Vulnerable" libraries flagged by automated scanners without a working exploit
- Self-XSS that requires the user to attack themselves
- Social engineering of Asteris staff
- Physical attacks
- Denial of service (DoS/DDoS) vulnerabilities, including application-layer DoS, unless a non-disruptive proof-of-concept demonstrates the issue with negligible resource use
- Reports based on outdated software versions (please test against the latest release)
- Best-practice violations without a concrete exploit
- Spam or phishing reports about messages not sent by us

---

## 4. What we ask of you

To keep this a constructive relationship:

- **Don't access customer data** beyond the minimum needed to demonstrate the vulnerability. **Use your own test accounts whenever possible.** If during testing you incidentally access personal information of any Asteris customer or third party, cease testing immediately, do not store or transmit the data, and notify us within 24 hours. Doing so helps us meet our obligations under the Notifiable Data Breaches scheme (Privacy Act 1988 (Cth) Part IIIC).
- **Don't modify or destroy data** you don't own
- **Don't disrupt service** (no DoS testing, no traffic floods)
- **Give us a coordinated disclosure window of 90 days** from initial report before publishing details (consistent with CERT/CC and Google Project Zero norms). We will work with you to shorten this window where a patch is available sooner, and we will not request indefinite delays.
- **Don't exploit** the vulnerability for personal gain beyond the proof-of-concept

If you follow these guidelines in good faith, we will treat you as a partner, not a threat.

---

## 5. Safe harbour (good-faith research)

### Authorised conduct

Activities conducted in accordance with this policy are **authorised by Asteris Commerce** with respect to in-scope assets. We consider security research and vulnerability disclosure activities conducted consistent with this policy to be authorised conduct in relation to our in-scope assets, including with respect to Part 10.7 of the Criminal Code Act 1995 (Cth) (Computer offences, inserted by Schedule 1 of the Cybercrime Act 2001 (Cth)), and **we waive any provisions of our Terms of Service or Acceptable Use Policy that would prohibit or restrict such research.**

We will not consider such activities to constitute unauthorised access, modification, or impairment of data under the Criminal Code Act 1995 (Cth) Part 10.7.

### Our commitments

- **We will not initiate or support civil litigation, criminal complaints, or referrals to law enforcement** against researchers for good-faith security research conducted consistent with this policy. We reserve the sole right to determine whether a violation was accidental or in good faith, and we will give you an opportunity to respond before making that determination.
- **We will not ask your ISP, employer, or other parties** to investigate or sanction you for your research.
- **We will recognise your contribution publicly** (with your permission — see §6).
- **We will work with you** on coordinated disclosure timing.

### Limits of this safe harbour

Under Australian law, certain offences — including unauthorised access to or modification of restricted data under Part 10.7 of the Criminal Code Act 1995 (Cth) (inserted by Schedule 1 of the Cybercrime Act 2001 (Cth)) — cannot be waived by private agreement.

**This policy does not bind independent third parties.** We do not have the authority to bind third parties (e.g., Stripe, Cloudflare, WordPress.org). When testing, please stay within our in-scope assets to ensure our safe-harbour commitment applies.

### Information sharing with third parties

If a report concerns a third-party system in our stack, we will share non-identifying technical details with that third party. **We will share your identifying details with the third party only with your prior written consent.**

If you're unsure whether your research approach is acceptable, email security@ before testing.

---

## 6. Acknowledgements (Hall of Fame)

We will publicly credit researchers who report valid vulnerabilities (with your permission):

| Date | Researcher | Issue category | Severity |
|---|---|---|---|
| (No reports yet — submit yours and be the first!) | | | |

We do not currently pay monetary bounties. However, at your option, we offer:

- Public credit on the Hall of Fame above
- A **signed letter of recommendation** for valid critical-severity reports
- A **LinkedIn endorsement**
- Acknowledgement in the published CVE/Patchstack advisory

If we ever launch a paid bounty programme, we will announce it on this page and email previously-acknowledged researchers first.

---

## 7. Disclosure timeline

Our preferred disclosure timeline (negotiable on a case-by-case basis):

1. **Day 0:** You email security@ with the report
2. **Day 0–2 (business days):** We acknowledge receipt
3. **Day 2–7:** We investigate and confirm/refute the vulnerability
4. **Day 7–30:** We develop and test a patch (or coordinate with affected parties for out-of-scope issues)
5. **Day 30–60:** We release the patch and notify affected customers via email
6. **Day 90 onward:** You may publicly disclose at your discretion. We ask that you coordinate the timing of any public write-up with us so we can publish a coordinated advisory at the same time.
7. **Patch release:** We publicly credit you on this page (if you've consented)

**Default coordinated-disclosure window is 90 days from initial report**, consistent with CERT/CC and Google Project Zero norms. Researchers may publish after 90 days regardless of patch status; we may request a short extension for actively-exploited bugs, but we will not request indefinite embargoes.

For critical vulnerabilities with active exploitation in the wild, we will accelerate this timeline aggressively.

### CVE and advisory commitment

For confirmed vulnerabilities affecting the Asteris plugin, we will request a CVE identifier (via MITRE or Patchstack) and publish a security advisory on our blog and via the WordPress.org plugin changelog at patch release.

### Coordinated disclosure with WordPress.org

For vulnerabilities in the Asteris plugin distributed via WordPress.org, we will coordinate disclosure with the WordPress.org Plugin Review team (plugins@wordpress.org) as required by the WordPress.org plugin guidelines.

### Reporting to government CERT

You may also report serious vulnerabilities affecting Australian users to the Australian Signals Directorate's ACSC at [https://www.cyber.gov.au/report-and-recover/report/report-a-vulnerability](https://www.cyber.gov.au/report-and-recover/report/report-a-vulnerability). Please notify us in parallel so we can coordinate the response.

---

## 8. The `/.well-known/security.txt` file (RFC 9116)

This file is served at `https://asteriscommerce.com/asteris-utility-suite/.well-known/security.txt`. Researchers can find it via well-known-URI conventions. Content:

```
Contact: mailto:support@asteriscommerce.com
Expires: 2027-05-01T00:00:00.000Z
Preferred-Languages: en
Canonical: https://asteriscommerce.com/asteris-utility-suite/.well-known/security.txt
Policy: https://asteriscommerce.com/asteris-utility-suite/security
Acknowledgments: https://asteriscommerce.com/asteris-utility-suite/security#acknowledgements
```

**Notes for the deployment team:**
- File MUST be served at the literal path `/.well-known/security.txt` (case-sensitive)
- File MUST be served with `Content-Type: text/plain; charset=utf-8`
- File MUST be served over HTTPS
- Per RFC 9116 §2.5.5, the `Expires:` value MUST NOT be more than one year in the future; **we set ours 11 months out and rotate at T-45 days**. A Cloudflare cron / CI job must alert at T-45 days before expiry.
- The `Canonical:` URL must exactly match where the file is served (lowercase, trailing-slash convention)
- In Astro, place the file at `public/.well-known/security.txt` — Astro serves the `public/` folder root verbatim
- **Deliberate choice: file is not OpenPGP-signed.** RFC 9116 §3.3 RECOMMENDS but does not require signing. We have opted to skip signing pending publication of a long-lived PGP key in v1.1; the signature would otherwise reference a key with no clear chain of trust for a solo operator.

**Optional additions (consider for v1.1):**
- `Encryption:` — link to a PGP public key for encrypted disclosure
- `Hiring:` — link to security-engineer job postings (when we hire)

---

## 9. PGP encryption (not yet supported)

We do not currently publish a PGP key for encrypted security disclosure. For sensitive reports:

1. Request an encrypted channel by emailing security@ with the subject `[ENCRYPTION REQUESTED]` and no technical details in the body.
2. We will respond within one business day with a Signal username for the disclosure session.
3. We will treat the encrypted channel with the same response-time commitments.

A long-lived PGP key will be published in v1.1 of this policy.

---

## 10. Contact

| For | Email |
|---|---|
| Security vulnerabilities | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |
| Policy questions | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |
| General questions | [support@asteriscommerce.com](mailto:support@asteriscommerce.com) |
