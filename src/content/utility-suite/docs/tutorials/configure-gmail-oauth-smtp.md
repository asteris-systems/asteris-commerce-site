---
title: "Configure Gmail OAuth SMTP"
description: "End-to-end Gmail OAuth setup for WordPress in 15 minutes — works for personal Gmail and Google Workspace. Covers the OAuth consent screen flow, test send, DNS check, and the common pitfalls (rate limits, sender alignment, 2FA requirements)."
sidebar:
  order: 5
---

# Configure Gmail OAuth SMTP

**Goal:** in 15 minutes, every email sent from your WordPress site (password resets, form notifications, comments, plugin emails) routes through Gmail OAuth — secure, reliable, no app-password workaround required.

**Asteris modules used:** SMTP + Email Logs (paid tier — Asteris Utility Suite Free has generic SMTP only)

**Why OAuth instead of app passwords:**

- **Modern security** — OAuth tokens are scoped (only "send mail" capability, not full account access) and rotate automatically
- **Google is deprecating app passwords** — they're optional today but their long-term availability isn't guaranteed
- **No password storage in your WP database** — even encrypted, storing your Gmail password is worse than storing an OAuth refresh token
- **Works with 2FA-enabled accounts** without workarounds

---

## Before you start

You need:

- **A paid Asteris Utility Suite licence** (OAuth providers are paid; lite version has generic SMTP only)
- **A Gmail account** (personal `@gmail.com`) or **Google Workspace account** (custom domain like `@yourcompany.com`)
- ~15 minutes
- Admin access to your WordPress site

Volume considerations BEFORE you start:

