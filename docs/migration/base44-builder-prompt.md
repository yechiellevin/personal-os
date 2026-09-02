# SentinelTask Base44 Builder Prompt

> **READY FOR FINAL REVIEW — DO NOT SEND TO BASE44 WITHOUT EXPLICIT APPROVAL**
>
> This prompt extends the existing application in place. It does not authorize importing the POS task data.

## Prompt

Extend the existing SentinelTask application to support the Personal Operating System concepts it lacks while preserving all confirmed working behavior. This is an in-place extension of the current application, not a redesign or rebuild.

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

### Extend the Task schema

Add these nullable fields:

- `effective_date`: date
- `summary`: string or rich text consistent with the existing Description field
- `assignee_id`: reference or identifier for one authorized Base44 user
- `legacy_pos_id`: string

Do not expose `legacy_pos_id` in ordinary task cards or task-entry forms, but keep it queryable for migration reconciliation and troubleshooting.

Replace the current priority enum with:

- Critical
- High
- Medium
- Low

Critical replaces Urgent as the highest priority. Preserve urgency independently as the normalized `urgent` tag.

For existing SentinelTask records whose priority is Urgent, change the priority to Critical and add the `urgent` tag. Preserve the existing Urgent summary card, but make it count tasks carrying the `urgent` tag rather than tasks at the highest priority.

Extend the status enum to:

- To Do
- In Progress
- Waiting
- Blocked
- Backlog
- Deferred
- Done
- Cancelled

Update every part of the application that assumes the existing status or priority enums, including New Task, Edit Task, grouping, filtering, labels, colors, counts, diary entries, and existing-record compatibility.

### Status semantics

- **To Do:** Actionable and ready to begin; meaningful work has not started.
- **In Progress:** Meaningful work has begun and the task is actively advancing.
- **Waiting:** Progress is paused for expected input, action, or an event from another person or system.
- **Blocked:** Progress is prevented by an unexpected or unplanned obstacle that must be resolved or worked around.
- **Backlog:** Meaningful work has never begun and the task is intentionally non-actionable, either indefinitely or until a future Effective Date.
- **Deferred:** Meaningful work began, but the task was deliberately paused, deprioritized, or rescheduled.
- **Done:** The intended outcome was completed.
- **Cancelled:** The task is no longer relevant or has been deliberately abandoned without completion.

Waiting and Blocked must remain distinct: Waiting represents an expected dependency; Blocked represents an unplanned impediment.

Do not add a Start Work action, automatic diary-based status inference, parent-completion enforcement, or other new transition restrictions in this migration. Retain manual status changes.

### Effective Date and activation

Expose Effective Date in both the New Task and Edit Task dialogs. It is optional.

Apply these rules using the user's configured timezone, or the browser timezone if no profile timezone exists:

- A task with a future Effective Date is non-actionable.
- A future-effective task on which meaningful work has never begun belongs in Backlog.
- A future-effective task on which meaningful work began belongs in Deferred.
- Backlog and Deferred tasks must not appear in the default task view, actionable summary counts, Urgent count, or Focus Mode.
- When the Effective Date arrives, reconcile the task to To Do when task data is loaded or retrieved. Do not require a scheduled background workflow.
- Date-driven activation must create a system-generated Task Diary entry.
- The user may change Effective Date without losing diary history.
- The user may manually activate a Backlog or Deferred task early. Manual activation moves it to To Do, clears `effective_date`, and creates an attributed Task Diary entry.
- Backlog may remain undated indefinitely.

### Later card and non-actionable view

Add one visually subordinate **Later** card beside, rather than among, the primary summary cards.

- Display separate Backlog and Deferred counts within the card.
- Use smaller type and subdued styling.
- Do not include either value in actionable totals.
- Make the entire card clickable.
- Clicking it must open the existing task presentation filtered to Backlog and Deferred and grouped by those statuses.
- In that filtered presentation, retain the ordinary task actions, including editing Effective Date, changing status, viewing the Task Diary, and inspecting subtasks.

Do not build a more elaborate backlog-management interface, custom sorting system, or backlog analytics in this change.

### Assignment and accountability

Each task may have zero or one assignee.

- New tasks default to the current user.
- Authorized users may assign a task to themselves or any other authorized SentinelTask user.
- Assignment may be removed, leaving the task unassigned.
- Expose assignment in New Task, Edit Task, and task display using the authorized-user list.
- Assignment, reassignment, and removal must generate automatic, attributed Task Diary entries.
- Continue showing the task creator separately where existing system metadata provides it; creator and assignee are not synonymous.

Collaborative outcomes use a parent task with one accountable assignee and singly assigned subtasks for individual contributions. Do not implement multiple assignees per task or prevent a parent from being marked Done while children remain incomplete in this migration.

### Summary and Task Diary

Expose Summary in New Task, Edit Task, and the task display, separately from Description.

- Summary is optional and user-maintained.
- New tasks may leave it empty.
- Diary entries must not automatically overwrite it.
- Do not add automatic or AI-assisted Summary synthesis in this change.
- Preserve existing Task Diary behavior for manual entries, timestamps, user attribution, and status-change entries.
- Extend the same diary behavior to assignment, reassignment, removal, manual activation, and date-driven activation.

### Preserve and harden subtask behavior

Preserve arbitrary nesting and the existing parent-based display, including children whose statuses differ from their parent's status.

Verify that:

- Add Task and Add Subtask open with empty values rather than retaining values from the previous invocation;
- Add Subtask identifies the correct parent;
- a newly created child receives the correct `parent_id`;
- mixed-status children remain displayed beneath their parent; and
- existing parent-child relationships remain unchanged.

### Existing records and migration support

Do not import POS task records as part of this builder change. They will be transformed and imported separately after this application change passes testing.

- Preserve all existing SentinelTask records and diary entries.
- Keep `legacy_pos_id` optional and hidden from ordinary UI.
- New tasks created after cutover do not require `legacy_pos_id`.
- Ensure the schema and interface can accept the category, tag, priority, status, assignment, Summary, diary, Effective Date, and parent mappings described above.

### Acceptance criteria

Before considering the change complete, verify that:

1. Existing sample tasks still render and can be edited without data loss.
2. Existing parent/subtask nesting remains correct, including mixed child statuses.
3. Add Task and Add Subtask open cleanly, show the correct parent context, and save the correct `parent_id`.
4. Existing Task Diary entries, timestamps, authors, and automatic status-change entries remain intact.
5. Assignment, reassignment, removal, manual activation, and date-driven activation create correct diary entries.
6. Focus locking, Focus Mode, and the timer still work for actionable tasks.
7. Backlog, Deferred, and future-effective tasks are absent from actionable views, counts, and Focus Mode.
8. The Later card shows separate accurate Backlog and Deferred counts, remains visually subordinate, and opens the correct filtered view.
9. An eligible task becomes To Do when task data is loaded on or after its Effective Date in the user's applicable timezone.
10. Manual early activation and editing Effective Date work correctly without losing diary history.
11. Every added status and priority is supported consistently throughout the schema, interface, filtering, counts, and diary.
12. New tasks default assignment to the current user; authorized-user reassignment and unassignment work.
13. Summary can be created, displayed, edited, and left empty without being overwritten by diary activity.
14. `legacy_pos_id` is queryable but absent from ordinary task displays and forms.
15. Work/Personal filters, normalized tags, task grouping, summary counts, and the Calendar panel have not regressed.

When finished, summarize the schema changes, interface changes, transition rules, data-preservation measures, and tests performed. Do not import POS data or make unrelated design changes.
