# Vineet AI Workbench — proposed ingestion layer

This is the proposed private ingestion/workbench layer for the existing public overall portfolio.

## Design principles

- ChatGPT export ZIP is an input snapshot, not the public data source.
- Conversation IDs are stable primary keys.
- Raw/private conversation content never belongs in the public GitHub repository.
- Normalized metadata is separated from intelligence/classification.
- Existing GitHub portfolio remains curated public evidence; ChatGPT history discovers and enriches evidence but does not overwrite it.
- Incremental refresh processes only new/changed conversations.

## Flow

```text
ChatGPT Export ZIP
      ↓
private ingestion
      ↓
normalized conversation registry
      ↓
changed-conversation queue
      ↓
private intelligence/classification
      ↓
canonical work items / evidence
      ↓
public-safe projection
      ↓
existing overall portfolio + future private dashboard
```

## Run

```bash
python src/ingest_chatgpt.py /path/to/chatgpt-export.zip --db data/private/workbench.sqlite3
```

First run creates the baseline. Later exports upsert by `conversation_id` and only queue conversations whose content fingerprint changed.

## Public/private boundary

Only files under `data/public/` are intended for GitHub. Never copy ChatGPT conversation bodies, attachments, exports, or private registry databases into the public repository.

## Portfolio relationship

The existing GitHub site is the curated **overall portfolio**. The AI Workbench is the private/public-safe evidence system that discovers, tracks and validates work, skills and career evidence that may strengthen that portfolio. It does not automatically publish claims.