---
url: /asteris-utility-suite/founder
title: "Why we built Asteris Utility Suite — the team behind the plugin"
description: "We built Asteris Utility Suite because we got sick of being our own integration testers every Tuesday. One plugin. 13 modules. One update cycle. One inbox. Built by a small team in Sydney."
og_title: "Why we built Asteris Utility Suite"
og_description: "We run WordPress sites. We built Asteris because we got sick of paying $1,400+/yr across a dozen vendors. One plugin, 13 modules, one update cycle, one inbox."
canonical: https://asteriscommerce.com/asteris-utility-suite/founder
primary_keyword: asteris story
secondary_keywords:
  - why asteris for wordpress
  - team behind asteris
  - small team wordpress plugin
schema_type: AboutPage
ai_bot_policy: allow-citation-class
cannibalisation_note: "Brand-story page. Should not target 'asteris for wordpress' (homepage). Per §4.5 Zone 5."
internal_links_out:
  - /asteris-utility-suite/pricing
  - /asteris-utility-suite/free
  - /asteris-utility-suite/roadmap
  - /asteris-utility-suite/changelog
  - /asteris-utility-suite/support
noindex: false
verified_date: 2026-06-15
---

# Why we built Asteris Utility Suite

We're a small team in Sydney, Australia. We run WordPress sites, and we built Asteris Utility Suite because we got sick of being our own integration testers every Tuesday.

That's the short version. The longer one is below.

## Who we are

Small, tight team. One product. One support inbox.

We're not a big plugin company. We run a small team out of Sydney through an Australian Pty Ltd (My Cosmic Message Pty Ltd t/a Asteris Commerce, ABN 30 652 358 159). No VC. No marketing team. No growth hacker — by design. v1.0 is a small team owning every line of code, every support reply, every roadmap call. The team scales further when the product earns it.

We've been building WordPress sites for years — our own blogs, business sites, project sites, and a handful for other people. We know what a real WP install looks like at month six, when you've accreted twelve plugins, three of them are abandoned, and one of them throws a PHP warning every time someone loads the dashboard.

That's the world Asteris was built in.

## The problem we ran into

If you've run a WordPress site for more than a year, you already know this story. We'll tell it anyway because the maths is worth seeing on the page.

A typical considered-content WordPress site ends up with something like this:

