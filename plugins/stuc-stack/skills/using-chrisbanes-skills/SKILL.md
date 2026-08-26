---
name: using-chrisbanes-skills
description: >-
  Fail-closed overlay that routes Kotlin and Jetpack Compose design to
  chrisbanes/skills cluster names installed by `npx skills add chrisbanes/skills`.
  Use when editing Compose state, effects, performance, components, animations,
  focus, tests, Flow/coroutines, control flow, API/types, or Gradle runs.
  Stops if those upstream skills are not installed.
---

# Using chrisbanes skills

This file is **not** a second Compose treatise. Follow the **installed** chrisbanes cluster skills. Do not copy those bodies into this plugin. Do not ignore cluster names. (P29)

A fresh `npx skills add chrisbanes/skills` installs HEAD names such as `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, and `gradle-run`. Load those. If the installed chrisbanes `using-chrisbanes-skills` also resolves, follow that router too.

Removed pre-cluster entrypoints (`compose-state-authoring`, `compose-state-hoisting`, `compose-side-effects`, `compose-recomposition-performance`, `compose-stability-diagnostics`, `compose-state-deferred-reads`, `compose-modifier-and-layout-style`, `compose-slot-api-pattern`, `kotlin-coroutines-structured-concurrency`, `kotlin-flow-state-event-modeling`, `kotlin-types-value-class`, `kotlin-multiplatform-expect-actual`) are **not** what a new install provides. Do not wait for them.

## Fail closed

Before advising or editing, confirm the needed **cluster name** resolves as an installed skill (agent skill dirs, not this plugin tree). Probe `compose-state-and-effects` (or the named cluster for this task). If it does not:

1. Stop.
2. Tell the user to install:

```
npx skills add chrisbanes/skills
```

Claude Code: `/plugin marketplace add chrisbanes/skills` then `/plugin install chrisbanes-skills@chrisbanes-skills`.

Codex:

```
codex plugin marketplace add chrisbanes/skills --ref main
codex plugin add chrisbanes-skills@chrisbanes-skills
```

Do not invent Compose/Kotlin design advice to paper over the missing skill. Do not vendor a copy.

## Routing (chrisbanes HEAD clusters)

1. Read the task and the Kotlin/Compose source that makes the concern concrete.
2. If one cluster clearly matches, load that installed skill and stop routing.
3. Before a Compose skill, point at a Compose API, a composable, or an explicit request to create Compose. A hypothetical UI consumer is not evidence.
4. Match signals to the table. Load the smallest set. Combine only when separate concerns affect the same change.

| Task signal | Load (installed chrisbanes name) |
|---|---|
| Local or hoisted UI state, screen state holders, effect APIs, snackbar, navigation effects, analytics, focus requests, event Flow in composition | `compose-state-and-effects` |
| Recomposition, jank, compiler reports, skippability, unstable parameters, frame-rate State reads, `@ReadOnlyComposable` | `compose-performance` |
| Modifier parameters, root layout, slots, boolean shape flags, primitive content params | `compose-component-design` |
| Visibility, value targets, content swaps, motion API choice | `compose-animations` |
| Keyboard, TV, D-pad, `FocusRequester`, initial focus | `compose-focus-navigation` |
| Choosing Compose test shape (semantics, screenshot, interaction) | `compose-ui-testing-patterns` |
| Coroutine scopes, `init { launch }`, cancellation, `runBlocking`, `StateFlow` / `SharedFlow` / `Channel` / `stateIn` / one-shot events | `kotlin-concurrency-and-flow` |
| `when` shape, guard conditions, sealed exhaustiveness, smart casts | `kotlin-control-flow` |
| Function placement, value classes, domain types, KMP expect/actual vs interfaces | `kotlin-api-design` |
| Agent-initiated Gradle assemble, check, or compact Gradle diagnostics | `gradle-run` |

`kotlin-control-flow` and `gradle-run` are chrisbanes skills on HEAD. This plugin does not ship their procedures.

## Stuc overlays (do not replace the clusters)

Apply after the upstream skill is loaded, not instead of it.

- Reuse existing design-system composables and modifiers. Search before reimplementing. (P9)
- Keyboard, IME, and focus are product acceptance, not polish. Load `compose-focus-navigation` when that is the work. (P14)
- Nested routes get a ViewModel per back-stack entry. Do not reuse one VM across subroutes. (P11)
- Copy the last similar screen. Do not invent a new Compose architecture per screen. (P8)

Google product workflows (AGP, Nav3, edge-to-edge, R8, Play) are `using-android-skills`, not this router.

Device proof is `android-verify`, not a Compose treatise.
