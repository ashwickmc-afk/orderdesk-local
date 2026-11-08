# Changelog

All notable OrderDesk milestones are listed here. v0.6.0 Local is the recommended maintained edition. v0.6.0 Cloud is an optional beta pending live Supabase testing.

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
