const test=require('node:test');const assert=require('node:assert/strict');const Core=require('../orderdesk-core.js');
test('normalizes legacy orders and migrates received amount to dated payments',()=>{const o=Core.normalizeOrder({id:'a',item:'Cake',quantity:2,amount:100,amountPaid:40,createdAt:'2026-01-02T10:00:00.000Z'});assert.equal(o.payments.length,1);assert.equal(o.payments[0].date,'2026-01-02');assert.equal(Core.getDue(o),60)});
test('normalizes multi-item order totals and quantities',()=>{const o=Core.normalizeOrder({amount:50,items:[{name:'Cake',quantity:2,unitPrice:20},{name:'Cookie',quantity:1,unitPrice:10}]});assert.equal(o.items.length,2);assert.equal(o.quantity,3)});
test('allocates unique next order number from highest suffix',()=>{assert.equal(Core.nextOrderNo([{orderNo:'OD-261120-001'},{orderNo:'OD-261120-008'}],'2026-11-20'),'OD-261120-009')});
test('CSV round trip preserves quotes, commas and newlines',()=>{const cell=Core.csvCell('A, "B"');assert.deepEqual(Core.parseCsv('name\n'+cell),[['name'],['A, "B"']] )});
test('CSV formula cells are neutralized',()=>{assert.equal(Core.csvCell('=1+1'),'"\'=1+1"');assert.equal(Core.csvCell('  @SUM(A1)'),'"\'  @SUM(A1)"')});
test('rejects invalid calendar dates',()=>{assert.equal(Core.validISODate('2026-02-30'),'');assert.equal(Core.validISODate('2026-02-28'),'2026-02-28')});
test('restored orders do not accept non-finite amounts',()=>{const o=Core.normalizeOrder({amount:'NaN',createdAt:123});assert.equal(o.amount,0);assert.match(o.createdAt,/^\d{4}-/)});
test('CSV parser rejects unclosed quotes',()=>{assert.throws(()=>Core.parseCsv('a\n"broken'),SyntaxError)});
