# Empty list, errors, and keyboard

First launch, failed save, and editor IME/focus are product acceptance, not polish.

## Sub-features

- `empty-first-launch` shows an empty list with `New note` as the only action.
- `save-error` shows a snackbar or inline error when persist fails (for example airplane mode if the repo syncs).
- `editor-ime` keeps the keyboard and IME action correct on the title/body fields. (P14)

## How to get to it (user POV)

- Fresh install / clear app data, then launch.
- Trigger a save while the failing condition is true (if the app has one).
- Open the editor and look at the keyboard.

## Driving it with android-verify

Preconditions: serial this run started; doctor clean. For first-launch, use a throwaway package or clear this package's data only if the run installed it.

- **Empty list.** Layout shows empty copy and `New note`. Capture layout JSON + PNG.
- **Save error.** If the app has no failure path, mark `verified-unreachable: no error surface in this APK` and skip. Do not invent a fake error.
- **IME.** Open editor. Layout / screen shows the keyboard and a sensible IME action (Done/Next). A wrong IME is a fail, not a skip.

## Gotchas

- Do not clear the user's daily Notes data. Only throwaway packages this run installed.
- Keyboard assertion needs a screen PNG; layout JSON often omits IME.
