---
name: stuc-chrisbanes
description: >-
  Fail-closed stuc glue for chrisbanes/skills. Requires `npx skills add
  chrisbanes/skills`. Use on Android/Kotlin Compose and Kotlin design work in
  this stack. Cluster routing belongs to the installed chrisbanes skill
  `using-chrisbanes-skills`, not this file.
---

# Stuc chrisbanes glue

This file is **not** a Compose treatise and **not** a second router. Leaf and cluster routing belongs to the **installed** chrisbanes skill `using-chrisbanes-skills`. Do not copy cluster bodies into this plugin. Do not treat this glue as that router. (P29)

## When (Android / stuc tasks)

Load this glue, then the installed chrisbanes router, when the task is:

- Compose screens, state, effects, slots, performance, animations, focus, or Compose test shape
- Kotlin Flow, coroutines, control flow, API/types, or KMP expect/actual
- Agent-initiated Gradle assemble or check (`gradle-run`)

Google product workflows stay `using-android-skills`. Device proof stays `android-verify`.

HEAD cluster names (installed, not vendored): `compose-state-and-effects`, `compose-performance`, `compose-component-design`, `compose-animations`, `compose-focus-navigation`, `compose-ui-testing-patterns`, `kotlin-concurrency-and-flow`, `kotlin-api-design`, `kotlin-control-flow`, `gradle-run`.

Removed pre-cluster entrypoints (`compose-state-authoring`, `compose-state-hoisting`, `compose-side-effects`, `compose-recomposition-performance`, `compose-stability-diagnostics`, `compose-state-deferred-reads`, `compose-modifier-and-layout-style`, `compose-slot-api-pattern`, `kotlin-coroutines-structured-concurrency`, `kotlin-flow-state-event-modeling`, `kotlin-types-value-class`, `kotlin-multiplatform-expect-actual`) are **not** what a new install provides. Do not wait for them.

## Fail closed

Before advising or editing, confirm both of these resolve **outside this plugin tree** (agent skill dirs / chrisbanes install):

1. The chrisbanes router `using-chrisbanes-skills`.
2. `compose-state-and-effects` (or the named cluster for this task).

If either is missing:

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

Do not invent Compose/Kotlin design advice to paper over the missing skill. Do not vendor a copy. Do not answer from this file's overlays alone.

## Route

1. Load the installed chrisbanes `using-chrisbanes-skills`. Follow its table. Do not duplicate it here.
2. Apply the stuc overlays below after the upstream skill is loaded, not instead of it.

`kotlin-control-flow` and `gradle-run` are chrisbanes skills on HEAD. This plugin does not ship their procedures.

## Stuc overlays (do not replace the clusters)

- Reuse existing design-system composables and modifiers. Search before reimplementing. (P9)
- Keyboard, IME, and focus are product acceptance, not polish. Load `compose-focus-navigation` when that is the work. (P14)
- Nested routes get a ViewModel per back-stack entry. Do not reuse one VM across subroutes. (P11)
- Copy the last similar screen. Do not invent a new Compose architecture per screen. (P8)
