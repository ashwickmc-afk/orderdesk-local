# Setup guide

Choose one path. Most business owners should start with the **Local edition**.

## Requirements

### Local
- Recent Chrome, Edge, Firefox or Safari.
- Python 3 for the included Windows launcher or local HTTP server.
- No npm install or API credentials.

### Cloud
- Node.js 22.12 or newer and npm.
- A Supabase project.
- Supabase CLI to deploy the account-deletion function.

## Local edition — Windows

1. Download the complete source package from [the repository](https://github.com/ashwickmc-afk/orderdesk-local).
2. Extract it.
3. Open the extracted `apps/local` folder.
4. Install Python 3 if needed.
5. Double-click `START_ORDERDESK_WINDOWS.bat`.
6. Open `http://localhost:8765` if it does not open automatically.
7. Keep the terminal window open while using the app.

## Local edition — macOS / Linux

1. Open a terminal in `apps/local`.
2. Run:
   ```bash
   python3 -m http.server 8765 --bind 127.0.0.1
   ```
3. Open `http://localhost:8765`.

The Local edition has no account, API key, backend or build step. It stores data in the current browser profile on the current device. Use Backup/Restore to transfer records.

## Install the Local edition on a device

For PWA installation, host the Local edition on HTTPS or use localhost for testing. Open the address in a supported browser and choose Install app / Add to Home Screen. A static host does not create a database: each device stores its own independent data.

## Cloud edition

Cloud is optional and requires a one-time developer setup.

### 1. Create Supabase project
1. Create a Supabase project.
2. Open the project's API settings.
3. Copy the project URL and the publishable key (or legacy anon key).
4. Never put a service-role/secret key into browser configuration.

### 2. Apply database migration
1. Open the Supabase SQL Editor.
2. Run `apps/cloud/supabase/migrations/202611080001_orderdesk_cloud.sql`.
3. Confirm that `orderdesk_workspaces` and `orderdesk_backups` exist and have RLS enabled.
4. Confirm the revision-checked `orderdesk_save_workspace` RPC exists.

### 3. Configure authentication redirects
In Supabase Authentication URL Configuration, allow your local development URL (normally `http://localhost:5173`) and the eventual HTTPS production URL.

### 4. Configure environment
From `apps/cloud`, copy `.env.example` to `.env.local` and fill in:
```dotenv
VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
```
Never commit `.env.local`. The publishable key is intended for client-side use; RLS is the security boundary.

### 5. Run the Cloud edition
```bash
cd apps/cloud
npm install
npm run dev
```
Open the local URL printed by Vite. Create a test owner account and follow the email confirmation flow if enabled.

### 6. Deploy account deletion
1. Install the Supabase CLI using the official Supabase instructions.
2. Run `npx supabase login` and `npx supabase link --project-ref YOUR_PROJECT_REF`.
3. Set the service-role key as a server-side Edge Function secret:
   ```bash
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```
4. Deploy:
   ```bash
   npx supabase functions deploy delete-account
   ```
The service-role key must never be exposed in browser code or VITE_ variables.

### 7. Build for hosting
```bash
npm run build
```
Deploy the contents of `apps/cloud/dist/` to an HTTPS static host. Add the production URL to Supabase's allowed redirect URLs.

### 8. Test before real use
- Create two disposable test owner accounts.
- Confirm each account cannot access the other's workspace.
- Test sign-in, email confirmation and password recovery.
- Test changes on two devices, offline edits and reconnect.
- Test cloud snapshots, restore and account deletion.
- Inspect Supabase logs and browser console.

Do not use real customer data before the live security and sync checks are complete.

## Data backup

Local records are not synced. Export JSON backups regularly and store them away from the device. The Cloud edition also supports cloud snapshots, but owners should keep a separate downloaded backup.

## GST calculator

The GST calculator handles arithmetic only. It does not classify HSN/SAC, decide exemptions, determine the correct rate or file returns. Always check current official guidance and professional advice for real tax decisions.