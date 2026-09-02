# SentinelTask Migration Plan

Status: Ready for final review  
Decision record: [`ADR-9999-base44-migration-plan.md`](../architecture/adr/ADR-9999-base44-migration-plan.md)  
Implementation prompt: [`base44-builder-prompt.md`](base44-builder-prompt.md)

## Purpose

Migrate the current Personal Operating System task data and its migration-critical operating semantics into the existing SentinelTask Base44 application without replacing or regressing SentinelTask's working task-management behavior.

The migration is divided into two operations:

1. Extend and test the existing SentinelTask application through an explicitly approved Base44 builder prompt.
2. Transform and import `tasks.json` separately after the required schema and interface behavior is ready.

## Migration-critical issue tracker

| Issue | Resolution | Status |
| --- | --- | --- |
| Effective Date | Add nullable `effective_date`; exclude future-effective tasks from actionable competition; reconcile activation on data load; support editing and early activation. | Resolved |
| Backlog and activation behavior | Store Backlog and Deferred as distinct statuses; retain non-actionable tasks in an accessible filtered view; define date-driven and manual activation rules. | Resolved |
| Existing status mapping | Apply the deterministic POS-to-SentinelTask status mapping documented below. | Resolved |
| Status additions | Add and fully integrate Waiting, Deferred, Cancelled, and Backlog while preserving To Do, In Progress, Done, and Blocked. | Resolved |
| Assignment | Permit zero or one assignee, default new tasks to the current user, allow assignment to any authorized user, and diary-log assignment changes. | Resolved |
| Category and tag mapping | Map POS categories to Work or Personal and retain the narrower classification as a normalized tag. | Resolved |
| Priority mapping | Replace Urgent as a priority with Critical; map P0–P3 to Critical–Low and retain urgency as the `urgent` tag. | Resolved |
| Notes and history mapping | Add user-maintained `summary`; import POS `notes` verbatim; import POS `history` into Task Diary. | Resolved |
| Parent/subtask import | Import parents first, retain an old-to-new ID map, then assign child `parent_id` values and validate the hierarchy. | Resolved |
| Existing behavior preservation | Apply the regression criteria in the builder prompt and the validation checks below. | Resolved |
| Legacy POS IDs | Add optional, queryable `legacy_pos_id` migration metadata and omit it from ordinary task displays. | Resolved |
| Import validation | Reconcile record, field, relationship, diary, and UI results against a pre-import baseline. | Resolved |
| Cutover | Freeze writes, back up both systems, dry-run transformation, import, validate, and declare the new source of truth only after sign-off; otherwise roll back. | Resolved |

### Status definitions

- **Open**: No agreed resolution yet.
- **In progress**: The issue has been discussed or partially decided, but its complete migration rule or acceptance criteria remain unsettled.
- **Resolved**: The exact migration rule and acceptance criteria have been agreed and documented.

## Resolved behavior

### Effective Date

- `effective_date` is nullable.
- An undated task may remain in Backlog indefinitely.
- A future-effective task is non-actionable and must not appear in the default task view, actionable summary counts, Urgent count, or Focus Mode.
- Future-effective and undated Backlog or Deferred tasks remain accessible through the Later card and its filtered view.
- When the effective date arrives, the task becomes To Do.
- The effective date can be changed before activation.
- A user may promote a task to To Do before its effective date. Early promotion clears `effective_date` and records the transition in the Task Diary.
- Moving a never-started task to a future effective date places it in Backlog.
- Moving a task on which meaningful work has begun to a future effective date places it in Deferred.
- Reactivation retains the complete Task Diary.
- Date comparisons use the user's configured timezone, falling back to the browser timezone if no profile timezone exists.
- Activation does not depend on a scheduled background workflow. Effective dates are reconciled when task data is loaded or retrieved.

### Backlog and activation behavior

