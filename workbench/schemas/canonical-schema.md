# Canonical AI Workbench Schema v0.1

## Entities

### Chat
A source conversation from an AI platform.
- `chat_id`
- `platform`
- `source_conversation_id`
- `title`
- `created_at`
- `updated_at`
- `status`
- `is_archived`
- `is_starred`
- `message_count`
- `attachment_count`
- `content_fingerprint`
- `first_seen_at`
- `last_seen_at`

### WorkItem
A durable unit of work; larger than a chat.
- `work_item_id`
- `name`
- `type`: project | program | workstream | learning | skill | idea | research | reference
- `status`: active | waiting | stale | completed | archived
- `priority`: high | medium | low | unassigned
- `first_activity`
- `last_activity`
- `confidence`
- `next_action`

### Skill
A reusable capability developed through work.

### Learning
A topic or learning path being studied.

### Idea
A candidate future project or improvement.

### CareerEvidence
A validated professional story, outcome, capability, or reusable interview example.

### PortfolioProject
A curated public-facing project. This is NOT automatically created from a chat.

### Artifact
A tangible output: repository, application, document, skill, article, dashboard, certification, etc.

### Platform
Source system: ChatGPT, GitHub, Gemini, Claude, etc.

## Relationships

```text
Chat ──→ WorkItem
WorkItem ──→ Skill / Learning / Idea / Artifact
WorkItem ──→ CareerEvidence
CareerEvidence ──→ PortfolioProject
Artifact ──→ PortfolioProject
```

## Authority rules

1. ChatGPT is authoritative for conversation metadata/content evidence.
2. GitHub is authoritative for public code/artifact existence.
3. The existing portfolio is authoritative for curated public claims and presentation.
4. Career evidence requires validation; ingestion may suggest it but must not invent outcomes.
5. A private WorkItem can exist without becoming public portfolio content.