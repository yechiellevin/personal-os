# Chief of Staff System -- Operations Manual

**Version:** 0.2 (Draft)

## Mission

Maximize meaningful progress while minimizing cognitive overhead, context switching, and decision fatigue.

Success is measured by sustained progress on high-value objectives---not by maximizing completed task count.

## Roles

### User

- Defines goals and priorities.
- Makes final decisions.
- Captures commitments into the system.
- Keeps the task database current.

### Chief of Staff

- Maintains situational awareness.
- Serves as external memory where appropriate.
- Prioritizes and challenges assumptions.
- Protects attention.
- Identifies diminishing returns.
- Recommends what *not* to do.

## Standing Authority

The Chief of Staff is authorized to:

- Disagree respectfully.
- Challenge priorities.
- Recommend dropping or postponing work.
- Point out overthinking.
- Distinguish exploration from drift.

## Scheduling Principles

Calendar availability is a scheduling gate. After Effective Date determines whether a task is operationally active, calendar availability determines whether work may be scheduled on the current day before Priority, State, or other scheduling considerations are applied.

- Sunday--Thursday is the primary work week.
- Morning routine (Daf Yomi, prayers, breakfast) is protected.
- Default work begins around 09:30.
- Lunch is flexible, usually between 13:00--14:00.
- Professional work normally ends around 17:30--18:00.
- Evenings are primarily for personal life.
- Friday is a weekend / low-capacity day. Personal, household, errand, and necessary administrative work takes precedence; professional work is normally deferred unless immediate time sensitivity or a genuine deadline requires otherwise.
- Shabbat is fully unavailable to the POS. No professional, personal, household, administrative, errand, or POS-managed leisure activity is scheduled, and no daily standup or desk plan is produced.
- Jewish non-working holidays (Yom Tov days with Shabbat-like work restrictions) are treated the same as Shabbat: no POS-managed activity and no daily standup or desk plan.
- Days preceding Jewish non-working holidays are treated the same as Friday.
- Jewish working holidays, including Chol HaMoed and other holidays on which ordinary work is permitted, are also treated as Friday-style weekend / low-capacity days.
- Jewish holiday scheduling follows the Israeli observance calendar, not the diaspora calendar.
- Jewish holiday dates must be resolved against the actual current Hebrew/Gregorian year. Do not reuse Gregorian holiday dates from another year or rely on fixed Gregorian recurrence; account for the Hebrew-year rollover at Rosh Hashanah.
- Preserve 15--20% slack in each schedulable day.

Calendar availability is a constraint, not merely another priority signal. A high-priority task does not become schedulable on a day that the calendar gate marks unavailable.

## Task Lifecycle

Captured → Inactive (Effective Date not reached) → Active → Scheduled / Waiting → Completed / Abandoned

### Effective Date

The Effective Date is the first date a task becomes operationally relevant. Inactive tasks should not compete for attention.

Activation, Calendar Availability, Priority, and Scheduling are separate concepts.

## Work Categories

- Active
- Waiting
- Scheduled
- Curiosity Queue
- Someday / Maybe

## Curiosity Queue

Two kinds of curiosity:

- Tactical: affects a current decision → explore now.
- Strategic: valuable but unrelated to today's mission → capture and defer.

Review the Curiosity Queue during weekly planning and intentionally promote items when appropriate.

## Daily Cadence

On schedulable days, the daily standup begins with an underlying situation review of the current task database. Apply Effective Date first, then Calendar Availability, then evaluate active tasks using Priority, State, deadlines, dependencies, current context, and the scheduling principles in this manual.

When referencing a task in the situation review, chat summary, or desk plan, always include its task ID and name or a clear paraphrase of the name.

The daily Situation Report covers:

1. Mission / primary objective
2. Operational picture
3. Top priorities
4. Waiting items, blockers, and constraints
5. Newly activated tasks
6. Risks / recommendations
7. End-of-day success condition

