# SentinelTask Migration Plan

Status: Draft  
Decision record: [`ADR-9999-base44-migration-plan.md`](../architecture/adr/ADR-9999-base44-migration-plan.md)  
Implementation prompt: [`base44-builder-prompt.md`](base44-builder-prompt.md)

## Purpose

Migrate the current Personal Operating System task data and its migration-critical operating semantics into the existing SentinelTask Base44 application without replacing or regressing SentinelTask's working task-management behavior.

The migration is divided into two operations:

1. Extend and test the existing SentinelTask application through an approved Base44 builder prompt.
2. Transform and import `tasks.json` separately after the required schema and interface behavior is ready.

## Migration-critical issue tracker

| Issue | Resolution | Status |
| --- | --- | --- |
| Effective Date | Add a nullable `effective_date` field. Future-effective tasks must not compete for attention in the default task view, active counts, Urgent count, or Focus Mode; they remain available in a separate Backlog/Deferred view. When the date arrives, the task becomes To Do. The date remains editable, and a task may be manually activated early. | Resolved |
| Backlog and activation behavior | Finalize the stored statuses and precise transition rules for undated wishlist tasks, never-started future tasks, previously started work, manual promotion, re-deferral, and reactivation. | In progress |
| Existing status mapping | Map every POS lifecycle state to a SentinelTask status or another explicit representation. | In progress |
| Status additions | Add and fully integrate the approved missing statuses, including Waiting, Deferred, Cancelled, and Backlog if retained as a stored status. | In progress |
| Assignment | Decide whether assignment is optional or required, whether new tasks default to the current user, and whether a task may have more than one assignee. | Open |
| Category and tag mapping | Map every POS category to Work or Personal and define normalized tags for narrower classifications. | In progress |
| Priority mapping | Map numeric POS priorities to SentinelTask's verbal priority levels without treating importance and urgency as synonyms. | In progress |
| Notes and history mapping | Import POS history into Task Diary and decide where synthesized current notes belong when they are not merely the latest history entry. | In progress |
| Parent/subtask import | Map legacy parent references to the Base44 record IDs created during import and verify the complete hierarchy. | In progress |
| Existing behavior preservation | Define regression checks for task creation/editing, nested subtasks, diary behavior, focus locking/timer, filters, counts, and Calendar display. | In progress |
| Legacy POS IDs | Decide whether old `T####` identifiers are retained as migration metadata for reconciliation and audit, without requiring them in the customer-facing interface. | In progress |
| Import validation | Define count, field, relationship, diary, status, and spot-check validation for the transformed import. | Open |
| Cutover | Define the freeze, backup, import, validation, rollback, and source-of-truth transition. | Open |

## Resolved behavior: Effective Date

- `effective_date` is nullable.
- An undated task may remain in Backlog indefinitely.
- A future-effective task is non-actionable and must not appear in the default task view, active summary counts, Urgent count, or Focus Mode.
- Future-effective and undated Backlog tasks remain viewable in a separate Backlog/Deferred view.
- When the effective date arrives, the task becomes To Do.
- The effective date can be changed before activation.
- A user may promote a task to To Do before its effective date. Early promotion clears `effective_date` and records the transition in the Task Diary.
- When a never-started task is moved to a future date, it belongs in Backlog.
- When a task on which meaningful work has begun is moved to a future date, it belongs in Deferred.
- Reactivation retains the complete Task Diary.
- The app must apply date comparisons using the user's configured timezone.
- Activation must not depend on a scheduled background workflow; the app can reconcile effective dates when task data is loaded.

## Existing SentinelTask behavior to preserve

- Task list and status grouping
- Add and edit task dialogs
- Nested subtasks and correct `parent_id` relationships
- Task Diary entries, timestamps, user attribution, and automatic status-change entries
- Focus locking and the Focus Mode task list
- Configurable 25/50/90-minute focus timer behavior
- Work and Personal filters
- Tags and verbal priority levels
- Summary counts
- Google Calendar panel

## Work deliberately deferred until after migration

These may be valuable but are not prerequisites for importing the POS:

- A dedicated Start Work action
- Restrictions on manually selecting In Progress
- Automatic status changes when a focus session starts or a substantive diary entry is added
- Automatic inference between Backlog and Deferred
- Derived parent-task status
- A separate Focus Session entity and focus analytics
- Autonomous reminders, escalations, or metaphorical “electric shocks”
- A synthesized current-summary field
- Additional task-list view modes
- Superagent orchestration and cross-app workflows

## Migration sequence

1. Resolve every migration-critical issue in the tracker.
2. Finalize and approve the Base44 builder prompt.
3. Record a baseline of existing SentinelTask records and behavior.
4. Submit the approved prompt and test the app changes against existing sample records.
5. Freeze POS task changes briefly and back up both `tasks.json` and SentinelTask data.
6. Transform `tasks.json` according to the approved mappings.
7. Import top-level tasks, retain the old-to-new ID map, then import child relationships and diary entries.
8. Run the approved validation checks.
9. Correct or roll back if validation fails.
10. Declare SentinelTask the task source of truth only after validation passes.

## Definition of migration readiness

The migration is ready to execute only when:

- every tracker row is Resolved;
- the builder prompt contains no unresolved placeholders;
- the prompt has been explicitly approved before submission;
- the transformation rules are deterministic;
- backup and rollback steps are documented; and
- validation criteria have been agreed in advance.
