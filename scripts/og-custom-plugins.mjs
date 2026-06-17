// Generate the OG image for /custom-plugins/ — 1200x630 PNG via sharp (SVG raster).
import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';

const out = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'og-custom-plugins.png');

const svg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <rect width="1200" height="630" fill="#0a0a0a"/>
  <rect x="0" y="0" width="1200" height="10" fill="#AA00FF"/>
  <circle cx="1080" cy="120" r="220" fill="#AA00FF" opacity="0.10"/>
  <text x="80" y="118" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" letter-spacing="3" fill="#fff19a">★ ASTERIS COMMERCE · BESPOKE BUILDS</text>
  <text x="80" y="240" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">Custom WordPress &amp;</text>
  <text x="80" y="326" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#ffffff">WooCommerce <tspan fill="#AA00FF">plugin</tspan></text>
  <text x="80" y="412" font-family="Arial, Helvetica, sans-serif" font-size="76" font-weight="800" fill="#AA00FF">development.</text>
  <text x="80" y="486" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="400" fill="#cfcfcf">Any industry · any feature · fixed-scope · you own the code.</text>
  <text x="80" y="566" font-family="Arial, Helvetica, sans-serif" font-size="26" font-weight="700" fill="#ffffff">asteriscommerce.com/custom-plugins</text>
</svg>`;

await sharp(Buffer.from(svg)).png().toFile(out);
console.log('wrote ' + out);
