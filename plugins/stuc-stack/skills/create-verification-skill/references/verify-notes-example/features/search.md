# Search notes

Search lets a user find notes by title or body, open a match, see a true empty state, and clear the query back to the list.

## Sub-features

- `search-open` opens search from the list toolbar.
- `search-match` returns title and body matches without changing stored notes.
- `search-open-result` opens a result in the editor.
- `search-empty` shows a complete empty state for a query with no matches.
- `search-clear` restores the full list.

## How to get to it (user POV)

- Tap `Search` in the list app bar (content description `Search`).
- On large screens, the search field may already be visible; still treat it as an entry point.

## Driving it with android-verify

Preconditions:

- A seeded note `Quarterly plan` with body `Draft budget` exists (or create it via [save-note](save-note.md) first).
- Doctor is clean on this run's serial.

- **Toolbar entry.** Tap `Search`. Layout shows a search field focused.
- **Title match.** Type `quarterly`. Layout's result list contains `Quarterly plan` and does not contain an unrelated seeded note.
- **Body match.** Replace the query with `budget`. `Quarterly plan` remains.
- **Open result.** Tap `Quarterly plan`. Editor heading / title field reads `Quarterly plan`.
- **Empty state.** Reopen search, type `volcano`. Layout shows `No matching notes` (or the repo's empty copy) after results settle.
- **Clear.** Tap `Clear search` or clear the field. Full list returns.
- **Proof.** `android layout --output artifacts/search/results.json` plus a screen PNG of the populated result. Inspect the PNG. Name the commands. (P18)

## Gotchas

- Results may debounce. Wait for layout text, not a sleep.
- Opening a result leaves the editor. Return to search before the next query.
- Do not use a unit-test fake repository as device proof.
