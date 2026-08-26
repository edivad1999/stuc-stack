---
name: kotlin-best-practices
description: >-
  Opinionated Kotlin type and API discipline for this stack. Use when editing
  .kt/.kts types, signatures, Flow/StateFlow, coroutines, KMP boundaries, or
  JSON/codegen. Loads chrisbanes Kotlin leaves by name; does not replace them.
---

# Kotlin best practices

Syntax and coroutine/Flow/value-class rules live in **chrisbanes/skills**. This file adds opinionated overlays and fail-closed routing. Do not duplicate those leaves.

If a named chrisbanes skill does not resolve, stop and print `npx skills add chrisbanes/skills`. (P29)

## Load upstream (required)

| Concern | Skill |
|---|---|
| Types, signatures, illegal states, exhaustive `when` at the type level | `principle-type-system-discipline` then `kotlin-types-value-class` |
| `when` shape / guard conditions / smart casts | `kotlin-control-flow` (this plugin) |
| State vs events, `stateIn`, one-shot delivery | `kotlin-flow-state-event-modeling` |
| Scope ownership, cancellation, `runBlocking` | `kotlin-coroutines-structured-concurrency` |
| expect/actual vs interfaces | `kotlin-multiplatform-expect-actual` |

Compose UI state/effects/slots: `using-chrisbanes-skills`, not this file.

## Overlays (evidence-backed)

**Simplest change that fits the existing architecture.** Extra layers need demonstrated duplication, not a hypothetical future. (P1)

**App/UI modules never import data-layer DTOs or entities.** Domain models and interfaces on the app-facing side; data maps and implements repositories. Do not add new app→data model imports. (P2)

**KMP.** When migrating, share data/domain. Keep resources native unless the user says otherwise. Do not assume shared Compose UI. Close with a real Android assemble. Load `kotlin-multiplatform-expect-actual`. (P5)

**LiveData → StateFlow** when touching a screen that still uses LiveData, including result wrappers if the project has them. Load `kotlin-flow-state-event-modeling`. (P10)

**Nested routes:** new ViewModel instance per back-stack entry. (P11)

**Handler names describe the next action**, not the past event. (P22)

**Boolean behavior changes** are named parameters with safe defaults (off) unless the user specifies otherwise. (P25)

**One JSON stack.** Do not add a second serializer beside the house stack. For new Kotlin JSON, kotlinx.serialization is the default destination. Shared serializers live in the module that already owns them. (decision 2026-03-04; P21)

**Codegen.** If the repo already has a codegen DSL, new generated code uses it. Do not mass-rewrite existing call sites in the same change. (P24)

**Generated sources** (i18n/keys/copies): accept conflict, regen via Gradle, then the project’s format/lint. Do not hand-merge generated files. (P23)

**Environment flags are product boundaries.** Do not apply a change across environments the project treats as separate. (P32)
