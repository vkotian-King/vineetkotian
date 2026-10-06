#!/usr/bin/env python3
"""Scan candidate public files for common privacy and secret-leak patterns."""
from __future__ import annotations
import re, sys
from pathlib import Path

BLOCKING = {
    "email": re.compile(r"[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}", re.I),
    "phone-like": re.compile(r"(?:\+?\d[\d\s().-]{8,}\d)"),
    "AWS access key": re.compile(r"\bAKIA[0-9A-Z]{16}\b"),
    "GitHub token": re.compile(r"\b(?:ghp_|github_pat_)[A-Za-z0-9_]{20,}\b"),
    "Bearer token": re.compile(r"\bBearer\s+[A-Za-z0-9._-]{20,}\b", re.I),
    "private IP": re.compile(r"\b(?:10\.\d{1,3}\.\d{1,3}\.\d{1,3}|192\.168\.\d{1,3}\.\d{1,3}|172\.(?:1[6-9]|2\d|3[0-1])\.\d{1,3}\.\d{1,3})\b"),
    "private key": re.compile(r"-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----"),
    "JWT-like": re.compile(r"\beyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{10,}\b"),
    "Jira issue ID": re.compile(r"\b[A-Z]{2,10}-\d{2,6}\b"),
    "long hex identifier": re.compile(r"\b[a-f0-9]{32,}\b", re.I),
}

REVIEW = {
    "internal URL": re.compile(r"https?://[^\s]*(?:jira|confluence|sharepoint|snyk|ecr|eks|internal)[^\s]*", re.I),
    "localhost": re.compile(r"\b(?:localhost|127\.0\.0\.1)(?::\d+)?\b"),
    "env/secret assignment": re.compile(r"\b(?:API[_-]?KEY|SECRET|PASSWORD|TOKEN)\s*=\s*[^\s]+", re.I),
}

def scan(path: Path):
    try:
        text = path.read_text(encoding="utf-8")
    except UnicodeDecodeError:
        return [], [(path, "binary/non-UTF8 file — manual review required")]
    blocked, review = [], []
    for label, pattern in BLOCKING.items():
        blocked.extend((path, label, m.group(0)[:120]) for m in pattern.finditer(text))
    for label, pattern in REVIEW.items():
        review.extend((path, label, m.group(0)[:120]) for m in pattern.finditer(text))
    return blocked, review

def main():
    paths = [Path(p) for p in sys.argv[1:]]
    if not paths:
        print("Usage: python workbench/privacy/scan_public.py <path> [<path> ...]")
        return 2
    blocked, review = [], []
    for path in paths:
        if path.is_file():
            b, r = scan(path); blocked.extend(b); review.extend(r)
        elif path.is_dir():
            for f in path.rglob("*"):
                if f.is_file():
                    b, r = scan(f); blocked.extend(b); review.extend(r)
    print("PRIVACY SCAN")
    print("=" * 40)
    print(f"BLOCKED: {len(blocked)}")
    for item in blocked: print("  [BLOCK]", item)
    print(f"REVIEW:  {len(review)}")
    for item in review: print("  [REVIEW]", item)
    print(f"RESULT:  {'FAIL' if blocked else 'PASS'}")
    return 1 if blocked else 0

if __name__ == "__main__":
    raise SystemExit(main())
