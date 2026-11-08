<div align="center">

# OrderDesk

### Simple business management. No unnecessary complexity.

**Keep it simple. Keep it better.**

A small, open-source business workspace for independent owners who want to keep orders, payments, expenses and pricing under control — without learning complicated business software.

[Get started](docs/SETUP.md) · [Local edition](apps/local/) · [Cloud edition](apps/cloud/) · [Version history](CHANGELOG.md) · [Report a bug](https://github.com/ashwickmc-afk/orderdesk-local/issues)

</div>

---

## Why OrderDesk exists

I started OrderDesk with one straightforward goal: make everyday admin work easier for small business owners.

A home baker should be able to check pending orders and unpaid balances in a few seconds. A tiffin operator should be able to keep daily orders organised. A solo seller should be able to estimate costs, selling prices and profit without opening a complicated accounting package.

OrderDesk is built around a few simple rules:

- **Keep it simple.** Common tasks should take only a few steps.
- **Keep it useful.** Every feature should solve a real, recurring problem.
- **Respect the owner's data.** The Local edition keeps records on the owner's device.
- **Keep control with the owner.** Customers do not need accounts or access to the workspace.
- **Offer a choice.** Use Local for simplicity or Cloud when cross-device sync is worth the extra setup.

## Choose your edition

| | Local edition | Cloud edition |
|---|---|---|
| Best for | Owners who want a simple, self-contained tool | Owners who need the same workspace on multiple devices |
| Sign-in | No | Owner account |
| Data storage | Browser/device only | Supabase database + per-owner device cache |
| Cross-device sync | Manual backup/restore | Automatic when online |
| Setup | Simple local server or HTTPS static hosting | Supabase project + Node.js build |
| Complexity | **Simple** | Advanced |
| GST calculator | Included | Included |

**My recommendation:** Start with the **Local edition**. Choose Cloud only when you genuinely need accounts and automatic synchronisation. Neither edition has a customer portal.

## What it helps with

- **Orders:** customer details, items, quantities, delivery dates, status and payment balances.
- **Payment follow-up:** see outstanding amounts and prepare WhatsApp reminders for the owner to review.
- **Money Book:** record additional income and business expenses.
- **Profit calculator:** estimate batch cost, unit cost, break-even price, margin and target selling price.
- **GST calculator:** estimate tax-inclusive or tax-exclusive totals, with CGST/SGST or IGST display.
- **Quick calculator:** everyday arithmetic.
- **Customer list:** view order history, total sales and outstanding balances.
- **Backups and exports:** JSON backup/restore and CSV exports.

OrderDesk is a lightweight record-keeping tool. It is not a complete accounting, inventory, billing, payroll or tax-filing system.

## Screens and features

The interface is designed for phone, tablet and desktop browsers. It includes light/dark themes, responsive navigation, readable order views, quick actions and focused calculators. The app can be installed as a Progressive Web App (PWA) when hosted over HTTPS.

## Versions and project history

The project grew through small iterations. Earlier versions are preserved in the complete source package under `archive/`; the current maintained applications are in `apps/`.

| Version | Milestone | What changed |
|---|---|---|
| **0.1.0** | First prototype | Initial local order dashboard with basic order entry and status tracking. |
| **0.2.0** | Expanded order manager | Improved typography and contrast, dark mode, partial payments, customer summaries, delivery visibility, WhatsApp drafts and backup/export improvements. |
| **0.3.0** | Installable PWA | Added app manifest, icons, app-shell caching and responsive layouts for phone, tablet and desktop. Removed internal order IDs from WhatsApp message text. |
| **0.4.0** | Cloud experiment | First owner login, Supabase workspace and sync experiment. Preserved as a historical prototype, not the recommended release. |
| **0.4.1** | Login repair | Fixed form handling and asset-path issues found during the cloud experiment. |
| **0.5.0** | Local Business Edition | Returned to a no-login, no-backend approach. Added Money Book, quick calculator, profit calculator, payment follow-up and local backup/restore. |
| **0.6.0 Local** | GST release | Added the GST calculator while keeping the app fully local and account-free. |
| **0.6.0 Cloud** | Optional cloud beta | Rebuilt the v0.5 workflow as a separate Cloud edition with owner accounts, per-owner access control, sync, cloud snapshots and GST calculator. |

See [CHANGELOG.md](CHANGELOG.md) for the version history.

## Quick start

### Download the complete source

Clone the repository:

```bash
git clone https://github.com/ashwickmc-afk/orderdesk-local.git
cd orderdesk-local
python downloads/download_source.py
```

The script downloads, verifies and extracts the complete source and historical snapshots into `OrderDesk-v0.6.0-source/`.

### Run the Local edition

1. Open `OrderDesk-v0.6.0-source/apps/local`.
2. On Windows, double-click `START_ORDERDESK_WINDOWS.bat` (Python 3 required).
3. Or run `python -m http.server 8765` in that folder.
4. Open `http://localhost:8765`.
5. Start adding orders. No registration, API key or cloud setup is needed.

### Run the Cloud edition

Cloud is optional and requires a Supabase project and one-time developer setup. Follow the [Cloud edition setup guide](docs/SETUP.md#cloud-edition). Do not choose Cloud just to use the calculators — Local already includes them.

## GST calculator: important note

The GST tool performs arithmetic only. It does **not** identify the correct GST rate for a product or service, validate an HSN/SAC code, decide whether a supply is taxable/exempt, calculate input tax credit, generate a statutory tax invoice or file a return. Rates and treatment depend on classification, notifications and date of supply. Always verify the applicable treatment using official CBIC/GST Council guidance or a qualified tax professional.

- [CBIC GST goods and services rates](https://cbic-gst.gov.in/gst-goods-services-rates.html)
- [CBIC Tax Information Portal](https://taxinformation.cbic.gov.in/)
- [GST Council](https://gstcouncil.gov.in/)

More details: [docs/GST-RATES.md](docs/GST-RATES.md).

## Data and privacy

### Local edition

Records are stored in the current browser profile on the current device using IndexedDB, with a localStorage fallback. The app does not upload business records to a server. Records do not automatically move between devices. Use JSON backup/restore to transfer or protect them. Clearing browser data, resetting a device or losing the device can remove local records.

When the owner deliberately opens a WhatsApp draft, the browser hands the prepared message to WhatsApp. Review it before sending.

### Cloud edition

The Cloud edition sends the owner workspace to the Supabase project configured by the operator. Authentication and Row Level Security (RLS) restrict workspace access to the signed-in owner. Cloud sync requires an internet connection; offline changes remain in that owner's device cache until the next successful sync. A separate local cache is created per signed-in owner on each device. Keep a downloaded backup as an additional recovery copy.

Read [SECURITY.md](SECURITY.md) before deploying Cloud. Never commit `.env` files or a Supabase service-role key.

## Contributing

Small, focused improvements are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Bug reports should include the edition, browser/device, steps to reproduce and expected behaviour — but never include real customer records, passwords, API keys or private backups.

## Licence

OrderDesk is released under the [MIT License](LICENSE). You may use, modify and distribute it under the licence terms.

---

<div align="center">

**Keep it simple. Keep it better.**

Built for the people who run small businesses every day.

</div>
