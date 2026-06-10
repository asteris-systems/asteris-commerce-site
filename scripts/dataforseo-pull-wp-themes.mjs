#!/usr/bin/env node
/**
 * Top-up pull: WordPress-side theme keywords + SERPs.
 * Reuses creds from C:\Users\Nick\.dataforseo\.env.
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RESULTS_DIR = join(ROOT, 'docs', 'dataforseo-results');

function loadEnv() {
  const home = process.env.USERPROFILE || process.env.HOME || '';
  const path = join(home, '.dataforseo', '.env');
  const env = {};
  for (const line of readFileSync(path, 'utf8').split(/\r?\n/)) {
    const m = line.match(/^([A-Z_][A-Z0-9_]*)=(.*)$/);
    if (m) env[m[1]] = m[2].trim().replace(/^["']|["']$/g, '');
  }
  return env;
}
const env = loadEnv();
const AUTH = 'Basic ' + Buffer.from(`${env.DATAFORSEO_LOGIN}:${env.DATAFORSEO_PASSWORD}`).toString('base64');

async function dfs(path, body) {
  const res = await fetch('https://api.dataforseo.com/v3/' + path, {
    method: 'POST',
    headers: { 'Authorization': AUTH, 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) throw new Error(`${path} -> ${res.status}`);
  return res.json();
}

function save(name, data) {
  if (!existsSync(RESULTS_DIR)) mkdirSync(RESULTS_DIR, { recursive: true });
  writeFileSync(join(RESULTS_DIR, `${name}.json`), JSON.stringify(data, null, 2));
  console.log(`  → ${name}.json`);
}

const LOC_US = 2840, LOC_AU = 2036, LANG = 'en';

console.log('WP-theme top-up pull...');

// Q8 — WordPress theme keywords (top of funnel)
console.log('Q8 — WP theme search volume');
const wpKeywords = [
  'free wordpress theme',
  'wordpress block theme',
  'wordpress theme',
  'gutenberg theme',
  'fse theme',
  'best wordpress theme',
  'free block theme',
  'block theme wordpress',
  'minimal wordpress theme',
  'fast wordpress theme',
  'twenty twenty five alternative',
  'wordpress full site editing theme',
  'modern wordpress theme',
  'lightweight wordpress theme',
  'wordpress portfolio theme',
];
save('q8-wp-themes-us', await dfs('keywords_data/google_ads/search_volume/live', [{
  keywords: wpKeywords, location_code: LOC_US, language_code: LANG,
}]));
save('q8-wp-themes-au', await dfs('keywords_data/google_ads/search_volume/live', [{
  keywords: wpKeywords, location_code: LOC_AU, language_code: LANG,
}]));

// Q9 — SERPs for top WP-theme intent queries
console.log('Q9 — WP theme SERPs');
for (const q of ['free wordpress theme', 'wordpress block theme', 'best wordpress theme', 'gutenberg theme']) {
  save(`q9-serp-${q.replace(/\s+/g, '-')}`, await dfs('serp/google/organic/live/advanced', [{
    keyword: q, location_code: LOC_US, language_code: LANG, depth: 10,
  }]));
}

// Q10 — Related expansion seeded with WP-side phrases
console.log('Q10 — WP-side related keywords');
for (const seed of ['wordpress theme', 'block theme', 'free wordpress theme']) {
  save(`q10-related-${seed.replace(/\s+/g, '-')}`, await dfs('keywords_data/google_ads/keywords_for_keywords/live', [{
    keywords: [seed], location_code: LOC_US, language_code: LANG, limit: 50,
  }]));
}

console.log('\nDONE.');
