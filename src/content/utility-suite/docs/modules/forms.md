---
title: "Configure Forms"
description: "Step-by-step setup of the Asteris Forms module: drag-and-drop builder, 20 field types, conditional logic, multi-step forms, 5 integrations, three-layer anti-spam. Build your first form in 10 minutes."
sidebar:
  order: 4
---

# Configure the Forms module

For the marketing overview of this module, see [/modules/forms](/asteris-utility-suite/modules/forms/). This page covers the practical setup — Quickstart, common workflows, settings reference, and the developer surface (REST + WP-CLI).

The Forms module ships with conditional logic, multi-step forms, and 5 integrations included — not gated to a Pro tier. The Quickstart below builds a working contact form in 10 minutes; the workflows cover the more advanced patterns (multi-step, conditional fields, Mailchimp wire-up, anti-spam tuning).

---

## Quickstart (10 minutes — your first contact form)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Forms** to ON.

The Forms submenu appears, plus a new "Asteris Form" Gutenberg block and `[asteris_form id="..."]` shortcode.

### 2. Create a new form

**Asteris → Forms → Add New**

Set the form title (this is for your reference, not user-facing): `Contact form` for example. The drag-and-drop builder opens.

### 3. Add fields — a basic contact form

Drag from the right sidebar into the canvas:

1. **Single-line text** → label "Your name" → required ✓
2. **Email** → label "Your email" → required ✓ (Asteris validates email format)
3. **Multi-line text** → label "Message" → required ✓ → rows: 6

That's enough for a basic contact form. Save the form.

### 4. Configure the email notification

In the form builder → **Settings tab → Notifications**