- Wordfence Premium for security — $119/yr
- Yoast Premium for SEO — $129/yr
- UpdraftPlus Premium for backups — $70/yr
- WP Rocket for performance — $59/yr
- WP Mail SMTP Pro for email reliability — $49/yr
- Smush Pro or Imagify for image optimisation — around $90/yr
- WPForms Pro for forms — $199/yr (entry-tier Pro is cheaper but doesn't include the integrations you actually need)
- MonsterInsights Pro for GA4 — $99/yr
- WPCode Pro for snippets — $99/yr
- WP Activity Log Premium for audit trail — $99/yr
- An accessibility scanner of some kind — around $120/yr

By the time you tally it up, you're north of **$1,400+ a year**. We checked the numbers on our own sites and they were worse than that, because we'd been buying lifetime deals on AppSumo and Mac Heist and forgetting which ones had expired.

The money isn't even the worst part. The worst part is Tuesday update day.

Every Tuesday we'd open WP Admin, see the red update badge, and feel our stomachs tighten. Updating plugins on a live site is Russian roulette when you have a dozen of them from ten different vendors, each with their own release cycle, their own JavaScript bundle, their own opinion about how the dashboard should render.

The performance tax was the slow grind. Most of the multi-plugin stack we were paying for was built the same way: heavy admin pages, scripts loading on the front end whether you used the feature or not, queries running on every page request for things that should have been cached or static. We got sick of how they were being built. That's the conflict that pushed us into building this — not one catastrophic break, the slow grinding tax we were paying on every page load, on every site we ran.

Support across that many vendors is its own job. Three of them only answer in business hours that aren't your business hours. Two of them have a forum where the last reply was 2019. One of them got acquired and the new owner doesn't reply at all.

We wanted one plugin. So we built it.

## What Asteris Utility Suite is

One WordPress plugin. 12 modules at v1.0. One settings panel, one update cycle, one licence, one inbox to email when something breaks.

The 12 modules cover what a real WordPress site actually needs: security with 2FA, SEO with AI-powered content tools, performance caching + asset optimisation, forms with anti-spam, reliable SMTP with delivery logs, activity log + site health diagnostics, GA4 + GTM + social pixels + Search Console OAuth, image optimisation with WebP/AVIF, backups + migration, a WCAG accessibility auditor, branded short links with click tracking, and cookieless first-party analytics. Five of them are available free on WordPress.org as **Asteris Utility Suite Free** — lite versions of Image Optimisation, Analytics + Pixels, Activity Log, SMTP, and the Accessibility scanner.

The paid version unlocks the rest plus the full versions of the lite modules. Pricing is on the [pricing page](/asteris-utility-suite/pricing/); the short version is Starter at $149/yr (1 site), Pro at $349/yr (3 sites), and Agency at $549/yr (10 sites). Everyone pays the same standard price.

That's what it is.

## What Asteris Utility Suite is not

This part matters more than the feature list, so we're putting it in its own section.

It's not a page builder. We're not competing with Elementor, Bricks, or Beaver Builder. Asteris assumes you already have a theme and a builder you like — and we ship integrations with all four major builders plus Gutenberg and the classic editor.

It's not an LMS or a membership plugin. LearnDash, LifterLMS, MemberPress, Paid Memberships Pro all handle that better than a general-purpose plugin would. We're not going to reinvent them.

It's not a translation plugin. WPML and Polylang are mature, well-maintained, and the right tool for multilingual sites. Asteris co-exists with both.

It's not a commerce plugin. If you run a WooCommerce store and want one suite that covers SEO + product filtering + variation swatches + invoices + the rest of the store-stack pain, that's [Asteris for WooCommerce](https://asterisforwoocommerce.com) — sister product, same team, same engineering bar. You can run both side-by-side on the same site if you have both a content layer and a store layer.

It's not Multisite-ready at v1.0. It might be later. It isn't now. If you need WP Multisite, this isn't the plugin yet.

It's not finished. v1.0 ships with 13 modules. The [roadmap](/asteris-utility-suite/roadmap/) has more. Some of what's on the roadmap will change because customers tell us to change it.

We'd rather you walk away on this page than buy and feel misled.

## How it gets built

Lean, weekly, in public.

We ship every Friday. The cadence is locked — even if the release is small, there's a release. The [changelog](/asteris-utility-suite/changelog/) is the source of truth; we update it the same day code goes out.

The [roadmap](/asteris-utility-suite/roadmap/) is public and honest. Items that are committed are marked committed. Items that are "maybe" are marked maybe. Things we've deprioritised are still listed with a note saying why, so you don't have to guess whether we forgot.

Fridays are release day. Mondays are customer-feedback triage.

When a customer sends a bug report or a feature request, it goes into the same queue we work from. We read every one. Not every one gets built — some don't fit the product, some fit but get queued behind higher-impact work — but every one gets a reply explaining which bucket it landed in.

That feedback loop is real leverage on what Asteris becomes.

## Who it's for

Considered-content WordPress site owners who:

- Run their own site (or a small handful of sites) and feel the Tuesday-update-day pain.
- Are tired of paying $1,400+/yr across a dozen vendors.
- Want one plugin, one inbox, one update cycle.
- Are comfortable being on a v1.x product that's still being shaped — and want some say in how it gets shaped.
- Read the changelog and the roadmap before they buy, because they're the kind of person who reads documentation.

Agencies who manage 3-10 client sites and want one licence stack across all of them. The [Agency tier](/asteris-utility-suite/pricing/) exists for you.

## Who it's not for

- Sites that need WP Multisite at v1.0. Not yet.
- Membership-only or LMS-only operators where 80% of your stack is already a specialist plugin. Asteris bundles enough that you'd be paying for things you don't use.
- Anyone who needs a 24/7 support line. Support runs on Sydney hours. The SLA is 1 business day for Pro and Agency; 2-3 business days for Starter; and forum-first with email fallback for Free. We try to beat it. We won't promise 24/7 because we can't honestly deliver 24/7 as a small team.
- Anyone who wants a finished product on day one. v1.0 is real and it works, but it's a v1.0, not a v5.0. If that's a dealbreaker, the 14-day refund is genuine — you get your money back inside 24 hours, no argument.

## How to reach us

Direct lines, in order of how we'd prefer you use them:

- **`support@asteriscommerce.com`** — for support tickets. It goes through a ticketing system so nothing gets lost.
- **GitHub** — public issue tracker for bugs and feature requests (link in the plugin admin and on the [changelog](/asteris-utility-suite/changelog/) page).

We're on Sydney time (AEST/AEDT). If you email us at 3am our time, expect a reply when the sun comes up.

Feedback emails get our attention fastest — what's working well, what could be better, and what's missing.

## The deal, stated plainly

Asteris Utility Suite is in active development. As an early customer, you're shaping it. Your bug reports and feedback are part of the deal — and so are all future updates while your subscription stays active.

That's the agreement. If it sounds like the kind of thing you want to be part of, [the pricing page](/asteris-utility-suite/pricing/) has the tiers.

If not, [Asteris Utility Suite Free](/asteris-utility-suite/free/) on WordPress.org is six real modules, no time limit, no upsell wall.

Either way — thanks for reading this far.

— The Asteris team  
Sydney, Australia
