# Session Note: GitHub workflow and daily plans

- **Date:** 2026-08-05
- **Topic:** Persistent daily plans, GitHub workflow, and conversation archiving

## Background

A daily situation review produced a one-page PDF desk plan. The temporary ChatGPT download later failed, prompting a discussion of how daily standup outputs should be preserved outside the chat environment.

The discussion then exposed a repository-governance issue: the connected GitHub integration successfully created a file directly on `main` even though the repository had a branch protection rule requiring pull requests.

## Questions explored

- Do generated ChatGPT file downloads expire?
- Should daily desk plans be stored as PDFs or Markdown?
- Where should daily plans live in the POS repository?
- Why did a direct GitHub Contents API write to `main` succeed despite the pull-request rule?
- How should durable knowledge from this conversation be preserved?
- Should this small operational thread remain a separate conversation?

## Observations

- ChatGPT-generated sandbox download links are temporary and are unsuitable as permanent records.
- GitHub renders Markdown natively, making Markdown preferable to PDF as the canonical daily-plan format.
- The GitHub connector created `daily-plans/2026-08-05.md` directly on `main`.
- The visible branch-protection settings showed that pull requests were required but approving reviews were not.
- The exact enforcement path was not conclusively tested during the session. An administrator or application bypass was discussed as the likely explanation, but this remained to be verified against the repository's complete protection or ruleset configuration.
- The thread had drifted between POS operations and POS architecture. The older operational conversation remains the appropriate home for daily standups; architecture and integration decisions belong in repository documentation.

## Decisions reached

- Store the canonical daily desk plan as `daily-plans/YYYY-MM-DD.md`.
- Treat PDF output as optional and derived, primarily for printing.
- Treat `main` as protected by both operating policy and repository controls.
- Use branches and pull requests for normal repository changes, even when the connector technically permits a direct write.
- Extract normative decisions into ADRs.
- Distill remaining useful context into session notes rather than preserving raw chats wholesale.
- Name session notes with the date first and a transparent topic suffix: `YYYY-MM-DD-short-kebab-case-topic.md`.

## ADRs proposed

- `ADR-0001-daily-desk-plans.md`
- `ADR-0002-repository-change-workflow.md`
- `ADR-0003-knowledge-artifact-classification.md`

## Derived artifacts

### Created during the session

- `daily-plans/2026-08-05.md`

### Proposed as follow-up

- `docs/architecture/adr/ADR-0001-daily-desk-plans.md`
- `docs/architecture/adr/ADR-0002-repository-change-workflow.md`
- `docs/architecture/adr/ADR-0003-knowledge-artifact-classification.md`
- This session note
- README, operating-model, and changelog updates documenting the new artifact classes and repository workflow

## Open questions

- Which exact branch-protection or ruleset setting allowed the connector's direct write to `main`?
- Will enforcing the rule for administrators and bypass-capable actors block direct connector writes while still allowing owner-merged pull requests without formal approval?

## Follow-up actions

- Review and accept, revise, or reject the proposed ADRs.
- Update repository documentation after the ADRs are accepted.
- Test branch-protection enforcement with a harmless direct-write attempt after configuration is adjusted.
