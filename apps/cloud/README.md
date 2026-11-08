# OrderDesk v0.6.0 — Cloud Edition (Beta)

The optional advanced edition rebuilds the v0.5 business-owner workflow with owner sign-in, one owner workspace across devices, revision-checked cloud synchronisation, cloud snapshots and the GST calculator. Customers do not receive accounts.

## What you get

- The v0.5 order, customer, payment, Money Book and profit-calculator workflow.
- GST-inclusive/exclusive arithmetic, with CGST + SGST/UTGST or IGST display.
- Owner email sign-up, sign-in and password recovery.
- A separate local browser cache for each owner on each device.
- Supabase storage with owner-scoped Row Level Security (RLS).
- Revision-checked cloud saves to stop stale devices from silently overwriting newer data.
- Manual cloud snapshots and best-effort daily snapshots, with restore controls.
- Account deletion through a separately deployed Edge Function.

## Beta warning

This is a beta. It has not been connected to or tested against your live Supabase project. Test sign-up, confirmation, account isolation, sync, conflict handling, backup restore and account deletion with fictional records and separate test accounts/devices before using real customer or business information.

## Setup

1. Create a Supabase project.
2. Run `supabase/migrations/202611080001_orderdesk_cloud.sql` in the Supabase SQL Editor.
3. Set the Supabase Auth Site URL and allowed redirect URLs to your local test URL and production HTTPS URL.
4. Copy `cloud-config.example.js` to `cloud-config.js` and add the Supabase project URL and public publishable key. Never use a service-role/secret key in browser code.
5. For local testing, run `python -m http.server 8765 --bind 127.0.0.1` from this folder and open `http://localhost:8765`.
6. Create a disposable owner account, confirm the email if prompted, and sign in.
7. Host the folder over HTTPS for actual cross-device use.
8. Deploy `supabase/functions/delete-account/index.ts` if you want in-app account deletion. Store its service-role secret only as a Supabase Edge Function secret.

Detailed steps and test cases are in [../../docs/SETUP.md](../../docs/SETUP.md#cloud-edition).

## Data and recovery

Each authenticated owner has one cloud workspace. RLS restricts access to that owner. Every device has a separate local cache. A revision mismatch stops automatic upload; the owner must deliberately reload the current cloud copy or recover from a backup. Keep manual JSON backups. Snapshots are best-effort app-generated restore points, not provider-level backups.

## GST

The calculator is an arithmetic aid. The owner enters the applicable rate and type of supply; OrderDesk does not choose the tax treatment. Consult [GST-RATES.md](../../docs/GST-RATES.md) for official references and limitations.
