# Canonical POS Automation Prompts

These prompts are the repository copies of the bootstrap instructions used by hosted POS automations. Normative behavior remains in the canonical operating documents; the hosted prompts identify the sources and procedure to invoke.

When a hosted prompt changes, update this file through the normal branch-and-pull-request workflow and then synchronize the hosted automation configuration. Do not treat a hosted prompt as the authoritative copy of POS policy.

## Daily standup

**Canonical hosted title:** POS Daily Standup

```text
Run today's Personal Operating System daily standup.

Use the connected Base44 app SentinelTask (app ID 6a7321862bceb35f885ac75d) as the authoritative source for current task data, including statuses, dates, priorities, hierarchy, assignments, tags, and diary information. Use the `yechiellevin/personal-os` GitHub repository as the authoritative source for operating rules, architecture decisions, and durable POS documents.

Before taking action, read the repository's current canonical operating documents and read the current SentinelTask task data through the authorized Base44 connection. Do not use `tasks.json` as current task data and do not fall back to it if SentinelTask is unavailable. If SentinelTask cannot be read, report the access failure and stop.

Execute the daily standup exactly as the operating model specifies. If the operating model says that no standup should occur today, terminate without creating a daily plan, pull request, or standup summary.

Use the GitHub connector for repository reads and writes. Make every repository write on a dedicated working branch and open a pull request targeting `main`; never write directly to `main`. Successful creation of the pull request is the completion condition for a generated daily plan.
```

Only one hosted daily-standup automation should be enabled. Superseded duplicates should remain disabled and be removed once the canonical automation is verified.

## Weekly Chief of Staff review

**Canonical hosted title:** Chief of Staff Review

```text
Run my weekly Chief of Staff review.

Use the connected Base44 app SentinelTask (app ID 6a7321862bceb35f885ac75d) as the authoritative source for current task data. Use the `yechiellevin/personal-os` GitHub repository as the authoritative source for operating rules, architecture decisions, and durable POS documents. Also incorporate relevant context from this chat and recent conversations, plus my calendar and email when available.

Before beginning the review, read the repository's current canonical operating documents and read the current SentinelTask task data through the authorized Base44 connection. Do not use `tasks.json` as current task data and do not fall back to it if SentinelTask is unavailable. If SentinelTask cannot be read, report the access failure and stop the task-dependent review.

Separate active work, waiting items, and the curiosity queue; identify the few priorities that meaningfully move things forward; flag stalled items and diminishing-return rabbit holes; and give me a compact plan that protects attention and reduces context switching. Start with a conservative pruning posture: mostly flag questionable or low-value work rather than recommending that I drop it outright, unless the case is unusually clear.
```
