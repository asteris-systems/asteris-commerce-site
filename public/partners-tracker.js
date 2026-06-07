/**
 * Asteris Partners — sales-site click tracker.
 *
 * Loads on every Asteris sales site (asteriscommerce.com, asterisforwoocommerce.com,
 * asterisforwordpress.com, asteriscart.com). Captures ?ref=<partner_public_id>
 * from the URL, stores it in localStorage with 60-day expiry, and POSTs to the
 * licence server's tracking endpoint to record the click server-side.
 *
 * When a Stripe Checkout button is clicked, we append the partner_ref so
 * Stripe Checkout's URL carries the attribution to pay.asteriscommerce.com
 * where the existing checkout flow embeds it in session metadata.
 *
 * Three layers of attribution survival (in priority order):
 *   1. URL ?ref=X (always wins — fresh click)
 *   2. localStorage on the current sales-site domain (60-day window)
 *   3. Server-side visitor_hash (IP+UA fallback) — handled at checkout time
 *      by the licence server, not in this JS
 *
 * Privacy: we don't send any PII. The licence server hashes IP server-side.
 * No third-party trackers, no fingerprinting libraries.
 */
(function () {
  'use strict';

  var TRACK_URL = 'https://pay.asteriscommerce.com/wp-json/asteris/v1/partners/track';
  var STORAGE_KEY = 'asteris_partner_ref';
  var STORAGE_EXPIRY_KEY = 'asteris_partner_ref_expires';
  var DAYS_60 = 60 * 24 * 60 * 60 * 1000;

  // ── Capture ?ref= from URL ──────────────────────────────────────────────
  function getQueryParam(name) {
    try {
      var url = new URL(window.location.href);
      return url.searchParams.get(name);
    } catch (e) {
      return null;
    }
  }

  function getStoredRef() {
    try {
      var expires = parseInt(localStorage.getItem(STORAGE_EXPIRY_KEY) || '0', 10);
      if (expires > 0 && expires < Date.now()) {
        // Expired — clean up.
        localStorage.removeItem(STORAGE_KEY);
        localStorage.removeItem(STORAGE_EXPIRY_KEY);
        return null;
      }
      return localStorage.getItem(STORAGE_KEY);
    } catch (e) {
      return null;
    }
  }

  function setStoredRef(ref) {
    try {
      localStorage.setItem(STORAGE_KEY, ref);
      localStorage.setItem(STORAGE_EXPIRY_KEY, String(Date.now() + DAYS_60));
    } catch (e) {
      // Storage blocked — fall through. Server-side visitor_hash handles it.
    }
  }

  function detectProductHint() {
    var host = window.location.hostname;
    if (host.indexOf('asterisforwoocommerce') !== -1) return 'asteris_wc';
    if (host.indexOf('asterisforwordpress') !== -1) return 'asteris_wp';
    if (host.indexOf('asteriscart') !== -1) return 'asteris_cart';
    return null;
  }

  function getSessionIdFromCookie() {
    // The licence server's cookie is scoped to pay.asteriscommerce.com, so
    // we can't read it cross-domain. This is intentional — the server tracks
    // its own session_id via the cookie + falls back to visitor_hash. We pass
    // null and let the server generate a new session_id if needed.
    return null;
  }

  // ── Server-side click record ────────────────────────────────────────────
  function sendTrack(refCode) {
    var payload = {
      ref_code: refCode,
      session_id: getSessionIdFromCookie() || '',
      landing_url: window.location.href,
      referrer: document.referrer || '',
      product_hint: detectProductHint() || ''
    };

    try {
      // Use fetch with credentials so the licence server can set its own cookie
      // on pay.asteriscommerce.com (cross-origin). SameSite=None + Secure on the
      // server-set cookie keeps this working in modern browsers.
      fetch(TRACK_URL, {
        method: 'POST',
        credentials: 'include',
        mode: 'cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        keepalive: true
      }).catch(function () {
        // Server unreachable — silent. localStorage still carries the ref for
        // checkout button rewriting (next function).
      });
    } catch (e) {
      // Older browsers without fetch — silent.
    }
  }

  // ── Rewrite Stripe Checkout buttons ─────────────────────────────────────
  // When the user clicks "Buy" on a sales site, we want the partner_ref to
  // travel with them to pay.asteriscommerce.com so the existing checkout
  // flow can embed it in Stripe session metadata.
  //
  // Detection: any <a href> that points to pay.asteriscommerce.com OR any
  // element with data-asteris-checkout / data-partner-aware gets the ref
  // appended as a URL param.
  function appendRefToCheckoutLinks(ref) {
    if (!ref) return;

    var selectors = [
      'a[href*="pay.asteriscommerce.com"]',
      'a[href*="buy.stripe.com"]',
      'a[href*="checkout.stripe.com"]',
      'a[data-asteris-checkout]',
      'a[data-partner-aware]'
    ];

    var links = document.querySelectorAll(selectors.join(','));
    for (var i = 0; i < links.length; i++) {
      var link = links[i];
      try {
        var url = new URL(link.href, window.location.origin);
        // Only append if not already present.
        if (!url.searchParams.has('ref') && !url.searchParams.has('client_reference_id')) {
          url.searchParams.set('ref', ref);
          // Stripe Payment Links use client_reference_id for partner attribution.
          if (url.hostname.indexOf('stripe.com') !== -1) {
            url.searchParams.set('client_reference_id', 'partner_' + ref);
          }
          link.href = url.toString();
        }
      } catch (e) {
        // Malformed URL — skip silently.
      }
    }
  }

  // ── Boot ────────────────────────────────────────────────────────────────
  function boot() {
    var urlRef = getQueryParam('ref');
    var storedRef = getStoredRef();

    // URL wins over storage — fresh click overrides stored value.
    var activeRef = urlRef || storedRef;

    if (urlRef && urlRef !== storedRef) {
      setStoredRef(urlRef);
      sendTrack(urlRef);
    } else if (storedRef) {
      // Existing visitor — no need to re-track every page view. Server-side
      // record already exists. Just keep links updated.
    }

    if (activeRef) {
      appendRefToCheckoutLinks(activeRef);

      // Also handle dynamically added buttons (re-run after a small delay
      // for SPAs / lazy-loaded content).
      setTimeout(function () { appendRefToCheckoutLinks(activeRef); }, 500);
      setTimeout(function () { appendRefToCheckoutLinks(activeRef); }, 1500);
    }
  }

  // Run as soon as DOM is parsed; defer attribute on the script tag is
  // recommended so this doesn't block render.
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // Public API for sales-site code that wants to read the current ref
  // (e.g. for showing "Referred by Sarah" badges on the page).
  window.AsterisPartners = {
    getCurrentRef: function () {
      return getQueryParam('ref') || getStoredRef();
    },
    track: sendTrack,
    rewriteCheckoutLinks: appendRefToCheckoutLinks
  };
})();
