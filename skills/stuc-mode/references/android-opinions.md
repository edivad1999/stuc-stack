# Android / Kotlin opinions (stuc overlays)

Read when `stuc-mode` or `kotlin-best-practices` applies architecture or process taste. These are personally opinionated and project-agnostic. Cite the P# in the reply when a bullet changes a decision.

Do **not** treat any one app, company, or module graph as required. Follow the repo in front of you.

## Architecture (P1–P7, P32)

1. Simplest change that fits the existing architecture. Extra layers need a demonstrated duplication problem. (P1)
2. App/UI modules never import data-layer DTOs. Data maps and implements repositories. (P2)
3. **Ask, do not pick:** feature extraction as a library vs a dynamic feature module. A library-style extraction must not leak app types. (P3)
4. DRY only for behavior that is actually shared. Do not extract helpers from two hosts that only look similar. (P4)
5. When doing KMP: share data/domain; keep resources native unless told otherwise; do not assume shared Compose UI. Prove with an Android assemble. If the user points at a known-good sibling repo, copy that Gradle/KMP layout instead of inventing one. (P5)
6. **Ask, do not pick:** analytics/tracking leave the app module; api+impl vs impl-in-app is open. (P6)
7. **Ask, do not pick:** whether a shared app-layer module is needed. Brainstorm, not a yes. (P7)
8. Product environment flags are boundaries. Do not apply a change across environments the project treats as separate. (P32)
9. One JSON stack; kotlinx.serialization is the default for new Kotlin JSON; do not add a second serializer. (decision 2026-03-04; P21)
10. **Ask, do not pick:** product flavors on every module vs debug/release only.
11. **Ask, do not pick:** expanding more androidTest onto Robolectric.
12. **Ask, do not pick:** unifying multiple API error-handling implementations.

## Compose / UI (P8–P14, P22, P25)

13. Follow the repo’s written migration/plan docs. Copy how the last similar screen was done. Do not invent a new Compose architecture per screen. (P8)
14. Product specs win: ticket + OpenAPI + design file (Figma or equivalent) are the UX contract. Do not invent UX. When a written migration plan is the job, create the tracker subtask and branch the way that repo already does.
15. If the project has a design system, reuse its composables and modifiers. Search before reimplementing. (P9)
16. LiveData → StateFlow when touching a screen that still uses LiveData. (P10)
17. One ViewModel per nested route / back-stack entry. (P11)
18. After a runtime crash in a window host, prefer a simpler host; revert the crashing wrapper. (P12)
19. Insets and gestures: official specs; load `edge-to-edge`. (P13)
20. Keyboard, IME, and focus are product acceptance. (P14)
21. Named boolean params, default off. (P25)
22. Handler names describe the next action. (P22)

## Testing (P15–P19)

23. Do not claim verification that was not run. (P18)
24. Use the repo’s established screenshot/UI test path. Do not introduce a second screenshot or UI-test stack beside the one already in use. (P15)
25. Named screenshot/preview Gradle tasks are blocking when present. (P16)
26. Frozen production code → fix tests/fixtures only. (P17)
27. CI from live pipeline config. Reporting tasks are not runners. (P19)

## Git, review, agents (P20–P31, P33)

28. Reviews: spaghetti, duplication, quality on the diff. Roast if not applicable or too niche. No preexisting nits. Proportionate findings. A class used only in tests may be removed. Do not restructure off-ticket. (P20, P30)
29. Git moves are moves (rename+edit, not delete+add theater). (P21)
30. Smallest diff; keep directory nesting. (P30)
31. Rebase, force-push, destructive git only with explicit permission in this conversation. Inspect MR/PR ancestry before a lease push. (P26)
32. The user is the git author. Never `Co-authored-by` the agent. (P27)
33. Generated sources: regen via the project’s toolchain, then format/lint. Do not hand-merge generated files. (P23)
34. If the repo already has a codegen DSL, new generated code uses it. Do not mass-rewrite existing call sites in the same change. (P24)
35. Pin requests during upgrades are literal. (P33)
36. Skills are contracts. Honor attached scope. Plugins can be deleted after a trial. (P29)
37. Exhaustive official-docs / issue research when asked. Fetch. (P31)
38. Automations wrap a project CLI. No secret output. (P28)
