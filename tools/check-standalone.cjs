const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');

const html = fs.readFileSync(path.join(__dirname, '..', 'OrderDesk.html'), 'utf8');

assert.ok(html.includes('<title>OrderDesk v0.7.1 — Simple business workspace</title>'));
assert.ok(html.includes('id="page-gst"'));
assert.ok(html.includes('OrderDeskGST'));
assert.ok(html.includes('OrderDeskCore'), 'standalone file must include the tested data model module');
assert.ok(html.includes('id="fItems"'), 'standalone file must include multi-item order UI');
assert.ok(html.includes('id="moneyMonth"'), 'standalone file must include Money Book month filter');
assert.ok(html.includes('id="fPaymentHistory"'), 'standalone file must include dated payment history');
assert.ok(html.includes('syncPaymentIncomeEntries'), 'order payments must sync into Money Book income');
assert.ok(html.includes('revisionMatches'), 'standalone file must include the tested cross-tab revision guard');
assert.ok(html.includes('id="settingsCountryCode"'), 'standalone file must expose the default phone country code setting');
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