- Backlog and Deferred are stored statuses.
- **Backlog** means meaningful work has never begun and the task is intentionally non-actionable, either indefinitely or until a future Effective Date.
- **Deferred** means meaningful work began, but the task was subsequently deprioritized, paused, or rescheduled.
- Both statuses are excluded from the default actionable task view, actionable counts, and Focus Mode.
- Both remain viewable and editable through a filtered non-actionable-task view.
- Manual activation moves either status to To Do, clears `effective_date`, and creates a Task Diary entry.
- Date-driven activation moves an eligible task to To Do and creates a system-generated Task Diary entry.
- A future Effective Date may be changed without losing diary history.
- Automatic inference based on diary content and stronger transition enforcement are post-migration enhancements.

### Status mapping and semantics

| POS status | SentinelTask status | Meaning |
| --- | --- | --- |
| `not_started` with current or past Effective Date | To Do | Actionable and ready to begin; meaningful work has not started. |
| `not_started` with future Effective Date | Backlog | Not actionable until the Effective Date. |
| `backlog` | Backlog | Intentionally inactive; meaningful work has never begun. |
| `in_progress` | In Progress | Meaningful work has begun and the task is actively advancing. |
| `waiting` | Waiting | Progress is paused for expected input, action, or an event from another person or system. |
| `blocked` | Blocked | Progress is prevented by an unexpected or unplanned obstacle that must be resolved or worked around. |
| `deferred` | Deferred | Meaningful work began, but the task was deliberately paused, deprioritized, or rescheduled. |
| `completed` | Done | The intended outcome was completed. |
| `cancelled` | Cancelled | The task is no longer relevant or has been deliberately abandoned without completion. |

Waiting and Blocked are intentionally distinct: Waiting represents an expected dependency; Blocked represents an unplanned impediment.

### Assignment

- Each task may have zero or one assignee.
- New tasks default to the current user.
- Any authorized SentinelTask user may assign a task to themselves or another authorized user.
- Assignment may be removed.
- Assignment, reassignment, and removal generate automatic, attributed Task Diary entries.
- Collaborative work is represented by a parent task with one accountable assignee and one singly assigned subtask for each participant's contribution.
- The parent assignee is the single point of accountability for the overall outcome; subtask assignees are responsible for their individual contributions.
- The migration does not prevent a parent from being marked Done while children remain incomplete. Such enforcement is deferred as a possible hierarchy enhancement.

### Category and tag mapping

| POS category | SentinelTask category | Normalized tag |
| --- | --- | --- |
| Job search | Work | `job-search` |
| Professional advancement | Work | `professional-development` |
| Unemployment | Personal | `unemployment` |
| Errands | Personal | `errands` |
| Finances | Personal | `finances` |

Existing tags are retained, normalized to lowercase kebab-case, and de-duplicated.

### Priority mapping

| POS priority | SentinelTask priority |
| --- | --- |
| P0 | Critical |
| P1 | High |
| P2 | Medium |
| P3 | Low |
| Missing | Medium |

Critical replaces Urgent as the highest priority. Urgency remains independently expressible through the `urgent` tag.

For existing SentinelTask records, convert priority Urgent to Critical and add the `urgent` tag so neither meaning is lost. The existing Urgent summary count remains, but counts tasks carrying the `urgent` tag rather than tasks at the highest priority.

### Summary, description, and diary

- Add a nullable, user-maintained `summary` field and display it separately from Description.
- Import the POS `notes` value into Summary verbatim.
- New tasks may leave Summary empty; users may populate or edit it manually.
- Diary activity does not automatically overwrite Summary.
- Import each POS `history` entry into the Task Diary, preserving its timestamp and note.
- The existing Task Diary continues to record user entries, status transitions, and assignment transitions.
- Automatic or AI-assisted Summary synthesis is a post-migration enhancement.

### Parent/subtask import

