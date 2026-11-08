(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  if (root) root.OrderDeskGST = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const round2 = value => Math.round((Number(value) + Number.EPSILON) * 100) / 100;
  function calculate({ amount, rate, mode = 'exclusive', supply = 'intra' } = {}) {
    const entered = Number(amount);
    const percentage = Number(rate);
    if (!Number.isFinite(entered) || entered < 0) throw new RangeError('Enter an amount of zero or more.');
    if (!Number.isFinite(percentage) || percentage < 0 || percentage > 100) throw new RangeError('Enter a GST rate from 0 to 100.');
    if (!['exclusive', 'inclusive'].includes(mode)) throw new TypeError('Choose inclusive or exclusive GST.');
    if (!['intra', 'inter'].includes(supply)) throw new TypeError('Choose intra-state or inter-state supply.');
    const enteredAmount = round2(entered);
    let taxableValue, gstAmount, invoiceTotal;
    if (mode === 'inclusive') {
      invoiceTotal = enteredAmount;
      taxableValue = round2(invoiceTotal / (1 + percentage / 100));
      gstAmount = round2(invoiceTotal - taxableValue);
    } else {
      taxableValue = enteredAmount;
      gstAmount = round2(taxableValue * percentage / 100);
      invoiceTotal = round2(taxableValue + gstAmount);
    }
    const cgst = supply === 'intra' ? round2(gstAmount / 2) : 0;
    const sgst = supply === 'intra' ? round2(gstAmount - cgst) : 0;
    const igst = supply === 'inter' ? gstAmount : 0;
    return Object.freeze({ enteredAmount, rate: percentage, mode, supply, taxableValue, gstAmount, cgst, sgst, igst, invoiceTotal });
  }
  return Object.freeze({ calculate, round2 });
});
