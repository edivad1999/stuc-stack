# Multi-surface journeys

Journeys that span several features. Per-surface selectors live in the linked files; read those first, then sequence the journey. Baseline preconditions in [the feature-map README](README.md) apply.

## Save then find

A note created in the editor must be findable from search without restarting the process.

- Drive [save-note](save-note.md) for `Release checklist`.
- Drive [search](search.md) with query `release`. Layout lists that row.
- Proof is layout JSON + PNG from search, plus the assemble/`android run` already recorded. Do not claim a new assemble you did not run.

## List vs editor isolation

Two notes on the list must not share editor state.

- Open note A, type a unique title, **do not save**, press Back/Cancel.
- Open note B. Editor must not show A's draft.
- Proof: layout of B's editor without A's title.

## Host Gradle vs device

If you ran `:app:testDebugUnitTest` only, that journey is host-only. Do not list it as a device journey. (P18)
