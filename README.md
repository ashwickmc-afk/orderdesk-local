<div align="center">

# OrderDesk

### Simple business management. No unnecessary complexity.

**Keep it simple. Keep it better.**

A practical workspace for independent business owners who want to manage orders, payments, expenses and pricing without wrestling with complicated software.

[**Download OrderDesk source ZIP**](https://github.com/ashwickmc-afk/orderdesk-local/archive/refs/heads/main.zip?download=1) · [Local edition](apps/local/) · [Cloud edition — beta](apps/cloud/) · [Version history](archive/README.md)

[Setup guide](docs/SETUP.md) · [Version history](CHANGELOG.md) · [Report a bug](https://github.com/ashwickmc-afk/orderdesk-local/issues)

</div>

---

## Why OrderDesk exists

I started OrderDesk with one straightforward goal: make the everyday admin work of a small business easier. A home baker should be able to check pending orders and unpaid balances in a few seconds. A tiffin operator should be able to keep daily orders organised. A solo seller should be able to understand product costs and selling prices without wrestling with complicated accounting software.

OrderDesk follows five simple rules:

- **Keep it simple.** Common tasks should take only a few steps.
- **Keep it useful.** Every feature should solve a practical business problem.
- **Respect the owner's data.** The Local edition keeps records on the owner's device.
- **Keep control with the owner.** Customers do not need accounts or access to the workspace.
- **Offer a choice.** Use Local for simplicity or Cloud when cross-device sync is worth the extra setup.

## Download OrderDesk

**Recommended: start with the Local edition.**

1. Click the [direct source ZIP download](https://github.com/ashwickmc-afk/orderdesk-local/archive/refs/heads/main.zip?download=1).
2. Extract the downloaded ZIP.
3. Open `apps/local` for the recommended no-login edition, or `apps/cloud` for the optional beta.
4. On Windows, open `apps/local/START_ORDERDESK_WINDOWS.bat`. Python 3 is required.
5. The Local app opens at `http://localhost:8765`.

There is no login, backend, API key or cloud setup in Local. Cloud has its own setup and must be configured separately; see [docs/SETUP.md](docs/SETUP.md).

## Choose your edition

| | Local edition | Cloud edition |
|---|---|---|
| Best for | Owners who want a simple, self-contained tool | Owners who need one workspace across devices |
| Sign-in | No | Owner account |
| Data storage | Browser/device only | Supabase, with a separate local cache per owner |
| Cross-device sync | Manual backup/restore | Online sync with revision-conflict protection |
| Setup | Simple | Advanced one-time setup |
| Complexity | **Simple** | **Advanced beta** |
| GST calculator | Included | Included |

**My recommendation:** choose Local unless automatic cross-device synchronisation is genuinely important. Neither edition has a customer-facing portal.

## What it helps with

- **Orders:** record customers, items, quantities, delivery dates, status and payment balances.
- **Payment follow-up:** see outstanding amounts and prepare WhatsApp reminders for the owner to review.
- **Money Book:** record additional income and business expenses. Order payments are already recorded on their orders, so do not enter them twice.
- **Profit calculator:** estimate batch cost, unit cost, break-even price, margin and target selling price.
- **GST calculator:** calculate GST-inclusive or GST-exclusive totals and show CGST + SGST/UTGST or IGST based on the supply type selected by the owner.
- **Quick calculator:** handle everyday arithmetic.
- **Customer list:** view order history, repeat customers and balances.
- **Backups and exports:** JSON backup/restore and CSV exports.

OrderDesk is a lightweight record-keeping workspace. It is not a complete accounting, inventory, billing, payroll or tax-filing system.

## GST calculator: important limitation

The calculator performs arithmetic only. You must enter the rate that applies and select intra-state or inter-state supply. It does **not** identify the correct GST rate, classify products/services, validate HSN/SAC codes, decide exemptions, calculate input tax credit, produce a statutory invoice or file returns. Verify the correct treatment with official guidance or a qualified tax professional.

- [CBIC GST rates](https://cbic-gst.gov.in/gst-goods-services-rates.html)
- [CBIC Tax Information Portal](https://taxinformation.cbic.gov.in/)
- [GST Council](https://gstcouncil.gov.in/)

More details: [docs/GST-RATES.md](docs/GST-RATES.md).

## Versions and project history

Older source snapshots are preserved in `archive/releases/` inside the complete source ZIP. v0.6.0 Local is the recommended maintained edition; v0.6.0 Cloud is an optional beta pending live Supabase testing.

| Version | Milestone | Main changes | Download |
|---|---|---|---|
| **0.1.0** | First prototype | Local order dashboard, basic order entry, status tracking and CSV export. | [Archive](archive/releases/) |
| **0.2.0** | Expanded order manager | Improved readability, dark mode, partial payments, customer directory, WhatsApp drafts, delivery tracking and backup/restore. | [Archive](archive/releases/) |
| **0.3.0** | Installable PWA | Responsive app for PC, laptop, tablet and phone; manifest, offline app shell and app icons. Internal order IDs removed from WhatsApp drafts. | [Archive](archive/releases/) |
| **0.4.0** | Cloud experiment | First owner login, Supabase storage and cross-device sync prototype. | [Archive](archive/releases/) |
| **0.4.1** | Login repair | Fixed form handling and asset paths discovered in the early cloud experiment. | [Archive](archive/releases/) |
| **0.5.0** | Local Business Edition | Removed login/backend; added Money Book, profit and quick calculators, payment follow-up and local backups. | [Archive](archive/releases/) |
| **0.6.0 Local** | GST release | Kept the local-first workflow and added inclusive/exclusive GST arithmetic with intra/inter-state breakdown. | [Local source](apps/local/) |
| **0.6.0 Cloud Beta** | Optional cloud edition | v0.5-style owner workspace, owner-only cloud data, revision-checked sync, cloud snapshots and GST calculator. | [Cloud source](apps/cloud/) |

See [CHANGELOG.md](CHANGELOG.md) and [archive/README.md](archive/README.md).

## Data and privacy

### Local edition

Records stay in the browser profile on the current device. They do not automatically sync to a phone or another computer. Use **Backup** on one device and **Restore** on another to transfer records. Clearing browser data or resetting the device can remove local records, so keep a separate backup. When you deliberately open a WhatsApp draft, review it before sending.

The Local v0.6 app keeps the same IndexedDB database name as v0.5 so an existing v0.5 workspace in the same browser profile remains accessible.

### Cloud edition

Cloud stores the signed-in owner's workspace in the Supabase project configured by the operator. Row Level Security (RLS) restricts each account to its own workspace. Cloud saves use a revision check; if another device has changed the workspace, OrderDesk stops automatic uploads instead of silently replacing that version. The app also keeps an owner-specific local cache and offers cloud snapshots/restore.

Cloud is a **beta**. It has not been tested against your live Supabase project. Test with fictional records and separate test accounts/devices before using real customer information. Read [SECURITY.md](SECURITY.md) and [apps/cloud/README.md](apps/cloud/README.md). Never commit a Supabase service-role/secret key.

## Development checks

Run the GST tests with:

```bash
node --test apps/local/tests/*.test.cjs
```

The Local edition has no runtime dependency installation. Cloud calls Supabase Auth and REST APIs directly from the browser using a public publishable key; RLS is the security boundary.

## Contributing

Small, focused improvements are welcome. Please read [CONTRIBUTING.md](CONTRIBUTING.md) before opening a pull request. Use fictional data in issues and never attach real customer records, passwords or API keys.

## Licence

OrderDesk is released under the [MIT License](LICENSE).

---

<div align="center">

**Keep it simple. Keep it better.**

Built for the people who run small businesses every day.

</div>
