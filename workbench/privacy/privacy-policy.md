# AI Workbench Privacy & Public-Safety Policy

The Workbench may process a private ChatGPT export and derive portfolio evidence from it. Private source data must never be published.

## Data zones

- **PRIVATE** — raw exports, conversation bodies, attachments, source conversation IDs, private registry/database files, personal/company-sensitive context, credentials and secrets.
- **REVIEW** — curated career evidence, employer references, technical details, locations, third-party names, claims and metrics that may be public but require human validation.
- **PUBLIC** — validated portfolio content, public GitHub artifacts, public project links, and intentionally published professional information.

## Mandatory gate

Any artifact intended for GitHub or another public surface must pass the privacy scanner before commit.

A scanner PASS does not authorize publication. Human review remains required for REVIEW items and for the final claim/content decision.

## Never publish

- Raw ChatGPT exports or full private conversation bodies
- ChatGPT conversation IDs or private source identifiers
- Credentials, API keys, tokens, passwords, cookies or private keys
- Personal contact details unless explicitly intended for the public portfolio
- Financial, family or other sensitive personal information
- Internal employer URLs, credentials, infrastructure details or confidential incident data
- Third-party personal information without a clear public basis

## Authority

- ChatGPT history is evidence discovery, not publication authority.
- GitHub is authoritative for public code/artifact existence.
- The existing overall portfolio is authoritative for curated public claims and presentation.
- A Workbench candidate never becomes public automatically.

## Commit rule

Privacy scan -> human review -> explicit approval -> GitHub commit.
