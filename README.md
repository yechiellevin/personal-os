# Personal Operating System

A lightweight Chief of Staff system designed to maximize meaningful progress while minimizing cognitive overhead, context switching, and decision fatigue.

The system combines governing documents, a structured task database, daily execution artifacts, and architecture records. Its purpose is not to maximize completed task count, but to support sustained progress on high-value objectives while protecting attention and preserving room for curiosity.

## Repository contents

| Path | Role |
| --- | --- |
| `Operations-Manual-v0.2.md` | The constitution: defines the system's mission, roles, authority, task lifecycle, scheduling principles, operating cadence, and repository governance. |
| `Chief-of-Staff-Brief.md` | Behavioral guidance: defines how the AI Chief of Staff should reason, communicate, challenge assumptions, and protect attention. |
| `Principles.md` | Design philosophy: the concise principles against which workflow and tooling decisions are evaluated. |
| `tasks.json` | Operational database: the current source of truth for tasks, activation dates, priorities, states, scheduling, and completion. |
| `daily-plans/` | Daily standup artifacts: concise execution plans named `YYYY-MM-DD.md`. |
| `docs/architecture/adr/` | Architecture Decision Records: normative decisions about how the POS is designed and operated. |
| `docs/architecture/sessions/` | Architecture session notes: concise historical context, open questions, and derived artifacts. |
| `CHANGELOG.md` | Version history: records additions, changes, and intentionally deferred work. |
| `Ideas.md` | Institutional memory for strategic curiosity and possible future improvements. |

When the files overlap, interpret them in this order: the Operations Manual governs; the Chief of Staff Brief guides behavior; the Principles guide design; `tasks.json` represents current operational reality; accepted ADRs govern the decisions within their scope; and the Changelog, session notes, and Ideas file provide supporting context.

## Core operating model

### Roles

The user defines goals and makes final decisions. The Chief of Staff maintains situational awareness, reduces cognitive overhead, challenges assumptions, protects attention, and recommends what not to do.

The system supports decision-making; it does not delegate decisions away from the user.

### Task activation

Effective Date is the first scheduling gate.

- Before its Effective Date, a task is inactive and should be ignored.
- Once its Effective Date is reached, the task becomes operationally eligible.
- Only then is it evaluated according to Priority and State.

Activation, Priority, and Scheduling are separate concepts.

### Task lifecycle

`Captured → Inactive → Active → Scheduled / Waiting → Completed / Abandoned`

### Curiosity

The system distinguishes between:

- **Tactical curiosity:** affects a current decision and should be explored now.
- **Strategic curiosity:** may be valuable but does not serve the current mission; capture it and defer it for deliberate review.

### Daily cadence

The default Situation Report covers:

1. Mission
2. Operational picture
3. Top priorities
4. Waiting items
5. Newly activated tasks
6. Risks and recommendations

The concrete output of the daily standup is stored under `daily-plans/YYYY-MM-DD.md`. It is an execution view, not a replacement for the underlying situation review or `tasks.json`.

## Design philosophy

- Protect attention before maximizing utilization.
- Externalize commitments.
- Prefer deep work over fragmented work.
- Reduce repeated decision-making.
- Preserve curiosity without allowing drift.
- Add fields or features only when they improve a recurring decision.
- Optimize the workflow, not the tools.
- Ship before perfecting.

## Repository workflow

- Treat `main` as protected and canonical.
- Make normal changes on dedicated branches and propose them through pull requests.
- Use direct writes to `main` only when explicitly authorized for a specific exceptional change.
- Keep pull requests small enough to review coherently, but do not create administrative fragmentation without review value.
- Record durable architecture decisions as ADRs and distill useful discussion history into dated, topic-named session notes.

## Working with the system

1. Capture commitments in `tasks.json`.
2. Assign each task a unique task ID and an Effective Date.
3. Ignore tasks whose Effective Date has not arrived.
4. Evaluate active tasks by Priority and State.
5. Use a small number of active priorities to shape the day.
6. Review waiting items, newly activated tasks, and the Curiosity Queue during the appropriate planning cadence.
7. Store the daily execution view in `daily-plans/YYYY-MM-DD.md`.
8. Record material operating-model changes in the Changelog and relevant architecture decisions in ADRs.
9. Ask whether completed work requires short, mechanical downstream synchronization; treat that as administrative propagation rather than a separate task unless it needs independent prioritization.

## Status

**Version:** 0.2 (Draft)

The system is intentionally evolving from observed use. Automation and additional fields should be introduced only when recurring friction demonstrates a real need.
