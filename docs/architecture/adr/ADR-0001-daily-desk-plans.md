# ADR-0001: Daily desk plans are repository artifacts

- **Date:** 2026-08-05
- **Status:** Proposed

## Context

The daily situation review produces a concise desk plan for execution. PDF files generated inside ChatGPT are useful for printing, but their download links are temporary and therefore unreliable as the permanent record of the standup.

GitHub renders Markdown natively and provides durable storage, search, history, and diffs.

## Decision

The canonical daily desk plan will be stored in the repository as:

```text
daily-plans/YYYY-MM-DD.md
```

The file will contain the date, primary objective, priority tasks with task IDs and names, secondary tasks, blockers, operating notes, and an end-of-day success condition.

A PDF may still be generated as a printable convenience, but it is not the system of record.

## Consequences

- Daily plans remain readable directly in GitHub.
- Plans can be searched, linked, compared, and revised through version control.
- The workflow no longer depends on temporary ChatGPT file downloads.
- Any PDF version is derived from, and subordinate to, the Markdown plan.
