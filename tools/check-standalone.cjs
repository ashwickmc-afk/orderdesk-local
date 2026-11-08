const fs = require('node:fs');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const file = new URL('../OrderDesk.html', 'file://' + __dirname.replace(/\\\\/g, '/') + '/');
const html = fs.readFileSync(file, 'utf8');

assert.match(html, /<title>OrderDesk v0\.6\.0 — Ready to use<\\/title>/);
assert.match(html, /id="page-gst"/);
assert.match(html, /OrderDeskGST/);
assert.doesNotMatch(html, /<script\\b[^>]*\\bsrc=/i, 'standalone file must not load external JavaScript');
assert.doesNotMatch(html, /<link\\b[^>]*rel=["']manifest["']/i, 'file-based app must not depend on PWA manifest');
const resourceRefs = [...html.matchAll(/(?:src|href)=["']([^"']+)["']/gi)]
  .map(match => match[1])
  .filter(value => !value.startsWith('#') && !value.startsWith('data:') && !/^https?:/i.test(value));
assert.deepEqual(resourceRefs, [], 'standalone HTML must not depend on separate local files');

const scripts = [...html.matchAll(/<script\\b[^>]*>([\\s\\S]*?)<\\/script>/gi)];
assert.ok(scripts.length >= 2, 'GST and application scripts should both be inlined');
for (const [index, match] of scripts.entries()) {
  new vm.Script(match[1], { filename: 'OrderDesk.html:inline-script-' + (index + 1) });
}
console.log('Standalone OrderDesk.html: one-file dependency check passed; all inline scripts parse.');
