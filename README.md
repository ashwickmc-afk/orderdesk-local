<div align="center">

# OrderDesk

### Simple business management. No unnecessary complexity.

**Keep it simple. Keep it better.**

A small, open-source business workspace for independent owners who want to keep orders, payments, expenses and pricing under control — without learning complicated business software.

[Get started](docs/SETUP.md) · [Local edition](apps/local/) · [Cloud edition](apps/cloud/) · [Report a bug](https://github.com/ashwickmc-afk/orderdesk-local/issues)

</div>

---

## Why OrderDesk exists

I started OrderDesk with a straightforward goal: make the everyday admin work of a small business easier. A home baker should be able to check pending orders and payments quickly. A tiffin operator should be able to keep customer orders organised. A solo seller should be able to estimate costs and selling prices without opening a complicated accounting package.

OrderDesk is built around a few rules:

- **Keep it simple.** Common tasks should take only a few steps.
- **Keep it useful.** Features should solve a real, recurring problem.
- **Respect the owner's data.** The Local edition keeps records on the owner's device.
- **Keep control with the owner.** No customer login or customer-facing portal is required.
- **Keep options clear.** Choose Local for simplicity or Cloud when multi-device sync is worth the extra setup.

## Choose your edition

| | Local edition | Cloud edition |
|---|---|---|
| Best for | Owners who want a simple, self-contained tool | Owners who need the same workspace across devices |
| Sign-in | No | Yes, owner account |
| Data storage | Browser/device only | Supabase database plus per-owner device cache |
| Cross-device sync | Manual backup/restore | Automatic when online |
| Setup | Static files + local web server | Supabase project + Node.js build |
| Complexity | **Simple** | Advanced |
| GST calculator | Included | Included |

**Recommendation:** Start with the **Local edition**. Use Cloud only if you specifically need owner accounts and automatic synchronisation. Neither edition gives customers an account or access to the workspace.

## What it helps with

- **Orders:** customer details, items, quantities, delivery dates, status and payment balance.
- **Payment follow-up:** see what is still due and prepare a WhatsApp reminder for the owner to review.
- **Money Book:** record additional income and business expenses.
- **Profit calculator:** estimate batch cost, unit cost, margin, break-even price and a target-margin selling price.
- **GST calculator:** estimate tax-inclusive or tax-exclusive totals, with CGST/SGST or IGST display.
- **Quick calculator:** everyday arithmetic.
- **Customer list:** see order history, total sales and outstanding balances.
- **Backups and exports:** JSON backup/restore and CSV exports.

OrderDesk is a lightweight record-keeping tool. It is not a full accounting, inventory, billing, payroll or tax-filing system.

## Screens and features

The interface is designed for phone, tablet and desktop browsers. It includes a light/dark theme, responsive navigation, readable order tables/cards, quick actions and focused calculator pages. The app can be installed as a Progressive Web App (PWA) when hosted over HTTPS.

## Versions and project history

The project grew through small iterations. Historical milestones are kept in [archive/](archive/README.md); the current maintained code lives in `apps/`.

| Version | Edition / milestone | What changed |
|---|---|---|
| **0.1.0** | First prototype | First local order dashboard with basic order entry and status tracking. |
| **0.2.0** | Expanded order manager | Improved typography and contrast, dark mode, partial payments, customer summaries, delivery visibility, WhatsApp drafts and backup/export improvements. |
| **0.3.0** | Installable PWA | Added app manifest, icons, app-shell caching and responsive layouts for phone, tablet and desktop. Removed internal order IDs from WhatsApp message text. |
| **0.4.0** | Cloud experiment | First owner login, Supabase workspace and sync experiment. Retained as a historical prototype, not the recommended release. |
| **0.4.1** | Login repair | Fixed form handling and asset-path issues discovered during the cloud experiment. Historical milestone; use the maintained v0.6 Cloud edition instead. |
| **0.5.0** | Local Business Edition | Returned to a no-login, no-backend approach. Added Money Book, quick calculator, profit calculator, payment follow-up and local backup/restore. |
| **0.6.0 Local** | GST release | Added the GST calculator while keeping the app fully local and account-free. |
| **0.6.0 Cloud** | Optional cloud beta | Rebuilt the v0.5 workflow as a separate Cloud edition with owner accounts, per-owner access control, sync, cloud snapshots and the GST calculator. |

## Quick start

### Local edition

1. Open [apps/local/](apps/local/) or follow the full [setup guide](docs/SETUP.md#local-edition).
2. On Windows, double-click `START_ORDERDESK_WINDOWS.bat` (Python 3 required).
3. Or run `python -m http.server 8765` from the `apps/local` folder.
4. Open `http://localhost:8765`.
5. Start adding orders. No registration, API key or cloud setup is needed.

### Cloud edition

Cloud requires a Supabase project and a one-time developer setup. Follow [Cloud edition setup](docs/SETUP.md#cloud-edition) before running it. Do not choose Cloud just to use the calculators — the Local edition already includes them.

## GST calculator: important note

The GST tool performs arithmetic only. It does **not** identify the correct GST rate for a product or service, validate an HSN/SAC code, decide whether a supply is taxable/exempt, calculate input tax credit, generate a statutory tax invoice or file a return. Rates and treatment depend on classification, notifications and the date of supply. Always verify the applicable treatment using official CBIC/GST Council guidance or a qualified tax professional.

- [CBIC GST goods and services rates](https://cbic-gst.gov.in/gst-goods-services-rates.html)
- [CBIC Tax Information Portal](https://taxinformation.cbic.gov.in/)
- [GST Council](https://gstcouncil.gov.in/)

## Data and privacy

### Local edition

Records are stored in the current browser profile on the current device using IndexedDB, with a localStorage fallback. The app does not upload business records to a server. Records do not automatically move between devices. Use JSON backup/restore to transfer or protect them. Clearing browser data, resetting a device or losing the device can remove local records.

When the owner deliberately opens a WhatsApp draft, the browser navigates to WhatsApp with the prepared message. Review it before sending. Do not enter data you do not have permission to store.

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
