# ADR-0002: Repository changes use branches and pull requests

- **Date:** 2026-08-05
- **Status:** Proposed

## Context

The POS repository is becoming the system of record for operational data and governing documents. The connected GitHub integration can act with the user's repository permissions and may be technically capable of writing directly to the default branch, including through the GitHub Contents API.

A process convention alone is not a sufficient control for protecting canonical state.

## Decision

All changes to the POS repository MUST be made on a non-default branch and submitted through a pull request targeting `main`.

Direct writes to `main` are prohibited.

Exceptions require an explicit decision by the repository owner and are treated as emergency administrative actions outside the normal operating workflow.

Repository protection should enforce the pull-request requirement for all actors that can write to the repository, including administrators and connected applications where GitHub permits that control.

Required approval counts are not part of this decision. A pull request may be reviewable and mergeable by the repository owner without a separate approving identity.

## Consequences

- AI-generated changes remain reviewable before becoming canonical.
- Each accepted change has a discrete audit trail and rollback point.
- Branch protection and ruleset configuration become security controls, not merely workflow preferences.
- Connector operations that target `main` directly should fail unless an explicitly configured emergency bypass applies.
- Small changes may create some additional repository overhead; PR granularity should remain proportional to the significance of the change.
