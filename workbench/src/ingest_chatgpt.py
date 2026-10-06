#!/usr/bin/env python3
"""Incremental ChatGPT export ingester."""
from __future__ import annotations
import argparse, hashlib, json, sqlite3, zipfile
from datetime import datetime, timezone
from pathlib import Path

SCHEMA = """
CREATE TABLE IF NOT EXISTS chats (
  chat_id TEXT PRIMARY KEY, platform TEXT NOT NULL, source_conversation_id TEXT NOT NULL,
  title TEXT, created_at TEXT, updated_at TEXT, status TEXT, is_archived INTEGER,
  is_starred INTEGER, is_study_mode INTEGER, default_model_slug TEXT,
  message_count INTEGER, user_message_count INTEGER, assistant_message_count INTEGER,
  attachment_count INTEGER, content_fingerprint TEXT NOT NULL,
  first_seen_at TEXT NOT NULL, last_seen_at TEXT NOT NULL
);
CREATE TABLE IF NOT EXISTS imports (
  export_fingerprint TEXT PRIMARY KEY, imported_at TEXT NOT NULL,
  conversation_count INTEGER NOT NULL, changed_count INTEGER NOT NULL, new_count INTEGER NOT NULL
);
CREATE TABLE IF NOT EXISTS change_queue (
  chat_id TEXT PRIMARY KEY, queued_at TEXT NOT NULL, reason TEXT NOT NULL
);
"""

def iso(ts):
    if ts is None: return None
    return datetime.fromtimestamp(float(ts), tz=timezone.utc).isoformat()

def text_from_message(msg):
    if not msg: return ""
    parts=(msg.get("content") or {}).get("parts") or []
    out=[]
    for p in parts:
        if isinstance(p,str): out.append(p)
        elif isinstance(p,dict): out.append(json.dumps(p, sort_keys=True, ensure_ascii=False))
    return "\n".join(out)

def normalize(conv):
    messages=[]; attachments=0
    for node in (conv.get("mapping") or {}).values():
        msg=node.get("message") if isinstance(node,dict) else None
        if not msg: continue
        role=(msg.get("author") or {}).get("role")
        messages.append((role, text_from_message(msg)))
        meta=msg.get("metadata") or {}
        if any(k in meta for k in ("attachments","files","asset_pointer","file_ids")): attachments += 1
    canonical={
      "conversation_id":conv.get("conversation_id") or conv.get("id"),
      "title":conv.get("title") or "Untitled",
      "create_time":conv.get("create_time"), "update_time":conv.get("update_time"),
      "is_archived":bool(conv.get("is_archived")), "is_starred":bool(conv.get("is_starred")),
      "is_study_mode":bool(conv.get("is_study_mode")), "default_model_slug":conv.get("default_model_slug"),
      "message_count":len(messages), "user_message_count":sum(r=="user" for r,_ in messages),
      "assistant_message_count":sum(r=="assistant" for r,_ in messages), "attachment_count":attachments,
    }
    fp=hashlib.sha256(json.dumps({"meta":canonical,"messages":messages},sort_keys=True,ensure_ascii=False).encode()).hexdigest()
    return canonical,fp

def iter_conversations(z):
    for name in sorted(z.namelist()):
        if name.startswith("conversations-") and name.endswith(".json"):
            for c in json.loads(z.read(name)): yield c

def main():
    ap=argparse.ArgumentParser()
    ap.add_argument("zip_path"); ap.add_argument("--db",default="data/private/workbench.sqlite3")
    args=ap.parse_args(); db=Path(args.db); db.parent.mkdir(parents=True,exist_ok=True)
    con=sqlite3.connect(db); con.executescript(SCHEMA)
    export_hash=hashlib.sha256(Path(args.zip_path).read_bytes()).hexdigest()
    now=datetime.now(timezone.utc).isoformat(); new=changed=total=0
    with zipfile.ZipFile(args.zip_path) as z:
        for conv in iter_conversations(z):
            total+=1; meta,fp=normalize(conv); cid=meta["conversation_id"]
            old=con.execute("SELECT content_fingerprint FROM chats WHERE chat_id=?",(cid,)).fetchone()
            reason="new" if old is None else ("changed" if old[0]!=fp else None)
            if reason:
                new += reason=="new"; changed += reason=="changed"
                con.execute("INSERT OR REPLACE INTO change_queue VALUES (?,?,?)",(cid,now,reason))
            existing=con.execute("SELECT first_seen_at FROM chats WHERE chat_id=?",(cid,)).fetchone()
            first=existing[0] if existing else now
            con.execute("INSERT OR REPLACE INTO chats VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",(
                cid,"chatgpt",cid,meta["title"],iso(meta["create_time"]),iso(meta["update_time"]),
                "archived" if meta["is_archived"] else "available",int(meta["is_archived"]),int(meta["is_starred"]),
                int(meta["is_study_mode"]),meta["default_model_slug"],meta["message_count"],meta["user_message_count"],
                meta["assistant_message_count"],meta["attachment_count"],fp,first,now))
    con.execute("INSERT OR REPLACE INTO imports VALUES (?,?,?,?,?)",(export_hash,now,total,changed,new))
    con.commit(); con.close()
    print(json.dumps({"export_fingerprint":export_hash,"conversations":total,"new":new,"changed":changed,
                      "unchanged":total-new-changed,"db":str(db)},indent=2))

if __name__=="__main__": main()