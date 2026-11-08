#!/usr/bin/env python3
"""Download, verify and extract the complete OrderDesk v0.6.0 source package."""
from __future__ import annotations
import argparse
import hashlib
import io
import urllib.request
import zipfile
from pathlib import Path

OWNER = "ashwickmc-afk"
REPO = "orderdesk-local"
BRANCH = "main"
PARTS = [f"source-{i:02d}.part" for i in range(1, 16)]
EXPECTED_SIZE = 108194
EXPECTED_SHA256 = "576318e933a2ddcea7228d3c051132084b60c1ef6b4158e8c657d8940f37d560"

def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--output", default="OrderDesk-v0.6.0-source", help="directory to extract into")
    args = parser.parse_args()

    base = f"https://raw.githubusercontent.com/{OWNER}/{REPO}/{BRANCH}/downloads/source-parts/"
    pieces: list[bytes] = []
    for index, name in enumerate(PARTS, start=1):
        url = base + name
        print(f"[{index}/{len(PARTS)}] Downloading {name}...")
        request = urllib.request.Request(url, headers={"User-Agent": "OrderDesk-source-downloader"})
        with urllib.request.urlopen(request, timeout=30) as response:
            pieces.append(response.read())

    archive = b"".join(pieces)
    digest = hashlib.sha256(archive).hexdigest()
    if len(archive) != EXPECTED_SIZE or digest != EXPECTED_SHA256:
        raise SystemExit("Source package verification failed. Do not extract these files.")

    with zipfile.ZipFile(io.BytesIO(archive)) as package:
        bad = package.testzip()
        if bad:
            raise SystemExit(f"ZIP integrity check failed at {bad}")
        target = Path(args.output)
        target.mkdir(parents=True, exist_ok=True)
        package.extractall(target)

    print(f"Verified and extracted OrderDesk v0.6.0 into: {Path(args.output).resolve()}")
    print("Open apps/local for the no-login edition or apps/cloud for the optional cloud edition.")
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
