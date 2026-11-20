# OrderDesk v0.6.0 — Local Edition

**Keep it simple. Keep it better.**

This is the recommended no-login edition for business owners. The quickest way to start is the single file at the repository root:

1. Download the ZIP from the main [README](../../).
2. Extract it.
3. Double-click **`OrderDesk.html`** in the extracted folder.

It opens in your default browser. No command prompt, Python, Node.js, installation or account is required.

## Features

- Orders, customers, delivery status and partial payments.
- Outstanding payment view and WhatsApp message drafts for the owner to review.
- Money Book for additional income and business expenses. Do not enter an order payment twice.
- Product costing and profit-margin calculator.
- GST-inclusive/exclusive calculator with CGST + SGST/UTGST or IGST breakdown.
- Quick calculator, light/dark theme, CSV exports and JSON backup/restore.

## Browser and data notes

Use a recent Chrome, Edge, Firefox or Safari browser. The app stores records in browser storage on the current device. Browser privacy settings can block local storage, and browsers do not define identical storage behaviour for local HTML files. OrderDesk displays a warning if saving is unavailable.

Use **Backup** regularly and keep the downloaded JSON backup somewhere safe. To move records to a new copy or another device, use **Backup** in the old copy and **Restore** in the new one. The app does not synchronise Local records between devices.

The root `OrderDesk.html` file is self-contained. `index.html`, the manifest and service worker in this folder are the maintained web/PWA source for HTTPS hosting and development.
