# OrderDesk v0.6.0 — Local Edition

**Keep it simple. Keep it better.**

The recommended edition for owners who want business records to remain on their own device. No sign-in, backend, API key, Supabase project or mandatory setup.

## Features

- Orders, customers, delivery status and partial payments.
- Outstanding payment view and WhatsApp message drafts for the owner to review.
- Money Book for additional income and business expenses. Do not enter an order payment twice.
- Product costing and profit-margin calculator.
- GST-inclusive/exclusive calculator with CGST + SGST/UTGST or IGST breakdown.
- Quick calculator, light/dark theme, CSV exports and JSON backup/restore.
- Responsive PWA app shell for desktop, phone and tablet browsers.

## Run on Windows

1. Extract the Local ZIP or the complete repository ZIP.
2. Open `apps/local`.
3. Install Python 3 if it is not already installed.
4. Double-click `START_ORDERDESK_WINDOWS.bat`.
5. Keep the command window open. The app opens at `http://localhost:8765`.

Or run `python -m http.server 8765 --bind 127.0.0.1` from this folder. For basic use, `index.html` can also be opened directly; a local server is recommended for PWA and storage behaviour.

## macOS / Linux

Open a terminal in this folder and run `python3 -m http.server 8765 --bind 127.0.0.1`, then open `http://localhost:8765`.

## Local data

Records are stored in the current browser profile on the current device. They do not automatically synchronise to another device. Use Backup and Restore to transfer records. Clearing browser/site data or losing the device can remove local records, so keep a separate backup. v0.6 retains the v0.5 IndexedDB database name to preserve existing local records in the same browser profile.

## Phone and tablet installation

For PWA installation on another device, host the contents of this folder on HTTPS, open the address in a supported browser and choose **Install app** or **Add to Home Screen**. Static hosting does not synchronise data; use Backup and Restore to move data between devices.

## GST note

The GST calculator performs arithmetic only. You must enter the applicable tax rate and supply type. It does not classify goods/services, validate HSN/SAC, determine exemptions or file returns. See [GST-RATES.md](../../docs/GST-RATES.md).
