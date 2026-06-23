---
title: "Duplicate a post or page"
description: "Step-by-step guide to the Asteris Duplicate Post module: one-click clone any post, page, or custom post type. Copies content, taxonomies, custom fields, and the featured image into a fresh draft. Settings reference, custom post types, capabilities, and migrating from Yoast Duplicate Post."
sidebar:
  order: 14
---

# Duplicate a post or page

For the marketing overview of this module, see [/modules — Duplicate Post](/asteris-utility-suite/modules/). This page covers the practical use — the Quickstart, what gets copied, the settings reference, and notes on custom post types and capabilities.

Duplicate Post adds a one-click **Duplicate** link to every row in your Posts and Pages lists (and any custom post type you enable). Clicking it clones the item — content, taxonomies, custom fields, and featured image — into a fresh **draft**, ready to edit. It replaces standalone plugins like Yoast Duplicate Post.

---

## Quickstart (1 minute)

### 1. Activate the module

WP Admin → **Asteris → Modules** → toggle **Duplicate Post** to ON.

That's it — there's nothing else to configure to start. Sensible defaults are applied (enabled for Posts and Pages, copies become drafts).

### 2. Duplicate an item

1. Go to **Posts** (or **Pages**).
2. Hover over the row of the item you want to copy. A line of links appears under the title — **Edit · Quick Edit · Trash · View · Duplicate**.
3. Click **Duplicate**.

A copy is created instantly and (by default) the new draft opens in the editor. The copy's title gets a `(copy)` suffix, e.g. *About Us (copy)*.

### 3. Edit and publish

The duplicate is a normal draft — edit it, change the title and slug, then publish when you're ready. The original is untouched.

> **Tip — duplicate from inside the editor.** When editing a post in the Classic editor, you'll also see a **⧉ Copy to a new draft** button in the Publish box. (In the Block editor, use the Duplicate link in the Posts/Pages list.)

---

## What gets copied

| Copied to the new draft | Not copied |
| --- | --- |
| Title (with your suffix, e.g. "(copy)") | Comments |
| Content — including all Gutenberg blocks | The published status — copies are always drafts (see below) |
| Excerpt | The slug — WordPress generates a fresh, unique one |
| All taxonomies (categories, tags, custom taxonomies) | Internal edit-lock / revision data |
| All custom fields / post meta (including those added by other plugins) | |
| Featured image | |
| Parent, menu order, comment + ping status, password | |

**Copies are never published automatically.** Even if you set the copy status to "same as original", a published source becomes a **draft** copy — so you can never accidentally create a second live URL without reviewing it first.

---

## Settings

WP Admin → **Asteris → ⧉ Duplicate Post**.

| Setting | What it does | Default |
| --- | --- | --- |
| **Enable for** | Which content types show the Duplicate link. Tick any public post type — Posts, Pages, Products, or your own custom post types. | Posts + Pages |
| **New copy status** | *Always a draft* (recommended), or *Same as original* (published sources still become drafts). | Always a draft |
| **Title suffix** | Text appended to the copied title, e.g. ` (copy)`. Leave blank for an exact title match. | ` (copy)` |
| **Author of the copy** | *Keep the original author*, or *Set to whoever clicks Duplicate*. | Keep original |
| **After duplicating** | *Open the new draft in the editor*, or *Return to the list*. | Open in editor |

Click **Save Settings** to apply.

---

## Custom post types

Duplicate Post works with any post type that has an admin list screen — WooCommerce Products, your theme's portfolio items, custom content types from other plugins, and so on.

To enable it for a custom post type:

1. Go to **Asteris → ⧉ Duplicate Post**.
2. Under **Enable for**, tick the post type.
3. Save. The **Duplicate** link now appears in that post type's list.

---

## Who can duplicate?

Duplicating uses the same permission as **editing** that content type. A user who can edit Posts can duplicate Posts; a user who can edit Products can duplicate Products. The Duplicate link is hidden for anyone without the relevant edit capability, and every duplicate action is protected by a security nonce.

---

## Migrating from Yoast Duplicate Post / Duplicate Page

1. Activate the **Duplicate Post** module in Asteris (above).
2. Confirm the **Duplicate** link appears on your Posts and Pages.
3. Deactivate and delete the standalone duplicate plugin.

There's nothing to import — Duplicate Post has no data of its own. Any drafts you already created with another plugin are normal posts and are unaffected.

---

## Troubleshooting

**The Duplicate link isn't showing.**
Check three things: (1) the module is ON under **Asteris → Modules**; (2) the post type is ticked under **Asteris → ⧉ Duplicate Post → Enable for**; (3) your user role can edit that content type.

**My custom fields didn't copy.**
All standard post meta is copied. A few plugins store data in their own custom tables rather than post meta — that data lives outside the post and isn't part of a "duplicate". If something specific is missing, email [support@asteriscommerce.com](mailto:support@asteriscommerce.com) and tell us which plugin set the field.

**The copy is a draft — I wanted it published.**
That's intentional, to avoid creating a duplicate live page by accident. Open the draft and publish it when you've made your edits.