- **Personal Gmail**: ~500 emails/day rate limit (Google's published limit; some users see it lower)
- **Google Workspace**: ~2000 emails/day rate limit
- **If you send more**: don't use Gmail. Use a transactional service (SendGrid, Mailgun, Amazon SES). These are designed for high volume + better deliverability.

Asteris's Gmail integration is right for low-to-medium volume sites: contact forms (rare), password resets, comment notifications, weekly newsletters under 500-2000 subscribers.

---

## Step 1 — Activate the SMTP module

WP Admin → **Asteris → Modules** → toggle **SMTP + Email Logs** to ON.

The SMTP submenu appears.

---

## Step 2 — Select Gmail as the provider

**Asteris → SMTP → Provider**

- **Provider** — Gmail
- **From email** — the Gmail address you want to send from (e.g., `notifications@yourcompany.com` for Workspace, or `you@gmail.com` for personal)
- **From name** — your site name (e.g., `Acme Site`)

> 💡 **From email must match the authenticated Gmail account.** Gmail rejects sends where the From doesn't match the authenticated user. If you authenticate as `you@gmail.com` but try to send From `noreply@yourcompany.com`, Gmail rewrites the From to your actual address — your "noreply" branding is lost.
>
> For real custom-domain From addresses, use Google Workspace (where you can configure send-as aliases) or use a transactional provider (SendGrid / Mailgun / SES).

---

## Step 3 — Click "Authorise with Google"

Asteris opens Google's OAuth consent screen in a new tab.

You'll see:

1. **Sign in** — pick the Gmail account you want to authorise
2. **App consent screen** — "Asteris Utility Suite wants to access your Google Account"
   - **Send email on your behalf** (Gmail send scope)
   - **View basic profile info** (your email + name — used to verify the From address)
3. **Click Allow**

You'll be redirected back to your WordPress site. Asteris stores the OAuth refresh token in your WP database (encrypted with AES-256-CBC).

> ⚠️ **"This app isn't verified" warning?** If you see Google's "unverified app" warning during the OAuth consent screen, that's because the Asteris Gmail integration is registered as an "external" app rather than verified by Google.
>
> For most users this is fine — click **Advanced → Go to Asteris Utility Suite (unsafe)** to continue. The "unsafe" wording is Google's standard warning for non-verified apps; the OAuth flow itself is secure.
>
> Asteris is actively pursuing Google's app verification (which requires a security review process). Verification status is tracked at [/changelog](/asteris-utility-suite/changelog/).

---

## Step 4 — Verify the connection

You're back at Asteris → SMTP → Provider after the OAuth flow. The panel should show:

- ✓ **Connected to Gmail**
- ✓ **From email**: your authenticated address
- ✓ **Token expiry**: ~1 hour (auto-refreshes before expiry)
- ✓ **Last refresh**: just now

If you see ✗ or any error message, repeat Step 3 — the OAuth flow may have failed silently.

---

## Step 5 — Send a test email

**Asteris → SMTP → Test Send**

- **To** — your own email address at a different provider (e.g., if From is your Gmail, test to your work address or an alternate inbox)
- **Subject** — `Asteris SMTP test`
- **Body** — anything

Click **Send**. Within 30 seconds:

- ✓ Asteris shows "Send successful"
- ✓ The test email arrives in your test inbox
- ✓ A row appears in **Asteris → SMTP → Logs** with `Status: sent`

If the send fails, jump to "Common issues" below.

---

## Step 6 — Verify DNS records (deliverability)

Even with OAuth, your emails can land in spam if SPF/DKIM/DMARC aren't aligned.

**Asteris → SMTP → Deliverability → DNS Check**

Asteris checks three records for your sending domain:

### SPF (Sender Policy Framework)

For Gmail:

- **Personal Gmail**: SPF is set by Google for `@gmail.com`. Nothing to configure on your domain.
- **Google Workspace**: your domain's TXT record should include `v=spf1 include:_spf.google.com ~all`

Asteris's DNS check confirms this. If your TXT record is missing or wrong, fix it in your DNS provider's panel (Cloudflare DNS / GoDaddy / Route53 / etc.).

### DKIM (DomainKeys Identified Mail)

- **Personal Gmail**: Google signs DKIM with their domain key. Your domain isn't involved.
- **Google Workspace**: configure DKIM in the [Google Admin Console → Apps → Google Workspace → Gmail → Authenticate email → Generate new record]. Add the resulting TXT record to your DNS.

### DMARC (Domain-based Message Authentication, Reporting and Conformance)

For both personal and Workspace:

Add a TXT record at `_dmarc.yourdomain.com` (or use a hosted DMARC service):

```
v=DMARC1; p=quarantine; rua=mailto:dmarc@yourdomain.com; ruf=mailto:dmarc@yourdomain.com; fo=1
```

This tells receivers what to do when SPF/DKIM fail and where to send reports. `p=quarantine` is a sensible starting policy; you can tighten to `p=reject` after watching reports for ~30 days.

Asteris's DNS check shows ✓ / ⚠️ / ❌ per record. Aim for ✓ on all three.

---

## Step 7 — Send a real test from another part of WordPress

Now test that `wp_mail()` from elsewhere in WordPress works:

1. **Users → Add New** → create a test user with a real email address you control
2. ✓ **Send User Notification**
3. **Add New User** → the user gets the WordPress welcome email

Check the inbox. Check **Asteris → SMTP → Logs** — the send should appear with `Status: sent`.

If `wp_mail()` from a real WordPress action works end-to-end, the integration is complete. Every plugin that uses `wp_mail()` (forms, comments, password resets, WooCommerce, etc.) now routes through Gmail OAuth automatically.

---

## Step 8 — Set up email logs + retention

**Asteris → SMTP → Logs → Settings**

- ✓ **Enable email logging**
- ✓ **Log body content** (HTML + plain text — useful for debugging)
- **Retention** — default 30 days (set to 90 days if you want longer audit history)

The log captures every send. Each row shows:

- Recipient, subject, date, status
- Full body (HTML + plain text)
- Attachment list (filename + size; binary not stored)
- Provider response (Gmail's API response details)

This is your audit trail. Useful for debugging "user says they didn't get the password reset" — you can verify the send happened + see Gmail's delivery response.

---

## Step 9 — Set up failure alerts

**Asteris → SMTP → Deliverability → Alerts**

- ✓ **Alert on failed-send threshold** — notify when >10 sends fail in a 1-hour window
- **Alert recipient** — admin email (default) or a dedicated `alerts@` mailbox

Common causes of alert spikes:

- Gmail rate limit hit (>500/day for personal, >2000/day for Workspace)
- OAuth token revoked (user manually revoked access in their Google account settings)
- Send blocked by Gmail spam filter (rare but happens — usually means a sender reputation issue)
- DNS record change broke SPF/DKIM alignment

---

## Step 10 — Test the OAuth refresh

OAuth tokens expire (~1 hour for the access token; the refresh token is long-lived). Asteris automatically refreshes the access token before expiry, but you should verify the refresh flow works:

1. **Asteris → SMTP → Provider → Force refresh token** (admin button)
2. The panel should refresh and show a new "Last refresh: just now" timestamp
3. Send another test (Step 5) to verify

If the refresh fails, you'll need to re-authorise (repeat Step 3). The refresh can fail if you've revoked access in your Google account settings or if your Workspace admin has restricted third-party app access.

---

## Common issues

### "Sends fail with 'Daily user sending limit exceeded'"

You hit Gmail's daily rate limit. Personal Gmail = ~500/day; Workspace = ~2000/day.

**Fix**: spread sends over time (don't burst a large batch in 10 minutes), OR switch to a transactional service (SendGrid free tier is 100/day; paid tiers handle millions). For a site sending more than a few hundred emails/day, transactional services are the right architecture.

### "OAuth keeps failing — 'Access blocked'"

Google Workspace admins can restrict third-party app access. If you're in a managed Workspace:

1. Contact your IT admin
2. Ask them to add Asteris to the allowlist (Google Admin Console → Security → API controls → App access control → Manage Google services)
3. Re-run the OAuth flow

For personal Gmail accounts, "Access blocked" is rare; usually a transient Google issue. Wait 10 minutes + retry.

### "Sends marked as spam by Gmail recipients"

Even with OAuth, sender reputation matters. If your domain is new or has low send volume:

1. Set up SPF + DKIM + DMARC (Step 6)
2. Warm up your sending — don't send 100 emails on day 1 from a brand-new domain
3. Make sure From + Reply-to align (don't use different domains)
4. Avoid spam-triggering subject lines (`URGENT`, `FREE`, `Limited offer`)
5. Add an unsubscribe link if it's marketing-class email

If recipients consistently mark your emails as spam, your domain reputation may be permanently damaged. Recovery: send only transactional (password resets, etc.) for 30+ days, monitor reputation via [Google Postmaster Tools](https://postmaster.google.com/).

### "OAuth worked but emails are silently failing"

Check **Asteris → SMTP → Logs**. The log shows the provider response for each send. Common failure responses:

- `401 Unauthorized` — token expired and refresh failed. Re-authorise (Step 3).
- `403 Forbidden — Daily user sending limit exceeded` — rate limit. Switch to transactional service.
- `400 Bad Request — Invalid From: header` — your From email doesn't match the authenticated account. Update From to match (Step 2).

### "I changed my password on Gmail. Will OAuth still work?"

Yes — OAuth tokens survive password changes. Only revoking access (via your Google account → Security → Third-party access → Asteris) invalidates the tokens.

### "I revoked Asteris's access by accident"

Re-run the OAuth flow (Step 3). Asteris detects the revocation and prompts you to re-authorise on the next admin page load.

### "Can I use Gmail OAuth for multiple WordPress sites?"

Each site needs its own OAuth grant — they're tied to the (site, Google account) pair. The same Google account can be authorised across multiple sites; each site stores its own refresh token independently.

For agencies with many client sites, consider using a dedicated transactional service per agency instead of granting Gmail OAuth across many client sites (easier to manage + better deliverability at scale).

### "What scopes does Asteris request?"

- `https://www.googleapis.com/auth/gmail.send` — send mail
- `https://www.googleapis.com/auth/userinfo.email` — verify the From address matches the authenticated user
- `https://www.googleapis.com/auth/userinfo.profile` — read user name for the OAuth UI

That's it. Asteris does NOT request access to read incoming mail, modify drafts, or access calendar/drive/etc.

Review the scopes any time in **Asteris → SMTP → Provider → Show requested scopes**.

---

## See also

- [SMTP + Email Logs module configuration](/asteris-utility-suite/docs/modules/smtp/)
- [Asteris vs WP Mail SMTP comparison](/asteris-utility-suite/vs/wp-mail-smtp/)
- [Migrate from WP Mail SMTP](/asteris-utility-suite/migrate/from-wp-mail-smtp/)
- [Forms module](/asteris-utility-suite/docs/modules/forms/) — relies on SMTP for notification delivery
- [Google's email sender best practices](https://support.google.com/mail/answer/81126) — official Google reference
