const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync(path.join(__dirname, '..', 'OrderDesk.html'), 'utf8');

assert.ok(html.includes('<title>OrderDesk v0.6.0 — Ready to use</title>'));
assert.ok(html.includes('id="page-gst"'));
assert.ok(html.includes('OrderDeskGST'));
assert.doesNotMatch(html, /<script\b[^>]*\bsrc=/i, 'standalone file must not load external JavaScript');
assert.doesNotMatch(html, /<link\b[^>]*rel=["']manifest["']/i, 'file-based app must not depend on a PWA manifest');
const resourceRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
  .map(match => match[1])
  .filter(value => !value.startsWith('#') && !value.startsWith('data:') && !/^https?:/i.test(value));
assert.deepEqual(resourceRefs, [], 'standalone HTML must not depend on separate local files');

const scripts = [...html.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/gi)];
assert.ok(scripts.length >= 2, 'GST and application scripts should both be inlined');
for (const [index, match] of scripts.entries()) {
  new vm.Script(match[1], { filename: 'OrderDesk.html:inline-script-' + (index + 1) });
}
console.log('Standalone OrderDesk.html: one-file dependency check passed; all inline scripts parse.');
