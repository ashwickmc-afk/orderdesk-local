# Setup guide

Choose one path. Most business owners should start with the **Local edition**.

## Requirements

### Local edition
- A recent desktop or mobile browser (Chrome, Edge, Firefox or Safari).
- Python 3 for the included Windows launcher or local HTTP server.
- No npm install or API credentials.

### Cloud edition
- Node.js 22.12 or newer and npm.
- A Supabase project.
- Supabase CLI to deploy the account-deletion function.

## First: download the complete source

1. Clone this repository or download its GitHub ZIP.
2. Open a terminal in the repository root.
3. Run:
   ```bash
   python downloads/download_source.py
   ```
4. The script downloads the source parts, verifies the complete archive's SHA-256 hash and ZIP integrity, then extracts it into `OrderDesk-v0.6.0-source/`.
5. Open that extracted folder for the actual Local and Cloud app source.

## Local edition — Windows

1. Open `OrderDesk-v0.6.0-source/apps/local`.
2. Make sure Python 3 is installed.
3. Double-click `START_ORDERDESK_WINDOWS.bat`.
4. A terminal window starts the local web server. Your browser should open `http://localhost:8765`.
5. Keep the terminal window open while using OrderDesk. Closing it stops the local server.
6. Start entering orders. There is no login, account, API key or cloud configuration.

## Local edition — macOS / Linux

1. Run the source download/extraction step above.
2. Open a terminal in `OrderDesk-v0.6.0-source/apps/local`.
3. Start the server:
   ```bash
   python3 -m http.server 8765 --bind 127.0.0.1
   ```
4. Open `http://localhost:8765`.

You can also open `index.html` directly for basic use, but a local HTTP server is recommended for consistent browser storage and PWA features.

### Install as an app

For PWA installation, host the Local edition on HTTPS (or use localhost for testing). Open the hosted address in a supported browser and choose **Install app** or **Add to Home Screen**. Static hosting is not a database: every device keeps separate local records.

### Local data and backups

- Use **Backup** to download a JSON file.
- Use **Restore** to restore a JSON backup or supported legacy CSV export.
- Store backups somewhere safe, separate from the device running OrderDesk.
- To move to another device, open the same Local edition there and restore the JSON file.
- Avoid clearing browser data unless you have a recent backup.

---

## Cloud edition

Cloud is optional and requires a one-time developer setup. Most owners do not need it.

### 1. Create a Supabase project

1. Create a project in the Supabase dashboard.
2. Wait for the project to finish provisioning.
3. Open the project's API settings.
4. Copy the project URL and **publishable** key (or legacy anon key).
5. Never use the `service_role` / secret key in browser configuration or commit it to GitHub.

### 2. Create the database tables and policies

1. Open the Supabase SQL Editor.
2. Open `OrderDesk-v0.6.0-source/apps/cloud/supabase/migrations/202611080001_orderdesk_cloud.sql`.
3. Paste the complete migration into the SQL Editor and run it.
4. Confirm the `orderdesk_workspaces` and `orderdesk_backups` tables exist and RLS is enabled.
5. Confirm the `orderdesk_save_workspace(jsonb, bigint)` RPC is listed.

### 3. Configure email authentication

1. In Supabase, open **Authentication → URL Configuration**.
2. Add your local development URL (for example `http://localhost:5173`) to allowed redirect URLs.
3. Add your production HTTPS URL before deployment.
4. Keep email confirmation enabled for public sign-ups unless you have a deliberate reason and a secure policy to change it.

### 4. Configure environment variables

1. Open `OrderDesk-v0.6.0-source/apps/cloud`.
2. Copy `.env.example` to `.env.local`.
3. Add your project URL and publishable key:
   ```dotenv
   VITE_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
   VITE_SUPABASE_PUBLISHABLE_KEY=YOUR_PUBLISHABLE_KEY
   ```
4. Save the file. `.env.local` is ignored by Git. Do not commit it.

The publishable key is designed for client use; database RLS is the security boundary. A service-role key is never needed in the browser.

### 5. Install dependencies and run the app

```bash
npm install
npm run dev
```

Run these commands from the Cloud folder. Open the local URL printed by Vite (normally `http://localhost:5173`). Create an owner account, confirm the email if prompted, then sign in.

### 6. Deploy the account-deletion function

1. Install the Supabase CLI using the official Supabase instructions.
2. Sign in and link the local project:
   ```bash
   npx supabase login
   npx supabase link --project-ref YOUR_PROJECT_REF
   ```
3. Set the service-role key as a server-side Edge Function secret (never add it to `.env.local`):
   ```bash
   npx supabase secrets set SUPABASE_SERVICE_ROLE_KEY=YOUR_SERVICE_ROLE_KEY
   ```
4. Deploy the function:
   ```bash
   npx supabase functions deploy delete-account
   ```

Supabase provides its URL and anon key to Edge Functions. Never expose the service-role key to the browser.

### 7. Build for hosting

```bash
npm run build
```

Upload the contents of `dist/` to an HTTPS static host. Set the same Vite environment variables in the hosting provider before building. Configure the production URL in Supabase redirect settings.

### 8. Test account isolation and backups

Before entering real business data:

1. Create two disposable test owner accounts with fictional data.
2. Add an order to account A and verify account B cannot see it.
3. Sign in to account A from a second browser/device and verify sync.
4. Make an offline change, reconnect, and verify it syncs.
5. Create a cloud snapshot and restore it in a test account.
6. Test account deletion using a disposable account.
7. Inspect browser console and Supabase logs.

Do not use real customer data until these checks pass.

---

## GST calculator

The Local and Cloud editions share the same GST arithmetic helper. Select the rate that actually applies to the supply, HSN/SAC classification and date. The calculator does not classify products, validate codes, decide exemptions or file returns. Read [GST-RATES.md](GST-RATES.md) and verify current official guidance before using a result for tax purposes.