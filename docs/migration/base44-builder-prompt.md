# SentinelTask Base44 Builder Prompt

> **DRAFT — DO NOT SEND TO BASE44**
>
> This prompt is being assembled incrementally. Bracketed `TBD` items are unresolved migration decisions. Submit it only after every placeholder is resolved and the exact final text is explicitly approved.

## Prompt

Extend the existing SentinelTask application to support the Personal Operating System concepts it genuinely lacks while preserving all confirmed working behavior. This is an in-place extension of the current application, not a redesign or rebuild.

### Preserve without regression

Preserve the current:

- task creation and editing;
- Work and Personal categories;
- verbal priority levels and tags;
- nested subtasks and correct parent-child relationships;
- Task Diary, including automatic timestamps, user attribution, and automatic entries for status changes;
- task locking and Focus Mode;
- 25-, 50-, and 90-minute focus timer behavior;
- main-screen filters, groupings, task counts, and Urgent count; and
- Google Calendar panel.

Do not alter or replace these behaviors except where a requirement below explicitly calls for a compatible extension.

### Add Effective Date

Add a nullable `effective_date` date field to tasks and expose it in both the New Task and Edit Task dialogs.

Apply the following behavior using the current user's configured timezone:

- A task with a future Effective Date is non-actionable.
- It must not appear in the default main task view, the To Do/Active/Urgent summary counts, or Focus Mode.
- It must remain viewable and editable in the dedicated Backlog/Deferred view described below.
- When its Effective Date arrives, it becomes To Do and appears in the ordinary actionable views and counts.
- The user may change the Effective Date while the task is non-actionable.
- The user may manually promote it to To Do before that date; early promotion must clear the Effective Date and record the transition in the Task Diary.
- An Effective Date is not required for an undated wishlist task in Backlog.
- Diary history must be preserved through deferral and reactivation.
- Do not require a scheduled background workflow for activation. Reconcile effective dates when the app loads or retrieves task data so the behavior remains available on the present Base44 plan.

### Extend the lifecycle

Integrate these approved statuses into every relevant part of the application: the schema, New Task and Edit Task dialogs, status grouping/filtering, summary behavior, colors/labels, diary status-change entries, and any other code that assumes the existing status enum.

- Existing: To Do, In Progress, Done, Blocked
- Add: Waiting, Deferred, Cancelled
- `[TBD: confirm whether Backlog is a stored status or a derived non-actionable state]`

Use these semantics:

- Waiting: `[TBD]`
- Blocked: `[TBD]`
- Deferred: meaningful work began, but the task was subsequently deprioritized or rescheduled.
- Cancelled: `[TBD]`
- Backlog: the task has never received meaningful work and is intentionally non-actionable, either indefinitely or until a future Effective Date.

Do not add automatic Start Work or diary-driven In Progress rules in this migration. Retain manual status changes unless another requirement in the final approved prompt explicitly changes them.

### Backlog/Deferred view

Add a separate view for non-actionable Backlog and Deferred tasks. It must:

- be reachable from the main task interface without mixing its tasks into the default actionable view;
- show undated Backlog tasks and future-effective Backlog/Deferred tasks;
- allow the Effective Date and other normal editable fields to be changed;
- allow manual promotion to To Do;
- preserve and expose each task's diary and hierarchy; and
- clearly distinguish Backlog from Deferred.

`[TBD: specify exact navigation label, grouping, counts, and treatment of overdue Effective Dates]`

### Assignment

`[TBD: add the final assignee requirements, including cardinality, defaults, unassigned behavior, permissions, and display.]`

### Migration support

Do not import the POS task records as part of this builder change. The records will be transformed and imported separately after the application change passes testing.

`[TBD: specify any temporary legacy-ID field or import-only metadata required for reconciliation.]`

### Acceptance criteria

Before considering the change complete, verify that:

1. Existing sample tasks still render and can be edited.
2. Existing parent/subtask nesting remains correct, including mixed child statuses.
3. Task Diary entries, timestamps, authors, and automatic status-change entries still work.
4. Focus locking, Focus Mode, and the timer still work for actionable tasks.
5. Future-effective and undated Backlog tasks are absent from actionable views, counts, and Focus Mode but present in the Backlog/Deferred view.
6. A task automatically becomes To Do when its Effective Date arrives in the user's configured timezone.
7. Manual early activation and editing the Effective Date work correctly.
8. Every added status is supported consistently throughout the interface and diary.
9. Work/Personal filters, tags, priority display, summary counts, and the Calendar panel have not regressed.
10. `[TBD: add assignment, legacy-ID, and final lifecycle acceptance tests.]`

When finished, summarize the schema changes, interface changes, transition rules, and the tests performed. Do not make unrelated design changes.
