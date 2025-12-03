# Command: /speckit.plan

Purpose: Describe the workflow for generating an implementation plan from a feature spec and enforce the "Constitution Check" gate referenced in `plan-template.md`.

## Overview

- Input: feature name and spec located under `specs/[###-feature-name]/spec.md`.
- Output: `specs/[###-feature-name]/plan.md` (populated from `.specify/templates/plan-template.md`).

## Constitution Check (required)

- Before producing a final `plan.md`, the command MUST validate the repository constitution located at `.specify/memory/constitution.md`.
- The check MUST verify:
  - The constitution file exists and parses as Markdown.
  - Required top-level sections (Core Principles, Constraints & Requirements, Development Workflow, Governance) are present.
  - No unresolved `TODO(...)` placeholders remain that would block the plan (report any deferred items).
- If the check fails, the command MUST abort generation and print a clear list of issues.

## Execution

- Intended to be run by a maintainer or CI job that has access to the repo files.
- Example (local):

```bash
# From repository root
# 1) Ensure spec is present: specs/###-feature-name/spec.md
# 2) Run the plan generator (implementation may vary):
#    ./scripts/generate-plan.sh ###-feature-name
```

## CI recommendations

- Add a lightweight script that performs the constitution check and plan generation as part of a validation job.
- Keep this command implementation-agnostic: the template explains expectations; projects may implement the generator in Node/Python/Makefile as desired.

## Notes

- This file is a project-level guidance stub to satisfy the template reference. Implementers should replace this stub with a runnable command script or CI job as needed.
