# OrderDesk setup guide

**Start with Local unless you specifically need cross-device cloud synchronisation.** Both editions are for the business owner; customers do not need accounts.

## Download the project

Use the [direct GitHub source ZIP download](https://github.com/ashwickmc-afk/orderdesk-local/archive/refs/heads/main.zip?download=1). Extract it before running the app.

- Recommended no-login app: `apps/local`
- Optional Cloud beta: `apps/cloud`
- Historical milestones: `archive/releases`

## Local edition — Windows (recommended)

1. Extract the downloaded ZIP.
2. Open `apps/local`.
3. Install Python 3 if it is not already installed. Python is used only to start a local web server; OrderDesk itself has no Python package dependencies.
4. Double-click `START_ORDERDESK_WINDOWS.bat`.
5. A command window starts the local server and opens `http://localhost:8765` in your browser.
6. Keep the command window open while using OrderDesk. Closing it stops the local server.
7. Start entering orders. There is no sign-in, account, API key, Supabase project or mandatory setup.

## Local edition — macOS / Linux

1. Open a terminal in the extracted `apps/local` folder.
2. Run:
   ```bash
   python3 -m http.server 8765 --bind 127.0.0.1
   ```
3. Open `http://localhost:8765`.

Opening `index.html` directly is supported for basic use, but a local HTTP server is recommended for consistent browser storage and PWA behaviour.

### Install on phones and tablets

To install the Local app as a PWA on another device, host the contents of `apps/local` on an HTTPS static host. Open the HTTPS address in a supported browser and choose **Install app** or **Add to Home Screen**. Static hosting is not a backend: each device keeps its own records. Use Backup and Restore to transfer records between devices.

### Local data and backups

- Use **Backup** to download a JSON file.
- Use **Restore** to restore a JSON backup or a supported older CSV export.
- Keep backups separately from the device running OrderDesk.
- Clearing browser/site data, resetting the device or losing the device can remove local records.
- v0.6 Local keeps the v0.5 IndexedDB database name so the same browser profile can continue using its existing records.

## Cloud edition — optional beta

Cloud is more advanced. It needs a Supabase project, one-time database setup and configuration. It has not been tested against your live Supabase project. Use fictional records until the tests below pass.

### 1. Create a Supabase project and database

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run `apps/cloud/supabase/migrations/202611080001_orderdesk_cloud.sql`.
4. Confirm `orderdesk_workspaces` and `orderdesk_backups` exist, Row Level Security (RLS) is enabled, and the `orderdesk_save_workspace(jsonb, bigint)` RPC exists.

### 2. Configure authentication

1. In Supabase, open **Authentication → URL Configuration**.
2. Add your local development URL (for example `http://localhost:8765`) and the final HTTPS hosting URL to allowed redirect URLs.
3. Set the Site URL to the production HTTPS address before public use.
4. Keep email confirmation enabled unless you have deliberately reviewed the account policy.

### 3. Add the public browser configuration

1. Open `apps/cloud`.
2. Copy `cloud-config.example.js` and name the copy `cloud-config.js`.
3. Enter only the Supabase project URL and the **publishable** key (or legacy anon key):
   ```js
   window.ORDERDESK_CLOUD_CONFIG = {
     supabaseUrl: 'https://YOUR_PROJECT.supabase.co',
     publishableKey: 'YOUR_SUPABASE_PUBLISHABLE_KEY'
   };
   ```
4. Never place a service-role/secret key in `cloud-config.js`, browser JavaScript or GitHub. The file is ignored by Git.

### 4. Run or host Cloud

For local testing, open a terminal in `apps/cloud` and run:

```bash
python -m http.server 8765 --bind 127.0.0.1
```

Open `http://localhost:8765`, create a disposable owner account, confirm the email if prompted, and sign in. For cross-device use, host the contents of `apps/cloud` on HTTPS and update the Supabase redirect URLs to match.

### 5. Enable account deletion

The Cloud edition's delete-account button requires the separately deployed Supabase Edge Function at `apps/cloud/supabase/functions/delete-account/index.ts`.

1. Install the Supabase CLI following the official Supabase documentation.
2. Sign in and link the project:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```
3. Configure the server-side secret. Do not put it in `cloud-config.js`:
   ```bash
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```
4. Deploy:
   ```bash
   npx supabase functions deploy delete-account
   ```

### 6. Cloud test checklist

Use fictional data and two disposable owner accounts:

1. Register owner A and owner B separately.
2. Add an order to owner A and verify owner B cannot read it.
3. Sign in to owner A on a second browser/device and verify the same data appears.
4. Make simultaneous changes from two devices and verify stale revisions are stopped rather than silently overwritten.
5. Create and restore a cloud snapshot.
6. Test password recovery and account deletion with a disposable account.
7. Inspect the browser console and Supabase logs.

Cloud is a beta until these live tests pass. Snapshots are best-effort application restore points; they do not replace provider-level database backups. Keep a separate JSON backup.

## GST calculator

Both editions include the same GST arithmetic helper. The owner enters the applicable rate and chooses GST-inclusive/exclusive pricing and intra-/inter-state supply. The tool does not determine tax classification, validate HSN/SAC codes, decide exemptions, calculate input tax credit or file returns. Verify current treatment using official references in [GST-RATES.md](GST-RATES.md) before using a result on an invoice.