1. **To** — `you@yourdomain.com` (or use `{admin_email}` shortcode for the WP admin email)
2. **From name** — your site name (e.g., `Acme Site`)
3. **From email** — should be on your domain (e.g., `forms@yourdomain.com`)
4. **Reply-to** — `{field:your_email}` (the visitor's email, so you can hit reply)
5. **Subject** — `New contact form submission from {field:your_name}`
6. **Message** — paste this template:

```
A new contact form submission was received:

Name: {field:your_name}
Email: {field:your_email}

Message:
{field:message}

Submitted at: {submission_time}
From: {submission_url}
```

Save.

> ⚠️ **Reliable email delivery requires SMTP.** WordPress's default `wp_mail()` is unreliable on most hosting — emails get spam-filtered or blocked. If you haven't already, activate the [SMTP + Email Logs module](/asteris-utility-suite/docs/modules/smtp/) too. See [/docs/tutorials/configure-gmail-oauth-smtp](/asteris-utility-suite/docs/tutorials/configure-gmail-oauth-smtp/) for the most common SMTP setup.

### 5. Add anti-spam

In the form builder → **Settings tab → Anti-spam**

Three layers — enable at least the first:

- ✓ **Honeypot** — invisible field that bots fill in and humans don't. Catches ~80% of bot submissions. Zero user friction. Always on.
- ⚙️ **Cloudflare Turnstile** — frictionless modern CAPTCHA. Requires Cloudflare Turnstile site key + secret key (free at [cloudflare.com/turnstile](https://www.cloudflare.com/products/turnstile/)). Catches the bots that bypass honeypot.
- ⚙️ **hCaptcha** — traditional CAPTCHA fallback. Adds a "click to verify" interaction. Use only if Turnstile alone doesn't catch enough spam.

Recommended: Honeypot + Turnstile. Add hCaptcha only if you continue to receive spam.

### 6. Place the form on a page

You have three options:

**Option A — Gutenberg block** (recommended for block-editor pages):

1. Open the page in the Block Editor
2. Add an "Asteris Form" block
3. Pick your form from the dropdown
4. Save

**Option B — Shortcode**:

```
[asteris_form id="123"]
```

Paste anywhere a shortcode renders — Classic editor, page builders, widget areas. Replace `123` with your form's ID (visible in **Asteris → Forms** list).

**Option C — Builder integration**:

- **Elementor** — drop the "Asteris Form" widget; pick form from dropdown
- **Bricks** — same flow, "Asteris Form" element
- **Beaver Builder** — module under "Asteris" category
- **Divi** — module under "Asteris" category

### 7. Submit a test entry

Open the page in an incognito window. Fill the form. Submit.

You should see:

- A success message (default "Thank you. We'll be in touch.")
- An email in your inbox matching the notification template above
- The submission in **Asteris → Forms → Entries** for that form

If anything's missing, troubleshoot in this order:

1. **Email not received** — check **Asteris → SMTP → Logs** (if SMTP module is active). The send attempt + provider response is logged.
2. **Submission not in Entries** — JavaScript error preventing submission. Open browser DevTools → Console → check for errors.
3. **Success message but no email** — `wp_mail()` failed silently. Activate SMTP module + configure a provider.

### 8. Tighten the validation

In the form builder → click the **Email field** → field settings:

- ✓ **Required**
- ✓ **Validate as email format**
- ✓ **Disallow disposable email domains** (catches mailinator, tempmail, etc.)
- **Max length** — 254 (RFC limit)

Click the **Message field**:

- **Min length** — 20 characters (filters one-word spam)
- **Max length** — 5000 characters (prevents copy-paste essay spam)

Save. Your form is live and tuned.

---

## Common workflows

### Add conditional logic (show/hide fields based on user input)

Conditional logic is at the field level. Example: "If user selects 'business inquiry' from a dropdown, show the company name field; otherwise hide it."

1. Add a **Dropdown** field → label "What's this about?" → options: `General question`, `Business inquiry`, `Press / media`
2. Add a **Single-line text** field → label "Company name"
3. On the Company name field → **Conditional logic** tab:
   - ✓ **Enable conditional logic**
   - **Show this field if** → `What's this about?` → `is` → `Business inquiry`
4. Save

Now the Company name field appears only when the user selects "Business inquiry". Conditional logic supports AND/OR groups; you can stack multiple conditions on a single field.

> 💡 You can also use conditional logic on **page breaks** in multi-step forms — skip pages based on earlier answers. Useful for branching applications / quizzes.

### Build a multi-step form (with progress bar)

For long forms, split across pages:

1. Build all your fields as normal
2. Drag a **Page break** field where you want the first page to end
3. The builder shows a "Page 2" tab — drag fields into it
4. Repeat for more pages

**Form Settings → Multi-step** → toggle ON:

- ✓ **Progress bar** — Linear / Stepped (numbered circles) / Hidden
- ✓ **Per-page validation** — validate each page before "Next" (default ON)
- ⚙️ **Save-and-resume** — paid feature; sends user a magic-link to resume their partial submission later (default OFF)

### Wire up Mailchimp integration

**Asteris → Forms → Integrations → Mailchimp**

1. Click **Connect Mailchimp**
2. Paste your **API key** (Mailchimp → Account → Extras → API keys → Create A Key)
3. Save

Per-form configuration in the form builder → **Integrations tab → Mailchimp**:

1. ✓ **Send submissions to Mailchimp**
2. **Audience (list)** — pick from your Mailchimp lists
3. **Email field** — pick the form field that holds the email address (Asteris auto-detects if you have a single email field; you set it manually if multiple)
4. **Merge tags** — map form fields to Mailchimp merge tags:
   - `Your name` form field → `FNAME` Mailchimp tag (or split into first/last if your audience uses them)
5. **Tags** — apply tags on add (e.g., `contact-form`, `website-signup`)
6. **Double opt-in** — toggle on to send the Mailchimp confirmation email (recommended for compliance)
7. **GDPR consent fields** — if your audience has GDPR-required consents, map them

Save. Test by submitting the form — the email address should appear in your Mailchimp audience within 30 seconds.

ConvertKit, MailerLite, Slack, and Zapier follow the same pattern (API key → per-form mapping). Slack uses an incoming webhook URL instead of an API key.

### Configure file uploads

1. Drag a **File upload** field into the form
2. Field settings:
   - **Allowed types** — `pdf,doc,docx,jpg,png` (extensions, comma-separated)
   - **Max size per file** — default 10 MB (configurable up to your PHP `upload_max_filesize`)
   - **Max number of files** — 1 by default
3. Save

Uploaded files land in `wp-content/uploads/asteris-forms/<form-id>/`. The submission entry stores the URL to each uploaded file. Per-form retention deletes the files when the entry is purged.

> ⚠️ **File uploads from a public form are an attack surface.** Asteris validates file extensions on the server side (not just client-side MIME type), rejects executable extensions (`.php`, `.exe`, `.js`, `.html`, etc.), and stores uploads with randomised filenames. But you should still:
> - Disable file uploads if your form doesn't strictly need them
> - Configure a virus scanner at the host level if you accept uploads from untrusted users
> - Set tight max-size limits to prevent disk-fill DoS

### Set up PII redaction (sensitive fields never enter Activity Log)

For fields that capture sensitive data (medical info, financial details, government ID numbers):

1. Click the field in the builder
2. **Privacy tab → Mark as PII**
3. Save

PII-marked fields:

- Show as `[REDACTED]` in the Activity Log capture
- Are excluded from CSV export by default (admin can toggle to include for compliance audits)
- Trigger the `asteris_activity_log_redact_value` filter at capture time

This works regardless of whether the Activity Log module is installed — if it is, the field never enters that log either.

### Configure GDPR consent capture

For EU-facing forms, you need explicit consent for processing personal data:

1. Drag a **Checkbox** field — label: "I consent to having my information stored and used to respond to this enquiry. See our [privacy policy](/asteris-utility-suite/privacy/)."
2. Field settings → ✓ **Required** → ✓ **Mark as GDPR consent field** (special flag)
3. Save

The GDPR consent flag stores the consent text snapshot + timestamp in a separate `wp_asteris_forms_consents` table — so even if you later edit the consent text, the snapshot at the time of submission is preserved (Article 7(1) GDPR requirement).

### Export form entries to CSV

**Asteris → Forms → Entries → [select form] → Export → CSV**

Options:

- **Date range** — default last 90 days, configurable
- **Include PII fields** — default off; admin can override for compliance audits
- **Format** — UTF-8 with BOM (Excel-friendly) / UTF-8 without BOM (universal)

### Handle a GDPR data-subject access request via forms

When a user requests their data:

1. **Asteris → Forms → Entries** → filter by their email address (search bar)
2. Export the matched entries to CSV
3. Send the CSV to the requester
4. (For erasure requests) → Tools → Erase Personal Data → enter their email → WP core triggers Asteris's eraser, which deletes matching submissions across all forms

This integrates with WP core's standard GDPR exporter/eraser; you don't need a custom workflow.

---

## Settings reference

### Form builder

- **20 field types** — text, textarea, email, phone, number, dropdown, radio, checkboxes, address, date, time, date+time, file upload, signature, rating, URL, hidden, HTML block, page break, section heading
- **Conditional logic** per field — AND/OR rule groups
- **Multi-step** — page breaks + progress bar + per-page validation
- **Field validation** — required, min/max length, regex pattern, format-specific (email, URL, phone)

### Anti-spam

- **Honeypot** — invisible field, always on, zero friction
- **Cloudflare Turnstile** — site key + secret key
- **hCaptcha** — site key + secret key

### Integrations

- **Mailchimp** — API key, per-form audience + merge tag mapping
- **ConvertKit** — API key, per-form form ID + tag mapping
- **MailerLite** — API token, per-form group + custom field mapping
- **Slack** — incoming webhook URL per form
- **Zapier** — webhook URL per form (Zapier handles the destination)

### Entry storage

- **Local storage** in `wp_asteris_forms_entries` custom table
- **Per-form retention** — default 90 days, configurable (forever, 30/60/90/180 days, or custom)
- **CSV export** — UTF-8 with/without BOM
- **PII redaction** — field-level flag

### GDPR + consent

- **Consent fields** — separate `wp_asteris_forms_consents` table with text + timestamp snapshots
- **WP core exporter integration** — automatic via `wp_privacy_personal_data_exporters` filter
- **WP core eraser integration** — automatic via `wp_privacy_personal_data_erasers` filter

### Notifications

- **To / From / Reply-to / Subject / Message** — per-form, with field-substitution shortcodes (`{field:fieldname}`, `{submission_time}`, `{submission_url}`, etc.)
- **Conditional notifications** — send to different addresses based on form values
- **Multiple notifications** — fire multiple emails per submission (e.g., one to admin, one auto-reply to user)

### Confirmation

- **Message** — default "Thank you. We'll be in touch." (per-form)
- **Redirect URL** — redirect on submit
- **Hide form** — replace form with confirmation message on the same page

---

## REST API

```
# Forms
GET    /wp-json/asteris/v1/forms
GET    /wp-json/asteris/v1/forms/<id>
POST   /wp-json/asteris/v1/forms                       # create
PUT    /wp-json/asteris/v1/forms/<id>                  # update
DELETE /wp-json/asteris/v1/forms/<id>

# Entries
GET    /wp-json/asteris/v1/forms/<id>/entries
GET    /wp-json/asteris/v1/forms/<id>/entries/<entry_id>
POST   /wp-json/asteris/v1/forms/<id>/submit           # accept submission via API (e.g., headless / mobile app)
DELETE /wp-json/asteris/v1/forms/<id>/entries/<entry_id>
GET    /wp-json/asteris/v1/forms/<id>/export?format=csv

# Integrations
GET    /wp-json/asteris/v1/forms/integrations/status
POST   /wp-json/asteris/v1/forms/integrations/<name>/test
```

All write endpoints capability-checked (`manage_options`). The public `submit` endpoint accepts unauthenticated submissions (it's how the front-end form posts).

---

## WP-CLI

```bash
# Forms admin
wp asteris forms list
wp asteris forms info --id=<form_id>
wp asteris forms create --title="<title>" --import=<json-file>
wp asteris forms export --id=<form_id> --format=json

# Entries
wp asteris forms entries list --form-id=<id>
wp asteris forms entries export --form-id=<id> --format=csv --output=entries.csv
wp asteris forms entries delete --id=<entry_id>
wp asteris forms entries retention purge          # purge entries past their retention window

# Integrations
wp asteris forms integration test --name=mailchimp
wp asteris forms integration test --name=slack --form-id=<id>
```

---

## See also

- [Asteris vs WPForms comparison](/asteris-utility-suite/vs/wpforms/) — conditional logic + integrations not gated
- [SMTP module](/asteris-utility-suite/docs/modules/smtp/) — required for reliable email delivery on form submissions
- [Activity Log + Site Health module](/asteris-utility-suite/docs/modules/activity-log/) — captures form submissions with PII redaction
- [WordPress meta description guide](/asteris-utility-suite/guides/wordpress-meta-description-guide/) — useful for the form's landing page SEO
