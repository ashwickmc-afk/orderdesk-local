# Security policy

OrderDesk is a small open-source project. Please do not publish exploitable security issues, credentials or personal business data in public issues.

## Supported versions
Security fixes are focused on the current 0.6.x Local and Cloud editions. Earlier versions are historical snapshots and are not maintained.

## Reporting a vulnerability
Use GitHub's private vulnerability reporting feature if enabled for this repository. If unavailable, open a minimal issue asking for a private contact route without including exploit details, credentials or personal information.

Include the affected edition/version, impact and safe reproduction steps using fictional data.

## Security notes
- The Local edition stores records in browser storage. It does not encrypt the browser profile and cannot protect data from someone with access to the unlocked device/profile.
- The Cloud edition depends on correct Supabase Auth, Row Level Security policies and Edge Function configuration.
- The Supabase service-role key must remain server-side and must never be included in VITE_ variables, browser code, screenshots or commits.
- Use HTTPS for deployment and keep dependencies updated.
- Test with fictional data before using real customer records.