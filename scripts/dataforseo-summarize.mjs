#!/usr/bin/env node
/**
 * Read all docs/dataforseo-results/*.json and emit a tidy text summary
 * to stdout. Use the output to author docs/dataforseo-findings.md.
 */
import { readFileSync, readdirSync } from 'node:fs';
import { join, dirname, basename } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const DIR = join(ROOT, 'docs', 'dataforseo-results');

const files = readdirSync(DIR).filter(f => f.endsWith('.json')).sort();

const out = [];
const sv = (file, json) => {
  const items = json?.tasks?.[0]?.result || [];
  out.push(`### ${file}`);
  out.push('| Keyword | Vol/mo | Competition | CPC |');
  out.push('|---|---:|---|---:|');
  for (const r of items.sort((a, b) => (b.search_volume || 0) - (a.search_volume || 0))) {
    const cpc = r.cpc ? `$${r.cpc.toFixed(2)}` : '—';
    out.push(`| ${r.keyword} | ${r.search_volume ?? '—'} | ${r.competition || '—'} | ${cpc} |`);
  }
  out.push('');
};

const serp = (file, json) => {
  const items = json?.tasks?.[0]?.result?.[0]?.items || [];
  const kw = json?.tasks?.[0]?.data?.keyword || '?';
  out.push(`### SERP: "${kw}" (${file})`);
  out.push('| # | Title | Domain |');
  out.push('|---:|---|---|');
  let n = 0;
  for (const it of items) {
    if (it.type !== 'organic') continue;
    n++;
    if (n > 10) break;
    const title = (it.title || '').replace(/\|/g, ' ').slice(0, 80);
    out.push(`| ${n} | ${title} | ${it.domain || ''} |`);
  }
  out.push('');
};

for (const f of files) {
  const json = JSON.parse(readFileSync(join(DIR, f), 'utf8'));
  if (f.startsWith('q6-serp-')) serp(f, json);
  else sv(f, json);
}

console.log(out.join('\n'));
