# OrderDesk v0.6.0 — Cloud Edition (Beta)

The optional Cloud edition adds owner sign-in, Supabase workspace storage, cross-device sync and cloud snapshots. It retains OrderDesk's business-owner-only workflow; customers do not get accounts.

## Important
This is a beta project and requires a Supabase project, migration setup, environment configuration and live security/sync testing. Do not use real business records until account isolation and backups have been verified.

## Download source
[Download the complete v0.6.0 source package](../../downloads/OrderDesk-v0.6.0-GitHub-Source.zip)

Extract it and open `apps/cloud`. See [the Cloud setup guide](../../docs/SETUP.md#cloud-edition).

Never expose the Supabase service-role key in browser code or VITE_ variables.