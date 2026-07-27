# Curiosity Queue

## Investigate existing AI Chief of Staff / Executive Assistant GPTs

Reason: Determine whether existing solutions contain ideas worth
adopting or whether the current system fills a genuine gap.

Status: Deferred

Review: During a future weekly planning session when operational
workflow has stabilized.

## Application Project: Personal Operating System Front End

### Idea

Explore replacing or supplementing the Excel workbook with a purpose-built
front end for the Personal Operating System. Preserve the existing operating
model—especially the Effective Date gate, State and Priority semantics,
immutable task IDs, comments, and Situation Report logic—rather than allowing
a platform's default concepts to redefine it.

The Excel workbook can remain the daily operational cockpit during exploration
and serve as the reference implementation against which alternatives are
tested.

### Candidate approaches

- Configure a work-management platform with native AI, particularly ClickUp
  with ClickUp Brain.
- Build a custom single-user application using an AI app builder, initially
  comparing Lovable and Base44.
- Explore other development environments as appropriate, including Cursor,
  Windsurf, Replit, and Bolt.new.
- Consider whether ChatGPT/Codex, Claude, another model, or a model-agnostic
  architecture should provide the Chief of Staff layer.
- Compare a single-model assistant with specialist agents or an orchestrated
  workflow.

### Findings from the ClickUp Brain review

- ClickUp Brain appears legitimate and potentially useful, chiefly because it
  can retrieve and act on ClickUp workspace context. Its value is not a
  uniquely superior underlying model.
- Brain MAX is best understood as a multi-model work interface. It exposes
  leading OpenAI, Anthropic, and Google models, but is not equivalent to full
  independent subscriptions to all of them. Manual model selection is clearer
  in the documentation than claims of consistently optimal automatic routing.
- "Free forever" refers mainly to the application shell and small lifetime
  trial allowances. Meaningful continuing AI use requires paid ClickUp and AI
  capacity.
- Brain can help create and maintain a structured workspace: tasks, fields,
  views, summaries, consistency checks, and agent workflows. It is more
  promising at implementing and enforcing an explicitly defined operating
  model than at inventing the correct model.
- Brain's reliability remains dependent on complete, current, well-structured
  workspace data. Retrieval grounded in incomplete or ambiguous data can still
  produce a polished but wrong answer.
- Use graduated trust: retrieval and drafting may be low-risk; priority
  judgments require verification; changes to authoritative task fields should
  require approval until proven reliable.

### Custom-application alternative

A custom application carries moderately higher overhead if scoped as a
purpose-built replacement for the workbook, but substantially higher overhead
if expected to reproduce ClickUp plus Brain, including contextual search,
agents, integrations, permissions, and polished automation.

The custom approach has important advantages:

- POS concepts can be first-class application rules rather than custom fields
  interpreted through another platform's vocabulary.
- Deterministic queries can select the correct operational task set before an
  LLM interprets or presents it.
- State transitions and task IDs can be validated.
- AI changes can be proposed separately from committed changes and recorded in
  an audit history.
- Data and code can remain portable if the platform provides Git-backed source
  and exportable storage.

Base44 may be useful for the fastest initial prototype because it hides more of
the stack. Lovable is the stronger initial candidate for a durable experiment
because Git synchronization and portability provide an escape route when
prompt-based repairs are insufficient.

The verification burden is unusually compatible with the user's strengths:
challenging assumptions, detecting plausible but unfaithful output, identifying
ambiguity, testing boundary conditions, and refining behavior against a written
specification. The remaining caveat is that diagnosing a defect and repairing
the implementation are distinct capabilities.

### Proposed experiment

Conduct a small bake-off rather than selecting a platform from marketing
claims:

1. Define a minimal POS v1 schema and acceptance tests.
2. Select approximately ten representative tasks, including difficult
   Effective Date, State, ambiguity, and history cases.
3. Implement the same miniature system in ClickUp and one custom builder,
   initially Lovable.
4. Test conversational task creation, ambiguous updates, Situation Reports,
   explanations of task inclusion/exclusion, and complete change history.
5. Score correctness, completeness, source traceability, friction, data
   integrity, and repairability.
6. Specifically test whether the AI asks for clarification or confidently
   invents behavior when the source material is ambiguous.

Status: Exploratory; related operational task: T0020 — Brainstorm on POS/COS app
development.

Review: After the current operating model and workbook have accumulated enough
real use to provide representative test cases.
