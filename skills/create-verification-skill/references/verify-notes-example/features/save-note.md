# Save a note

Save lets a user create a titled note from the list, persist title and body, cancel an unfinished draft, and still see the note after leaving the editor.

## Sub-features

- `save-open` opens a blank editor from each list entry point.
- `save-commit` persists a title and body.
- `save-cancel` discards an unfinished draft.
- `save-persist` shows the same title after leaving the editor and returning.

## How to get to it (user POV)

- Tap `New note` on the list (content description `New note`).
- Open an existing row to edit, then change title or body and tap `Save`.

## Driving it with android-verify

Preconditions:

- Notes debug APK is running on the serial this run started.
- No note is titled `Release checklist`.
- Doctor is clean.

- **Open editor.** Tap `New note`. `android layout` JSON contains a node whose content description or text is `New note`. Tap via `android screen resolve` / `adb shell input tap` at the resolved center. After the tap, layout shows a title field focused (IME/focus is product, not polish).
- **Enter content.** Type title and body with `adb shell input text` (or the official skill's text recipe). Layout shows `Save` enabled.
- **Save.** Tap `Save`. Layout shows a list row `Release checklist` (or a snackbar `Note saved` **and** the row after navigating back). A snackbar alone is not persistence.
- **Confirm persistence.** Leave the editor (system Back or Up). Tap the `Release checklist` row. Layout shows the saved title and body.
- **Cancel draft.** Open `New note`, type `Discard me`, tap `Cancel` or Back without save. List has no `Discard me` row.
- **Proof.** `android layout --output artifacts/save-note/list.json` and `android screen capture` to `artifacts/save-note/list.png`. Inspect the PNG. Both show `Release checklist`. Name the commands. (P18)

Host-only overlay (does not replace device proof): `./gradlew :app:testDebugUnitTest` if the change was ViewModel-only and production UI was frozen. (P17)

## Gotchas

- IME covering `Save` is a product bug, not a reason to skip. (P14)
- Copy how the last similar screen in **this** repo was verified. Do not invent a second screenshot stack. (P8, P15)
- Do not claim screenshot coverage from layout JSON alone.
- Remove fixture notes in app data if the run created them; keep proof artifacts.