- Import top-level tasks first.
- Record each `legacy_pos_id` and its new Base44 record ID.
- Import or update child tasks with the mapped Base44 `parent_id`.
- Preserve arbitrary nesting supported by SentinelTask.
- Reject or flag missing parents, orphaned children, duplicate legacy IDs, and relationship cycles.
- Verify mixed-status children remain nested beneath the correct parent.

### Legacy POS IDs

- Add nullable string field `legacy_pos_id`.
- Populate it only for migrated POS records.
- Do not expose it in ordinary task cards or task-entry forms.
- Keep it queryable for reconciliation, troubleshooting, and audit.
- New post-cutover tasks rely solely on Base44's internal record IDs.

## Dashboard treatment of non-actionable tasks

Add one visually subordinate **Later** card beside, rather than among, the primary summary cards.

- Show separate Backlog and Deferred counts within the card.
- Use smaller type and subdued styling so these tasks remain visible without competing with actionable work.
- Exclude both values from actionable totals.
- Make the card clickable; clicking it opens the existing task presentation filtered to Backlog and Deferred and grouped by those statuses.
- The migration does not require a more elaborate backlog-management interface, custom sorting, or additional analytics.

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

## Import validation

Before import, record baseline totals for POS tasks, top-level tasks, subtasks, statuses, categories, priorities, notes, and history entries. Export or otherwise back up all existing SentinelTask records.

Validate the transformed dataset before writing:

- every source task produces exactly one transformed task;
- every migrated record has a unique `legacy_pos_id`;
- every value conforms to the target schema and mapping tables;
- dates use the expected ISO formats;
- every owner maps to an authorized Base44 user or is explicitly left unassigned;
- every parent reference resolves without cycles; and
- every history entry has a valid timestamp and note.

After import, verify:

- exact total and per-status record counts;
- exact coverage and uniqueness of `legacy_pos_id`;
- top-level and child counts, parent relationships, and absence of orphans or cycles;
- mapped categories, tags, priorities, dates, assignees, summaries, and diary-entry counts;
- representative spot checks from every source status and category;
- mixed-status hierarchy display;
- Later-card counts and filtering;
- exclusion of Backlog, Deferred, and future-effective tasks from actionable views and Focus Mode; and
- all regression criteria in the builder prompt.

Any unexplained record loss, duplicate, broken relationship, diary loss, or schema rejection fails validation.

## Cutover and rollback

1. Complete and approve the builder prompt.
2. Record the SentinelTask behavioral and data baseline.
3. Apply the builder change and pass regression testing against the existing sample records.
4. Announce a short write freeze for both `tasks.json` and SentinelTask task data.
5. Back up the frozen `tasks.json` and export all pre-import SentinelTask records.
6. Run the transformation as a dry run and pass all pre-import validation.
7. Import top-level records, retain the legacy-to-Base44 ID map, then apply parent relationships and diary data.
8. Run all post-import validation and obtain explicit sign-off.
9. If validation fails, stop the cutover, remove records identifiable by the import's `legacy_pos_id` set or restore the pre-import export, and retain `tasks.json` as the source of truth.
10. If validation passes, declare SentinelTask the task source of truth and archive the frozen JSON snapshot as the migration record.

## Work deliberately deferred until after migration

- A dedicated Start Work action
- Restrictions on manually selecting In Progress
- Automatic status changes when a focus session starts or a substantive diary entry is added
- Automatic inference between Backlog and Deferred
- Parent-completion enforcement or other derived parent-task behavior
- A richer Backlog/Deferred management view, custom sorting, or analytics
- A separate Focus Session entity and focus analytics
- Autonomous reminders, escalations, or metaphorical “electric shocks”
- Automatic or AI-assisted Summary synthesis
- Additional task-list view modes
- Superagent orchestration and cross-app workflows

## Definition of migration readiness

The migration is ready to execute only when:

- the final builder prompt has been explicitly approved before submission;
- the Base44 application changes pass all regression criteria;
- the transformation rules produce a valid dry run;
- backups and rollback materials are available; and
- the validation criteria pass without unexplained exceptions.
