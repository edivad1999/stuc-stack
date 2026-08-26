# Notes feature map (sample)

Behavior-level inventory of a **fictional** Android notes app. Agents use this map to decide what to drive and what evidence counts. This sample is small on purpose: a real app map grows one file per area, same conventions.

## Baseline preconditions

- Debug APK assembled this session. Serial is the emulator **this run started**.
- `android` doctor is clean (`which android`, `android -V`, `adb devices`).
- Package is the app under test (example applicationId `com.example.notes`). Replace in the consuming repo.
- Prefer content descriptions and test tags over coordinates.
- Wait on layout JSON / visible text, not a fixed sleep.
- Do not invoke ViewModel methods as the primary proof. Drive the UI.
- One serial per run. Do not drive the user's physical phone.

## Proof and skip reporting

The relevant feature file is the coverage set for a fix. When a change spans list + editor + search, also read `multi-surface-journeys.md`.

- Exercise every reachable entry point and the success, cancel, error, empty, and persistence paths the change can affect.
- Record the action and the final observable state (layout JSON and/or screen PNG).
- Host unit tests do not count as device proof.
- Named screenshot/preview Gradle tasks count for screenshot claims when they exist in the consuming repo. (P16)
- When a path is unreachable, name it, say whether account, OS, or emulator blocks it, and cover the closest real path. Do not report a skipped entry as verified through a different path. (P18)

## Full sweep

Walk this map top to bottom for a broad regression. Finish with `multi-surface-journeys.md`.

## List & editor

- [save-note](save-note.md): create, save, cancel draft, persistence after process death.
- [search](search.md): toolbar search, empty results, clear query.

## Empty, error, keyboard

- [empty-and-error](empty-and-error.md): first-launch empty list, save failure snackbar, IME/focus on the editor.

## Multi-surface journeys

- [multi-surface-journeys](multi-surface-journeys.md): save then search; list vs editor isolation.

## Entry contract

Every feature file uses the same four H2s:

1. `Sub-features`
2. `How to get to it (user POV)`
3. `Driving it with android-verify`
4. `Gotchas`
