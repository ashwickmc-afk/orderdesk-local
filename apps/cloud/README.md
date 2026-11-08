# OrderDesk v0.6.0 — Cloud Edition (Beta)

The optional Cloud edition adds owner sign-in, Supabase workspace storage, cross-device sync and cloud snapshots. It retains OrderDesk's business-owner-only workflow; customers do not get accounts.

## Important
This is a beta project. It needs a Supabase project, database migration, environment configuration and live security/sync testing. Do not use real business records until account isolation and backup recovery have been verified. Most owners should use the Local edition.

## Get the complete source
Clone or download the repository, then run `python downloads/download_source.py` from its root. This verifies and extracts the complete source into `OrderDesk-v0.6.0-source/`. Open `OrderDesk-v0.6.0-source/apps/cloud/` and follow the [Cloud setup guide](../../docs/SETUP.md#cloud-edition).

Never expose the Supabase service-role key in browser code or VITE_ variables.