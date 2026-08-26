# Android / Kotlin opinions (stuc overlays)

Read when `stuc-mode` or `kotlin-best-practices` applies architecture or process taste. These are personally opinionated and project-agnostic. Cite the P# in the reply when a bullet changes a decision.

Do **not** treat any one app, company, or module graph as required. Follow the repo in front of you.

## Architecture (P1–P7, P32)

1. Simplest change that fits the existing architecture. Extra layers need a demonstrated duplication problem. (P1)
2. App/UI modules never import data-layer DTOs. Data maps and implements repositories. (P2)
3. DRY only for behavior that is actually shared. Do not extract helpers from two hosts that only look similar. (P4)
4. When doing KMP: share data/domain; keep resources native unless told otherwise; do not assume shared Compose UI. Prove with an Android assemble. (P5)
5. Product environment flags are boundaries. Do not apply a change across environments the project treats as separate. (P32)
6. One JSON stack; kotlinx.serialization is the default for new Kotlin JSON; do not add a second serializer. (decision 2026-03-04; P21)

## Compose / UI (P8–P14, P22, P25)

7. Follow the repo’s written migration/plan docs. Copy how the last similar screen was done. (P8)
8. If the project has a design system, reuse its composables and modifiers. Search before reimplementing. (P9)
9. LiveData → StateFlow when touching a screen that still uses LiveData. (P10)
10. One ViewModel per nested route / back-stack entry. (P11)
11. After a runtime crash in a window host, prefer a simpler host; revert the crashing wrapper. (P12)
12. Insets and gestures: official specs; load `edge-to-edge`. (P13)
13. Keyboard, IME, and focus are product acceptance. (P14)
14. Named boolean params, default off. (P25)
15. Handler names describe the next action. (P22)

## Testing (P15–P19)

16. Do not claim verification that was not run. (P18)
17. Use the repo’s established screenshot/UI test path. Do not introduce a second screenshot or UI-test stack beside the one already in use. (P15)
18. Named screenshot/preview Gradle tasks are blocking when present. (P16)
19. Frozen production code → fix tests/fixtures only. (P17)
20. CI from live pipeline config. Reporting tasks are not runners. (P19)

## Git, review, agents (P20–P31, P33)

21. Reviews: spaghetti, duplication, quality on the diff. No preexisting nits. Proportionate findings. (P20)
22. Git moves are moves (rename+edit, not delete+add theater). (P21)
23. Smallest diff; keep directory nesting. (P30)
24. Rebase, force-push, destructive git only with explicit permission in this conversation. (P26)
25. The user is the git author. Never `Co-authored-by` the agent. (P27)
26. Generated sources: regen via the project’s toolchain, then format/lint. Do not hand-merge generated files. (P23)
27. If the repo already has a codegen DSL, new generated code uses it. Do not mass-rewrite existing call sites in the same change. (P24)
28. Pin requests during upgrades are literal. (P33)
29. Skills are contracts. Honor attached scope. Plugins can be deleted after a trial. (P29)
30. Exhaustive official-docs / issue research when asked. Fetch. (P31)
31. Automations wrap a project CLI. No secret output. (P28)
