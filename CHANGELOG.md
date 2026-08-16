# CHANGELOG

## v0.2 (Draft)

### Added

- Effective Date lifecycle
- Situation Report
- Tactical vs. Strategic Curiosity
- Task IDs
- Canonical Markdown daily plans under `daily-plans/`
- Architecture Decision Records under `docs/architecture/adr/`
- Dated architecture session notes under `docs/architecture/sessions/`
- Repository governance and knowledge-artifact guidance
- Administrative propagation as operational overhead rather than a separate task by default
- Calendar availability as a scheduling gate after Effective Date
- Shabbat and Jewish non-working holidays as fully unavailable to POS-managed activity, including suppression of the daily standup
- Friday-style low-capacity treatment for Fridays, days preceding Jewish non-working holidays, and Jewish working holidays
- Israeli-observance and current-year Hebrew/Gregorian calendar requirements for Jewish holiday scheduling

### Changed

- Activation separated from Priority
- Daily operating cadence formalized
- Repository documentation updated to reflect `tasks.json` as the operational database
- Daily standup output defined as an execution artifact rather than a replacement for the underlying situation review
- Normal repository changes defined as branch-and-pull-request work
- Scheduling model now explicitly separates Activation, Calendar Availability, Priority, and Scheduling

### Deferred

- Created Date
- Automation (timestamps, Updated By)
- Evaluation of existing Chief of Staff GPTs
- Verification of the exact branch-protection or ruleset configuration needed to block direct connector writes to `main`
