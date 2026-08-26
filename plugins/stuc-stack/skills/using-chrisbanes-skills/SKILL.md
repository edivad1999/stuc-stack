---
name: using-chrisbanes-skills
description: >-
  Routes Kotlin and Jetpack Compose design work to chrisbanes/skills leaf names.
  Use when editing Compose state, effects, slots, modifiers, animations, focus,
  recomposition, Flow/coroutines, value classes, or KMP expect/actual. Stops if
  those upstream skills are not installed.
---

# Using chrisbanes skills

Route by the decision the code needs. Load **upstream leaf names** from chrisbanes/skills. Do not copy those bodies into this repo. Do not follow in-repo cluster paths such as `compose-state-and-effects` or `kotlin-api-design`. (P29)

## Fail closed

Before advising or editing, confirm the needed leaf **name** resolves as an installed skill (agent skill dirs, not this plugin tree). If it does not:

1. Stop.
2. Tell the user to install:

```
npx skills add chrisbanes/skills
```

Claude Code: `/plugin marketplace add chrisbanes/skills` then `/plugin install chrisbanes-skills@chrisbanes-skills`.

Do not invent Compose/Kotlin design advice to paper over the missing skill. Do not vendor a copy.

## Routing

1. Read the task and the Kotlin/Compose source that makes the concern concrete.
2. If one leaf clearly matches, load it and stop routing.
3. Before a Compose leaf, point at a Compose API, a composable, or an explicit request to create Compose. A hypothetical UI consumer is not evidence.
4. Match signals to the table. Load the smallest set. Combine only when separate concerns affect the same change.

| Task signal | Load (upstream name) |
|---|---|
| Local `remember` / `mutableStateOf`, snapshot lists/maps, `@ReadOnlyComposable` | `compose-state-authoring` |
| Where UI state lives: local vs hoisted vs holder vs screen-level | `compose-state-hoisting` |
| ViewModel/controller vs previewable content composable | `compose-state-holder-ui-split` |
| `LaunchedEffect`, snackbar, navigation, analytics, event Flow in composition | `compose-side-effects` |
| Jank, skippability, compiler reports (start here for perf) | `compose-recomposition-performance` |
| Unstable parameters, strong skipping, collection params | `compose-stability-diagnostics` |
| Frame-rate scroll/animation/gesture reads in composition | `compose-state-deferred-reads` |
| Modifier parameters, caller-placeable layout, hardcoded root layout | `compose-modifier-and-layout-style` |
| Slots vs boolean shape flags / primitive content params | `compose-slot-api-pattern` |
| Visibility, value targets, content swaps, motion API choice | `compose-animations` |
| Keyboard, TV, D-pad, `FocusRequester`, initial focus | `compose-focus-navigation` |
| Choosing Compose test shape (semantics, screenshot, interaction) | `compose-ui-testing-patterns` |
| Coroutine scopes, `init { launch }`, cancellation, `runBlocking` | `kotlin-coroutines-structured-concurrency` |
| `StateFlow` / `SharedFlow` / `Channel` / `stateIn` / one-shot events | `kotlin-flow-state-event-modeling` |
| KMP expect/actual vs interfaces | `kotlin-multiplatform-expect-actual` |
| `@JvmInline value class` vs data class | `kotlin-types-value-class` |

## Stuc overlays (do not replace the leaves)

Apply after the upstream skill is loaded, not instead of it.

- Reuse existing design-system composables and modifiers. Search before reimplementing. (P9)
- Keyboard, IME, and focus are product acceptance, not polish. Load `compose-focus-navigation` when that is the work. (P14)
- Nested routes get a ViewModel per back-stack entry. Do not reuse one VM across subroutes. (P11)
- `when` / exhaustiveness procedure is `kotlin-control-flow` in this plugin, not a chrisbanes leaf.

Google product workflows (AGP, Nav3, edge-to-edge, R8, Play) are `using-android-skills`, not this router.

Device proof is `android-verify`, not a Compose treatise.
