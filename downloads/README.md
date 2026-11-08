# Complete OrderDesk source package

The complete v0.6.0 source bundle includes:
- Maintained Local and Cloud applications
- GST calculator and automated tests
- Setup and GST guidance
- Contribution, security and code-of-conduct policies
- Historical snapshots for v0.1 through v0.5
- GitHub templates and CI configuration

## Download and verify

From a clone of this repository, run:

```bash
python downloads/download_source.py
```

The script downloads the source parts from this folder, verifies the SHA-256 checksum and ZIP integrity, then extracts the full project into `OrderDesk-v0.6.0-source/`.

Open `OrderDesk-v0.6.0-source/apps/local` for the simple no-login edition or `apps/cloud` for the optional Supabase Cloud edition.

No private business data, credentials or live backend keys are included.