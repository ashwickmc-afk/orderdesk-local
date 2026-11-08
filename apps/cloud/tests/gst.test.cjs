const test = require('node:test');
const assert = require('node:assert/strict');
const { calculate } = require('../gst-calculator.js');
test('exclusive intra-state GST splits tax equally', () => {
  const r = calculate({ amount: 1000, rate: 18, mode: 'exclusive', supply: 'intra' });
  assert.deepEqual([r.taxableValue,r.gstAmount,r.cgst,r.sgst,r.igst,r.invoiceTotal],[1000,180,90,90,0,1180]);
});
test('inclusive inter-state GST extracts tax as IGST', () => {
  const r = calculate({ amount: 1180, rate: 18, mode: 'inclusive', supply: 'inter' });
  assert.deepEqual([r.taxableValue,r.gstAmount,r.cgst,r.sgst,r.igst,r.invoiceTotal],[1000,180,0,0,180,1180]);
});
test('small values round to two decimal places', () => {
  const r = calculate({ amount: 0.05, rate: 5, mode: 'exclusive', supply: 'intra' });
  assert.equal(r.invoiceTotal,0.05);
});
test('invalid values and modes are rejected', () => {
  assert.throws(()=>calculate({amount:-1,rate:18}),RangeError);
  assert.throws(()=>calculate({amount:10,rate:101}),RangeError);
  assert.throws(()=>calculate({amount:10,rate:5,mode:'other'}),TypeError);
  assert.throws(()=>calculate({amount:10,rate:5,supply:'other'}),TypeError);
});
