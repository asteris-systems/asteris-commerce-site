#!/usr/bin/env node
/**
 * One-shot DataForSEO research pull for homepage redesign.
 * Reads DATAFORSEO_LOGIN + DATAFORSEO_PASSWORD from .env,
 * runs the 7 queries spec'd in docs/dataforseo-homepage-research.md,
 * writes raw JSON per query to docs/dataforseo-results/.
 *
 * Usage:  node scripts/dataforseo-pull.mjs
 */

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const RESULTS_DIR = join(ROOT, 'docs', 'dataforseo-results');

// --- env ----------------------------------------------------------------
function loadEnv() {
  // Look outside any repo first (user-home config), then fall back to
  // process env, then the project .env. Creds stay on this machine only.
  const home = process.env.USERPROFILE || process.env.HOME || '';
  const candidates = [
    join(home, '.dataforseo', '.env'),
    join(home, '.config', 'dataforseo', '.env'),
    join(ROOT, '.env'),
  ];
  for (const p of candidates) {
    if (!existsSync(p)) continue;
    const env = {};
    for (const line of readFileSync(p, 'utf8').split(/\r?\n/)) {
      const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
      if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
    }
    if (env.DATAFORSEO_LOGIN && env.DATAFORSEO_PASSWORD) {
      console.log('Loaded creds from', p);
      return env;
    }
  }
  if (process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD) {
    console.log('Loaded creds from process env');
    return { DATAFORSEO_LOGIN: process.env.DATAFORSEO_LOGIN, DATAFORSEO_PASSWORD: process.env.DATAFORSEO_PASSWORD };
  }
  console.error('ERROR: DataForSEO creds not found. Checked:');
  candidates.forEach(p => console.error('  ' + p));
  console.error('  process.env.DATAFORSEO_LOGIN / DATAFORSEO_PASSWORD');
  process.exit(1);
}

const env = loadEnv();
const AUTH = 'Basic ' + Buffer.from(`${env.DATAFORSEO_LOGIN}:${env.DATAFORSEO_PASSWORD}`).toString('base64');

// --- helpers ------------------------------------------------------------
async function dfs(path, body) {
  const res = await fetch('https://api.dataforseo.com/v3/' + path, {
    method: 'POST',
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    throw new Error(`DataForSEO ${path} -> ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function save(name, data) {
  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });
  const file = join(RESULTS_DIR, `${name}.json`);
  writeFileSync(file, JSON.stringify(data, null, 2));
  console.log(`  → ${file}`);
}

const LOC_US = 2840;  // United States
const LOC_AU = 2036;  // Australia
const LANG = 'en';

// --- queries ------------------------------------------------------------

async function q1_theme_keywords() {
  console.log('Q1 — theme positioning keywords');
  const keywords = [
    'woocommerce block theme',
    'free woocommerce theme',
    'best wordpress theme for woocommerce',
    'woocommerce product page template',
    'fse woocommerce theme',
    'block theme woocommerce',
    'gutenberg woocommerce theme',
    'storefront alternative',
  ];
  const data = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords,
    location_code: LOC_US,
    language_code: LANG,
  }]);
  save('q1-theme-us', data);
  const dataAU = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords,
    location_code: LOC_AU,
    language_code: LANG,
  }]);
  save('q1-theme-au', dataAU);
}

async function q2_plugin_suite() {
  console.log('Q2 — plugin-suite positioning');
  const keywords = [
    'all in one woocommerce plugin',
    'woocommerce plugin bundle',
    'best woocommerce plugins',
    'replace yoast for woocommerce',
    'woocommerce seo plugin',
    'woocommerce pdf invoice plugin',
    'woocommerce variation swatches',
    'wordpress security plugin',
    'wordpress seo plugin',
  ];
  const data = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords, location_code: LOC_US, language_code: LANG,
  }]);
  save('q2-plugin-suite-us', data);
}

async function q3_cart() {
  console.log('Q3 — cart/checkout positioning');
  const keywords = [
    'woocommerce side cart',
    'woocommerce checkout optimizer',
    'cartflows alternative',
    'funnelkit alternative',
    'woocommerce express checkout',
    'woocommerce checkout customizer',
  ];
  const data = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords, location_code: LOC_US, language_code: LANG,
  }]);
  save('q3-cart-us', data);
}

async function q4_affiliates() {
  console.log('Q4 — affiliate program positioning');
  const keywords = [
    'affiliatewp alternative',
    'wordpress affiliate plugin',
    'woocommerce affiliate program',
    'tapfiliate alternative',
    'referral plugin wordpress',
  ];
  const data = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords, location_code: LOC_US, language_code: LANG,
  }]);
  save('q4-affiliates-us', data);
}

async function q5_patterns_blocks() {
  console.log('Q5 — patterns + blocks positioning');
  const keywords = [
    'gutenberg block patterns',
    'wordpress page patterns',
    'block theme patterns',
    'gutenberg blocks plugin',
    'free gutenberg blocks',
    'stackable alternative',
    'kadence blocks alternative',
  ];
  const data = await dfs('keywords_data/google_ads/search_volume/live', [{
    keywords, location_code: LOC_US, language_code: LANG,
  }]);
  save('q5-patterns-blocks-us', data);
}

async function q6_serps() {
  console.log('Q6 — competitor SERPs');
  const queries = [
    'woocommerce block theme',
    'free woocommerce theme 2026',
    'all in one woocommerce plugin',
    'cartflows vs funnelkit',
    'affiliatewp alternative',
  ];
  for (const q of queries) {
    const data = await dfs('serp/google/organic/live/advanced', [{
      keyword: q,
      location_code: LOC_US,
      language_code: LANG,
      depth: 10,
    }]);
    save(`q6-serp-${q.replace(/\s+/g, '-')}`, data);
  }
}

async function q7_related() {
  console.log('Q7 — related-keyword expansion');
  const seeds = ['woocommerce theme', 'wordpress block theme', 'gutenberg blocks'];
  for (const seed of seeds) {
    const data = await dfs('keywords_data/google_ads/keywords_for_keywords/live', [{
      keywords: [seed],
      location_code: LOC_US,
      language_code: LANG,
      limit: 50,
    }]);
    save(`q7-related-${seed.replace(/\s+/g, '-')}`, data);
  }
}

// --- run ----------------------------------------------------------------
console.log('DataForSEO pull starting...');
console.log('Login:', env.DATAFORSEO_LOGIN);
console.log('Results dir:', RESULTS_DIR);
console.log('');

try {
  await q1_theme_keywords();
  await q2_plugin_suite();
  await q3_cart();
  await q4_affiliates();
  await q5_patterns_blocks();
  await q6_serps();
  await q7_related();
  console.log('\nDONE. All raw JSON written to docs/dataforseo-results/');
  console.log('Next: I synthesize findings into docs/dataforseo-findings.md');
} catch (e) {
  console.error('\nFAILED:', e.message);
  process.exit(1);
}
