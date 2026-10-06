#!/usr/bin/env python3
"""Load the curated public-safe Workbench seed registry into SQLite."""
from __future__ import annotations
import argparse
import json
import sqlite3
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS work_items (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  priority TEXT NOT NULL,
  portfolio_relation TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS career_evidence (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  validation TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS public_projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL
);
"""

def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("registry", type=Path)
    parser.add_argument("--db", type=Path, default=Path("data/public/workbench-public.sqlite3"))
    args = parser.parse_args()

    registry = json.loads(args.registry.read_text(encoding="utf-8"))
    args.db.parent.mkdir(parents=True, exist_ok=True)

    with sqlite3.connect(args.db) as conn:
        conn.executescript(SCHEMA)
        conn.executemany(
            "INSERT OR REPLACE INTO work_items VALUES (?, ?, ?, ?, ?, ?)",
            [(x["id"], x["name"], x["type"], x["status"], x["priority"], x["portfolio_relation"])
             for x in registry.get("work_items", [])],
        )
        conn.executemany(
            "INSERT OR REPLACE INTO career_evidence VALUES (?, ?, ?)",
            [(x["id"], x["name"], x["validation"])
             for x in registry.get("career_evidence", [])],
        )
        conn.executemany(
            "INSERT OR REPLACE INTO public_projects VALUES (?, ?)",
            [(x["id"], x["name"]) for x in registry.get("public_projects", [])],
        )
        counts = {
            "work_items": conn.execute("SELECT COUNT(*) FROM work_items").fetchone()[0],
            "career_evidence": conn.execute("SELECT COUNT(*) FROM career_evidence").fetchone()[0],
            "public_projects": conn.execute("SELECT COUNT(*) FROM public_projects").fetchone()[0],
        }
    print(json.dumps({"counts": counts, "db": str(args.db)}, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
