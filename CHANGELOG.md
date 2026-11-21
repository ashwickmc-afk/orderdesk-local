# Changelog

## 0.7.1 — Reliability patch
- Prevents invalid Money Book entries from inserting `null` and breaking later renders.
- Preserves unsaved Business name typing during unrelated renders.
- Adds a 7-day backup reminder to the Overview attention list and Settings reminder.
- Corrects calculator backspace behavior and distinguishes divide-by-zero from other calculation errors.
- Restores CSV formula-protection prefixes on import without stripping ordinary apostrophes.
- Adds regression coverage for zero-value order status and malicious delivery values.


All notable OrderDesk milestones are listed here. v0.7.0 Local is the recommended maintained edition. v0.6.0 Cloud remains an optional beta pending live Supabase testing.

## 0.7.0 — Data integrity and workflow release

### Local edition
- Adds dated payment records per order and automatically records received payments as Money Book income.
- Supports multi-item orders with per-item quantity and unit price.
- Adds Money Book entry editing, month filtering and pagination for orders and money entries.
- Adds revision-checked IndexedDB writes and BroadcastChannel refreshes to detect competing tabs instead of silently overwriting newer data.
- Adds modal focus trapping, Escape handling and focus restoration.
- Adds an editable default phone country code, cached INR formatting and a last-backup reminder.
- Adds tested core helpers for normalization, order numbering, CSV parsing/export and restore migration.
- Generates the standalone `OrderDesk.html` from the Local source and inlines its tested modules.

### Quality checks
- Adds regression tests for legacy payment migration, multi-item normalization, order-number sequencing, CSV round trips, formula-injection escaping, date validation and payment-income restore migration.
- GitHub Actions builds the standalone app, runs all Local and GST tests, and validates that the generated launcher has no external asset dependencies.
- Browser-level interaction testing across browsers and real multi-tab scenarios remains recommended before calling this release production-proven.

## 0.6.0 — GST release

### Local edition
- Preserves the v0.5 no-login, no-backend workflow.
- Adds a GST calculator for GST-inclusive and GST-exclusive amounts.
- Shows CGST + SGST/UTGST for intra-state supplies and IGST for inter-state supplies.
- Retains v0.5 IndexedDB naming to preserve existing local browser data.
- Updates the PWA cache version and includes offline GST calculation code.

### Cloud edition (beta)
- Rebuilds the owner-only v0.5 workflow as a separate optional cloud edition.
- Adds owner sign-up/sign-in, account-specific local caches and Supabase workspace storage.
- Adds owner-enforced RLS and revision-checked saves to prevent silent cross-device overwrites.
- Adds manual/daily snapshots, restore controls and account deletion via a separately deployed Edge Function.
- Includes the same GST calculator as Local.

### Quality checks
- GST helper tests cover exclusive/inclusive calculations, intra/inter-state breakdown, rounding and invalid input.
- Inline JavaScript syntax checks pass in both editions.
- Live Supabase authentication, account isolation, sync, conflict recovery, snapshots and account deletion still need testing against a configured project.

## 0.5.0 — Local Business Edition
- Removed login and backend requirements from the recommended edition.
- Added Money Book, quick calculator, profit calculator and payment follow-up.
- Added local backup/restore, CSV exports and customer directory.

## 0.4.1 — Cloud login repair
- Fixed authentication form handling and asset paths discovered in the early cloud experiment.

## 0.4.0 — Cloud prototype
- First owner login, Supabase workspace and sync experiment.

## 0.3.0 — Installable PWA
- Added app manifest, icons, app-shell caching and responsive layouts.
- Removed internal order references from WhatsApp message text.

## 0.2.0 — Expanded order manager
- Improved typography, contrast and dark mode.
- Added partial-payment tracking, customer summaries, delivery visibility and WhatsApp drafts.

## 0.1.0 — First prototype
- Basic local order dashboard, order-status tracking and CSV export.

Historical snapshots are preserved in [archive/README.md](archive/README.md) and the [historical release ZIP](downloads/OrderDesk-Historical-Versions-v0.1-to-v0.5.zip).
