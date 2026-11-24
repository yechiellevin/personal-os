# CHANGELOG

## v0.3 (Draft)

### 2026-11-24

- Designated SentinelTask as the operational task database and froze `tasks.json` as an archival migration snapshot.
- Imported 63 legacy tasks and reconciled them with two retained SentinelTask records, checking parent relationships, legacy IDs, statuses, dates, and diary entries.
- Moved 17 validation and sample records to Base44's recoverable entity trash after validation.
- Added canonical daily standup and weekly Chief of Staff prompts to the repository for synchronization with the hosted automations.
- Deferred the external Effective Date reconciliation smoke test until SentinelTask is published and its OAuth MCP server is live.

## v0.2 (Draft)

### 2026-08-16 — Daily standup and automation governance

- Canonical daily-standup review criteria covering Priority, State, deadlines, dependencies, and current context
- Daily-standup task-reference convention requiring task ID plus name or clear paraphrase
- Explicit daily-standup repository workflow, failure handling, and pull-request completion condition
- Automation governance: automations invoke canonical procedures rather than defining normative POS behavior
- Daily Situation Report definition expanded to include blockers/constraints and an explicit end-of-day success condition
- PDF generation for daily plans changed from optional-by-default to explicit-request-only
- Daily standup generation explicitly separated from task-database mutation; inconsistencies are surfaced rather than silently changed

### 2026-08-16 — Calendar scheduling rules

- Calendar availability as a scheduling gate after Effective Date
- Shabbat and Jewish non-working holidays as fully unavailable to POS-managed activity, including suppression of the daily standup
- Friday-style low-capacity treatment for Fridays, days preceding Jewish non-working holidays, and Jewish working holidays
- Israeli-observance and current-year Hebrew/Gregorian calendar requirements for Jewish holiday scheduling
- Scheduling model now explicitly separates Activation, Calendar Availability, Priority, and Scheduling

### 2026-08-06

- Canonical Markdown daily plans under `daily-plans/`
- Architecture Decision Records under `docs/architecture/adr/`
- Dated architecture session notes under `docs/architecture/sessions/`
- Repository governance and knowledge-artifact guidance
- Administrative propagation as operational overhead rather than a separate task by default
- Repository documentation updated to reflect `tasks.json` as the operational database
- Daily standup output defined as an execution artifact rather than a replacement for the underlying situation review
- Normal repository changes defined as branch-and-pull-request work
- Deferred verification of the exact branch-protection or ruleset configuration needed to block direct connector writes to `main`

### 2026-07-14

- Effective Date lifecycle
- Situation Report
- Tactical vs. Strategic Curiosity
- Task IDs
- Activation separated from Priority
- Daily operating cadence formalized

#### Deferred

- Created Date
- Automation (timestamps, Updated By)
- Evaluation of existing Chief of Staff GPTs
