# Base44 Migration Plan discussion

## Confirmed gaps for the first prompt

At this point, the defensible list is:

- Add **Effective Date**.
- Treat “inactive” as derived from a future Effective Date, not necessarily as another stored status.
- Extend Status with:
  - Waiting
  - Deferred
  - Cancelled
- Preserve:
  - To Do
  - In Progress
  - Done
  - Blocked

- Add task assignment, probably through an `assignee_id` associated with a Base44 user.
- Ensure future-effective tasks do not appear among ordinary actionable tasks or compete for focus.
- Ensure new status changes continue generating automatic diary entries.

## Not migration gaps anymore

These should appear under “preserve,” not “change”:

- Parent/subtask relationships
- Arbitrary Base44 internal IDs
- Task Diary
- Automatic timestamping
- User attribution
- Automatic status-change entries
- Verbal priority levels
- Work/Personal categories
- Tags
- Focus locking and timer
- Calendar display

## Mapping decisions still needed

Before sending the prompt, we should settle a few matters.

### Assignment

We need to define:

- Whether every task must have an assignee
- Whether newly created tasks default to the current user
- Whether unassigned tasks are permitted
- Whether only one assignee is allowed

My provisional recommendation remains: one optional assignee, defaulting to the current user.

### Effective Date presentation

We need to tell Base44 where future-effective tasks go. My recommendation:

- Hide them from the default main task view and Focus Mode.
- Add an **Upcoming** view or collapsible section.
- Do not include them in To Do, Active, or Urgent counts until activation.
- Automatically surface them once their Effective Date arrives.

No background workflow is required for that basic behavior if the interface compares `effective_date` with the current date whenever it loads.

### New statuses and grouping

We should specify how the additional states appear:

- Waiting
- Blocked
- Deferred
- Cancelled

Otherwise Base44 may add them to the dropdown but neglect the summary cards, status sections, colors, filtering, and diary display.

### Existing numeric priorities

This is a **data-import mapping**, not an application-schema gap. We need to decide whether old P1 becomes High or Urgent. I continue to think blindly mapping every P1 to Urgent would exaggerate urgency.

### Existing categories

Likewise, the schema need not change if we accept Work/Personal plus tags. But we need an explicit import mapping from every old POS category to:

- Work or Personal
- One or more normalized tags

### Notes/history

The Task Diary now eliminates most uncertainty. We can import each old `history` entry into `log`.

The remaining question is what to do with the old `notes` field when it contains a current synthesis rather than merely duplicating the latest history entry. We could initially place it in `description`, but that may overwrite a genuine task description. This needs a mapping rule before import.

## The most efficient technical division

I would not ask Base44’s builder to import all task records in the same prompt.

Instead:

1. Use one carefully specified Base44 prompt to change the schema and interface.
1. Test the changed app with its existing records.
1. Transform `tasks.json` here according to the approved mappings.
1. Import the transformed records directly through the Base44 data connection.
1. Verify counts, relationships, fields, and diary entries.

That separates application development from data migration and avoids spending builder credits asking Base44 to reason through a large JSON payload. It also makes the import independently verifiable.

So yes: the updated list is the right foundation. The next step is to turn it into a prompt whose central message is:

> Extend the existing application to support the POS concepts it genuinely lacks, while preserving its now-confirmed task, hierarchy, diary, focus, and calendar behavior.

I would resolve the five mapping questions above before drafting the exact sendable version.