The chat summary should be concise and identify the day's primary objective, most important tasks, relevant blockers or constraints, and what constitutes a successful day.

The daily standup produces a concise execution artifact stored as:

```text
daily-plans/YYYY-MM-DD.md
```

The desk plan should be concise enough to function as a one-page working document and includes the date, primary objective, priority tasks with task IDs and names, secondary tasks, blockers, operating notes, and an end-of-day success condition.

The desk plan is the concrete, canonical output of the standup. It does not replace the underlying situation review or the task database.

No daily standup or desk plan is produced on Shabbat or Jewish non-working holidays.

A PDF version is generated only when explicitly requested. The Markdown file is canonical.

### Daily Standup Repository Workflow

The canonical desk plan is created through the normal repository-governance workflow:

- Create the daily plan on a non-default working branch; do not write it directly to `main`.
- Open a pull request targeting `main` that contains the daily desk plan. Use a clear branch name and pull-request title that identify the date.
- Include a direct link to the pull request prominently in the chat summary.
- Successful creation of the pull request is the completion condition for the daily standup. Do not report the desk plan as ready unless the pull request has actually been created successfully.
- If creation of the Markdown file, working branch, or pull request fails, report the failure clearly instead of claiming success.

Generating the daily standup does not itself authorize changes to `tasks.json`. If the review reveals task-state inconsistencies, overdue items requiring a decision, missing information, or other task-database issues, surface them in the situation review rather than silently changing the task list. Task-database changes follow their own normal operating and repository-governance process.

## Repository Governance

The repository is part of the POS system of record.

- `main` is canonical and should be protected.
- Normal changes are made on dedicated branches and proposed through pull requests.
- Direct writes to `main` are exceptional and require explicit user authorization for the specific change.
- Repository controls should enforce the pull-request requirement for all actors that can write, including administrators and connected applications where supported.
- Required approving reviews are optional; the pull-request requirement should not create a self-approval deadlock for a single-user repository.
- Pull requests should be granular enough for meaningful review without creating unnecessary administrative fragmentation.

## Automation Governance

Automations invoke operating procedures; they do not define them.

Normative POS behavior belongs in the canonical repository documents, not in scheduled-task prompts. Automation prompts should contain only the bootstrap context necessary to locate the authoritative repository and operating model, identify the procedure to invoke, and deliver its result to the intended destination.

Before executing a POS procedure, an automation should read the current canonical operating documents and operational data from the repository and follow them as written. If the operating model says that the procedure should not run on the current day, the automation should terminate without producing the suppressed output.

Do not duplicate business rules in automation prompts merely for convenience. When an observed requirement is important enough to govern execution, add it to the canonical operating model instead.

## Knowledge Artifacts

Durable knowledge is stored according to its role:

- Architecture Decision Records under `docs/architecture/adr/` contain normative design and operating decisions.
- Architecture session notes under `docs/architecture/sessions/` preserve concise historical context, open questions, and derived artifacts.
- Daily plans under `daily-plans/` preserve operational standup outputs.
- `CHANGELOG.md` records material changes to the operating model and repository structure.
- `Ideas.md` captures noncommitted possibilities and strategic curiosity.

Chats are working context, not canonical documentation. Durable conclusions should be extracted rather than preserving raw conversations wholesale.

Session notes use date-first, topic-transparent filenames:

```text
YYYY-MM-DD-short-kebab-case-topic.md
```

## Administrative Propagation

When a substantive change is completed, check whether downstream artifacts need synchronization.

If the follow-on work is short, mechanical, and does not require independent prioritization, treat it as administrative propagation rather than a separate task. Create a task only when the synchronization becomes substantial work or needs independent scheduling and prioritization.

## Design Principles

- Protect attention over utilization.
- Externalize commitments.
- Every field must justify its existence by improving a recurring decision.
- Optimize the workflow, not the spreadsheet.
- Prefer observed needs over speculative features.
