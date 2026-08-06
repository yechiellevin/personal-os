# ADR-0003: Classify durable POS knowledge by artifact type

- **Date:** 2026-08-05
- **Status:** Proposed

## Context

Operational and architecture conversations contain a mixture of durable decisions, historical context, implementation observations, discarded ideas, and transient discussion. Preserving entire conversations as canonical documentation would retain noise and make authoritative guidance harder to identify.

The POS already distinguishes governing documents, operational data, changelog history, and ideas. Architecture work needs an equivalent distinction between normative decisions and informative session history.

## Decision

Durable knowledge extracted from POS conversations will be stored according to its role:

- **Architecture Decision Records:** normative decisions about how the system is designed or operated, stored under `docs/architecture/adr/`.
- **Architecture session notes:** concise historical records of questions explored, conclusions, unresolved points, and derived artifacts, stored under `docs/architecture/sessions/`.
- **Daily plans:** operational standup outputs, stored under `daily-plans/`.
- **CHANGELOG:** material changes to the operating model or repository structure.
- **Ideas:** noncommitted possibilities and strategic curiosity.

Chats are working context, not canonical system knowledge. Their durable content should be extracted rather than preserved wholesale.

Session-note filenames will use the convention:

```text
YYYY-MM-DD-short-kebab-case-topic.md
```

## Consequences

- Readers can distinguish decisions from discussion history.
- Repository search and navigation become more predictable.
- Session notes preserve useful context without giving discarded ideas normative weight.
- Extracting durable knowledge becomes part of closing significant architecture discussions.
- Minor, mechanical downstream updates remain administrative propagation rather than separate project tasks unless they require independent prioritization.
