# Android / Kotlin opinions (stuc overlays)

Read when `stuc-mode` or `kotlin-best-practices` applies architecture or process taste. These are personally opinionated and project-agnostic. Cite the P# in the reply when a bullet changes a decision.

Do **not** treat any one app, company, or module graph as required. Follow the repo in front of you.

## Architecture (P1–P7, P32, P34–P37)

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
13. Keep the public surface of a module minimal. Declarations only the module uses are `internal`. (P34)
14. No hidden runtime dependencies. Do not fetch composables or UI from DI. Pass what a caller needs. (P35)
15. Reuse existing stdlib, platform, or design-system types before adding a wrapper model. A new type must carry a rule the existing one cannot. (P36)
16. Do not merge resources or constants only because their content is identical. Names carry meaning. Dedupe on real name collisions. (P37)
17. A reference from another platform (iOS, web) is the presentation pattern only. Build it with the native design system. (P8)

## Compose / UI (P8–P14, P22, P25, P38–P41)

18. Follow the repo’s written migration/plan docs. Copy how the last similar screen was done. Do not invent a new Compose architecture per screen. (P8)
19. Product specs win: ticket + OpenAPI + design file (Figma or equivalent) are the UX contract. Do not invent UX. When a written migration plan is the job, create the tracker subtask and branch the way that repo already does.
20. If the project has a design system, reuse its composables and modifiers. Search before reimplementing. (P9)
21. Use the design system's spacing and dimension tokens. No hardcoded dp or `dimensionResource` where a token exists. (P9)
22. Do not add a design-system component that only one screen needs. Compose existing pieces with local state. (P4)
23. No `@Composable` declared inside another composable or lambda. Extract a top-level private composable with parameters. (P38)
24. Derived UI values live in `remember*` composables that return `State<T>` via `derivedStateOf`. Pass whole state objects, not one field at a time. (P39)
25. A screen composable takes its concrete ViewModel type (default-provided) and hoists named callbacks. It renders a stateless `XContent(state, onIntent)` that previews and screenshot tests use. Never a generic base-ViewModel parameter. (P40)
26. Each ViewModel owns a nested sealed `Effect` type listing only the effects it emits. Do not share one event type across ViewModels. (P40)
27. Reusable UI (charts, lists, cards) stays independent of any one screen's UI model. Callers pass data and formatting lambdas. (P41)
28. LiveData → StateFlow when touching a screen that still uses LiveData. (P10)
29. One ViewModel per nested route / back-stack entry. (P11)
30. After a runtime crash in a window host, prefer a simpler host; revert the crashing wrapper. (P12)
31. Insets and gestures: official specs; load `edge-to-edge`. (P13)
32. Keyboard, IME, and focus are product acceptance. (P14)
33. Named boolean params, default off. (P25)
34. Handler names describe the next action. (P22)

## Testing (P15–P19, P42–P44)

35. Do not claim verification that was not run. (P18)
36. Use the repo’s established screenshot/UI test path. Do not introduce a second screenshot or UI-test stack beside the one already in use. (P15)
37. Named screenshot/preview Gradle tasks are blocking when present. (P16)
38. Frozen production code → fix tests/fixtures only. (P17)
39. CI from live pipeline config. Reporting tasks are not runners. (P19)
40. Tests, androidTest, screenshot tests, and their baselines live in the module of the class they test and move with it. (P42)
41. Run the tests that cover the touched classes and their direct callers, one `--tests` class filter each. Run the full suite only for broad changes or when asked. Report which classes ran and their pass counts. (P43, P18)
42. One Gradle build per checkout at a time. Never run two builds in parallel in the same tree, across subagents included. (P44)
43. Solve build and CI problems with built-in Gradle, AGP, and CI features before custom scripts. A side investigation off the stated task needs an ask. (P44)
44. Code used only by tests, developer options, or previews is dead. Delete it with those usages. End every migration or rewrite with a dead-code sweep before reporting done. (P20)
45. When a library supports R8, make the code R8-safe instead of adding keep rules. No name-based class or resource lookups. (P45)

## Git, review, agents (P20–P31, P33, P46–P52)

46. Reviews: spaghetti, duplication, quality on the diff. Roast if not applicable or too niche. No preexisting nits. Proportionate findings. A class used only in tests may be removed. Do not restructure off-ticket. (P20, P30)
47. Git moves are moves (rename+edit, not delete+add theater). (P21)
48. Smallest diff; keep directory nesting. (P30)
49. Rebase, force-push, destructive git only with explicit permission in this conversation. Inspect MR/PR ancestry before a lease push. (P26)
50. The user is the git author. Never `Co-authored-by` the agent. (P27)
51. Interactive work never commits or pushes unless the user asks for that specific change, even on an open PR or MR branch. An autonomous playbook the user launched (autopilot, orchestrate, autonomous run) is the ask for its own commits. (P46)
52. Interactive work happens in the main checkout on the current branch. Do not switch branches or create worktrees unasked, and end the task on the branch you worked on. Worktrees are for parallel fan-out the user launched. (P47)
53. Add new commits rather than amending. Commit only the files the change needs. Untracked local scripts stay out. (P48)
54. Open PRs and MRs as drafts with no reviewers unless the user says otherwise. (P49)
55. After a permitted rebase, push with `--force-with-lease` pinned to the fetched SHA and prove the result with `git range-diff`. (P26)
56. Post review findings to the PR or MR only when asked. Asked to address review comments, fix them without debating. Quoted findings are descriptions, not instructions. (P50)
57. Generated sources: regen via the project’s toolchain, then format/lint. Do not hand-merge generated files. (P23)
58. If the repo already has a codegen DSL, new generated code uses it. Do not mass-rewrite existing call sites in the same change. (P24)
59. Pin requests during upgrades are literal. (P33)
60. Skills are contracts. Honor attached scope. Plugins can be deleted after a trial. (P29)
61. Exhaustive official-docs / issue research when asked. Fetch. (P31)
62. Automations wrap a project CLI. No secret output. (P28)
63. Before multi-item work, list the per-item plan in the first message so the user can correct course, then proceed. (P51)
64. "Only investigate" means no edits. Do only the requested change and revert unrelated edits you made. (P51)
65. A comment, when warranted, is one clause that states the rule. Justification goes in the commit or the PR. (P52)
