#!/usr/bin/env python3
"""Download and safely extract the current OrderDesk GitHub source ZIP."""
from __future__ import annotations
import argparse
import io
import urllib.request
import zipfile
from pathlib import Path

URL = "https://github.com/ashwickmc-afk/orderdesk-local/archive/refs/heads/main.zip"

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", default="OrderDesk-source", help="directory to extract into")
    args = parser.parse_args()
    request = urllib.request.Request(URL, headers={"User-Agent": "OrderDesk-source-downloader"})
    with urllib.request.urlopen(request, timeout=60) as response:
        archive = response.read()
    target = Path(args.output).resolve()
    target.mkdir(parents=True, exist_ok=True)
    with zipfile.ZipFile(io.BytesIO(archive)) as package:
        bad = package.testzip()
        if bad:
            raise SystemExit(f"ZIP integrity check failed at {bad}")
        root = target.resolve()
        for member in package.infolist():
            destination = (root / member.filename).resolve()
            if destination != root and root not in destination.parents:
                raise SystemExit(f"Unsafe ZIP path rejected: {member.filename}")
        package.extractall(root)
    print(f"Downloaded and extracted OrderDesk source into: {root}")
    print("Open apps/local for the recommended no-login edition.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
